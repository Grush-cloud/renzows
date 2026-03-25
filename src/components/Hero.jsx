export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Decorative structural lines (desktop only, CSS-animated) */}
      <div className="h-vline" />
      <div className="h-hline" />
      <div className="h-corner" />

      {/* Large background watermark */}
      <div className="hero-num">RED</div>

      <p className="hero-tag">Event Design Studio</p>

      <h1 className="hero-h1">
        <span className="hero-line a1">We craft</span>
        <span className="hero-line a2"><em>moments</em> that</span>
        <span className="hero-line a3">stay with you.</span>
      </h1>

      <p className="hero-sub">
        From intimate gatherings to grand productions — every event we touch
        becomes an experience that resonates long after the last guest leaves.
      </p>

      <div className="hero-actions">
        <a href="#contact" className="btn-fill"><span>Start a Project</span></a>
        <a href="#work"    className="btn-ghost">View Our Work <span className="arr">→</span></a>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
