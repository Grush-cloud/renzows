import { CAT_LABELS } from '../../constants'

/**
 * VTile — a single tile in the portfolio grid.
 * Handles both video and image media types.
 *
 * @param {object}  project  - { id, name, cat, url, type }
 * @param {boolean} isHero   - if true, tile spans 2 rows (big featured tile)
 */
export default function VTile({ project, isHero }) {
  const isVideo = project.type === 'video'

  return (
    <div className={`vtile ${isHero ? 'hero-t' : ''} ${isVideo ? 'vtile-video' : 'vtile-image'} rv`}>

     {/* Shimmer placeholder — only for videos */}
{isVideo && <div className="vtile-ph">{project.name}</div>}

      {/* Video — lazy loaded via data-src, played by useVideoAutoplay hook */}
      {project.url && isVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          data-src={project.url}
        />
      )}

      {/* Image */}
      {project.url && !isVideo && (
  <img
    src={project.url}
    alt={project.name}
    loading="lazy"
    onLoad={(e) => {
      const ph = e.target.closest('.vtile').querySelector('.vtile-ph')
      if (ph) ph.style.opacity = 'none'
    }}
  />
)}

      {/* "Playing" pill — only for videos */}
      {isVideo && (
        <div className="vtile-pill">
          <span className="vtile-pill-dot" />
          Playing
        </div>
      )}

      {/* Event info — slides up on hover */}
      <div className="vtile-info">
        <p className="vtile-cat">{CAT_LABELS[project.cat]}</p>
        <p className="vtile-name">{project.name}</p>
      </div>

    </div>
  )
}
