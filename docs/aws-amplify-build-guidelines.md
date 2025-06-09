# AWS Amplify Build Guidelines for Next.js 14 SSR

## Common Build Issues and Solutions

### Path Alias Resolution

Path aliases (e.g., `@/components/admin/Sidebar`) can cause build failures in AWS Amplify even when they work locally. To prevent this:

1. **Use the webpack configuration in next.config.js**:
   ```javascript
   webpack: (config, { isServer }) => {
     config.resolve.alias['@'] = path.join(process.cwd(), 'src');
     return config;
   }
   ```

2. **Create a path alias resolution helper** in the build script:
   ```javascript
   function fixPathAliasIssues() {
     // Create a copy of src in node_modules/@
     const nodeModulesDir = path.join(process.cwd(), 'node_modules');
     const aliasDir = path.join(nodeModulesDir, '@');
     const srcDir = path.join(process.cwd(), 'src');
     
     if (!fs.existsSync(aliasDir)) {
       fs.mkdirSync(aliasDir, { recursive: true });
       runCommand(`cp -r ${srcDir}/* ${aliasDir}/`);
     }
   }
   ```

3. **Consider using relative imports** for components that are causing issues.

### React Suspense Boundaries

Pages using client-side hooks like `useSearchParams` must be wrapped in Suspense boundaries:

1. **Identify affected pages**:
   - `/auth/signin`
   - `/auth/update-password`
   - `/admin/login`

2. **Add Suspense boundaries**:
   ```jsx
   import { Suspense } from 'react';
   
   export default function Page() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <PageContent />
       </Suspense>
     );
   }
   
   function PageContent() {
     const searchParams = useSearchParams();
     // ...
   }
   ```

### Next.js 14 SSR Configuration

1. **Remove `next export`** from all build scripts (incompatible with SSR)
2. **Set output to standalone** in next.config.js:
   ```javascript
   output: 'standalone',
   ```
3. **Disable Edge API routes** if not needed:
   ```javascript
   experimental: {
     serverActions: true,
     serverComponentsExternalPackages: ['@prisma/client'],
     missingSuspenseWithCSRBailout: false,
     serverActionsBodySizeLimit: '2mb',
   }
   ```

### Environment Variables

1. **Required environment variables** must be set in AWS Amplify console:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SERVER_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `PAYLOAD_SECRET`

2. **Create .env.production during build**:
   ```javascript
   function createEnvFile() {
     console.log('📝 Creating .env.production file...');
     const envContent = `
       NEXT_PUBLIC_SUPABASE_URL=${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}
       NEXT_PUBLIC_SUPABASE_ANON_KEY=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}
       NEXT_PUBLIC_SERVER_URL=${process.env.NEXT_PUBLIC_SERVER_URL || ''}
       NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL || ''}
       PAYLOAD_SECRET=${process.env.PAYLOAD_SECRET || ''}
     `.trim();
     
     fs.writeFileSync('.env.production', envContent);
     console.log('✅ .env.production file created successfully');
   }
   ```

## Pre-Deployment Checklist

Before pushing changes that will trigger an AWS Amplify build:

1. **Run the verify-build script** locally:
   ```bash
   node scripts/verify-build.js
   ```

2. **Check for missing dependencies** in package.json

3. **Verify all path aliases** are properly resolved

4. **Ensure all client components** using hooks like `useSearchParams` are wrapped in Suspense boundaries

5. **Confirm environment variables** are properly set in AWS Amplify console

## Troubleshooting Failed Builds

1. **Check build logs** for specific error messages

2. **Common error patterns**:
   - "Module not found" → Path alias resolution issue
   - "Error: No router instance found" → Missing Suspense boundary
   - "Cannot read properties of null" → Environment variable issue

3. **Fallback build strategies**:
   - Try with `--no-lint` flag
   - Try with `--no-mangling` flag
   - Consider temporarily disabling type checking

## Best Practices

1. **Minimize path aliases** for critical components
2. **Use consistent import patterns**
3. **Add detailed comments** for workarounds
4. **Document all environment variables**
5. **Keep the build script updated** with new fixes
