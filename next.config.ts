import nextI18NextConfig from './next-i18next.config.js';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;