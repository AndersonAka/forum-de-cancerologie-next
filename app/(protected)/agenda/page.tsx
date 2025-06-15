'use client';

import React, { Suspense } from 'react';
import AgendaPage from '../../components/agenda/AgendaPage';

export default function Agenda() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <AgendaPage />
        </Suspense>
    );
} 