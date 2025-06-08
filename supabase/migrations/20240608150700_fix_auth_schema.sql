-- Note: We don't need to modify auth.users directly as it's managed by Supabase
-- The auth.uid() function is already provided by Supabase

-- Create a view that joins auth.users with profiles
-- This will be our main way to access user data

-- First, let's create a function to safely get the current user's ID
-- This is a wrapper around Supabase's auth.uid() that handles errors
CREATE OR REPLACE FUNCTION public.current_user_id()
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  RETURN auth.uid();
EXCEPTION WHEN OTHERS THEN
  RETURN NULL::UUID;
END;
$$;

-- Create a view that safely exposes user profile data
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT 
  u.id,
  u.email,
  COALESCE(
    u.raw_user_meta_data->>'full_name',
    u.raw_user_meta_data->>'name',
    split_part(u.email, '@', 1)
  ) as full_name,
  COALESCE(
    u.raw_user_meta_data->>'avatar_url',
    u.raw_user_meta_data->'avatar_url'->>'url',
    NULL
  ) as avatar_url,
  u.created_at,
  u.last_sign_in_at as last_login,
  u.updated_at
FROM auth.users u
WHERE auth.uid() = u.id OR auth.jwt() ->> 'role' = 'service_role';  -- Only allow users to see their own profile or service role

-- Set up permissions for the view
GRANT SELECT ON public.user_profiles TO authenticated, service_role;

-- Create a function to update user profiles
CREATE OR REPLACE FUNCTION public.update_user_profile(
  full_name TEXT DEFAULT NULL,
  avatar_url TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
  result JSONB;
BEGIN
  user_id := auth.uid();
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  UPDATE auth.users
  SET 
    raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || 
      jsonb_build_object(
        'full_name', COALESCE(full_name, raw_user_meta_data->>'full_name'),
        'avatar_url', COALESCE(avatar_url, raw_user_meta_data->'avatar_url')
      ),
    updated_at = NOW()
  WHERE id = user_id
  RETURNING raw_user_meta_data INTO result;
  
  RETURN result;
END;
$$;

-- First, let's create a function to check if a user is an admin
-- This is a simplified version - you might want to enhance this based on your needs
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user has the admin role in their JWT claims
  -- You can customize this based on how you identify admins
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND raw_user_meta_data->>'role' = 'admin'
  ) OR auth.jwt() ->> 'role' = 'service_role';
EXCEPTION WHEN OTHERS THEN
  RETURN FALSE;
END;
$$;

-- Update blog_posts to use auth.users.id instead of profiles.id
-- First, add the new column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'blog_posts' AND column_name = 'author_id') THEN
    ALTER TABLE public.blog_posts 
    ADD COLUMN author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Set up RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
-- Allow public read access to published posts
CREATE POLICY "Enable read access for published posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (status = 'published');

-- Allow authenticated users to read their own drafts
CREATE POLICY "Enable read access for authors"
  ON public.blog_posts
  FOR SELECT
  USING (auth.uid() = author_id);

-- Allow admins to read all posts
CREATE POLICY "Enable read access for admins"
  ON public.blog_posts
  FOR SELECT
  USING (public.is_admin());

-- Allow authenticated users to insert their own posts
CREATE POLICY "Enable insert for authenticated users"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Allow authors to update their own posts
CREATE POLICY "Enable update for authors"
  ON public.blog_posts
  FOR UPDATE
  USING (auth.uid() = author_id);

-- Allow admins to update any post
CREATE POLICY "Enable update for admins"
  ON public.blog_posts
  FOR UPDATE
  USING (public.is_admin());

-- Allow authors to delete their own posts
CREATE POLICY "Enable delete for authors"
  ON public.blog_posts
  FOR DELETE
  USING (auth.uid() = author_id);

-- Allow admins to delete any post
CREATE POLICY "Enable delete for admins"
  ON public.blog_posts
  FOR DELETE
  USING (public.is_admin());

-- Create a function to safely get posts with author info
CREATE OR REPLACE FUNCTION public.get_posts_with_authors()
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  content TEXT,
  status TEXT,
  published_at TIMESTAMPTZ,
  author_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  author_name TEXT,
  author_avatar_url TEXT
)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT 
    p.id,
    p.title,
    p.slug,
    p.excerpt,
    p.content,
    p.status,
    p.published_at,
    p.author_id,
    p.created_at,
    p.updated_at,
    up.full_name as author_name,
    up.avatar_url as author_avatar_url
  FROM 
    blog_posts p
  LEFT JOIN 
    user_profiles up ON p.author_id = up.id
  WHERE 
    p.status = 'published' 
    OR p.author_id = auth.uid() 
    OR public.is_admin()
  ORDER BY 
    p.published_at DESC;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_posts_with_authors() TO authenticated, anon;
