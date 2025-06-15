"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function NotFoundContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from') || '/';

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl mb-4">Page non trouvée</p>
                <a
                    href={from}
                    className="text-blue-500 hover:text-blue-700 underline"
                >
                    Retour à l&apos;accueil
                </a>
            </div>
        </div>
    );
}

export default function NotFound() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <NotFoundContent />
        </Suspense>
    );
} 