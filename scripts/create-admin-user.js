// This script creates an admin user in the Supabase database
// Run with: node scripts/create-admin-user.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function createAdminUser() {
  const email = 'admin@example.com';
  const password = 'Admin123!';

  try {
    // Create user with email/password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Error creating user:', authError.message);
      return;
    }

    console.log('User created successfully:', authData.user.id);

    // Add user to the users table with admin role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert([
        {
          id: authData.user.id,
          email,
          role: 'admin',
          created_at: new Date().toISOString(),
        },
      ]);

    if (userError) {
      console.error('Error adding user to users table:', userError.message);
      return;
    }

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

createAdminUser();
