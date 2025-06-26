/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optimisations de performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['react-signature-canvas'],
    },
    
    // Configuration des images
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000, // 1 an
        domains: ['localhost','forumcancerologie-roche.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    
    // Configuration TypeScript
    typescript: {
        ignoreBuildErrors: true,
    },
    
    // Optimisation du bundle
    webpack: (config, { dev, isServer }) => {
        // Optimisation pour la production
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            };
        }
        
        return config;
    },
    
    // Rewrites pour l'API
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_URL 
                    ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
                    : 'http://localhost:3001/:path*',
            },
        ];
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
    
    // Optimisations pour la production
    poweredByHeader: false,
    compress: true,
    reactStrictMode: true,
    
    // Variables d'environnement
    env: {
        CUSTOM_KEY: process.env.CUSTOM_KEY,
    },
};

module.exports = nextConfig;