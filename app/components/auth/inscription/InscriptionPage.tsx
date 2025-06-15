"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth.service';

interface InscriptionData {
    titre: string;
    nom: string;
    specialite: string;
    pays: string;
    lieuExercice: string;
    email: string;
    telephone: string;
    participation: string;
}

export default function InscriptionPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<InscriptionData>({
        titre: '',
        nom: '',
        specialite: '',
        pays: '',
        lieuExercice: '',
        email: '',
        telephone: '',
        participation: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [consentError, setConsentError] = useState<string | null>(null);
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setConsentError(null);

        if (!hasConsented) {
            setConsentError('Vous devez accepter les termes du formulaire de consentement');
            setIsLoading(false);
            return;
        }

        try {
            await authService.register({
                ...formData,
                gdprConsent: true,
            });

            if (rememberMe) {
                localStorage.setItem('email', formData.email);
            } else {
                localStorage.removeItem('email');
            }

            router.push('/connexion?success=true');
        } catch (err) {
            console.error('Erreur d\'inscription:', err);
            if (err instanceof Error) {
                if (err.message.includes('409') || err.message.includes('already exists')) {
                    setError('Cette adresse email est déjà utilisée');
                } else if (err.message.includes('400')) {
                    setError('Veuillez vérifier les informations saisies');
                } else {
                    setError('Une erreur est survenue lors de l\'inscription');
                }
            } else {
                setError('Une erreur est survenue lors de l\'inscription');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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

            <section className="inscription-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <form onSubmit={handleSubmit} className="inscription">
                            <h1>Inscription</h1>

                            {error && (
                                <div className="error-message" role="alert">
                                    <strong>Erreur !</strong>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="input-box">
                                <select
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    required
                                    aria-label="Titre"
                                    className={error ? 'error' : ''}
                                >
                                    <option value="">Titre</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Pr">Pr</option>
                                    <option value="M.">M.</option>
                                    <option value="Mme">Mme</option>
                                </select>
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    placeholder="Nom / Prénom"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="specialite"
                                    value={formData.specialite}
                                    onChange={handleChange}
                                    placeholder="Spécialité"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="pays"
                                    value={formData.pays}
                                    onChange={handleChange}
                                    placeholder="Pays"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="lieuExercice"
                                    value={formData.lieuExercice}
                                    onChange={handleChange}
                                    placeholder="Lieu d'exercice"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Adresse email"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    placeholder="Numéro de téléphone"
                                    required
                                    className={error ? 'error' : ''}
                                />
                            </div>

                            <div className="input-box2">
                                <label><strong>Quel sera votre mode de participation ?</strong></label>
                                <div className="participation-mode">
                                    <div className="en-presentiel">
                                        <label>
                                            <input
                                                type="radio"
                                                name="participation"
                                                value="présentiel"
                                                checked={formData.participation === 'présentiel'}
                                                onChange={handleChange}
                                                required
                                            />
                                            En présentiel
                                        </label>
                                    </div>
                                    <div className="en-ligne">
                                        <label>
                                            <input
                                                type="radio"
                                                name="participation"
                                                value="en ligne"
                                                checked={formData.participation === 'en ligne'}
                                                onChange={handleChange}
                                            />
                                            En ligne
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="se-souvenir">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Se souvenir de moi
                                </label>
                            </div>

                            <div className="se-souvenir">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={hasConsented}
                                        onChange={(e) => {
                                            setHasConsented(e.target.checked);
                                            setConsentError(null);
                                        }}
                                    />
                                    J&apos;accepte les termes du <Link href="#">formulaire de consentement</Link>
                                </label>
                                {consentError && (
                                    <div className="error-message" role="alert">
                                        <strong>Erreur !</strong>
                                        <span>{consentError}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`btn ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="spinner"></div>
                                        <span>Inscription en cours...</span>
                                    </div>
                                ) : (
                                    'Soumettre'
                                )}
                            </button>

                            <div className="lien-de-connection">
                                <p>Déjà inscrit ?</p>
                                <Link href="/connexion">Se connecter</Link>
                            </div>
                        </form>
                    </div>

                    <div className="inscription-des">
                        <div className="des-title">
                            <h1>Accès au Forum</h1>
                            <p>
                                Vos données de connexion sont chiffrées et protégées par<br />
                                des mesures de sécurité avancées. Nous nous engageons<br />
                                à garantir la confidentialité et la sécurité de vos informations<br />
                                personnelles.
                            </p>
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
            </section>
        </main>
    );
}