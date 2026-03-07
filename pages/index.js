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
      FROM posts WHERE published = true
      ORDER BY created_at DESC LIMIT 7
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
    if (window.Calendly) window.Calendly.initInlineWidgets()
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
        {/* ── HERO ── */}
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-left">
                <span className="eyebrow">Copywriting &amp; Marketing</span>
                <h1>
                  Words That<br />
                  <em>Sell.</em>
                </h1>
                <p className="hero-sub">
                  Practical advice on copywriting, marketing, and what
                  actually moves the needle for your business.
                </p>
                <div className="hero-ctas">
                  <a href="#audit" className="btn-red btn-lg">Book a Free Call</a>
                  <Link href="/blog" className="btn-text">Read the blog →</Link>
                </div>
              </div>

              <div className="hero-right">
                <div className="proof-card">
                  <div className="proof-item">
                    <span className="proof-num">10×</span>
                    <span className="proof-label">Better email<br />open rates</span>
                  </div>
                  <div className="proof-divider" />
                  <div className="proof-item">
                    <span className="proof-num">Free</span>
                    <span className="proof-label">Subject line<br />guide available</span>
                  </div>
                  <div className="proof-divider" />
                  <div className="proof-item">
                    <span className="proof-num">0%</span>
                    <span className="proof-label">Fluff.<br />Just results.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── POSTS ── */}
        <section className="posts-wrap">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Latest Writing</h2>
              <Link href="/blog" className="section-link">All posts →</Link>
            </div>

            {posts.length === 0 ? (
              <p className="no-posts">Posts coming soon — check back shortly.</p>
            ) : (
              <div className="posts-grid">
                {/* Featured */}
                {featured && (
                  <article className="featured">
                    <div className="featured-inner">
                      <span className="tag">Latest</span>
                      <h2 className="featured-title">
                        <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                      </h2>
                      {featured.excerpt && (
                        <p className="featured-excerpt">{featured.excerpt}</p>
                      )}
                      <div className="featured-foot">
                        <time className="meta-date">{formatDate(featured.created_at)}</time>
                        <Link href={`/blog/${featured.slug}`} className="read-more">
                          Read article →
                        </Link>
                      </div>
                    </div>
                  </article>
                )}

                {/* Secondary posts */}
                {rest.length > 0 && (
                  <div className="side-list">
                    {rest.map(post => (
                      <article key={post.id} className="side-item">
                        <time className="meta-date">{formatDate(post.created_at)}</time>
                        <h3 className="side-title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        {post.excerpt && (
                          <p className="side-excerpt">{post.excerpt}</p>
                        )}
                        <Link href={`/blog/${post.slug}`} className="read-more">Read →</Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── LEAD MAGNET ── */}
        <section className="magnet">
          <div className="container">
            <div className="magnet-inner">
              <div className="magnet-text">
                <span className="eyebrow eyebrow-gold">Free Resource</span>
                <h2>Stop Losing Opens.<br />Start Getting Clicks.</h2>
                <p>10 copy-and-paste subject line templates — yours free, no fluff, instant access.</p>
              </div>
              <a href="/email-subject-lines" className="btn-gold btn-lg">Get the Free Guide →</a>
            </div>
          </div>
        </section>

        {/* ── BOOK A CALL ── */}
        <section className="cal-wrap" id="audit">
          <div className="container">
            <div className="cal-inner">
              <div className="cal-text">
                <span className="eyebrow">Free Consultation</span>
                <h2>Book a Free Copy Review</h2>
                <p>
                  I'll look at your copy and tell you exactly what's broken
                  and how to fix it. No sales pitch — just straight feedback.
                </p>
                <ul className="cal-perks">
                  <li>30-minute call, zero obligation</li>
                  <li>Specific, actionable feedback</li>
                  <li>Works for websites, emails &amp; ads</li>
                </ul>
              </div>
              <div className="cal-widget-box">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/nickconcadora/discovery-call"
                  style={{ minWidth: '300px', height: '660px' }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* ── Hero ── */
        .hero {
          background: #0f0f0f;
          border-bottom: 3px solid #c41e3a;
          overflow: hidden;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 4rem;
          align-items: center;
          padding: 5.5rem 0 5rem;
        }
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
        .eyebrow-gold { background: #e8b800; color: #0f0f0f; }

        h1 {
          font-size: clamp(3rem, 7vw, 5.25rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1.0;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }
        h1 em {
          font-style: italic;
          color: #c41e3a;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.1rem);
          color: #888;
          line-height: 1.75;
          max-width: 460px;
          margin-bottom: 2.5rem;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .btn-lg { padding: 0.875rem 2rem; font-size: 0.95rem; }
        .btn-text {
          color: #888;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(136,136,136,0.35);
          padding-bottom: 2px;
          transition: color 0.15s, border-color 0.15s;
        }
        .btn-text:hover { color: #fff; border-color: #fff; }

        /* Proof card */
        .proof-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .proof-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 0;
        }
        .proof-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 0;
        }
        .proof-num {
          font-size: 2rem;
          font-weight: 900;
          color: #e8b800;
          line-height: 1;
          min-width: 70px;
          font-style: italic;
        }
        .proof-label {
          font-size: 0.82rem;
          color: #888;
          line-height: 1.45;
          font-weight: 500;
        }

        /* ── Posts ── */
        .posts-wrap {
          padding: 5rem 0 4rem;
          background: #fff;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 1.25rem;
          border-bottom: 2px solid #0f0f0f;
          margin-bottom: 2.5rem;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.3px;
        }
        .section-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          transition: color 0.15s;
        }
        .section-link:hover { color: #8b0000; }
        .no-posts {
          text-align: center;
          padding: 4rem 2rem;
          color: #aaa;
          border: 2px dashed #e8e8e8;
          border-radius: 8px;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Featured post */
        .featured { }
        .featured-inner {
          border-top: 4px solid #c41e3a;
          padding-top: 1.5rem;
          background: #f9f9f9;
          border-radius: 0 0 8px 8px;
          padding: 2rem;
          height: 100%;
        }
        .tag {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #c41e3a;
          margin-bottom: 1rem;
        }
        .featured-title {
          font-size: clamp(1.35rem, 3vw, 1.9rem);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1rem;
          letter-spacing: -0.3px;
        }
        .featured-title a { color: #0f0f0f; text-decoration: none; transition: color 0.15s; }
        .featured-title a:hover { color: #c41e3a; }
        .featured-excerpt {
          font-size: 0.97rem;
          color: #555;
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }
        .featured-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .meta-date {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #bbb;
        }
        .read-more {
          font-size: 0.82rem;
          font-weight: 700;
          color: #c41e3a;
          text-decoration: none;
          transition: color 0.15s;
        }
        .read-more:hover { color: #0f0f0f; }

        /* Side posts */
        .side-list {
          border-top: 2px solid #e8e8e8;
        }
        .side-item {
          padding: 1.25rem 0;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .side-title {
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.35;
        }
        .side-title a { color: #0f0f0f; text-decoration: none; transition: color 0.15s; }
        .side-title a:hover { color: #c41e3a; }
        .side-excerpt {
          font-size: 0.85rem;
          color: #777;
          line-height: 1.6;
        }

        /* ── Lead magnet ── */
        .magnet {
          background: #0f0f0f;
          border-top: 3px solid #e8b800;
          border-bottom: 3px solid #e8b800;
          padding: 3.5rem 0;
        }
        .magnet-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .magnet-text h2 {
          font-size: clamp(1.35rem, 4vw, 2rem);
          font-weight: 900;
          color: #fff;
          margin: 0.5rem 0 0.6rem;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }
        .magnet-text p { color: #888; font-size: 0.95rem; max-width: 480px; }

        /* ── Calendly ── */
        .cal-wrap {
          padding: 5.5rem 0;
          background: #f8f8f8;
          border-top: 1px solid #e8e8e8;
        }
        .cal-inner {
          display: grid;
          grid-template-columns: 1fr 1.7fr;
          gap: 5rem;
          align-items: start;
        }
        .cal-text h2 {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 900;
          color: #0f0f0f;
          margin: 0.75rem 0 1rem;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }
        .cal-text p {
          color: #555;
          font-size: 0.97rem;
          line-height: 1.75;
          margin-bottom: 1.75rem;
        }
        .cal-perks {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .cal-perks li {
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
          padding-left: 1.5rem;
          position: relative;
        }
        .cal-perks li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #c41e3a;
          font-weight: 900;
        }
        .cal-widget-box {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 0 3.5rem; }
          .proof-card { flex-direction: row; gap: 0; }
          .proof-item { flex: 1; flex-direction: column; text-align: center; gap: 0.5rem; padding: 1rem 0.75rem; }
          .proof-divider { width: 1px; height: auto; margin: 0; }
          .proof-num { min-width: auto; }
          .posts-grid { grid-template-columns: 1fr; }
          .cal-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding: 3rem 0; }
          .hero-ctas { flex-direction: column; align-items: flex-start; }
          .proof-card { flex-direction: column; }
          .proof-divider { width: 100%; height: 1px; }
          .magnet-inner { flex-direction: column; }
          .section-head { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
          .featured-inner { padding: 1.5rem; }
        }
      `}</style>
    </>
  )
}
