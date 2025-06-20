import { NextResponse } from "next/server";
import axios from "axios";
import { deleteAuthCookie } from "../../../../actions/auth.action";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    await deleteAuthCookie();

    return NextResponse.json({ message: "Déconnexion réussie" });
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
