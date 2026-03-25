// ─── Sets Cloudinary Folder ──────────────────────────────────────
// Upload your sets media to these folders in Cloudinary:
//   sets/portraits
//   sets/fashion
//   sets/commercial
//   sets/editorial
//   sets/props          ← for prop rental enquiries
// Then the site fetches everything under "sets/" automatically.

export const SETS_CATS = ['all', 'portraits', 'fashion', 'commercial', 'editorial', 'props']

export const SETS_CAT_LABELS = {
  all:        'All',
  portraits:  'Portraits',
  fashion:    'Fashion',
  commercial: 'Commercial',
  editorial:  'Editorial',
  props:      'Props',
}

// ─── Demo Sets Projects ──────────────────────────────────────────
// Replace with real Cloudinary URLs once uploaded
export const DEMO_SETS = [
  { id: 's1', name: 'Bloom Editorial',     cat: 'editorial',  url: '', type: 'image' },
  { id: 's2', name: 'Studio Gold',         cat: 'fashion',    url: '', type: 'image' },
  { id: 's3', name: 'Noir Portraits',      cat: 'portraits',  url: '', type: 'image' },
  { id: 's4', name: 'Product Launch Set',  cat: 'commercial', url: '', type: 'video' },
  { id: 's5', name: 'Velvet Props',        cat: 'props',      url: '', type: 'image' },
  { id: 's6', name: 'Garden Editorial',    cat: 'editorial',  url: '', type: 'image' },
  { id: 's7', name: 'Chrome & Glass',      cat: 'commercial', url: '', type: 'video' },
  { id: 's8', name: 'Soft Studio',         cat: 'portraits',  url: '', type: 'image' },
]
