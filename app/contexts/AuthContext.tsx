'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    title: string;
    specialty: string;
    country: string;
    workplace: string;
    phoneNumber: string;
    participationMode: string;
    gdprConsent: boolean;
    rememberMeToken: string | null;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            if (!isMounted) return;

            try {
                if (authService.isAuthenticated()) {
                    const userData = await authService.getCurrentUser();
                    if (isMounted) {
                        setUser(userData);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
                if (isMounted) {
                    authService.logout();
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            setIsAuthenticated(true);
            router.push('/');
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            router.push('/connection');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
} 