import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { work } from '../../lib/work'
import { site } from '../../lib/site'
import styles from '../../styles/Work.module.css'

export function getStaticPaths() {
  return { paths: work.map(project => ({ params: { slug: project.slug } })), fallback: false }
}

export function getStaticProps({ params }) {
  const project = work.find(item => item.slug === params.slug)
  return { props: { project, related: work.find(item => item.slug === project.related) } }
}

function EmailReader({ project }) {
  const [selected, setSelected] = useState(0)
  const email = project.emails[selected]
  return <section className={styles.samples} aria-labelledby="sample-heading">
    <div className={styles.sampleIntro}><p className={styles.eyebrow}>THE ACTUAL COPY</p><h2 id="sample-heading">{project.sampleTitle}</h2><p>{project.sampleNote}</p></div>
    <div className={styles.emailChoices} role="group" aria-label="Choose an email to read">{project.emails.map((item, index) => <button key={item.subject} type="button" aria-pressed={selected === index} aria-controls="email-copy" onClick={() => setSelected(index)}>{item.label}</button>)}</div>
    <article id="email-copy" className={styles.emailReader} aria-label={email.subject}>
      <div className={styles.emailHeader}><p className={styles.emailByline}>COPY FOR CHAD WILSON / ALL EYES DB CAMP</p><h3>{email.subject}</h3><p className={styles.preheader}><span>Preview text</span>{email.preview}</p>{email.timing && <p className={styles.timing}>{email.timing}</p>}</div>
      <div className={styles.emailBody}>{email.body.map((paragraph, index) => <p key={index} className={paragraph.startsWith('[') || paragraph === 'Click here.' ? styles.copyCta : undefined}>{paragraph}</p>)}</div>
      <div className={styles.emailDestination}><span>INTENDED DESTINATION</span><p>{email.destination}</p></div>
    </article>
  </section>
}

export default function WorkDetail({ project, related }) {
  const url = site.url + 'work/' + project.slug
  return <>
    <Head>
      <title>{project.client}: {project.category} | Nick Concadora</title>
      <meta name="description" content={project.summary} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={project.title + ' | Nick Concadora'} />
      <meta property="og:description" content={project.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
    </Head>
    <Header />
    <main id="main-content" className={styles.page}>
      <section className={styles.detailHero}>
        <div className="container">
          <Link href="/work" className={styles.backLink}><span aria-hidden="true">←</span> All work</Link>
          <p className={styles.eyebrow}>{project.client} / {project.category}</p>
          <h1>{project.title}</h1>
          <p className={styles.detailSummary}>{project.summary}</p>
          <div className={styles.detailActions}>
            {project.links?.map(link => <a className="btn-red" href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span><span className={styles.srOnly}> (opens in a new tab)</span></a>)}
            {project.emails && <a href="#sample-heading" className="btn-red">Read the email samples <span aria-hidden="true">↓</span></a>}
            <span className={styles.status}>{project.label}</span>
          </div>
        </div>
      </section>
      <div className="container">
        {project.image && <figure className={styles.detailImage}><a href={project.image} target="_blank" rel="noopener noreferrer" aria-label="Open the full website screenshot in a new tab"><img src={project.image} alt={project.imageAlt} width="1265" height={project.accent === 'search' ? '790' : '890'} /></a><figcaption>Screenshot of the live website. <a href={project.image} target="_blank" rel="noopener noreferrer">View full size <span aria-hidden="true">↗</span></a></figcaption></figure>}
        <section className={styles.story} aria-label="About the project">
          <aside><p className={styles.eyebrow}>MY PART IN THE PROJECT</p><p className={styles.role}>{project.role}</p><h2>What I worked on</h2><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></aside>
          <div className={styles.storyCopy}><div><h2>The job to be done</h2><p>{project.challenge}</p></div><div><h2>How I approached it</h2><p>{project.approach}</p></div><div><h2>What came out of it</h2><p>{project.outcome}</p></div></div>
        </section>
        {project.emails && <EmailReader key={project.slug} project={project} />}
        <section className={styles.nextProject} aria-label="Related project"><div><p className={styles.eyebrow}>ANOTHER PIECE OF THE WORK</p><Link href={'/work/' + related.slug}>{related.title} <span aria-hidden="true">↗</span></Link><p>{related.client} / {related.category}</p></div><Link className={styles.backLink} href="/work">Browse all work <span aria-hidden="true">→</span></Link></section>
      </div>
      <section className={styles.cta}><div className="container"><p className={styles.eyebrow}>LET’S PUT THIS TO WORK FOR YOU</p><h2>What are you working on?</h2><p>Tell me where you need help. We’ll find a practical place to start.</p><a href={site.bookingUrl} className="btn-red">Book a free discovery call <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <Footer />
  </>
}
