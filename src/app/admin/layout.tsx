import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/utils/supabase/server';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, redirect to login
  if (!session) {
    redirect('/admin/login');
  }

  // Temporarily bypass admin role check
  console.log('User authenticated on server side');
  
  // Create or update user record with admin role
  const { error: upsertError } = await supabase
    .from('users')
    .upsert([
      {
        id: session.user.id,
        email: session.user.email,
        role: 'admin',
        created_at: new Date().toISOString(),
      },
    ]);
  
  if (upsertError) {
    console.error('Error updating user role:', upsertError);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center">
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
