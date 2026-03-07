import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession } from '../../lib/session'
import { getDb } from '../../lib/db'

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  if (!session.isAdmin) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  try {
    const sql = getDb()
    const posts = await sql`
      SELECT id, title, slug, published, created_at
      FROM posts
      ORDER BY created_at DESC
    `
    return {
      props: {
        posts: posts.map(p => ({
          ...p,
          created_at: p.created_at.toISOString(),
        })),
      },
    }
  } catch {
    return { props: { posts: [] } }
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default function AdminDashboard({ posts }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) router.replace(router.asPath)
  }

  async function handleTogglePublish(id, currentStatus) {
    await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !currentStatus }),
    })
    router.replace(router.asPath)
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - TTW Enterprises</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-layout">
        <header className="admin-header">
          <div className="header-left">
            <h1><span>TTW</span> Admin</h1>
            <Link href="/" className="view-site" target="_blank">View Site ↗</Link>
          </div>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </header>

        <main className="admin-main">
          <div className="dash-top">
            <div>
              <h2>Blog Posts</h2>
              <p className="sub">{posts.length} total post{posts.length !== 1 ? 's' : ''}</p>
            </div>
            <a href="/admin/new" className="new-post-btn">+ New Post</a>
          </div>

          {posts.length === 0 ? (
            <div className="empty">
              <p>No posts yet.</p>
              <a href="/admin/new" className="new-post-btn">Write your first post →</a>
            </div>
          ) : (
            <div className="posts-table">
              {posts.map((post) => (
                <div key={post.id} className="post-row">
                  <div className="post-info">
                    <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <h3>{post.title}</h3>
                    <span className="post-meta">
                      {formatDate(post.created_at)} · /blog/{post.slug}
                    </span>
                  </div>
                  <div className="post-actions">
                    <a href={`/blog/${post.slug}`} target="_blank" className="action-btn view">View</a>
                    <a href={`/admin/edit/${post.id}`} className="action-btn edit">Edit</a>
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className={`action-btn ${post.published ? 'unpublish' : 'publish'}`}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="action-btn delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background: #0D0D0D;
        }
        .admin-header {
          background: rgba(10,10,10,0.98);
          border-bottom: 2px solid #c41e3a;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: 900;
          color: #ffd700 !important;
        }
        h1 span { color: #c41e3a; }
        .view-site {
          color: #888;
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .view-site:hover { color: #ffd700 !important; }
        .logout-btn {
          background: none;
          border: 1px solid rgba(80,80,80,0.5);
          color: #888;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-block;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          border-color: #c41e3a;
          color: #f5f5f5;
        }
        .admin-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .dash-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }
        h2 {
          font-size: 1.5rem;
          color: #f5f5f5;
          font-weight: 700;
        }
        .sub {
          color: #888;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }
        .new-post-btn {
          display: inline-block;
          color: #ffffff !important;
          background: #c41e3a;
          color: #ffffff !important;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .new-post-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(196,30,58,0.4);
          color: #ffffff !important;
        }
        .posts-table {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .post-row {
          background: rgba(20,20,20,0.8);
          border: 1px solid rgba(80,80,80,0.3);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          transition: border-color 0.2s ease;
        }
        .post-row:hover {
          border-color: rgba(196,30,58,0.4);
        }
        .post-info {
          flex: 1;
          min-width: 0;
        }
        .post-info h3 {
          font-size: 1rem;
          color: #f5f5f5;
          font-weight: 600;
          margin: 0.35rem 0 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .post-meta {
          font-size: 0.8rem;
          color: #666;
        }
        .status-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }
        .status-badge.published {
          background: rgba(48, 209, 88, 0.15);
          color: #30D158 !important;
        }
        .status-badge.draft {
          background: rgba(255, 214, 10, 0.15);
          color: #FFD60A;
        }
        .post-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .action-btn {
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-block;
          border: none;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .action-btn.view { display: inline-block;
          background: #3a3a3a;
          color: #d4d4d4 !important;
        }
        .action-btn.view:hover { background: #4a4a4a; color: #f5f5f5; }
        .action-btn.edit {
          background: #2d2800;
          color: #ffd700 !important;
        }
        .action-btn.edit:hover { background: #3d3800; }
        .action-btn.publish {
          background: #0d2b14;
          color: #30D158 !important;
        }
        .action-btn.publish:hover { background: #1a4726; }
        .action-btn.unpublish {
          background: #2a2a2a;
          color: #888;
        }
        .action-btn.unpublish:hover { background: #3d1212; color: #FF3B30; }
        .action-btn.delete {
          background: #2d0d0d;
          color: #FF3B30;
        }
        .action-btn.delete:hover { background: #4d1a1a; }
        .empty {
          text-align: center;
          padding: 4rem;
          color: #888;
        }
        .empty p { margin-bottom: 1.5rem; }
        @media (max-width: 640px) {
          .post-row { flex-direction: column; align-items: flex-start; }
          .post-actions { flex-wrap: wrap; }
        }
      `}</style>
    </>
  )
}
