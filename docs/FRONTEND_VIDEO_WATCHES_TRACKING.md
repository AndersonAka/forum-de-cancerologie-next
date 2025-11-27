# Enregistrement des Vidéos Regardées - Guide Frontend

## 📋 Vue d'ensemble

Ce document explique comment enregistrer les données lorsqu'un utilisateur regarde une vidéo. Il couvre l'endpoint API, la structure des données à envoyer, et des exemples d'implémentation complets pour React/Next.js.

> **Note** : Pour récupérer et afficher les données de vidéos regardées, consultez le document [FRONTEND_VIDEO_WATCHES_INTEGRATION.md](./FRONTEND_VIDEO_WATCHES_INTEGRATION.md).

## 📤 Enregistrement d'une vidéo regardée

### Endpoint : `POST /user-journey/video-watch`

**URL complète :** `http://localhost:3001/user-journey/video-watch`

**Méthode :** `POST`

**Authentification :** Requise (Bearer Token)

**Headers :**
```
Authorization: Bearer <votre_token_jwt>
Content-Type: application/json
```

### Structure de la requête

```typescript
interface TrackVideoWatchRequest {
  videoId: string;              // ID unique de la vidéo (requis)
  duration: number;             // Durée de visualisation en secondes (requis)
  progress: number;             // Progression en pourcentage 0-100 (requis)
  completed: boolean;           // Indique si la vidéo a été complétée (requis)
  auteur: string;               // Nom de l'auteur de la vidéo (requis)
  dateVisualisation: string;     // Date de visualisation au format ISO 8601 (requis)
}
```

### Exemple de requête

```json
{
  "videoId": "video-123",
  "duration": 145,
  "progress": 100,
  "completed": true,
  "auteur": "Dr. Martin",
  "dateVisualisation": "2025-11-27T04:22:43.000Z"
}
```

### Exemple de réponse

```json
{
  "id": 1,
  "userId": 11,
  "videoId": "video-123",
  "startTime": "2025-11-27T04:22:43.000Z",
  "endTime": "2025-11-27T04:25:08.000Z",
  "duration": 145,
  "progress": 100,
  "completed": true,
  "auteur": "Dr. Martin",
  "dateVisualisation": "2025-11-27T04:22:43.000Z"
}
```

## 💻 Exemple d'implémentation

### 1. Service API

Créez ou ajoutez dans `services/videoWatchesService.ts` :

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface VideoWatch {
  id: number;
  userId: number;
  videoId: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  progress: number | null;
  completed: boolean;
  auteur: string;
  dateVisualisation: string;
}

export interface TrackVideoWatchRequest {
  videoId: string;
  duration: number;
  progress: number;
  completed: boolean;
  auteur: string;
  dateVisualisation: string; // ISO 8601 format
}

