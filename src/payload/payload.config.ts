import React from 'react';
import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { createServerClient } from '@/utils/supabase/server';

// Import the AdminDashboard component
import AdminDashboard from './components/AdminDashboard';

import { BlogPost } from './collections/BlogPost';
import { Media } from './collections/Media';
import { Users } from './collections/Users';
import { Waitlist } from './collections/Waitlist';
import { customEndpoints } from './endpoints';

// Create a custom auth strategy that works with Supabase
const createSupabaseAuth = () => {
  const ensureUserInPayload = async (supabaseUser: any) => {
    if (!supabaseUser?.id) return null;

    const supabase = createServerClient();
    
    // Check if user exists in Payload
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', supabaseUser.id)
      .single();

    // If user doesn't exist, create them
    if (!existingUser) {
      const { data: newUser } = await supabase
        .from('users')
        .insert([
          {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.email.split('@')[0], // Default name from email
            role: 'user', // Default role
          },
        ])
        .select()
        .single();
      
      return newUser;
    }

    return existingUser;
  };

  const authenticate = async (email: string, password: string) => {
    const supabase = createServerClient();
    
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        throw new Error('Invalid credentials');
      }

      // Ensure user exists in Payload
      const user = await ensureUserInPayload(data.user);
      if (!user) {
        throw new Error('Failed to authenticate user');
      }

      // For admin access, check if user has admin role
      if (user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }

      return {
        id: data.user.id,
        email: data.user.email || '',
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  const verify = async ({ req }: { req: any }) => {
    const supabase = createServerClient();
    
    try {
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Not authenticated');
      }

      // Ensure user exists in Payload
      const user = await ensureUserInPayload(session.user);
      if (!user) {
        throw new Error('User not found');
      }

      // For admin access, check if user has admin role
      if (user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }

      return {
        id: session.user.id,
        email: session.user.email || '',
      };
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  };

  return {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
    maxLoginAttempts: 5,
    lockTime: 60 * 5, // 5 minutes
    useAPIKey: true,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      domain: process.env.NODE_ENV === 'production' ? '.getplately.com' : undefined,
    },
    authenticate,
    verify,
  };
};

// Create the Payload config with our custom auth
const config = buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Users,
    BlogPost,
    Media,
    Waitlist,
  ],
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - Plately Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
    components: {
      // Add a custom dashboard
      views: {
        Dashboard: AdminDashboard,
      },
    },
  },
  endpoints: customEndpoints,
  routes: {
    admin: '/payload-admin',
  },
  // Use Supabase for data storage instead of direct database connection
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL ? 
        `postgresql://postgres:postgres@${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '')}/postgres` :
        'postgresql://postgres:postgres@localhost:54322/postgres',
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
