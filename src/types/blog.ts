export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  publishedDate?: string;
  image?: string | { url: string };
  author?: {
    name?: string;
    avatar?: string | { url: string };
  };
  category?: {
    name?: string;
  };
  readTime?: string;
  _status?: 'draft' | 'published';
  // Add any other fields that might be present in your blog posts
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  error?: string;
}
