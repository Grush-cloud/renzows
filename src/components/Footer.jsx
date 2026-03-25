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
        <span className="nav-mark" style={{ pointerEvents: 'none' }} />
        {isEvents ? "RenzowsEventDesign" : 'SetsByRenzows'}
      </div>

      <p className="foot-copy">
        © {new Date().getFullYear()} RenzowsEventDesign.
        {!isEvents && ' SetsByRenzows is a sub-brand of RenzowsEventDesign.'}
        {' '}All rights reserved.
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
