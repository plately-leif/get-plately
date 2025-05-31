import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wiqdmiimlxxuhrvhhuxs.supabase.co',
        pathname: '/storage/v1/object/sign/website-assets/**',
      },
    ],
  },
};

export default nextConfig;
