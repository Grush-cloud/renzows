import { useState } from 'react'
import { SETS_CATS, SETS_CAT_LABELS } from '../constants/sets'
import { useVideoAutoplay } from '../hooks/useVideoAutoplay'
import { useReveal } from '../hooks/useReveal'
import '../styles/sets.css'

/**
 * SetsPage — SetsByRenzows
 * Set design and Prop rentals
 *
 * @param {array}    projects  - sets project list from Cloudinary / demo
 * @param {function} onEnquire - scrolls to enquiry section
 */
export default function SetsPage({ projects }) {
  const [filter, setFilter] = useState('all')

  useReveal()
  useVideoAutoplay()

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.cat === filter)

  return (
    <div className="sets-page">

      {/* ── Hero ── */}
      <section className="sets-hero" id="home">
        <div className="sets-hero-mesh" />
        <div className="sets-hero-petal" />

        <p className="sets-hero-tag">Set Design &amp; Prop Rentals</p>

        <h1 className="sets-hero-h1">
          <span className="sets-hero-line a1">Every frame</span>
          <span className="sets-hero-line a2">deserves a <em>set</em></span>
          <span className="sets-hero-line a3">worth shooting.</span>
        </h1>

        <p className="sets-hero-sub">
          Bespoke sets and curated prop rentals for photographers,
          creatives, and brands who refuse to settle for ordinary backdrops.
        </p>

        <div className="sets-hero-actions">
          <a href="#enquire" className="btn-sets">
            <span>Book a Set</span>
          </a>
          <a href="#work" className="btn-ghost">
            See the work <span className="arr">→</span>
          </a>
        </div>

        <div className="sets-hero-scroll">
          <div className="sets-hero-scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Intro strip ── */}
      <section className="sets-intro">
        <div className="sets-intro-left rv">
          <p className="label">What We Do</p>
          <h2 className="sets-intro-title">
            Spaces designed<br />for the <em>lens.</em>
          </h2>
        </div>
        <div className="sets-intro-right rv d2">
          <p className="sets-intro-body">
            SetsByRenzows creates immersive, camera-ready environments for
            photoshoots, video productions, and brand campaigns. From intimate
            portrait studios to full editorial productions — we design the
            world your images live in.
          </p>
          <p className="sets-intro-body">
            Need props without the full set? Our curated rental collection
            brings texture, character, and story to any shoot.
          </p>
          <div className="sets-offerings">
            <span className="sets-offering">Set Design</span>
            <span className="sets-offering">Prop Rentals</span>
            <span className="sets-offering">Editorial</span>
            <span className="sets-offering">Commercial</span>
            <span className="sets-offering">Fashion</span>
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section className="sets-portfolio" id="work">
        <div className="sets-portfolio-top">
          <div>
            <p className="label rv" style={{ '--m': 'var(--sp1)' }}>Portfolio</p>
            <h2 className="sec-title rv d1" style={{ marginBottom: 0 }}>
              Sets we've<br /><em>brought to life.</em>
            </h2>
          </div>
          {/* Category filters */}
          <div className="sets-filters rv d2">
            {SETS_CATS.map((cat) => (
              <button
                key={cat}
                className={`sets-filter ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {SETS_CAT_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        <div className="sets-grid">
          {filtered.length === 0 && (
            <p className="sets-empty">No projects in this category yet.</p>
          )}
      {filtered.map((project, i) => (
  <div key={project.id} className={`sets-tile ${project.type === 'video' ? 'sets-video' : 'sets-image'} rv`} style={{ transitionDelay: `${i * 45}ms` }}>
    {/* Shimmer placeholder — only for videos */}
    {project.type === 'video' && <div className="sets-tile-ph">{project.name}</div>}

    {/* Media */}
    {project.url && project.type === 'image' && (
      <img
        src={project.url}
        alt={project.name}
        loading="lazy"
      />
    )}
              {project.url && project.type === 'video' && (
                <video autoPlay muted loop playsInline preload="none" data-src={project.url} />
              )}

              {/* Info on hover */}
              <div className="sets-tile-info">
                <p className="sets-tile-cat">{SETS_CAT_LABELS[project.cat]}</p>
                <p className="sets-tile-name">{project.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enquiry ── */}
      <section className="sets-enquiry" id="enquire">
        <div className="sets-enquiry-glow" />

        <div className="sets-enquiry-top rv">
          <p className="sets-enquiry-label">Get In Touch</p>
          <h2 className="sets-enquiry-title">
            Let's build your<br /><em>perfect set.</em>
          </h2>
          <p className="sets-enquiry-sub">
            Tell us about your shoot — the concept, the mood, the scale.
            We'll design a space that makes every frame extraordinary.
          </p>
          <div className="sets-contact-detail">
            <div>
              <p className="sets-cd-label">Email</p>
              {/* TODO: replace with real Sets email */}
              <p className="sets-cd-val">sets@renzowsevents.com</p>
            </div>
            <div>
              <p className="sets-cd-label">Instagram</p>
              <p className="sets-cd-val">@setsbyrenzows</p>
            </div>
            <div>
              <p className="sets-cd-label">Available</p>
              <p className="sets-cd-val">By Appointment</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="sets-form rv d2">
          <div className="sets-form-inner">

            <div className="sets-form-row2">
              <div className="sets-fg">
                <label>First Name</label>
                <input type="text" placeholder="Your first name" />
              </div>
              <div className="sets-fg">
                <label>Last Name</label>
                <input type="text" placeholder="Your last name" />
              </div>
            </div>

            <div className="sets-fg">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" />
            </div>

            <div className="sets-fg">
              <label>Enquiry Type</label>
              <select defaultValue="">
                <option value="" disabled>What are you looking for?</option>
                <option>Full Set Design</option>
                <option>Prop Rental</option>
                <option>Set Design + Props</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="sets-fg">
              <label>Shoot Date</label>
              <input type="text" placeholder="Approximate date or timeframe" />
            </div>

            <div className="sets-fg">
              <label>Tell us about your shoot</label>
              <textarea placeholder="Concept, mood, references, team size — anything helps..." />
            </div>

            <div className="sets-form-btn">
              {/* TODO: wire to EmailJS, Formspree, or your own API */}
              <button type="button">
                <span>Send Enquiry →</span>
              </button>
            </div>

          </div>
        </div>

      </section>

    </div>
  )
}
