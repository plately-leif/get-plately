import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '../../../../src/payload/payload.config';
// If you don't have a RichText renderer, fallback to rendering raw content or a custom component
// import { RichText } from 'payload/components/RichText';
const RichText = ({ content }: { content: any }) => (
  <div>{typeof content === 'string' ? content : JSON.stringify(content)}</div>
);

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({
    config,
    secret: process.env.PAYLOAD_SECRET || '',
  });
  
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

  type BlogPost = {
    title: string;
    publishedDate?: string;
    category?: string;
    image?: string | { url: string };
    content?: any;
    author?: {
      name?: string;
      bio?: string;
    };
  };

  const rawPost = result.docs[0];

  if (!rawPost) {
    notFound();
  }

  // Defensive conversion with type guards
  function isImageObj(img: unknown): img is { url: string } {
    return typeof img === 'object' && img !== null && 'url' in img && typeof (img as any).url === 'string';
  }
  function isAuthorObj(author: unknown): author is { name?: string; bio?: string } {
    return typeof author === 'object' && author !== null && (
      'name' in author || 'bio' in author
    );
  }
  let image: string | { url: string } | undefined = undefined;
  if (typeof rawPost.image === 'string') {
    image = rawPost.image;
  } else if (isImageObj(rawPost.image)) {
    image = { url: rawPost.image.url };
  }
  let author: { name?: string; bio?: string } | undefined = undefined;
  if (isAuthorObj(rawPost.author)) {
    author = {
      name: typeof rawPost.author.name === 'string' ? rawPost.author.name : undefined,
      bio: typeof rawPost.author.bio === 'string' ? rawPost.author.bio : undefined,
    };
  }
  const post: BlogPost = {
    title: typeof rawPost.title === 'string' ? rawPost.title : '',
    publishedDate: typeof rawPost.publishedDate === 'string' ? rawPost.publishedDate : undefined,
    category: typeof rawPost.category === 'string' ? rawPost.category : undefined,
    image,
    content: rawPost.content,
    author,
  };


  return (
    <article className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto px-4 py-16">
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        
        <div className="mt-6 flex items-center gap-x-4 text-sm">
          <time dateTime={post.publishedDate || ''} className="text-gray-500">
            {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : ''}
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
              src={typeof post.image === 'string' ? post.image : (post.image?.url || '')}
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
  const payload = await getPayload({
    config,
    secret: process.env.PAYLOAD_SECRET || '',
  });
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
