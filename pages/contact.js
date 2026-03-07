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
        <section className="page-content">
          <h1>Get In Touch</h1>
          <p>Ready to improve your copy? Let&apos;s talk.</p>
          <div className="contact-info">
            <p>
              Email:{' '}
              <a href="mailto:nick@typethatwrite.co">nick@typethatwrite.co</a>
            </p>
            <p>Or book a free call below to discuss your project.</p>
          </div>
          <a href="/#audit" className="cta-button">Book Free Call</a>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        h1 {
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #c41e3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-content > p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #d4d4d4;
          margin-bottom: 1.5rem;
        }
        .contact-info {
          background: rgba(20, 20, 20, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(80, 80, 80, 0.3);
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .contact-info p {
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          margin-bottom: 1rem;
          color: #d4d4d4;
        }
        .contact-info p:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 768px) {
          .page-content { padding: 3rem 1rem; }
        }
      `}</style>
    </>
  )
}
