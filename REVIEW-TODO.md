# Review TODO

From the code review, design review and council verdict (2026-10-12).
Verdict: the site reads as an AI template. The fix is real, specific content and photos up front; restyling comes last.

## 0. Needed from the owner (blocks phases 1–3)
- [ ] Real phone number + WhatsApp number
- [ ] Instagram / Pinterest / LinkedIn URLs (events + SetsByRenzows); drop any that don't exist
- [ ] Real email addresses (events + sets)
- [ ] City / where based (Cloudinary hashtags say #abujaeventplanner, so confirm: Abuja?)
- [ ] Founder's name (and OK to be the face of the brand)
- [ ] 1–3 real testimonials (first name, event, OK to publish)
- [ ] For each portfolio item: client/event name, venue, guest count, permission to publish
- [ ] Form service choice: Formspree / EmailJS / WhatsApp-only / mailto
- [ ] Optional: "starting from ₦___" price bands
- [ ] Confirm "8+ years" / "200+ events" are true (removed from the hero until confirmed; still in About)

## 1. Stop the site misleading people
- [ ] Replace placeholder phone in `Contact.jsx` and WhatsApp number in `App.jsx`
- [ ] "Available Worldwide" → real city
- [ ] Footer social links (`href="#"`)
- [ ] Emails as `mailto:` links
- [ ] Wire up both contact forms (`Contact.jsx`, `SetsPage.jsx`); link labels to inputs
- [ ] Decide on WhatsApp vs the form as the main call to action

## 2. Code bugs
- [x] Closed lightbox downloads + plays all videos at load (`useVideoAutoplay`, `Lightbox.jsx`); pause on close
- [x] Demo fallback never used (`App.jsx` passes `[]`); remove the fake demo data instead (Big Buck Bunny / invented clients)
- [x] Swallowed fetch errors in `useCloudinaryFolder.js`
- [x] Category mismatch: Cloudinary notes say `weddings/`, `brand/` vs `CATS`; fall back to raw folder name for labels
- [x] Cursor hover targets picked once at mount → use event delegation
- [x] Sets page ignores `loading` (shows "No projects" while loading)
- [x] Dead `onLoad` handlers in `VTile.jsx` / `Lightbox.jsx`
- [x] Double scroll-to-top on brand switch
- [x] `useReveal` / `useVideoAutoplay` re-run every render
- [x] Video tiles show a black box until loaded → Cloudinary first-frame `poster` image
- [x] Discard whitespace-only change in `Hero.jsx`

## 3. Design / accessibility
- [x] Mobile nav overflows (burger 18px off-screen at 375px); shorten logo / tidy switcher on mobile
- [x] Text below 11px (27 places) → 11px minimum; darken low-contrast greys
- [x] No focus outlines → `:focus-visible` style; inputs keep a visible focus
- [x] Fixed nav covers section headings → `scroll-margin-top`
- [x] Closed lightbox still reachable by Tab → `visibility: hidden` when closed; `role="dialog"`
- [x] No `prefers-reduced-motion` support
- [x] Loading skeleton heights (520/360) ≠ real grid (400/260) → layout jump
- [x] Photos cropped arbitrarily in fixed-height grid rows → `object-fit: cover`
- [x] Hero animations too slow (CTA appears at ~2s) → roughly halve the delays
- [x] Remove custom cursor
- [x] Remove meaningless "RED" watermarks (hero + about)
- [x] Page title "RenzowsEventDesign" → readable title; add Open Graph tags for WhatsApp/Instagram previews
- [ ] Sets page: 4th tile orphaned on its own row (revisit once real content count is known)

## 3b. Hero (built, then reworked after the hero council)
- [x] Desktop ≥1200px: three-column wall of real portrait clips (birthday canopy · Faith & Caleb wedding · rooftop dinner), side clips load after the centre one plays
- [x] Phones/tablets: Faith & Caleb clip full-bleed, posters show from first paint
- [x] Clips slowed to half speed (~5–6s loops instead of 2.9s)
- [x] "Lights up" cut from 1.85s of black to a 0.45s per-panel fade; text in by ~0.6s
- [x] Headline "We turn rooms into nights people talk about." + plain what-we-do line; tag "Event Design & Décor · Nigeria"
- [x] One primary CTA "Plan Your Event"; unconfirmed stats removed from the hero
- [x] Real logo recreated (`Logo.jsx`, bold) in nav + footer; brand spelled RENZOWS everywhere
- [x] SetsByRenzows logo recreated (`SetsLogo.jsx`: petal fan + small-caps name + "Set design and prop rentals") in nav + footer on Sets; tab icon switches to the petal fan on Sets (`favicon-sets.svg`)
- [ ] Swap both recreated logos for the original artwork (SVG/high-res PNG) when available
- [x] Nav readable over video: dark band behind the bar, glass switcher, "Explore…" label removed
- [x] Cross-brand nudge both ways: small dot + hover hint on whichever brand you're not on; switcher back on phones
- [x] Sets hero = same component as Events (`Hero.jsx`, `brand="sets"`): three slowed clips of the floral disco set (no people in frame), aubergine tint, white nav, no tag line
- [ ] Optional: a "Also from Renzows: SetsByRenzows" band on the events page
- [x] Tag line under the logo removed; "in Nigeria" moved into the what-we-do line
- [x] Data-saver / reduced-motion → posters only
- [ ] Clips are Cloudinary on-the-fly transformations (warmed by hand). If the URLs change, request them once or set them as eager transformations so the first visitor doesn't wait
- [ ] Swap "Plan Your Event" for "Chat on WhatsApp" once the real number is in
- [ ] Hide the WhatsApp float until the number is real (council flagged it as a dead button)

## 3b+. First-entry intros (`Intro.jsx`, `intro.css`)
- [x] Events: red carpet rolls out toward the logo (~1.5s); Sets: hero-image puzzle pieces lock into the page (~1.6s)
- [x] Once per brand per browser session; tap/click/any key skips; off for reduced-motion; hero animations wait for it
- [x] "↺ Replay intro" button in the footer (plays the current brand's intro on request)
- [ ] Watch it on a real phone; if it feels long, trim DURATION in Intro.jsx + the intro.css delays

## 3b++. Cursor (`Cursor.jsx`)
- [x] Brand dot + short ✦ sparkle trail; ring over links/buttons/tiles; lilac on Sets; mouse only, off for reduced-motion; native caret in form fields
- [x] Touch screens: small ✦ burst where you tap (never delays the tap)

## 3b+++. Services broadened
- [x] Cards now match the real portfolio: Weddings & Receptions · Birthdays & Milestones · Corporate & Brand Events · Private Dinners & Gatherings
- [x] "Don't see your occasion?" line + link to contact; ticker and contact-form event types updated to match
- [ ] Owner to confirm the service wording (and add any service they offer that isn't listed)

## 3c. Device / data performance (2026-10-12)
- [x] Portfolio + lightbox videos: 8s 480px loops instead of full originals (6 videos: ~58 MB → ~7.4 MB)
- [x] Old Safari (< 14): hero no longer crashes the page to white (matchMedia fallback)
- [x] Fonts linked from index.html with preconnect (no CSS @import chain); preconnect to Cloudinary
- [x] -webkit-backdrop-filter for Safari < 18; logo frame fallback without color-mix; aspect-ratio fallback for video tiles (iOS < 15)
- [ ] Opera Mini / no-JavaScript: add a <noscript> page with contact details (needs real phone/WhatsApp)
- [ ] Run Lighthouse + test on a real older Android and iPhone

## 4. Content rewrite (needs phase 0)
- [ ] Hero: add city + founder's name
- [ ] Name the founder in `Founder.jsx`
- [ ] Portfolio captions: client, venue, scale
- [ ] Replace "100% Client Satisfaction" with a real testimonial
- [ ] Cut stock superlatives ("craft", "extraordinary", "magic", "unforgettable")
- [ ] Keep the italic-magenta headline flourish for 1–2 headlines, not all 8
- [ ] Add local specifics (Lagos venues, owambe, aso-ebi, naira) where true
- [ ] Differentiate the Sets headlines from the Events ones

## 5. Later / bigger bets
- [ ] Analytics: count WhatsApp taps + enquiries
- [ ] Google Business Profile, local SEO
- [ ] Per-project case pages
- [ ] SetsByRenzows prop catalogue (items, sizes, day rates, WhatsApp per item)
- [ ] WhatsApp message pre-filled with the project/prop being viewed
