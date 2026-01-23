/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['genkit', '@genkit-ai/googleai', '@genkit-ai/firebase'],
  },
};

export default nextConfig;
