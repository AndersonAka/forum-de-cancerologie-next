import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.replace("/api/auth/", "");
  const apiUrl = `${API_URL}/auth/${path}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur lors de la communication avec l'API" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = request.nextUrl.pathname.split("/").slice(3).join("/");

    console.log("🔑 Tentative de connexion via API:", { path, body });

    const response = await fetch(`${API_URL}/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Erreur de connexion:", data);
      return NextResponse.json(
        { error: data.message || "Erreur de connexion" },
        { status: response.status }
      );
    }

    console.log("✅ Connexion réussie:", data);

    // Créer la réponse avec le cookie
    const res = NextResponse.json(data, { status: 201 });

    // Définir le cookie avec les options appropriées
    if (data.access_token) {
      res.cookies.set({
        name: "auth_token",
        value: data.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60, // 24 heures
      });
      console.log("🍪 Cookie défini dans la réponse");
    }

    return res;
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
