import { PayloadRequest } from 'payload/types';
import { Response } from 'express';

interface WaitlistDoc {
  id: string;
  email: string;
  source?: string;
  campaign?: string;
  medium?: string;
  createdAt: string;
  [key: string]: unknown;
}

interface WaitlistResponse {
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

export default async function handler(req: PayloadRequest, res: Response) {
  try {
    const payload = req.payload;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get waitlist data
    const waitlist = await payload.find({
      collection: 'waitlist',
      limit: 1000, // Adjust based on your needs
      sort: '-createdAt',
    });

    // Type assertion for waitlist docs
    const waitlistDocs = waitlist.docs as unknown as WaitlistDoc[];

    // Calculate stats
    const total = waitlist.totalDocs;
    
    const bySource = waitlistDocs.reduce<Record<string, number>>((acc, doc) => {
      const source = doc.source || 'direct';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byCampaign = waitlistDocs.reduce<Record<string, number>>((acc, doc) => {
      const campaign = doc.campaign || 'untracked';
      acc[campaign] = (acc[campaign] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent signups
    const recentSignups = waitlistDocs.slice(0, 10).map((doc) => ({
      id: doc.id,
      email: doc.email,
      source: doc.source || 'direct',
      campaign: doc.campaign || 'untracked',
      medium: doc.medium || 'none',
      createdAt: doc.createdAt,
    }));

    const response: WaitlistResponse = {
      total,
      bySource,
      byCampaign,
      recentSignups,
    };

    return res.json(response);
  } catch (error) {
    console.error('Error in waitlist stats endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
