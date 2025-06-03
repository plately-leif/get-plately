import { supabase } from './client';

export interface WaitlistEntry {
  email: string;
  created_at?: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  page_url?: string;
  ip_address?: string;
  country?: string;
  region?: string;
  city?: string;
}

export const addToWaitlist = async (entry: WaitlistEntry) => {
  try {
    // Get IP info if in browser
    let ipInfo = null;
    if (typeof window !== 'undefined') {
      const { getIPInfo } = await import('@/lib/utils/ip-utils');
      ipInfo = await getIPInfo();
    }

    // Get additional browser info
    const browserInfo = typeof window !== 'undefined' ? {
      user_agent: window.navigator.userAgent,
      referrer: document.referrer,
      page_url: window.location.href,
      ...(ipInfo ? {
        ip_address: ipInfo.ip,
        country: ipInfo.country,
        region: ipInfo.region,
        city: ipInfo.city
      } : {})
    } : {};

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ 
        email: entry.email,
        ...browserInfo,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
        utm_term: new URLSearchParams(window.location.search).get('utm_term') || undefined,
        utm_content: new URLSearchParams(window.location.search).get('utm_content') || undefined,
      }])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { data: null, error };
  }
};

export const checkWaitlistStatus = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    return { exists: !!data, data: data || null, error: null };
  } catch (error) {
    console.error('Error checking waitlist status:', error);
    return { exists: false, data: null, error };
  }
};
