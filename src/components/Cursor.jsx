import { useEffect, useRef } from 'react'

const MAX_SPARKLES = 18   // cap live sparkles so fast mouse moves stay cheap
const GAP = 22            // px of travel between sparkles

// One ✦ that animates and removes itself
function sparkle(x, y, brand) {
  const s = document.createElement('span')
  s.className = `sparkle sparkle--${brand}`
  s.textContent = '✦'
  s.style.left = `${x}px`
  s.style.top = `${y}px`
  s.style.setProperty('--size', `${8 + Math.random() * 8}px`)
  s.addEventListener('animationend', () => s.remove())
  document.body.appendChild(s)
  return s
}

/**
 * Cursor — a small brand dot that grows over links/buttons and leaves a short ✦ trail.
 * Mouse/trackpad only. On touch screens: a small ✦ burst where you tap instead.
 * Both off for reduced-motion.
 *
 * @param {string} brand - 'events' | 'sets' (sets uses the pink→lilac palette)
 */
export default function Cursor({ brand }) {
  const dot = useRef(null)
  const calm    = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const enabled = !calm && window.matchMedia('(hover: hover) and (pointer: fine)').matches

  // Touch: burst on tap. pointerdown is passive here, so the tap itself is never delayed.
  useEffect(() => {
    if (calm || enabled) return
    const onTap = (e) => {
      if (e.pointerType !== 'touch') return
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + Math.random() * 0.5
        const s = sparkle(e.clientX, e.clientY, brand)
        s.style.setProperty('--dx', `${Math.cos(a) * 34}px`)
        s.style.setProperty('--dy', `${Math.sin(a) * 34}px`)
        s.classList.add('burst')
      }
    }
    window.addEventListener('pointerdown', onTap, { passive: true })
    return () => window.removeEventListener('pointerdown', onTap)
  }, [calm, enabled, brand])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    let lx = 0, ly = 0, live = 0

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      dot.current.style.transform = `translate(${x}px, ${y}px)`
      // Grow over anything clickable; hide over text fields (the caret takes over)
      const t = e.target
      dot.current.classList.toggle('hov', !!t.closest?.('a, button, [role="button"], .vtile, .sets-tile, .lb-card'))
      dot.current.classList.toggle('off', !!t.closest?.('input, textarea, select'))

      if (Math.hypot(x - lx, y - ly) < GAP || live >= MAX_SPARKLES) return
      lx = x; ly = y; live++
      const s = sparkle(x, y, brand)
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 30}px`)
      s.addEventListener('animationend', () => live--)
    }
    const onLeave = () => dot.current.classList.add('off')
    const onEnter = () => dot.current.classList.remove('off')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('has-cursor')
      document.querySelectorAll('.sparkle').forEach((s) => s.remove())
    }
  }, [enabled, brand])

  if (!enabled) return null
  return <div ref={dot} className={`cursor cursor--${brand}`} aria-hidden="true" />
}
