import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Appel au backend Nest.js
    const response = await axios.post(`${API_URL}/auth/login`, { email });

    // Créer la réponse
    const res = NextResponse.json(response.data);

    // Définir les cookies avec les options appropriées
    if (response.data.access_token) {
      res.cookies.set({
        name: "access_token",
        value: response.data.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 jours
      });

      res.cookies.set({
        name: "user",
        value: JSON.stringify(response.data.user),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 jours
      });
    }

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Erreur lors de la connexion",
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
