// This script helps manage admin users in Supabase
// Run with: node scripts/manage-admin-users.js [command] [email]
// Commands:
//   - add: Add admin role to a user (create if doesn't exist)
//   - list: List all users with their roles
//   - remove: Remove admin role from a user

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addAdminUser(email) {
  console.log(`Setting admin role for user: ${email}`);
  
  try {
    // Check if user exists in auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching users:', authError.message);
      return;
    }
    
    const authUser = users?.find(u => u.email === email);
    
    if (!authUser) {
      console.error(`User ${email} not found in auth system. Please sign up first.`);
      return;
    }
    
    // Check if user exists in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();
      
    if (userError && userError.code !== 'PGRST116') {
      console.error('Error checking user:', userError.message);
      return;
    }
    
    // Insert or update user with admin role
    const { error: upsertError } = await supabase
      .from('users')
      .upsert([
        {
          id: authUser.id,
          email: email,
          role: 'admin',
          created_at: userData?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      
    if (upsertError) {
      console.error('Error updating user role:', upsertError.message);
      return;
    }
    
    console.log(`✅ User ${email} has been granted admin role!`);
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

async function listUsers() {
  try {
    // Get all users from auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching users:', authError.message);
      return;
    }
    
    if (!users || users.length === 0) {
      console.log('No users found in the system.');
      return;
    }
    
    // Get all users from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*');
      
    if (userError) {
      console.error('Error fetching user data:', userError.message);
      return;
    }
    
    console.log('\n=== User List ===');
    console.log('Email                  | Role      | Last Sign In');
    console.log('---------------------- | --------- | -------------------');
    
    users.forEach(user => {
      const userRecord = userData?.find(u => u.id === user.id);
      const role = userRecord?.role || 'user';
      const lastSignIn = user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never';
      
      console.log(`${user.email.padEnd(22)} | ${role.padEnd(9)} | ${lastSignIn}`);
    });
    
    console.log('\n');
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

async function removeAdminRole(email) {
  console.log(`Removing admin role from user: ${email}`);
  
  try {
    // Check if user exists in auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching users:', authError.message);
      return;
    }
    
    const authUser = users?.find(u => u.email === email);
    
    if (!authUser) {
      console.error(`User ${email} not found in auth system.`);
      return;
    }
    
    // Update user role to 'user'
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'user', updated_at: new Date().toISOString() })
      .eq('id', authUser.id);
      
    if (updateError) {
      console.error('Error updating user role:', updateError.message);
      return;
    }
    
    console.log(`✅ Admin role has been removed from user ${email}.`);
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

async function main() {
  const command = process.argv[2]?.toLowerCase();
  const email = process.argv[3];
  
  if (!command) {
    console.error('Please provide a command: add, list, or remove');
    process.exit(1);
  }
  
  switch (command) {
    case 'add':
      if (!email) {
        console.error('Please provide an email address');
        process.exit(1);
      }
      await addAdminUser(email);
      break;
      
    case 'list':
      await listUsers();
      break;
      
    case 'remove':
      if (!email) {
        console.error('Please provide an email address');
        process.exit(1);
      }
      await removeAdminRole(email);
      break;
      
    default:
      console.error('Unknown command. Use add, list, or remove');
      process.exit(1);
  }
}

main();
