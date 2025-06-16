"use client";

import { Suspense } from 'react';

function Edition2024Content() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Edition 2024 - En construction</h1>
        </div>
    );
}

export default function Edition2024() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <Edition2024Content />
        </Suspense>
    );
}