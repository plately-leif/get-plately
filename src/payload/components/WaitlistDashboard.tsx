'use client';

import React from 'react';
import { AdminViewProps } from 'payload/config';

const WaitlistDashboard: React.FC<AdminViewProps> = ({ user }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.email || 'Admin'}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Waitlist Analytics</h2>
        <p className="text-gray-600">
          This is a placeholder for the Waitlist dashboard. The full dashboard will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default WaitlistDashboard;
