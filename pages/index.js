import Head from 'next/head'
import Link from 'next/link'
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
      LIMIT 7
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
  const featured = posts[0] || null
  const rest = posts.slice(1)

  return (
    <>
      <Head>
        <title>TTW Enterprises - Copy That Converts</title>
        <meta name="description" content="Copywriting tips, marketing insights, and straight talk about what actually works." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-badge">Copywriting & Marketing</div>
            <h1>Copy That Actually Works.</h1>
            <p>Practical advice on copywriting, marketing, and what actually moves the needle for your business.</p>
            <a href="#audit" className="hero-link">Book a free copy review ↓</a>
          </div>
        </section>

        {/* Blog posts */}
        <section className="posts-section">
          <div className="container">

            {posts.length === 0 ? (
              <div className="empty-state">
                <p>Posts coming soon — check back shortly.</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <div className="featured">
                    <div className="featured-label">Latest Post</div>
                    <Link href={`/blog/${featured.slug}`} className="featured-link">
                      <h2>{featured.title}</h2>
                    </Link>
                    {featured.excerpt && <p className="featured-excerpt">{featured.excerpt}</p>}
                    <div className="featured-meta">
                      <time>{formatDate(featured.created_at)}</time>
                      <Link href={`/blog/${featured.slug}`} className="read-more">Read article →</Link>
                    </div>
                  </div>
                )}

                {/* Rest of posts */}
                {rest.length > 0 && (
                  <>
                    <div className="divider">
                      <span>More Posts</span>
                    </div>
                    <div className="posts-grid">
                      {rest.map((post) => (
                        <article key={post.id} className="post-card">
                          <time className="post-date">{formatDate(post.created_at)}</time>
                          <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                          {post.excerpt && <p>{post.excerpt}</p>}
                          <Link href={`/blog/${post.slug}`} className="read-more">Read →</Link>
                        </article>
                      ))}
                    </div>
                  </>
                )}

                <div className="view-all-wrap">
                  <Link href="/blog" className="view-all-btn">View All Posts →</Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Lead magnet banner */}
        <section className="banner">
          <div className="container">
            <div className="banner-inner">
              <div>
                <h2>Free: Fix Your Email Open Rates</h2>
                <p>10 copy & paste subject line templates. Instant download, no fluff.</p>
              </div>
              <Link href="/email-subject-lines" className="banner-btn">Get Free Guide</Link>
            </div>
          </div>
        </section>

        {/* Book a call */}
        <section className="calendly-section" id="audit">
          <div className="container">
            <h2>Book a Free Call</h2>
            <p>Schedule a free copy review. I&apos;ll look at your stuff and tell you exactly what needs fixing.</p>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/nickconcadora/discovery-call"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        /* Hero */
        .hero {
          background: #111111;
          padding: 5rem 0 4rem;
          border-bottom: 3px solid #c41e3a;
        }
        .hero-badge {
          display: inline-block;
          background: #c41e3a;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 0.3rem 0.75rem;
          border-radius: 3px;
          margin-bottom: 1.5rem;
        }
        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.05;
          margin-bottom: 1.25rem;
          max-width: 700px;
        }
        .hero p {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #999999;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-link {
          color: #ffd700;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,215,0,0.4);
          padding-bottom: 2px;
          transition: border-color 0.2s;
        }
        .hero-link:hover { border-color: #ffd700; color: #ffd700; }

        /* Posts */
        .posts-section { padding: 4rem 0 2rem; }

        .featured {
          border-left: 4px solid #c41e3a;
          padding: 0 0 2.5rem 2rem;
          margin-bottom: 2rem;
        }
        .featured-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #c41e3a;
          margin-bottom: 1rem;
        }
        .featured-link {
          text-decoration: none;
        }
        .featured h2 {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 900;
          color: #111111;
          line-height: 1.2;
          margin-bottom: 1rem;
          transition: color 0.2s;
        }
        .featured-link:hover h2 { color: #c41e3a; }
        .featured-excerpt {
          font-size: 1.05rem;
          color: #555555;
          line-height: 1.7;
          max-width: 700px;
          margin-bottom: 1.25rem;
        }
        .featured-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .featured-meta time {
          font-size: 0.8rem;
          color: #999999;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0 2.5rem;
          color: #999999;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e5e5;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0;
        }
        .post-card {
          padding: 1.75rem 1.5rem 1.75rem 0;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .post-date {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #bbbbbb;
        }
        .post-card h3 {
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.35;
          margin: 0;
        }
        .post-card h3 a {
          color: #111111;
          text-decoration: none;
          transition: color 0.2s;
        }
        .post-card h3 a:hover { color: #c41e3a; }
        .post-card p {
          color: #666666;
          font-size: 0.9rem;
          line-height: 1.6;
          flex: 1;
          margin: 0;
        }
        .read-more {
          font-size: 0.82rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          margin-top: 0.25rem;
        }
        .read-more:hover { color: #111111; }

        .view-all-wrap {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e5e5;
          text-align: center;
        }
        .view-all-btn {
          font-size: 0.9rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          border: 2px solid #c41e3a;
          padding: 0.6rem 1.5rem;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .view-all-btn:hover {
          background: #c41e3a;
          color: #ffffff;
        }

        .empty-state {
          text-align: center;
          padding: 5rem 2rem;
          color: #aaaaaa;
          border: 2px dashed #e5e5e5;
          border-radius: 8px;
          font-size: 1.1rem;
        }

        /* Banner */
        .banner {
          background: #111111;
          padding: 3rem 0;
          border-top: 3px solid #ffd700;
          margin-top: 2rem;
        }
        .banner-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .banner h2 {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .banner p { color: #888888; font-size: 0.95rem; }
        .banner-btn {
          display: inline-block;
          background: #ffd700;
          color: #111111 !important;
          padding: 0.875rem 1.75rem;
          border-radius: 6px;
          font-weight: 800;
          font-size: 0.95rem;
          text-decoration: none !important;
          white-space: nowrap;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .banner-btn:hover { background: #e6c200; }

        /* Calendly */
        .calendly-section {
          padding: 5rem 0;
          text-align: center;
        }
        .calendly-section h2 {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 900;
          color: #111111;
          margin-bottom: 0.75rem;
        }
        .calendly-section > .container > p {
          color: #666666;
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .hero { padding: 3.5rem 0 3rem; }
          .featured { padding-left: 1.25rem; }
          .posts-grid { grid-template-columns: 1fr; }
          .banner-inner { flex-direction: column; text-align: center; }
          .post-card { padding-right: 0; }
        }
      `}</style>
    </>
  )
}
