import { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WorkCard from '../../components/WorkCard'
import { work } from '../../lib/work'
import { site } from '../../lib/site'
import styles from '../../styles/Work.module.css'

const categories = ['All work', 'Email', 'AI tools', 'Websites']

export default function Work() {
  const [category, setCategory] = useState('All work')
  const visible = category === 'All work' ? work : work.filter(project => project.category === category)
  const description = 'Explore real email campaign copy, AI search tools, and live websites built by Nick Concadora.'
  return <>
    <Head>
      <title>Selected Work | Nick Concadora</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={site.url + 'work'} />
      <meta property="og:title" content="Selected Work | Nick Concadora" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.url + 'work'} />
    </Head>
    <Header />
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>SELECTED WORK / NICK CONCADORA</p>
          <div className={styles.heroGrid}>
            <h1>The work,<br /><em>up close.</em></h1>
            <div><p>Read the emails. Try the tools. Explore the websites.</p><p>Here’s what it looks like when the copy, the build, and the systems come together.</p></div>
          </div>
        </div>
      </section>
      <section className={styles.collection} aria-label="Project portfolio">
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.filters} role="group" aria-label="Filter work by type">
              {categories.map(value => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<span>{value === 'All work' ? work.length : work.filter(project => project.category === value).length}</span></button>)}
            </div>
            <p role="status" className={styles.count}>{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
          </div>
          <div className={styles.grid}>{visible.map(project => <WorkCard key={project.slug} project={project} />)}</div>
        </div>
      </section>
      <section className={styles.cta}>
        <div className="container"><p className={styles.eyebrow}>YOUR BUSINESS, NEXT</p><h2>Have something that<br /><em>needs to work better?</em></h2><p>Let’s talk about the emails, the tools, or the website you need.</p><a href={site.bookingUrl} className="btn-red">Book a free discovery call <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
    <Footer />
  </>
}
