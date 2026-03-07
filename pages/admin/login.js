import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from '../../lib/session'

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  if (session.isAdmin) {
    return { redirect: { destination: '/admin', permanent: false } }
  }
  return { props: {} }
}

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Invalid password.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - TTW Enterprises</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="login-wrap">
        <div className="login-box">
          <h1><span>TTW</span> Admin</h1>
          <p>Enter your password to access the dashboard.</p>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .login-box {
          background: rgba(20,20,20,0.9);
          border: 1px solid rgba(196,30,58,0.4);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        h1 {
          font-size: 2rem;
          font-weight: 900;
          color: #ffd700;
          margin-bottom: 0.5rem;
        }
        h1 span { color: #c41e3a; }
        p {
          color: #888;
          margin-bottom: 2rem;
        }
        .error {
          background: rgba(196,30,58,0.15);
          border: 1px solid #c41e3a;
          color: #ff6b6b;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #f5f5f5;
          font-weight: 600;
          font-size: 0.9rem;
        }
        input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(0,0,0,0.4);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #f5f5f5;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }
        input:focus {
          outline: none;
          border-color: #c41e3a;
        }
        button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
          color: white;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(196,30,58,0.4);
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  )
}
