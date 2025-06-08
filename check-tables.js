const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://axoqacbjymspsqpjtcui.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b3FhY2JqeW1zcHNxcGp0Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTUzMTYsImV4cCI6MjA2NDg5MTMxNn0.UJBoFt5VLj6i6ZoKOaWAp22YDNgW3GQ9w4BipfRe7Os';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
  const { data, error } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public');

  if (error) {
    console.error('Error fetching tables:', error);
    return;
  }
  
  console.log('Tables in public schema:');
  data.forEach(row => console.log('-', row.tablename));
}

listTables();
