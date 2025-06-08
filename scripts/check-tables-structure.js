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

async function checkTableStructure() {
  try {
    console.log('Checking table structures...');
    
    // Check profiles table structure
    console.log('\n=== Profiles Table Structure ===');
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    } else if (profilesData && profilesData.length > 0) {
      console.log('Columns in profiles table:', Object.keys(profilesData[0]));
      console.log('Sample profile:', profilesData[0]);
    } else {
      console.log('Profiles table is empty or does not exist');
    }
    
    // Check blog_posts table structure
    console.log('\n=== Blog Posts Table Structure ===');
    const { data: postsData, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
      
    if (postsError) {
      console.error('Error fetching blog posts:', postsError);
    } else if (postsData && postsData.length > 0) {
      console.log('Columns in blog_posts table:', Object.keys(postsData[0]));
      console.log('Sample post:', postsData[0]);
    } else {
      console.log('Blog_posts table is empty or does not exist');
    }
    
    // Get all users from auth.users
    console.log('\n=== Auth Users ===');
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error('Error fetching auth users:', usersError);
    } else {
      console.log(`Total auth users: ${users.users.length}`);
      if (users.users.length > 0) {
        console.log('First user:', {
          id: users.users[0].id,
          email: users.users[0].email,
          created_at: users.users[0].created_at,
          last_sign_in: users.users[0].last_sign_in_at
        });
      }
    }
    
  } catch (error) {
    console.error('Error checking table structures:', error);
  }
}

checkTableStructure();
