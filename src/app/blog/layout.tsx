import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Plately',
  description: 'Latest articles and news from Plately',
  openGraph: {
    title: 'Blog - Plately',
    description: 'Latest articles and news from Plately',
    url: 'https://getplately.com/blog',
    siteName: 'Plately',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Plately',
    description: 'Latest articles and news from Plately',
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
