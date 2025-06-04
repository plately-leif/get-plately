/** @type {import('next').NextConfig} */
const nextConfig = {
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
  output: 'standalone',
  trailingSlash: true,
  swcMinify: true,
  compress: true,
  // Enable React strict mode
  reactStrictMode: true,
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