# TTW Enterprises - Deployment Guide

## What's Changed
Your site has been rebuilt in Next.js with a full blog system and admin dashboard.
All your existing pages are preserved exactly. Blog lives at /blog. Admin at /admin.

---

## Step 1 — Set Up Neon Database (in Vercel)

1. Go to your Vercel dashboard → Storage tab
2. Click "Create Database" → choose Neon (Postgres)
3. Name it "ttw-db", pick the nearest region, click Create
4. Vercel automatically adds DATABASE_URL to your environment variables

Then run the database schema:
1. In Vercel → Storage → your database → "Query" tab
2. Paste the contents of setup.sql and click Run

---

## Step 2 — Set Environment Variables in Vercel

Go to Vercel → your project → Settings → Environment Variables. Add:

| Variable            | Value                          |
|---------------------|--------------------------------|
| ADMIN_PASSWORD      | (choose a strong password)     |
| SESSION_SECRET      | (random 32+ character string)  |
| MAILERLITE_API_KEY  | (your existing MailerLite key) |
| MAILERLITE_GROUP_ID | (your existing group ID)       |
| RECAPTCHA_SECRET_KEY| (your existing secret key)     |

To generate a SESSION_SECRET, run this in your terminal:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

---

## Step 3 — Deploy

Replace your current GitHub repo contents with this new project:

1. Back up your current repo if needed
2. Copy all files from this folder into your local repo
3. git add .
4. git commit -m "Rebuild: Next.js with blog and admin"
5. git push

Vercel auto-deploys on push. Build takes ~1-2 minutes.

---

## Step 4 — Copy Your Assets

Copy these files from your old project into /public:
- favicon.svg
- favicon.ico
- book-cover.png
- testimonials/ folder (all testimonial images)

---

## How to Write a Blog Post

1. Go to yoursite.com/admin
2. Log in with your ADMIN_PASSWORD
3. Click "+ New Post"
4. Write your title, content, excerpt, and SEO description
5. Click "Publish" (or "Save Draft" to come back later)

That's it. Post goes live immediately.

---

## URL Structure

| Old URL                        | New URL                        |
|-------------------------------|-------------------------------|
| /                             | / (unchanged)                 |
| /contact.html                 | /contact                      |
| /reviews.html                 | /reviews                      |
| /email-subject-lines.html     | /email-subject-lines          |
| (new)                         | /blog                         |
| (new)                         | /blog/your-post-slug          |
| (new)                         | /admin                        |

If you have any links pointing to the old .html URLs, update them.
