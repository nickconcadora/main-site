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
        <meta name="description" content="Copywriting tips, marketing insights, and practical advice to help your business grow. Written by TTW Enterprises." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <h1>The Blog</h1>
          <p>Copywriting tips, marketing insights, and straight talk about what actually works.</p>
        </section>

        <section className="posts-grid container">
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No posts yet. Check back soon.</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-card-inner">
                  <time className="post-date">{formatDate(post.created_at)}</time>
                  <h2 className="post-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {post.excerpt && (
                    <p className="post-excerpt">{post.excerpt}</p>
                  )}
                  <Link href={`/blog/${post.slug}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 2rem;
          text-align: center;
        }
        h1 {
          font-size: clamp(2rem, 7vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #c41e3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-header p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #d4d4d4;
          max-width: 700px;
          margin: 0 auto;
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          padding-top: 1rem;
          padding-bottom: 4rem;
        }
        .post-card {
          background: linear-gradient(135deg, rgba(196,30,58,0.08) 0%, rgba(20,20,20,0.9) 100%);
          border: 1px solid rgba(80,80,80,0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .post-card:hover {
          border-color: rgba(196,30,58,0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(196,30,58,0.15);
        }
        .post-card-inner {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          height: 100%;
        }
        .post-date {
          font-size: 0.85rem;
          color: #c41e3a;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .post-title {
          font-size: clamp(1.1rem, 3vw, 1.4rem);
          font-weight: 700;
          line-height: 1.3;
        }
        .post-title a {
          color: #ffd700;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .post-title a:hover {
          color: #f5f5f5;
        }
        .post-excerpt {
          color: #98989D;
          font-size: 0.95rem;
          line-height: 1.6;
          flex: 1;
        }
        .read-more {
          color: #c41e3a;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          align-self: flex-start;
          transition: color 0.2s ease;
        }
        .read-more:hover {
          color: #ffd700;
        }
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem;
          color: #888;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .page-header { padding: 2rem 1rem 1.5rem; }
          .posts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
