// Script to ensure TypeScript types are properly installed
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Checking TypeScript types installation...');

// Check if node_modules/@types/react exists
const reactTypesPath = path.join(process.cwd(), 'node_modules', '@types', 'react');
const reactDomTypesPath = path.join(process.cwd(), 'node_modules', '@types', 'react-dom');

const needsReactTypes = !fs.existsSync(reactTypesPath);
const needsReactDomTypes = !fs.existsSync(reactDomTypesPath);

if (needsReactTypes || needsReactDomTypes) {
  console.log('Installing missing TypeScript types...');
  
  try {
    if (needsReactTypes) {
      console.log('Installing @types/react...');
      execSync('npm install --save-dev @types/react@18.2.0', { stdio: 'inherit' });
    }
    
    if (needsReactDomTypes) {
      console.log('Installing @types/react-dom...');
      execSync('npm install --save-dev @types/react-dom@18.2.0', { stdio: 'inherit' });
    }
    
    console.log('TypeScript types installed successfully.');
  } catch (error) {
    console.error('Error installing TypeScript types:', error.message);
    process.exit(1);
  }
} else {
  console.log('TypeScript types are already installed.');
}

// Verify tsconfig.json includes React types
try {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const tsconfig = require(tsconfigPath);
  
  if (!tsconfig.compilerOptions.types || 
      !tsconfig.compilerOptions.types.includes('react') || 
      !tsconfig.compilerOptions.types.includes('react-dom')) {
    
    console.log('Updating tsconfig.json to include React types...');
    
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
    console.log('tsconfig.json updated successfully.');
  }
} catch (error) {
  console.error('Error updating tsconfig.json:', error.message);
}

console.log('TypeScript setup complete.');
