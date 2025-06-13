import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes qui nécessitent une authentification
const protectedRoutes = [
  "/agenda",
  "/orateur",
  "/etude",
  "/itineraire",
  "/programme",
  "/contact",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthPage = pathname === "/connection" || pathname === "/inscription";

  // Si l'utilisateur est connecté
  if (token) {
    // Rediriger vers l'accueil si sur une page d'authentification
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Autoriser l'accès à toutes les routes si connecté
    return NextResponse.next();
  }

  // Si l'utilisateur n'est pas connecté
  // Rediriger vers la connexion si c'est une route protégée
  if (isProtectedRoute) {
    const url = new URL("/connection", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Autoriser l'accès aux pages publiques
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
