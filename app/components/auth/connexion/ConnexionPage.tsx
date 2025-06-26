"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import VideoSection from "@/app/components/VideoSection";

function getFriendlyMessage(message: string): string {
    if (message.includes("401")) {
        return "Email ou mot de passe incorrect";
    } else if (message.includes("404")) {
        return "Utilisateur non trouvé";
    } else if (message.includes("409")) {
        return "Cette adresse email est déjà utilisée";
    } else if (message.includes("500")) {
        return "Erreur serveur, veuillez réessayer";
    }
    return message;
}

function ConnexionForm() {
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    // Récupérer l'email sauvegardé au chargement
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Validation basique de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Veuillez entrer une adresse email valide");
                return;
            }

            // Connexion de l'utilisateur
            await login(email);

            // Gérer le "Se souvenir de moi"
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }

            // La redirection sera gérée par le contexte d'authentification

        } catch (error) {
            setError(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form id="loginForm" className="connection" onSubmit={handleSubmit}>
            <h1>Connexion</h1>
            {error && (
                <div className="error-message" role="alert">
                    <span>{getFriendlyMessage(error)}</span>
                </div>
            )}
            <div className="input-box">
                <input
                    type="email"
                    id="email"
                    placeholder="Adresse email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="se-souvenir">
                <span className="flex items-center gap-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                    <input
                        title="Se souvenir de moi"
                        type="checkbox"
                        id="seSouvenir"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="cursor-pointer"
                    />
                    Se souvenir de moi
                </span>
            </div>
            <button
                type="submit"
                className={`btn ${loading ? 'loading' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="spinner"></div>
                        <span>Connexion en cours...</span>
                    </div>
                ) : (
                    'Soumettre'
                )}
            </button>
            <div className="flex flex-col justify-center items-center md:lien-de-connection">
                <p>Pas encore inscrit ?</p>
                <span className="text-rose-strong">
                    <Link href="/inscription">Cliquez ici !</Link>
                </span>
            </div>
        </form>
    );
}

function ConnexionContent() {
    return (
        <>
            <HeaderSection />
            <section className="connection-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <Suspense fallback={<div>Chargement du formulaire...</div>}>
                            <ConnexionForm />
                        </Suspense>
                    </div>
                    <div className="connection-des">
                        <div className="container">
                            <div className="des-title">
                                <div className="forum"><h1>Accès au Forum</h1></div>
                                <div className="vos-infos">
                                    <p>Nous nous engageons à garantir la confidentialité <br /> et
                                        la sécurité de vos informations personnelles.
                                    </p>
                                </div>
                                <div className="des-date ">
                                    <div className="date">
                                        <Image src="/img/date-2025-05.png" alt="Date" width={300} height={150} />
                                    </div>
                                    <div className="location">
                                        <Image src="/img/localisation.png" alt="Localisation" width={15} height={15} />
                                        <p>Noom Hôtel<br /> Plateau Abidjan<br /> Côte d&apos;ivoire</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default function ConnexionPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ConnexionContent />
            <VideoSection
                src="https://medias.forumcancerologie-roche.com/teaser-forum-de-cancerologie.mp4"
                title="Teaser Forum de Cancérologie"
                className="mt-8"
            />
        </Suspense>
    );
}