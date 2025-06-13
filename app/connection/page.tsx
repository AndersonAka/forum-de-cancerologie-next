'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './connection.module.css';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

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
        <main>
            <div className="flex flex-col items-center justify-center ">
                <div className="flex flex-col items-center justify-center gap-2 space-y-2 mt-10">
                    <h1 className='text-6xl font-bold text-blue-800 uppercase'>Ensemble contre le Cancer</h1>
                    <p className='text-4xl text-blue-800'>DE ROCHE 2025</p>
                    <p className='text-2xl '>Connectez vous en toute sécurité pour accéder au Forum de Cancerologie de Roche.</p>
                </div>
            </div>
            <div className={styles.connectionWrapper}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Connexion</h1>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputBox}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={styles.rememberMe}>
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
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                            </button>
                            <div className={styles.loginLink}>
                                <p>Pas encore de compte ?</p>
                                <a href="/inscription">S&apos;inscrire</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
} 