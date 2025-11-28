"use client"

// SIGNATURE COMMENTÉE - Demande client
// Les imports suivants ne sont plus nécessaires car la vérification de signature est désactivée
// import { useEffect, useState, useRef } from 'react';
// import { useAuth } from '@/app/contexts/AuthContext';
// import { SignatureRequiredModal } from '@/app/components/auth/SignatureRequiredModal';
import { ThemeTitle } from '../ThemeTitle';
import { ProgrammeElement } from './ProgrammeElement';
import VideoSection from '../VideoSection';

export const HomePage = () => {
    // SIGNATURE COMMENTÉE - Demande client
    // const { user, isAuthenticated, refreshAuth } = useAuth();
    // SIGNATURE COMMENTÉE - Demande client
    // const [showSignatureModal, setShowSignatureModal] = useState(false);
    // const hasCheckedSignatureRef = useRef(false);
    // const [isProcessingSignature, setIsProcessingSignature] = useState(false);

    // SIGNATURE COMMENTÉE - Demande client
    // Vérifier la signature quand l'utilisateur est connecté
    // useEffect(() => {
    //     if (isAuthenticated && user && !hasCheckedSignatureRef.current && !isProcessingSignature) {
    //         console.log('🔍 Vérification signature sur page d\'accueil:', user.has_signature);
    //         console.log('📋 Données utilisateur complètes:', user);

    //         if (!user.has_signature) {
    //             console.log('⚠️ Utilisateur sans signature - affichage modal obligatoire');
    //             setShowSignatureModal(true);
    //         } else {
    //             console.log('✅ Utilisateur a une signature - accès normal');
    //         }

    //         hasCheckedSignatureRef.current = true;
    //     }
    // }, [isAuthenticated, user, isProcessingSignature]);

    // SIGNATURE COMMENTÉE - Demande client
    // const handleSignatureSuccess = async () => {
    //     console.log('✅ Signature réussie - fermeture modal');
    //     setIsProcessingSignature(true);
    //     setShowSignatureModal(false);

    //     // Rafraîchir le contexte d'authentification
    //     console.log('🔄 Rafraîchissement du contexte d\'authentification...');
    //     refreshAuth();

    //     // Attendre un peu pour laisser le temps au contexte de se mettre à jour
    //     setTimeout(() => {
    //         console.log('🔄 Rechargement de la page');
    //         window.location.reload();
    //     }, 1500);
    // };

    return (
        <>
            <header className='body-head'>
                <ThemeTitle />
                <VideoSection
                    src="https://medias-forum-cancerologie.s3.eu-west-3.amazonaws.com/teaser-forum-de-cancerologie.mp4"
                    title=""
                    className="mt-8 mb-4"
                />
                <ProgrammeElement />
            </header>

            {/* SIGNATURE COMMENTÉE - Demande client */}
            {/* Modal de signature obligatoire */}
            {/* {user && showSignatureModal && (
                <SignatureRequiredModal
                    isOpen={showSignatureModal}
                    onSuccess={handleSignatureSuccess}
                    userData={{
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }}
                    isLoading={false}
                />
            )} */}
        </>
    );
}