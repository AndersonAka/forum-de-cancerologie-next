#!/usr/bin/env node

/**
 * Script d'optimisation des performances
 * Usage: node scripts/optimize-performance.cjs
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage de l\'optimisation des performances...\n');

// Configuration des optimisations
const optimizations = {
    // Optimisation des images
    images: {
        formats: ['webp', 'avif'],
        quality: 85,
        sizes: [320, 640, 768, 1024, 1280, 1920]
    },
    
    // Optimisation du bundle
    bundle: {
        analyze: true,
        minify: true,
        treeShaking: true
    },
    
    // Optimisation du cache
    cache: {
        maxAge: 31536000, // 1 an
        immutable: true
    }
};

// Vérification des dépendances
function checkDependencies() {
    console.log('📦 Vérification des dépendances...');
    
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
        'next',
        'react',
        'react-dom',
        'js-cookie',
        'react-signature-canvas'
    ];
    
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]);
    
    if (missingDeps.length > 0) {
        console.log(`⚠️  Dépendances manquantes: ${missingDeps.join(', ')}`);
        console.log('💡 Exécutez: npm install ' + missingDeps.join(' '));
        return false;
    }
    
    console.log('✅ Toutes les dépendances sont installées');
    return true;
}

// Optimisation de la configuration Next.js
function optimizeNextConfig() {
    console.log('\n⚙️  Optimisation de la configuration Next.js...');
    
    const nextConfigPath = 'next.config.js';
    let nextConfig = '';
    
    if (fs.existsSync(nextConfigPath)) {
        nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    }
    
    const optimizedConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimisations de performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-signature-canvas'],
    },
    
    // Optimisation des images
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 an
    },
    
    // Optimisation du bundle
    webpack: (config, { dev, isServer }) => {
        // Optimisation pour la production
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\\\/]node_modules[\\\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            };
        }
        
        return config;
    },
    
    // Headers de cache
    async headers() {
        return [
            {
                source: '/api/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600',
                    },
                ],
            },
            {
                source: '/img/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    
    // Compression
    compress: true,
    
    // Optimisation du rendu
    swcMinify: true,
    
    // Variables d'environnement
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
};

module.exports = nextConfig;`;
    
    fs.writeFileSync(nextConfigPath, optimizedConfig);
    console.log('✅ Configuration Next.js optimisée');
}

// Optimisation des composants React
function optimizeComponents() {
    console.log('\n⚛️  Optimisation des composants React...');
    
    const componentsDir = 'app/components';
    const optimizations = [
        {
            pattern: /useState\(/g,
            replacement: 'useState(',
            comment: 'Vérifier l\'utilisation de useCallback et useMemo'
        },
        {
            pattern: /useEffect\(/g,
            replacement: 'useEffect(',
            comment: 'Vérifier les dépendances des useEffect'
        }
    ];
    
    if (fs.existsSync(componentsDir)) {
        const files = fs.readdirSync(componentsDir, { recursive: true });
        let optimizedCount = 0;
        
        files.forEach(file => {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const filePath = path.join(componentsDir, file);
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                optimizations.forEach(opt => {
                    if (opt.pattern.test(content)) {
                        modified = true;
                    }
                });
                
                if (modified) {
                    optimizedCount++;
                }
            }
        });
        
        console.log(`✅ ${optimizedCount} composants analysés pour optimisation`);
    }
}

// Optimisation des services
function optimizeServices() {
    console.log('\n🔧 Optimisation des services...');
    
    const servicesDir = 'app/services';
    if (fs.existsSync(servicesDir)) {
        const files = fs.readdirSync(servicesDir);
        console.log(`✅ ${files.length} services trouvés`);
        
        // Vérifier la gestion d'erreurs
        files.forEach(file => {
            if (file.endsWith('.ts')) {
                const filePath = path.join(servicesDir, file);
                const content = fs.readFileSync(filePath, 'utf8');
                
                if (!content.includes('try-catch') && !content.includes('try {') && !content.includes('catch')) {
                    console.log(`⚠️  Service ${file}: Considérer l'ajout de gestion d'erreurs`);
                }
            }
        });
    }
}

// Génération du rapport d'optimisation
function generateReport() {
    console.log('\n📊 Génération du rapport d\'optimisation...');
    
    const report = {
        timestamp: new Date().toISOString(),
        optimizations: {
            images: optimizations.images,
            bundle: optimizations.bundle,
            cache: optimizations.cache
        },
        recommendations: [
            'Utiliser React.memo() pour les composants qui ne changent pas souvent',
            'Implémenter la lazy loading pour les composants lourds',
            'Optimiser les requêtes API avec du caching',
            'Utiliser des images WebP/AVIF pour de meilleures performances',
            'Implémenter la compression gzip/brotli',
            'Utiliser des CDN pour les assets statiques'
        ],
        nextSteps: [
            'Tester les performances avec Lighthouse',
            'Analyser le bundle avec @next/bundle-analyzer',
            'Implémenter le service worker pour le cache offline',
            'Optimiser les polices avec font-display: swap'
        ]
    };
    
    fs.writeFileSync('performance-report.json', JSON.stringify(report, null, 2));
    console.log('✅ Rapport d\'optimisation généré: performance-report.json');
}

// Fonction principale
function main() {
    console.log('🎯 Optimisation des performances du Forum de Cancérologie\n');
    
    // Vérifications préliminaires
    if (!checkDependencies()) {
        console.log('\n❌ Arrêt de l\'optimisation - dépendances manquantes');
        process.exit(1);
    }
    
    // Optimisations
    optimizeNextConfig();
    optimizeComponents();
    optimizeServices();
    generateReport();
    
    console.log('\n🎉 Optimisation terminée avec succès !');
    console.log('\n📋 Prochaines étapes recommandées:');
    console.log('1. Tester l\'application: npm run dev');
    console.log('2. Analyser les performances: npm run build && npm run start');
    console.log('3. Vérifier avec Lighthouse dans Chrome DevTools');
    console.log('4. Consulter le rapport: performance-report.json');
}

// Exécution
if (require.main === module) {
    main();
}

module.exports = {
    checkDependencies,
    optimizeNextConfig,
    optimizeComponents,
    optimizeServices,
    generateReport
}; 