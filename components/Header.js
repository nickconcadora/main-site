import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const headerRef = useRef(null)

  const navLinks = [
    { href: '/blog',                label: 'Blog' },
    { href: '/email-subject-lines', label: 'Free Guide' },
    { href: '/reviews',             label: 'Reviews' },
    { href: '/contact',             label: 'Contact' },
  ]

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Close on route change
  useEffect(() => { setMenuOpen(false) }, [router.pathname])

  return (
    <div ref={headerRef} className="site-header">
      <div className="site-header-inner">

        {/* Logo — plain <a> avoids Next router re-render errors */}
        <a href="/" className="site-logo">
          TTW <span>ENTERPRISES</span>
        </a>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-link${router.pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a href="/#audit" className="btn-red site-header-cta">Book a Call</a>

        {/* Hamburger */}
        <button
          className={`site-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="site-mobile-nav">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-mobile-nav-link${router.pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a href="/#audit" className="site-mobile-cta">Book a Call</a>
        </div>
      )}
    </div>
  )
}
