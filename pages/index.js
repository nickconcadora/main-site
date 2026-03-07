import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>TTW Enterprises - Copy That Converts</title>
        <meta name="description" content="I write copy that actually works. Clear, focused copywriting that moves the needle for your business." />
        <meta property="og:title" content="TTW Enterprises - Copy That Converts" />
        <meta property="og:description" content="I write copy that actually works. Clear, focused copywriting that moves the needle for your business." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header />
      <main>
        <section className="hero">
          <p className="subtitle">Copywriting Services</p>
          <h1>I Write Copy That Actually Works</h1>
          <p className="hero-description">
            Your website copy probably needs work. Most do. I&apos;ll look at what you&apos;ve got,
            tell you what&apos;s not working, and help you fix it. Simple as that.
          </p>
          <a href="#audit" className="cta-button">Get a Free Copy Review</a>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Clear Writing</h3>
            <p>I write copy that people actually read. No corporate nonsense, no filler. Just clear messaging that gets your point across.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Business Focus</h3>
            <p>I get that you need copy that sells. I focus on writing stuff that actually moves the needle for your business.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Quick Work</h3>
            <p>I know you&apos;re busy. I deliver good work fast, so you can get back to running your business.</p>
          </div>
        </section>

        <section className="stats">
          <div className="stats-container">
            <div className="stat-item">
              <h4>5+</h4>
              <p>Years Writing</p>
            </div>
            <div className="stat-item">
              <h4>Fast</h4>
              <p>Turnaround</p>
            </div>
            <div className="stat-item">
              <h4>Real</h4>
              <p>Results</p>
            </div>
          </div>
        </section>

        <section className="calendly-section" id="audit">
          <div className="calendly-container">
            <h2>Book a Call</h2>
            <p>Schedule a free copy review. I&apos;ll go through your stuff and tell you what needs fixing.</p>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/nickconcadora/discovery-call"
              style={{ minWidth: '320px', height: '630px' }}
            />
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            />
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .hero h1 {
          font-size: clamp(2rem, 8vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #c41e3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .subtitle {
          font-size: clamp(1rem, 4vw, 1.5rem);
          color: #c41e3a;
          margin-bottom: 1.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .hero-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #d4d4d4;
          max-width: 800px;
          margin: 0 auto 2rem;
          line-height: 1.8;
        }
        .features {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          background: linear-gradient(135deg, rgba(196, 30, 58, 0.1) 0%, rgba(20, 20, 20, 0.8) 100%);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(80, 80, 80, 0.3);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          border-color: rgba(196, 30, 58, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(196, 30, 58, 0.2);
        }
        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          color: #ffd700;
          font-size: clamp(1.25rem, 4vw, 1.5rem);
          margin-bottom: 1rem;
        }
        .feature-card p {
          color: #d4d4d4;
          line-height: 1.8;
        }
        .stats {
          background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
          padding: 2rem 1.5rem;
          margin: 2rem 0;
        }
        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          text-align: center;
        }
        .stat-item h4 {
          font-size: clamp(2rem, 8vw, 3rem);
          color: #ffd700;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .stat-item p {
          color: #f5f5f5;
          font-size: clamp(0.9rem, 3vw, 1.1rem);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .calendly-section {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1.5rem 3rem;
        }
        .calendly-container {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(196, 30, 58, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .calendly-container h2 {
          color: #ffd700;
          text-align: center;
          margin-bottom: 1rem;
          font-size: clamp(1.5rem, 5vw, 2rem);
        }
        .calendly-container p {
          text-align: center;
          color: #d4d4d4;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          .hero { padding: 2rem 1rem; }
          .features { grid-template-columns: 1fr; padding: 0 1rem; }
          .stats { padding: 1.5rem 1rem; }
          .calendly-section { padding: 0 1rem 2rem; }
        }
      `}</style>
    </>
  )
}
