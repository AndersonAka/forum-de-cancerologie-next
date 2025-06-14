"use client"

//Page d'accueil
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeTitle } from '../ThemeTitle';
import { useRouter } from 'next/navigation';
import { ProgrammeElement } from './ProgrammeElement';

export const HomePage = () => {
    const [isClient, setIsClient] = useState(false);
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && !loading && !isAuthenticated) {
            router.push('/connection');
        }
    }, [isAuthenticated, loading, router, isClient]);

    if (!isClient || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className='body-head'>
            <ThemeTitle />
            <ProgrammeElement />
        </header>
    );
}