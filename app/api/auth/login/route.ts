import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(`${API_URL}/auth/login`, body);

    if (!response.data.access_token) {
      return NextResponse.json(
        { error: "Token d'accès manquant" },
        { status: 401 }
      );
    }

    // Créer la réponse avec les cookies
    const res = NextResponse.json(
      {
        message: "Connexion réussie",
        user: response.data.user,
        access_token: response.data.access_token,
      },
      { status: 200 }
    );

    // Définir les cookies avec les options appropriées
    res.cookies.set("access_token", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    res.cookies.set("user", JSON.stringify(response.data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    });

    console.log("✅ Cookies définis avec succès");
    return res;
  } catch (error: any) {
    console.error("❌ Erreur lors de la connexion:", {
      message: error.message,
      response: error.response?.data,
    });
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: error.response?.status || 500 }
    );
  }
}
