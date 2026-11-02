import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { site } from '../lib/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'The work' },
    { href: '/#about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
  ]

  // Close on outside click
  useEffect(() => {
    function handle(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  // Close on route change
  useEffect(() => { setMenuOpen(false) }, [router.asPath])

  return (
    <header ref={headerRef} className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-header-inner">

        {/* Logo — plain <a> avoids Next router re-render errors */}
        <a href="/" className="site-logo">
          Nicky<span>Copy</span><span className="site-logo-dot">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-link${router.asPath === link.href ? ' active' : ''}`}
              aria-current={router.asPath === link.href ? (link.href.includes('#') ? 'location' : 'page') : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a href={site.bookingUrl} className="btn-red site-header-cta">Let’s talk <span aria-hidden="true">↗</span></a>

        {/* Hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          className={`site-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav id="mobile-navigation" className="site-mobile-nav" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-mobile-nav-link${router.asPath === link.href ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="site-mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
          <a href={site.bookingUrl} className="site-mobile-cta">Book a discovery call ↗</a>
        </nav>
      )}
    </header>
  )
}
