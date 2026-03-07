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
          background: #0a0a0a;
          border-top: 2px solid #c41e3a;
          padding: 1.5rem;
          text-align: center;
          color: #888;
          font-size: clamp(0.85rem, 2vw, 1rem);
          margin-top: auto;
        }
        footer p {
          margin-bottom: 0.5rem;
        }
        footer p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </footer>
  )
}
