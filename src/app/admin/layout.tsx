import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Metadata, Viewport } from 'next';
import { createServerClient } from '@/utils/supabase/server';
import AdminShell from './AdminShell';

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
  title: 'Admin Dashboard - Plately',
  description: 'Admin dashboard for managing Plately content and settings.',
  metadataBase: baseUrl,
  
  // Open Graph / Facebook
  openGraph: {
    title: 'Admin Dashboard - Plately',
    description: 'Admin dashboard for managing Plately content and settings.',
    url: new URL('/admin', baseUrl).toString(),
    siteName: 'Plately Admin',
    locale: 'en_US',
    type: 'website',
  },
  
  // Prevent indexing of admin pages
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, redirect to sign in
  if (!session) {
    redirect('/signin');
  }

  // Check if user has admin role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (userData?.role !== 'admin') {
    await supabase.auth.signOut();
    redirect('/signin?message=unauthorized');
  }

  // Render the client-side shell for interactivity
  return <AdminShell>{children}</AdminShell>;
}
