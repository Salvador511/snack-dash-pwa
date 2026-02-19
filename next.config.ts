import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
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
  outputFileTracingIncludes: {
    '/*': [
      './generated/prisma/**',
      './node_modules/.prisma/**',
      './node_modules/@prisma/engines/**',
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
});

export default (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig;
  }
  return withPwa(nextConfig);
};
