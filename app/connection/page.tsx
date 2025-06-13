'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

function ConnectionForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
            router.push('/dashboard');
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 space-y-2 mt-10">
                <h1 className='text-5xl font-bold uppercase text-bleu-roche'>Ensemble contre le Cancer</h1>
                <p className='text-4xl text-bleu-roche'>DE ROCHE 2025</p>
                <p className='text-2xl text-bleu-roche'>Connectez vous en toute sécurité pour accéder au Forum de Cancerologie de Roche.</p>
            </div>
            <div className="connection-wrapper">
                <div className="wrapper">
                    <h1 className="title">Connexion</h1>
                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}
                    <form className="connection" onSubmit={handleSubmit}>
                        <div className="inputBox">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="input"
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="input"
                            />
                        </div>
                        <div className="se-souvenir">
                            <label>
                                <input type="checkbox" name="remember" />
                                Se souvenir de moi
                            </label>
                        </div>
                        <button type="submit" disabled={isLoading} className='submitButton'>
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                        <div className="lien-de-connection">
                            <p>Vous n&apos;avez pas de compte ?</p>
                            <Link href="/inscription">S&apos;inscrire</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default function Connection() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ConnectionForm />
        </Suspense>
    );
} 