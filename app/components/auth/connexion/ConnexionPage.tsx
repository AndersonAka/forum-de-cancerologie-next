'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export const ConnexionPage = () => {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }

            const success = await login({ email });
            if (success) {
                // Forcer une redirection complète vers la page d'accueil
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            if (error instanceof Error) {
                if (error.message.includes('401') || error.message.includes('Invalid credentials')) {
                    setError('Email incorrect ou non enregistré');
                } else {
                    setError('Une erreur est survenue lors de la connexion');
                }
            } else {
                setError('Une erreur est survenue lors de la connexion');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>

            <section className="connection-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <form id="loginForm" onSubmit={handleSubmit} className="connexion">
                            <h1>Connexion</h1>
                            {error && (
                                <div className="error-message" role="alert">
                                    <strong>Erreur !</strong>
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className="input-box">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(null);
                                    }}
                                    placeholder="Adresse email"
                                    required
                                    disabled={isLoading}
                                    className={error ? 'error' : ''}
                                />
                            </div>
                            <div className="se-souvenir">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    Se souvenir de moi
                                </label>
                            </div>
                            <button
                                type="submit"
                                className={`btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="spinner"></div>
                                        <span>Connexion en cours...</span>
                                    </div>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>

                            <div className="lien-de-connection">
                                <p>Pas encore inscrit ?</p>
                                <Link href="/inscription">S&apos;inscrire</Link>
                            </div>
                        </form>
                    </div>
                    <div className="connection-des">
                        <div className="container">
                            <div className="des-title">
                                <div className="forum"><h1>Accès au Forum</h1></div>
                                <div className="vos-infos"><p>Nous nous engageons à garantir la confidentialité <br /> et
                                    la sécurité de vos informations personnelles.</p>
                                </div>
                                <div className="des-date">
                                    <div className="date"><Image src="./img/date-2025-05.png" alt="# " width={300} height={150} /></div>
                                    <div className="location">
                                        <Image src="./img/localisation.png" alt="# " width={15} height={15} />
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
};