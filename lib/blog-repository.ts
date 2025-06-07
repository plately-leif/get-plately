import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to generate a slug from a string
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
  author_id: string;
  tag_ids?: string[];
}

export interface UpdateBlogPostInput {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
  tag_ids?: string[];
  updated_at?: string;
}

// Create a new blog post
export const createBlogPost = async (input: CreateBlogPostInput): Promise<BlogPost> => {
  const { title, content, excerpt, status = 'draft', author_id, tag_ids = [] } = input;
  const slug = slugify(title);
  const now = new Date().toISOString();
  const publishedAt = status === 'published' ? now : null;
  
  // Start a database transaction
  const { data: post, error } = await supabase
    .rpc('create_blog_post_with_tags', {
      p_title: title,
      p_content: content,
      p_excerpt: excerpt,
      p_status: status,
      p_author_id: author_id,
      p_tag_ids: tag_ids
    });
    
  if (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }
  
  return post as BlogPost;
};

// Get all blog posts
export const getBlogPosts = async (options: {
  status?: 'draft' | 'published' | 'archived';
  limit?: number;
  offset?: number;
} = {}): Promise<BlogPost[]> => {
  const { status, limit = 10, offset = 0 } = options;
  
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      author:profiles!inner(*)
    `)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit - 1);
    
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data: posts, error } = await query;
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  // Fetch tags for each post
  const postsWithTags = await Promise.all(
    posts.map(async (post) => {
      const { data: tags, error: tagsError } = await supabase
        .from('post_tags')
        .select('tags(*)')
        .eq('post_id', post.id);
        
      if (tagsError) {
        console.error('Error fetching tags:', tagsError);
        return { ...post, tags: [] };
      }
      
      return {
        ...post,
        author: post.author || { id: post.author_id, name: 'Unknown', email: '' },
        tags: tags?.map(tag => tag.tags) || []
      };
    })
  );
  
  return postsWithTags as BlogPost[];
};

// Get a single blog post by ID or slug
export const getBlogPost = async (identifier: string): Promise<BlogPost | null> => {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:profiles!inner(*)
    `)
    .eq(isUUID ? 'id' : 'slug', identifier)
    .single();
    
  if (error || !post) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  
  // Fetch tags
  const { data: tags, error: tagsError } = await supabase
    .from('post_tags')
    .select('tags(*)')
    .eq('post_id', post.id);
    
  if (tagsError) {
    console.error('Error fetching tags:', tagsError);
    return { ...post, tags: [] } as BlogPost;
  }
  
  return {
    ...post,
    author: post.author || { id: post.author_id, name: 'Unknown', email: '' },
    tags: tags?.map(tag => tag.tags) || []
  } as BlogPost;
};

// Update a blog post
export const updateBlogPost = async (id: string, input: UpdateBlogPostInput): Promise<BlogPost | null> => {
  const { title, content, excerpt, status, tag_ids } = input;
  const now = new Date().toISOString();
  
  const updates: any = {
    updated_at: now
  };
  
  if (title) {
    updates.title = title;
    updates.slug = slugify(title);
  }
  
  if (content) updates.content = content;
  if (excerpt !== undefined) updates.excerpt = excerpt;
  
  if (status) {
    updates.status = status;
    
    // Update published_at if status changed to published
    if (status === 'published') {
      updates.published_at = now;
    }
  }
  
  // Update the blog post
  const { data: updatedPost, error: updateError } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
    
  if (updateError || !updatedPost) {
    console.error('Error updating blog post:', updateError);
    return null;
  }
  
  // Update tags if provided
  if (tag_ids) {
    // Start a transaction
    const { data, error: transactionError } = await supabase.rpc('update_blog_post_tags', {
      p_post_id: id,
      p_tag_ids: tag_ids
    });
    
    if (transactionError) {
      console.error('Error updating tags:', transactionError);
      // Continue even if tag update fails
    }
  }
  
  // Fetch the updated post with author and tags
  return getBlogPost(id);
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
  
  return true;
};

// Helper function to generate UUID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
