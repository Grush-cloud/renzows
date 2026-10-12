import { useEffect } from 'react'

/**
 * Finds all page <video data-src="..."> elements (not the lightbox's) and:
 * - Lazy-loads the src when the tile scrolls into view
 * - Plays the video automatically (muted, so browsers allow it)
 * - Pauses when the tile leaves the viewport (saves bandwidth)
 *
 * @param {array} deps - re-scan when these change (e.g. after projects load)
 */
export function useVideoAutoplay(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target

          if (entry.isIntersecting) {
            // Lazy load
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src
            }
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    // The closed lightbox is transparent but still "on screen" — leave its videos to Lightbox.jsx
    document.querySelectorAll('video[data-src]').forEach((v) => {
      if (!v.closest('.lb')) observer.observe(v)
    })
    return () => observer.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
