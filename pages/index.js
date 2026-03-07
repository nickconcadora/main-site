import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getDb } from '../lib/db'

export async function getServerSideProps() {
  try {
    const sql = getDb()
    const posts = await sql`
      SELECT id, title, slug, excerpt, created_at
      FROM posts
      WHERE published = true
      ORDER BY created_at DESC
      LIMIT 6
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

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>TTW Enterprises - Copy That Converts</title>
        <meta name="description" content="Copywriting tips, marketing insights, and straight talk about what actually works. Written by Nick Concadora." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>

        <section className="hero">
          <div className="container">
            <p className="hero-label">Copywriting & Marketing</p>
            <h1>Copy That Actually Works.</h1>
            <p className="hero-sub">
              Practical copywriting advice, marketing insights, and straight talk
              about what moves the needle for your business.
            </p>
            <div className="hero-actions">
              <Link href="/blog" className="cta-button">Read the Blog</Link>
              <a href="#audit" className="cta-secondary">Book a Free Call</a>
            </div>
          </div>
        </section>

        <section className="posts-section">
          <div className="container">
            <div className="section-header">
              <h2>Latest Posts</h2>
              <Link href="/blog" className="view-all">View all →</Link>
            </div>
            {posts.length === 0 ? (
              <div className="empty-state">
                <p>Posts coming soon. Check back shortly.</p>
              </div>
            ) : (
              <div className="posts-grid">
                {posts.map((post) => (
                  <article key={post.id} className="post-card">
                    <time className="post-date">{formatDate(post.created_at)}</time>
                    <h3 className="post-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
                    <Link href={`/blog/${post.slug}`} className="read-more">Read More →</Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="banner-section">
          <div className="container">
            <div className="banner">
              <div className="banner-text">
                <h2>Free Guide: Fix Your Email Open Rates</h2>
                <p>10 copy & paste subject line templates to get more emails opened.</p>
              </div>
              <Link href="/email-subject-lines" className="cta-button">Get Free Guide</Link>
            </div>
          </div>
        </section>

        <section className="calendly-section" id="audit">
          <div className="container">
            <div className="calendly-inner">
              <h2>Book a Free Call</h2>
              <p>Schedule a free copy review. I&apos;ll look at your stuff and tell you exactly what needs fixing.</p>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/nickconcadora/discovery-call"
                style={{ minWidth: '320px', height: '630px' }}
              />
              <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        .hero {
          background: #111111;
          padding: 5rem 0;
          border-bottom: 4px solid #ffd700;
        }
        .hero-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #ffd700;
          margin-bottom: 1rem;
        }
        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .hero-sub {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #aaaaaa;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .cta-secondary {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          border-bottom: 2px solid #c41e3a;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .cta-secondary:hover { color: #ffd700; }

        .posts-section { padding: 4rem 0; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #111111;
        }
        .section-header h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 900;
          color: #111111;
        }
        .view-all {
          font-size: 0.9rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
        }
        .view-all:hover { color: #111111; }
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
          font-size: clamp(1.1rem, 3vw, 1.3rem);
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

        .banner-section {
          background: #f5f5f5;
          padding: 3rem 0;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
        }
        .banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .banner-text h2 {
          font-size: clamp(1.25rem, 4vw, 1.6rem);
          font-weight: 900;
          color: #111111;
          margin-bottom: 0.4rem;
        }
        .banner-text p { color: #555555; font-size: 1rem; }

        .calendly-section { padding: 4rem 0; }
        .calendly-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .calendly-inner h2 {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 900;
          color: #111111;
          margin-bottom: 0.75rem;
        }
        .calendly-inner > p {
          color: #555555;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero { padding: 3rem 0; }
          .banner { flex-direction: column; text-align: center; }
          .posts-grid { grid-template-columns: 1fr; gap: 2rem; }
          .section-header { flex-direction: column; gap: 0.5rem; }
        }
      `}</style>
    </>
  )
}
