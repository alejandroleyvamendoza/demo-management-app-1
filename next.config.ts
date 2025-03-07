import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/',
                destination: 'https://8p31dfn0-3000.usw3.devtunnels.ms/api/:path*', // Reemplaza 'your_local_port' con el puerto correcto
            },
        ];
    },

};

export default nextConfig;
