'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogPost, BlogPostsResponse } from '@/types/blog';
import { getImageUrl } from '@/utils/images';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BlogPostsResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to load blog posts. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Blog Posts</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Blog Posts Found</h2>
          <p className="text-gray-600">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
            Insights and updates to help you grow your business with Plately
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start">
              <div className="relative w-full">
                {post.image && (
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title || 'Blog post image'}
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
                  />
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              
              <div className="w-full">
                <div className="mt-6 flex items-center gap-x-4 text-sm">
                  {post.publishedDate && (
                    <time 
                      dateTime={post.publishedDate} 
                      className="text-gray-500"
                    >
                      {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  {post.category?.name && (
                    <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                      {post.category.name}
                    </span>
                  )}
                </div>
                
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt || (typeof post.content === 'string' ? post.content.substring(0, 200) + '...' : '')}
                  </p>
                </div>
                
                {post.author && (
                  <div className="mt-6 flex items-center gap-x-4 border-t border-gray-100 pt-6">
                    {post.author.avatar && (
                      <img
                        src={getImageUrl(post.author.avatar)}
                        alt={post.author.name || 'Author avatar'}
                        className="h-10 w-10 rounded-full bg-gray-100"
                        width={40}
                        height={40}
                      />
                    )}
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {post.author.name}
                      </p>
                      {post.readTime && (
                        <p className="text-gray-600">{post.readTime} min read</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
