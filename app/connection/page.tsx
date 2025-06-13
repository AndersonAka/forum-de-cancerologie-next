'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Connection() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login({ email, password });
            const from = searchParams.get('from') || '/';
            router.push(from);
        } catch (err) {
            console.error('Erreur de connexion:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 space-y-2 mt-10">
                <h1 className='text-5xl font-bold  uppercase text-bleu-roche'>Ensemble contre le Cancer</h1>
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
                        <div className="rememberMe">
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
                            className="submitButton"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                        <div className="loginLink">
                            <span>Pas encore de compte ?</span>
                            <a href="/inscription">S&apos;inscrire</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
} 