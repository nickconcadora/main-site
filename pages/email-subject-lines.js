import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'

const RECAPTCHA_SITE_KEY = '6LeF7GwsAAAAAMKTy55McIfybM1TvwruOv0TXYtE'

export default function EmailSubjectLines() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let recaptchaToken
      try {
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
      } catch {
        setError('Verification failed. Please refresh and try again.')
        setLoading(false)
        return
      }

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, recaptcha_token: recaptchaToken }),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Fix Your Email Open Rates - Free Guide</title>
        <meta name="description" content="Download 10 copy & paste subject line templates to skyrocket your email open rates. Free guide from TTW Enterprises." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} async />
      </Head>
      <Header />
      <main>
        <div className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1>YOUR EMAILS SUCK.</h1>
                <h2>They&apos;re not getting opened.<br />They&apos;re getting ignored.</h2>
                <ul className="pain-points">
                  <li>15% open rates—if you&apos;re lucky</li>
                  <li>Emails barely noticeable in the inbox</li>
                  <li>Thousands in sales lost daily</li>
                </ul>
                <div className="impact-statement">
                  Low open rates are killing your business.
                </div>
                <p>
                  Download this free guide to learn how to write email subject lines that get{' '}
                  <strong>noticed—and opened.</strong>
                </p>
              </div>

              <div className="form-container">
                <h2 className="form-title">How to Skyrocket Email Open Rates</h2>
                <div className="book-image">
                  <img src="/book-cover.png" alt="Email Open Rates Guide" />
                </div>

                {!submitted ? (
                  <>
                    <div className="form-header">
                      <h3>Get Your Free Guide Now</h3>
                      <p className="subtitle">
                        <span className="highlight">10 Copy &amp; Paste</span> Subject Line Templates<br />
                        Anyone Can Use To Skyrocket Email Open Rates
                      </p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Download Free Guide'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="success-message">
                    <svg className="checkmark" viewBox="0 0 52 52">
                      <circle cx="26" cy="26" r="25" fill="none" stroke="#30D158" strokeWidth="2" />
                      <path fill="none" stroke="#30D158" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                    <h3>Success! Check Your Email</h3>
                    <p>Your free guide is on its way to your inbox.<br />Check your email in the next few minutes.</p>
                  </div>
                )}

                <div className="trust-badges">
                  <div className="badge">⭐ 100% Free</div>
                  <div className="badge">⚡ Instant Access</div>
                  <div className="badge">🚫 No Spam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 3rem 0;
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-text { text-align: center; }
        h1 {
          font-family: 'Arial Black', sans-serif;
          font-size: clamp(2.5rem, 10vw, 5.5rem);
          line-height: 0.95;
          color: #FF3B30;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        h2 {
          font-size: clamp(1.25rem, 4vw, 2rem);
          font-weight: 400;
          color: #f5f5f5;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }
        .pain-points {
          list-style: none;
          margin: 2rem auto;
          max-width: 500px;
          text-align: left;
        }
        .pain-points li {
          font-size: clamp(1rem, 3vw, 1.1rem);
          padding: 0.75rem 0 0.75rem 2rem;
          position: relative;
          color: #98989D;
        }
        .pain-points li::before {
          content: '•';
          position: absolute;
          left: 0.5rem;
          color: #FF3B30;
          font-size: 1.5rem;
          line-height: 1;
        }
        .impact-statement {
          font-size: clamp(1.15rem, 4vw, 1.8rem);
          font-weight: 700;
          color: #FFD60A;
          margin: 2rem auto;
          padding: 1.25rem;
          background: rgba(255, 214, 10, 0.1);
          border-left: 4px solid #FFD60A;
          max-width: 600px;
        }
        .hero-text > p {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #98989D;
          line-height: 1.6;
          margin-top: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-text > p strong {
          color: #FFD60A;
        }
        .form-container {
          background: rgba(28, 28, 30, 0.9);
          padding: 2rem 1.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .form-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          background: linear-gradient(90deg, #FF3B30, #FFD60A, #FF3B30);
        }
        .form-title {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          text-align: center;
          color: #FFD60A;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          font-weight: 900;
        }
        .book-image {
          text-align: center;
          margin: 1.5rem auto;
        }
        .book-image img {
          max-width: 100%;
          max-height: 300px;
          height: auto;
        }
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .form-header h3 {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          color: #f5f5f5;
          margin-bottom: 1rem;
        }
        .subtitle {
          font-size: clamp(0.95rem, 3vw, 1.1rem);
          color: #98989D;
          line-height: 1.6;
        }
        .highlight {
          color: #FFD60A;
          font-weight: 700;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #f5f5f5;
        }
        .form-group input {
          width: 100%;
          padding: 1rem;
          background: rgba(0,0,0,0.3);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #f5f5f5;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .form-group input:focus {
          outline: none;
          border-color: #FFD60A;
          background: rgba(0,0,0,0.5);
          box-shadow: 0 0 0 3px rgba(255,214,10,0.1);
        }
        .submit-btn {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, #FF3B30 0%, #C72C24 100%);
          color: white;
          font-size: clamp(1rem, 3vw, 1.25rem);
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,59,48,0.4);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .trust-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .badge {
          padding: 0.5rem 1rem;
          background: rgba(255,214,10,0.1);
          border-radius: 20px;
          font-size: 0.9rem;
          color: #FFD60A;
          font-weight: 600;
        }
        .error-message {
          padding: 1rem;
          margin-bottom: 1.5rem;
          background: rgba(255,59,48,0.1);
          border: 1px solid #FF3B30;
          border-radius: 8px;
          color: #FF3B30;
          text-align: center;
        }
        .success-message {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-message h3 {
          font-size: clamp(1.5rem, 5vw, 2rem);
          color: #30D158;
          margin-bottom: 1rem;
        }
        .success-message p {
          color: #f5f5f5;
        }
        .checkmark {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          display: block;
        }
        @media (min-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
          .hero-text { text-align: left; }
          .pain-points { margin: 2rem 0; }
          .impact-statement { margin: 2rem 0; }
          .hero-text > p { margin-left: 0; margin-right: 0; }
        }
      `}</style>
    </>
  )
}
