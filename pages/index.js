import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { site } from '../lib/site'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  try {
    const { getDb } = await import('../lib/db')
    const sql = getDb()
    const posts = await sql`
      SELECT id, title, slug, excerpt, created_at FROM posts
      WHERE published = true ORDER BY created_at DESC LIMIT 3
    `
    return { props: { posts: posts.map(post => ({
      ...post, created_at: post.created_at ? new Date(post.created_at).toISOString() : null,
    })) } }
  } catch {
    return { props: { posts: [] } }
  }
}

const projects = [
  {
    number: '01', type: 'AI + CONTENT', title: 'Find the moment. Skip the scrubbing.',
    description: 'Custom keyword search tools for video and image libraries, using transcripts to make content easier to find and reuse.',
    detail: 'Transcript search · Media organization · Content repurposing',
  },
  {
    number: '02', type: 'AI + FOLLOW-UP', title: 'Give every lead a next step.',
    description: 'AI chatbots, appointment setters, and GoHighLevel workflows that connect conversations with follow-up and booking.',
    detail: 'AI assistants · GHL management · Lead follow-up',
  },
  {
    number: '03', type: 'WEBSITES + CONVERSION', title: 'Connect the offer to the sale.',
    description: 'Shopify website management and sales pages, with the copy and implementation handled together.',
    detail: 'Shopify · Sales pages · Direct-response copy',
  },
]

const faqs = [
  ['Who is this for?', 'Businesses with an offer to sell and a marketing operation that needs hands-on help. That can mean an online store, a coach, a creator, or a service business. The starting point is the problem you need solved.'],
  ['Do you still write copy?', 'Yes. Email copy, sales pages, and ad copy are still a core part of my work. I also handle the setup and systems that put that copy to work.'],
  ['Can we start with one project?', 'Yes. We can scope a specific campaign, sales page, chatbot, or workflow. If you need ongoing email marketing, website management, or optimization, we can discuss that too.'],
  ['What does AI automation actually mean?', 'It means building a useful tool or workflow around a specific job: answering questions, following up with leads, helping book appointments, or finding content in a media library. We define what it should do and where a person should take over.'],
  ['What happens on the discovery call?', 'We talk through your business, your current marketing, and the problem you want to solve. If there is a fit, we agree on a practical starting point and scope before any work begins.'],
]

