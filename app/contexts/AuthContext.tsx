'use client';

import { createContext, useContext, useState, useEffect, } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

interface User {
    id: string;
    email: string;
    nom: string;
    specialite: string;
    pays: string;
    lieuExercice: string;
    participation: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginCredentials {
    email: string;
    [key: string]: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => false,
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await authService.checkAuth();
            if (response && response.user) {
                setUser(response.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Erreur de vérification d\'authentification:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);
            if (response && response.user) {
                setUser(response.user);
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            router.push('/connexion');
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
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
} 