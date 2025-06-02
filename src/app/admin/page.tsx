'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
        return;
      }

      // Get user data
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!userData || userData.role !== 'admin') {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setUser(userData);
      setLoading(false);
    };

    checkSession();
  }, [router, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-indigo-800">Welcome, {user?.email}</h2>
              <p className="mt-2 text-sm text-gray-600">You have admin privileges.</p>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <a
                  href="/admin/collections/blog-posts"
                  className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Manage Blog Posts
                </a>
                <a
                  href="/admin/collections/media"
                  className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Manage Media
                </a>
                <a
                  href="/admin/collections/users"
                  className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Manage Users
                </a>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Account</h3>
              <div className="mt-4 space-y-3">
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/admin/login');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
