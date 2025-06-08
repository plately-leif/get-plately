const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Make sure to set this in your .env.local

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Service Role Key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function migrateToAuth() {
  try {
    console.log('Starting migration to Supabase Auth...');
    
    // 1. First, get all existing profiles
    console.log('Fetching existing profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;
    console.log(`Found ${profiles.length} profiles to migrate`);

    // 2. For each profile, create a corresponding auth user
    for (const profile of profiles) {
      try {
        console.log(`\nProcessing profile: ${profile.full_name || profile.id}`);
        
        // Create auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: profile.email || `${profile.id}@migrated.user`,
          password: generateTemporaryPassword(),
          email_confirm: true,
          user_metadata: {
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            // Preserve any existing role from the old system
            role: profile.role || 'user'
          }
        });

        if (authError) {
          if (authError.message.includes('already registered')) {
            console.log(`  User ${profile.email} already exists in auth.users, skipping creation`);
            continue;
          }
          throw authError;
        }

        console.log(`  Created auth user: ${authUser.user.id}`);

        // 3. Update blog_posts to use the new author_id
        const { count: updatedPosts, error: updateError } = await supabase
          .from('blog_posts')
          .update({ author_id: authUser.user.id })
          .eq('author_id_old', profile.id);

        if (updateError) {
          console.error('  Error updating blog posts:', updateError.message);
        } else {
          console.log(`  Updated ${updatedPosts || 0} blog posts with new author ID`);
        }

      } catch (error) {
        console.error(`  Error processing profile ${profile.id}:`, error.message);
        // Continue with next profile even if one fails
        continue;
      }
    }

    console.log('\nMigration complete!');
    console.log('Next steps:');
    console.log('1. Review the data in the auth.users table');
    console.log('2. Verify blog posts are correctly assigned to authors');
    console.log('3. Consider dropping the old profiles table if no longer needed');
    console.log('4. Update your application code to use auth.users instead of profiles');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

function generateTemporaryPassword() {
  return `TemporaryPwd${Math.random().toString(36).slice(-10)}!`;
}

migrateToAuth();
