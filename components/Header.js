import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/email-subject-lines', label: 'Free Guide' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header>
        <div className="container nav-inner">
          <Link href="/" className="logo">
            TTW <span>ENTERPRISES</span>
          </Link>

          <nav className="desktop-nav">
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

          <a href="/#audit" className="btn-red">Book a Call</a>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-link ${router.pathname === link.href ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="/#audit" className="btn-red mobile-cta" onClick={() => setMenuOpen(false)}>
              Book a Call
            </a>
          </div>
        )}
      </header>

      <style jsx>{`
        header {
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-inner {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .logo {
          font-size: 1rem;
          font-weight: 900;
          color: #111111;
          letter-spacing: 1px;
          margin-right: auto;
          white-space: nowrap;
        }
        .logo span { color: #c41e3a; }
        .desktop-nav {
          display: flex;
          align-items: center;
          height: 64px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          padding: 0 1rem;
          height: 100%;
          color: #444444;
          font-weight: 500;
          font-size: 0.9rem;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-link:hover { color: #111111; border-bottom-color: #c41e3a; }
        .nav-link.active { color: #111111; font-weight: 700; border-bottom-color: #c41e3a; }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #111111;
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-nav {
          background: #ffffff;
          border-top: 1px solid #e5e5e5;
          padding: 0.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .mobile-link {
          padding: 1rem 0;
          border-bottom: 1px solid #f0f0f0;
          color: #444444;
          font-weight: 500;
          font-size: 1rem;
        }
        .mobile-link:hover, .mobile-link.active { color: #c41e3a; }
        .mobile-cta { margin-top: 1rem; text-align: center; }

        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .hamburger { display: flex; }
          :global(.btn-red:not(.mobile-cta)) { display: none; }
        }
      `}</style>
    </>
  )
}
