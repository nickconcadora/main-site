import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RECAPTCHA_SITE_KEY = '6LeF7GwsAAAAAMKTy55McIfybM1TvwruOv0TXYtE'

export default function EmailSubjectLines() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

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
        <title>Fix Your Email Open Rates — Free Guide</title>
        <meta name="description" content="Download 10 copy & paste subject line templates to skyrocket your email open rates. Free guide from TTW Enterprises." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} async />
      </Head>

      <Header />

      <main className="guide-main">
        <div className="container">
          <div className="guide-grid">

            {/* Left: pitch */}
            <div className="guide-pitch">
              <span className="tag-red">Free Guide</span>
              <h1>Your emails<br /><em>aren't getting opened.</em></h1>
              <p className="pitch-sub">
                Most email subject lines are bland, forgettable, and ignored.
                Here's what's actually killing your open rates:
              </p>
              <ul className="pain-list">
                <li>15% open rates — if you're lucky</li>
                <li>Emails buried and invisible in the inbox</li>
                <li>Thousands in sales lost every single week</li>
              </ul>
              <div className="callout">
                Low open rates aren't a delivery problem. They're a <strong>copywriting problem.</strong>
              </div>
              <p className="pitch-p">
                Download this free guide to get 10 copy-and-paste subject line
                templates that get your emails <strong>noticed and opened.</strong>
              </p>

            </div>

            {/* Right: form */}
            <div className="guide-form-wrap">
              <div className="guide-form-card">
                <div className="form-card-header">
                  <h2>How to Skyrocket<br />Email Open Rates</h2>
                  <p className="form-sub">
                    <span className="highlight">10 Copy &amp; Paste</span> Subject Line Templates
                    Anyone Can Use
                  </p>
                </div>

                {/* Book cover inside form card */}
                <div className="book-wrap">
                  <img src="/book-cover.png" alt="Email Subject Line Guide" className="book-img" />
                </div>

                {!submitted ? (
                  <>
                    {error && <div className="form-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="form-body">
                      <div className="field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Sending…' : 'Download Free Guide →'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="success">
                    <svg viewBox="0 0 52 52" className="check-icon">
                      <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" strokeWidth="2" />
                      <path fill="none" stroke="#22c55e" strokeWidth="3" d="M14 27l8 8 16-16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3>Check Your Inbox!</h3>
                    <p>Your free guide is on its way. Check your email in the next few minutes.</p>
                  </div>
                )}

                <div className="trust-row">
                  <span className="trust-badge">⭐ 100% Free</span>
                  <span className="trust-badge">⚡ Instant Access</span>
                  <span className="trust-badge">🚫 No Spam</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .guide-main {
          background: #0f0f0f;
          min-height: calc(100vh - 68px);
          padding: 5rem 0 6rem;
        }

        .guide-grid {
          display: grid;
          grid-template-columns: 1fr 480px;
          gap: 5rem;
          align-items: start;
        }

        /* Pitch side */
        .tag-red {
          display: inline-block;
          background: #c41e3a;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          padding: 0.3rem 0.75rem;
          border-radius: 3px;
          margin-bottom: 1.5rem;
        }
        .guide-pitch h1 {
          font-size: clamp(2.25rem, 5vw, 4rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }
        .guide-pitch h1 em {
          font-style: italic;
          color: #c41e3a;
        }
        .pitch-sub {
          font-size: 1.05rem;
          color: #888;
          line-height: 1.75;
          margin-bottom: 1.75rem;
          max-width: 460px;
        }
        .pain-list {
          list-style: none;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .pain-list li {
          font-size: 1rem;
          color: #aaa;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.5;
        }
        .pain-list li::before {
          content: '✗';
          position: absolute;
          left: 0;
          color: #c41e3a;
          font-weight: 900;
        }
        .callout {
          background: rgba(232, 184, 0, 0.1);
          border-left: 4px solid #e8b800;
          padding: 1rem 1.25rem;
          color: #e8b800;
          font-size: 1.05rem;
          font-weight: 600;
          line-height: 1.6;
          border-radius: 0 4px 4px 0;
          margin-bottom: 1.75rem;
        }
        .callout strong { color: #e8b800; }
        .pitch-p {
          color: #888;
          font-size: 0.97rem;
          line-height: 1.75;
          max-width: 460px;
          margin-bottom: 2.5rem;
        }
        .pitch-p strong { color: #e8b800; }
        .book-wrap { padding: 1.5rem 2rem 0; }
        .book-img { width: 100%; max-height: 280px; object-fit: contain; border-radius: 4px; }

        /* Form card */
        .guide-form-wrap { position: sticky; top: 88px; }
        .guide-form-card {
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .form-card-header {
          background: #c41e3a;
          padding: 1.75rem 2rem;
          text-align: center;
        }
        .form-card-header h2 {
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 0.75rem;
          letter-spacing: -0.3px;
        }
        .form-sub {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.8);
          line-height: 1.5;
        }
        .highlight { font-weight: 800; color: #fff; }

        .form-body {
          padding: 1.75rem 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .field { display: flex; flex-direction: column; gap: 0.4rem; }
        .field label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #ccc;
          letter-spacing: 0.2px;
        }
        .field input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          color: #fff;
          font-size: 0.97rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .field input::placeholder { color: #666; }
        .field input:focus {
          outline: none;
          border-color: #e8b800;
          box-shadow: 0 0 0 3px rgba(232,184,0,0.15);
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #e8b800;
          color: #0f0f0f;
          font-size: 1rem;
          font-weight: 800;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 0.2px;
          transition: background 0.15s, transform 0.1s;
          margin-top: 0.5rem;
        }
        .submit-btn:hover:not(:disabled) { background: #d4a800; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .form-error {
          margin: 1rem 2rem 0;
          padding: 0.875rem 1rem;
          background: rgba(196,30,58,0.15);
          border: 1px solid #c41e3a;
          border-radius: 6px;
          color: #f87171;
          font-size: 0.88rem;
          text-align: center;
        }

        .success {
          padding: 2.5rem 2rem;
          text-align: center;
        }
        .check-icon { width: 64px; height: 64px; margin: 0 auto 1.25rem; display: block; }
        .success h3 { font-size: 1.4rem; font-weight: 900; color: #22c55e; margin-bottom: 0.75rem; }
        .success p { color: #aaa; font-size: 0.95rem; line-height: 1.65; }

        .trust-row {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding: 1.25rem 2rem 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 1.5rem;
        }
        .trust-badge {
          font-size: 0.78rem;
          font-weight: 700;
          color: #e8b800;
          background: rgba(232,184,0,0.1);
          border-radius: 100px;
          padding: 0.3rem 0.875rem;
        }

        @media (max-width: 960px) {
          .guide-grid { grid-template-columns: 1fr; gap: 3rem; }
          .guide-form-wrap { position: static; }
          .guide-main { padding: 3.5rem 0 4rem; }
          /* book stays in card on mobile */
        }
        @media (max-width: 640px) {
          .form-body { padding: 1.5rem 1.5rem 0; }
          .form-card-header { padding: 1.5rem; }
          .trust-row { padding: 1rem 1.5rem 1.5rem; }
        }
      `}</style>
    </>
  )
}
