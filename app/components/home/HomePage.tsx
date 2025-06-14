"use client"

//Page d'accueil
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeTitle } from '../ThemeTitle';
import { useRouter } from 'next/navigation';
import { ProgrammeElement } from './ProgrammeElement';

export const HomePage = () => {
    const [hasExecuted, setHasExecuted] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const bodyHeadRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Vérifier si hasExecuted est déjà dans le localStorage
        const storedHasExecuted = localStorage.getItem('hasExecuted') === 'true';
        setHasExecuted(storedHasExecuted);

        // Afficher la popup après 1 seconde si pas encore exécuté
        if (!storedHasExecuted) {
            const timer = setTimeout(() => {
                if (popupRef.current) popupRef.current.style.display = "block";
                if (bodyHeadRef.current) bodyHeadRef.current.style.display = "none";
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/connection');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <header ref={bodyHeadRef} className='body-head '>
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


        </>
    );
}