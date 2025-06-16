'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedGuardProps {
    children: React.ReactNode;
}

export default function ProtectedGuard({ children }: ProtectedGuardProps) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/connexion');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) return <div>Chargement...</div>;
    if (!isAuthenticated) return null;
    return <>{children}</>;
} 