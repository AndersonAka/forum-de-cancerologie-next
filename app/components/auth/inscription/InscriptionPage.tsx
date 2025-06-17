"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth.service';
import { HeaderSection } from '../HaederSection';
import { CountrySelect } from '@/app/components/CountrySelect';
import { ConsentModal } from './ConsentModal';
import { InscriptionData } from './types';

export default function InscriptionPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<InscriptionData>({
        titre: '',
        nom: '',
        specialite: '',
        pays: '',
        telephone: '',
        lieuExercice: '',
        email: '',
        participation: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [consentError, setConsentError] = useState<string | null>(null);
    const [hasConsented, setHasConsented] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

            // Indicateur de succès pour la page de connexion
            localStorage.setItem('inscriptionSuccess', '1');

            router.push('/connexion');
        } catch (err: any) {
            // Gestion de l'erreur backend
            let backendMessage = '';
            if (err?.response && typeof err.response.json === 'function') {
                try {
                    const data = await err.response.json();
                    if (data && data.message) {
                        backendMessage = data.message;
                    }
                } catch { }
            }
            if (backendMessage) {
                setError(backendMessage);
            } else if (err instanceof Error) {
                if (err.message.includes('409') || err.message.includes('already exists')) {
                    setError('Cette adresse email est déjà utilisée');
                } else if (err.message.includes('401')) {
                    setError(err.message);
                } else if (err.message.includes('400')) {
                    setError('Veuillez vérifier les informations saisies');
                } else {
                    setError(err.message);
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
        if (name === 'telephone') {
            // Pour le téléphone, on stocke juste le numéro sans l'indicatif
            setFormData(prev => ({
                ...prev,
                telephone: value
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setHasConsented(isChecked);
        setConsentError(null);

        if (isChecked) {
            const emptyFields = Object.entries(formData).filter(([key, value]) => {
                if (key === 'telephone') {
                    return !value || value.length < 8;
                }
                return !value;
            });

            if (emptyFields.length > 0) {
                setConsentError('Veuillez renseigner tous les champs');
                console.log(emptyFields);
                setHasConsented(false);
            } else {
                setShowModal(true);
            }
        }
    };

    return (
        <main>
            <HeaderSection />
            <section className="inscription-wrapper">
                <div className="container">
                    <div className="wrapper">
                        <form onSubmit={handleSubmit} className="inscription">
                            <h1>Inscription</h1>

                            {error && (
                                <div className="error-message" role="alert">
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
                                <div className="">
                                    <CountrySelect
                                        value={{ pays: formData.pays }}
                                        onChange={(data) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                pays: data.pays
                                            }));
                                        }}
                                        error={!!error}
                                    />
                                </div>
                                <div className="input-box ">
                                    <input
                                        type='text'
                                        name="pays"
                                        value={formData.pays}
                                        onChange={handleChange}
                                        placeholder="Sélectionner le pays"
                                        required
                                        readOnly
                                        className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    placeholder="Numéro de téléphone"
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
                                <span className="flex items-center gap-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                                    <input
                                        title="Se souvenir de moi"
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Se souvenir de moi
                                </span>
                            </div>

                            <div className="se-souvenir">
                                <span className="flex items-center gap-2 cursor-pointer" >
                                    <input
                                        title="J'accepte les termes du formulaire de consentement"
                                        placeholder="J'accepte les termes du formulaire de consentement"
                                        className="cursor-pointer"
                                        type="checkbox"
                                        checked={hasConsented}
                                        onChange={handleConsentChange}
                                    />
                                    J&apos;accepte les termes du <Link className="text-bleu-roche" href="https://powerforms.docusign.net/ff4ae8b3-a6ca-4a0b-915c-83924df760b4?env=eu&acct=115f5ef8-be3d-44eb-9c36-54e87c05f11d&accountId=115f5ef8-be3d-44eb-9c36-54e87c05f11d" target="_blank" rel="noopener noreferrer">formulaire de consentement</Link>
                                </span>
                            </div>
                            {consentError && (
                                <div className="error-message" role="alert">
                                    <span>{consentError}</span>
                                </div>
                            )}

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

            <ConsentModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setHasConsented(false);
                }}
                onSubmit={() => {
                    setShowModal(false);
                    handleSubmit(new Event('submit') as any);
                }}
                formData={formData}
                isLoading={isLoading}
            />
        </main>
    );
}