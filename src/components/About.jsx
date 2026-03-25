export default function About() {
  return (
    <section className="about" id="about">

      {/* Left — dark quote panel */}
      <div className="about-dark">
        <div className="about-grid" />
        <div className="about-ghost">RED</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-mark" />
          <p className="about-quote">
            Where vision meets <em>precision</em> — and every detail
            tells a story worth remembering.
          </p>
        </div>
      </div>

      {/* Right — text panel */}
      <div className="about-light">
        <p className="label rv">Our Story</p>
        <h2 className="sec-title rv d1">Design that<br />moves <em>people.</em></h2>

        <p className="sec-body rv d2">
          At RenzowsEventDesign, we believe the most powerful events aren't
          just seen — they're felt. We bring together creative vision, meticulous
          planning, and an obsessive eye for detail to craft experiences that resonate.
        </p>
        <p className="sec-body rv d3" style={{ marginTop: 18 }}>
          Whether an intimate dinner or a grand corporate gala, we pour the same
          passion into every moment we design. No two events are ever the same here.
        </p>

        <div className="stats rv d4">
          <div className="stat">
            <div className="stat-n">8<sup>+</sup></div>
            <div className="stat-l">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-n">200<sup>+</sup></div>
            <div className="stat-l">Events Designed</div>
          </div>
          <div className="stat">
            <div className="stat-n">100<sup>%</sup></div>
            <div className="stat-l">Client Satisfaction</div>
          </div>
        </div>
      </div>

    </section>
  )
}
