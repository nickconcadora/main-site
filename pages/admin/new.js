import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from '../../lib/session'
import RichEditor from '../../components/RichEditor'

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  if (!session.isAdmin) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }
  return { props: {} }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('write')

  function handleTitleChange(e) {
    const val = e.target.value
    setTitle(val)
    setSlug(slugify(val))
  }

  async function handleSave(publishOverride) {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || slugify(title),
          excerpt: excerpt.trim(),
          content: content.trim(),
          meta_description: metaDescription.trim(),
          published: publishOverride !== undefined ? publishOverride : published,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        router.push('/admin')
      } else {
        setError(data.error || 'Failed to save post.')
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
        <title>New Post - TTW Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="editor-layout">
        <header className="editor-header">
          <div className="header-left">
            <Link href="/admin" className="back-link">← Dashboard</Link>
            <h1>New Post</h1>
          </div>
          <div className="header-actions">
            <button onClick={() => handleSave(false)} disabled={saving} className="save-draft-btn">
              Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="publish-btn">
              {saving ? 'Saving...' : 'Publish'}
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
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div className="field">
                <div className="tab-bar">
                  <button
                    className={tab === 'write' ? 'active' : ''}
                    onClick={() => setTab('write')}
                  >
                    Write
                  </button>
                  <button
                    className={tab === 'preview' ? 'active' : ''}
                    onClick={() => setTab('preview')}
                  >
                    Preview
                  </button>
                </div>

                {tab === 'write' ? (
                  <>
                    <RichEditor value={content} onChange={setContent} />
                  </>
                ) : (
                  <div
                    className="preview-box post-content"
                    dangerouslySetInnerHTML={{ __html: content || '<p style="color:#666">Nothing to preview yet.</p>' }}
                  />
                )}
              </div>
            </div>

            <div className="editor-sidebar">
              <div className="sidebar-card">
                <h3>Status</h3>
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  <span>{published ? 'Published' : 'Draft'}</span>
                </label>
              </div>

              <div className="sidebar-card">
                <h3>Excerpt</h3>
                <p className="hint">Short summary shown on the blog listing page.</p>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short summary of this post..."
                  rows={3}
                  className="side-textarea"
                  maxLength={300}
                />
                <span className="char-count">{excerpt.length}/300</span>
              </div>

              <div className="sidebar-card">
                <h3>SEO Meta Description</h3>
                <p className="hint">Shown in Google search results. Keep under 160 characters.</p>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO description..."
                  rows={3}
                  className="side-textarea"
                  maxLength={160}
                />
                <span className={`char-count ${metaDescription.length > 155 ? 'warn' : ''}`}>
                  {metaDescription.length}/160
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        ${editorStyles}
      `}</style>
    </>
  )
}

export const editorStyles = `
  .editor-layout { min-height: 100vh; background: #0D0D0D; }
  .editor-header {
    background: rgba(10,10,10,0.98);
    border-bottom: 2px solid #c41e3a;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
    gap: 1rem;
  }
  .header-left { display: flex; align-items: center; gap: 1.5rem; }
  .back-link { color: #888; font-size: 0.85rem; text-decoration: none; white-space: nowrap; }
  .back-link:hover { color: #ffd700; }
  h1 { font-size: 1.25rem; font-weight: 700; color: #f5f5f5; }
  .header-actions { display: flex; gap: 0.75rem; }
  .save-draft-btn {
    padding: 0.6rem 1.25rem;
    background: rgba(80,80,80,0.3);
    color: #d4d4d4;
    border: 1px solid rgba(80,80,80,0.5);
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  .save-draft-btn:hover:not(:disabled) { background: rgba(80,80,80,0.5); }
  .publish-btn {
    padding: 0.6rem 1.25rem;
    background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    transition: all 0.2s ease;
  }
  .publish-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(196,30,58,0.4); }
  .publish-btn:disabled, .save-draft-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .editor-main { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
  .error-banner {
    background: rgba(196,30,58,0.15);
    border: 1px solid #c41e3a;
    color: #ff6b6b;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
  .editor-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .editor-primary { display: flex; flex-direction: column; gap: 1rem; }
  .field { display: flex; flex-direction: column; gap: 0.5rem; }
  .title-input {
    width: 100%;
    padding: 1rem;
    background: rgba(0,0,0,0.4);
    border: 2px solid rgba(80,80,80,0.3);
    border-radius: 10px;
    color: #f5f5f5;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    transition: border-color 0.2s ease;
  }
  .title-input:focus { outline: none; border-color: #c41e3a; }
  .title-input::placeholder { color: #555; }
  .slug-field label { color: #888; font-size: 0.85rem; }
  .slug-preview {
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(80,80,80,0.3);
    border-radius: 8px;
    overflow: hidden;
  }
  .slug-preview span {
    padding: 0.6rem 0.75rem;
    background: rgba(80,80,80,0.2);
    color: #666;
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .slug-preview input {
    flex: 1;
    padding: 0.6rem 0.75rem;
    background: none;
    border: none;
    color: #f5f5f5;
    font-size: 0.85rem;
  }
  .slug-preview input:focus { outline: none; }
  .tab-bar {
    display: flex;
    gap: 0;
    border-bottom: 2px solid rgba(80,80,80,0.3);
    margin-bottom: 0;
  }
  .tab-bar button {
    padding: 0.6rem 1.25rem;
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s ease;
  }
  .tab-bar button.active { color: #ffd700; border-bottom-color: #c41e3a; }
  .tab-bar button:hover:not(.active) { color: #f5f5f5; }
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding: 0.75rem;
    background: rgba(20,20,20,0.8);
    border: 1px solid rgba(80,80,80,0.3);
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }
  .toolbar-btn {
    padding: 0.3rem 0.65rem;
    background: rgba(80,80,80,0.3);
    border: 1px solid rgba(80,80,80,0.4);
    color: #d4d4d4;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .toolbar-btn:hover { background: rgba(196,30,58,0.3); color: #f5f5f5; border-color: #c41e3a; }
  .content-textarea {
    width: 100%;
    min-height: 500px;
    padding: 1.25rem;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(80,80,80,0.3);
    border-radius: 0 0 8px 8px;
    color: #f5f5f5;
    font-size: 0.95rem;
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    line-height: 1.7;
    resize: vertical;
    transition: border-color 0.2s ease;
  }
  .content-textarea:focus { outline: none; border-color: rgba(196,30,58,0.5); }
  .preview-box {
    min-height: 500px;
    padding: 1.5rem;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(80,80,80,0.3);
    border-radius: 0 0 8px 8px;
    color: #f5f5f5;
  }
  .preview-box h2 { color: #ffd700; font-size: 1.5rem; font-weight: 800; margin: 32px 0 12px; }
  .preview-box h3 { color: #c41e3a; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin: 24px 0 10px; }
  .preview-box p { margin-bottom: 16px; }
  .preview-box strong { color: #fff; font-weight: 700; }
  .preview-box blockquote { border-left: 3px solid #c41e3a; padding: 12px 18px; margin: 20px 0; background: rgba(196,30,58,0.08); color: #f0f0f0; }
  .preview-box a { color: #ffd700; }
  .preview-box ul, .preview-box ol { padding-left: 24px; margin-bottom: 16px; }
  .preview-box hr { border: none; border-top: 1px solid rgba(196,30,58,0.3); margin: 32px 0; }
  .editor-sidebar { display: flex; flex-direction: column; gap: 1rem; }
  .sidebar-card {
    background: rgba(20,20,20,0.8);
    border: 1px solid rgba(80,80,80,0.3);
    border-radius: 10px;
    padding: 1.25rem;
  }
  .sidebar-card h3 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
  }
  .hint { font-size: 0.8rem; color: #666; margin-bottom: 0.75rem; line-height: 1.4; }
  .toggle-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: #f5f5f5;
    font-size: 0.9rem;
  }
  .side-textarea {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(80,80,80,0.3);
    border-radius: 6px;
    color: #f5f5f5;
    font-size: 0.85rem;
    resize: vertical;
    line-height: 1.5;
  }
  .side-textarea:focus { outline: none; border-color: rgba(196,30,58,0.5); }
  .char-count { font-size: 0.75rem; color: #555; display: block; text-align: right; margin-top: 0.25rem; }
  .char-count.warn { color: #FF3B30; }
  @media (max-width: 900px) {
    .editor-grid { grid-template-columns: 1fr; }
    .editor-sidebar { order: -1; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); }
  }
  @media (max-width: 600px) {
    .editor-header { flex-wrap: wrap; }
    .header-actions { width: 100%; }
    .publish-btn, .save-draft-btn { flex: 1; }
  }
`
