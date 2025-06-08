/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Environment variables configuration
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://getplately.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://getplately.com',
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  // For Amplify deployment
  output: 'standalone', // Required for AWS Amplify SSR deployment
  trailingSlash: true,  // Helps with routing consistency
  swcMinify: true,      // Optimizes bundle size
  compress: true,       // Enables gzip compression
  // Disable Edge API routes as they're not supported by Amplify
  experimental: {
    // Disable CSR bailout errors
    missingSuspenseWithCSRBailout: false,
    // Disable server components for better compatibility with Amplify
    serverComponents: false,
    // Improve compatibility with Amplify
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Disable Edge runtime as it's not supported by Amplify
    runtime: 'nodejs',
  },
  // Enable React strict mode
  reactStrictMode: true,
  
  // Add webpack configuration for path aliases
  webpack: (config, { isServer }) => {
    // Add alias for @ to point to src directory
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    return config;
  },
  // Configure images
  images: {
    domains: [
      'localhost',
      'plately-leif-get-plately-dev.s3.amazonaws.com',
      'plately-leif-get-plately-staging.s3.amazonaws.com',
      'plately-leif-get-plately-prod.s3.amazonaws.com',
      's3.amazonaws.com',
      'lh3.googleusercontent.com',
      'wiqdmiimlxxuhrvhhuxs.supabase.co',
      'randomuser.me'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configure CORS for Supabase
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;