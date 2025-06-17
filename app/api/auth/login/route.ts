import { NextResponse } from "next/server";
import axios from "axios";
import { createAuthCookie } from "@/actions/auth.action";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${API_URL}/auth/login`, body);
    const data = response.data;

    if (!data.access_token) {
      return NextResponse.json(
        { error: "Token d'accès manquant" },
        { status: 500 }
      );
    }

    // Créer la réponse
    const res = NextResponse.json({
      user: data.user,
      access_token: data.access_token,
    });

    // Utiliser createAuthCookie pour définir les cookies
    await createAuthCookie(
      data.access_token,
      data.user.role || "user",
      data.user.status || "active",
      data.user.name
    );

    return res;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
