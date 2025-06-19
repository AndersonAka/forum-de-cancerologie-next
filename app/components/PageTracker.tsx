'use client';

import { usePageTracking } from '@/app/hooks/usePageTracking';

interface PageTrackerProps {
    enabled?: boolean;
    minTimeSpent?: number;
    trackOnUnload?: boolean;
}

export function PageTracker({
    enabled = true,
    minTimeSpent = 5,
    trackOnUnload = true
}: PageTrackerProps) {
    // Utiliser le hook de suivi des pages
    usePageTracking({
        enabled,
        minTimeSpent,
        trackOnUnload
    });

    // Ce composant ne rend rien, il sert juste à initialiser le suivi
    return null;
} 