import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Reviews() {
  // Only load images that exist: testimonial-1.jpg and testimonial-2.jpg
  const images = [1, 2]

  return (
    <>
      <Head>
        <title>Client Reviews — TTW Enterprises</title>
        <meta name="description" content="Real feedback from clients who've worked with TTW Enterprises copywriting services." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />

      <main>
        <div className="page-hero">
          <div className="container">
            <h1>Client Reviews</h1>
            <p>Real feedback from people I&apos;ve worked with.</p>
          </div>
        </div>

        <section className="reviews-section">
          <div className="container">
            <div className="reviews-grid">
              {images.map(n => (
                <div className="review-card" key={n}>
                  <img
                    src={`/testimonials/testimonial-${n}.jpg`}
                    alt={`Client testimonial ${n}`}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container">
            <div className="cta-band-inner">
              <div>
                <h2>Ready to Work Together?</h2>
                <p>Book a free call and let&apos;s talk about your copy needs.</p>
              </div>
              <a href="/#audit" className="btn-red btn-lg">Book a Free Call</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .reviews-section {
          padding: 4.5rem 0 5rem;
          background: #fff;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .review-card {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e8e8e8;
          border-top: 3px solid #c41e3a;
          transition: box-shadow 0.2s;
        }
        .review-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
        .review-card img { width: 100%; height: auto; display: block; }

        .cta-band {
          background: #0f0f0f;
          padding: 4rem 0;
          border-top: 3px solid #e8b800;
        }
        .cta-band-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .cta-band h2 {
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.3px;
        }
        .cta-band p { color: #888; font-size: 0.97rem; }
        .btn-lg { padding: 0.875rem 2rem; font-size: 0.95rem; }

        @media (max-width: 640px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .cta-band-inner { flex-direction: column; text-align: center; }
        }
      `}</style>
    </>
  )
}
