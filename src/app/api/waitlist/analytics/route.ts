import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();
    
    // Check if user is admin (you might want to add proper auth here)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get waitlist data
    const { data: waitlist, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by UTM source
    const bySource = waitlist.reduce((acc: Record<string, number>, item: any) => {
      const source = item.utm_source || 'direct';
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source]++;
      return acc;
    }, {} as Record<string, number>);

    // Group by campaign
    const byCampaign = waitlist.reduce((acc: Record<string, number>, item: any) => {
      const campaign = item.utm_campaign || 'untracked';
      if (!acc[campaign]) {
        acc[campaign] = 0;
      }
      acc[campaign]++;
      return acc;
    }, {} as Record<string, number>);

    // Get signups over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSignups = waitlist.filter(
      item => new Date(item.created_at) >= thirtyDaysAgo
    );

    // Format for line chart
    const signupsByDay = recentSignups.reduce((acc: Record<string, number>, item: any) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as Record<string, number>);

    // Format for table
    const recentSignupsFormatted = recentSignups.map(item => ({
      id: item.id,
      email: item.email,
      source: item.utm_source || 'direct',
      campaign: item.utm_campaign || 'untracked',
      medium: item.utm_medium || 'none',
      location: [item.city, item.region, item.country].filter(Boolean).join(', ') || 'Unknown',
      date: new Date(item.created_at).toLocaleDateString(),
      timestamp: item.created_at
    }));

    return NextResponse.json({
      summary: {
        total: waitlist.length,
        bySource,
        byCampaign,
        signupsByDay,
      },
      recentSignups: recentSignupsFormatted,
    });

  } catch (error) {
    console.error('Error fetching waitlist analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
