'use client';

import Image from 'next/image';
import { InscriptionData } from './types';
import { useEffect, useState } from 'react';

interface ConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formData: InscriptionData;
    isLoading: boolean;
}

export function ConsentModal({ isOpen, onClose, onSubmit, formData, isLoading }: ConsentModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            // Petit délai pour permettre l'animation
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            // Attendre la fin de l'animation avant de démonter
            setTimeout(() => setIsMounted(false), 300);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
            <div className={`bg-white p-8 rounded-lg max-w-2xl w-full mx-4 transform transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-center mb-6">
                    <Image src="/img/logo-roche.png" alt="Logo Roche" width={200} height={100} className="mx-auto" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Formulaire de consentement</h2>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Vos informations :</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Titre :</strong> {formData.titre}</p>
                            <p><strong>Nom :</strong> {formData.nom}</p>
                            <p><strong>Spécialité :</strong> {formData.specialite}</p>
                        </div>
                        <div>
                            <p><strong>Pays :</strong> {formData.pays}</p>
                            <p><strong>Téléphone :</strong> {formData.telephone}</p>
                            <p><strong>Email :</strong> {formData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Vous consentez à :</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>1- Autoriser ROHE à vous partager des informations sur ses produits, services et des données scientifiques par des canaux digitaux.</li>
                        <li>2- Recevoir des communications régulières concernant les aires thérapeutiques de roche.</li>
                        <li>3- L&apos;utilisation de vos informations professionnelles dans le respect des normes éthiques et légales.</li>
                        <li>4- La possibilité de retirer votre consentement à tout moment, sans conséquence.</li>
                    </ol>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        disabled={isLoading}
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        title="Soumettre le formulaire de consentement"
                        onClick={onSubmit}
                        className="px-4 py-2 bg-rose-strong text-white rounded-md hover:bg-rose-strong disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Inscription en cours...</span>
                            </div>
                        ) : (
                            'Soumettre'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
} 