"use client";

import { ReactNode } from "react";

export default function AdminShell({ children }: { children: ReactNode }) {
  // All interactive UI, buttons, etc. go here
  // If you need user info, pass it as a prop from the layout
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
              <form action="/auth/signout" method="post" className="m-0">
                <button
                  type="submit"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  onClick={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget.form;
                    if (form) {
                      await fetch("/auth/signout", {
                        method: "POST",
                        redirect: "manual",
                      });
                      window.location.href = "/signin";
                    }
                  }}
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
