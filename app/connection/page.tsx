'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Connection() {
    const router = useRouter();
    const { login, isAuthenticated, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace('/');
        }
    }, [isAuthenticated, loading, router]);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ email, password });

            if (rememberMe) {
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('email');
            }

            router.replace('/');
        } catch (error) {
            alert('Erreur de connexion : ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading || isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <main>
            <header>
                <div className="container">
                    <div className="hotel">
                        <Image src="/img/noomhotel.png" alt="Noom Hotel" width={1020} height={500} />
                    </div>
                    <div className="title">
                        <h1>FORUM DE CANCEROLOGIE<br /><small>DE ROCHE 2025</small></h1>
                    </div>
                    <p>Inscrivez vous en toute sécurité pour accéder au Forum de Cancerologie de Roche.</p>
                </div>
            </header>

            <section className="connection-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <form onSubmit={handleSubmit} className="connection">
                            <h1>Connexion</h1>
                            <div className="input-box">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Adresse email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    required
                                    disabled={isLoading}
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
                            <button type="submit" className="btn" disabled={isLoading}>
                                {isLoading ? 'Connexion en cours...' : 'Soumettre'}
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
                                <div className="forum">
                                    <h1>Accès au Forum</h1>
                                </div>
                                <div className="vos-infos">
                                    <p>Nous nous engageons à garantir la confidentialité <br /> et
                                        la sécurité de vos informations personnelles.</p>
                                </div>
                            </div>
                            <div className="des-date">
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
            </section>
        </main>
    );
} 