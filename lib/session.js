import { getIronSession } from 'iron-session'

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'ttw_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
  },
}

export async function getSession(req, res) {
  return getIronSession(req, res, sessionOptions)
}

export function withAdminAuth(handler) {
  return async (req, res) => {
    const session = await getSession(req, res)
    if (!session.isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    return handler(req, res, session)
  }
}
