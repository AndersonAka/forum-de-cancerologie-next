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
    redirectPath: string | null;
    setRedirectPath: (path: string | null) => void;
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
    const [redirectPath, setRedirectPath] = useState<string | null>(null);
    const router = useRouter();

    // Vérifier l'authentification au chargement
    useEffect(() => {
        const checkAuth = () => {
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

        checkAuth();
    }, []);

    const login = async (email: string) => {
        try {
            const response = await authService.login({ email });

            if (response.user && response.access_token) {
                // Mettre à jour les cookies
                Cookies.set('access_token', response.access_token, COOKIE_OPTIONS);
                Cookies.set('user', JSON.stringify(response.user), COOKIE_OPTIONS);

                // Mettre à jour l'état
                setUser(response.user);
                setIsAuthenticated(true);

                // Rediriger vers le chemin sauvegardé ou la page d'accueil
                const path = redirectPath || "/";
                setRedirectPath(null);
                router.replace(path);
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
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
            Cookies.remove("access_token", { path: "/" });
            Cookies.remove("user", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            Cookies.remove("access_token", { path: "/" });
            Cookies.remove("user", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            logout,
            redirectPath,
            setRedirectPath
        }}>
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