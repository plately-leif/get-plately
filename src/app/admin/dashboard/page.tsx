'use client';

import { Title, Text } from '@tremor/react';

export default function DashboardPage() {
  // Define a consistent card style class
  const cardStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cardStyle}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Title className="text-xl font-bold text-gray-900">Dashboard</Title>
            <Text className="mt-1 text-sm text-gray-500">Marketing performance overview</Text>
          </div>
        </div>
      </div>
      
      {/* Content Placeholder */}
      <div className={cardStyle}>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 14v1" />
              <path d="M9 19v2" />
              <path d="M9 3v2" />
              <path d="M9 9v1" />
              <path d="M15 14v1" />
              <path d="M15 19v2" />
              <path d="M15 3v2" />
              <path d="M15 9v1" />
            </svg>
          </div>
          <Title className="text-xl font-semibold text-gray-900 mb-2">Dashboard Coming Soon</Title>
          <Text className="text-gray-500 max-w-md">
            The marketing dashboard is currently under development. Check back soon for analytics and performance metrics.
          </Text>
        </div>
      </div>
    </div>
  );
}
