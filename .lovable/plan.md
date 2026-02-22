

## Optimize Loading Speed — Services Page Focus

### 1. Delete 11 Unused Image Duplicates

The `src/assets/services/` folder contains `.jpg` and `.png` files that are never imported (only `.webp` versions are used). Removing them reduces build time and bundle size.

**Delete these files:**
- `cejas.jpg`
- `clasico.jpg`, `clasico.png`
- `hybrid.jpg`, `hybrid.png`
- `lashlift.jpg`, `lashlift2.jpg`
- `mega.jpg`, `mega.png`
- `volumen.jpg`, `volumen.png`

### 2. Memoize All Step Components

Currently `Step1`, `Step2`, `Step3Confirm`, `Step4Contact`, and `SuccessScreen` re-render on every parent state change (e.g. typing in the phone field re-renders Step1 even though it's not visible). Wrap each with `React.memo`.

**File: `src/pages/Quiz.tsx`**

### 3. Lazy-Load FaqAccordion

`FaqAccordion` is no longer used in Quiz.tsx (removed during the redesign), but the file still exists. No action needed here — it's already excluded from the bundle since it's not imported.

### 4. Add `fetchpriority="high"` to Service Tile Images

The 6 service images are above-the-fold on Step 1. Adding `fetchpriority="high"` tells the browser to prioritize downloading them.

**File: `src/components/ServiceTile.tsx`**
- Add `fetchPriority="high"` to the `<img>` tag (already has `decoding="async"` and `width`/`height`)

### 5. Defer Framer Motion Animations for Non-Visible Steps

Currently all steps import and use `motion` components. The `whileTap` on ServiceTile uses the full `motion.div`. This is already efficient since Framer Motion tree-shakes, but we can ensure the `AnimatePresence` doesn't mount hidden steps.

Already handled — `AnimatePresence mode="wait"` only renders the active step. No change needed.

### 6. Optimize Google Fonts Loading

Add `<link rel="preload">` for the Montserrat font CSS to start downloading it earlier, before the browser parses the render-blocking stylesheet.

**File: `index.html`**
- Add `<link rel="preload" as="style" href="...montserrat..." />` before the existing font link

### 7. Add Preload Hint for Logo Image

The logo appears on both Landing and Quiz pages. Adding a modulepreload won't help since Vite hashes assets, but we can add `fetchpriority="high"` to the logo `<img>` in `Landing.tsx`.

**File: `src/pages/Landing.tsx`**
- Add `fetchPriority="high"`, `width`, `height`, and `decoding="async"` to the logo `<img>`

---

### Technical Summary

| File | Changes |
|---|---|
| `src/assets/services/*.jpg, *.png` | Delete 11 unused duplicate image files |
| `src/pages/Quiz.tsx` | Wrap Step1, Step2, Step3Confirm, Step4Contact, SuccessScreen with React.memo |
| `src/components/ServiceTile.tsx` | Add `fetchPriority="high"` to img tag |
| `src/pages/Landing.tsx` | Add `fetchPriority="high"`, `width`, `height`, `decoding="async"` to logo img |
| `index.html` | Add font preload hint |

### No Changes To
- Copy, layout, colors, routing, Pixel events, or any visual element
