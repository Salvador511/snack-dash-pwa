import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'http.cat',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      }
    ],
  },
}

const withPwa = withPWA({
  dest: "public",
  register: true,
  disable: false,
  fallbacks: {
    document: "/~offline",
  },
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*\/api\/user$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-users-cache',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30, // 24 horas
          },
          networkTimeoutSeconds: 5,
        },
      },
      {
        urlPattern: /^https:\/\/api\.dicebear\.com\/.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'avatar-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

const config = (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig;
  }
  return withPwa(nextConfig);
}

export default config
