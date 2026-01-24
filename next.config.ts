import type {NextConfig} from 'next';
import _withPWA from '@ducanh2912/next-pwa';

const withPWA = _withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
} as any);

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['genkit', '@genkit-ai/googleai', '@genkit-ai/firebase'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on native Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'async_hooks': false,
        'net': false,
        'tls': false,
        'fs': false,
        'http2': false,
        'dns': false,
        'dgram': false,
        'child_process': false,
        'buffer': false,
        'events': false,
        'https': false,
        'firebase/app': false,
        'firebase/auth': false,
        'firebase/firestore': false,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);
