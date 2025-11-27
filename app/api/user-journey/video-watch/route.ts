import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Récupérer le token depuis les cookies ou les headers
    const token = request.cookies.get("access_token")?.value || 
                  request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Token d'authentification manquant" },
        { status: 401 }
      );
    }

    // Faire l'appel au backend via Next.js (proxy)
    const response = await axios.post(
      `${API_URL}/user-journey/video-watch`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 secondes de timeout
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement de la visualisation:", error);
    
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Erreur lors de l'enregistrement de la visualisation";

    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}

