const fetch = require('node-fetch');

const SUPABASE_URL = 'https://axoqacbjymspsqpjtcui.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b3FhY2JqeW1zcHNxcGp0Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTUzMTYsImV4cCI6MjA2NDg5MTMxNn0.UJBoFt5VLj6i6ZoKOaWAp22YDNgW3GQ9w4BipfRe7Os';

async function listTables() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Available tables and endpoints:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching table information:', error.message);
  }
}

listTables();
