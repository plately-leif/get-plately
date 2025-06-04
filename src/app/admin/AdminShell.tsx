'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';

export default function AdminShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // This is a workaround for hydration issues with the sidebar
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden pl-0 lg:pl-64 transition-all duration-200">
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
