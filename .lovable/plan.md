
## UI Glow-Up Plan — 5 Focused Changes

### 1. Subtle Pink Texture Background (Landing + All Quiz Pages)

The page background is currently a flat `hsl(350, 60%, 98%)`. We'll replace it with a layered SVG-based background that gives:
- A soft radial gradient in the top center (rose/pink glow, very subtle — like a beauty brand editorial photo backdrop)
- A tiny dot grid texture using an SVG `data:` URI pattern (very low opacity, ~4%) to add tactile depth
- A second softer glow in the bottom right for balance

This applies to both the outer wrapper in `Landing.tsx` and `PageWrapper` in `Quiz.tsx`, plus the `body` in `index.css`.

Implementation: replace `background: "hsl(350, 60%, 98%)"` with a multi-layer `background` using:
```
background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(194,24,91,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(194,24,91,0.05) 0%, transparent 60%),
            url("data:image/svg+xml,...dot-pattern...") repeat,
            #fdf6f7
```
The dot pattern SVG is a single 20x20 tile with a centered circle of 1px radius in rgba(194,24,91,0.12) — barely visible, just enough texture.

---

### 2. Service Tiles — Image-Ready Redesign

Currently tiles show a large emoji at top, then name, then price — all vertically centered. The user wants to add real photos per service later. The redesign:

**Now (emoji-only mode):**
- Top 60% of tile: a soft rose-tinted rectangle placeholder zone (will become the image slot) with the emoji centered inside it at 28px — rounded top corners, flat bottom
- Bottom 40%: white background, service name in 13px 600, then pricing

**Design details of the new tile:**
- Remove the old `flex-column align-center justify-center` centered layout
- New layout: `flex-column, align-stretch` — image zone fills the top
- Image zone: `background: linear-gradient(135deg, #fce4ec 0%, #fdf6f7 100%)`, height 88px, border-radius `10px 10px 0 0`, display flex + center the emoji at 30px
- Info zone: padding `10px 10px 10px`, white bg, border-radius `0 0 10px 10px`
- Service name: 12px, 700, `#1a1a1a`, left-aligned (not centered), margin-bottom 2px
- Sale price: 14px, 700, `#c2185b`, left-aligned
- Strikethrough: 11px, `#9e9e9e`, left-aligned, above the sale price

This prepares the `image` prop: `ServiceTile` gets an optional `imageSrc?: string`. When provided, render `<img>` filling the zone. When absent, render the emoji placeholder. For now all are absent so it shows the emoji placeholder.

Selected state: border 2px `#c2185b`, the image zone gets a rose tint overlay.

The "Favorita" badge stays at top-left of the image zone, absolutely positioned.

---

### 3. Address Section (Step 2) — Map Card Upgrade

**Problem:** It looks like a plain pill of text. The user says it's "confusing."

**Solution — replace the gray pill with a proper map card:**
- A white card with a soft border (`1px solid #f0e4e8`), `border-radius: 12px`, `padding: 14px 16px`
- Inside: a thin rose line on the left (`border-left: 3px solid #c2185b`)
- Top line: `📍 Nuestro Studio` — 11px uppercase label in `#9e9e9e`
- Main line: `2121 W 84th Ave` — 15px, 700, `#1a1a1a`
- Sub line: `Thornton, CO 80260` — 13px, `#616161`
- Below: a small rose tap-to-map link: `Ver en Google Maps →` — 12px, `#c2185b`, opens maps in new tab

This makes the address look intentional and trustworthy. It's a pattern used widely in booking flows (e.g. Fresha, StyleSeat) — the map link de-risks the location concern for the user.

The "confusing" pill is removed entirely.

---

### 4. Step 3 Contact Form — Input Visibility + CTA Text

**Problems seen in the screenshot:**
- Inputs blend into the white background — barely visible border
- CTA button text is too long
- Overall the form feels clinical

**Fixes:**

**Input borders:** change from `1px solid #e0e0e0` to `1.5px solid #d0d0d0` — a bit darker so they're clearly visible against white. Add a light background tint on the inputs: `background: #fafafa` (unfocused) → `background: white` + `border: 1.5px solid #c2185b` on focus.

**Labels:** already at `#616161` — keep, but increase font-size from 11px to 12px for legibility.

**Input height:** bump from 52px to 56px — more breathing room, easier to tap on mobile.

**CTA button text:** change from `"Agendar Mi Cita con 10% de Descuento →"` to `"Agendar Mi Cita →"` — cleaner, faster to read. The 10% discount context is already visible in the form headline area.

**Add a small trust bar above the button:** three micro-badges in a row:
- `🔒 Seguro` · `⚡ Respuesta rápida` · `🎁 10% off`
- 11px, `#9e9e9e`, flexbox with dividers — replaces the current single privacy line

**Testimonial:** strengthen it — add a star row above the quote:
- `★★★★★` in `#c2185b` 12px, then the italic quote below

---

### 5. Success Screen — Better Contrast + Content

**Problems:** fields aren't visible (same white-on-white issue), content feels thin.

**Fixes:**

**Confirmation card:** currently `background: #fdf6f7`. Change to `background: #fff0f5` (slightly more rose tint) with `border: 1px solid #f8d7e3` — makes the card pop visually.

**Add a WhatsApp CTA button** below the confirmation card:
- Full width, 52px, `border-radius: 10px`
- `background: #25D366` (WhatsApp green), white text, 700
- Text: `💬 Escríbenos por WhatsApp`
- Opens `https://wa.me/17203339999?text=Hola!%20Vi%20su%20oferta%20y%20me%20gustar%C3%ADa%20agendar%20mi%20cita.` in new tab (placeholder number — user can update)

**Map section:** merge the address + Google Maps link into a single tap-to-map row (same card style as Step 2) for consistency.

**FAQ section header:** add a thin rose divider line above "Preguntas frecuentes" to visually separate the FAQ from the confirmation content.

---

### Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Add dot-texture + glow to body background |
| `src/pages/Landing.tsx` | Update outer wrapper background to match texture |
| `src/pages/Quiz.tsx` | Update PageWrapper bg, Step 2 address card, Step 3 inputs/trust bar/CTA text, Success card/WhatsApp btn |
| `src/components/ServiceTile.tsx` | New image-ready tile layout with top image zone |

