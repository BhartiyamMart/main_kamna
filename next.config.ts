import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Increased for image uploads
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Turbopack configuration (replaces webpack)
  turbopack: {
    resolveAlias: {
      '@prisma/client': './components/generated/client.ts',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'kamna-erp.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
