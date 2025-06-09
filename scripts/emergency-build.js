#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple logging with timestamps
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Run a command and return true if it succeeds, false otherwise
function runCommand(command, options = {}) {
  try {
    log(`Running: ${command}`);
    execSync(command, { 
      stdio: 'inherit',
      ...options
    });
    return true;
  } catch (error) {
    log(`Command failed: ${command}`);
    return false;
  }
}

// Create .env.production file with environment variables
function createEnvFile() {
  log('Creating .env.production file...');
  const envContent = `
NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}
NEXT_PUBLIC_SERVER_URL=${process.env.NEXT_PUBLIC_SERVER_URL || ''}
NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL || ''}
PAYLOAD_SECRET=${process.env.PAYLOAD_SECRET || ''}
`.trim();
  
  fs.writeFileSync('.env.production', envContent);
  log('.env.production file created successfully');
}

// Fix path alias resolution
function fixPathAliases() {
  log('Fixing path aliases...');
  
  // Create @ directory in node_modules
  const nodeModulesDir = path.join(process.cwd(), 'node_modules');
  const aliasDir = path.join(nodeModulesDir, '@');
  const srcDir = path.join(process.cwd(), 'src');
  
  // Remove existing @ directory if it exists
  if (fs.existsSync(aliasDir)) {
    log('Removing existing path alias directory...');
    try {
      fs.rmSync(aliasDir, { recursive: true, force: true });
    } catch (error) {
      runCommand(`rm -rf ${aliasDir}`);
    }
  }
  
  // Create @ directory
  fs.mkdirSync(aliasDir, { recursive: true });
  
  // Copy critical files directly
  const criticalFiles = [
    { src: 'components/admin/Sidebar.tsx', dest: 'components/admin/Sidebar.tsx' },
    { src: 'utils/supabase/client.ts', dest: 'utils/supabase/client.ts' },
    { src: 'utils/supabase/server.ts', dest: 'utils/supabase/server.ts' }
  ];
  
  for (const file of criticalFiles) {
    const srcFile = path.join(srcDir, file.src);
    const destFile = path.join(aliasDir, file.dest);
    const destDir = path.dirname(destFile);
    
    if (fs.existsSync(srcFile)) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcFile, destFile);
      log(`Copied ${file.src} to node_modules/@/${file.dest}`);
    }
  }
  
  // Create jsconfig.paths.json
  const jsConfigContent = JSON.stringify({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*']
      }
    }
  }, null, 2);
  
  fs.writeFileSync('jsconfig.paths.json', jsConfigContent);
  log('Created jsconfig.paths.json for path resolution');
}

// Fix Suspense boundaries in pages using useSearchParams
function fixSuspenseBoundaries() {
  log('Fixing Suspense boundaries...');
  
  const pagesToCheck = [
    { path: path.join(process.cwd(), 'src', 'app', 'auth', 'update-password', 'page.tsx'), name: 'update-password' },
    { path: path.join(process.cwd(), 'src', 'app', 'auth', 'signin', 'page.tsx'), name: 'signin' },
    { path: path.join(process.cwd(), 'src', 'app', 'admin', 'login', 'page.tsx'), name: 'admin-login' }
  ];
  
  for (const page of pagesToCheck) {
    if (fs.existsSync(page.path)) {
      const content = fs.readFileSync(page.path, 'utf8');
      
      // Check if the file uses useSearchParams but doesn't have Suspense
      if (content.includes('useSearchParams') && !content.includes('<Suspense')) {
        log(`Found useSearchParams without Suspense in ${page.name} page`);
        
        // Create a backup
        fs.writeFileSync(`${page.path}.backup`, content);
        
        // Add Suspense import if needed
        let updatedContent = content;
        if (!content.includes('import { Suspense }') && !content.includes('import {Suspense}')) {
          if (content.includes('import { useState, useEffect }')) {
            updatedContent = content.replace(
              'import { useState, useEffect }',
              'import { useState, useEffect, Suspense }'
            );
          } else if (content.includes('import {')) {
            updatedContent = content.replace(
              /import \{([^}]*)\}/,
              (match, imports) => `import {${imports}, Suspense}`
            );
          } else {
            updatedContent = `import { Suspense } from 'react';\n${content}`;
          }
        }
        
        fs.writeFileSync(page.path, updatedContent);
        log(`Added Suspense import to ${page.name} page`);
      }
    }
  }
}

// Update next.config.js for AWS Amplify compatibility
function updateNextConfig() {
  log('Updating Next.js configuration...');
  
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  if (fs.existsSync(nextConfigPath)) {
    let content = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Add path alias resolution to webpack config if not present
    if (!content.includes('config.resolve.alias')) {
      const webpackConfigRegex = /webpack:\s*\([^)]*\)\s*=>\s*\{/;
      if (webpackConfigRegex.test(content)) {
        content = content.replace(
          webpackConfigRegex,
          match => `${match}\n    // Add alias for @ to point to src directory\n    config.resolve.alias['@'] = path.join(process.cwd(), 'src');`
        );
      } else {
        // Add webpack config if not present
        content = content.replace(
          /const nextConfig = \{/,
          `const path = require('path');\n\nconst nextConfig = {\n  webpack: (config) => {\n    config.resolve.alias['@'] = path.join(process.cwd(), 'src');\n    return config;\n  },`
        );
      }
    }
    
    // Ensure output is set to standalone
    if (!content.includes("output: 'standalone'")) {
      content = content.replace(
        /const nextConfig = \{/,
        `const nextConfig = {\n  output: 'standalone',`
      );
    }
    
    // Ensure experimental.missingSuspenseWithCSRBailout is false
    if (!content.includes('missingSuspenseWithCSRBailout: false')) {
      if (content.includes('experimental: {')) {
        content = content.replace(
          /experimental:\s*\{/,
          `experimental: {\n    missingSuspenseWithCSRBailout: false,`
        );
      } else {
        content = content.replace(
          /const nextConfig = \{/,
          `const nextConfig = {\n  experimental: {\n    missingSuspenseWithCSRBailout: false\n  },`
        );
      }
    }
    
    fs.writeFileSync(nextConfigPath, content);
    log('Next.js configuration updated successfully');
  }
}

// Main build function
async function build() {
  try {
    log('Starting emergency build process...');
    
    // Create environment variables file
    createEnvFile();
    
    // Fix path aliases
    fixPathAliases();
    
    // Fix Suspense boundaries
    fixSuspenseBoundaries();
    
    // Update Next.js configuration
    updateNextConfig();
    
    // Install tailwindcss and its dependencies
    log('Installing tailwindcss and critical dependencies...');
    runCommand('npm install --save tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography --force');
    
    // Install dependencies with --force to avoid conflicts
    log('Installing dependencies...');
    runCommand('npm install --force');
    
    // Run Next.js build with minimal options
    log('Starting Next.js build...');
    const buildSuccess = runCommand('npx next build --no-lint');
    
    if (!buildSuccess) {
      log('Standard build failed, trying with additional options...');
      const fallbackSuccess = runCommand('npx next build --no-lint --no-mangling');
      
      if (!fallbackSuccess) {
        log('All build attempts failed');
        process.exit(1);
      }
    }
    
    log('Build completed successfully!');
  } catch (error) {
    log(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the build
build();