export default function Home({ posts = [] }) {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link rel="canonical" href={site.url} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.url} />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Header />
      <main id="main-content" className={styles.home}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={'container ' + styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}><span className={styles.smallLine} /> Email marketing &amp; AI automation</p>
              <h1 id="hero-heading">More sales.<br />{' '}<em>Less busywork.</em></h1>
              <p className={styles.heroDescription}>I write the emails, build the tools, and connect the systems that help your business sell more and get time back.</p>
              <div className={styles.actions}>
                <a href={site.bookingUrl} className="btn-red">Let’s talk about your business <span aria-hidden="true">↗</span></a>
                <a href="#work" className={styles.textLink}>See the work <span aria-hidden="true">↓</span></a>
              </div>
              <div className={styles.signature}>
                <img src="/nick-concadora.jpg" alt="Nick Concadora" width="44" height="44" />
                <div><strong>Nick Concadora</strong><span>Email Marketing &amp; AI Automation Specialist</span></div>
              </div>
            </div>
            <aside className={styles.result} aria-label="Email marketing result">
              <div className={styles.resultTop}><span>THE WORK, IN NUMBERS</span><span aria-hidden="true">↗</span></div>
              <p className={styles.resultNumber}>$100k<span>+</span></p>
              <p className={styles.resultDescription}>generated through<br />{' '}<strong>email marketing</strong><br />{' '}in a 60-day period.</p>
              <div className={styles.resultBottom}><span>Copy. Campaigns. Execution.</span><a href="#services" aria-label="Explore email marketing services">↗</a></div>
            </aside>
          </div>
          <div className={'container ' + styles.capabilities} aria-label="Areas of work">
            <span>EMAIL MARKETING</span><span>AI TOOLS &amp; AUTOMATION</span><span>SHOPIFY &amp; SALES PAGES</span><span>GHL &amp; FOLLOW-UP</span>
          </div>
        </section>

        <section id="services" className={styles.services} aria-labelledby="services-heading">
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>01 / HOW I HELP</p>
              <div><h2 id="services-heading">Good marketing needs<br />{' '}someone to <em>make it work.</em></h2><p>Two ways to work together. One person who can write it, build it, and keep it moving.</p></div>
            </div>
            <article className={styles.serviceRow}>
              <div className={styles.serviceName}><span className={styles.serviceNumber}>01</span><h3>Email that earns<br />{' '}its place in the inbox.</h3></div>
              <div><p>Turn your list into a more useful part of your business. I plan, write, build, and manage email campaigns, with attention to the offer, the audience, and what happens after the click.</p><ul className={styles.deliverables}><li>Email strategy &amp; campaign management</li><li>Sales emails &amp; automated sequences</li><li>List segmentation &amp; performance review</li><li>Sales page copy &amp; implementation</li></ul><a className={styles.serviceLink} href={site.bookingUrl}>Talk email marketing <span aria-hidden="true">↗</span></a></div>
            </article>
            <article className={styles.serviceRow}>
              <div className={styles.serviceName}><span className={styles.serviceNumber}>02</span><h3>AI that does<br />{' '}a useful job.</h3></div>
              <div><p>Give repetitive work a better system. I build practical AI tools and automations around your business, from lead follow-up to finding the right clip in a content library.</p><ul className={styles.deliverables}><li>AI chatbots &amp; appointment setters</li><li>GoHighLevel setup &amp; workflow management</li><li>Transcript-based video &amp; image search</li><li>Custom tools &amp; connected workflows</li></ul><a className={styles.serviceLink} href={site.bookingUrl}>Talk AI &amp; automation <span aria-hidden="true">↗</span></a></div>
            </article>
            <div className={styles.supporting}><p>And the pieces around them.</p><span>Shopify management</span><span>Facebook ads</span><span>AI-assisted video editing</span><span>Sales pages &amp; copywriting</span></div>
          </div>
        </section>

        <section id="work" className={styles.work} aria-labelledby="work-heading">
          <div className="container">
            <div className={styles.workHeading}><div><p className={styles.eyebrow}>02 / WORK IN PRACTICE</p><h2 id="work-heading">Built around real<br />{' '}<em>business problems.</em></h2></div><p>A few examples of what I build and manage alongside email marketing.</p></div>
            <div className={styles.projectGrid}>{projects.map(project => <article className={styles.project} key={project.number}>
              <div className={styles.projectTop}><span>{project.type}</span><span>{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className={styles.projectDetail}>{project.detail}</div>
            </article>)}</div>
            <div className={styles.videoNote}><span aria-hidden="true">↳</span><p><strong>Content belongs in the system, too.</strong> I also use AI-assisted video editing to turn existing footage into content for your marketing.</p></div>
          </div>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-heading">
          <div className={'container ' + styles.aboutGrid}>
            <div><p className={styles.eyebrow}>03 / THE PERSON DOING THE WORK</p><div className={styles.profile}><img src="/nick-concadora.jpg" alt="Nick Concadora" width="96" height="96" loading="lazy" /><div><strong>Nick Concadora</strong><span>The person behind NickyCopy.</span></div></div></div>
            <div><h2 id="about-heading">Copywriter by foundation.<br />{' '}<em>Builder by practice.</em></h2><p>Copywriting is still part of what I do. The work has grown to include the systems around it: email marketing, AI assistants, Shopify websites, sales pages, follow-up, ads, and video.</p><p>That means I can help with both the message and the work needed to get it live. You work directly with me, from figuring out the problem to putting the solution in place.</p><a href="/contact" className={styles.serviceLink}>Tell me what you’re working on <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className={styles.testimonials} aria-labelledby="testimonials-heading">
          <div className="container">
            <div className={styles.quoteHeading}><div><p className={styles.eyebrow}>04 / FROM THE PEOPLE I WORK WITH</p><h2 id="testimonials-heading">The work is personal.</h2></div><Link href="/reviews" className={styles.textLink}>Read client reviews <span aria-hidden="true">↗</span></Link></div>
            <div className={styles.quoteGrid}>
              <figure><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>Once he is signed on, he takes your sales and revenue personally.</blockquote><figcaption><strong>Chad</strong><span>All Eyes DB Camp</span></figcaption></figure>
              <figure><span className={styles.quoteMark} aria-hidden="true">“</span><blockquote>He is also super professional in his communication and always beats the deadlines.</blockquote><figcaption><strong>Feel Tennis</strong><span>feeltennis.net</span></figcaption></figure>
            </div>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="faq-heading">
          <div className={'container ' + styles.faqGrid}><div><p className={styles.eyebrow}>BEFORE WE TALK</p><h2 id="faq-heading">A few good<br />{' '}<em>questions.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section id="audit" className={styles.contact} aria-labelledby="contact-heading">
          <div className={'container ' + styles.contactInner}><p className={styles.eyebrow}>LET’S FIND A USEFUL STARTING POINT</p><h2 id="contact-heading">What’s taking too much time<br />{' '}or leaving sales on the table?</h2><p>Tell me what you’re working with. We’ll talk through the opportunity and see where I can help.</p><div className={styles.actions}><a href={site.bookingUrl} className="btn-red">Book a free discovery call <span aria-hidden="true">↗</span></a><a href={'mailto:' + site.email} className={styles.textLink}>Or send me an email <span aria-hidden="true">↗</span></a></div></div>
        </section>

        <section className={styles.resources} aria-label="Resources and writing"><div className="container">
          <div className={styles.resourceBar}><div><p className={styles.eyebrow}>SOMETHING TO TAKE WITH YOU</p><h2>Start with a better subject line.</h2><p>Get the free guide: 10 subject line templates to try in your next campaign.</p></div><Link href="/email-subject-lines" className="btn-outline">Get the free guide <span aria-hidden="true">↗</span></Link></div>
          {posts.length > 0 && <div className={styles.writing}><div className={styles.writingHeading}><h3>Notes on marketing</h3><Link href="/blog">All writing <span aria-hidden="true">↗</span></Link></div><div className={styles.postGrid}>{posts.map(post => <article key={post.id}>{post.created_at && <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>}<h4><Link href={'/blog/' + post.slug}>{post.title}</Link></h4></article>)}</div></div>}
        </div></section>
      </main>
      <Footer />
    </>
  )
}
