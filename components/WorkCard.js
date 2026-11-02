import Link from 'next/link'
import styles from '../styles/Work.module.css'

export default function WorkCard({ project, dark = false }) {
  return (
    <article className={`${styles.card} ${dark ? styles.darkCard : ''}`}>
      <Link href={'/work/' + project.slug} className={styles.cardLink}>
        <div className={`${styles.preview} ${styles[project.accent]}`} aria-hidden="true">
          {project.image ? (
            <div className={styles.browserFrame}>
              <div className={styles.browserBar}><i /><i /><i /><span>{project.client}</span></div>
              <div className={styles.browserViewport}><img src={project.image} alt="" width="1265" height={project.accent === 'search' ? '790' : '890'} loading="lazy" /></div>
            </div>
          ) : (
            <div className={styles.emailPreview}>
              <div className={styles.emailTop}><span>ALL EYES DB CAMP</span><span>↗</span></div>
              <span className={styles.subjectLabel}>SUBJECT LINE</span>
              <p className={styles.subject}>{project.emails[0].subject}</p>
              <p className={styles.previewText}>{project.emails[0].preview}</p>
              <div className={styles.emailExcerpt}>{project.emails[0].body[0]}</div>
            </div>
          )}
        </div>
        <div className={styles.cardCopy}>
          <div className={styles.cardMeta}><span>{project.category}</span><span>{project.label}</span></div>
          <p className={styles.client}>{project.client}</p>
          <h3>{project.title}</h3>
          <p className={styles.summary}>{project.summary}</p>
          <span className={styles.cardAction}>{project.emails ? 'Read the emails' : 'Explore the project'} <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  )
}
