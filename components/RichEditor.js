import { useEffect, useRef } from 'react'

export default function RichEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const isInternalUpdate = useRef(false)

  // Set initial content and handle external value changes
  useEffect(() => {
    if (!editorRef.current) return
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }
    // Only update DOM if value actually differs (avoids cursor reset)
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Prevent toolbar buttons from stealing focus
  function handleToolbarMouseDown(e) {
    e.preventDefault()
  }

  function saveAndExec(fn) {
    editorRef.current?.focus()
    fn()
    syncContent()
  }

  function syncContent() {
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML || '')
  }

  function fmt(cmd, val = null) {
    saveAndExec(() => document.execCommand(cmd, false, val))
  }

  function insertBlock(tag) {
    saveAndExec(() => document.execCommand('formatBlock', false, tag))
  }

  function applyColor(color) {
    saveAndExec(() => document.execCommand('foreColor', false, color))
  }

  function insertCallout() {
    editorRef.current?.focus()
    const sel = window.getSelection()
    const text = sel?.toString() || 'Key point here...'
    const div = document.createElement('div')
    div.className = 'callout'
    div.setAttribute('style', 'background:rgba(196,30,58,0.12);border:1px solid rgba(196,30,58,0.35);border-left:4px solid #c41e3a;border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;color:#f5f5f5;font-weight:500;')
    div.textContent = text
    if (sel?.rangeCount) {
      const range = sel.getRangeAt(0)
      range.deleteContents()
      range.insertNode(div)
      range.setStartAfter(div)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    } else {
      editorRef.current.appendChild(div)
    }
    syncContent()
  }

  function insertLink() {
    // Snapshot selection before prompt steals focus
    const sel = window.getSelection()
    let savedRange = null
    if (sel?.rangeCount) savedRange = sel.getRangeAt(0).cloneRange()
    const url = prompt('Enter URL (e.g. https://example.com):')
    if (!url?.trim()) return
    editorRef.current?.focus()
    if (savedRange) {
      const s = window.getSelection()
      s.removeAllRanges()
      s.addRange(savedRange)
    }
    const currentSel = window.getSelection()
    if (currentSel?.toString().trim() === '') {
      document.execCommand('insertHTML', false, `<a href="${url.trim()}">${url.trim()}</a>`)
    } else {
      document.execCommand('createLink', false, url.trim())
    }
    syncContent()
  }

  function insertDivider() {
    editorRef.current?.focus()
    document.execCommand('insertHTML', false, '<hr/><p><br></p>')
    syncContent()
  }

  return (
    <div className="rich-editor-wrap">
      <div className="rich-toolbar" onMouseDown={handleToolbarMouseDown}>
        <div className="tb-group">
          <button type="button" className="tb-btn" onClick={() => fmt('bold')}><b>B</b></button>
          <button type="button" className="tb-btn" onClick={() => fmt('italic')}><i>I</i></button>
          <button type="button" className="tb-btn" onClick={() => fmt('underline')}><u>U</u></button>
        </div>
        <div className="tb-group">
          <button type="button" className="tb-btn" onClick={() => insertBlock('h2')}>H2</button>
          <button type="button" className="tb-btn" onClick={() => insertBlock('h3')}>H3</button>
          <button type="button" className="tb-btn" onClick={() => insertBlock('p')}>P</button>
        </div>
        <div className="tb-group">
          <button type="button" className="tb-btn" onClick={() => fmt('insertUnorderedList')}>• List</button>
          <button type="button" className="tb-btn" onClick={() => fmt('insertOrderedList')}>1. List</button>
        </div>
        <div className="tb-group">
          <button type="button" className="tb-btn" onClick={() => insertBlock('blockquote')}>Quote</button>
          <button type="button" className="tb-btn" onClick={insertCallout}>Callout</button>
          <button type="button" className="tb-btn" onClick={insertDivider}>— Rule</button>
        </div>
        <div className="tb-group">
          <button type="button" className="tb-btn" onClick={insertLink}>Link</button>
          <button type="button" className="tb-btn" onClick={() => fmt('removeFormat')}>Clear</button>
        </div>
        <div className="tb-group tb-colors">
          <span className="tb-label">Color</span>
          <span className="color-dot" style={{background:'#ffd700'}} onClick={() => applyColor('#ffd700')} title="Gold" />
          <span className="color-dot" style={{background:'#c41e3a'}} onClick={() => applyColor('#c41e3a')} title="Red" />
          <span className="color-dot" style={{background:'#f5f5f5'}} onClick={() => applyColor('#f5f5f5')} title="White" />
          <span className="color-dot" style={{background:'#4caf50'}} onClick={() => applyColor('#4caf50')} title="Green" />
        </div>
      </div>

      <div
        ref={editorRef}
        className="rich-body"
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        data-placeholder="Write your post here. Highlight text and use the toolbar to format — no HTML needed..."
      />

      <style jsx>{`
        .rich-editor-wrap {
          border: 1px solid rgba(80,80,80,0.3);
          border-radius: 8px;
          overflow: hidden;
        }
        .rich-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          padding: 8px 12px;
          background: rgba(20,20,20,0.9);
          border-bottom: 1px solid rgba(80,80,80,0.3);
          align-items: center;
        }
        .tb-group {
          display: flex;
          gap: 3px;
          align-items: center;
          padding-right: 8px;
          border-right: 1px solid rgba(255,255,255,0.08);
          margin-right: 3px;
        }
        .tb-group:last-child { border-right: none; }
        .tb-btn {
          padding: 4px 9px;
          background: rgba(80,80,80,0.3);
          border: 1px solid rgba(80,80,80,0.4);
          color: #d4d4d4;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .tb-btn:hover { background: rgba(196,30,58,0.3); border-color: #c41e3a; color: #fff; }
        .tb-label { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.08em; margin-right: 4px; }
        .tb-colors { align-items: center; }
        .color-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.15);
          cursor: pointer;
          display: inline-block;
          transition: transform 0.15s;
        }
        .color-dot:hover { transform: scale(1.25); border-color: #fff; }

        .rich-body {
          min-height: 500px;
          padding: 1.25rem 1.5rem;
          background: rgba(0,0,0,0.5);
          color: #f5f5f5;
          font-size: 0.95rem;
          line-height: 1.8;
          outline: none;
        }
        .rich-body:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.18);
          pointer-events: none;
        }
        .rich-body :global(h2) { color: #ffd700; font-size: 1.5rem; font-weight: 800; margin: 32px 0 12px; }
        .rich-body :global(h3) { color: #c41e3a; font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin: 24px 0 10px; }
        .rich-body :global(p) { margin-bottom: 16px; }
        .rich-body :global(strong) { color: #fff; font-weight: 700; }
        .rich-body :global(blockquote) { border-left: 3px solid #c41e3a; padding: 12px 18px; margin: 20px 0; background: rgba(196,30,58,0.08); color: #f0f0f0; font-style: italic; }
        .rich-body :global(ul), .rich-body :global(ol) { padding-left: 24px; margin-bottom: 16px; }
        .rich-body :global(li) { margin-bottom: 6px; }
        .rich-body :global(a) { color: #ffd700; text-decoration: underline; }
        .rich-body :global(hr) { border: none; border-top: 1px solid rgba(196,30,58,0.3); margin: 32px 0; }
      `}</style>
    </div>
  )
}
