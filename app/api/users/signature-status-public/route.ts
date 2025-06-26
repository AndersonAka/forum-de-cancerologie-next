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

/**
 * Endpoint public pour la mise à jour de signature lors de l'inscription
 * POST /api/users/signature-status-public
 * Pas d'authentification requise (pour l'inscription)
 */
export async function POST(request: NextRequest) {
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

    // Validation de l'URL de signature (plus permissive pour les tests)
    const allowedDomains = [
      "https://medias.forumcancerologie-roche.com/signatures/",
      "http://localhost:3000/api/signature/temp/",
    ];

    const isValidUrl = allowedDomains.some((domain) =>
      signature.startsWith(domain)
    );

    if (!isValidUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "URL de signature non autorisée",
        } as UpdateSignatureResponse,
        { status: 400 }
      );
    }

    console.log(
      `🔄 Mise à jour signature publique pour l'utilisateur ${userId}`
    );

    // Appel direct à l'API NestJS sans authentification (pour l'inscription)
    const updateResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/signature`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
    console.error("❌ Erreur endpoint signature-status-public:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur",
      } as UpdateSignatureResponse,
      { status: 500 }
    );
  }
}

/**
 * Méthode GET pour tester l'endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: "Endpoint public pour mise à jour de signature",
    methods: ["POST"],
    purpose: "Mise à jour de signature lors de l'inscription",
    authentication: "Aucune requise",
  });
}
