'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart2, Settings, LogOut, Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Newsletter', href: '/admin/newsletter', icon: BarChart2 },
  { name: 'Waitlist', href: '/admin/waitlist', icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/signin';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-white border-r border-gray-200`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
            <Link href="/admin/dashboard" className="flex items-center">
              <img 
                src="https://wiqdmiimlxxuhrvhhuxs.supabase.co/storage/v1/object/sign/website-assets/plately-marketing-b-w.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83MjFkNWFmMy04OTI0LTRjMWItYWE1YS02MzFkMWM4N2M3M2YiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9wbGF0ZWx5LW1hcmtldGluZy1iLXcuc3ZnIiwiaWF0IjoxNzQ5MDcwNTc4LCJleHAiOjIwNjQ0MzA1Nzh9.FFeT32p80xfcjUOskd_NvEM3Veo2ElmcBVyhqWpjLoc" 
                alt="Plately Marketing" 
                className="h-10 w-auto" 
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Settings & Sign out */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/admin/settings"
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                pathname === '/admin/settings'
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-left text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
