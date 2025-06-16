"use client";

import { Suspense } from 'react';

function DirectContent() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Direct - En construction</h1>
        </div>

    );
}

export default function Direct() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <DirectContent />
        </Suspense>
    );
}