# Scripts Utilitaires

Ce dossier contient les scripts utilitaires pour le projet Forum de Cancérologie.

## 📁 Scripts Disponibles

### 🔧 `upload-handler-simple.php`
Script PHP pour l'upload de signatures sur le serveur OVH.
- **Usage** : À déployer sur le serveur OVH dans le dossier `/medias/signatures/`
- **Fonction** : Gère l'upload direct de fichiers de signature
- **Configuration** : Nécessite un fichier `.htaccess` pour les permissions

### ⚡ `optimize-performance.cjs`
Script d'optimisation des performances de l'application.
- **Usage** : `node scripts/optimize-performance.cjs`
- **Fonction** : Analyse et optimise les performances de l'application Next.js
- **Résultats** : Génère un rapport de performance dans `performance-report.json`

### 🖼️ `optimize-images.js`
Script d'optimisation des images.
- **Usage** : `node scripts/optimize-images.js`
- **Fonction** : Optimise les images du dossier `public/img/`
- **Format** : Convertit et compresse les images pour le web

### 📦 `package.json`
Configuration des dépendances pour les scripts.
- **Usage** : `npm install` dans le dossier scripts
- **Fonction** : Définit les dépendances nécessaires pour les scripts

## 🚀 Utilisation

```bash
# Installer les dépendances des scripts
cd scripts && npm install

# Optimiser les performances
node optimize-performance.cjs

# Optimiser les images
node optimize-images.js
```

## 📋 Scripts Supprimés

Les scripts de test suivants ont été supprimés car ils ne sont plus nécessaires :
- `test-*.cjs` : Scripts de test pour le développement
- `.DS_Store` : Fichier système macOS

## 🔗 Liens Utiles

- [Guide d'installation OVH](../OVH_INSTALLATION_GUIDE.md)
- [Documentation du système de signature](../SIGNATURE_SYSTEM_README.md)
- [Rapport de performance](../performance-report.json) 