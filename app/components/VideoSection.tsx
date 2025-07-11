"use client";
import { useRef, useEffect, useState } from "react";

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
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [videoError, setVideoError] = useState<string | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Fonction pour essayer de lancer la vidéo
        const tryToPlay = async () => {
            try {
                video.muted = true;
                video.volume = 0;
                await video.play();
                setShowPlayButton(false);
                setVideoError(null);
                // Ne pas réactiver le son automatiquement !
            } catch (error) {
                setShowPlayButton(true);
            }
        };

        tryToPlay();
        const timer = setTimeout(tryToPlay, 1000);
        return () => clearTimeout(timer);
    }, [src]);

    // Gestion du bouton de lecture manuel
    const handleManualPlay = async () => {
        const video = videoRef.current;
        if (!video) return;
        try {
            video.muted = false;
            video.volume = 1;
            await video.play();
            setShowPlayButton(false);
            setVideoError(null);
        } catch (e) {
            setVideoError("Impossible de lancer la vidéo. Veuillez réessayer ou vérifier la compatibilité de votre navigateur.");
        }
    };

    // Gestion de l'erreur native de la balise video
    const handleVideoError = () => {
        setVideoError("La vidéo ne peut pas être lue. Source non supportée ou inaccessible.");
        setShowPlayButton(false);
    };

    return (
        <div
            id="video-container"
            className={`w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-8 ${className}`}
        >
            {title && (
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-bleu-roche px-2">
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
                    onError={handleVideoError}
                >
                    <p>Votre navigateur ne supporte pas la lecture de vidéos.</p>
                </video>
                {showPlayButton && !videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
                        <button
                            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                            onClick={handleManualPlay}
                        >
                            ▶️ Lancer la vidéo avec son
                        </button>
                    </div>
                )}
                {videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-600 bg-opacity-80 rounded-lg z-20">
                        <span className="text-white text-center font-semibold px-4 py-2">{videoError}</span>
                    </div>
                )}
            </div>
        </div>
    );
} 