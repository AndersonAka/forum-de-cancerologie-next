import { ConnexionPage } from "@/app/components/auth/connexion/ConnexionPage";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import { useSearchParams } from 'next/navigation';

export default function Connexion() {
    const searchParams = useSearchParams();
    const success = searchParams.get('success');

    return (
        <main>
            <HeaderSection />
            {success && (
                <div className="success-message" role="alert">
                    <strong>Félicitations !</strong>
                    <span>Votre inscription a été effectuée avec succès. Vous pouvez maintenant vous connecter.</span>
                </div>
            )}
            <ConnexionPage />
        </main>
    );
} 