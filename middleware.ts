import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des routes publiques
const publicRoutes = ["/connexion", "/inscription"];

// Liste des routes API
const apiRoutes = ["/api/auth/login", "/api/auth/logout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne pas rediriger les routes API
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Vérifier si c'est une route publique
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Vérifier si l'utilisateur est authentifié
  const token = request.cookies.get("access_token");
  const user = request.cookies.get("user");
  console.log("token", token);
  console.log("user", user);
  // Si pas de token ou d'utilisateur, rediriger vers la page de connexion
  if (!token || !user) {
    const url = new URL("/connexion", request.url);
    // Ne pas inclure les routes API dans la redirection
    if (!pathname.startsWith("/api/") && pathname !== "/") {
      url.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuration des routes à protéger
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
