import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export async function getServerSideProps() {
  try {
    const { getDb } = await import('../lib/db')
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

export default function Home({ posts }) {
  const featured = posts[0] || null
  const rest = posts.slice(1)

  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidgets()
    }
  }, [])

  return (
    <>
      <Head>
        <title>TTW Enterprises — Copy That Converts</title>
        <meta name="description" content="Copywriting tips, marketing insights, and straight talk about what actually works." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-content">
              <p className="eyebrow">Copywriting &amp; Marketing</p>
              <h1>Copy That<br /><em>Actually</em> Works.</h1>
              <p className="hero-sub">
                Practical advice on copywriting, marketing, and what moves the needle for your business.
              </p>
              <div className="hero-actions">
                <a href="#audit" className="btn-primary">Book a Free Call →</a>
                <Link href="/blog" className="btn-ghost">Read the Blog</Link>
              </div>
            </div>
            <div className="hero-stat-col">
              <div className="stat-card">
                <span className="stat-num">10x</span>
                <span className="stat-label">Better open rates</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">Free</span>
                <span className="stat-label">Email subject line guide</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">0</span>
                <span className="stat-label">Fluff. Just what works.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Posts ── */}
        <section className="posts-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Latest Writing</h2>
              <Link href="/blog" className="see-all">See all posts →</Link>
            </div>

            {posts.length === 0 ? (
              <p className="empty">Posts coming soon — check back shortly.</p>
            ) : (
              <div className="posts-layout">
                {featured && (
                  <article className="featured-card">
                    <p className="featured-eyebrow">Featured Post</p>
                    <h2 className="featured-title">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h2>
                    {featured.excerpt && (
                      <p className="featured-excerpt">{featured.excerpt}</p>
                    )}
                    <div className="featured-foot">
                      <time className="post-date">{formatDate(featured.created_at)}</time>
                      <Link href={`/blog/${featured.slug}`} className="read-link">
                        Read article →
                      </Link>
                    </div>
                  </article>
                )}

                {rest.length > 0 && (
                  <div className="side-posts">
                    {rest.map((post) => (
                      <article key={post.id} className="side-card">
                        <time className="post-date">{formatDate(post.created_at)}</time>
                        <h3 className="side-title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        {post.excerpt && <p className="side-excerpt">{post.excerpt}</p>}
                        <Link href={`/blog/${post.slug}`} className="read-link">Read →</Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Lead magnet banner ── */}
        <section className="banner">
          <div className="container banner-inner">
            <div className="banner-text">
              <p className="banner-eyebrow">Free Resource</p>
              <h2>Fix Your Email Open Rates</h2>
              <p>10 copy &amp; paste subject line templates. Instant access, no fluff.</p>
            </div>
            <a href="/email-subject-lines" className="btn-gold">Get the Free Guide →</a>
          </div>
        </section>

        {/* ── Book a call ── */}
        <section className="cal-section" id="audit">
          <div className="container cal-inner">
            <div className="cal-text">
              <p className="eyebrow">Free Consultation</p>
              <h2>Book a Free Copy Review</h2>
              <p>
                I&apos;ll look at your copy and tell you exactly what needs fixing — no sales pitch, just straight talk.
              </p>
              <ul className="cal-bullets">
                <li>✓ 30-minute call, no obligation</li>
                <li>✓ Specific, actionable feedback</li>
                <li>✓ Works for websites, emails &amp; ads</li>
              </ul>
            </div>
            <div className="cal-widget-wrap">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/nickconcadora/discovery-call"
                style={{ minWidth: '320px', height: '660px' }}
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        /* ── Hero ── */
        .hero {
          background: #111111;
          position: relative;
          overflow: hidden;
          border-bottom: 3px solid #c41e3a;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.018) 60px,
              rgba(255,255,255,0.018) 61px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.018) 60px,
              rgba(255,255,255,0.018) 61px
            );
        }
        .hero-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4rem;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .hero-content { flex: 1; max-width: 620px; }

        .eyebrow {
          display: inline-block;
          background: #c41e3a;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          padding: 0.3rem 0.75rem;
          border-radius: 3px;
          margin-bottom: 1.5rem;
        }

        h1 {
          font-size: clamp(2.8rem, 7vw, 5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          margin-bottom: 1.5rem;
        }
        h1 em {
          font-style: normal;
          color: #c41e3a;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: #999999;
          line-height: 1.75;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .btn-primary {
          display: inline-block;
          background: #c41e3a;
          color: #ffffff;
          padding: 0.875rem 1.75rem;
          border-radius: 5px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: #8b0000; }
        .btn-ghost {
          display: inline-block;
          color: #999999;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(153,153,153,0.4);
          padding-bottom: 2px;
          transition: color 0.15s, border-color 0.15s;
        }
        .btn-ghost:hover { color: #fff; border-color: #fff; }

        .hero-stat-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-shrink: 0;
        }
        .stat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          min-width: 180px;
        }
        .stat-num {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          color: #ffd700;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .stat-label {
          display: block;
          font-size: 0.78rem;
          color: #888888;
          font-weight: 500;
          line-height: 1.4;
        }

        /* ── Posts ── */
        .posts-section {
          padding: 4.5rem 0 3rem;
          background: #ffffff;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #111111;
        }
        .section-title {
          font-size: 1.6rem;
          font-weight: 900;
          color: #111111;
          letter-spacing: -0.5px;
        }
        .see-all {
          font-size: 0.85rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          transition: color 0.15s;
        }
        .see-all:hover { color: #8b0000; }

        .empty {
          text-align: center;
          padding: 5rem 2rem;
          color: #aaaaaa;
          border: 2px dashed #e5e5e5;
          border-radius: 8px;
          font-size: 1rem;
        }

        .posts-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 3.5rem;
          align-items: start;
        }

        /* Featured card */
        .featured-card {
          padding: 2rem;
          background: #f9f9f9;
          border-radius: 8px;
          border-top: 4px solid #c41e3a;
        }
        .featured-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #c41e3a;
          margin-bottom: 0.875rem;
        }
        .featured-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .featured-title a {
          color: #111111;
          text-decoration: none;
          transition: color 0.15s;
        }
        .featured-title a:hover { color: #c41e3a; }
        .featured-excerpt {
          font-size: 0.98rem;
          color: #555555;
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }
        .featured-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .post-date {
          font-size: 0.72rem;
          color: #bbbbbb;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .read-link {
          font-size: 0.82rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          transition: color 0.15s;
        }
        .read-link:hover { color: #111111; }

        /* Side post list */
        .side-posts {
          display: flex;
          flex-direction: column;
          border-top: 2px solid #eeeeee;
        }
        .side-card {
          padding: 1.25rem 0;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .side-title {
          font-size: 0.98rem;
          font-weight: 800;
          line-height: 1.35;
        }
        .side-title a {
          color: #111111;
          text-decoration: none;
          transition: color 0.15s;
        }
        .side-title a:hover { color: #c41e3a; }
        .side-excerpt {
          font-size: 0.83rem;
          color: #777777;
          line-height: 1.6;
        }

        /* ── Banner ── */
        .banner {
          background: #111111;
          padding: 3.5rem 0;
          border-top: 3px solid #ffd700;
          border-bottom: 3px solid #ffd700;
        }
        .banner-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .banner-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #ffd700;
          margin-bottom: 0.5rem;
        }
        .banner-text h2 {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .banner-text p { color: #888888; font-size: 0.9rem; }
        .btn-gold {
          display: inline-block;
          background: #ffd700;
          color: #111111;
          padding: 0.875rem 1.75rem;
          border-radius: 5px;
          font-weight: 800;
          font-size: 0.92rem;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .btn-gold:hover { background: #e6c200; }

        /* ── Calendly ── */
        .cal-section {
          padding: 5rem 0;
          background: #f9f9f9;
          border-top: 1px solid #eeeeee;
        }
        .cal-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 4rem;
          align-items: start;
        }
        .cal-text .eyebrow { background: #111111; }
        .cal-text h2 {
          font-size: clamp(1.6rem, 4vw, 2.25rem);
          font-weight: 900;
          color: #111111;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .cal-text p {
          color: #666666;
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .cal-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .cal-bullets li {
          font-size: 0.92rem;
          color: #444444;
          font-weight: 600;
        }
        .cal-widget-wrap {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e5e5;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-stat-col { display: none; }
          .posts-layout { grid-template-columns: 1fr; gap: 2rem; }
          .cal-inner { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding-top: 3.5rem; padding-bottom: 3.5rem; }
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .banner-inner { flex-direction: column; text-align: center; }
          .section-header { flex-direction: column; gap: 0.5rem; }
        }
      `}</style>
    </>
  )
}
