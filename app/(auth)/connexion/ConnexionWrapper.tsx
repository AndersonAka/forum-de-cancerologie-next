'use client';

import { ConnexionPage } from "@/app/components/auth/connexion/ConnexionPage";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import SuccessMessage from "./SuccessMessage";
import { FC, Suspense } from 'react';

const ConnexionWrapper: FC = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <main>
                <HeaderSection />
                <SuccessMessage />
                <ConnexionPage />
            </main>
        </Suspense>
    );
}

export default ConnexionWrapper; 