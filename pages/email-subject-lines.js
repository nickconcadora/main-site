import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
        <section className="page-header">
          <div className="container">
            <p className="label">Free Guide</p>
            <h1>YOUR EMAILS SUCK.</h1>
            <h2>They&apos;re not getting opened. They&apos;re getting ignored.</h2>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="layout">
              <div className="left">
                <ul className="pain-points">
                  <li>15% open rates — if you&apos;re lucky</li>
                  <li>Emails invisible in a crowded inbox</li>
                  <li>Thousands in sales lost every day</li>
                </ul>
                <div className="impact">
                  Low open rates are killing your business.
                </div>
                <p className="cta-text">
                  Download this free guide and learn how to write subject lines that get{' '}
                  <strong>noticed — and opened.</strong>
                </p>
              </div>

              <div className="form-box">
                <h3 className="form-title">How to Skyrocket Email Open Rates</h3>
                <div className="book-image">
                  <img src="/book-cover.png" alt="Email Open Rates Guide" />
                </div>

                {!submitted ? (
                  <>
                    <div className="form-header">
                      <p className="form-subtitle">
                        <span className="highlight">10 Copy &amp; Paste</span> Subject Line Templates
                        Anyone Can Use To Skyrocket Email Open Rates
                      </p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

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
                    <button className="submit-btn" disabled={loading} onClick={handleSubmit}>
                      {loading ? 'Sending...' : 'Download Free Guide'}
                    </button>
                  </>
                ) : (
                  <div className="success-message">
                    <svg viewBox="0 0 52 52" width="70" height="70">
                      <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" strokeWidth="2" />
                      <path fill="none" stroke="#22c55e" strokeWidth="3" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                    <h3>Check Your Email!</h3>
                    <p>Your free guide is on its way to your inbox.</p>
                  </div>
                )}

                <div className="trust-badges">
                  <span className="badge">⭐ 100% Free</span>
                  <span className="badge">⚡ Instant Access</span>
                  <span className="badge">🚫 No Spam</span>
                </div>
              </div>
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
        .label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #ffd700;
          margin-bottom: 1rem;
        }
        .page-header h1 {
          font-size: clamp(2.5rem, 10vw, 5rem);
          font-weight: 900;
          color: #c41e3a;
          line-height: 1;
          margin-bottom: 1rem;
        }
        .page-header h2 {
          font-size: clamp(1.1rem, 4vw, 1.75rem);
          font-weight: 400;
          color: #aaaaaa;
          line-height: 1.4;
        }
        .content-section { padding: 4rem 0; }
        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .pain-points {
          list-style: none;
          margin-bottom: 2rem;
        }
        .pain-points li {
          font-size: clamp(1rem, 3vw, 1.1rem);
          padding: 0.75rem 0 0.75rem 1.75rem;
          position: relative;
          color: #444444;
          border-bottom: 1px solid #f0f0f0;
        }
        .pain-points li::before {
          content: '✕';
          position: absolute;
          left: 0;
          color: #c41e3a;
          font-weight: bold;
        }
        .impact {
          font-size: clamp(1.1rem, 4vw, 1.5rem);
          font-weight: 800;
          color: #111111;
          padding: 1.25rem 1.5rem;
          border-left: 4px solid #ffd700;
          background: #fffbeb;
          margin-bottom: 1.5rem;
        }
        .cta-text {
          font-size: clamp(1rem, 3vw, 1.15rem);
          color: #555555;
          line-height: 1.7;
        }
        .cta-text strong { color: #111111; }

        /* Form box */
        .form-box {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-top: 4px solid #c41e3a;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .form-title {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          font-weight: 900;
          color: #111111;
          text-align: center;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .book-image {
          text-align: center;
          margin: 1rem 0 1.5rem;
        }
        .book-image img {
          max-height: 220px;
          width: auto;
        }
        .form-header { text-align: center; margin-bottom: 1.5rem; }
        .form-subtitle {
          font-size: 1rem;
          color: #555555;
          line-height: 1.5;
        }
        .highlight { color: #c41e3a; font-weight: 700; }
        .form-group { margin-bottom: 1.25rem; }
        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: #333333;
        }
        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e5e5e5;
          border-radius: 6px;
          font-size: 1rem;
          color: #111111;
          transition: border-color 0.2s;
          background: #ffffff;
        }
        .form-group input:focus {
          outline: none;
          border-color: #c41e3a;
        }
        .submit-btn {
          width: 100%;
          padding: 1.1rem;
          background: #c41e3a;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: background 0.2s, transform 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #8b0000;
          transform: translateY(-1px);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f0f0f0;
        }
        .badge {
          font-size: 0.8rem;
          font-weight: 600;
          color: #555555;
          background: #f5f5f5;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
        }
        .error-message {
          padding: 0.875rem;
          margin-bottom: 1.25rem;
          background: #fff5f5;
          border: 1px solid #c41e3a;
          border-radius: 6px;
          color: #c41e3a;
          text-align: center;
          font-size: 0.9rem;
        }
        .success-message {
          text-align: center;
          padding: 2rem 0;
        }
        .success-message h3 {
          font-size: 1.5rem;
          font-weight: 900;
          color: #22c55e;
          margin: 1rem 0 0.5rem;
        }
        .success-message p { color: #555555; }

        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .page-header { padding: 3rem 0 2rem; }
        }
      `}</style>
    </>
  )
}
