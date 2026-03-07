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
          <h1>Client Reviews</h1>
          <p>Real feedback from people I&apos;ve worked with.</p>
        </section>

        <section className="testimonials">
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
        </section>

        <section className="cta-section">
          <h2>Ready to Work Together?</h2>
          <p>Book a free call and let&apos;s talk about your copy needs.</p>
          <a href="/#audit" className="cta-button cta-outlined">Book Free Call</a>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem 2rem;
          text-align: center;
        }
        h1 {
          font-size: clamp(2rem, 7vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #c41e3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-header p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #d4d4d4;
          max-width: 700px;
          margin: 0 auto;
        }
        .testimonials {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1.5rem 3rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .testimonial-card {
          background: rgba(20, 20, 20, 0.8);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(80, 80, 80, 0.3);
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          border-color: rgba(196, 30, 58, 0.5);
          transform: translateY(-5px);
        }
        .testimonial-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          display: block;
        }
        .cta-section {
          background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .cta-section h2 {
          color: #ffd700;
          font-size: clamp(1.75rem, 6vw, 2.5rem);
          margin-bottom: 1rem;
        }
        .cta-section p {
          color: #f5f5f5;
          font-size: clamp(1rem, 3vw, 1.2rem);
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-outlined {
          background: #0a0a0a !important;
          border: 2px solid #ffd700 !important;
        }
        .cta-outlined:hover {
          background: #1a1a1a !important;
        }
        @media (max-width: 768px) {
          .page-header { padding: 2rem 1rem 1.5rem; }
          .testimonials { grid-template-columns: 1fr; padding: 0 1rem 2rem; }
          .cta-section { padding: 2rem 1rem; }
        }
      `}</style>
    </>
  )
}
