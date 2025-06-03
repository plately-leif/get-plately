'use client';

import { useEffect, useState } from 'react';
import { Card, Title, BarChart, LineChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';

type AnalyticsData = {
  summary: {
    total: number;
    bySource: Record<string, number>;
    byCampaign: Record<string, number>;
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

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/waitlist/analytics');
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-md bg-red-50 p-4">
          <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { summary, recentSignups } = data;

  // Format data for charts
  const sourceData = Object.entries(summary.bySource).map(([name, value]) => ({
    name,
    'Signups': value,
  }));

  const campaignData = Object.entries(summary.byCampaign).map(([name, value]) => ({
    name,
    'Signups': value,
  }));

  const timelineData = Object.entries(summary.signupsByDay).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    'Signups': count,
  }));

  return (
    <div className="p-6">
      <Title className="mb-6">Waitlist Analytics</Title>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-tremor-default text-tremor-content">Total Signups</p>
          <p className="text-3xl font-semibold text-tremor-content-strong">
            {summary.total.toLocaleString()}
          </p>
        </Card>
        <Card>
          <p className="text-tremor-default text-tremor-content">Traffic Sources</p>
          <p className="text-3xl font-semibold text-tremor-content-strong">
            {Object.keys(summary.bySource).length}
          </p>
        </Card>
        <Card>
          <p className="text-tremor-default text-tremor-content">Active Campaigns</p>
          <p className="text-3xl font-semibold text-tremor-content-strong">
            {Object.keys(summary.byCampaign).filter(k => k !== 'untracked').length}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <Title>Signups by Source</Title>
          <BarChart
            className="mt-6"
            data={sourceData}
            index="name"
            categories={['Signups']}
            colors={['blue']}
            yAxisWidth={48}
          />
        </Card>
        <Card>
          <Title>Signups by Campaign</Title>
          <BarChart
            className="mt-6"
            data={campaignData}
            index="name"
            categories={['Signups']}
            colors={['green']}
            yAxisWidth={48}
          />
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <Title>Signups Over Time (Last 30 Days)</Title>
          <LineChart
            className="mt-6"
            data={timelineData}
            index="date"
            categories={['Signups']}
            colors={['violet']}
            yAxisWidth={40}
          />
        </Card>
      </div>

      {/* Recent Signups Table */}
      <Card>
        <Title>Recent Signups</Title>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Source</TableHeaderCell>
              <TableHeaderCell>Campaign</TableHeaderCell>
              <TableHeaderCell>Medium</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentSignups.map((signup) => (
              <TableRow key={signup.id}>
                <TableCell>{signup.email}</TableCell>
                <TableCell>
                  <Badge color="blue">{signup.source}</Badge>
                </TableCell>
                <TableCell>
                  {signup.campaign !== 'untracked' ? (
                    <Badge color="green">{signup.campaign}</Badge>
                  ) : (
                    <span className="text-gray-500">Untracked</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge color="yellow">{signup.medium}</Badge>
                </TableCell>
                <TableCell>{signup.location}</TableCell>
                <TableCell>{signup.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
