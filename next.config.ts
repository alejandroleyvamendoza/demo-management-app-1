import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    skipTrailingSlashRedirect: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://8p31dfn0-3000.usw3.devtunnels.ms/api/:path*', // Reemplaza 'your_local_port' con el puerto correcto
            },
        ];
    },

};

export default nextConfig;
