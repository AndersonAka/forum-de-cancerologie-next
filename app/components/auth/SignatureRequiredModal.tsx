'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { uploadSignatureAndUpdateUser } from '@/app/services/signature.service';

interface SignatureRequiredModalProps {
    isOpen: boolean;
    onSuccess: () => void;
    userData: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    isLoading?: boolean;
}

export function SignatureRequiredModal({
    isOpen,
    onSuccess,
    userData,
    isLoading = false
}: SignatureRequiredModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [signature, setSignature] = useState<string>('');
    const [signatureError, setSignatureError] = useState<string>('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const signatureRef = useRef<SignatureCanvas>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => {
                setIsVisible(true);
            }, 10);
        } else {
            setIsVisible(false);
            setTimeout(() => {
                setIsMounted(false);
            }, 300);
        }
    }, [isOpen]);

    const clearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            setSignature('');
            setSignatureError('');
        }
    };

    const handleSignatureEnd = () => {
        if (signatureRef.current) {
            const signatureData = signatureRef.current.toDataURL();
            setSignature(signatureData);
            setSignatureError('');
        }
    };

    const handleSubmit = async () => {
        if (!signature || signatureRef.current?.isEmpty()) {
            setSignatureError('Veuillez signer le formulaire de consentement');
            return;
        }

        setUploadLoading(true);
        setSignatureError('');

        try {

            // Upload de la signature vers le serveur de fichiers
            const uploadResult = await uploadSignatureAndUpdateUser(signature, userData.id);

            if (!uploadResult.success) {
                setSignatureError(uploadResult.error || 'Erreur lors de l\'upload de la signature');
                return;
            }

            // Appeler le callback de succès
            onSuccess();

        } catch (error) {
            setSignatureError('Erreur inattendue lors de l\'upload de la signature');
        } finally {
            setUploadLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50 p-4 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
            <div className={`bg-white p-4 sm:p-6 md:p-8 rounded-lg max-w-2xl w-full mx-auto transform transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-center mb-4 sm:mb-6 p-4">
                    <Image src="/img/logo-roche.png" alt="Logo Roche" width={200} height={100} className="mx-auto w-32 h-auto sm:w-40 md:w-52" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Signature obligatoire</h2>

                <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2">Bonjour {userData.firstName} {userData.lastName},</h3>
                    <p className="text-sm sm:text-base mb-4">
                        Pour accéder au Forum de Cancérologie, vous devez signer le formulaire de consentement.
                        Cette signature est obligatoire pour continuer.
                    </p>
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

                <div className="mb-4 sm:mb-6">
                    <h3 className="font-semibold mb-2">Veuillez signer le formulaire de consentement :</h3>
                    <div className="border-2 border-gray-300 rounded-lg p-2">
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                                className: 'w-full h-32 border border-gray-200 rounded cursor-crosshair'
                            }}
                            onEnd={handleSignatureEnd}
                            penColor="black"
                            backgroundColor="white"
                        />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <button
                            type="button"
                            onClick={clearSignature}
                            className="text-sm text-red-600 hover:text-red-800 underline"
                            disabled={uploadLoading}
                        >
                            Effacer la signature
                        </button>
                        {signature && !signatureRef.current?.isEmpty() && (
                            <span className="text-sm text-green-600">✓ Signature validée</span>
                        )}
                    </div>

                    {/* Affichage des erreurs de signature */}
                    {signatureError && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                            {signatureError}
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        disabled={isLoading || uploadLoading}
                        title="Soumettre le formulaire de consentement"
                        onClick={handleSubmit}
                        className="w-full px-4 py-2 bg-rose-strong text-white rounded-md hover:bg-rose-strong disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                        {isLoading || uploadLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>
                                    {uploadLoading ? 'Upload en cours...' : 'Traitement en cours...'}
                                </span>
                            </div>
                        ) : (
                            'Signer et continuer'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
} 