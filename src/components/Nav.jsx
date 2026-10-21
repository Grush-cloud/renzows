import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../constants'
import Logo from './Logo'
import SetsLogo from './SetsLogo'

/**
 * Nav — shared across both RenzowsEventDesign and SetsByRenzows.
 *
 * Features:
 * - Sticks on scroll with frosted background
 * - Hamburger + drawer for mobile
 * - Brand switcher pill (Events ↔ Sets)
 * - Cross-brand nudge: a small dot + hover hint on the brand you're not on
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

  const handleSwitch = onSwitchBrand


  const links = activeBrand === 'events'
    ? NAV_LINKS
    : [
        { href: '#work',    label: 'Portfolio' },
        { href: '#enquire', label: 'Enquire'   },
      ]


  return (
    <>
      {/* Light text while floating over the dark heroes (both brands) */}
      <nav className={stuck ? 'stuck' : !drawerOpen ? 'on-dark' : ''}>

        {/* Logo */}
        <a href="#" className="nav-logo">
          {activeBrand === 'events' ? <Logo /> : <SetsLogo />}
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>

        {/* Right — brand switcher + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          <div className="brand-switcher-wrap">
            <div className="brand-switcher">
              <button
                className={`brand-switcher-btn ${activeBrand === 'events' ? 'active-events' : ''}`}
                onClick={() => handleSwitch('events')}
                title="Renzows Event Design: weddings, birthdays & corporate events"
              >
                Events
                {activeBrand === 'sets' && <span className="sets-dot" aria-hidden="true" />}
                <span className="sets-hint" aria-hidden="true">Weddings, birthdays &amp; corporate events</span>
              </button>
              <button
                className={`brand-switcher-btn ${activeBrand === 'sets' ? 'active-sets' : ''}`}
                onClick={() => handleSwitch('sets')}
                title="SetsByRenzows: photoshoot sets & prop rentals"
              >
                Sets
                {activeBrand === 'events' && <span className="sets-dot" aria-hidden="true" />}
                <span className="sets-hint" aria-hidden="true">Photoshoot sets &amp; prop rentals</span>
              </button>
            </div>
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
              {activeBrand === 'events' ? '→ SetsByRenzows' : "→ Renzows Event Design"}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
