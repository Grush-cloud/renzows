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

      {/* Right — form */}
      {/* TODO: wire up form submission (e.g. EmailJS, Formspree, or your own API) */}
      <div className="rv d2">
        <div className="form-row2">
          <div className="fg">
            <label>First Name</label>
            <input type="text" placeholder="Your first name" />
          </div>
          <div className="fg">
            <label>Last Name</label>
            <input type="text" placeholder="Your last name" />
          </div>
        </div>

        <div className="fg">
          <label>Email Address</label>
          <input type="email" placeholder="your@email.com" />
        </div>

        <div className="fg">
          <label>Event Type</label>
          <select defaultValue="">
            <option value="" disabled>Select event type</option>
            <option>Corporate Event</option>
            <option>Wedding</option>
            <option>Brand Activation</option>
            <option>Private Celebration</option>
            <option>Other</option>
          </select>
        </div>

        <div className="fg">
          <label>Tell us about your vision</label>
          <textarea placeholder="Describe your event, date, size, and anything else..." />
        </div>

        <div className="form-btn">
          <button type="button"><span>Send Message →</span></button>
        </div>
      </div>

    </section>
  )
}
