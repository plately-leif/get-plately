/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Ignore specific problematic modules
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^cloudflare:sockets$/,
      })
    );

    // Exclude specific modules from being processed
    config.externals = config.externals || [];
    config.externals.push({
      'drizzle-kit': 'drizzle-kit',
      '@drizzle-kit/plugin': '@drizzle-kit/plugin',
      'esbuild': 'esbuild',
      'pg-native': 'pg-native',
      'pg-cloudflare': 'pg-cloudflare',
    });

    // Ignore TypeScript declaration files
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader',
    });

    // Ignore markdown files
    config.module.rules.push({
      test: /\.md$/,
      loader: 'ignore-loader',
    });

    // Important: return the modified config
    return config;
  },
  
  // Enable experimental features
  experimental: {
    serverComponentsExternalPackages: [
      'pg', 
      'drizzle-kit', 
      '@drizzle-kit/plugin',
      'esbuild',
      'pg-native',
      'pg-cloudflare'
    ],
  },
  
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wiqdmiimlxxuhrvhhuxs.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/website-assets/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
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
  // For Amplify deployment
  output: 'standalone',
  // Enable React strict mode
  reactStrictMode: true,
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