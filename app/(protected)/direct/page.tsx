"use client";

import DirectContent from '@/app/components/direct/DirectContent';
import { Suspense } from 'react';

export default function Direct() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <DirectContent />
        </Suspense>
    );
}