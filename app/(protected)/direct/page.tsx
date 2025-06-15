"use client";

import { Suspense } from 'react';

function DirectContent() {
    return (
        <div>
            <h1>Direct</h1>
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