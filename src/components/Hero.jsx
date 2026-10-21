import { useState, useEffect } from 'react'
import { CLOUD_NAME } from '../config/cloudinary'

const base = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`

// Clips are cut and slowed to half speed by Cloudinary on first request (then cached).
const clip   = (id, so, eo, w) => `${base}/so_${so},eo_${eo},w_${w},q_auto,e_accelerate:-50/${id}.mp4`
const poster = (id, so, w)     => `${base}/so_${so},w_${w},q_auto,f_auto/${id}.jpg`
const media  = (id, so, eo, label) => ({
  key: `${id}@${so}`,
  label,
  poster: (w) => poster(id, so, w),
  video:  (w) => clip(id, so, eo, w),
})

// ── Events ──────────────────────────────────────────────────────
const WEDDING = 'Caleb_and_Faith_s_love_story_beautifully_designed_Event_Decor-_renzowseventdesignEvent_Planner_xvs2vu'
const CANOPY  = 'A_decor_vision_inspired_by_MummyD_modelefatoyinbo_captured_and_executed_by_us_renzowseventdesi_iol4il'
const ROOFTOP = 'From_the_lighting_to_the_layout_every_detail_plays_its_part._Creating_a_dinner_setup_that_feels_umlvua'

// Faith & Caleb: wide ballroom (0–1.9s) + floral-ceiling close-up (3–3.95s) spliced into one loop
const wedding = {
  key: WEDDING,
  label: 'Wedding',
  poster: (w) => poster(WEDDING, 0, w),
  video:  (w) => `${base}/so_0,eo_1.9,w_${w},q_auto/l_video:${WEDDING},so_3,eo_3.95,w_${w},fl_splice/fl_layer_apply/e_accelerate:-50/${WEDDING}.mp4`,
}

// ── SetsByRenzows ───────────────────────────────────────────────
// The floral disco set build — no people in frame, so it's safe for the hero
const DISCO = 'Our_client_reached_out_and_said_I_want_a_floral_disco_set_that_will_be_suitable_for_an_English_yvzry7'

const HEROES = {
  events: {
    // Desktop wall: three portrait columns, lead clip in the centre. 480px each = no upscaling at 1440.
    columns: [media(CANOPY, 0, 3, 'Birthday'), wedding, media(ROOFTOP, 0, 2.5, 'Private dinner')],
    lead: wedding,
    content: (
      <>
        <h1 className="hero-h1">
          <span className="hero-line a1">We turn spaces</span>
          <span className="hero-line a2">into <em>moments</em></span>
          <span className="hero-line a3">people talk about.</span>
        </h1>
        <p className="hero-sub">
          Event design &amp; décor in Nigeria for weddings, birthdays,
          corporate and private events.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-fill"><span>Plan Your Event</span></a>
          <a href="#work"    className="btn-ghost">See our work <span className="arr">→</span></a>
        </div>
      </>
    ),
  },
  sets: {
    columns: [
      media(DISCO, 0, 3.5,  'Floral wall'),
      media(DISCO, 8, 12,   'The full set'),
      media(DISCO, 4, 7.5,  'Florals & palms'),
    ],
    lead: media(DISCO, 8, 12, 'The full set'),
    content: (
      <>
        <h1 className="hero-h1">
          <span className="hero-line a1">Every frame</span>
          <span className="hero-line a2">deserves a <em>set</em></span>
          <span className="hero-line a3">worth shooting.</span>
        </h1>
        <p className="hero-sub">
          Bespoke photoshoot sets &amp; curated prop rentals for photographers,
          creatives and brands.
        </p>
        <div className="hero-actions">
          <a href="#enquire" className="btn-sets"><span>Book a Set</span></a>
          <a href="#work"    className="btn-ghost">See the work <span className="arr">→</span></a>
        </div>
      </>
    ),
  },
}

/** Poster URLs the hero shows first: three columns on desktop, one full-bleed still otherwise. */
export function heroPosters(brand, wide) {
  const { columns, lead } = HEROES[brand]
  return wide ? columns.map((m) => m.poster(480)) : [lead.poster(540)]
}

/**
 * Hero — shared by both brands.
 * Phones/tablets: the lead clip full-bleed. Desktop ≥1200px: three-column wall.
 *
 * @param {string} brand - 'events' | 'sets'
 */
export default function Hero({ brand = 'events' }) {
  const { columns, lead, content } = HEROES[brand]

  // Read on first render (client-only app) so phones never fetch the desktop wall, or vice versa
  const [wide, setWide]       = useState(() => window.matchMedia('(min-width: 1200px)').matches)
  const [motion]              = useState(() => !(navigator.connection?.saveData
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches))   // false → posters only
  const [sidesOn, setSidesOn] = useState(false)   // side clips wait until the lead one plays
  const [playing, setPlaying] = useState({})

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)')
    const onChange = (e) => setWide(e.matches)
    // Safari < 14 only has the old addListener API
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange)
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', onChange); else mq.removeListener(onChange) }
  }, [])

  const leadIndex = 1   // the centre column is the lead clip
  const w = wide ? 480 : 540

  const tile = (m, isLead, load) => (
    <>
      <img src={m.poster(w)} alt="" fetchpriority={isLead ? 'high' : undefined} />
      {motion && load && (
        <video
          src={m.video(w)}
          className={playing[m.key] ? 'on' : ''}
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => {
            setPlaying((p) => ({ ...p, [m.key]: true }))
            if (isLead) setSidesOn(true)
          }}
        />
      )}
    </>
  )

  return (
    <section className={`hero hero--${brand}`} id="home">

      <div className="hero-media" aria-hidden="true">
        {wide ? (
          <div className="hero-wall">
            {columns.map((m, i) => (
              <figure key={m.key} className="hero-col" style={{ '--i': i }}>
                {tile(m, i === leadIndex, i === leadIndex || sidesOn)}
              </figure>
            ))}
            {/* Own layer so the labels sit above the shading */}
            <div className="hero-labels">
              {columns.map((m) => <span key={m.key}>{m.label}</span>)}
            </div>
          </div>
        ) : (
          <figure className="hero-col hero-single">
            {tile(lead, true, true)}
          </figure>
        )}
      </div>

      <div className="hero-content">{content}</div>
    </section>
  )
}
