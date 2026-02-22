

## Clarity and Spacing Fixes Across Landing, Service Cards, and Confirmation

There are several issues to address across multiple files. Here is the full plan:

---

### 1. Landing Page (`src/pages/Landing.tsx`) — Better Spacing

The sections are crammed together. Add more breathing room between each element:

- Increase `marginTop` on promo badge from `10px` to `14px`
- Increase `marginTop` on headline from `14px` to `18px`
- Increase `marginTop` on subheadline from `8px` to `12px`
- Increase `marginTop` on CTA button from `16px` to `20px`
- Keep trust signals and reviews as-is (they already have good spacing)

---

### 2. Service Cards (`src/components/ServiceTile.tsx`) — Fix Badge + Price Clarity

**Problem**: The badge says "Precio Especial" which is vague. The small "-10%" pill is easy to miss. Users think the sale price IS the regular price and don't realize 10% is already applied.

**Fix for discount services** (not flat/Laminado de Cejas):
- Change the badge text from "Precio Especial" to **"Incluye 10% desc."** — yellow pill, clear message
- Make the original (before) price more visible: increase font from `12px` to `13px`, change color from `#999` to `#888`
- Remove the tiny separate "-10%" pill (it's redundant now that the badge says it)
- Keep the sale price at `15px` bold rose

**Fix for "FAVORITA" badge**:
- Make the favorita badge slightly larger: font from `9px` to `10px`, padding from `2px 7px` to `3px 9px`

**Service order change in `src/pages/Quiz.tsx`**:
- Reorder SERVICES array: Set Clasico first, then Set Hibrido, then the rest (Volumen, Mega Volumen, Lash Lift, Laminado de Cejas)

---

### 3. Step 1 Headline (`src/pages/Quiz.tsx`) — Clearer Messaging

**Problem**: "Elige tu Servicio — Ahorra el 10%" is okay but the subheadline "Precio especial de clienta nueva ya incluido" is confusing for non-tech-savvy users.

**Fix**:
- Keep headline: **"Elige tu Servicio"** (simpler, cleaner)
- Change subheadline to: **"Todos los precios ya incluyen tu 10% de descuento de clienta nueva"** — crystal clear, no ambiguity

---

### 4. Step 3 Confirmation (`src/pages/Quiz.tsx`) — Price Clarity

**Problem**: Shows sale price with "Ahorras 10%" but people think they'll get an ADDITIONAL 10% off the shown price.

**Fix**:
- Show original price more prominently: increase from `14px` to `15px`, color from `#999` to `#888`
- Below the sale price, change "Ahorras 10%" to **"Precio original: $XX.XX — Tu precio con 10% desc.: $XX.XX"** format
- Actually, simpler approach: keep the layout but change the green text from "Ahorras 10%" to **"10% de descuento ya aplicado"** — this makes it clear the discount is ALREADY in the shown price, not something extra coming later

---

### Technical Summary

**`src/pages/Landing.tsx`**:
- Increase marginTop on promo badge (10 to 14), headline (14 to 18), subheadline (8 to 12), CTA (16 to 20)

**`src/components/ServiceTile.tsx`**:
- Remove the standalone "-10%" pill (the fallback when no badgeText)
- Make FAVORITA badge slightly larger (font 9 to 10px, padding 2px 7px to 3px 9px)
- Make original price more visible (12px/#999 to 13px/#888)

**`src/pages/Quiz.tsx`**:
- Reorder SERVICES: Clasico first, Hibrido second
- Change all `badgeText: "Precio Especial"` to `"Incluye 10% desc."`
- Step 1 headline: remove "— Ahorra el 10%", update subheadline to "Todos los precios ya incluyen tu 10% de descuento de clienta nueva"
- Step 3: change "Ahorras 10%" to "10% de descuento ya aplicado"

### No Changes To
- Images, routing, Pixel events, colors, CTA button sizes, Laminado de Cejas "Precio Fijo" badge

