# Blog and User Management Setup

This document outlines the steps to set up and manage the blog system and user authentication.

## Prerequisites

1. Make sure you have the following environment variables set in your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URI=your_database_connection_string
   ADMIN_PASSWORD=your_secure_password  # Optional, will be auto-generated if not provided
   ```

## Setting Up the Admin User

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Run the setup script to create an admin user:
   ```bash
   npm run setup:admin
   ```

   This will:
   - Create a new admin user with email `leif@platey.ai`
   - Generate a random password (or use the one from `ADMIN_PASSWORD` if set)
   - Assign the `admin` role to this user

3. Save the generated credentials in a secure location.

## Accessing the Admin Dashboard

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin dashboard:
   ```
   http://localhost:3000/payload-admin
   ```

3. Log in with your admin credentials.

## Managing Blog Posts

### Creating a New Blog Post

1. Navigate to the admin dashboard
2. Click on "Blog Posts" in the sidebar
3. Click the "Create New" button
4. Fill in the required fields:
   - Title: The title of your blog post
   - Slug: A URL-friendly version of the title (auto-generated from the title)
   - Published Date: When the post should be published
   - Author: Automatically set to the current user
   - Content: The main content of the post (supports rich text)
   - Featured Image: An optional image for the post
   - Excerpt: A short summary of the post
   - Tags: Optional tags for categorization

5. Click "Save" to publish the post

### Managing Users

1. Navigate to the admin dashboard
2. Click on "Users" in the sidebar
3. Here you can:
   - View all users
   - Edit user details
   - Change user roles
   - Deactivate users

## Database Schema

The blog system uses the following tables:

### users
- `id`: UUID (primary key)
- `email`: Text (unique)
- `name`: Text
- `role`: Text (admin/editor/user)
- `avatar`: Text (URL to avatar image)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### blog_posts
- `id`: UUID (primary key)
- `title`: Text
- `slug`: Text (unique)
- `publishedDate`: Timestamp
- `author`: UUID (references users.id)
- `content`: JSON (rich text content)
- `featuredImage`: UUID (references media.id)
- `excerpt`: Text
- `tags`: JSON array of strings
- `_status`: Text (draft/published)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Security Notes

1. Always use strong, unique passwords for admin accounts
2. Regularly review and update user permissions
3. Keep your dependencies up to date
4. Never commit sensitive information to version control
5. Use environment variables for all sensitive configuration
