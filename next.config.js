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
            allowedOrigins: ['localhost:3000', 'forum-cancerologie.vercel.app'],
        },
    },
}

module.exports = nextConfig 