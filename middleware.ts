import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des routes publiques
const publicRoutes = ["/connexion", "/inscription"];

// Liste des routes API
const apiRoutes = ["/api/auth/login", "/api/auth/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Middleware - Vérification de la route:", pathname);

  // Ne pas rediriger les routes API
  if (pathname.startsWith("/api/")) {
    console.log("Middleware - Route API détectée, passage");
    return NextResponse.next();
  }

  // Vérifier si c'est une route publique
  if (publicRoutes.includes(pathname)) {
    console.log("Middleware - Route publique détectée, passage");
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est authentifié
  const token = request.cookies.get("access_token");
  const user = request.cookies.get("user");

  console.log("Middleware - État de l'authentification:", {
    hasToken: !!token,
    hasUser: !!user,
    pathname,
  });

  // Si pas de token ou d'utilisateur, rediriger vers la page de connexion
  if (!token || !user) {
    console.log("Middleware - Non authentifié, redirection vers connexion");
    const url = new URL("/connexion", request.url);

    // Ne pas inclure les routes API dans la redirection
    // Ne pas ajouter le paramètre 'from' pour la page d'accueil
    if (!pathname.startsWith("/api/") && pathname !== "/") {
      url.searchParams.set("from", pathname);
    }

    const response = NextResponse.redirect(url);

    // S'assurer que les cookies sont correctement configurés
    response.cookies.set({
      name: "access_token",
      value: "",
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    response.cookies.set({
      name: "user",
      value: "",
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  }

  console.log("Middleware - Authentifié, passage");
  return NextResponse.next();
}

// Configuration des routes à protéger
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
