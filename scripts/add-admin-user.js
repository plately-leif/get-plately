// This script adds an admin role to a user in the Supabase database
// Run with: node scripts/add-admin-user.js leif@platey.ai

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addAdminUser() {
  const email = process.argv[2];
  
  if (!email) {
    console.error('Please provide an email address');
    console.error('Example: node scripts/add-admin-user.js your-email@example.com');
    process.exit(1);
  }

  console.log(`Setting admin role for user: ${email}`);
  
  try {
    // First, let's try to get the user's ID by signing in
    // You'll need to enter your password when prompted
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Enter your password: ', async (password) => {
      readline.close();
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) {
        console.error('Authentication error:', authError.message);
        return;
      }
      
      const userId = authData.user.id;
      console.log(`User authenticated. User ID: ${userId}`);
      
      // Insert or update user with admin role
      const { error: upsertError } = await supabase
        .from('users')
        .upsert([
          {
            id: userId,
            email: email,
            role: 'admin',
            created_at: new Date().toISOString(),
          },
        ]);
        
      if (upsertError) {
        console.error('Error updating user role:', upsertError.message);
        return;
      }
      
      console.log(`✅ User ${email} has been granted admin role!`);
      
      // Sign out after we're done
      await supabase.auth.signOut();
    });
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

addAdminUser();
