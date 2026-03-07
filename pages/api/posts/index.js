import { getDb } from '../../../lib/db'
import { withAdminAuth } from '../../../lib/session'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function handler(req, res) {
  const sql = getDb()

  if (req.method === 'GET') {
    // Public: get published posts
    const posts = await sql`
      SELECT id, title, slug, excerpt, created_at
      FROM posts
      WHERE published = true
      ORDER BY created_at DESC
    `
    return res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    const { title, slug, excerpt, content, meta_description, published } = req.body

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Title and content are required' })
    }

    const finalSlug = (slug?.trim() || slugify(title)).replace(/[^a-z0-9-]/g, '')

    // Check slug uniqueness
    const existing = await sql`
      SELECT id FROM posts WHERE slug = ${finalSlug} LIMIT 1
    `
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A post with this URL slug already exists. Please change the slug.' })
    }

    const [post] = await sql`
      INSERT INTO posts (title, slug, excerpt, content, meta_description, published)
      VALUES (${title.trim()}, ${finalSlug}, ${excerpt?.trim() || null}, ${content.trim()}, ${meta_description?.trim() || null}, ${published ?? false})
      RETURNING id, title, slug
    `

    return res.status(201).json(post)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withAdminAuth(handler)
