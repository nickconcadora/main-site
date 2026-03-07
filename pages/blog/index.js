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
      FROM posts WHERE published = true
      ORDER BY created_at DESC
    `
    return {
      props: {
        posts: posts.map(p => ({
          ...p,
          created_at: p.created_at ? p.created_at.toISOString() : new Date().toISOString(),
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
        <title>Blog — TTW Enterprises</title>
        <meta name="description" content="Copywriting tips, marketing insights, and practical advice to help your business grow." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <div className="page-hero">
          <div className="container">
            <h1>The Blog</h1>
            <p>Copywriting tips, marketing insights, and straight talk about what actually works.</p>
          </div>
        </div>

        <section className="posts-section">
          <div className="container">
            {posts.length === 0 ? (
              <div className="empty">
                <p>No posts yet — check back soon.</p>
              </div>
            ) : (
              <div className="posts-grid">
                {posts.map(post => (
                  <article key={post.id} className="card">
                    <time className="card-date">{formatDate(post.created_at)}</time>
                    <h2 className="card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
                    <Link href={`/blog/${post.slug}`} className="card-link">Read More →</Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .posts-section { padding: 4.5rem 0 5rem; }
        .empty {
          text-align: center;
          padding: 5rem 2rem;
          color: #aaa;
          border: 2px dashed #e8e8e8;
          border-radius: 8px;
          font-size: 1rem;
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem 2.5rem;
        }
        .card {
          border-top: 3px solid #c41e3a;
          padding-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .card-date {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #bbb;
        }
        .card-title {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          font-weight: 800;
          line-height: 1.3;
        }
        .card-title a { color: #0f0f0f; text-decoration: none; transition: color 0.15s; }
        .card-title a:hover { color: #c41e3a; }
        .card-excerpt {
          color: #555;
          font-size: 0.9rem;
          line-height: 1.65;
          flex: 1;
        }
        .card-link {
          font-size: 0.82rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          transition: color 0.15s;
          margin-top: 0.25rem;
        }
        .card-link:hover { color: #0f0f0f; }
        @media (max-width: 900px) {
          .posts-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .posts-grid { grid-template-columns: 1fr; gap: 0; }
          .card { padding-top: 1.25rem; padding-bottom: 1.25rem; border-top: none; border-bottom: 1px solid #e8e8e8; }
          .card:first-child { border-top: 3px solid #c41e3a; }
        }
      `}</style>
    </>
  )
}
