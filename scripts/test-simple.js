const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic query to auth.users
    console.log('\n1. Testing auth.users access...');
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    if (usersError) throw usersError;
    console.log(`✅ Success! Found ${users.users.length} users`);
    
    // Test 2: Check if blog_posts exists
    console.log('\n2. Checking blog_posts table...');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (postsError) throw postsError;
    console.log(`✅ Success! Found ${posts ? posts.length : 0} blog posts`);
    
    // Test 3: Try to create a function
    console.log('\n3. Testing function creation...');
    const { error: funcError } = await supabase.rpc('create_test_function', {});
    
    if (funcError && !funcError.message.includes('already exists')) {
      console.log('Creating test function...');
      const { error: createError } = await supabase.rpc(`
        CREATE OR REPLACE FUNCTION public.test_function() 
        RETURNS TEXT AS $$
        BEGIN
          RETURN 'Test function works!';
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `);
      if (createError) throw createError;
      console.log('✅ Created test function');
    } else {
      console.log('✅ Test function already exists');
    }
    
    // Test 4: Call the test function
    console.log('\n4. Testing function call...');
    const { data: funcResult, error: callError } = await supabase
      .rpc('test_function');
      
    if (callError) throw callError;
    console.log(`✅ Function returned: ${funcResult}`);
    
    console.log('\n🎉 All tests passed! Your Supabase connection is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    
    // More detailed error information
    if (error.code) console.log('Error code:', error.code);
    if (error.details) console.log('Details:', error.details);
    if (error.hint) console.log('Hint:', error.hint);
    
    console.log('\nTroubleshooting:');
    console.log('1. Make sure your Supabase URL and Service Role Key are correct');
    console.log('2. Check that you have the necessary database permissions');
    console.log('3. Verify that the database tables and functions exist');
  }
}

testConnection();
