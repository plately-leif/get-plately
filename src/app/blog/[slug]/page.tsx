'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/utils/images';

// Fallback RichText renderer
const RichText = ({ content }: { content: any }) => {
  if (!content) return null;
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
};

interface Author {
  name?: string;
  avatar?: string | { url: string };
  role?: string;
  bio?: string;
}

interface Category {
  name: string;
  slug: string;
}

interface BlogPostWithAuthor {
  id: string;
  slug: string;
  title: string;
  publishedDate?: string;
  author?: Author;
  category?: Category;
  readTime?: number;
  excerpt?: string;
  content: any;
  image?: string | { url: string };
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostWithAuthor | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return;
        
        setLoading(true);
        const response = await fetch(`/api/blog/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Blog Post</h2>
          <p className="text-gray-600 mb-4">{error || 'Post not found'}</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Format the published date
  const formattedDate = post.publishedDate 
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Get author avatar URL
  const authorAvatar = post.author?.avatar 
    ? typeof post.author.avatar === 'string' 
      ? post.author.avatar 
      : post.author.avatar?.url 
    : '';

  // Get post image URL
  const postImage = post.image 
    ? typeof post.image === 'string' 
      ? post.image 
      : post.image?.url 
    : '';

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {/* Back to blog */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                &larr; Back to blog
              </Link>
            </div>

            {/* Post header */}
            <div className="mb-8">
              {post.category?.name && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  {post.category.name}
                </span>
              )}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-6 flex items-center">
                {authorAvatar && (
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={getImageUrl(authorAvatar)}
                      alt={post.author?.name || 'Author'}
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {post.author?.name || 'Plately Team'}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.publishedDate?.toString()}>
                      {formattedDate}
                    </time>
                    {post.readTime && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readTime} min read</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured image */}
            {postImage && (
              <div className="mb-8">
                <Image
                  src={getImageUrl(postImage)}
                  alt={post.title || 'Blog post image'}
                  width={1200}
                  height={630}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            )}

            {/* Post content */}
            <div className="prose prose-blue prose-lg mx-auto">
              <RichText content={post.content} />
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Related Posts
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                More articles you might enjoy
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relatedPostImage = relatedPost.image 
                  ? typeof relatedPost.image === 'string' 
                    ? relatedPost.image 
                    : relatedPost.image?.url 
                  : '';
                  
                return (
                  <article key={relatedPost.id} className="flex flex-col items-start">
                    <div className="relative w-full">
                      {relatedPostImage && (
                        <Image
                          src={getImageUrl(relatedPostImage)}
                          alt={relatedPost.title || 'Related post image'}
                          width={400}
                          height={240}
                          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
                        />
                      )}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        {relatedPost.publishedDate && (
                          <time 
                            dateTime={relatedPost.publishedDate.toString()}
                            className="text-gray-500"
                          >
                            {new Date(relatedPost.publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        )}
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                          <Link href={`/blog/${relatedPost.slug}`} className="block">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {relatedPost.title}
                          </Link>
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="mt-6 flex items-center gap-x-4">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                        >
                          Read more <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
