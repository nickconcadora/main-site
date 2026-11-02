import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { site } from '../lib/site'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Nick Concadora | Email Marketing &amp; AI Automation</title>
        <meta name="description" content="Talk with Nick Concadora about email marketing, AI automation, Shopify, or your next sales page. Book a discovery call or send an email." />
        <link rel="canonical" href="https://nickycopy.com/contact" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />

      <main id="main-content">
        <div className="page-hero">
          <div className="container">
            <h1>Let’s put it to work.</h1>
            <p>Email revenue, AI automation, or a project that needs both. Tell me where you need a hand.</p>
          </div>
        </div>

        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">

              {/* Email card */}
              <div className="contact-card">
                <div className="card-icon" aria-hidden="true">✉</div>
                <h2>Send an email</h2>
                <p>Tell me about your business, what you want to improve, and what you have in place already.</p>
                <a href={'mailto:' + site.email} className="btn-red">
                  {site.email}
                </a>
              </div>

              {/* Call card */}
              <div className="contact-card contact-card-accent">
                <div className="card-icon" aria-hidden="true">↗</div>
                <h2>Book a discovery call</h2>
                <p>Let’s talk through the problem, see if we’re a fit, and find a useful place to start. The discovery call is free.</p>
                <a href={site.bookingUrl} className="btn-red">
                  Find a time to talk ↗
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
        .contact-card h2 {
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
