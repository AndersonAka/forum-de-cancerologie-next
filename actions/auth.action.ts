"use server";

// Importation du module cookies de Next.js pour gérer les cookies
import { cookies } from "next/headers";

// Fonction pour créer un cookie d'authentification avec le token et le rôle de l'utilisateur
export const createAuthCookie = async (
  token: string,
  role: string,
  status: string,
  userName?: string
) => {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    secure: false, // true: Les cookies seront envoyés uniquement via HTTPS
    sameSite: "lax", // Protection CSRF
    httpOnly: false, // Empêche l'accès aux cookies via JavaScript côté client
    path: "/", //Le cookie est accessible à l'ensemble du site
  });
  cookieStore.set("user", role, {
    secure: false,
    sameSite: "lax",
    path: "/",
    httpOnly: false,
  });

  //Création du cookie pour stocker le status de l'utilisateur
  cookieStore.set("status", status, {
    secure: false,
    sameSite: "lax",
    path: "/",
    httpOnly: false,
  });
  //Création du cookie pour stocker le nom de l'utilisateur
  cookieStore.set("userName", userName || "", {
    secure: false,
    sameSite: "lax",
    path: "/",
    httpOnly: false,
  });
};

// Fonction pour supprimer les cookies d'authentification
export const deleteAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user");
  cookieStore.delete("status");
  cookieStore.delete("userName");
};
