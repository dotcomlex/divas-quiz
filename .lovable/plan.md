

## Landing Page: Spacing, Padding Fix, and Horizontal Review Scroller

### Issues to Fix

1. **Headline wraps too much** — the card has `padding: 20px` on left/right which eats into headline space on small screens. Reduce to `12px` so "Sin rimel. Sin enchinador." fits on one line.
2. **Testimonial section needs more breathing room** — currently crammed at the bottom with `marginTop: 12px`.
3. **Replace single testimonial with a horizontal scrolling review carousel** — multiple reviews that auto-scroll or can be swiped, giving social proof depth.

---

### Changes to `src/pages/Landing.tsx`

#### 1. Reduce Card Side Padding
- Change padding from `20px 20px 20px` to `20px 12px 20px`
- This gives the headline more horizontal room so it wraps less

#### 2. Add More Space Before Reviews
- Increase testimonial section `marginTop` from `12px` to `18px`

#### 3. Replace Single Testimonial with Horizontal Scrolling Reviews
- Replace the single testimonial block with a horizontally scrolling row of 3 review cards
- Each card: small white rounded card with subtle shadow, stars, quote, and name
- Cards scroll horizontally with `overflow-x: auto`, snap scrolling, and hidden scrollbar
- Reviews data:
  - "Me encantaron mis pestanas! Maria es una artista. 100% recomendado." — Sandra M.
  - "Mis pestanas duran semanas. Ya no uso rimel. Las amo!" — Lucia R.
  - "El mejor servicio en Denver. Super profesional y rapido." — Ana G.
- Each card is ~240px wide, so on a 390px screen you see one full card and a peek of the next, inviting swipe
- Subtle, professional styling: white background, 8px border-radius, light shadow, 11-12px text

#### 4. CTA Button and Subheadline maxWidth
- Increase subheadline `maxWidth` from `320px` to `100%` so it uses the full card width
- CTA button stays at `56px` height, full width — no changes

---

### Technical Details

| Element | Before | After |
|---|---|---|
| Card padding | `20px 20px 20px` | `20px 12px 20px` |
| Subheadline maxWidth | `320px` | `100%` |
| Testimonial marginTop | `12px` | `18px` |
| Testimonial | Single static block | Horizontal scrolling row of 3 review cards |
| Review card width | N/A | `240px`, snap scroll |
| Scrollbar | N/A | Hidden via CSS |

### No Changes To
- Logo, promo badge, headline text, CTA button, trust signals text, routing, Pixel events, colors

