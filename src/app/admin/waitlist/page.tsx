'use client';

import { useEffect, useState } from 'react';
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Title, Text, Metric } from '@tremor/react';
import { Users, TrendingUp, Download, RefreshCw } from 'lucide-react';

type AnalyticsData = {
  summary: {
    total: number;
    bySource: Record<string, number>;
    byCampaign: Record<string, number>;
    weekly_growth: number;
    weekly_growth_percentage: number;
    signupsByDay: Record<string, number>;
  };
  recentSignups: Array<{
    id: string;
    email: string;
    source: string;
    campaign: string;
    medium: string;
    location: string;
    date: string;
  }>;
};

export default function WaitlistPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/waitlist/analytics', {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Title className="text-xl font-bold text-gray-900">Waitlist</Title>
              <Text className="mt-1 text-sm text-gray-500">Manage and monitor your waitlist signups for Plately.</Text>
            </div>
            <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Text className="text-sm font-medium text-gray-500">Total Signups</Text>
              <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            </div>
            <div className="h-10 w-24 bg-gray-100 rounded-md animate-pulse mt-2"></div>
            <div className="h-4 w-32 bg-gray-100 rounded-md animate-pulse mt-2"></div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Text className="text-sm font-medium text-gray-500">This Week</Text>
              <div className="p-2 rounded-full bg-green-50 text-green-600">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            </div>
            <div className="h-10 w-24 bg-gray-100 rounded-md animate-pulse mt-2"></div>
            <div className="h-4 w-32 bg-gray-100 rounded-md animate-pulse mt-2"></div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Title className="text-lg font-semibold text-gray-900">Recent Signups</Title>
                <Text className="text-sm text-gray-500">Latest waitlist subscribers</Text>
              </div>
              <div className="h-8 w-20 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            <div className="overflow-x-auto -mx-6 mt-4">
              <div className="px-6 py-12 flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
                <p className="text-gray-500">Loading waitlist data...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 border border-red-200">
        <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
        <p className="mt-1 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Extract data with defaults
  const analyticsSummary = {
    total: data?.summary?.total || 0,
    bySource: data?.summary?.bySource || {},
    byCampaign: data?.summary?.byCampaign || {},
    weekly_growth: data?.summary?.weekly_growth || 0,
    weekly_growth_percentage: data?.summary?.weekly_growth_percentage || 0,
    signupsByDay: data?.summary?.signupsByDay || {}
  };
  
  const recentSignups = data?.recentSignups || [];

  // Define a consistent card style class based on the top card in the screenshot
  const cardStyle = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm";
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cardStyle}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Title className="text-xl font-bold text-gray-900">Waitlist</Title>
            <Text className="mt-1 text-sm text-gray-500">Manage and monitor your waitlist signups for Plately.</Text>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Waitlist</span>
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Signups */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <Text className="text-sm font-medium text-gray-500">Total Signups</Text>
            <div className="p-2 rounded-full bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <Metric className="text-3xl font-semibold text-gray-900">
              {analyticsSummary.total.toLocaleString()}
            </Metric>
            <Text className="text-xs text-gray-500">All time waitlist subscribers</Text>
          </div>
        </div>

        {/* This Week */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between mb-2">
            <Text className="text-sm font-medium text-gray-500">This Week</Text>
            <div className="p-2 rounded-full bg-green-50 text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-end gap-2">
              <Metric className="text-3xl font-semibold text-gray-900">
                {analyticsSummary.weekly_growth.toLocaleString()}
              </Metric>
              {analyticsSummary.weekly_growth_percentage > 0 && (
                <Text className="text-sm font-medium text-green-600 mb-1">
                  +{analyticsSummary.weekly_growth_percentage}%
                </Text>
              )}
            </div>
            <Text className="text-xs text-gray-500">New subscribers this week</Text>
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="mt-6">
        <div className={`${cardStyle} overflow-hidden`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title className="text-lg font-semibold text-gray-900">Recent Signups</Title>
              <Text className="text-sm text-gray-500">Latest waitlist subscribers</Text>
            </div>
            <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <span>View all</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto -mx-6 mt-4">
            <Table className="w-full">
              <TableHead>
                <TableRow className="border-b border-gray-200">
                  <TableHeaderCell className="text-gray-600 text-xs font-medium uppercase tracking-wider pl-6">Email</TableHeaderCell>
                  <TableHeaderCell className="text-gray-600 text-xs font-medium uppercase tracking-wider">Location</TableHeaderCell>
                  <TableHeaderCell className="text-gray-600 text-xs font-medium uppercase tracking-wider pr-6">Date</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentSignups.length > 0 ? (
                  recentSignups.map((signup) => (
                    <TableRow key={signup.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <TableCell className="py-4 text-sm font-medium text-gray-900 pl-6">{signup.email}</TableCell>
                      <TableCell className="text-sm text-gray-500">{signup.location || 'Unknown'}</TableCell>
                      <TableCell className="text-sm text-gray-500 pr-6">{signup.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="w-8 h-8 text-gray-300" />
                        <Text>No recent signups found</Text>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
