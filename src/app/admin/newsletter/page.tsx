'use client';

import { Title, Text } from '@tremor/react';

export default function NewsletterPage() {
  // Define a consistent card style class
  const cardStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cardStyle}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Title className="text-xl font-bold text-gray-900">Newsletter</Title>
            <Text className="mt-1 text-sm text-gray-500">Manage your newsletter subscribers and campaigns</Text>
          </div>
        </div>
      </div>
      
      {/* Content Placeholder */}
      <div className={cardStyle}>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <rect width="16" height="13" x="4" y="5" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              <path d="M7 12h10"></path>
              <path d="M7 16h10"></path>
            </svg>
          </div>
          <Title className="text-xl font-semibold text-gray-900 mb-2">Newsletter Management Coming Soon</Title>
          <Text className="text-gray-500 max-w-md">
            The newsletter management interface is currently under development. Check back soon to create campaigns and manage your subscribers.
          </Text>
        </div>
      </div>
    </div>
  );
}