export const videoWatchesService = {
  /**
   * Enregistre une visualisation de vidéo
   * @param token - Token JWT d'authentification
   * @param data - Données de la visualisation
   */
  async trackVideoWatch(
    token: string,
    data: TrackVideoWatchRequest
  ): Promise<VideoWatch> {
    const response = await axios.post<VideoWatch>(
      `${API_BASE_URL}/user-journey/video-watch`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },
};
```

### 2. Hook React pour enregistrer

Créez un fichier `hooks/useTrackVideoWatch.ts` :

```typescript
import { useState } from 'react';
import { videoWatchesService, TrackVideoWatchRequest, VideoWatch } from '@/services/videoWatchesService';

export const useTrackVideoWatch = (token: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const trackVideoWatch = async (data: TrackVideoWatchRequest): Promise<VideoWatch | null> => {
    if (!token) {
      setError('Token d\'authentification manquant');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await videoWatchesService.trackVideoWatch(token, data);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de l\'enregistrement de la visualisation';
      setError(errorMessage);
      console.error('Erreur:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { trackVideoWatch, loading, error };
};
```

### 3. Exemple d'utilisation dans un composant vidéo complet

Créez un fichier `components/VideoPlayer.tsx` :

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTrackVideoWatch } from '@/hooks/useTrackVideoWatch';

interface VideoPlayerProps {
  videoId: string;
  auteur: string;
  videoDuration: number; // Durée totale de la vidéo en secondes
}

export default function VideoPlayer({ videoId, auteur, videoDuration }: VideoPlayerProps) {
  const { token } = useAuth();
  const { trackVideoWatch, loading, error } = useTrackVideoWatch(token);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasTracked, setHasTracked] = useState(false);
  const startTimeRef = useRef<Date | null>(null);

  // Démarrer le suivi quand la vidéo commence
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!startTimeRef.current) {
        startTimeRef.current = new Date();
      }
    };

    const handleTimeUpdate = () => {
      if (video) {
        setCurrentTime(video.currentTime);
      }
    };

    const handleEnded = async () => {
      await sendTrackingData(true, 100);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Envoyer les données de suivi
  const sendTrackingData = async (completed: boolean, progress: number) => {
    if (hasTracked || !startTimeRef.current) return;

    const duration = Math.floor(Date.now() / 1000) - Math.floor(startTimeRef.current.getTime() / 1000);
    
    const trackingData = {
      videoId,
      duration,
      progress: Math.min(100, Math.max(0, progress)),
      completed,
      auteur,
      dateVisualisation: startTimeRef.current.toISOString(),
    };

    const result = await trackVideoWatch(trackingData);
    if (result) {
      setHasTracked(true);
      console.log('✅ Visualisation enregistrée avec succès');
    }
  };

  // Envoyer périodiquement (toutes les 30 secondes ou à 25%, 50%, 75%)
  useEffect(() => {
    if (!videoRef.current || !startTimeRef.current) return;

    const progress = (currentTime / videoDuration) * 100;
    const shouldTrack = 
      progress >= 25 && progress < 30 ||
      progress >= 50 && progress < 55 ||
      progress >= 75 && progress < 80;

    if (shouldTrack && !hasTracked) {
      sendTrackingData(false, progress);
    }
  }, [currentTime, videoDuration, hasTracked]);

  return (
    <div>
      <video
        ref={videoRef}
        src={`/videos/${videoId}.mp4`}
        controls
        className="w-full"
      />
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          ⚠️ Erreur: {error}
        </div>
      )}
      {loading && (
        <div className="mt-2 text-gray-600 text-sm">
          Enregistrement de la visualisation...
        </div>
      )}
    </div>
  );
}
```

### 4. Exemple simplifié (envoi unique à la fin)

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { videoWatchesService } from '@/services/videoWatchesService';

export default function SimpleVideoTracker({ videoId, auteur }: { videoId: string; auteur: string }) {
  const { token } = useAuth();

  const handleVideoEnd = async (duration: number) => {
    if (!token) {
      console.error('Token manquant');
      return;
    }

    try {
      await videoWatchesService.trackVideoWatch(token, {
        videoId,
        duration: Math.floor(duration),
        progress: 100,
        completed: true,
        auteur,
        dateVisualisation: new Date().toISOString(),
      });
      console.log('✅ Visualisation enregistrée');
    } catch (error) {
      console.error('❌ Erreur:', error);
    }
  };

  return (
    <video
      onEnded={(e) => {
        const video = e.currentTarget;
        handleVideoEnd(video.duration);
      }}
      src={`/videos/${videoId}.mp4`}
      controls
    />
  );
}
```

## 📝 Points importants

### 1. Moment d'envoi

Vous pouvez envoyer les données à différents moments :

- **À la fin de la vidéo** (quand `completed: true`) - Recommandé pour les vidéos courtes
- **Périodiquement pendant la lecture** (toutes les 30 secondes, ou à 25%, 50%, 75%) - Pour suivre la progression
- **Quand l'utilisateur quitte la page** (avec `beforeunload`) - Pour ne pas perdre les données

### 2. Calcul de la progression

```typescript
const progress = (currentTime / totalDuration) * 100;
// Assurez-vous que progress est entre 0 et 100
const clampedProgress = Math.min(100, Math.max(0, progress));
```

### 3. Calcul de la durée

```typescript
// Si vous avez un timestamp de début
const startTime = new Date();
// ... plus tard ...
const endTime = new Date();
const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000); // en secondes

// Ou directement depuis l'élément vidéo
const duration = Math.floor(videoElement.currentTime); // en secondes
```

### 4. Gestion des erreurs

Toujours gérer les cas suivants :

```typescript
try {
  await videoWatchesService.trackVideoWatch(token, data);
} catch (error: any) {
  if (error.response?.status === 401) {
    // Token expiré - rediriger vers la page de connexion
    console.error('Token expiré');
  } else if (error.response?.status === 500) {
    // Erreur serveur - réessayer plus tard
    console.error('Erreur serveur');
  } else {
    // Autre erreur
    console.error('Erreur:', error.message);
  }
}
```

### 5. Format de date

Utilisez toujours le format ISO 8601 :

```typescript
const date = new Date();
const isoString = date.toISOString(); // "2025-11-27T04:22:43.000Z"
```

### 6. Gestion de la fermeture de page

Pour garantir l'envoi même si l'utilisateur ferme la page :

```typescript
useEffect(() => {
  const handleBeforeUnload = async () => {
    if (startTimeRef.current && !hasTracked) {
      // Envoyer les données avant que la page ne se ferme
      const duration = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
      const progress = videoRef.current 
        ? Math.floor((videoRef.current.currentTime / videoRef.current.duration) * 100)
        : 0;

      // Utiliser sendBeacon pour garantir l'envoi même si la page se ferme
      const data = JSON.stringify({
        videoId,
        duration,
        progress,
        completed: false,
        auteur,
        dateVisualisation: startTimeRef.current.toISOString(),
      });

      // sendBeacon est asynchrone et fonctionne même si la page se ferme
      navigator.sendBeacon(
        `${API_BASE_URL}/user-journey/video-watch`,
        new Blob([data], { type: 'application/json' })
      );
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [videoId, auteur, hasTracked]);
```

**Note importante** : `sendBeacon` ne supporte pas les headers personnalisés comme `Authorization`. Vous devrez peut-être passer le token dans le body ou utiliser une autre méthode.

### 7. Alternative avec token dans le body

Si vous devez utiliser `sendBeacon`, vous pouvez modifier l'endpoint pour accepter le token dans le body :

```typescript
const data = JSON.stringify({
  token, // Ajouter le token dans le body
  videoId,
  duration,
  progress,
  completed: false,
  auteur,
  dateVisualisation: startTimeRef.current.toISOString(),
});
```

## 🎯 Stratégies de suivi recommandées

### Stratégie 1 : Suivi à la fin (simple)

**Avantages :**
- Simple à implémenter
- Moins de requêtes API
- Données précises

**Inconvénients :**
- Perte de données si l'utilisateur ferme la page avant la fin
- Pas de suivi de progression

**Utilisation :** Vidéos courtes (< 5 minutes)

### Stratégie 2 : Suivi périodique

**Avantages :**
- Suivi de progression
- Moins de perte de données

**Inconvénients :**
- Plus de requêtes API
- Plus complexe à implémenter

**Utilisation :** Vidéos longues (> 5 minutes)

### Stratégie 3 : Suivi hybride

**Avantages :**
- Meilleur des deux mondes
- Suivi de progression + données finales

**Implémentation :**
- Envoyer à 25%, 50%, 75% (progression)
- Envoyer à la fin (données finales)

## ⚠️ Notes importantes

1. **Authentification** : Toutes les routes nécessitent un token JWT valide
2. **Validation** : Validez les données avant l'envoi (progress entre 0-100, duration positive, etc.)
3. **Performance** : Évitez d'envoyer trop fréquemment (limitez à toutes les 30 secondes minimum)
4. **Sécurité** : Ne jamais exposer le token JWT dans les logs ou le code client
5. **Idempotence** : L'API peut créer plusieurs enregistrements pour la même vidéo (c'est normal)

## 📝 Checklist d'implémentation

- [ ] Créer le service API (`videoWatchesService.ts`)
- [ ] Créer le hook React (`useTrackVideoWatch.ts`)
- [ ] Intégrer dans le composant vidéo
- [ ] Implémenter le calcul de progression
- [ ] Implémenter le calcul de durée
- [ ] Ajouter la gestion d'erreurs
- [ ] Ajouter la gestion de fermeture de page (optionnel)
- [ ] Tester avec différents scénarios :
  - [ ] Vidéo complétée
  - [ ] Vidéo interrompue
  - [ ] Fermeture de page pendant la lecture
  - [ ] Erreur réseau
  - [ ] Token expiré

---

**Dernière mise à jour :** 27 novembre 2025

