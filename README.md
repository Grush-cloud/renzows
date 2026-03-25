# RenzowsEventDesign — Website

A React + Vite website for RenzowsEventDesign, with a hidden admin panel for uploading event videos and images to Cloudinary.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
renzows-event-design/
├── public/
│   └── favicon.svg              # Brand favicon (magenta corner mark)
│
├── src/
│   ├── components/
│   │   ├── Portfolio/
│   │   │   ├── index.jsx        # Portfolio section (grid + lightbox trigger)
│   │   │   ├── VTile.jsx        # Single autoplay video tile
│   │   │   └── Lightbox.jsx     # Full-screen overlay with filters
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cursor.jsx           # Custom magenta cursor
│   │   ├── Footer.jsx
│   │   ├── Founder.jsx          # Owner bio section
│   │   ├── Hero.jsx
│   │   ├── Nav.jsx              # Responsive nav + mobile drawer
│   │   ├── Process.jsx
│   │   ├── Services.jsx
│   │   └── Ticker.jsx           # Scrolling service ticker
│   │
│   ├── constants/
│   │   └── index.js             # All shared data (services, steps, demo projects…)
│   │
│   ├── hooks/
│   │   ├── useReveal.js         # Scroll-triggered fade-in animation
│   │   └── useVideoAutoplay.js  # Lazy load + autoplay videos on scroll
│   │
│   ├── pages/
│   │   ├── PublicSite.jsx       # Main public-facing page
│   │   └── AdminPanel.jsx       # Hidden admin for managing projects
│   │
│   ├── styles/
│   │   ├── global.css           # Variables, reset, shared utilities
│   │   ├── nav.css
│   │   ├── hero.css
│   │   ├── sections.css         # About, Services, Process, Founder, Contact, Footer
│   │   ├── portfolio.css        # Video grid and tiles
│   │   ├── lightbox.css         # Full-screen project overlay
│   │   └── admin.css            # Admin panel styles
│   │
│   ├── App.jsx                  # Root router (home ↔ admin)
│   └── main.jsx                 # React entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## Admin Panel

### Accessing the admin
Two ways to get in:
1. Add `#admin` to the URL → `http://localhost:5173/#admin`
2. Click the magenta corner mark in the nav **5 times**

### Setting up Cloudinary (one-time)
1. Sign up free at [cloudinary.com](https://cloudinary.com/users/register_free)
2. From your dashboard, copy your **Cloud Name**
3. Go to **Settings → Upload → Upload Presets** → Add an **unsigned** preset
4. Copy the preset name
5. Paste both into the admin settings panel and click **Save Settings**

### Uploading a project
1. Open the admin panel
2. Drag & drop or click to select a video (MP4, MOV) or image (JPG, PNG)
3. Enter the project name and select a category
4. Click **Upload & Add Project**
5. The project appears live on the site immediately

---

## Customisation Checklist

| What | Where |
|---|---|
| Company name | `src/constants/index.js` — also update `index.html` title |
| Contact email & phone | `src/components/Contact.jsx` |
| Social links | `src/components/Footer.jsx` |
| Founder name, bio & quote | `src/components/Founder.jsx` |
| Founder photo | Add `public/founder.jpg` and replace the placeholder div in `Founder.jsx` with `<img src="/founder.jpg" alt="Name" />` |
| Stats (years, events) | `src/components/About.jsx` |
| Services copy | `src/constants/index.js` → `SERVICES` |
| Process steps | `src/constants/index.js` → `PROCESS_STEPS` |
| Demo projects | `src/constants/index.js` → `DEMO_PROJECTS` |
| Form submission | `src/components/Contact.jsx` — wire to EmailJS, Formspree, or your API |

---

## Deployment

This is a standard Vite app. You can deploy to:
- **Vercel** — connect your GitHub repo, it auto-detects Vite
- **Netlify** — drag & drop the `/dist` folder after `npm run build`
- **Any static host** — run `npm run build` and upload the `/dist` folder
