# RenzowsEventDesign — File Breakdown

---

## Root Files

### `index.html`
The single HTML page the browser loads. Contains just a `<div id="root">` placeholder and a script tag pointing to `src/main.jsx`. Vite uses this as the entry point to bundle the entire app. Also sets the page title and meta description for SEO.

### `package.json`
Defines the project name, version, and all dependencies. The two runtime dependencies are `react` and `react-dom`. Dev dependencies are `vite` and `@vitejs/plugin-react`. Also contains the scripts you run: `npm run dev` (local), `npm run build` (production), `npm run preview` (preview the build).

### `vite.config.js`
Tells Vite to use the React plugin so it can process JSX files. One of the smallest files in the project but essential — without it, nothing compiles.

### `README.md`
Human-readable setup guide. Covers how to run the project locally, the full folder structure explained, Cloudinary setup steps, and a customisation checklist of every placeholder (email, phone, social links, founder photo, copy) that needs to be swapped out before going live.

---

## `public/`

### `public/favicon.svg`
The small icon that appears in the browser tab. Designed as the magenta corner mark from the RenzowsEventDesign logo — a right-angle bracket shape in `#D4006E`. SVG format so it stays sharp at any size.

---

## `src/`

### `src/main.jsx`
The React entry point. Imports all CSS files in the correct order (global first, then component-specific), then mounts the `<App />` component into the `#root` div in `index.html`. This is the file that kicks everything off. All CSS is imported here centrally so load order is explicit and predictable.

### `src/App.jsx`
The root component and client-side router. Manages which brand is active (`events` or `sets`) and fetches media from Cloudinary for both brands via the `useCloudinaryFolder` hook. Renders the shared `<Cursor>`, `<Nav>`, and `<Footer>` on every view, then conditionally renders either `<PublicSite>` or `<SetsPage>` based on the active brand. Brand switching scrolls the user back to the top.

---

## `src/config/`

### `src/config/cloudinary.js`
The one file you touch to connect your Cloudinary account. Contains a single export: `CLOUD_NAME`. Set this to your Cloudinary cloud name (found at the top of your Cloudinary dashboard) and both the Events and Sets portfolios will pull live media automatically. Until it's set, the site falls back to demo content gracefully.

---

## `src/constants/`

### `src/constants/index.js`
All shared static data for the Events side of the site. Contains the category list and labels, demo project fallback data, nav links, services content, process step content, founder credential pills, and ticker items. Keeping all this here means you update copy in one place rather than hunting through component files.

### `src/constants/sets.js`
The same idea but for the SetsByRenzows side. Contains the Sets category list and labels and demo Sets project fallback data. Also documents the Cloudinary folder structure you should create for Sets media (`sets/portraits`, `sets/fashion`, `sets/commercial`, `sets/editorial`, `sets/props`).

---

## `src/hooks/`

### `src/hooks/useCloudinaryFolder.js`
A custom React hook that fetches all media assets from a given Cloudinary folder using their public list API. Takes three arguments — your cloud name, the folder name, and fallback demo data. On success it maps Cloudinary's response into the project shape the site expects. On failure it silently falls back to demo data. Called twice in `App.jsx` — once for `events/`, once for `sets/`.

### `src/hooks/useReveal.js`
A custom hook that watches all elements with the CSS class `rv` using `IntersectionObserver`. When an element scrolls into view it adds the class `in`, triggering the CSS fade-and-rise animation. The `d1`–`d4` classes add staggered delays so groups of elements animate in sequence rather than all at once.

### `src/hooks/useVideoAutoplay.js`
A custom hook that finds all `<video data-src="...">` elements and manages them with `IntersectionObserver`. When a video tile scrolls into view it lazy-loads the source (saving bandwidth on page load) then plays it muted automatically. When it scrolls out of view it pauses. This is what makes the portfolio tiles feel alive without loading everything upfront.

---

## `src/pages/`

### `src/pages/PublicSite.jsx`
The main RenzowsEventDesign page. Composes all Events-side sections in order: Hero → Ticker → About → Services → Portfolio → Process → Founder → Contact. Runs the `useReveal` and `useVideoAutoplay` hooks. Receives the `projects` array from `App.jsx` and passes it to `<Portfolio>`. Nav, Footer and Cursor live in `App.jsx` so they're shared with the Sets page.

### `src/pages/SetsPage.jsx`
The SetsByRenzows page. A leaner, editorially distinct experience with four sections: Hero → Intro strip → Portfolio grid with category filters → Enquiry section with a full contact form. Has its own `sets-page` CSS class that activates the pink-to-purple gradient design tokens. Also runs `useReveal` and `useVideoAutoplay`.

---

## `src/components/`

### `src/components/Cursor.jsx`
Renders the custom magenta cursor — a small filled dot that follows the mouse exactly, and a larger hollow ring that follows with a smooth lag using `requestAnimationFrame` and linear interpolation. The ring expands when hovering over interactive elements. Hidden automatically on touch devices via CSS so mobile users never see it.

### `src/components/Nav.jsx`
The navigation bar shared across both brands. Sticks to the top and gains a frosted glass background on scroll. On desktop shows the full link list relevant to the active brand. On mobile shows a hamburger that opens a slide-in drawer. Contains the brand switcher pill (Events / Sets) and the breathing explore label below it that pulses between near-invisible and full vivid colour, pointing users toward the other brand.

