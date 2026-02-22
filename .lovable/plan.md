

## Clean Up Step 4 and Add Avatar Image

### Changes to `src/pages/Quiz.tsx` — Step4Contact component

#### 1. Remove Trust Pill Badges
Remove the three pill badges ("Seguro", "Respuesta rapida", "10% de descuento incluido") at lines 708-742. They add visual clutter without much value at this stage — the user is already committed.

#### 2. Remove SMS Consent Text
Remove the SMS consent paragraph at lines 769-780. It's legally nice-to-have but adds clutter. If needed later it can be re-added in smaller form.

#### 3. Replace Avatar Placeholder with Real Image
The current testimonial shows a circle with "SM" initials. Replace it with an actual avatar image. Since there's no real photo available, we'll use a generated avatar URL (e.g., `https://api.dicebear.com/7.x/avataaars/svg?seed=Sandra`) to create a friendly, consistent avatar. This gives it a real, trustworthy feel instead of plain initials.

---

### Technical Details

**File**: `src/pages/Quiz.tsx`

| Change | Lines | Action |
|---|---|---|
| Remove trust pill badges div | 707-742 | Delete entire block |
| Remove SMS consent paragraph | 768-780 | Delete entire block |
| Replace "SM" initials div with avatar img | 785-801 | Replace with `<img>` using DiceBear avatar URL, same 40x40 circle styling |

### No Changes To
- Step 1, 2, 3, success screen, landing page, routing, Pixel events, CTA button
