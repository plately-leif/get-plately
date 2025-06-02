import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { RichText } from 'payload/richtext-slate';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: configPromise });
  
  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: params.slug,
      },
      _status: {
        equals: 'published',
      },
    },
  });

  const post = result.docs[0];

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto px-4 py-16">
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        
        <div className="mt-6 flex items-center gap-x-4 text-sm">
          <time dateTime={post.publishedDate} className="text-gray-500">
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.category && (
            <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
              {post.category}
            </span>
          )}
        </div>

        {post.image && (
          <div className="mt-8 relative w-full h-96 rounded-2xl overflow-hidden">
            <Image
              src={typeof post.image === 'string' ? post.image : post.image.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-8 prose prose-lg prose-gray max-w-none">
          {post.content && <RichText content={post.content} />}
        </div>

        <div className="mt-12 flex items-center gap-x-4">
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              {post.author?.name || 'Plately Team'}
            </p>
            {post.author?.bio && (
              <p className="text-gray-600">{post.author.bio}</p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-12">
          <Link 
            href="/blog" 
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'blog-posts',
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
  });

  return posts.docs.map((post: any) => ({
    slug: post.slug,
  }));
}
