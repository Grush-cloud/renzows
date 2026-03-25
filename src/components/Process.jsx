import { PROCESS_STEPS } from '../constants'

export default function Process() {
  return (
    <section className="process" id="process">

      <div className="proc-wm">Process</div>

      <p className="label rv">How We Work</p>
      <h2 className="sec-title rv d1">From vision<br />to <em>reality.</em></h2>

      <div className="proc-steps">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.num} className={`proc-step rv ${i > 0 ? 'd' + i : ''}`}>
            <div className="proc-dot" />
            <div className="proc-n">{step.num}</div>
            <h3 className="proc-t">{step.title}</h3>
            <p className="proc-d">{step.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
