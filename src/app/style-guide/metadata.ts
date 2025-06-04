import { Metadata, Viewport } from 'next';

// Base URL for metadata (used for social sharing)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('https://getplately.com');

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export const metadata: Metadata = {
  title: 'Style Guide - Plately',
  description: 'Design system and style guide for Plately',
  metadataBase: baseUrl,
  robots: {
    index: false,
    follow: false,
  },
};
