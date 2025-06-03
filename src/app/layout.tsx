import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

  openGraph: {
    title: "Plately – AI Social-Media Marketing for Restaurants",
    description:
     "Effortlessly create stunning social media posts for your food business with Plately! Generate, schedule, track content and engagement. No design skills needed.",
    url: "https://plately.com",
    siteName: "Plately",
    images: [
      {
        url: "/plately-og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Plately turns menu photos into social-media posts"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Plately – AI Social-Media Marketing for Restaurants",
    description:
      "Create scroll-stopping food posts in seconds. Plately is the all-in-one AI scheduler made for restaurants.",
    images: ["/plately-og-1200x630.jpg"],
    creator: "@plately"
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
