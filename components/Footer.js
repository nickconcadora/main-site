import Link from 'next/link'
import { site } from '../lib/site'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={'container ' + styles.inner}>
        <div><Link href="/" className={styles.brand}>NickyCopy<span>.</span></Link><p>Email Marketing &amp; AI Automation<br />Nick Concadora · TTW Enterprises</p></div>
        <nav aria-label="Footer navigation"><Link href="/#services">Services</Link><Link href="/work">The work</Link><Link href="/reviews">Reviews</Link><Link href="/blog">Blog</Link><Link href="/email-subject-lines">Free guide</Link><Link href="/contact">Contact</Link></nav>
        <div className={styles.contact}><a href={'mailto:' + site.email}>{site.email}</a><p>&copy; {new Date().getFullYear()} TTW Enterprises.</p></div>
      </div>
    </footer>
  )
}
