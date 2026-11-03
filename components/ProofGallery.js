import { proof } from '../lib/proof'
import styles from '../styles/Proof.module.css'

export default function ProofGallery() {
  if (!proof.length) return null
  return <section id="results" className={styles.section} aria-labelledby="results-heading">
    <div className="container">
      <div className={styles.heading}><p>RESULTS</p><h2 id="results-heading">See the numbers.</h2></div>
      <div className={styles.grid}>{proof.map(item => <figure key={item.id}>
        <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${item.title} (new tab)`}><img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" /></a>
        <figcaption><h3>{item.title}</h3>{item.period && <p className={styles.period}>{item.period}</p>}<p>{item.caption}</p><a href={item.image} target="_blank" rel="noopener noreferrer">View full screenshot <span aria-hidden="true">↗</span></a></figcaption>
      </figure>)}</div>
    </div>
  </section>
}
