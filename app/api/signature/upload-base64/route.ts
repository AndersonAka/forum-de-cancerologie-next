import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Config AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
    const s3Key = `signatures/${filename}`;

    // Essayer d'abord l'upload vers AWS S3
    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: s3Key,
        Body: buffer,
        ContentType: 'image/png',
        Metadata: {
          uploadedAt: new Date().toISOString(),
          source: 'forum-cancerologie',
        },
      }));
      const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
      console.log("✅ Signature uploadée sur AWS S3:", s3Url);
      return NextResponse.json({
        success: true,
        signatureUrl: s3Url,
        storage: "aws",
        filename: filename,
        size: buffer.length,
      });
    } catch (awsError) {
      console.log(
        "⚠️ AWS S3 non accessible, fallback vers stockage local:",
        awsError
      );
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            error:
              "Une erreur s'est produite lors de l'enregistrement de votre signature sur AWS. Veuillez patienter quelques instants puis réessayer.",
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
      filename: filename,
      size: buffer.length,
      message: "Signature stockée temporairement (AWS S3 non accessible)",
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
    features: ["AWS S3 upload", "Local fallback storage"],
  });
}
