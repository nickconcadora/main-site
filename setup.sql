-- TTW Enterprises - Database Setup
-- Run this in your Neon database console to create the posts table

CREATE TABLE IF NOT EXISTS posts (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(500) NOT NULL,
  slug        VARCHAR(500) UNIQUE NOT NULL,
  excerpt     TEXT,
  content     TEXT NOT NULL,
  meta_description VARCHAR(160),
  published   BOOLEAN DEFAULT false,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast slug lookups (used on every page load)
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Index for the blog listing (published posts by date)
CREATE INDEX IF NOT EXISTS idx_posts_published_date ON posts(published, created_at DESC);
