"use client";

import { Suspense } from 'react';
import Edition2024Content from '@/app/components/edition-2024/Edition2024Content';

export default function Edition2024() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <Edition2024Content />
        </Suspense>
    );
}