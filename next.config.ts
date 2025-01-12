import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  skipTrailingSlashRedirect: true,
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
