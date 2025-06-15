'use client';

import { ConnexionPage } from "@/app/components/auth/connexion/ConnexionPage";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import SuccessMessage from "./SuccessMessage";
import { FC } from 'react';

const ConnexionWrapper: FC = () => {
    return (
        <main>
            <HeaderSection />
            <SuccessMessage />
            <ConnexionPage />
        </main>
    );
}

export default ConnexionWrapper; 