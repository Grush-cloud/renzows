import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../constants'

/**
 * Nav — shared across both RenzowsEventDesign and SetsByRenzows.
 *
 * Features:
 * - Sticks on scroll with frosted background
 * - Hamburger + drawer for mobile
 * - Brand switcher pill (Events ↔ Sets)
 * - Breathing explore badge pointing to the other brand
 *
 * @param {string}   activeBrand   - 'events' | 'sets'
 * @param {function} onSwitchBrand - called with 'events' or 'sets'
 */
export default function Nav({ activeBrand = 'events', onSwitchBrand }) {
  const [stuck, setStuck]           = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSwitch(brand) {
    onSwitchBrand(brand)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const links = activeBrand === 'events'
    ? NAV_LINKS
    : [
        { href: '#work',    label: 'Portfolio' },
        { href: '#enquire', label: 'Enquire'   },
      ]

  const exploreLabel = activeBrand === 'events'
    ? { text: 'Explore SetsByRenzows', cls: 'to-sets' }
    : { text: "Explore RenzowsEventDesign", cls: 'to-events' }

  return (
    <>
      <nav className={stuck ? 'stuck' : ''}>

        {/* Logo */}
        <a href="#" className="nav-logo">
          <span className="nav-mark" style={{ cursor: 'default' }} />
          {activeBrand === 'events' ? "RenzowsEventDesign" : 'SetsByRenzows'}
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>

        {/* Right — switcher + explore badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          <div className="brand-switcher-wrap">
            <div className="brand-switcher">
              <button
                className={`brand-switcher-btn ${activeBrand === 'events' ? 'active-events' : ''}`}
                onClick={() => handleSwitch('events')}
              >
                Events
              </button>
              <button
                className={`brand-switcher-btn ${activeBrand === 'sets' ? 'active-sets' : ''}`}
                onClick={() => handleSwitch('sets')}
              >
                Sets
              </button>
            </div>

            {/* Permanently breathing explore label */}
            <span className={`brand-explore-label ${exploreLabel.cls}`}>
              {exploreLabel.text}
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-burger ${drawerOpen ? 'open' : ''}`}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Dim overlay */}
      <div
        className={`nav-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`nav-drawer ${drawerOpen ? 'open' : ''}`}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setDrawerOpen(false)}>{link.label}</a>
            </li>
          ))}
          <li style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--gr)' }}>
            <button
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, color: 'var(--dk)',
              }}
              onClick={() => {
                handleSwitch(activeBrand === 'events' ? 'sets' : 'events')
                setDrawerOpen(false)
              }}
            >
              {activeBrand === 'events' ? '→ SetsByRenzows' : "→ RenzowsEventDesign"}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
