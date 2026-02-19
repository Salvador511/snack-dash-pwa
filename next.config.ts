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
            maxAgeSeconds: 60 * 60 * 24, // 24 horas
          },
          networkTimeoutSeconds: 5,
        },
      },
    ],
  },
});

export default (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig;
  }
  return withPwa(nextConfig);
};
