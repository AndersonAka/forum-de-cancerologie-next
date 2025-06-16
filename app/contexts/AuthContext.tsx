"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "@/app/services/auth.service";
import { User } from "@/app/types/auth";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_OPTIONS = {
    expires: 7, // 7 jours
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userCookie = Cookies.get("user");
            const token = Cookies.get("access_token");

            if (userCookie && token) {
                try {
                    const userData = JSON.parse(userCookie);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Erreur lors du parsing du cookie user:", error);
                    // Nettoyer les cookies invalides
                    Cookies.remove("user", { path: "/" });
                    Cookies.remove("access_token", { path: "/" });
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de l'authentification:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string) => {
        try {
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Format d'email invalide");
            }

            const response = await authService.login({ email });

            if (response.user && response.access_token) {
                // Mettre à jour les cookies
                Cookies.set('access_token', response.access_token, COOKIE_OPTIONS);
                Cookies.set('user', JSON.stringify(response.user), COOKIE_OPTIONS);

                // Mettre à jour l'état
                setUser(response.user);
                setIsAuthenticated(true);

                // Attendre que l'état soit mis à jour
                await new Promise(resolve => setTimeout(resolve, 100));

                // Rediriger immédiatement
                const from = new URLSearchParams(window.location.search).get("from");

                if (from && from !== "/") {
                    router.replace(from);
                } else {
                    router.replace("/");
                }
            } else {
                throw new Error("Réponse de connexion invalide");
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
            // Nettoyer les cookies en cas d'erreur
            Cookies.remove("user", { path: "/" });
            Cookies.remove("access_token", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            // Nettoyer les cookies
            Cookies.remove("access_token", { path: "/" });
            Cookies.remove("user", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
            router.replace("/connexion");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            // Nettoyer les cookies même en cas d'erreur
            Cookies.remove("access_token", { path: "/" });
            Cookies.remove("user", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
} 