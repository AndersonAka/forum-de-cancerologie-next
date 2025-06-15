"use client";

import React, { Suspense } from 'react';
import { EtudePage } from '../../components/etude/EtudePage';

export default function Etude() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <EtudePage />
        </Suspense>
    );
} 