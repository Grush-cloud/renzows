import { SERVICES } from '../constants'

export default function Services() {
  return (
    <section className="services" id="services">

      <div className="services-top">
        <div>
          <p className="label rv">What We Do</p>
          <h2 className="sec-title rv d1" style={{ marginBottom: 0 }}>
            Every occasion<br />deserves <em>excellence.</em>
          </h2>
        </div>
        <a href="#contact" className="btn-ghost rv">
          Discuss your event <span className="arr">→</span>
        </a>
      </div>

      <div className="svc-grid">
        {SERVICES.map((svc, i) => (
          <div key={svc.num} className={`svc-card rv ${i > 0 ? 'd' + i : ''}`}>
            <div className="svc-num">{svc.num}</div>
            <h3 className="svc-title">{svc.title}</h3>
            <p className="svc-desc">{svc.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
