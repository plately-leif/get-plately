const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkDatabase() {
  try {
    console.log('Checking database state...');
    
    // Check auth.users table
    const { data: authUsers, error: authError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
      
    console.log(`\nAuth users count:`, authUsers?.length || 0);
    
    // Check profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');
      
    console.log(`Profiles table exists:`, profiles ? 'Yes' : 'No');
    
    // Check blog_posts table
    const { data: blogPosts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*');
      
    console.log(`Blog posts count:`, blogPosts?.length || 0);
    
    // List all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_table_names');
      
    console.log('\nTables in public schema:');
    console.log(tables);
    
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

// Create a function to list tables (since we can't query information_schema directly)
supabase.rpc('get_table_names', {}).then(({ data, error }) => {
  if (error) {
    // If the function doesn't exist, create it
    supabase.rpc(`
      create or replace function get_table_names() 
      returns table (table_name text) as $$
      begin
        return query 
          select tablename::text as table_name
          from pg_tables
          where schemaname = 'public';
      end;
      $$ language plpgsql security definer;
    `).then(() => {
      checkDatabase();
    });
  } else {
    checkDatabase();
  }
});
