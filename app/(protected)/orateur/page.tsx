"use client";

import React, { Suspense } from 'react';
import OrateurPage from '../../components/orateur/OrateurPage';

export default function Orateur() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main>
                <OrateurPage />
            </main>
        </Suspense>
    );
} 