'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { pageTrackingService } from '@/app/services/pageTracking.service';

interface PageTrackingProviderProps {
    children: ReactNode;
    enabled?: boolean;
}

export function PageTrackingProvider({ children, enabled = true }: PageTrackingProviderProps) {
    const { user, isAuthenticated } = useAuth();

    // Initialiser le service de suivi
    useEffect(() => {
        if (!enabled) return;

        const initializeTracking = async () => {
            try {
                await pageTrackingService.initialize();
                console.log('PageTracking: Service initialisé avec succès');
            } catch (error) {
                console.error('PageTracking: Erreur lors de l\'initialisation:', error);
            }
        };

        initializeTracking();

        // Retry périodique des visites en attente (toutes les 5 minutes)
        const retryInterval = setInterval(async () => {
            if (isAuthenticated && user?.id) {
                try {
                    await pageTrackingService.retryPendingVisits();
                } catch (error) {
                    console.error('PageTracking: Erreur lors du retry périodique:', error);
                }
            }
        }, 5 * 60 * 1000); // 5 minutes

        // Nettoyage périodique des anciennes visites (toutes les heures)
        const cleanupInterval = setInterval(() => {
            try {
                pageTrackingService.cleanupOldPendingVisits();
            } catch (error) {
                console.error('PageTracking: Erreur lors du nettoyage périodique:', error);
            }
        }, 60 * 60 * 1000); // 1 heure

        return () => {
            clearInterval(retryInterval);
            clearInterval(cleanupInterval);
        };
    }, [enabled, isAuthenticated, user?.id]);

    // Retry des visites en attente quand l'utilisateur se connecte
    useEffect(() => {
        if (!enabled || !isAuthenticated || !user?.id) return;

        const retryOnLogin = async () => {
            try {
                await pageTrackingService.retryPendingVisits();
            } catch (error) {
                console.error('PageTracking: Erreur lors du retry après connexion:', error);
            }
        };

        retryOnLogin();
    }, [enabled, isAuthenticated, user?.id]);

    return <>{children}</>;
} 