import { useEffect } from 'react'

/**
 * Observes all elements with class "rv" and adds "in" when they
 * enter the viewport — triggering the scroll-reveal animation.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}
