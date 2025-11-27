"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useTrackVideoWatch } from "@/app/hooks/useTrackVideoWatch";

interface VideoSectionProps {
    src: string;
    title?: string;
    question?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    controls?: boolean;
    muted?: boolean;
    preload?: "none" | "metadata" | "auto";
    // Props pour le suivi de visualisation
    videoId?: string;
    auteur?: string;
    enableTracking?: boolean;
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
    question,
    className = "",
    autoPlay = false, // Désactivé par défaut - l'utilisateur doit lancer la vidéo manuellement
    loop = true,
    controls = true,
    muted = true,
    preload = "auto",
    videoId,
    auteur,
    enableTracking = true,
}: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [videoError, setVideoError] = useState<string | null>(null);
    
    // Suivi de visualisation
    const { trackVideoWatch } = useTrackVideoWatch();
    const startTimeRef = useRef<Date | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const trackedProgressRef = useRef<Set<number>>(new Set()); // Pour éviter les envois multiples au même pourcentage
    const hasTrackedEndRef = useRef(false);

    // Fonction pour envoyer les données de suivi
    const sendTrackingData = useCallback(async (
        completed: boolean,
        progress: number
    ) => {
        // Vérifications de base
        if (!enableTracking || !videoId || !auteur) {
            console.log("🔴 Tracking désactivé ou données manquantes:", {
                enableTracking,
                videoId,
                auteur,
            });
            return;
        }

        // Initialiser startTime si pas encore fait (cas où play ne s'est pas déclenché)
        if (!startTimeRef.current) {
            startTimeRef.current = new Date();
            console.log("⏰ StartTime initialisé:", startTimeRef.current);
        }

        // Pour les vidéos en cours, on peut envoyer même si duration n'est pas encore chargée
        // On utilisera le currentTime si disponible
        const video = videoRef.current;
        let calculatedProgress = progress;
        
        if (video && video.duration && video.duration > 0) {
            // Si on a la durée, on recalcule le progress basé sur currentTime
            calculatedProgress = (video.currentTime / video.duration) * 100;
        } else if (progress === 0 && video && video.currentTime > 0) {
            // Si duration pas encore chargée mais vidéo en cours, on utilise currentTime
            // On ne peut pas calculer le progress exact, donc on envoie 0
            console.log("⚠️ Durée non chargée, envoi avec progress 0");
        }

        // Éviter les envois multiples pour la même progression (sauf pour completed)
        // Calculer la clé de progression (10, 15, 25, 50, 75, 100)
        let progressKey: number;
        if (calculatedProgress >= 75) {
            progressKey = 75;
        } else if (calculatedProgress >= 50) {
            progressKey = 50;
        } else if (calculatedProgress >= 25) {
            progressKey = 25;
        } else if (calculatedProgress >= 15) {
            progressKey = 15;
        } else if (calculatedProgress >= 10) {
            progressKey = 10;
        } else {
            progressKey = 0;
        }
        
        if (trackedProgressRef.current.has(progressKey) && !completed) {
            console.log("⏭️ Progression déjà envoyée:", progressKey);
            return;
        }

        if (!completed) {
            trackedProgressRef.current.add(progressKey);
        }

        const duration = Math.floor(
            (Date.now() - startTimeRef.current.getTime()) / 1000
        );

        const trackingData = {
            videoId,
            duration,
            progress: Math.min(100, Math.max(0, calculatedProgress)),
            completed,
            auteur,
            dateVisualisation: startTimeRef.current.toISOString(),
        };

        try {
            const result = await trackVideoWatch(trackingData);
            if (result.success) {
                if (completed) {
                    hasTrackedEndRef.current = true;
                }
            } else {
                console.error("❌ Erreur lors de l'enregistrement:", result.message);
            }
        } catch (error) {
            console.error("❌ Erreur lors de l'enregistrement de la visualisation:", error);
        }
    }, [enableTracking, videoId, auteur, trackVideoWatch]);

    // Plus d'autoplay - l'utilisateur doit cliquer pour lancer la vidéo
    // Le bouton de lecture sera affiché par défaut
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Afficher le bouton de lecture par défaut (pas d'autoplay)
        setShowPlayButton(true);
    }, [src]);

    // Gestion des événements vidéo pour le suivi
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !enableTracking || !videoId || !auteur) {
            console.log("🔴 Conditions non remplies pour le suivi:", {
                video: !!video,
                enableTracking,
                videoId,
                auteur,
            });
            return;
        }

        console.log("✅ Initialisation du suivi pour:", { videoId, auteur });

        const handlePlay = () => {
            console.log("▶️ Événement play déclenché");
            if (!startTimeRef.current) {
                startTimeRef.current = new Date();
                console.log("⏰ StartTime défini:", startTimeRef.current);
            }
        };

        const handleTimeUpdate = () => {
            if (video) {
                setCurrentTime(video.currentTime);
                if (video.duration && video.duration > 0) {
                    setVideoDuration(video.duration);
                }
            }
        };

        const handleEnded = async () => {
            console.log("🏁 Vidéo terminée");
            if (!hasTrackedEndRef.current) {
                await sendTrackingData(true, 100);
            }
        };

        const handleLoadedMetadata = () => {
            if (video && video.duration) {
                console.log("📊 Métadonnées chargées, durée:", video.duration);
                setVideoDuration(video.duration);
            }
        };

        const handlePlaying = () => {
            console.log("▶️ Vidéo en cours de lecture");
            // S'assurer que startTime est défini même si play n'a pas été capturé
            if (!startTimeRef.current) {
                startTimeRef.current = new Date();
                console.log("⏰ StartTime défini via playing:", startTimeRef.current);
            }
        };

        // Vérifier si la vidéo est déjà en cours de lecture
        if (video.readyState >= 2 && !video.paused) {
            // La vidéo est déjà en cours, initialiser startTime
            if (!startTimeRef.current) {
                startTimeRef.current = new Date();
                console.log("⏰ StartTime défini (vidéo déjà en cours)");
            }
        }

        video.addEventListener("play", handlePlay);
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [enableTracking, videoId, auteur, src, sendTrackingData]);

    // Envoyer périodiquement (à 25%, 50%, 75%)
    useEffect(() => {
        if (
            !enableTracking ||
            !videoId ||
            !auteur ||
            !startTimeRef.current ||
            currentTime === 0
        ) {
            return;
        }

        // Si la durée n'est pas encore chargée, on attend
        if (videoDuration === 0) {
            return;
        }
        // Calculer la progression
        const progress = (currentTime / videoDuration) * 100;
        // Déterminer si on doit envoyer les données de suivi
        // Envoi à 10%, 15%, 25%, 50%, 75%
        const shouldTrack =
            (progress >= 10 && progress < 15 && !trackedProgressRef.current.has(10)) ||
            (progress >= 15 && progress < 20 && !trackedProgressRef.current.has(15)) ||
            (progress >= 25 && progress < 30 && !trackedProgressRef.current.has(25)) ||
            (progress >= 50 && progress < 55 && !trackedProgressRef.current.has(50)) ||
            (progress >= 75 && progress < 80 && !trackedProgressRef.current.has(75));

        // Envoyer les données de suivi si nécessaire
        if (shouldTrack) {
            // console.log("📊 Envoi périodique à", Math.floor(progress), "%");
            sendTrackingData(false, progress);
        }
    }, [currentTime, videoDuration, enableTracking, videoId, auteur, sendTrackingData]);

    // Gestion de la fermeture de page
    useEffect(() => {
        if (!enableTracking || !videoId || !auteur || !startTimeRef.current) {
            return;
        }

        const handleBeforeUnload = () => {
            if (videoRef.current && startTimeRef.current && !hasTrackedEndRef.current) {
                // Calculer la progression
                const progress = videoRef.current.duration
                    ? Math.floor(
                          (videoRef.current.currentTime / videoRef.current.duration) * 100
                      )
                    : 0;
                // Calculer la durée
                const duration = Math.floor(
                    (Date.now() - startTimeRef.current.getTime()) / 1000
                );

                // Construire les données de suivi
                const trackingData = {
                    videoId,
                    duration,
                    progress,
                    completed: false,
                    auteur,
                    dateVisualisation: startTimeRef.current.toISOString(),
                };

                // Utiliser sendBeacon pour garantir l'envoi même si la page se ferme
                // Utiliser la route Next.js qui récupère le token depuis les cookies
                const data = JSON.stringify(trackingData);
                const blob = new Blob([data], { type: "application/json" });
                
                // La route Next.js /api/user-journey/video-watch récupère le token depuis les cookies
                console.log("📤 Envoi des données de suivi:", trackingData);
                navigator.sendBeacon(
                    "/api/user-journey/video-watch",
                    blob
                );
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [enableTracking, videoId, auteur]);

    // Gestion du bouton de lecture manuel
    const handleManualPlay = async () => {
        const video = videoRef.current;
        if (!video) return;
        try {
            // L'utilisateur peut choisir d'activer le son ou non
            // On laisse les contrôles natifs gérer le volume
            await video.play();
            setShowPlayButton(false);
            setVideoError(null);
            
            // Initialiser le suivi si ce n'est pas déjà fait
            if (!startTimeRef.current && enableTracking && videoId && auteur) {
                startTimeRef.current = new Date();
                console.log("⏰ StartTime défini via bouton de lecture:", startTimeRef.current);
            }
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
            {question && (
                <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-rose-strong px-2">
                    {question}
                </h3>
            )}
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
                            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                            onClick={handleManualPlay}
                        >
                            ▶️ Lancer la vidéo
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