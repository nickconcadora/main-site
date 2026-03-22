import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from '../../../lib/session'
import { getDb } from '../../../lib/db'
import { editorStyles } from '../new'
import RichEditor from '../../../components/RichEditor'

export async function getServerSideProps({ req, res, params }) {
  const session = await getSession(req, res)
  if (!session.isAdmin) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  try {
    const sql = getDb()
    const [post] = await sql`
      SELECT id, title, slug, excerpt, content, meta_description, published
      FROM posts WHERE id = ${params.id} LIMIT 1
    `
    if (!post) return { notFound: true }
    return { props: { post: { ...post, id: String(post.id) } } }
  } catch {
    return { notFound: true }
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function EditPost({ post }) {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [excerpt, setExcerpt] = useState(post.excerpt || '')
  const [content, setContent] = useState(post.content)
  const [metaDescription, setMetaDescription] = useState(post.meta_description || '')
  const [published, setPublished] = useState(post.published)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('write')

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  async function handleSave() {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          meta_description: metaDescription.trim(),
          published,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/admin')
      } else {
        setError(data.error || 'Failed to save.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Head>
        <title>Edit Post - TTW Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="editor-layout">
        <header className="editor-header">
          <div className="header-left">
            <Link href="/admin" className="back-link">← Dashboard</Link>
            <h1>Edit Post</h1>
          </div>
          <div className="header-actions">
            <button onClick={handleSave} disabled={saving} className="publish-btn">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </header>

        <main className="editor-main">
          {error && <div className="error-banner">{error}</div>}
          <div className="editor-grid">
            <div className="editor-primary">
              <div className="field">
                <input
                  type="text"
                  placeholder="Post title..."
                  value={title}
                  onChange={handleTitleChange}
                  className="title-input"
                />
              </div>
              <div className="field slug-field">
                <label>URL Slug</label>
                <div className="slug-preview">
                  <span>/blog/</span>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <div className="tab-bar">
                  <button className={tab === 'write' ? 'active' : ''} onClick={() => setTab('write')}>Write</button>
                  <button className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>Preview</button>
                </div>
                {tab === 'write' ? (
                  <>
                    <RichEditor value={content} onChange={setContent} />
                  </>
                ) : (
                  <div className="preview-box" dangerouslySetInnerHTML={{ __html: content }} />
                )}
              </div>
            </div>
            <div className="editor-sidebar">
              <div className="sidebar-card">
                <h3>Status</h3>
                <label className="toggle-label">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                  <span>{published ? 'Published' : 'Draft'}</span>
                </label>
              </div>
              <div className="sidebar-card">
                <h3>Excerpt</h3>
                <p className="hint">Short summary shown on the blog listing page.</p>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="side-textarea" maxLength={300} />
                <span className="char-count">{excerpt.length}/300</span>
              </div>
              <div className="sidebar-card">
                <h3>SEO Meta Description</h3>
                <p className="hint">Shown in Google search results. Keep under 160 characters.</p>
                <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="side-textarea" maxLength={160} />
                <span className={`char-count ${metaDescription.length > 155 ? 'warn' : ''}`}>{metaDescription.length}/160</span>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`${editorStyles}`}</style>
    </>
  )
}
