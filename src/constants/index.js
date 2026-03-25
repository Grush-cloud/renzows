// ─── Category Config ────────────────────────────────────────────
export const CATS = ['all', 'corporate', 'wedding', 'private', 'birthday']

export const CAT_LABELS = {
  all:       'All',
  corporate: 'Corporate',
  wedding:   'Wedding',
  private:     'Private',
  birthday:   'Birthday',
}

// ─── Demo Projects (shown until Cloudinary is configured) ────────
// Once CLOUD_NAME is set in src/config/cloudinary.js these are
// replaced automatically by live Cloudinary assets.
export const DEMO_PROJECTS = [
  { id: 'p1', name: 'The Grand Gala 2024',  cat: 'corporate', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',                    type: 'video' },
  { id: 'p2', name: 'Elise & Marcus',       cat: 'wedding',   url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',                  type: 'video' },
  { id: 'p3', name: 'Verde Launch',         cat: 'private',     url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',                 type: 'video' },
  { id: 'p4', name: "Sofia's Gala",         cat: 'Birthday',   url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',                     type: 'video' },
  { id: 'p5', name: 'Nexus Annual Summit',  cat: 'corporate', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',                   type: 'video' },
  { id: 'p6', name: 'Amara & David',        cat: 'wedding',   url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',                type: 'video' },
  { id: 'p7', name: 'Luxe Pop-Up',          cat: 'brand',     url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',               type: 'video' },
  { id: 'p8', name: 'Horizon Awards',       cat: 'corporate', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',     type: 'video' },
]

// ─── Nav Links ───────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: '#about',    label: 'About'     },
  { href: '#services', label: 'Services'  },
  { href: '#work',     label: 'Work'      },
  { href: '#founder',  label: 'Our Story' },
  { href: '#contact',  label: 'Contact'   },
]

// ─── Services ────────────────────────────────────────────────────
export const SERVICES = [
  {
    num: '01',
    title: 'Corporate Events',
    desc: 'Launches, galas, summits, and team milestones — we create corporate experiences that inspire, impress, and leave lasting impressions on every guest in the room.',
  },
  {
    num: '02',
    title: 'Weddings & Celebrations',
    desc: 'Your story deserves a setting that matches its beauty. We design wedding experiences as unique as the love at the centre of them — from intimate to extraordinary.',
  },
  {
    num: '03',
    title: 'Brand Activations',
    desc: 'Bring your brand to life with immersive, multi-sensory experiences that connect your audience emotionally to what you stand for — and keep them talking.',
  },
]

// ─── Process Steps ───────────────────────────────────────────────
export const PROCESS_STEPS = [
  { num: '01', title: 'Discovery',   desc: 'We sit with you to understand your vision, your guests, your brand — and the exact emotion you want every guest to feel.' },
  { num: '02', title: 'Concept',     desc: 'Our creative team builds a full design concept — mood, palette, layout, and atmosphere — tailored entirely to you.' },
  { num: '03', title: 'Production',  desc: 'We handle every detail of the build — vendor coordination, logistics, and on-site execution — with complete precision.' },
  { num: '04', title: 'The Moment',  desc: "You arrive. You breathe it in. And you experience something genuinely unforgettable. That's exactly what we live for." },
]

// ─── Founder Credentials ─────────────────────────────────────────
export const FOUNDER_CREDS = [
  'Event Design',
  'Brand Activations',
  '8+ Years',
  '200+ Events',
  'Corporate & Private',
]

// ─── Ticker Items ────────────────────────────────────────────────
export const TICKER_ITEMS = [
  'Corporate Events',
  'Weddings & Celebrations',
  'Brand Activations',
  'Galas & Dinners',
  'Product Launches',
  'Private Parties',
]
