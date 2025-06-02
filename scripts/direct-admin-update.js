// This script directly inserts an admin role for a user in the Supabase database
// Run with: node scripts/direct-admin-update.js leif@platey.ai

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addAdminDirectly() {
  const email = process.argv[2];
  
  if (!email) {
    console.error('Please provide an email address');
    console.error('Example: node scripts/direct-admin-update.js your-email@example.com');
    process.exit(1);
  }

  console.log(`Setting admin role for user: ${email}`);
  
  try {
    // First, let's check if the users table exists
    const { data: tableData, error: tableError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
      
    if (tableError) {
      console.error('Error accessing users table:', tableError.message);
      
      // If the table doesn't exist, let's create it
      if (tableError.message.includes('does not exist')) {
        console.log('Creating users table...');
        
        // Create users table
        const { error: createError } = await supabase.rpc('create_users_table');
        
        if (createError) {
          console.error('Error creating users table:', createError.message);
          return;
        }
        
        console.log('Users table created successfully');
      } else {
        return;
      }
    }
    
    // Insert the user with admin role directly
    // Note: This assumes you know the user's ID or we're using email as the primary key
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email: email,
          role: 'admin',
          created_at: new Date().toISOString(),
        },
      ]);
      
    if (insertError) {
      console.error('Error inserting admin user:', insertError.message);
      
      // Try updating instead if insert fails
      console.log('Trying to update existing user...');
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('email', email);
        
      if (updateError) {
        console.error('Error updating user role:', updateError.message);
        return;
      }
      
      console.log(`✅ User ${email} has been updated with admin role!`);
    } else {
      console.log(`✅ User ${email} has been inserted with admin role!`);
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

addAdminDirectly();
