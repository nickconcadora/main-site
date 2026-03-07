import Head from 'next/head'
import { useEffect } from 'react'
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
        post: { ...post, created_at: post.created_at.toISOString() },
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
  useEffect(() => {
    fetch('/api/posts/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: post.slug }),
    })
  }, [post.slug])
  const desc = post.meta_description || post.excerpt || `Read ${post.title} on the TTW Enterprises blog.`

  return (
    <>
      <Head>
        <title>{post.title} — TTW Enterprises</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:type" content="article" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />

      <main>
        {/* Post header */}
        <div className="post-hero">
          <div className="container">
            <Link href="/blog" className="back-link">← Back to Blog</Link>
            <time className="post-meta">{formatDate(post.created_at)}</time>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="post-lede">{post.excerpt}</p>}
          </div>
        </div>

        {/* Post body */}
        <div className="post-body">
          <div className="container">
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="post-footer">
              <div className="cta-box">
                <h3>Want copy that actually converts?</h3>
                <p>Book a free call and let&apos;s talk about your project.</p>
                <a href="/#audit" className="btn-red">Book a Free Call</a>
              </div>
              <Link href="/blog" className="back-link-bottom">← Back to Blog</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .post-hero {
          background: #0f0f0f;
          border-bottom: 3px solid #e8b800;
          padding: 3rem 0 2.75rem;
        }
        .back-link {
          display: inline-block;
          color: #e8b800;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
          transition: color 0.15s;
        }
        .back-link:hover { color: #fff; }
        .post-meta {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #888;
          margin-bottom: 0.875rem;
        }
        .post-hero h1 {
          font-size: clamp(1.75rem, 5.5vw, 3rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
          max-width: 780px;
        }
        .post-lede {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          color: #888;
          line-height: 1.7;
          max-width: 680px;
        }

        .post-body {
          padding: 3.5rem 0 5rem;
          background: #fff;
        }
        .post-body :global(.container) {
          max-width: 760px;
        }

        .post-footer { margin-top: 3.5rem; }
        .cta-box {
          background: #f8f8f8;
          border-top: 4px solid #c41e3a;
          border-radius: 0 0 8px 8px;
          padding: 2.5rem 2rem;
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .cta-box h3 {
          font-size: clamp(1.2rem, 3.5vw, 1.6rem);
          font-weight: 900;
          color: #0f0f0f;
          margin-bottom: 0.75rem;
        }
        .cta-box p {
          color: #555;
          margin-bottom: 1.5rem;
          font-size: 0.97rem;
        }
        .back-link-bottom {
          display: inline-block;
          color: #c41e3a;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          transition: color 0.15s;
        }
        .back-link-bottom:hover { color: #0f0f0f; }

        @media (max-width: 640px) {
          .post-hero { padding: 2rem 0 2rem; }
          .post-body { padding: 2.5rem 0 3.5rem; }
          .cta-box { padding: 1.75rem 1.25rem; }
        }
      `}</style>
    </>
  )
}
