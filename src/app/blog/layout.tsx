import { Metadata, Viewport } from 'next';

// Base URL for metadata (used for social sharing)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('https://getplately.com');

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: 'Blog - Plately',
  description: 'Latest articles and news from Plately about restaurant marketing, social media strategies, and food photography tips.',
  metadataBase: baseUrl,
  
  // Open Graph / Facebook
  openGraph: {
    title: 'Blog - Plately',
    description: 'Latest articles and news from Plately about restaurant marketing and social media strategies.',
    url: new URL('/blog', baseUrl).toString(),
    siteName: 'Plately',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: new URL('/og-blog.jpg', baseUrl).toString(),
        width: 1200,
        height: 630,
        alt: 'Plately Blog - Restaurant Marketing & Social Media Tips',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Plately',
    description: 'Latest articles and news from Plately about restaurant marketing and social media strategies.',
    images: [new URL('/twitter-blog.jpg', baseUrl).toString()],
    creator: '@getplately',
  },
  
  // Other metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <main className="isolate">
        {children}
      </main>
    </div>
  );
}
