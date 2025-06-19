'use client';

import { Suspense } from 'react';
import { HomePage } from '../components/home/HomePage';
import { usePageTracking } from '../hooks/usePageTracking';

export default function Home() {
    // Exemple d'utilisation du hook de suivi des pages
    usePageTracking({
        enabled: true,
        minTimeSpent: 2, // 2 secondes minimum pour cette page
        trackOnUnload: true
    });

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <HomePage />
        </Suspense>
    );
} 