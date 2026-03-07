import { getSession } from '../../../lib/session'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Constant-time comparison to prevent timing attacks
  const encoder = new TextEncoder()
  const a = encoder.encode(password)
  const b = encoder.encode(adminPassword)

  if (a.length !== b.length) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i]
  }

  if (mismatch !== 0) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const session = await getSession(req, res)
  session.isAdmin = true
  await session.save()

  return res.status(200).json({ success: true })
}
