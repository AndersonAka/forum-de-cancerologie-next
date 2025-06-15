import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    // Récupérer le token du header Authorization
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    // Appel au backend Nest.js avec le token
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json({ message: "Déconnexion réussie" });
  } catch (error) {
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
