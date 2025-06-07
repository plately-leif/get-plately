import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
}

// Initialize Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupAdminUser() {
  const email = 'leif@platey.ai';
  const password = process.env.ADMIN_PASSWORD || 'admin123'; // In production, always set ADMIN_PASSWORD

  try {
    console.log('🚀 Setting up admin user...');
    
    // 1. Check if user exists in auth.users
    console.log('🔍 Checking for existing user...');
    const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers();
    if (listUsersError) throw listUsersError;
    
    const existingUser = users.find(user => user.email === email);
    let userId = existingUser?.id;

    // 2. Create or update auth user
    if (!existingUser) {
      console.log('👤 Creating new admin user in auth.users...');
      const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name: 'Leif' },
      });
      
      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create user');
      
      userId = authData.user.id;
      console.log('✅ Created auth user with ID:', userId);
    } else {
      userId = existingUser.id;
      console.log('ℹ️  User already exists in auth.users, ID:', userId);
      
      // Update password if ADMIN_PASSWORD is set
      if (process.env.ADMIN_PASSWORD) {
        console.log('🔄 Updating password...');
        const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
          password: process.env.ADMIN_PASSWORD,
        });
        if (updateError) {
          console.warn('⚠️  Could not update password:', updateError.message);
        } else {
          console.log('✅ Password updated');
        }
      }
    }

    if (!userId) {
      throw new Error('No user ID available after auth setup');
    }

    // 3. Ensure user exists in public.users
    console.log('👥 Ensuring user in public.users...');
    const { error: profileError } = await supabase
      .from('users')
      .upsert(
        {
          id: userId,
          email,
          name: 'Leif',
          role: 'admin',
        },
        { onConflict: 'id' }
      );

    if (profileError) throw profileError;

    // 4. Output success message
    console.log('\n🎉 Admin user setup completed successfully!');
    console.log('======================================');
    console.log(`🔑 Email: ${email}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD ? '*** (set in .env)' : password}`);
    console.log('======================================');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('⚠️  Run this command to open the login page:');
    console.log('    open http://localhost:3000/payload-admin');
  } catch (error) {
    console.error('❌ Error setting up admin user:');
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error(error.stack);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

// Run the setup
setupAdminUser()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
