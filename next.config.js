module.exports = {
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
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};