import { getDb } from '../../../lib/db'
import { withAdminAuth } from '../../../lib/session'

async function handler(req, res) {
  const sql = getDb()
  const { id } = req.query

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }

  if (req.method === 'PUT') {
    const { title, slug, excerpt, content, meta_description, published } = req.body

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: 'Title and content are required' })
    }

    // Check slug uniqueness (excluding current post)
    if (slug) {
      const existing = await sql`
        SELECT id FROM posts WHERE slug = ${slug} AND id != ${parseInt(id)} LIMIT 1
      `
      if (existing.length > 0) {
        return res.status(400).json({ error: 'A post with this URL slug already exists.' })
      }
    }

    const [post] = await sql`
      UPDATE posts SET
        title = ${title.trim()},
        slug = ${slug?.trim()},
        excerpt = ${excerpt?.trim() || null},
        content = ${content.trim()},
        meta_description = ${meta_description?.trim() || null},
        published = ${published ?? false},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING id, title, slug
    `

    if (!post) return res.status(404).json({ error: 'Post not found' })
    return res.status(200).json(post)
  }

  if (req.method === 'PATCH') {
    // Partial update — used for toggling publish status
    const { published } = req.body
    const [post] = await sql`
      UPDATE posts SET published = ${published}, updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING id, title, published
    `
    if (!post) return res.status(404).json({ error: 'Post not found' })
    return res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM posts WHERE id = ${parseInt(id)}`
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withAdminAuth(handler)
