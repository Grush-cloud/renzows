import { useEffect } from 'react'

/**
 * Finds all <video data-src="..."> elements and:
 * - Lazy-loads the src when the tile scrolls into view
 * - Plays the video automatically (muted, so browsers allow it)
 * - Pauses when the tile leaves the viewport (saves bandwidth)
 */
export function useVideoAutoplay() {
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

    document.querySelectorAll('video[data-src]').forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  })
}
