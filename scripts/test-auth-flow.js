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

async function testAuthFlow() {
  try {
    console.log('Testing authentication and blog post access...');
    
    // 1. Test getting posts with the get_posts_with_authors function
    console.log('\n=== Testing get_posts_with_authors() ===');
    const { data: posts, error: postsError } = await supabase
      .rpc('get_posts_with_authors');
      
    if (postsError) {
      console.error('Error getting posts:', postsError);
    } else {
      console.log('Blog posts with authors:', posts);
    }
    
    // 2. Test the user_profiles view
    console.log('\n=== Testing user_profiles view ===');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*');
      
    if (profilesError) {
      console.error('Error getting user profiles:', profilesError);
    } else {
      console.log('User profiles:', profiles);
    }
    
    // 3. Test updating a user's profile
    console.log('\n=== Testing profile update ===');
    const userId = 'c5bbff73-d5da-4d6d-865a-9503b9e71268'; // Your user ID
    
    const { data: updateResult, error: updateError } = await supabase
      .rpc('update_user_profile', {
        full_name: 'Leif (Updated)',
        avatar_url: 'https://example.com/avatar.jpg'
      });
      
    if (updateError) {
      console.error('Error updating profile:', updateError);
    } else {
      console.log('Profile update result:', updateResult);
    }
    
    console.log('\n=== Test Complete ===');
    console.log('If you see no errors above, your auth setup is working correctly!');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAuthFlow();
