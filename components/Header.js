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
      <nav>
        <div className="nav-container">
          <Link href="/" className="logo">
            TTW<span>ENTERPRISES</span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={router.pathname === link.href ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a href="/#audit" className="nav-cta">Book a Call</a>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={router.pathname === link.href ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="/#audit" className="mobile-cta" onClick={() => setMenuOpen(false)}>
              Book a Call
            </a>
          </div>
        )}
      </nav>

      <style jsx>{`
        nav {
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 64px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .logo {
          font-size: 1.1rem;
          font-weight: 900;
          color: #111111;
          text-decoration: none;
          letter-spacing: 0.5px;
          margin-right: auto;
          white-space: nowrap;
        }
        .logo span {
          color: #c41e3a;
          margin-left: 4px;
        }
        .nav-links {
          display: flex;
          gap: 0;
          list-style: none;
          height: 100%;
          align-items: center;
        }
        .nav-links a {
          display: block;
          padding: 0 1rem;
          height: 64px;
          line-height: 64px;
          color: #444444;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.2s;
          border-bottom: 3px solid transparent;
          margin-top: 3px;
          white-space: nowrap;
        }
        .nav-links a:hover {
          color: #111111;
          border-bottom-color: #c41e3a;
        }
        .nav-links a.active {
          color: #111111;
          font-weight: 700;
          border-bottom-color: #c41e3a;
        }
        .nav-cta {
          background: #c41e3a;
          color: #ffffff;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .nav-cta:hover {
          background: #8b0000;
          color: #ffffff;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #111111;
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background: #ffffff;
          border-top: 1px solid #e5e5e5;
          padding: 1rem 1.5rem 1.5rem;
          gap: 0;
        }
        .mobile-menu a {
          padding: 0.875rem 0;
          border-bottom: 1px solid #f0f0f0;
          color: #444444;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
        }
        .mobile-menu a:hover,
        .mobile-menu a.active { color: #c41e3a; }
        .mobile-cta {
          margin-top: 1rem;
          background: #c41e3a;
          color: #ffffff !important;
          padding: 0.875rem 1.25rem;
          border-radius: 6px;
          font-weight: 700;
          text-align: center;
          border-bottom: none !important;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
          .logo { font-size: 1rem; }
        }
      `}</style>
    </>
  )
}
