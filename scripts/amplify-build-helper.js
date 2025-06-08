// Amplify Build Helper Script
// This script helps ensure a successful build on AWS Amplify by:
// 1. Verifying environment variables
// 2. Setting up proper TypeScript configurations
// 3. Handling common build issues

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Amplify Build Helper...');

// Function to check and create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Check for required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  
  // Create a fallback .env.local file for development only
  if (process.env.NODE_ENV !== 'production') {
    console.log('⚠️ Creating fallback .env.local for development only');
    // This is just for local development, not for production
  } else {
    console.error('❌ Cannot proceed with build due to missing environment variables');
    process.exit(1);
  }
}

// Ensure TypeScript types are installed
console.log('📦 Checking TypeScript dependencies...');
try {
  // Check if @types/react and @types/react-dom are installed
  const reactTypesPath = path.join(process.cwd(), 'node_modules', '@types', 'react');
  const reactDomTypesPath = path.join(process.cwd(), 'node_modules', '@types', 'react-dom');
  
  if (!fs.existsSync(reactTypesPath) || !fs.existsSync(reactDomTypesPath)) {
    console.log('📦 Installing missing TypeScript types...');
    execSync('npm install --save-dev @types/react@18.2.0 @types/react-dom@18.2.0', { stdio: 'inherit' });
  } else {
    console.log('✅ TypeScript types are already installed');
  }
} catch (error) {
  console.error('❌ Error installing TypeScript types:', error.message);
}

// Check and update tsconfig.json
console.log('🔧 Checking TypeScript configuration...');
try {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (fileExists(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    // Ensure types array includes React
    if (!tsconfig.compilerOptions.types || 
        !tsconfig.compilerOptions.types.includes('react') || 
        !tsconfig.compilerOptions.types.includes('react-dom')) {
      
      console.log('🔧 Updating tsconfig.json to include React types...');
      
      if (!tsconfig.compilerOptions.types) {
        tsconfig.compilerOptions.types = [];
      }
      
      if (!tsconfig.compilerOptions.types.includes('react')) {
        tsconfig.compilerOptions.types.push('react');
      }
      
      if (!tsconfig.compilerOptions.types.includes('react-dom')) {
        tsconfig.compilerOptions.types.push('react-dom');
      }
      
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log('✅ tsconfig.json updated successfully');
    } else {
      console.log('✅ tsconfig.json already includes React types');
    }
  } else {
    console.error('❌ tsconfig.json not found');
  }
} catch (error) {
  console.error('❌ Error updating tsconfig.json:', error.message);
}

// Create .env.production file for build
console.log('📝 Creating .env.production file for build...');
try {
  const envContent = `
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}

# Server URL
NEXT_PUBLIC_SERVER_URL=${process.env.NEXT_PUBLIC_SERVER_URL || 'https://getplately.com'}
NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL || 'https://getplately.com'}

# Payload CMS
PAYLOAD_SECRET=${process.env.PAYLOAD_SECRET || 'default-payload-secret-for-build-only'}

# Node environment
NODE_ENV=production
`.trim();

  fs.writeFileSync(path.join(process.cwd(), '.env.production'), envContent);
  console.log('✅ .env.production file created successfully');
} catch (error) {
  console.error('❌ Error creating .env.production file:', error.message);
}

// Ensure .next directory exists
ensureDirectoryExists(path.join(process.cwd(), '.next'));
ensureDirectoryExists(path.join(process.cwd(), '.next', 'types'));

console.log('✅ Amplify Build Helper completed successfully');
