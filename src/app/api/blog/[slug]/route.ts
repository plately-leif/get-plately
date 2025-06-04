import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const supabase = createServerClient();

    // Fetch the specific blog post by slug
    const { data: post, error } = await supabase
      .from('blog-posts')
      .select('*')
      .eq('slug', slug)
      .eq('_status', 'published')
      .single();

    if (error || !post) {
      console.error('Error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Get related posts (excluding the current one)
    const { data: relatedPosts } = await supabase
      .from('blog-posts')
      .select('id, title, slug, excerpt, publishedDate, image')
      .neq('id', post.id)
      .eq('_status', 'published')
      .order('publishedDate', { ascending: false })
      .limit(3);

    return NextResponse.json({
      post,
      relatedPosts: relatedPosts || []
    });
  } catch (error) {
    console.error('Error in blog post API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
