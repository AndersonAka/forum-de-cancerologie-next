"use client";
import { useRef, useEffect } from "react";

interface VideoSectionProps {
    src: string;
    title?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    controls?: boolean;
    muted?: boolean;
    preload?: "none" | "metadata" | "auto";
}

/**
 * Composant VideoSection - Section vidéo réutilisable avec lecture automatique
 * 
 * @example
 *  Utilisation basique
 * <VideoSection src="https://example.com/video.mp4" />
 * 
 * @example
 *  Avec titre et personnalisation
 * <VideoSection 
 *   src="https://example.com/video.mp4"
 *   title="Titre de la vidéo"
 *   autoPlay={true}
 *   loop={true}
 *   controls={true}
 *   className="custom-class"
 * />
 */
export default function VideoSection({
    src,
    title,
    className = "",
    autoPlay = true,
    loop = true,
    controls = true,
    muted = true,
    preload = "auto"
}: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Essayer de lancer la vidéo immédiatement après le montage du composant
        const video = videoRef.current;
        if (!video) return;

        // Fonction pour essayer de lancer la vidéo
        const tryToPlay = async () => {
            try {
                // S'assurer que la vidéo est muette pour contourner les restrictions
                video.muted = true;
                video.volume = 0;

                // Essayer de lancer
                await video.play();
                console.log('✅ Vidéo lancée automatiquement');

                // Réactiver le son immédiatement après le lancement
                video.muted = false;
                video.volume = 1;
                console.log('🔊 Son activé automatiquement');

            } catch (error) {
                console.log('❌ Lecture automatique bloquée, ajout du bouton de lecture', error);

                // Créer un bouton de lecture visible
                const playButton = document.createElement('div');
                playButton.innerHTML = `
                    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <button class="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                            ▶️ Lancer la vidéo avec son
                        </button>
                    </div>
                `;
                playButton.className = 'absolute inset-0 z-10';

                const container = document.getElementById('video-container');
                if (container) {
                    container.style.position = 'relative';
                    container.appendChild(playButton);

                    // Gérer le clic sur le bouton
                    const button = playButton.querySelector('button');
                    if (button) {
                        button.onclick = async () => {
                            try {
                                // Activer le son avant de lancer
                                video.muted = false;
                                video.volume = 1;
                                await video.play();
                                playButton.remove();
                                console.log('✅ Vidéo lancée manuellement avec son');
                            } catch (e) {
                                console.error('❌ Échec du lancement manuel:', e);
                            }
                        };
                    }
                }
            }
        };

        // Essayer immédiatement
        tryToPlay();

        // Essayer aussi après un délai au cas où
        const timer = setTimeout(tryToPlay, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="video-container"
            className={`w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-8 ${className}`}
        >
            {title && (
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-gray-800 px-2">
                    {title}
                </h3>
            )}
            <div className="relative w-full">
                <video
                    ref={videoRef}
                    src={src}
                    controls={controls}
                    loop={loop}
                    playsInline
                    autoPlay={autoPlay}
                    muted={muted}
                    className="w-full h-auto rounded-lg shadow-lg max-h-[70vh] sm:max-h-[80vh] object-contain"
                    preload={preload}
                >
                    <p>Votre navigateur ne supporte pas la lecture de vidéos.</p>
                </video>
            </div>
        </div>
    );
} 