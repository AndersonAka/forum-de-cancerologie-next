'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiService } from '../services/api.service';
import { ThemeTitle } from '../components/ThemeTitle';

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

export default function Inscription() {
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

        try {
            // Appel API pour l'inscription
            await apiService.post<{ message: string }>('/auth/register', {
                ...formData,
                gdprConsent: true, // Ajout du consentement GDPR
            });

            // Gestion du "Se souvenir de moi"
            if (rememberMe) {
                localStorage.setItem('email', formData.email);
            } else {
                localStorage.removeItem('email');
            }

            // Redirection vers la page de connexion avec un message de succès
            router.push('/connection?success=true');
        } catch (err) {
            console.error('Erreur d\'inscription:', err);
            if (err instanceof Error) {
                setError(err.message);
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
        <>
            <ThemeTitle />

            <section className="inscription-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <form onSubmit={handleSubmit} className="inscription">
                            <h1>Inscription</h1>

                            {error && (
                                <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                                    {error}
                                </div>
                            )}

                            <div className="input-box">
                                <select
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    required
                                    aria-label="Titre"
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="lieuExercice"
                                    value={formData.lieuExercice}
                                    onChange={handleChange}
                                    placeholder="Lieu d&apos;exercice"
                                    required
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                                disabled={isLoading}
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
                                                disabled={isLoading}
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
                                        disabled={isLoading}
                                    />
                                    Se souvenir de moi
                                </label>
                            </div>

                            <div className="se-souvenir">
                                <label>
                                    <input
                                        type="checkbox"
                                        required
                                        disabled={isLoading}
                                    />
                                    J&apos;accepte les termes du <Link href="#">formulaire de consentement</Link>
                                </label>
                            </div>

                            <p className="text-gray-600 mb-4">
                                En vous inscrivant, vous acceptez de recevoir des informations sur le Forum de Cancérologie et vous confirmez avoir lu et accepté notre politique de confidentialité.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Vous pouvez vous désinscrire à tout moment en utilisant le lien de désinscription dans nos e-mails ou en nous contactant directement.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Nous nous engageons à protéger vos données personnelles et à ne jamais les partager avec des tiers sans votre consentement explicite.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Pour plus d&apos;informations sur la façon dont nous traitons vos données, veuillez consulter notre politique de confidentialité.
                            </p>
                            <p className="text-gray-600 mb-4">
                                L&apos;inscription est gratuite et vous donne accès à toutes les fonctionnalités du forum.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Vous recevrez un e-mail de confirmation après votre inscription.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Si vous avez des questions, n&apos;hésitez pas à nous contacter.
                            </p>

                            <button type="submit" className="btn" disabled={isLoading}>
                                {isLoading ? 'Inscription en cours...' : 'Soumettre'}
                            </button>

                            <div className="lien-de-connection">
                                <p>Déjà inscrit ?</p>
                                <Link href="/connection">Se connecter</Link>
                            </div>
                        </form>
                    </div>

                    <div className="inscription-des">
                        <div className="des-title">
                            <h1>Accès au Forum</h1>
                            <p>Vos données de connexion sont chiffrées et protégées par<br />
                                des mesures de sécurité avancées. Nous nous engageons<br />
                                à garantir la confidentialité et la sécurité de vos informations<br />
                                personnelles.</p>
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
        </>
    );
} 