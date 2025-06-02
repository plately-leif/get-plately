# Plately Admin

A modern admin dashboard and content management system built with [Next.js](https://nextjs.org/), [Payload CMS](https://payloadcms.com/), and [Supabase](https://supabase.com/) for authentication.

---

## 🚀 Project Overview
- **Admin Dashboard** - Secure dashboard for managing content
- **Blog Management** - Full-featured blog post management
- **Media Library** - Upload and manage media files
- **User Authentication** - Secure admin authentication with Supabase
- **Role-Based Access** - Admin-only access control

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Payload CMS (self-hosted)
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel or Netlify
- **Styling:** Tailwind CSS, Headless UI

---

## ✨ Features
- **Secure Admin Area** - Protected routes with Supabase authentication
- **Content Management** - Full CRUD operations for blog posts and media
- **Responsive Design** - Works on desktop and mobile devices
- **Type Safety** - Built with TypeScript for better developer experience
- **Modern UI** - Clean and intuitive admin interface

---

## 📝 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Supabase account

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd get-plately
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Payload CMS
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=your_secure_random_string
DATABASE_URI=postgresql://user:password@host:port/database

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up Supabase
1. Create a new project on [Supabase](https://supabase.com/)
2. Go to the SQL Editor and run the following SQL to create the users table with a role column:

```sql
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  role text not null default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can manage all users"
  on public.users for all
  using (auth.role() = 'service_role');
```

3. Create a trigger to automatically create a user profile when a new user signs up:

```sql
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 5. Create an admin user
1. Sign up a new user through your application's signup flow
2. In the Supabase dashboard, go to the Table Editor and find the `users` table
3. Update the user's role to 'admin' for admin access

### 6. Start the development server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000/admin` to access the admin dashboard.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import the repository to Vercel
3. Add the same environment variables as in your `.env.local` file
4. Deploy!

### Netlify
1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import the repository to Netlify
3. Set the build command to `next build` and publish directory to `.next`
4. Add the environment variables
5. Deploy!

## 🔒 Security

- Ensure `PAYLOAD_SECRET` is a strong, random string
- Keep your database credentials secure
- Use HTTPS in production
- Regularly update your dependencies
- Follow the principle of least privilege for database permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
4. **Choose your blog system:**
   - Use Markdown/MDX files (static)
   - Or connect a free/open-source headless CMS (see above)
   - Or use Supabase for dynamic blog posts
5. **Run locally:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. **Deploy to Netlify:**
   - Connect your repo to Netlify
   - Set environment variables in Netlify dashboard
   - Deploy!

---

## 📚 Blog CMS Options
- **Markdown/MDX:** Easiest, no backend needed
- **Strapi:** Free, open-source, self-hosted headless CMS
- **KeystoneJS:** Open-source, flexible CMS
- **Directus:** Open-source, database-first CMS
- **Contentlayer:** Static content, integrates with Next.js

---

## 📬 Email Signup Table Example (Supabase)
| id | email           | created_at          |
|----|-----------------|---------------------|
| 1  | test@email.com  | 2024-06-01T12:00:00 |

---

## 🧑‍💻 Contributing
Pull requests welcome! For major changes, please open an issue first.

---

## 📄 License
[MIT](LICENSE)
