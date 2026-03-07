import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getDb } from '../../lib/db'

export async function getServerSideProps({ params }) {
  try {
    const sql = getDb()
    const [post] = await sql`
      SELECT id, title, slug, excerpt, content, meta_description, created_at
      FROM posts
      WHERE slug = ${params.slug} AND published = true
      LIMIT 1
    `
    if (!post) return { notFound: true }
    return {
      props: {
        post: {
          ...post,
          created_at: post.created_at.toISOString(),
        },
      },
    }
  } catch {
    return { notFound: true }
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function BlogPost({ post }) {
  const description = post.meta_description || post.excerpt || `Read ${post.title} on the TTW Enterprises blog.`

  return (
    <>
      <Head>
        <title>{post.title} - TTW Enterprises Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <article>
          <div className="post-header">
            <div className="container">
              <Link href="/blog" className="back-link">← Back to Blog</Link>
              <time className="post-date">{formatDate(post.created_at)}</time>
              <h1>{post.title}</h1>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </div>
          </div>
          <div className="post-body container">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="post-footer">
              <hr />
              <div className="cta-box">
                <h3>Want copy that actually converts?</h3>
                <p>Book a free call and let&apos;s talk about your project.</p>
                <a href="/#audit" className="cta-button">Book Free Call</a>
              </div>
              <Link href="/blog" className="back-link">← Back to Blog</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <style jsx>{`
        .post-header {
          background: linear-gradient(135deg, rgba(196,30,58,0.15) 0%, rgba(10,10,10,0.95) 100%);
          border-bottom: 1px solid rgba(196,30,58,0.3);
          padding: 3rem 0 2rem;
        }
        .back-link {
          display: inline-block;
          color: #c41e3a;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
          transition: color 0.2s ease;
        }
        .back-link:hover {
          color: #ffd700;
        }
        .post-date {
          display: block;
          font-size: 0.85rem;
          color: #c41e3a;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: clamp(1.75rem, 6vw, 3rem);
          font-weight: 900;
          line-height: 1.2;
          color: #ffd700;
          margin-bottom: 1rem;
        }
        .post-excerpt {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #d4d4d4;
          line-height: 1.6;
          max-width: 800px;
        }
        .post-body {
          max-width: 800px;
          padding-top: 2.5rem;
          padding-bottom: 4rem;
        }
        .post-footer {
          margin-top: 3rem;
        }
        .post-footer hr {
          border: none;
          border-top: 1px solid rgba(80,80,80,0.3);
          margin-bottom: 2rem;
        }
        .cta-box {
          background: linear-gradient(135deg, rgba(196,30,58,0.15) 0%, rgba(20,20,20,0.8) 100%);
          border: 1px solid rgba(196,30,58,0.3);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          margin-bottom: 2rem;
        }
        .cta-box h3 {
          color: #ffd700;
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          margin-bottom: 0.75rem;
        }
        .cta-box p {
          color: #d4d4d4;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 768px) {
          .post-header { padding: 2rem 0 1.5rem; }
          .post-body { padding-top: 1.5rem; padding-bottom: 2rem; }
        }
      `}</style>
    </>
  )
}
