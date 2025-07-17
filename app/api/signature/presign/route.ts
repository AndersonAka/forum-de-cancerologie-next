import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configuration du client S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType = 'image/png' } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { error: 'Nom de fichier requis' },
        { status: 400 }
      );
    }

    // Configuration de la commande S3 avec le bucket spécifique et sous-dossier signatures
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `signatures/${filename}`,
      ContentType: contentType,
      // Optionnel : métadonnées
      Metadata: {
        uploadedAt: new Date().toISOString(),
        source: 'forum-cancerologie',
      },
    });

    // Générer l'URL pré-signée (valide 15 minutes)
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 900, // 15 minutes
    });

    // URL publique du fichier (pour stockage en DB)
    const publicUrl = `https://medias-forum-cancerologie.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/signatures/${filename}`;

    return NextResponse.json({
      success: true,
      presignedUrl,
      publicUrl,
      key: `signatures/${filename}`,
    });
  } catch (error) {
    console.error('❌ Erreur génération URL pré-signée:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la génération de l\'URL d\'upload' 
      },
      { status: 500 }
    );
  }
} 