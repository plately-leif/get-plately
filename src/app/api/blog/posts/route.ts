import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    // Initialize Supabase client using our utility
    const supabase = createServerClient();

    // Fetch published blog posts
    const { data: posts, error } = await supabase
      .from('blog-posts')
      .select('*')
      .eq('_status', 'published')
      .order('publishedDate', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      posts: posts || [],
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
