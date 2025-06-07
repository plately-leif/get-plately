import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { randomUUID } from 'crypto';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables');
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupAdminUser() {
  const adminEmail = 'leif@platey.ai';
  const adminPassword = process.env.ADMIN_PASSWORD || randomUUID();

  try {
    console.log('Creating admin user...');
    
    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { name: 'Admin User' },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('Admin user already exists. Updating role...');
        
        // Get existing user
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', adminEmail)
          .single();
        
        if (existingUser) {
          // Update role to admin
          const { error: updateError } = await supabaseAdmin
            .from('users')
            .update({ role: 'admin' })
            .eq('email', adminEmail);
          
          if (updateError) throw updateError;
          
          console.log('Admin role updated successfully');
          return;
        }
      }
      throw authError;
    }

    // Create user in public.users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: adminEmail,
          name: 'Admin User',
          role: 'admin',
        },
      ]);

    if (userError) throw userError;

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('\nIMPORTANT: Save this password in a secure place!');
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

setupAdminUser();
