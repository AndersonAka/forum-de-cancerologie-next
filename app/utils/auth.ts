/**
 * Utilitaires pour la gestion de l'authentification côté client
 */

/**
 * Récupère le token d'authentification depuis plusieurs sources
 * 1. Cookie côté client (document.cookie)
 * 2. localStorage
 * 3. Cookies Next.js (js-cookie)
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  // 1. Essayer document.cookie
  const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  let token = getCookieValue('access_token');
  
  // 2. Fallback: localStorage
  if (!token) {
    token = localStorage.getItem('access_token');
  }

  // 3. Fallback: js-cookie (pour compatibilité)
  if (!token && typeof window !== 'undefined') {
    try {
      const Cookies = require('js-cookie');
      token = Cookies.get('access_token');
    } catch (error) {
      console.warn('js-cookie non disponible:', error);
    }
  }

  return token;
}

/**
 * Sauvegarde le token dans toutes les sources possibles
 */
export function saveAuthToken(token: string): void {
  if (typeof window === 'undefined') return;

  // 1. localStorage
  localStorage.setItem('access_token', token);
  
  // 2. js-cookie (pour compatibilité)
  try {
    const Cookies = require('js-cookie');
    Cookies.set('access_token', token, { expires: 7 });
  } catch (error) {
    console.warn('Impossible de sauvegarder dans js-cookie:', error);
  }

  console.log('🔐 Token sauvegardé dans localStorage');
}

/**
 * Supprime le token de toutes les sources
 */
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;

  // 1. localStorage
  localStorage.removeItem('access_token');
  
  // 2. js-cookie
  try {
    const Cookies = require('js-cookie');
    Cookies.remove('access_token');
  } catch (error) {
    console.warn('Impossible de supprimer de js-cookie:', error);
  }

  console.log('🔐 Token supprimé');
}

/**
 * Crée les headers d'authentification pour les requêtes fetch
 */
export function createAuthHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
} 