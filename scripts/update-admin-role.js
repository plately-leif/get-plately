// This script updates an existing user to have admin role
// Run with: node scripts/update-admin-role.js YOUR_EMAIL@example.com

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateUserRole() {
  // Get email from command line arguments
  const email = process.argv[2];
  
  if (!email) {
    console.error('Please provide an email address as an argument');
    console.error('Example: node scripts/update-admin-role.js your-email@example.com');
    process.exit(1);
  }

  try {
    // Get user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError) {
      // User might not exist in the users table yet, but might exist in auth
      console.log('User not found in users table, checking auth...');
      
      // Get user from auth by email
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching users:', authError.message);
        return;
      }
      
      const authUser = users.find(u => u.email === email);
      
      if (!authUser) {
        console.error('User not found in auth system');
        return;
      }
      
      // Insert user into users table with admin role
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            email: email,
            role: 'admin',
            created_at: new Date().toISOString(),
          },
        ]);
        
      if (insertError) {
        console.error('Error creating user record:', insertError.message);
        return;
      }
      
      console.log(`User ${email} has been granted admin role!`);
      return;
    }
    
    // Update existing user to have admin role
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('id', userData.id);
      
    if (updateError) {
      console.error('Error updating user role:', updateError.message);
      return;
    }
    
    console.log(`User ${email} has been updated to admin role!`);
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

updateUserRole();
