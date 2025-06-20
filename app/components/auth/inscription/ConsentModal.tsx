'use client';

import Image from 'next/image';
import { InscriptionData } from './types';
import { useEffect, useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface ConsentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (signature: string) => void;
    formData: InscriptionData;
    isLoading: boolean;
}

export function ConsentModal({ isOpen, onClose, onSubmit, formData, isLoading }: ConsentModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const signatureRef = useRef<SignatureCanvas>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), 300);
        }
    }, [isOpen]);

    const handleSignatureChange = () => {
        if (signatureRef.current) {
            const isEmpty = signatureRef.current.isEmpty();
            setHasSignature(!isEmpty);
        }
    };

    const handleClearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            setHasSignature(false);
        }
    };

    const handleSubmit = () => {
        if (signatureRef.current && !signatureRef.current.isEmpty()) {
            const signatureData = signatureRef.current.toDataURL();
            onSubmit(signatureData);
        }
    };

    if (!isMounted) return null;

    return (
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50 p-4 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
            <div className={`bg-white p-4 sm:p-6 md:p-8 rounded-lg max-w-2xl w-full mx-auto transform transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-center mb-4 sm:mb-6 p-4">
                    <Image src="/img/logo-roche.png" alt="Logo Roche" width={200} height={100} className="mx-auto w-32 h-auto sm:w-40 md:w-52" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Formulaire de consentement</h2>

                <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2">Vos informations :</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <p className="text-sm sm:text-base"><strong>Titre :</strong> {formData.titre}</p>
                            <p className="text-sm sm:text-base"><strong>Nom :</strong> {formData.nom}</p>
                            <p className="text-sm sm:text-base"><strong>Spécialité :</strong> {formData.specialite}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm sm:text-base"><strong>Pays :</strong> {formData.pays}</p>
                            <p className="text-sm sm:text-base"><strong>Téléphone :</strong> {formData.telephone}</p>
                            <p className="text-sm sm:text-base"><strong>Email :</strong> {formData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2">Vous consentez à :</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base">
                        <li>1- Autoriser ROCHE à vous partager des informations sur ses produits, services et des données scientifiques par des canaux digitaux.</li>
                        <li>2- Recevoir des communications régulières concernant les aires thérapeutiques de roche.</li>
                        <li>3- L&apos;utilisation de vos informations professionnelles dans le respect des normes éthiques et légales.</li>
                        <li>4- La possibilité de retirer votre consentement à tout moment, sans conséquence.</li>
                    </ol>
                </div>

                {/* Zone de signature */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Signature :</h3>
                    <div className="p-2" style={{ border: '2px solid #64748b', borderRadius: '0.5rem' }}>
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                                className: 'signature-canvas w-full h-32 bg-white',
                            }}
                            onEnd={handleSignatureChange}
                        />
                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            type="button"
                            onClick={handleClearSignature}
                            className="text-sm text-gray-600 hover:text-gray-800"
                        >
                            Effacer la signature
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                        disabled={isLoading}
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm sm:text-base"
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        disabled={isLoading || !hasSignature}
                        title={!hasSignature ? "Veuillez signer le formulaire" : "Soumettre le formulaire de consentement"}
                        onClick={handleSubmit}
                        className="w-full sm:w-auto px-4 py-2 bg-rose-strong text-white rounded-md hover:bg-rose-strong disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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