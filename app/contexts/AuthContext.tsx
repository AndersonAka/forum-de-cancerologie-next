"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "@/app/services/auth.service";
import { User } from "@/app/types/auth";
import { deleteAuthCookie } from "@/actions/auth.action";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    redirectPath: string | null;
    setRedirectPath: (path: string | null) => void;
    refreshAuth: () => void;
    updateParticipationMode: (mode: 'en ligne' | 'présentiel') => Promise<void>;
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

    // Fonction pour relire les cookies et mettre à jour l'état d'auth
    const refreshAuth = () => {
            try {
                const userCookie = Cookies.get("user");
                const token = Cookies.get("access_token");

                if (userCookie && token) {
                    try {
                        const userData = JSON.parse(userCookie);
                        setUser(userData);
                        setIsAuthenticated(true);
                } catch {
                        Cookies.remove("user", { path: "/" });
                        Cookies.remove("access_token", { path: "/" });
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
        } catch {
                setUser(null);
                setIsAuthenticated(false);
        }
    };

    // Vérifier l'authentification au chargement
    useEffect(() => {
        setLoading(true);
        refreshAuth();
        setLoading(false);
    }, []);

    const login = async (email: string) => {
        try {
            const response = await authService.login({ email });

            if (response.user && response.access_token) {
                // Mettre à jour les cookies côté client
                Cookies.set('access_token', response.access_token, COOKIE_OPTIONS);
                Cookies.set('user', JSON.stringify(response.user), COOKIE_OPTIONS);

                // Rafraîchir l'état d'authentification
                refreshAuth();

                // Rediriger vers le chemin sauvegardé ou la page d'accueil
                const path = redirectPath || "/";
                setRedirectPath(null);
                window.location.replace(path);
            } else {
                throw new Error("Réponse de connexion invalide");
            }
        } catch (error) {
            Cookies.remove("user", { path: "/" });
            Cookies.remove("access_token", { path: "/" });
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = Cookies.get("access_token");
            if (!token) {
                await deleteAuthCookie();
                router.push("/connexion");
                // throw new Error("Non autorisé");
            }

            await authService.logout();
            Cookies.remove("access_token");
            Cookies.remove("user");
            await deleteAuthCookie();
            setUser(null);
            setIsAuthenticated(false);
            router.push("/connexion");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            throw error;
        }
    };

    const updateParticipationMode = async (mode: 'en ligne' | 'présentiel') => {
        try {
            const token = Cookies.get("access_token");
            if (!token) {
                throw new Error("Non autorisé");
            }

            await authService.updateParticipationMode(mode);

            // Mettre à jour l'utilisateur dans le contexte
            setUser(prevUser => prevUser ? { ...prevUser, participationMode: mode } : null);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mode de participation:", error);
            throw error;
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
            setRedirectPath,
            refreshAuth,
            updateParticipationMode
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