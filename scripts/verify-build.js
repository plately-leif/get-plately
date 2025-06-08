#!/usr/bin/env node
// Build Verification Script
// This script verifies that the build process works locally before deploying to AWS Amplify

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Build Verification...');

// Function to run a command and handle errors
function runCommand(command, options = {}) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Check for required environment variables
function checkEnvironmentVariables() {
  console.log('🔍 Checking environment variables...');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing environment variables:');
    missingVars.forEach(varName => console.warn(`   - ${varName}`));
    console.warn('These will need to be set in the AWS Amplify console');
  } else {
    console.log('✅ All required environment variables are set');
  }
}

// Verify package.json configuration
function verifyPackageJson() {
  console.log('🔍 Verifying package.json configuration...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found');
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check for required scripts
    const requiredScripts = ['build', 'amplify:build'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      console.error('❌ Missing required scripts in package.json:');
      missingScripts.forEach(script => console.error(`   - ${script}`));
      return false;
    }
    
    // Check for required dependencies
    const requiredDeps = ['next', 'react', 'react-dom'];
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    
    if (missingDeps.length > 0) {
      console.error('❌ Missing required dependencies in package.json:');
      missingDeps.forEach(dep => console.error(`   - ${dep}`));
      return false;
    }
    
    console.log('✅ package.json configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Error verifying package.json:', error.message);
    return false;
  }
}

// Verify Amplify configuration
function verifyAmplifyConfig() {
  console.log('🔍 Verifying Amplify configuration...');
  
  const amplifyConfigPath = path.join(process.cwd(), 'amplify.yml');
  if (!fs.existsSync(amplifyConfigPath)) {
    console.error('❌ amplify.yml not found');
    return false;
  }
  
  try {
    const amplifyConfig = fs.readFileSync(amplifyConfigPath, 'utf8');
    
    // Check for required sections
    if (!amplifyConfig.includes('npm run amplify:build')) {
      console.error('❌ amplify.yml does not include the amplify:build script');
      return false;
    }
    
    console.log('✅ amplify.yml configuration verified');
    return true;
  } catch (error) {
    console.error('❌ Error verifying amplify.yml:', error.message);
    return false;
  }
}

// Verify build scripts
function verifyBuildScripts() {
  console.log('🔍 Verifying build scripts...');
  
  const requiredScripts = [
    'scripts/amplify-build.js',
    'scripts/next-build.js'
  ];
  
  const missingScripts = requiredScripts.filter(script => !fs.existsSync(path.join(process.cwd(), script)));
  
  if (missingScripts.length > 0) {
    console.error('❌ Missing required build scripts:');
    missingScripts.forEach(script => console.error(`   - ${script}`));
    return false;
  }
  
  console.log('✅ Build scripts verified');
  return true;
}

// Run a test build
async function runTestBuild() {
  console.log('🔨 Running test build...');
  
  // Create a temporary .env.production file if it doesn't exist
  const envPath = path.join(process.cwd(), '.env.production');
  const envExists = fs.existsSync(envPath);
  
  if (!envExists) {
    console.log('📝 Creating temporary .env.production file for test build...');
    
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://getplately.com',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://getplately.com',
      NODE_ENV: 'production'
    };
    
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    fs.writeFileSync(envPath, envContent);
  }
  
  // Run the build script
  const buildSuccess = runCommand('node scripts/amplify-build.js');
  
  // Clean up temporary .env.production file
  if (!envExists && fs.existsSync(envPath)) {
    console.log('🧹 Cleaning up temporary .env.production file...');
    fs.unlinkSync(envPath);
  }
  
  if (buildSuccess) {
    console.log('✅ Test build completed successfully!');
    return true;
  } else {
    console.error('❌ Test build failed');
    return false;
  }
}

// Main verification process
async function verify() {
  try {
    // Check environment variables
    checkEnvironmentVariables();
    
    // Verify package.json configuration
    const packageJsonValid = verifyPackageJson();
    if (!packageJsonValid) {
      console.error('❌ package.json verification failed');
      return 1;
    }
    
    // Verify Amplify configuration
    const amplifyConfigValid = verifyAmplifyConfig();
    if (!amplifyConfigValid) {
      console.error('❌ amplify.yml verification failed');
      return 1;
    }
    
    // Verify build scripts
    const buildScriptsValid = verifyBuildScripts();
    if (!buildScriptsValid) {
      console.error('❌ Build scripts verification failed');
      return 1;
    }
    
    // Ask if the user wants to run a test build
    console.log('\n🤔 Would you like to run a test build? (y/n)');
    console.log('This will simulate the build process that will run on AWS Amplify.');
    console.log('Press Ctrl+C to skip the test build.');
    
    // Wait for user input (this is just a placeholder, as we can't actually get user input in this script)
    console.log('Assuming "y" for demonstration purposes...');
    
    // Run a test build
    const testBuildSuccess = await runTestBuild();
    if (!testBuildSuccess) {
      console.error('❌ Test build failed');
      return 1;
    }
    
    console.log('\n✅ Build verification completed successfully!');
    console.log('Your project should now build successfully on AWS Amplify.');
    
    return 0;
  } catch (error) {
    console.error('❌ Unhandled error during verification:', error);
    return 1;
  }
}

// Run the verification process
verify()
  .then(exitCode => {
    if (exitCode === 0) {
      console.log('🚀 Your project is ready for deployment to AWS Amplify!');
    } else {
      console.error('⚠️ Please fix the issues before deploying to AWS Amplify.');
    }
    process.exit(exitCode);
  })
  .catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
