"use client"

//Page d'accueil
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeTitle } from '../ThemeTitle';
import { useRouter } from 'next/navigation';
import { ProgrammeElement } from './ProgrammeElement';

export const HomePage = () => {
    const [hasExecuted, setHasExecuted] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const bodyHeadRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    // Gestion du rendu côté client
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const storedHasExecuted = localStorage.getItem('hasExecuted') === 'true';
            setHasExecuted(storedHasExecuted);

            if (!storedHasExecuted) {
                const timer = setTimeout(() => {
                    if (popupRef.current) popupRef.current.style.display = "block";
                    if (bodyHeadRef.current) bodyHeadRef.current.style.display = "none";
                }, 1000);

                return () => clearTimeout(timer);
            }
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient && !loading && !isAuthenticated) {
            router.push('/connection');
        }
    }, [isAuthenticated, loading, router, isClient]);

    // État de chargement initial
    if (!isClient || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Si non authentifié, ne rien afficher
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <header ref={bodyHeadRef} className='body-head'>
                <div
                    ref={popupRef}
                    className="popup-selector"
                    style={{ display: hasExecuted ? 'none' : 'block' }}
                >
                    {/* Contenu de la popup */}
                </div>
                <ThemeTitle />
                <ProgrammeElement />
            </header>
        </div>
    );
}