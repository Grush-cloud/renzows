import { FOUNDER_CREDS } from '../constants'

/**
 * Founder section — split layout with photo on left, bio on right.
 *
 * TO ADD A REAL PHOTO:
 * Replace the .founder-img-ph block with:
 *   <img src="/founder.jpg" alt="Owner Name" />
 * (place the photo in /public/founder.jpg)
 */
export default function Founder() {
  return (
    <section className="founder" id="founder">

      {/* Left — photo */}
      <div className="founder-img rv">
        <img src="/founder.jpg" alt="Founder, Renzow's Event Design" />

        {/* Floating quote card */}
        <div className="founder-qcard rv d2">
          <p className="founder-qtext">
            "Every event is a blank canvas. My job is to make sure
            it becomes someone's favourite memory."
          </p>
          <p className="founder-qattr">— Founder, RenzowsEventDesign</p>
        </div>
      </div>

      {/* Right — text */}
      <div className="founder-text">
        <p className="label rv">Meet the Founder</p>

        <h2 className="founder-name rv d1">
          The person<br />behind the <em>magic.</em>
        </h2>

        <p className="founder-role rv d2">Founder & Creative Director</p>

        <p className="founder-bio rv d2">
          With over eight years in the world of event design, our founder built
          RenzowsEventDesign on a simple but powerful belief — that the most
          memorable events are the ones that feel deeply personal. Every detail,
          every texture, every moment of surprise is intentional.
        </p>

        <p className="founder-bio rv d3">
          From small, intimate celebrations to large-scale corporate productions,
          the same warmth, precision, and creative energy goes into every single
          event. Clients don't just get a service — they get a partner who
          genuinely cares about making their vision come to life.
        </p>

        <div className="founder-creds rv d4">
          {FOUNDER_CREDS.map((cred) => (
            <span key={cred} className="founder-cred">{cred}</span>
          ))}
        </div>
      </div>

    </section>
  )
}
