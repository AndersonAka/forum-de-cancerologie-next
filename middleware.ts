import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes publiques (accessibles sans authentification)
const publicRoutes = [
  "/connection",
  "/inscription",
  "/api/auth/login",
  "/api/auth/register",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Vérifier si c'est une route publique
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (token && (pathname === "/connection" || pathname === "/inscription")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!token && !isPublicRoute) {
    const url = new URL("/connection", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
