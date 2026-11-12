// ─── Per-page SEO / link-preview details ─────────────────────────
// Single source: the app sets the tab title from here, and vite.config.js
// writes these into each page's HTML at build time (what Google/WhatsApp read).
// Plain data only (no imports) so vite.config.js can load it in Node.
export const PAGES = {
  events: {
    path: '/',
    title: 'Renzows Event Design | Event Design & Décor in Nigeria',
    description: 'Event design and décor for weddings, birthdays, corporate events and private dinners in Nigeria.',
    ogTitle: 'Renzows Event Design',
    icon: '/favicon.svg',
  },
  sets: {
    path: '/sets',
    title: 'SetsByRenzows | Photoshoot Set Design & Prop Rentals',
    description: 'Bespoke photoshoot sets and curated prop rentals for photographers, creatives and brands. From Renzows Event Design.',
    ogTitle: 'SetsByRenzows',
    icon: '/favicon-sets.svg',
  },
}

export const brandFromPath = (pathname) =>
  pathname.replace(/\/+$/, '') === PAGES.sets.path ? 'sets' : 'events'
