'use client';

import { Suspense } from 'react';
import { HomePage } from '../components/home/HomePage';

export default function Home() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <HomePage />
        </Suspense>
    );
} 