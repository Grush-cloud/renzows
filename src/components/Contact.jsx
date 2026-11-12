import PlanFlow from './PlanFlow'

export default function Contact() {
  return (
    <section className="contact" id="contact">

      {/* Left — info */}
      <div>
        <p className="label rv">Get In Touch</p>
        <h2 className="sec-title rv d1">
          Let's create<br />something <em>extraordinary.</em>
        </h2>
        <p className="sec-body rv d2">
          Ready to bring your vision to life? We'd love to hear about your event.
          Reach out and let's start the conversation.
        </p>

        <div className="contact-detail rv d3">
          <div>
            <p className="cd-label">Email</p>
            {/* TODO: replace with real email */}
            <p className="cd-val">hello@renzowsevents.com</p>
          </div>
          <div>
            <p className="cd-label">Phone</p>
            {/* TODO: replace with real phone */}
            <p className="cd-val">+1 (555) 000 0000</p>
          </div>
          <div>
            <p className="cd-label">Based In</p>
            <p className="cd-val">Available Worldwide</p>
          </div>
        </div>
      </div>

      {/* Right — the enquiry, as a tap-through brief */}
      <div className="rv d2">
        <PlanFlow brand="events" />
      </div>

    </section>
  )
}
