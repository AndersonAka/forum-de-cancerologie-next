'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, LoginCredentials, RegisterData, AuthResponse } from '../services/auth.service';

interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthResponse['user'] | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<AuthResponse>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = authService.getUser();
            if (storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            } else {
                const token = authService.getToken();
                if (token) {
                    try {
                        const user = await authService.getCurrentUser();
                        setUser(user);
                        setIsAuthenticated(true);
                    } catch (error) {
                        console.error("Erreur lors de la récupération des informations utilisateur:", error);
                        authService.logout();
                    }
                }
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setError(null);
            const response = await authService.login(credentials);
            setUser(response.user);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            throw err;
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setError(null);
            const response = await authService.register(data);
            return response;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                register,
                logout,
                error,
            }}
        >
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