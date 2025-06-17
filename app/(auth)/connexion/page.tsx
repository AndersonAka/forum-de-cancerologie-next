import ConnexionPage from "@/app/components/auth/connexion/ConnexionPage";
import { Suspense } from "react";

export default function Connexion() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ConnexionPage />
        </Suspense>
    );
} 