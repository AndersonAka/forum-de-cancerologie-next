"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";
import { HeaderSection } from "@/app/components/auth/HaederSection";
import Cookies from "js-cookie";

function getFriendlyMessage(message: string): string {
    if (!message) return "Une erreur est survenue. Veuillez réessayer.";
    if (message.includes("401")) return "Identifiants incorrects. Veuillez vérifier votre email.";
    if (message.includes("409") || message.toLowerCase().includes("already exists")) return "Cette adresse email est déjà utilisée.";
    if (message.includes("400")) return "Veuillez vérifier les informations saisies.";
    if (message.toLowerCase().includes("network")) return "Problème de connexion réseau. Veuillez réessayer.";
    if (message.toLowerCase().includes("request failed")) return "Impossible de se connecter au serveur. Veuillez réessayer.";
    return message;
}

function ConnexionForm() {
    const { login, setRedirectPath } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Vérifier si un email est stocké
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }

        // Vérifier si inscriptionSuccess est présent
        if (localStorage.getItem('inscriptionSuccess')) {
            setSuccessMessage('Votre inscription a été réalisée avec succès ! Vous pouvez maintenant vous connecter.');
            localStorage.removeItem('inscriptionSuccess');
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
        <>
            <form id="loginForm" className="connection" onSubmit={handleSubmit}>
                <h1>Connexion</h1>
                {error && (
                    <div className="error-message" role="alert">
                        <span>{getFriendlyMessage(error)}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="success-message" role="status">
                        <span>{successMessage}</span>
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

        </>
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

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Essayer de lancer la vidéo immédiatement après le montage du composant
        const video = videoRef.current;
        if (!video) return;

        // Fonction pour essayer de lancer la vidéo
        const tryToPlay = async () => {
            try {
                // S'assurer que la vidéo est muette pour contourner les restrictions
                video.muted = true;
                video.volume = 0;
                // Essayer de lancer
                await video.play();
                // Réactiver le son immédiatement après le lancement
                video.muted = false;
                video.volume = 1;

            } catch (error) {
                console.log('❌ Lecture automatique bloquée, ajout du bouton de lecture', error);
                // Créer un bouton de lecture visible
                const playButton = document.createElement('div');
                playButton.innerHTML = `
                    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <button class="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                            ▶️ Lancer la vidéo avec son
                        </button>
                    </div>
                `;
                playButton.className = 'absolute inset-0 z-10';

                const container = document.getElementById('video-container');
                if (container) {
                    container.style.position = 'relative';
                    container.appendChild(playButton);

                    // Gérer le clic sur le bouton
                    const button = playButton.querySelector('button');
                    if (button) {
                        button.onclick = async () => {
                            try {
                                // Activer le son avant de lancer
                                video.muted = false;
                                video.volume = 1;
                                await video.play();
                                playButton.remove();
                            } catch (e) {
                                console.error('❌ Échec du lancement manuel:', e);
                            }
                        };
                    }
                }
            }
        };

        // Essayer immédiatement
        tryToPlay();

        // Essayer aussi après un délai au cas où
        const timer = setTimeout(tryToPlay, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ConnexionContent />
            <div
                id="video-container"
                className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
            >
                <video
                    ref={videoRef}
                    src="http://forumcv.cluster023.hosting.ovh.net/medias/teaser-forum-de-cancerologie.mp4"
                    controls
                    loop
                    playsInline
                    autoPlay
                    muted
                    className="w-full h-auto rounded-lg shadow-lg"
                    preload="auto"
                >
                    <p>Votre navigateur ne supporte pas la lecture de vidéos.</p>
                </video>
            </div>
        </Suspense>
    );
}