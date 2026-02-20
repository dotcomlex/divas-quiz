
## Divas Beauty Studio — Quiz Funnel Build Plan

### Overview
A mobile-first, high-converting lead generation quiz funnel for a lash and brow salon. Built in the Heyflow aesthetic: one white container, one question at a time, clean icon tiles, rose brand color, all copy in Spanish. Designed to convert cold Facebook ad traffic into booked appointments.

---

### What We're Building

**Route 1: Landing Page (`/`)**
- Logo image (the uploaded Divas Beauty dark script logo) centered at top
- Subtext: "Studio de Pestañas · Thornton, CO"
- Rose promo pill badge: "🏷️ 10% de descuento este mes"
- Bold headline + subheadline in Spanish
- Full-width pulsing rose CTA button → navigates to quiz
- Trust line + live viewer counter pill with animated green dot (randomly fluctuates 35–80)

**Route 2: Quiz (`/quiz`) — 5 possible screens**

**Step 1 — Service Selection**
- "¿Qué servicio te interesa?" with hint text
- 6 service tiles in a 2-column grid (emoji + name + pricing with strikethrough discounts)
- "⭐ Favorita" badge on Set Híbrido tile
- Tap a tile → selected state (rose border + tint + checkmark) → auto-advance after 300ms

**Step 2 — Location Check**
- "¿Puedes llegar a nuestro studio?" with address info pill
- 2 stacked tiles: YES (filled rose) and NO (outlined gray)
- YES → Step 3 | NO → Disqualification screen

**Disqualification Screen**
- Graceful exit: emoji + thank you message, no buttons, no pressure

**Step 3 — Contact Form**
- Name + phone number inputs (16px font to prevent iOS zoom)
- Auto-formatted phone: (XXX) XXX-XXXX with green ✓ at 10 digits
- Privacy note, submit button (disabled until valid), testimonial quote
- On submit: fires Facebook Pixel Lead event → Success screen

**Success Screen**
- Animated spring checkmark circle
- Personalized "¡Listo, [firstName]! 🎉" headline
- Confirmation card showing selected service + phone
- Google Maps link
- 5-item FAQ accordion with smooth height animation

---

### Shared Design System
- **Container:** White, max-width 480px, centered. Full-bleed on mobile (no radius, no shadow). Cream `#fdf6f7` page background
- **Progress bar:** 3 rose segments with gaps, animates on step change
- **Slide transitions:** Framer Motion AnimatePresence — slides in from right, exits to left (220ms easeInOut)
- **Tile press feedback:** `whileTap={{ scale: 0.96 }}` on every interactive tile
- **Font:** Montserrat 400/600/700/800 via Google Fonts in index.html
- **Rose accent** (`#c2185b`) used only on: selected tile borders, progress bar fill, CTA buttons — nowhere else

---

### Technical Implementation

1. **index.html** — Meta tags, viewport lock (no zoom), Montserrat font import, Facebook Pixel script (ID: `914267804431815`)
2. **Logo** — Upload logo image to `src/assets/`, use in both Landing and quiz header
3. **App.tsx** — Clean routes: `/` → Landing, `/quiz` → Quiz component
4. **`src/pages/Landing.tsx`** — All landing screen content, live counter with setInterval
5. **`src/pages/Quiz.tsx`** — Single component managing `step` and `screen` state with AnimatePresence transitions
6. **`src/components/QuizContainer.tsx`** — Reusable white container wrapper (handles mobile vs desktop styles)
7. **`src/components/ProgressBar.tsx`** — 3-segment animated progress bar
8. **`src/components/ServiceTile.tsx`** — Reusable tile with all states (default, selected, badge, checkmark)
9. **`src/components/FaqAccordion.tsx`** — Framer Motion height-animated accordion
10. **Tailwind CSS** — Extended with brand colors and Montserrat font family
11. **Framer Motion** — Installed and used for transitions, tile press, checkmark spring, accordion

---

### Conversion Optimization Details
- Live social proof counter (fluctuates randomly, creates urgency)
- Auto-advance after service selection (keeps momentum, removes friction)
- YES button visually dominant over NO (rose fill vs gray outline)
- Submit button disabled state with 35% opacity (honest UX, prevents bad leads)
- iOS zoom prevention (16px font on all inputs)
- Facebook Pixel PageView on load + Lead event on submit
- First-name personalization on success screen
- FAQ section reduces post-submission anxiety/no-shows
