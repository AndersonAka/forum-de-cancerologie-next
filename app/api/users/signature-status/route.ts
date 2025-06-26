import { NextRequest, NextResponse } from "next/server";

interface UpdateSignatureRequest {
  userId: number;
  signature: string; // URL de la signature
  has_signature: boolean;
}

interface UpdateSignatureResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function PUT(request: NextRequest) {
  try {
    const body: UpdateSignatureRequest = await request.json();
    const { userId, signature, has_signature } = body;

    // Validation des données
    if (!userId || typeof userId !== "number") {
      return NextResponse.json(
        {
          success: false,
          error: "ID utilisateur invalide",
        } as UpdateSignatureResponse,
        { status: 400 }
      );
    }

    if (!signature || typeof signature !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "URL de signature invalide",
        } as UpdateSignatureResponse,
        { status: 400 }
      );
    }

    if (typeof has_signature !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "Statut de signature invalide",
        } as UpdateSignatureResponse,
        { status: 400 }
      );
    }

    // Validation de l'URL de signature
    if (
      !signature.startsWith(
        "https://medias.forumcancerologie-roche.com/signatures/"
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "URL de signature non autorisée",
        } as UpdateSignatureResponse,
        { status: 400 }
      );
    }

    // Récupérer le token d'authentification
    const authHeader = request.headers.get("authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Token d'authentification manquant",
        } as UpdateSignatureResponse,
        { status: 401 }
      );
    }

    console.log(`🔄 Mise à jour signature pour l'utilisateur ${userId}`);

    // Appel à l'API NestJS avec le token d'authentification
    const updateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/signature`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          signature,
          has_signature,
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({}));
      console.error("❌ Erreur API NestJS:", updateResponse.status, errorData);

      return NextResponse.json(
        {
          success: false,
          error: `Erreur serveur: ${updateResponse.status}`,
        } as UpdateSignatureResponse,
        { status: updateResponse.status }
      );
    }

    const result = await updateResponse.json();

    console.log(
      `✅ Signature mise à jour avec succès pour l'utilisateur ${userId}`
    );

    return NextResponse.json({
      success: true,
      message: "Signature mise à jour avec succès",
      data: result,
    } as UpdateSignatureResponse);
  } catch (error) {
    console.error("❌ Erreur endpoint signature-status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      } as UpdateSignatureResponse,
      { status: 500 }
    );
  }
}

// Endpoint GET pour vérifier le statut de signature
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || isNaN(Number(userId))) {
      return NextResponse.json(
        {
          success: false,
          error: "ID utilisateur invalide",
        },
        { status: 400 }
      );
    }

    // Récupérer le token d'authentification
    const authHeader = request.headers.get("authorization");
    const token =
      authHeader?.replace("Bearer ", "") ||
      request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Token d'authentification manquant",
        },
        { status: 401 }
      );
    }

    console.log(
      `🔍 Vérification statut signature pour l'utilisateur ${userId}`
    );

    // Appel à l'API NestJS avec le token d'authentification
    const statusResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/signature-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!statusResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Erreur serveur: ${statusResponse.status}`,
        },
        { status: statusResponse.status }
      );
    }

    const userData = await statusResponse.json();

    return NextResponse.json({
      success: true,
      has_signature: userData.has_signature || false,
      signature_url: userData.signature || null,
    });
  } catch (error) {
    console.error("❌ Erreur vérification statut signature:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      },
      { status: 500 }
    );
  }
}
