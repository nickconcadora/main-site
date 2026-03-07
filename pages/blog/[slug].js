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
  const description = post.meta_description || post.excerpt || `Read ${post.title} on the TTW Enterprises blog.`

  return (
    <>
      <Head>
        <title>{post.title} - TTW Enterprises Blog</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <div className="post-header">
          <div className="container">
            <Link href="/blog" className="back-link">← Back to Blog</Link>
            <time className="post-date">{formatDate(post.created_at)}</time>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          </div>
        </div>

        <div className="post-body container">
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
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
      </main>
      <Footer />

      <style jsx>{`
        .post-header {
          background: #111111;
          border-bottom: 4px solid #ffd700;
          padding: 3rem 0 2.5rem;
        }
        .back-link {
          display: inline-block;
          color: #ffd700;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: #ffffff; }
        .post-date {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #aaaaaa;
          margin-bottom: 1rem;
        }
        .post-header h1 {
          font-size: clamp(1.75rem, 6vw, 3rem);
          font-weight: 900;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .post-excerpt {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #aaaaaa;
          line-height: 1.6;
          max-width: 700px;
        }
        .post-body {
          max-width: 780px;
          padding-top: 3rem;
          padding-bottom: 5rem;
        }
        .post-footer { margin-top: 3rem; }
        .post-footer hr {
          border: none;
          border-top: 1px solid #e5e5e5;
          margin-bottom: 2.5rem;
        }
        .cta-box {
          background: #f5f5f5;
          border-top: 3px solid #c41e3a;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          margin-bottom: 2rem;
        }
        .cta-box h3 {
          color: #111111;
          font-size: clamp(1.25rem, 4vw, 1.5rem);
          font-weight: 900;
          margin-bottom: 0.75rem;
        }
        .cta-box p {
          color: #555555;
          margin-bottom: 1.5rem;
        }
        .post-footer .back-link {
          color: #c41e3a;
        }
        .post-footer .back-link:hover { color: #111111; }
        @media (max-width: 768px) {
          .post-header { padding: 2rem 0 1.5rem; }
          .post-body { padding-top: 2rem; padding-bottom: 3rem; }
        }
      `}</style>
    </>
  )
}
