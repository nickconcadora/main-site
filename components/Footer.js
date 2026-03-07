import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} TTW Enterprises. Built to convert.</p>
      <p>
        <Link href="/contact">Contact</Link> |{' '}
        <Link href="/reviews">Reviews</Link> |{' '}
        <Link href="/blog">Blog</Link>
      </p>
      <style jsx>{`
        footer {
          background: #111111;
          border-top: 3px solid #ffd700;
          padding: 2rem 1.5rem;
          text-align: center;
          color: #999999;
          font-size: clamp(0.85rem, 2vw, 1rem);
          margin-top: auto;
        }
        footer p {
          margin-bottom: 0.5rem;
        }
        footer p:last-child {
          margin-bottom: 0;
        }
        footer :global(a) {
          color: #ffd700;
        }
        footer :global(a:hover) {
          color: #c41e3a;
        }
      `}</style>
    </footer>
  )
}