### `src/components/Hero.jsx`
The full-height opening section of the Events site. Animated structural lines draw themselves in on load — the vertical line, horizontal line, and magenta corner mark echoing the logo. Headline text reveals upward in a staggered cascade. Includes the tag line, sub-copy, two CTAs, and a scroll indicator. All animations are CSS keyframe driven with carefully tuned delays. Lines are desktop-only and hidden on mobile.

### `src/components/Ticker.jsx`
The scrolling marquee strip between the Hero and About sections. Displays service categories in italic serif separated by small magenta diamond symbols. The list is duplicated in the DOM so the CSS scroll animation loops seamlessly.

### `src/components/About.jsx`
Two-column section. Left panel is dark with a subtle grid texture and an editorial quote. Right panel is white with the section heading, body copy, and three animated stat counters. All text elements use `rv` scroll-reveal classes for staggered entrance animations.

### `src/components/Services.jsx`
The three service offering cards — Corporate Events, Weddings & Celebrations, Brand Activations — on a light background. Each card inverts from white to dark on hover with a magenta underline sweeping across the bottom. Content data comes from `SERVICES` in constants.

### `src/components/Portfolio/index.jsx`
The portfolio section wrapper. Renders the section heading, the "View all projects" button that opens the Lightbox, and the video grid. The first project is the hero tile spanning two rows on desktop; the next four are smaller tiles. Passes the full `projects` array to the Lightbox so all projects are accessible there.

### `src/components/Portfolio/VTile.jsx`
A single tile in the portfolio grid. Checks `project.type` to render either a `<video>` (lazy-loaded, autoplayed by the hook) or an `<img>` (lazy-loaded natively). Includes the shimmer placeholder, a "Playing" pill on hover for videos, and the event name and category that slide up from the bottom on hover. The `isHero` prop spans it across two rows.

### `src/components/Portfolio/Lightbox.jsx`
The full-screen project overlay. Dark backdrop with frosted glass. Header has category filter tabs and a close button. Body is a scrollable grid of all projects with staggered entrance animations. Supports live filtering by category with an updating count. Videos autoplay on open. Closes on Escape key or clicking the backdrop. Body scroll locks while open.

### `src/components/Process.jsx`
The four-step process section on a dark background — Discovery, Concept, Production, The Moment. Steps sit in a single row on desktop connected by a faint line, 2×2 grid on mobile. A large watermark word sits behind the content. Data comes from `PROCESS_STEPS` in constants.

### `src/components/Founder.jsx`
The owner section. Split layout — left is the photo (placeholder until real photo is added; swap the placeholder div for `<img src="/founder.jpg" />` in `public/`), right is the bio copy. A floating white quote card overlaps from the photo side with a magenta top bar. Right side has the name, role, two bio paragraphs, and credential pills.

### `src/components/Contact.jsx`
The contact section at the bottom of the Events site. Two columns — left has the heading, sub-copy, and contact details. Right has the enquiry form with name, email, event type dropdown, and message textarea. The submit button has the magenta hover sweep. `TODO` comments mark where form submission needs to be wired up (Formspree or EmailJS recommended).

### `src/components/Footer.jsx`
Shared footer across both brands. Renders the logo mark, copyright line (year auto-updates via `new Date().getFullYear()`), and social links. Both the name and social links adapt based on the `activeBrand` prop — Events shows Instagram, LinkedIn, Pinterest; Sets shows Instagram and Pinterest only.

---

## `src/styles/`

### `src/styles/global.css`
The foundation of the entire visual system. Imports Google Fonts. Defines all CSS custom properties (the magenta, darks, greys, whites). Global reset and body defaults. Custom cursor styles. Shared utility classes (`label`, `sec-title`, `sec-body`). Shared button styles (`btn-fill`, `btn-ghost`). The scroll-reveal animation system (`rv`, `rv.in`, stagger delays). Shared keyframe animations used across multiple components (`shimmer`, `pulse`, `tick`).

### `src/styles/nav.css`
All styles for the navigation bar and mobile drawer. Sticky behaviour and frosted background on scroll, logo styles, desktop link hover underline, hamburger button animation, slide-in mobile drawer, and the dim overlay behind it.

### `src/styles/hero.css`
All styles for the Events hero. The structural line draw-in animations (`vGrow`, `hGrow`, `cornerPop`), staggered headline reveal (`lineReveal`), fade-up timings for every element, scroll indicator, and the large background watermark. Lines are desktop-only via media query.

### `src/styles/sections.css`
Styles for every mid-page section on the Events site: ticker strip, about split layout, stat counters, services cards with hover invert, process timeline, founder split layout with floating quote card, contact two-column layout with form fields, and the footer.

### `src/styles/portfolio.css`
The portfolio grid and video tile system. The `2fr 1fr 1fr` desktop grid with the hero tile spanning two rows, collapsing to a 2-column grid on mobile. Tile video/image fill, bottom vignette, hover zoom, sliding info overlay, Playing pill, and shimmer placeholder.

### `src/styles/lightbox.css`
Full-screen project overlay styles. Backdrop and open/close opacity transition, header with filter tabs and close button, scrollable body with custom scrollbar, project count, responsive card grid (2 → 3 → 4 columns), card hover zoom, sliding info overlay, category badge, and the empty state message.

### `src/styles/sets.css`
Everything visual for the SetsByRenzows side. Defines the Sets gradient design tokens. Hero with gradient mesh background and decorative petal shape. Gradient text on headings. Intro strip two-column layout. Portfolio grid with portrait/landscape rhythm and purple hover overlays. Enquiry section with two-column layout, dark form with gradient top border accent and purple focus states, gradient submit button. Brand switcher and the breathing explore label with its light-to-vivid pulse animation.
