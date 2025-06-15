import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Appel au backend Nest.js
    const response = await axios.post(`${API_URL}/auth/login`, { email });

    // Retourner la réponse du backend
    return NextResponse.json(response.data);
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
