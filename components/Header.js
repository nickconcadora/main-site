import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const headerRef = useRef(null)

  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/email-subject-lines', label: 'Free Guide' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  // Close mobile menu on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  return (
    <>
      <header ref={headerRef}>
        <div className="nav-inner">
          {/* Use <a> not <Link> for the logo to guarantee hard navigation to home */}
          <a href="/" className="logo">
            TTW <span>ENTERPRISES</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${router.pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a href="/#audit" className="book-btn">Book a Call</a>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav" role="menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-link ${router.pathname === link.href ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/#audit"
              className="mobile-cta"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Book a Call
            </a>
          </div>
        )}
      </header>

      <style jsx>{`
        header {
          background: #ffffff;
          border-bottom: 2px solid #e5e5e5;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo {
          font-size: 1.1rem;
          font-weight: 900;
          color: #111111;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-right: auto;
          white-space: nowrap;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo span { color: #c41e3a; }

        .desktop-nav {
          display: flex;
          align-items: center;
          height: 68px;
          gap: 0.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 0 1rem;
          height: 68px;
          color: #555555;
          font-weight: 600;
          font-size: 0.88rem;
          white-space: nowrap;
          letter-spacing: 0.3px;
          border-bottom: 3px solid transparent;
          transition: color 0.15s, border-color 0.15s;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #111111;
          border-bottom-color: #c41e3a;
        }
        .nav-link.active {
          color: #111111;
          font-weight: 700;
          border-bottom-color: #c41e3a;
        }

        .book-btn {
          display: inline-flex;
          align-items: center;
          background: #c41e3a;
          color: #ffffff;
          padding: 0.55rem 1.25rem;
          border-radius: 5px;
          font-weight: 700;
          font-size: 0.85rem;
          white-space: nowrap;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .book-btn:hover { background: #8b0000; }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-shrink: 0;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #111111;
          transition: all 0.25s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(0px, 7px); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(0px, -7px); }

        .mobile-nav {
          background: #ffffff;
          border-top: 1px solid #eeeeee;
          padding: 0.75rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .mobile-link {
          padding: 0.875rem 0;
          border-bottom: 1px solid #f5f5f5;
          color: #333333;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.15s;
        }
        .mobile-link:hover,
        .mobile-link.active { color: #c41e3a; }
        .mobile-cta {
          margin-top: 1.25rem;
          text-align: center;
          background: #c41e3a;
          color: #ffffff;
          padding: 0.875rem;
          border-radius: 5px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background 0.15s;
        }
        .mobile-cta:hover { background: #8b0000; }

        /* Tablet: tighten up before going to hamburger */
        @media (max-width: 900px) and (min-width: 769px) {
          .nav-link { padding: 0 0.7rem; font-size: 0.83rem; }
          .nav-inner { gap: 1rem; }
          .logo { font-size: 0.95rem; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .book-btn { display: none; }
          .hamburger { display: flex; }
          .nav-inner { gap: 1rem; }
        }
      `}</style>
    </>
  )
}
