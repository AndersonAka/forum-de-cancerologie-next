import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const response = await axios.patch(
      `${API_URL}/users/me/participation-mode`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Erreur lors de la mise à jour du mode de participation:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du mode de participation" },
      { status: 500 }
    );
  }
}
