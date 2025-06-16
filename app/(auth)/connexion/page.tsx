"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import Image from "next/image";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import Cookies from "js-cookie";

function ConnexionForm() {
    const { login, setRedirectPath } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // Vérifier si un email est stocké
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        // Récupérer le chemin de redirection depuis le cookie
        const redirectPath = Cookies.get('redirect_path');
        if (redirectPath) {
            setRedirectPath(redirectPath);
            // Supprimer le cookie après l'avoir lu
            Cookies.remove('redirect_path', { path: '/' });
        }
    }, [setRedirectPath]);

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

            await login(email);

            // Gérer le "Se souvenir de moi"
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form id="loginForm" className="connection" onSubmit={handleSubmit}>
            <h1>Connexion</h1>
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
            {error && (
                <ErrorMessage
                    message={error}
                    onDismiss={() => setError("")}
                />
            )}
            <div className="se-souvenir">
                <label>
                    <input
                        type="checkbox"
                        id="seSouvenir"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Se souvenir de moi
                </label>
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
            <div className="lien-de-connection">
                <p>Pas encore inscrit ?</p>
                <Link href="/inscription">Cliquez ici !</Link>
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

export default function Connexion() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ConnexionContent />
        </Suspense>
    );
} 