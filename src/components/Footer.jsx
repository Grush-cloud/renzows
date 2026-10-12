import Logo from './Logo'

/**
 * Footer — shared across both brands.
 * Copy and links adapt based on which brand is active.
 *
 * @param {string} activeBrand - 'events' | 'sets'
 */
export default function Footer({ activeBrand = 'events' }) {
  const isEvents = activeBrand === 'events'

  return (
    <footer>
      <div className="foot-logo">
        {isEvents ? <Logo /> : (
          <><span className="nav-mark" style={{ pointerEvents: 'none' }} />SetsByRenzows</>
        )}
      </div>

      <p className="foot-copy">
        © {new Date().getFullYear()} Renzows Event Design.
        {!isEvents && " SetsByRenzows is a sub-brand of Renzows Event Design."}
        {' '}All rights reserved.
        {' '}
        <button
          className="foot-replay"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            window.dispatchEvent(new Event('rz-replay-intro'))   // heard by Intro.jsx
          }}
        >
          ↺ Replay intro
        </button>
      </p>

      <ul className="foot-links">
        {isEvents ? (
          <>
            {/* TODO: replace # with real URLs */}
            <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Pinterest</a></li>
          </>
        ) : (
          <>
            {/* TODO: replace # with SetsByRenzows Instagram URL */}
            <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Pinterest</a></li>
          </>
        )}
      </ul>
    </footer>
  )
}
