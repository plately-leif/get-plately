'use client';

import React, { useEffect, useState } from 'react';
import { useConfig, useAuth } from 'payload/components/utilities';
import { AdminView } from 'payload/config';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

// Simple loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-50 rounded-md">
    <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
    <p className="mt-2 text-sm text-red-700">{message}</p>
  </div>
);

interface WaitlistStats {
  total: number;
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
  recentSignups: Array<{
    id: string;
    email: string;
    source: string;
    campaign: string;
    medium: string;
    createdAt: string;
  }>;
}

const Dashboard: AdminView = () => {
  const { user } = useAuth<User>();
  const {
    serverURL,
    routes: { api },
  } = useConfig();
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${serverURL}${api}/waitlist/stats`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch waitlist stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching waitlist stats:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [serverURL, api]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.email}</h1>
      
      {stats && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Signups</h3>
              <p className="mt-1 text-3xl font-semibold">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Traffic Sources</h3>
              <p className="mt-1 text-3xl font-semibold">{Object.keys(stats.bySource).length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Active Campaigns</h3>
              <p className="mt-1 text-3xl font-semibold">
                {Object.keys(stats.byCampaign).filter(k => k !== 'untracked').length}
              </p>
            </div>
          </div>

          {/* Recent Signups */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Signups</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentSignups.map((signup) => (
                    <tr key={signup.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {signup.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {signup.source || 'direct'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {signup.campaign !== 'untracked' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {signup.campaign}
                          </span>
                        ) : (
                          <span className="text-gray-500">Untracked</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(signup.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
