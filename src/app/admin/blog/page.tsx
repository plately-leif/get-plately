'use client';

import { Title, Text } from '@tremor/react';

export default function BlogPage() {
  // Define a consistent card style class
  const cardStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cardStyle}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Title className="text-xl font-bold text-gray-900">Blog</Title>
            <Text className="mt-1 text-sm text-gray-500">Manage your blog posts and content</Text>
          </div>
        </div>
      </div>
      
      {/* Content Placeholder */}
      <div className={cardStyle}>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <path d="M11 11l-4 4"></path>
            </svg>
          </div>
          <Title className="text-xl font-semibold text-gray-900 mb-2">Blog Management Coming Soon</Title>
          <Text className="text-gray-500 max-w-md">
            The blog management interface is currently under development. Check back soon to create and manage your blog content.
          </Text>
        </div>
      </div>
    </div>
  );
}
