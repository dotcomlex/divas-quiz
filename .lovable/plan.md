
## Full UI Overhaul — Contrast, Landing, Address & Quiz Flow

### Summary of All Issues

From the screenshots and voice notes, there are 6 distinct problems to fix:

1. **Background texture is not showing** — the white card covers the whole screen (`bg-white` + `minHeight: 100dvh` on the inner card div hides the body texture completely)
2. **Landing page needs a full redesign** — remove the viewer pill, improve headline/subheadline, improve CTA and trust signals, remove the "Studio de Pestañas" subtext
3. **Step 2 address card has a Map link that takes users off the page** — remove it entirely; show address info-only
4. **Step 2 YES button looks "highlighted" / confusing** — the ✅ emoji + rose button looks like it's already selected. Redesign both option buttons for clearer visual hierarchy
5. **Everything looks too white / low contrast** — the white card on a white body means zero depth. Need a warm cream/pink card background, visible input borders, and stronger color differentiation using a yellow accent for key elements
6. **Quiz page improvements** — Step 1 tiles, Step 3 form, and the overall quiz white card all need the contrast treatment

---

### Change 1: Body Background Actually Shows

**Problem:** `Landing.tsx` and `Quiz.tsx` both have their inner card set to `bg-white` + `minHeight: 100dvh`. This means the white card always fills the full viewport — the pink dot-grid body background is never visible on mobile.

**Fix:** The outer page wrapper gets the background, and the inner white card gets a warm `#fff8f9` (very slight warm tint, not pure white) background. On desktop (≥480px), the card sits as a rounded card on the textured background. On mobile, the card fills the screen but its background is `#fff8f9` instead of cold white.

Also update `src/index.css` body background: increase the radial glow opacity from `0.07` → `0.12` and `0.05` → `0.09` so the texture is actually perceptible.

---

### Change 2: Landing Page Full Glow-Up

**Remove:**
- "Studio de Pestañas · Thornton, CO" subtext (line 64)
- The entire live viewer count pill (lines 150–183)

**Keep:** Logo, promo badge, headline, subheadline, CTA, trust line

**Improve:**

- **Promo badge:** Make it pop with a warm amber/golden yellow background instead of the pale pink — `background: #fff3cd; color: #92600a; border: 1px solid #f5c842` — this gives the "important highlight" the user asked for with yellow
- **Headline:** Change from `"Pestañas perfectas.\nCita en 60 segundos."` → `"Pestañas que duran. Cita en minutos."` — more emotional, benefit-driven
- **Subheadline:** Change from gray `#9e9e9e` to `#555555` (much more readable) and update copy: `"Elige tu servicio, dejanos tu número y te confirmamos hoy mismo."` — clearer call to action
- **CTA button:** Add a subtle pulse shadow glow to make it pop even more. Update text from `"Ver mis opciones →"` → `"¡Quiero mi descuento! →"` — more conversion-focused, ties to the 10% badge
- **Trust line below CTA:** Replace `"Sin compromiso · Solo 60 segundos"` with three icon + text badges in a flex row:
  - `✅ +1,000 clientas` · `⭐ 5 estrellas` · `🎁 10% off hoy`
  - Color: `#555555` (dark enough to actually read), 12px

---

### Change 3: Step 2 — Address Card Without Map Link + Button Redesign

**Address card:**
- Remove the `Ver en Google Maps →` anchor link entirely — keeps users on page
- The card becomes pure information: just the label, street, and city/state
- Give it a slightly warmer background: `#fff8f9` with `border: 1px solid #f0d0da` and the rose left accent. This makes it stand out from the now-warm-white card background

**YES/NO button redesign:**

Current problem: Both buttons feel similarly styled (big filled rose vs thin outlined). The ✅ emoji makes it look like it's already "checked."

**New YES button:**
- Keep rose `#c2185b` fill, white text
- Remove the ✅ emoji — replace with a right arrow → or just the text
- Text: `"Sí, puedo llegar →"` — cleaner, less "pre-selected" feeling
- Height: 60px

**New NO button:**
- Background: `#f5f5f5` (light gray fill — NOT white, so it's clearly different from the card background)
- Border: `1px solid #e0e0e0`
- Color: `#616161` (darker than current `#757575`)
- Text: `"No, está muy lejos"` — remove the 📍 emoji (confusing since it's also in the address)
- Height: 52px

This makes the visual hierarchy immediately clear: big rose = yes action, smaller gray = no/exit.

---

### Change 4: Global Contrast Boost with Yellow Accent

The user specifically asked for yellow on "important stuff." Apply this to:

- **Promo badge** (Landing): amber/yellow as described above
- **"Favorita" badge** on the Set Híbrido tile: change from `#c2185b` rose to `#f5c842` yellow with dark text `#7a5c00` — makes it feel like a "star pick" highlight
- **Trust badges / micro-badges** in Step 3: darken the color from `#9e9e9e` to `#555555`
- **Testimonial text** in Step 3: darken from `#9e9e9e` to `#555555`
- **Hint text** under all step headings: `#757575` → `#555555`
- **Form input borders**: change unfocused from `#d0d0d0` to `#b0b0b0` (noticeably darker — the user says inputs aren't visible)
- **Form input background**: change from `#fafafa` to `#f5f5f5` (warm gray, creates visible contrast against the card)

---

### Change 5: Quiz Card Background (The Core Contrast Fix)

**The root cause of "everything looks white":**

The `.quiz-card` div and the landing card both use `bg-white`. Since the body texture is behind them, and the cards are full-bleed on mobile, you see nothing but white.

**Fix:** Change the inner card background from `bg-white` / `background: white` to a very warm cream: `#fffaf9`. This is 1–2% warmer than white and creates visible separation from pure white elements (inputs, address cards, service tiles).

Then, explicitly give the address card, service tiles, and form inputs a `background: white` so they stand out from the `#fffaf9` card body. This creates a 3-layer contrast system:

```text
Body background: textured pink/cream (#fdf6f7 + dot texture + glow)
  └── Quiz card: warm cream (#fffaf9)
        └── Inputs, tiles, address cards: pure white (#ffffff)
              └── Selected tile tint: rose (#fff0f5)
```

---

### Files to Modify

| File | Changes |
|---|---|
| `src/index.css` | Increase glow intensity on body radial gradients |
| `src/pages/Landing.tsx` | Remove subtext + viewer pill, restyle badge to yellow, new headline/subheadline/CTA/trust signals |
| `src/pages/Quiz.tsx` | Card bg → `#fffaf9`, Step 2 address card remove map link + redesign YES/NO buttons, Step 3 darken all secondary text + input borders |
| `src/components/ServiceTile.tsx` | "Favorita" badge → yellow, tile background → white (to contrast against card) |
