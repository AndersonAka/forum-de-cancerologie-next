# Système de Suivi Automatique des Visites de Pages

## Vue d'ensemble

Ce système permet de suivre automatiquement les visites de pages et le temps passé par les utilisateurs sur chaque page, avec envoi des données vers une API NestJS.

## Architecture

### Composants principaux :

1. **`pageTrackingService`** (`app/services/pageTracking.service.ts`)
   - Service pour communiquer avec l'API NestJS
   - Gestion des erreurs et retry automatique
   - Stockage local des données en attente

2. **`usePageTracking`** (`app/hooks/usePageTracking.ts`)
   - Hook React pour gérer le suivi des pages
   - Mesure du temps passé
   - Gestion des événements de navigation

3. **`PageTrackingProvider`** (`app/components/PageTrackingProvider.tsx`)
   - Provider global pour initialiser le système
   - Retry périodique des données en attente

4. **`PageTracker`** (`app/components/PageTracker.tsx`)
   - Composant pour intégrer facilement le suivi

## Configuration

### Variables d'environnement :

```env
# URL de l'API NestJS
NEXT_PUBLIC_API_URL=http://localhost:3001

# Configuration du suivi
NEXT_PUBLIC_PAGE_TRACKING_ENABLED=true
NEXT_PUBLIC_PAGE_TRACKING_MIN_TIME=5
```

## Utilisation

### 1. Intégration globale (déjà fait)

Le système est déjà intégré dans le layout principal :

```tsx
// app/layout.tsx
<AuthProvider>
  <PageTrackingProvider>
    {/* Contenu de l'app */}
  </PageTrackingProvider>
</AuthProvider>
```

### 2. Suivi automatique des pages protégées

Le layout des pages protégées inclut déjà le suivi :

```tsx
// app/(protected)/layout.tsx
<PageTracker 
  enabled={true}
  minTimeSpent={3}
  trackOnUnload={true}
/>
```

### 3. Utilisation dans une page spécifique

```tsx
import { usePageTracking } from '@/app/hooks/usePageTracking';

export default function MaPage() {
  usePageTracking({
    enabled: true,
    minTimeSpent: 5, // 5 secondes minimum
    trackOnUnload: true
  });

  return <div>Contenu de la page</div>;
}
```

### 4. Contrôle manuel

```tsx
import { usePageTracking } from '@/app/hooks/usePageTracking';

export default function MaPage() {
  const { startTracking, stopTracking, isTracking } = usePageTracking({
    enabled: false // Désactiver le suivi automatique
  });

  const handleStartTracking = () => {
    startTracking('/ma-page');
  };

  const handleStopTracking = () => {
    stopTracking();
  };

  return (
    <div>
      <button onClick={handleStartTracking}>Commencer le suivi</button>
      <button onClick={handleStopTracking}>Arrêter le suivi</button>
      <p>Suivi actif : {isTracking ? 'Oui' : 'Non'}</p>
    </div>
  );
}
```

## Fonctionnalités

### ✅ Suivi automatique
- Détection automatique des changements de page
- Mesure précise du temps passé
- Support des SPA (Single Page Applications)

### ✅ Gestion des erreurs
- Stockage local des données en cas d'échec
- Retry automatique avec backoff
- Nettoyage des anciennes données

### ✅ Performance
- Envoi asynchrone des données
- Pas d'impact sur l'expérience utilisateur
- Optimisé pour mobile et desktop

### ✅ Robustesse
- Gestion de la perte de connexion
- Support des changements d'onglet
- Envoi avant fermeture de la page

## Format des données envoyées

```json
{
  "userId": 123,
  "pageUrl": "/dashboard",
  "timeSpent": 120,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## API Backend attendue

### Endpoint : `POST /page-visits`

**Headers :**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "userId": "number",
  "pageUrl": "string",
  "timeSpent": "number (optionnel)",
  "timestamp": "string (optionnel)"
}
```

**Réponse :**
```json
{
  "success": "boolean",
  "message": "string (optionnel)"
}
```

## Monitoring et Debug

### Logs dans la console :

```
PageTracking: Service initialisé avec succès
PageTracking: Début du suivi pour /dashboard
PageTracking: Fin du suivi, temps passé: 45s
PageTracking: Tentative de retry pour 3 visites en attente
PageTracking: 2 visites retryées avec succès
```

### Données stockées localement :

- Clé : `pending_page_visits`
- Format : Array de visites en attente
- Nettoyage automatique après 24h

## Exemples d'utilisation avancée

### Suivi conditionnel selon l'utilisateur

```tsx
const { user } = useAuth();

usePageTracking({
  enabled: user?.role === 'admin',
  minTimeSpent: 10
});
```

### Suivi avec métadonnées personnalisées

```tsx
const { startTracking } = usePageTracking({ enabled: false });

useEffect(() => {
  startTracking('/dashboard?section=analytics');
}, []);
```

### Désactivation pour certains environnements

```tsx
usePageTracking({
  enabled: process.env.NODE_ENV === 'production'
});
``` 