"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import Image from "next/image";
import { HeaderSection } from "@/app/components/auth/HaederSection";

export default function Connexion() {
    const { login } = useAuth();
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

            await login({ email });

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
        <>
            <HeaderSection />
            <section className="connection-wrapper">
                <div className="container">
                    <div className="wrapper">
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
                                <div className="des-date">
                                    <div className="date">
                                        <Image src="/img/date-2025-05.png" alt="Date du forum" width={250} height={120} />
                                    </div>
                                    <div className="location">
                                        <Image src="/img/localisation.png" alt="Lieu du forum" width={50} height={100} />
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