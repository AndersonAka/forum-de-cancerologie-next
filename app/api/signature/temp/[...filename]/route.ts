import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * Endpoint de fallback pour stocker temporairement les signatures
 * GET /api/signature/temp/[filename]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  try {
    const filename = params.filename.join("/");
    const tempDir = join(process.cwd(), "temp", "signatures");
    const filePath = join(tempDir, filename);

    // Vérifier si le fichier existe
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "Fichier non trouvé" },
        { status: 404 }
      );
    }

    // Lire et retourner le fichier
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("❌ Erreur lecture fichier temporaire:", error);
    return NextResponse.json(
      { error: "Erreur lecture fichier" },
      { status: 500 }
    );
  }
}

/**
 * POST pour sauvegarder temporairement une signature
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  try {
    const filename = params.filename.join("/");
    const tempDir = join(process.cwd(), "temp", "signatures");
    const filePath = join(tempDir, filename);

    // Créer le dossier temporaire s'il n'existe pas
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    // Récupérer les données du fichier
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Fichier requis" },
        { status: 400 }
      );
    }

    // Convertir en buffer et sauvegarder
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(filePath, buffer);

    console.log("✅ Signature sauvegardée temporairement:", filePath);

    return NextResponse.json({
      success: true,
      message: "Signature sauvegardée temporairement",
    });
  } catch (error) {
    console.error("❌ Erreur sauvegarde temporaire:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
