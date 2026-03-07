import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — TTW Enterprises</title>
        <meta name="description" content="Get in touch with TTW Enterprises. Book a free call or send an email to discuss your copywriting project." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />

      <main>
        <div className="page-hero">
          <div className="container">
            <h1>Get In Touch</h1>
            <p>Ready to improve your copy? Let&apos;s talk.</p>
          </div>
        </div>

        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">

              {/* Email card */}
              <div className="contact-card">
                <div className="card-icon">✉</div>
                <h3>Send an Email</h3>
                <p>Have a specific question? Drop me a line and I&apos;ll get back to you within 24 hours.</p>
                <a href="mailto:nick@typethatwrite.co" className="btn-red">
                  nick@typethatwrite.co
                </a>
              </div>

              {/* Call card */}
              <div className="contact-card contact-card-accent">
                <div className="card-icon">📅</div>
                <h3>Book a Free Call</h3>
                <p>The fastest way to get help. I&apos;ll review your copy and tell you exactly what needs fixing — no sales pitch.</p>
                <a href="/#audit" className="btn-red">
                  Schedule a Call →
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .contact-section {
          padding: 5rem 0 6rem;
          background: #fff;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 820px;
          margin: 0 auto;
        }
        .contact-card {
          border: 1px solid #e8e8e8;
          border-top: 4px solid #e8e8e8;
          border-radius: 0 0 8px 8px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }
        .contact-card-accent {
          border-top-color: #c41e3a;
          background: #fdf8f8;
        }
        .card-icon {
          font-size: 2rem;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .contact-card h3 {
          font-size: 1.2rem;
          font-weight: 900;
          color: #0f0f0f;
        }
        .contact-card p {
          color: #555;
          font-size: 0.93rem;
          line-height: 1.7;
          flex: 1;
        }

        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-section { padding: 3.5rem 0 4rem; }
        }
      `}</style>
    </>
  )
}
