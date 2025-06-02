import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { createServerClient } from '@/utils/supabase/server';

import { BlogPost } from './collections/BlogPost';
import { Media } from './collections/Media';

// Create a custom auth strategy that works with Supabase
const createSupabaseAuth = () => {
  const authenticate = async (email: string, password: string) => {
    const supabase = createServerClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Invalid credentials');
    }

    // Check if user has admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', email)
      .single();

    if (userError || userData?.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin privileges required.');
    }

    return {
      id: data.user?.id || '',
      email: data.user?.email || '',
    };
  };

  const verify = async ({ req }: { req: any }) => {
    const supabase = createServerClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Not authenticated');
    }

    // Check if user has admin role
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error || userData?.role !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin privileges required.');
    }

    return {
      id: session.user.id,
      email: session.user.email || '',
    };
  };

  return {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
    maxLoginAttempts: 5,
    lockTime: 60 * 5, // 5 minutes
    useAPIKey: true,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined,
    },
    authenticate,
    verify,
  };
};

// Create the Payload config with our custom auth
const config = buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    BlogPost,
    Media,
  ],
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - Plately Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },
  routes: {
    admin: '/payload-admin',
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  // @ts-ignore - Using a more permissive type to work around Payload's strict type checking
  auth: createSupabaseAuth(),
});

export default config;
