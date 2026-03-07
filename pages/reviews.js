import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Reviews() {
  const testimonials = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <Head>
        <title>Client Reviews - TTW Enterprises</title>
        <meta name="description" content="Real feedback from clients who've worked with TTW Enterprises copywriting services." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Client Reviews</h1>
            <p>Real feedback from people I&apos;ve worked with.</p>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="testimonials-grid">
              {testimonials.map((n) => (
                <div className="testimonial-card" key={n}>
                  <img
                    src={`/testimonials/testimonial-${n}.jpg`}
                    alt={`Client testimonial ${n}`}
                    className="testimonial-image"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Work Together?</h2>
            <p>Book a free call and let&apos;s talk about your copy needs.</p>
            <a href="/#audit" className="cta-button">Book Free Call</a>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-header {
          background: #111111;
          border-bottom: 4px solid #ffd700;
          padding: 4rem 0 3rem;
        }
        .page-header h1 {
          font-size: clamp(2rem, 7vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }
        .page-header p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #aaaaaa;
        }
        .testimonials-section { padding: 4rem 0; }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .testimonial-card {
          border: 1px solid #e5e5e5;
          border-top: 3px solid #c41e3a;
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .testimonial-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .cta-section {
          background: #111111;
          padding: 4rem 0;
          text-align: center;
          border-top: 4px solid #ffd700;
        }
        .cta-section h2 {
          font-size: clamp(1.75rem, 6vw, 2.5rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .cta-section p {
          color: #aaaaaa;
          font-size: clamp(1rem, 3vw, 1.2rem);
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .page-header { padding: 3rem 0 2rem; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .cta-section { padding: 3rem 0; }
        }
      `}</style>
    </>
  )
}
