

## Multi-Part Update: Reviews, Discount Copy, Address Box, and Performance

### 1. Landing Page Reviews -- Fix Copy and Add Avatars

**Problem:** Reviews mention "Maria" (not a real person at the salon) and are too short. No avatars make them look generic.

**Changes to `src/pages/Landing.tsx` (lines 205-247):**

- Rewrite all 3 reviews to reference "Divas Beauty" naturally, make them longer and more authentic
- Add avatar images using `ui-avatars.com` or `i.pravatar.cc` placeholder service for realistic circular photos of young women (20-25 age range)
- Each review card gets a small 28px circle avatar next to the name

New reviews:
1. "Llevo 3 meses yendo a Divas Beauty y mis pestanas siempre quedan perfectas. El equipo es super profesional y te hacen sentir como en casa. Ya no uso rimel para nada." -- Jessica L.
2. "Mi amiga me recomendo Divas Beauty y desde la primera vez quede encantada. Las pestanas duran semanas y se ven super naturales. 100% recomendado." -- Lucia R.
3. "El mejor lugar de pestanas en Denver. En Divas Beauty siempre me atienden rapido y el resultado es increible. Todas mis amigas ya van ahi." -- Ana G.

For avatars: Use free placeholder images from `https://i.pravatar.cc/56?img=X` (generates realistic face photos). These are lightweight (< 3KB each at 56px) and look like real people.

---

### 2. Fix Discount Copy -- "Este Mes" Not "Clienta Nueva"

**Problem:** Step 1 says "descuento de clienta nueva" but the promo is 10% off THIS MONTH, not for new clients only.

**Changes to `src/pages/Quiz.tsx`:**

- **Line 260:** Change `"Todos los precios ya incluyen tu 10% de descuento de clienta nueva"` to `"Todos los precios ya incluyen tu 10% de descuento solo por este mes"`
- **Line 516:** Change `"10% de descuento ya aplicado"` to `"10% de descuento este mes"` (Step 3 confirm)
- **Line 837:** Change `"10% de descuento"` to `"10% de descuento este mes"` (success screen)

Also scan service badge texts -- lines 17-22 currently say "Incluye 10% desc." which is fine (no "new client" mention).

---

### 3. Step 2 Address Box -- Yellow Background and Extra Copy

**Problem:** Address box is pink (#FFF0F5), user wants it yellowish and more prominent. "Cerca del area de Westminster / Thornton" subtext should be removed. Needs helper text under buttons.

**Changes to `src/pages/Quiz.tsx` (lines 310-407):**

- Change address box background from `#FFF0F5` to `#FFFDE7` (warm yellow)
- Change border from `#F0C0D4` to `#F5C842` (gold border)
- Remove "Cerca del area de Westminster / Thornton" subtext (lines 334-343)
- Add a small helper paragraph below the two buttons: "Para respetar tu tiempo y el nuestro, asegurate de que puedes llegar a nuestro local antes de continuar." (13px, #999, italic)

---

### 4. Performance -- Faster Quiz Page Load

**Changes:**
- Add `will-change: transform` to the motion container to hint GPU compositing
- Preload the first 2 service images (hybrid and clasico) using `<link rel="preload">` in `index.html` -- actually these are imported assets so they're already bundled. Instead:
  - Add `loading="eager"` and `decoding="sync"` to the first 2 service tile images (already partially done with `fetchPriority="high"`)
  - Reduce the AnimatePresence transition duration from 0.3s to 0.2s for snappier step transitions
  - The `setTimeout(() => setStep(2), 400)` delay on service select (line 56) -- reduce from 400ms to 250ms for snappier feel

---

### Technical Summary

**Files modified:**
1. `src/pages/Landing.tsx` -- Review cards (copy + avatars)
2. `src/pages/Quiz.tsx` -- Discount copy (3 locations), address box styling, subtext removal, helper text, performance tweaks

**No structural changes.** No routing changes. No new dependencies. All copy in Mexican Spanish with "tu" form.

