"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, LoginCredentials } from "../types/auth";
import { authService } from "../services/auth.service";
import Cookies from 'js-cookie';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_OPTIONS = {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedUser = Cookies.get('user');
                const token = Cookies.get('access_token');

                console.log('Vérification des cookies:', { storedUser, token });

                if (!storedUser || !token) {
                    console.log('Pas de cookies trouvés');
                    setUser(null);
                    setIsAuthenticated(false);
                    return;
                }

                try {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('Utilisateur parsé:', parsedUser);

                    if (!parsedUser || typeof parsedUser !== 'object') {
                        throw new Error('Données utilisateur invalides');
                    }

                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Erreur lors du parsing du cookie user:', error);
                    // Nettoyer les cookies invalides
                    Cookies.remove('user', { path: '/' });
                    Cookies.remove('access_token', { path: '/' });
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);
            console.log('Réponse de connexion reçue:', response);

            if (!response.user || !response.access_token) {
                throw new Error('Réponse de connexion invalide');
            }

            // Stocker les informations dans les cookies
            Cookies.set('access_token', response.access_token, COOKIE_OPTIONS);
            Cookies.set('user', JSON.stringify(response.user), COOKIE_OPTIONS);

            console.log('Cookies stockés:', {
                user: Cookies.get('user'),
                token: Cookies.get('access_token')
            });

            // Mettre à jour l'état
            setUser(response.user);
            setIsAuthenticated(true);

            // Rediriger vers la page d'origine ou la page d'accueil
            const from = searchParams.get('from') || '/';
            router.push(from);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();

            // Nettoyer les cookies
            Cookies.remove('access_token', { path: '/' });
            Cookies.remove('user', { path: '/' });

            // Mettre à jour l'état
            setUser(null);
            setIsAuthenticated(false);

            // Rediriger vers la page de connexion
            router.push('/connexion');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
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