import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * Endpoint pour l'upload de signature
 * POST /api/signature/upload
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        { success: false, error: "Fichier et userId requis" },
        { status: 400 }
      );
    }

    // Validation du fichier
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Type de fichier non autorisé" },
        { status: 400 }
      );
    }

    if (file.size > 1024 * 1024) {
      // 1MB max
      return NextResponse.json(
        { success: false, error: "Fichier trop volumineux (max 1MB)" },
        { status: 400 }
      );
    }

    // Générer le nom de fichier unique
    const timestamp = Date.now();
    const filename = `user_${userId}_${timestamp}.png`;

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Essayer d'abord l'upload vers le serveur externe
    const externalUploadUrl = `https://medias.forumcancerologie-roche.com/signatures/${filename}`;

    try {
      const uploadResponse = await fetch(externalUploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      });

      if (uploadResponse.ok) {
        // Succès : serveur externe
        const finalSignatureUrl = `https://medias.forumcancerologie-roche.com/signatures/${filename}`;
        console.log(
          "✅ Signature uploadée sur serveur externe:",
          finalSignatureUrl
        );

        return NextResponse.json({
          success: true,
          signatureUrl: finalSignatureUrl,
          storage: "external",
        });
      }
    } catch (externalError) {
      console.log(
        "⚠️ Serveur externe non accessible, fallback vers stockage local:",
        externalError
      );
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            error:
              "Une erreur s'est produite lors de l'enregistrement de votre signature. Veuillez patienter quelques instants puis réessayer.",
          },
          { status: 500 }
        );
      }
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
      message:
        "Signature stockée temporairement (serveur externe non accessible)",
    });
  } catch (error) {
    console.error("❌ Erreur upload signature:", error);

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
    message: "Endpoint upload signature actif",
    methods: ["POST"],
    maxSize: "1MB",
    formats: ["image/png", "image/jpeg"],
    features: ["External server upload", "Local fallback storage"],
  });
}
