'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './inscription.module.css';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData } from '../services/auth.service';
import Toast from '../components/Toast';

export default function Inscription() {
    const router = useRouter();
    const { register, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [formData, setFormData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        title: 'Dr',
        specialty: '',
        country: '',
        workplace: '',
        phoneNumber: '',
        participationMode: 'in_person'
    });

    const [validationErrors, setValidationErrors] = useState<Partial<RegisterData>>({});

    const validateForm = (): boolean => {
        const errors: Partial<RegisterData> = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'Le prénom est requis';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Le nom est requis';
        }
        if (!formData.email.trim()) {
            errors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Format d\'email invalide';
        }
        if (!formData.password) {
            errors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (!formData.specialty.trim()) {
            errors.specialty = 'La spécialité est requise';
        }
        if (!formData.workplace.trim()) {
            errors.workplace = 'L\'établissement est requis';
        }
        if (!formData.country.trim()) {
            errors.country = 'Le pays est requis';
        }
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Le numéro de téléphone est requis';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur de validation pour ce champ
        if (validationErrors[name as keyof RegisterData]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await register(formData);
            setToastMessage(response.message || "Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
            setShowToast(true);

            // Attendre 3 secondes avant la redirection
            setTimeout(() => {
                router.push('/connection');
            }, 3000);
        } catch (err) {
            console.error('Erreur d\'inscription:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            {showToast && (
                <Toast
                    message={toastMessage}
                    type="success"
                    onClose={() => setShowToast(false)}
                />
            )}
            <div className="flex flex-col items-center justify-center ">
                <div className="flex flex-col items-center justify-center gap-2 space-y-2 mt-10">
                    <h1 className='text-6xl font-bold text-blue-800 uppercase'>Ensemble contre le Cancer</h1>
                    <p className='text-4xl text-blue-800'>DE ROCHE 2025</p>
                    <p className='text-2xl '>Inscrivez vous en toute sécurité pour accéder au Forum de Cancerologie de Roche.</p>
                </div>
            </div>
            <div className={styles.inscriptionWrapper}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Inscription</h1>
                        {error && (
                            <div className={styles.error}>
                                {error}
                            </div>
                        )}
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputBox}>
                                <select
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                    className={styles.select}
                                    aria-label="Titre"
                                >
                                    <option value="Dr">Dr</option>
                                    <option value="Pr">Pr</option>
                                    <option value="M.">M.</option>
                                    <option value="Mme">Mme</option>
                                </select>
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Prénom"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.firstName && (
                                    <span className={styles.errorText}>{validationErrors.firstName}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Nom"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.lastName && (
                                    <span className={styles.errorText}>{validationErrors.lastName}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.email && (
                                    <span className={styles.errorText}>{validationErrors.email}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="Numéro de téléphone"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.phoneNumber && (
                                    <span className={styles.errorText}>{validationErrors.phoneNumber}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.password && (
                                    <span className={styles.errorText}>{validationErrors.password}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirmer le mot de passe"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.confirmPassword && (
                                    <span className={styles.errorText}>{validationErrors.confirmPassword}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="specialty"
                                    placeholder="Spécialité"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.specialty && (
                                    <span className={styles.errorText}>{validationErrors.specialty}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="workplace"
                                    placeholder="Établissement"
                                    value={formData.workplace}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.workplace && (
                                    <span className={styles.errorText}>{validationErrors.workplace}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Pays"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                                {validationErrors.country && (
                                    <span className={styles.errorText}>{validationErrors.country}</span>
                                )}
                            </div>
                            <div className={styles.inputBox}>
                                <select
                                    name="participationMode"
                                    value={formData.participationMode}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                    className={styles.select}
                                    aria-label="Mode de participation"
                                >
                                    <option value="in_person">En présentiel</option>
                                    <option value="online">En ligne</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                            </button>
                            <div className={styles.loginLink}>
                                <p>Déjà inscrit ?</p>
                                <a href="/connection">Se connecter</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
} 