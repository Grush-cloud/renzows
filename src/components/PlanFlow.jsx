import { useState, useRef, useEffect } from 'react'
import { PLAN_FLOWS, CONTACT, buildBrief } from '../constants/plan'
import { sparkle } from './Cursor'

/**
 * PlanFlow — the enquiry, one tap-to-answer question at a time, ending in a brief
 * the visitor sends us on WhatsApp (or email). No backend: both open the visitor's own app.
 *
 * @param {string} brand - 'events' | 'sets'
 */
export default function PlanFlow({ brand }) {
  const { title, steps } = PLAN_FLOWS[brand]
  const total = steps.length + 1                        // + the name/number step
  const [step, setStep]       = useState(0)             // 0..steps.length, then total = brief
  const [answers, setAnswers] = useState({})
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [error, setError]     = useState('')
  const heading = useRef(null)
  const sendBtn = useRef(null)

  // Move focus to each new question so keyboard / screen-reader users follow along
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    heading.current?.focus()
  }, [step])

  // A small ✦ burst when the brief appears
  useEffect(() => {
    if (step !== total || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const b = sendBtn.current?.getBoundingClientRect()
    if (!b) return
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      const s = sparkle(b.left + b.width / 2, b.top + b.height / 2, brand)
      s.style.setProperty('--dx', `${Math.cos(a) * 60}px`)
      s.style.setProperty('--dy', `${Math.sin(a) * 40}px`)
      s.classList.add('burst')
    }
  }, [step, total, brand])

  const choose = (key, label) => {
    setAnswers((a) => ({ ...a, [key]: label }))
    const next = step + 1                               // fixed target: a double-tap can't skip a step
    setTimeout(() => setStep(next), 220)                // brief beat so the selection registers
  }

  const finish = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Enter your name first.')
    if (!/^\+?\d{10,14}$/.test(phone.replace(/[\s-]/g, ''))) {
      return setError('Enter a WhatsApp number, like 0803 000 0000.')
    }
    setError('')
    setStep(total)
  }

  const progress = `${(Math.min(step + 1, total) / total) * 100}%`
  const brief = buildBrief(brand, answers, name.trim(), phone.trim())
  const { whatsapp, email } = CONTACT[brand]
  const subject = `New enquiry: ${Object.values(answers)[0] || (brand === 'sets' ? 'Set booking' : 'Event')}`

  return (
    <div className={`plan plan--${brand}`}>
      <div className="plan-top">
        <span>{step === total ? 'Your brief' : title}</span>
        <span>{step === total ? 'Ready' : `Step ${step + 1} of ${total}`}</span>
      </div>
      <div className="plan-bar" aria-hidden="true"><i style={{ width: progress }} /></div>

      {step < steps.length && (() => {
        const s = steps[step]
        return (
          <>
            <h3 className="plan-q" ref={heading} tabIndex={-1}>{s.q}</h3>
            <p className="plan-hint">{s.hint}</p>
            <div className="plan-grid">
              {s.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  className={`plan-opt ${o.img ? 'has-img' : ''} ${answers[s.key] === o.label ? 'on' : ''}`}
                  aria-pressed={answers[s.key] === o.label}
                  style={o.img ? { backgroundImage: `url(${o.img})` } : undefined}
                  onClick={() => choose(s.key, o.label)}
                >
                  {o.swatch && (
                    <span className="plan-swatch" aria-hidden="true">
                      {o.swatch.map((c) => <span key={c} style={{ background: c }} />)}
                    </span>
                  )}
                  <span className="plan-opt-label">{o.label}</span>
                </button>
              ))}
            </div>
            <div className="plan-nav">
              {step > 0
                ? <button type="button" className="plan-link" onClick={() => setStep(step - 1)}>← Back</button>
                : <button type="button" className="plan-link" onClick={() => setStep(steps.length)}>Skip, just message us</button>}
            </div>
          </>
        )
      })()}

      {step === steps.length && (
        <form onSubmit={finish} noValidate>
          <h3 className="plan-q" ref={heading} tabIndex={-1}>Last step: who should we talk to?</h3>
          <p className="plan-hint">We'll reply on WhatsApp.</p>
          <label className="plan-label" htmlFor={`${brand}-name`}>Your name</label>
          <input id={`${brand}-name`} className="plan-input" value={name} autoComplete="name"
                 placeholder="Adaeze" onChange={(e) => { setName(e.target.value); setError('') }} />
          <label className="plan-label" htmlFor={`${brand}-phone`}>WhatsApp number</label>
          <input id={`${brand}-phone`} className="plan-input" value={phone} type="tel" autoComplete="tel"
                 inputMode="tel" placeholder="0803 000 0000" onChange={(e) => { setPhone(e.target.value); setError('') }} />
          <p className="plan-error" role="alert">{error}</p>
          <div className="plan-nav">
            <button type="button" className="plan-link" onClick={() => setStep(step - 1)}>← Back</button>
            <button type="submit" className="plan-go">See my brief</button>
          </div>
        </form>
      )}

      {step === total && (
        <>
          <h3 className="plan-q" ref={heading} tabIndex={-1}>Lovely, {name.trim().split(' ')[0]}.</h3>
          <p className="plan-hint">Here's what we'll receive:</p>
          <dl className="plan-brief">
            {steps.filter((s) => answers[s.key]).map((s) => (
              <div key={s.key}><dt>{s.key}</dt><dd>{answers[s.key]}</dd></div>
            ))}
            <div><dt>WhatsApp</dt><dd>{phone.trim()}</dd></div>
          </dl>
          <a ref={sendBtn} className="plan-wa" target="_blank" rel="noreferrer"
             href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(brief)}`}>
            Send on WhatsApp →
          </a>
          <a className="plan-email"
             href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`}>
            Send by email instead
          </a>
          <div className="plan-nav">
            <button type="button" className="plan-link" onClick={() => setStep(steps.length)}>← Edit</button>
            <button type="button" className="plan-link" onClick={() => { setAnswers({}); setStep(0) }}>Start over</button>
          </div>
        </>
      )}
    </div>
  )
}
