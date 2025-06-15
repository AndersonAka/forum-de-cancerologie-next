import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Données d'inscription reçues:", body);

    // Appel au backend Nest.js
    const response = await axios.post(`${API_URL}/auth/register`, body);
    console.log("Réponse du backend:", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Erreur lors de l'inscription",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
