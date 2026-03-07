import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getDb } from '../../lib/db'

export async function getServerSideProps() {
  try {
    const sql = getDb()
    const posts = await sql`
      SELECT id, title, slug, excerpt, created_at
      FROM posts
      WHERE published = true
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
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - TTW Enterprises</title>
        <meta name="description" content="Copywriting tips, marketing insights, and practical advice to help your business grow." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>The Blog</h1>
            <p>Copywriting tips, marketing insights, and straight talk about what actually works.</p>
          </div>
        </section>

        <section className="posts-section">
          <div className="container">
            {posts.length === 0 ? (
              <div className="empty-state">
                <p>No posts yet. Check back soon.</p>
              </div>
            ) : (
              <div className="posts-grid">
                {posts.map((post) => (
                  <article key={post.id} className="post-card">
                    <time className="post-date">{formatDate(post.created_at)}</time>
                    <h2 className="post-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
                    <Link href={`/blog/${post.slug}`} className="read-more">Read More →</Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-header {
          background: #111111;
          border-bottom: 4px solid #ffd700;
          padding: 4rem 0 3rem;
        }
        .page-header h1 {
          font-size: clamp(2rem, 7vw, 3.5rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
        .page-header p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #aaaaaa;
          max-width: 600px;
        }
        .posts-section { padding: 4rem 0; }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .post-card {
          border-top: 3px solid #c41e3a;
          padding-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .post-date {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999999;
        }
        .post-title {
          font-size: clamp(1.1rem, 3vw, 1.35rem);
          font-weight: 800;
          line-height: 1.3;
          margin: 0;
        }
        .post-title a {
          color: #111111;
          text-decoration: none;
          transition: color 0.2s;
        }
        .post-title a:hover { color: #c41e3a; }
        .post-excerpt {
          color: #555555;
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
          margin: 0;
        }
        .read-more {
          font-size: 0.85rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
        }
        .read-more:hover { color: #111111; }
        .empty-state {
          text-align: center;
          padding: 4rem;
          color: #888888;
          border: 2px dashed #e5e5e5;
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .page-header { padding: 3rem 0 2rem; }
          .posts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
