import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/#audit', label: 'Discovery Call' },
    { href: '/email-subject-lines', label: 'Free Guide' },
    { href: '/blog', label: 'Blog' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link href="/" className="logo">
            <span>TTW</span> ENTERPRISES
          </Link>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
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
        </div>
      </nav>
      <style jsx>{`
        nav {
          background: #111111;
          border-bottom: 3px solid #ffd700;
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: clamp(1.1rem, 4vw, 1.5rem);
          font-weight: bold;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: 1px;
        }
        .logo span {
          color: #ffd700;
        }
        .logo:hover {
          color: #ffd700;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }
        .nav-links a {
          color: #cccccc;
          text-decoration: none;
          font-weight: 500;
          font-size: clamp(0.9rem, 2vw, 1rem);
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }
        .nav-links a:hover,
        .nav-links a.active {
          color: #ffd700;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #c41e3a;
          transition: width 0.3s ease;
        }
        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
        }
        .hamburger span {
          width: 25px;
          height: 3px;
          background: #ffd700;
          transition: all 0.3s ease;
          display: block;
        }
        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }
          .nav-links {
            position: fixed;
            top: 70px;
            right: -100%;
            flex-direction: column;
            background: #111111;
            width: 100%;
            max-width: 300px;
            padding: 2rem;
            gap: 1.5rem;
            border-left: 3px solid #ffd700;
            transition: right 0.3s ease;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
          }
          .nav-links.active {
            right: 0;
          }
          .nav-links a {
            font-size: 1.1rem;
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </>
  )
}
