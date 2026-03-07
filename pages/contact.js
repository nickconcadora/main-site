import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - TTW Enterprises</title>
        <meta name="description" content="Get in touch with TTW Enterprises. Book a free call or send an email to discuss your copywriting project." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Get In Touch</h1>
            <p>Ready to improve your copy? Let&apos;s talk.</p>
          </div>
        </section>

        <section className="contact-section">
          <div className="container">
            <div className="contact-card">
              <p>Email: <a href="mailto:nick@typethatwrite.co">nick@typethatwrite.co</a></p>
              <p>Or book a free call below to discuss your project.</p>
              <a href="/#audit" className="cta-button">Book Free Call</a>
            </div>
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
        .contact-section {
          padding: 4rem 0;
        }
        .contact-card {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          background: #f5f5f5;
          border-top: 3px solid #c41e3a;
          border-radius: 8px;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .contact-card p {
          font-size: 1.1rem;
          color: #444444;
        }
        .contact-card a:not(.cta-button) {
          color: #c41e3a;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .page-header { padding: 3rem 0 2rem; }
          .contact-card { padding: 2rem 1.5rem; }
        }
      `}</style>
    </>
  )
}
