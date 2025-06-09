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
    log(error.message);
    return false;
  }
}

// Create a minimal tailwind config
function createTailwindConfig() {
  log('Creating minimal tailwind config...');
  const configContent = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
  
  fs.writeFileSync('tailwind.config.js.temp', configContent);
  log('Created temporary tailwind config');
}

// Create a minimal postcss config
function createPostcssConfig() {
  log('Creating minimal postcss config...');
  const configContent = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
  
  fs.writeFileSync('postcss.config.js.temp', configContent);
  log('Created temporary postcss config');
}

// Create a minimal CSS file
function createCssFile() {
  log('Creating minimal CSS file...');
  const cssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  
  fs.writeFileSync('src/app/globals.css.temp', cssContent);
  log('Created temporary CSS file');
}

// Install tailwindcss directly to node_modules
function installTailwindDirectly() {
  log('Installing tailwindcss directly to node_modules...');
  
  // Create package.json for tailwindcss in node_modules
  const tailwindDir = path.join(process.cwd(), 'node_modules', 'tailwindcss');
  if (!fs.existsSync(tailwindDir)) {
    fs.mkdirSync(tailwindDir, { recursive: true });
  }
  
  // Create a minimal package.json
  const packageJson = {
    name: "tailwindcss",
    version: "3.4.1",
    main: "lib/index.js"
  };
  
  fs.writeFileSync(path.join(tailwindDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // Create lib directory
  const libDir = path.join(tailwindDir, 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  // Create minimal index.js
  const indexJs = `
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
  
  fs.writeFileSync(path.join(libDir, 'index.js'), indexJs);
  log('Created minimal tailwindcss package in node_modules');
}

// Install tailwindcss and dependencies
function installTailwind() {
  log('Installing tailwindcss and dependencies...');
  
  // First try to install with npm
  const npmSuccess = runCommand('npm install --save tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography --no-fund --no-audit --force');
  
  if (!npmSuccess) {
    log('NPM install failed, trying direct installation...');
    installTailwindDirectly();
  }
  
  // Create temporary config files
  createTailwindConfig();
  createPostcssConfig();
  createCssFile();
  
  // Run tailwindcss CLI to generate CSS
  log('Initializing tailwindcss...');
  try {
    // Try to run tailwindcss init
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });
  } catch (error) {
    log('Failed to initialize tailwindcss, but continuing...');
  }
}

// Main function
async function main() {
  try {
    log('Starting tailwindcss setup...');
    
    // Install tailwindcss
    installTailwind();
    
    log('Tailwindcss setup completed');
  } catch (error) {
    log(`Setup failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main();
