"use client";

import { createContext, useContext, useEffect, useState, Suspense } from "react";
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

function AuthProviderContent({ children }: { children: React.ReactNode }) {
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

                if (!storedUser || !token) {
                    setUser(null);
                    setIsAuthenticated(false);
                    return;
                }

                try {
                    const parsedUser = JSON.parse(storedUser);

                    if (!parsedUser || typeof parsedUser !== 'object') {
                        throw new Error('Données utilisateur invalides');
                    }

                    setUser(parsedUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Erreur lors du parsing du cookie user:', error);
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

            if (!response.user || !response.access_token) {
                throw new Error('Réponse de connexion invalide');
            }
            Cookies.set('access_token', response.access_token, COOKIE_OPTIONS);
            Cookies.set('user', JSON.stringify(response.user), COOKIE_OPTIONS);

            setUser(response.user);
            setIsAuthenticated(true);

            // Attendre que l'état soit mis à jour
            await new Promise(resolve => setTimeout(resolve, 500));

            // Récupérer le paramètre 'from' ou rediriger vers la page d'accueil
            const from = searchParams.get('from');
            if (from && from !== '/') {
                router.replace(from);
            } else {
                router.replace('/');
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            Cookies.remove('access_token', { path: '/' });
            Cookies.remove('user', { path: '/' });
            setUser(null);
            setIsAuthenticated(false);
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <AuthProviderContent>
                {children}
            </AuthProviderContent>
        </Suspense>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
} 