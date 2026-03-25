import { useEffect, useRef } from 'react'

export default function Cursor() {
  const c1 = useRef(null)
  const c2 = useRef(null)

  useEffect(() => {
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let fx = mx, fy = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (c1.current) {
        c1.current.style.left = mx + 'px'
        c1.current.style.top  = my + 'px'
      }
    }

    const loop = () => {
      fx += (mx - fx) * 0.11
      fy += (my - fy) * 0.11
      if (c2.current) {
        c2.current.style.left = fx + 'px'
        c2.current.style.top  = fy + 'px'
      }
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    loop()

    // Enlarge cursor on interactive elements
    const targets = document.querySelectorAll('a, button, .svc-card, .vtile, .lb-card')
    const enter = () => document.body.classList.add('hov')
    const leave = () => document.body.classList.remove('hov')
    targets.forEach((el) => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach((el) => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave) })
    }
  }, [])

  return (
    <>
      <div id="cur"  ref={c1} />
      <div id="cur2" ref={c2} />
    </>
  )
}
