import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Base URL for metadata (used for social sharing)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('https://getplately.com');

export const metadata: Metadata = {
  metadataBase: baseUrl,
  
  // ≤ 60 chars, front-loads the primary keyword
  title: "Plately – AI Social-Media Marketing for Restaurants",

  // 150-160 chars, action-oriented + keyword-rich
  description:
    "Convert menu photos to stunning posts for Instagram, Facebook, TikTok & more in minutes. Plately's AI generator, scheduler & analytics are built exclusively for restaurants.",

  // Focus on long-tail, high-intent phrases; 4-8 keywords is plenty
  keywords: [
    "restaurant social media",
    "AI food photo generator",
    "menu-based content",
    "restaurant marketing automation",
    "Instagram for cafés",
    "food business social scheduler",
    "AI social media manager",
  ],

  authors: [{ name: "Plately" }],
  creator: "Plately",
  publisher: "Plately",
  
  // Open Graph / Facebook
  openGraph: {
    title: "Plately – AI Social-Media Marketing for Restaurants",
    description: "Convert menu photos to stunning social media posts in minutes with Plately's AI-powered restaurant marketing tools.",
    url: baseUrl.toString(),
    siteName: "Plately",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: new URL('/og-image.jpg', baseUrl).toString(),
        width: 1200,
        height: 630,
        alt: 'Plately - AI-Powered Social Media for Restaurants',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "Plately – AI Social-Media Marketing for Restaurants",
    description: "Convert menu photos to stunning social media posts in minutes with Plately's AI-powered restaurant marketing tools.",
    images: [new URL('/twitter-image.jpg', baseUrl).toString()],
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
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  // Theme color moved to viewport export
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Theme color properly placed in viewport
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Add any additional head elements here */}
      </head>
      <body className={`${inter.className} min-h-screen bg-white`}>
        {children}
      </body>
    </html>
  );
}
