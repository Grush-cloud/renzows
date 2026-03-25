import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ── Styles (all imported here so load order is explicit) ──────
import './styles/global.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/portfolio.css'
import './styles/lightbox.css'
import './styles/sets.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
