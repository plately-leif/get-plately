# Plately Admin Guide

This guide provides instructions for managing admin users and controlling AWS Amplify builds.

## Managing Admin Users

We've created a script to help you manage admin users in the Supabase database. This script allows you to add admin privileges to existing users, list all users with their roles, and remove admin privileges.

### Prerequisites

Make sure you have Node.js installed and your `.env.local` file contains the correct Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Usage

The script is located at `scripts/manage-admin-users.js` and can be used as follows:

#### Add Admin Role to a User

```bash
node scripts/manage-admin-users.js add user@example.com
```

This will grant admin privileges to the specified user. The user must already exist in the Supabase authentication system (they should have signed up or logged in at least once).

#### List All Users

```bash
node scripts/manage-admin-users.js list
```

This will display a list of all users in the system along with their roles and last sign-in time.

#### Remove Admin Role from a User

```bash
node scripts/manage-admin-users.js remove user@example.com
```

This will remove admin privileges from the specified user, changing their role to 'user'.

## Controlling AWS Amplify Builds

To prevent AWS Amplify from automatically building on every push (which can get expensive), we've configured the `amplify.yml` file to control when builds happen.

### Current Configuration

The current configuration in `amplify.yml` is set to:

1. Only automatically build on the `production` branch
2. Disable automatic builds on the `main` branch
3. Disable builds on pull requests

### Manually Triggering Builds

When you want to deploy changes from the `main` branch:

1. Log in to the AWS Amplify Console
2. Select your Plately application
3. Go to the "Hosting environments" tab
4. Find the branch you want to build (e.g., `main`)
5. Click the "Redeploy this version" button

### Changing Build Settings

If you need to modify when builds happen, edit the `build_settings` section in the `amplify.yml` file:

```yaml
build_settings:
  branches:
    production:
      build: true
    main:
      build: false
  pull_requests:
    build: false
```

After making changes to `amplify.yml`, commit and push the changes to your repository.

## Admin Routes

- Custom Admin Dashboard: `/admin`
- Payload CMS Admin: `/payload-admin`

Both admin interfaces require authentication with admin privileges.
