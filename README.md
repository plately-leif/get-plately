# get-plately

A modern SaaS landing page and blog built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Supabase](https://supabase.com/). Deployed on [Netlify](https://www.netlify.com/).

---

## 🚀 Project Overview
- **Landing page** to showcase your SaaS product
- **Email signup** form (emails stored in Supabase)
- **Blog** (choose your preferred free/open-source headless CMS or use Markdown/MDX)

---

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Database:** Supabase (for email signups, optionally for blog posts)
- **Deployment:** Netlify
- **Blog CMS:** Flexible (Markdown/MDX, or free/open-source headless CMS like [Strapi](https://strapi.io/), [KeystoneJS](https://keystonejs.com/), [Directus](https://directus.io/), or [Contentlayer](https://www.contentlayer.dev/))

---

## ✨ Features
- Beautiful, responsive landing page
- Email signup form (integrated with Supabase)
- Blog (choose your preferred CMS or Markdown/MDX)
- Easy deployment to Netlify

---

## 📝 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd get-plately
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up Supabase:**
   - Create a [Supabase](https://supabase.com/) project
   - Create a table for email signups (e.g., `emails`)
   - Get your Supabase URL and anon/public key
   - Add them to your `.env.local` file:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
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
