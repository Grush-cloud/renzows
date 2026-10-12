import { useState, useEffect, useRef } from 'react'
import { CATS, CAT_LABELS } from '../../constants'

/**
 * Lightbox — full-screen overlay showing all projects.
 * Filterable by category. Videos play only while it is open.
 *
 * @param {boolean}  open      - controls visibility
 * @param {function} onClose   - called when user closes
 * @param {array}    projects  - full list of project objects
 */
export default function Lightbox({ open, onClose, projects }) {
  const [filter, setFilter] = useState('all')
  const ref = useRef(null)

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.cat === filter)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Play videos while open, pause them all on close
  useEffect(() => {
    const videos = ref.current.querySelectorAll('video')
    if (!open) {
      videos.forEach((v) => v.pause())
      return
    }
    videos.forEach((v) => {
      if (!v.src && v.dataset.src) v.src = v.dataset.src
      v.play().catch(() => {})
    })
  }, [open, filter])

  return (
    <div
      ref={ref}
      className={`lb ${open ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="All projects"
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Header */}
      <div className="lb-head">
        <p className="lb-title">All Projects</p>

        <div className="lb-right">
          {/* Category filters */}
          <div className="lb-filters">
            {CATS.map((cat) => (
              <button
                key={cat}
                className={`lb-filter ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {CAT_LABELS[cat]}
              </button>
            ))}
          </div>

          <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>

      {/* Body */}
      <div className="lb-body">
        <p className="lb-count">
          <span>{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="lb-grid">
          {filtered.length === 0 && (
            <p className="lb-empty">No projects in this category yet.</p>
          )}

          {filtered.map((project, i) => {
            const isVideo = project.type === 'video'
            const label   = CAT_LABELS[project.cat] ?? project.cat
            return (
              <div
                key={project.id}
                className={`lb-card vis ${isVideo ? 'lb-video' : 'lb-image'}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {isVideo && <div className="lb-ph">{project.name}</div>}

                {project.url && isVideo && (
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={project.poster}
                    data-src={project.url}
                  />
                )}

                {project.url && !isVideo && (
                  <img src={project.url} alt={project.name} loading="lazy" />
                )}

                <span className="lb-badge">{label}</span>

                <div className="lb-info">
                  <p className="lb-info-cat">{label}</p>
                  <p className="lb-info-name">{project.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
