import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/utils/supabase/server';
import AdminShell from './AdminShell';

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
