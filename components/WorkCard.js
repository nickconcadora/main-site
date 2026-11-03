import Link from 'next/link'
import styles from '../styles/Work.module.css'

export default function WorkCard({ project }) {
  return (
    <article className={styles.card}>
      <Link href={'/work/' + project.slug} className={styles.cardLink}>
        <div className={`${styles.preview} ${project.accent === 'search' ? styles.search : ''}`} aria-hidden="true">
          <img src={project.image} alt="" width="1265" height={project.accent === 'search' ? '790' : '890'} loading="lazy" />
          <span className={styles.previewArrow}>↗</span>
        </div>
        <div className={styles.cardCopy}>
          <div className={styles.cardMeta}><span>{project.client}</span><span>{project.category}</span></div>
          <h3>{project.title}</h3>
          <p className={styles.summary}>{project.summary}</p>
          <span className={styles.cardAction}>View project <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  )
}
