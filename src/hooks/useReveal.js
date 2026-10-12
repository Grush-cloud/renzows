import { useEffect } from 'react'

/**
 * Observes all elements with class "rv" and adds "in" when they
 * enter the viewport — triggering the scroll-reveal animation.
 *
 * @param {array} deps - re-scan when these change (e.g. after projects load)
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.rv:not(.in)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
