const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateUsers() {
  try {
    console.log('Fetching existing profiles...');
    
    // Get all existing profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;

    console.log(`Found ${profiles.length} profiles to migrate`);
    
    // For each profile, create a new auth user and update references
    for (const profile of profiles) {
      console.log(`Migrating profile: ${profile.full_name} (${profile.id})`);
      
      // Create auth user (you'll need to set a temporary password or use magic link)
      const { data: authUser, error: signUpError } = await supabase.auth.admin.createUser({
        email: `${profile.id}@migrated.user`, // You'll need to update this with actual emails
        password: crypto.randomUUID(), // Generate a random password, user will need to reset
        email_confirm: true,
        user_metadata: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url
        }
      });

      if (signUpError) {
        console.error('Error creating auth user:', signUpError);
        continue;
      }

      console.log(`Created auth user: ${authUser.user.id}`);
      
      // Update blog_posts with the new author_id
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ author_id: authUser.user.id })
        .eq('author_id_old', profile.id);

      if (updateError) {
        console.error('Error updating blog posts:', updateError);
      } else {
        console.log('Updated blog posts with new author ID');
      }
    }
    
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateUsers();
