/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    output: 'standalone',
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', 'https://www.forumcancerologie-roche.com'],
        },
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
}

module.exports = nextConfig 