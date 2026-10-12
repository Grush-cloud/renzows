import { useState, useEffect, useMemo } from 'react'
import Logo from './Logo'
import { heroPosters } from './Hero'

const DURATION = { events: 1500, sets: 1600 }   // ms, including the fade-out

/**
 * Intro — a short entrance played the first time each brand is opened in a session.
 * events: a red carpet rolls out toward the logo, then the room is revealed.
 * sets:   pieces of the hero image fly in and lock together into the page.
 * Skipped for reduced-motion visitors; tap/click/any key skips it.
 * The footer's "Replay intro" button fires 'rz-replay-intro' to play it again on request.
 * While it plays, <html class="intro-on"> holds the hero's own animations.
 */
export default function Intro({ brand }) {
  // Read-only here (React may run initializers twice); the flag is written in the effect
  const [show, setShow] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try { return !sessionStorage.getItem(`rz-intro-${brand}`) } catch { return true }
  })
  const [run, setRun] = useState(0)   // bumps on replay so the animations restart

  // Asked for explicitly, so it plays even with reduced motion on
  useEffect(() => {
    const onReplay = () => { setRun((r) => r + 1); setShow(true) }
    window.addEventListener('rz-replay-intro', onReplay)
    return () => window.removeEventListener('rz-replay-intro', onReplay)
  }, [])

  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem(`rz-intro-${brand}`, '1') } catch { /* storage blocked: plays each time */ }
    const root = document.documentElement
    root.classList.add('intro-on')
    const end = () => setShow(false)
    const t = setTimeout(end, DURATION[brand])
    window.addEventListener('keydown', end)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', end)
      root.classList.remove('intro-on')
    }
  }, [show, brand, run])

  if (!show) return null
  return (
    <div key={run} className={`intro intro--${brand}`} onClick={() => setShow(false)} aria-hidden="true">
      {brand === 'events' ? <RedCarpet /> : <Puzzle />}
    </div>
  )
}

function RedCarpet() {
  return (
    <>
      <div className="carpet-stage">
        <div className="carpet" />
      </div>
      <div className="carpet-logo"><Logo /></div>
    </>
  )
}

// Pieces carry slices of the hero stills, so the assembled picture *is* the page underneath
function Puzzle() {
  const pieces = useMemo(() => {
    const vw = window.innerWidth, vh = window.innerHeight
    const wide = window.matchMedia('(min-width: 1200px)').matches
    const posters = heroPosters('sets', wide)
    const cols = wide ? 6 : 3, rows = wide ? 3 : 4
    const colW = vw / posters.length            // width of each hero column
    const pw = vw / cols, ph = vh / rows
    const ratio = 16 / 9                       // posters are portrait 9:16

    const out = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * pw, y = r * ph
        const col = Math.min(posters.length - 1, Math.floor((x + 1) / colW))
        // object-fit: cover maths for this column's still
        const bw = Math.max(colW, vh / ratio), bh = bw * ratio
        const ox = col * colW + (colW - bw) / 2, oy = (vh - bh) / 2
        out.push({
          key: `${r}-${c}`,
          style: {
            left: x, top: y, width: Math.ceil(pw), height: Math.ceil(ph),
            backgroundImage: `url(${posters[col]})`,
            backgroundSize: `${bw}px ${bh}px`,
            backgroundPosition: `${ox - x}px ${oy - y}px`,
            '--dx': `${(Math.random() - 0.5) * 80}vw`,
            '--dy': `${(Math.random() - 0.5) * 80}vh`,
            '--rot': `${(Math.random() - 0.5) * 60}deg`,
            '--delay': `${Math.random() * 0.35}s`,
          },
        })
      }
    }
    return out
  }, [])

  return pieces.map((p) => <div key={p.key} className="piece" style={p.style} />)
}
