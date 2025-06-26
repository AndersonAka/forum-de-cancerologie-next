import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * Endpoint pour l'upload de signature en base64
 * POST /api/signature/upload-base64
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signatureData, userId } = body;

    if (!signatureData || !userId) {
      return NextResponse.json(
        { success: false, error: "signatureData et userId requis" },
        { status: 400 }
      );
    }

    // Vérifier que c'est bien du base64
    if (!signatureData.startsWith("data:image/")) {
      return NextResponse.json(
        { success: false, error: "Format de signature invalide" },
        { status: 400 }
      );
    }

    // Convertir base64 en buffer
    const base64WithoutPrefix = signatureData.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    );
    const buffer = Buffer.from(base64WithoutPrefix, "base64");

    // Validation de la taille
    if (buffer.length > 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Signature trop volumineuse (max 1MB)" },
        { status: 400 }
      );
    }

    // Générer le nom de fichier unique
    const timestamp = Date.now();
    const filename = `user_${userId}_${timestamp}.png`;

    // Essayer d'abord l'upload vers le serveur externe OVH
    const externalUploadUrl = `https://medias.forumcancerologie-roche.com/signatures/upload.php/${filename}`;

    try {
      const uploadResponse = await fetch(externalUploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": buffer.length.toString(),
        },
        body: buffer,
      });

      if (uploadResponse.ok) {
        const result = await uploadResponse.json();

        if (result.success) {
          console.log("✅ Signature uploadée sur serveur OVH:", result.url);
          return NextResponse.json({
            success: true,
            signatureUrl: result.url,
            storage: "ovh",
            filename: result.filename,
            size: result.size,
          });
        }
      }
    } catch (externalError) {
      console.log(
        "⚠️ Serveur OVH non accessible, fallback vers stockage local:",
        externalError
      );
    }

    // Fallback : stockage local
    const tempDir = join(process.cwd(), "temp", "signatures");
    const localFilePath = join(tempDir, filename);

    // Créer le dossier temporaire s'il n'existe pas
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    // Sauvegarder localement
    await writeFile(localFilePath, buffer);

    const localUrl = `/api/signature/temp/${filename}`;

    console.log("✅ Signature sauvegardée localement:", localFilePath);

    return NextResponse.json({
      success: true,
      signatureUrl: localUrl,
      storage: "local",
      filename: filename,
      size: buffer.length,
      message: "Signature stockée temporairement (serveur OVH non accessible)",
    });
  } catch (error) {
    console.error("❌ Erreur upload signature base64:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

/**
 * Méthode GET pour tester l'endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: "Endpoint upload signature base64 actif",
    methods: ["POST"],
    maxSize: "1MB",
    format: "data:image/png;base64,...",
    features: ["OVH server upload", "Local fallback storage"],
  });
}
