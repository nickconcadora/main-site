import { getDb } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { slug } = req.body
  if (!slug) return res.status(400).json({ error: 'slug required' })

  try {
    const sql = getDb()
    await sql`
      UPDATE posts SET views = views + 1 WHERE slug = ${slug} AND published = true
    `
    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to update views' })
  }
}
