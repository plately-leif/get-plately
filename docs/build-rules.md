# Plately Build Rules

## AWS Amplify Build Rules

1. **NO `next export` COMMANDS**: Never use `next export` in any build scripts as it's incompatible with Next.js 14 SSR.

2. **PATH ALIAS RESOLUTION**: Always ensure path aliases are properly resolved:
   - Keep webpack configuration in next.config.js for `@/` path resolution
   - Maintain the path alias resolution helper in the build script
   - Consider using relative imports for problematic components

3. **SUSPENSE BOUNDARIES REQUIRED**: All components using client-side hooks must be wrapped in Suspense boundaries:
   - Components using `useSearchParams`
   - Components using `useRouter` with client-side navigation
   - Any component using client-side state that might cause hydration issues

4. **ENVIRONMENT VARIABLES**: All required environment variables must be set in AWS Amplify console:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SERVER_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `PAYLOAD_SECRET`

5. **BUILD SCRIPT INTEGRITY**: Never modify the amplify-build.js script without thorough testing:
   - Always run verify-build.js locally before pushing changes
   - Maintain all fallback build strategies
   - Keep path resolution fixes intact

6. **NEXT.JS CONFIG**: Maintain these critical Next.js configuration settings:
   - `output: 'standalone'` for SSR compatibility
   - `experimental.missingSuspenseWithCSRBailout: false` to prevent bailout errors
   - Proper webpack configuration for path aliases

7. **PRE-DEPLOYMENT VERIFICATION**: Always run the verify-build script before deploying:
   ```bash
   node scripts/verify-build.js
   ```

8. **DEPENDENCY MANAGEMENT**: Ensure all dependencies are properly installed:
   - Keep the dependency installation function in amplify-build.js updated
   - Add new dependencies to the list if build failures occur

9. **DOCUMENTATION**: Keep the AWS Amplify build guidelines document updated:
   - Document new issues and solutions
   - Update the pre-deployment checklist as needed

10. **PRODUCTION-ONLY WORKFLOW**: Remember that all changes deploy directly to production:
    - Use feature flags for major changes
    - Test thoroughly before pushing
    - Monitor build logs closely after deployment

Refer to the full [AWS Amplify Build Guidelines](/docs/aws-amplify-build-guidelines.md) for detailed information and troubleshooting steps.
