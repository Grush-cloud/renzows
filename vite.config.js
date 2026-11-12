import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { PAGES } from './src/constants/seo.js'

// Swap the per-page head tags (title, description, link-preview tags, tab icon)
function withHead(html, page) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${page.description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${page.ogTitle}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${page.description}`)
    .replace(/(<link rel="icon" type="image\/svg\+xml" href=")[^"]*/, `$1${page.icon}`)
}

// One HTML file per page, so crawlers and WhatsApp/Instagram previews see the right details
// without running JavaScript. Same app bundle; /sets/index.html just has the Sets head.
const pageHtml = {
  name: 'page-html',
  transformIndexHtml: (html) => withHead(html, PAGES.events),
  closeBundle() {
    const html = readFileSync('dist/index.html', 'utf8')
    mkdirSync('dist/sets', { recursive: true })
    writeFileSync('dist/sets/index.html', withHead(html, PAGES.sets))
  },
}

export default defineConfig({
  plugins: [react(), pageHtml],
})
