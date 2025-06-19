import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  pageTrackingService,
  PageVisitData,
} from "@/app/services/pageTracking.service";

interface PageTrackingOptions {
  enabled?: boolean;
  minTimeSpent?: number; // Temps minimum en secondes pour enregistrer une visite
  trackOnUnload?: boolean; // Envoyer les données quand l'utilisateur quitte la page
}

export function usePageTracking(options: PageTrackingOptions = {}) {
  const {
    enabled = true,
    minTimeSpent = 5, // 5 secondes minimum
    trackOnUnload = true,
  } = options;

  const router = useRouter();
  const { user } = useAuth();
  const startTimeRef = useRef<number>(Date.now());
  const currentPageRef = useRef<string>("");
  const isTrackingRef = useRef<boolean>(false);

  // Fonction pour envoyer les données de visite
  const sendPageVisit = useCallback(
    async (pageUrl: string, timeSpent: number) => {
      if (!enabled || !user?.id || timeSpent < minTimeSpent) {
        return;
      }

      const visitData: PageVisitData = {
        userId: user.id,
        pageUrl,
        timeSpent: Math.round(timeSpent / 1000), // Convertir en secondes
      };

      try {
        await pageTrackingService.trackPageVisit(visitData);
      } catch (error) {
        console.error(
          "PageTracking: Erreur lors de l'envoi de la visite:",
          error
        );
      }
    },
    [enabled, user?.id, minTimeSpent]
  );

  // Fonction pour commencer le suivi d'une page
  const startTracking = useCallback(
    (pageUrl: string) => {
      if (!enabled || !user?.id) return;

      // Si on était déjà en train de tracker une page, envoyer les données
      if (isTrackingRef.current && currentPageRef.current) {
        const timeSpent = Date.now() - startTimeRef.current;
        sendPageVisit(currentPageRef.current, timeSpent);
      }

      // Commencer le suivi de la nouvelle page
      currentPageRef.current = pageUrl;
      startTimeRef.current = Date.now();
      isTrackingRef.current = true;

      console.log(`PageTracking: Début du suivi pour ${pageUrl}`);
    },
    [enabled, user?.id, sendPageVisit]
  );

  // Fonction pour arrêter le suivi
  const stopTracking = useCallback(() => {
    if (!isTrackingRef.current || !currentPageRef.current) return;

    const timeSpent = Date.now() - startTimeRef.current;
    sendPageVisit(currentPageRef.current, timeSpent);

    isTrackingRef.current = false;
    currentPageRef.current = "";

    console.log(
      `PageTracking: Fin du suivi, temps passé: ${Math.round(
        timeSpent / 1000
      )}s`
    );
  }, [sendPageVisit]);

  // Gestion des changements de page avec Next.js Router
  useEffect(() => {
    if (!enabled || !user?.id) return;

    // Note: Next.js 13+ App Router n'a plus d'events
    // Le suivi se fait via les hooks de navigation ou pathname
    console.log("PageTracking: Router events non disponibles dans App Router");
  }, [enabled, user?.id, router, startTracking]);

  // Gestion de l'événement beforeunload (quand l'utilisateur quitte la page)
  useEffect(() => {
    if (!enabled || !trackOnUnload || !user?.id) return;

    const handleBeforeUnload = () => {
      if (isTrackingRef.current && currentPageRef.current) {
        const timeSpent = Date.now() - startTimeRef.current;

        // Utiliser sendBeacon pour envoyer les données de manière synchrone
        const visitData: PageVisitData = {
          userId: user.id,
          pageUrl: currentPageRef.current,
          timeSpent: Math.round(timeSpent / 1000),
        };

        try {
          const blob = new Blob([JSON.stringify(visitData)], {
            type: "application/json",
          });

          navigator.sendBeacon(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
            }/page-visits`,
            blob
          );
        } catch (error) {
          console.error(
            "PageTracking: Erreur lors de l'envoi avant fermeture:",
            error
          );
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled, trackOnUnload, user?.id]);

  // Gestion de la visibilité de la page (quand l'utilisateur change d'onglet)
  useEffect(() => {
    if (!enabled || !user?.id) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page cachée, arrêter le suivi temporairement
        if (isTrackingRef.current && currentPageRef.current) {
          const timeSpent = Date.now() - startTimeRef.current;
          sendPageVisit(currentPageRef.current, timeSpent);
          isTrackingRef.current = false;
        }
      } else {
        // Page visible, recommencer le suivi
        if (currentPageRef.current) {
          startTimeRef.current = Date.now();
          isTrackingRef.current = true;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, user?.id, sendPageVisit]);

  // Initialisation du suivi pour la page actuelle
  useEffect(() => {
    if (!enabled || !user?.id) return;

    // Démarrer le suivi pour la page actuelle
    const currentUrl = window.location.pathname;
    startTracking(currentUrl);

    // Nettoyer lors du démontage du composant
    return () => {
      stopTracking();
    };
  }, [enabled, user?.id, startTracking, stopTracking]);

  // Retourner les fonctions pour contrôle manuel si nécessaire
  return {
    startTracking,
    stopTracking,
    isTracking: isTrackingRef.current,
    currentPage: currentPageRef.current,
  };
}
