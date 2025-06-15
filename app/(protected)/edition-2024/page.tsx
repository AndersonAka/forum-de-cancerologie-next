"use client";

import { Suspense } from 'react';

function Edition2024Content() {
    return (
        <main className="min-h-screen">
            <h1>Edition 2024</h1>
        </main>
    );
}

export default function Edition2024() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <Edition2024Content />
        </Suspense>
    );
}