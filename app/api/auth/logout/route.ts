import { NextResponse } from "next/server";
import axios from "axios";
import { deleteAuthCookie } from "@/actions/auth.action";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    console.log("🔒 Début de la déconnexion côté serveur");

    // Récupérer le token du header Authorization
    const authHeader = request.headers.get("Authorization");
    console.log("🔑 Token reçu:", authHeader ? "présent" : "absent");

    if (!authHeader) {
      console.log("❌ Pas de token dans les headers");
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // Appel au backend Nest.js avec le token
    console.log("📡 Appel au backend pour déconnexion");
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    // Créer la réponse
    const response = NextResponse.json({ message: "Déconnexion réussie" });

    // Utiliser la fonction deleteAuthCookie pour supprimer les cookies
    console.log("🍪 Suppression des cookies côté serveur");
    await deleteAuthCookie();

    return response;
  } catch (error) {
    console.error("❌ Erreur lors de la déconnexion:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Erreur lors de la déconnexion",
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
