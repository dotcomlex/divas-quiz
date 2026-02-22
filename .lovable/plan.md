

## Fix Landing Page — Fit Everything on Screen

The screenshot shows the logo is way too large, pushing everything down so the user has to scroll. The promo badge is also oversized and wrapping. The CTA button needs to be bigger, and the trust pills below it are too chunky. Here's the fix:

---

### Changes to `src/pages/Landing.tsx`

#### 1. Shrink the Logo
- Reduce from `180px` width to `120px` — still visible but no longer dominating the screen
- Reduce top padding from `40px` to `20px` to move everything up

#### 2. Fix Promo Badge
- Reduce font size from `13px` to `11px`
- Reduce padding from `8px 16px` to `5px 12px`
- Reduce margin-top from `18px` to `10px`
- Keep centered alignment

#### 3. Tighten Headline
- Reduce side padding of the card from `28px` to `20px` so text wraps less
- Reduce font size from `30px` to `26px`
- Reduce margin-top from `22px` to `14px`

#### 4. Update Subheadline
- New copy: **"Mas de 1,000 mujeres en Denver ya lucen pestanas increibles. Toca el boton y agenda tu cita hoy."**
- Mentions Denver, mentions tapping the button
- Reduce margin-top from `12px` to `8px`
- Reduce font size from `16px` to `14px`

#### 5. Restore Big CTA Button
- Keep height at `56px` (this is good)
- Reduce margin-top from `28px` to `16px`
- Keep full width, keep box-shadow

#### 6. Redesign Trust Pills — Smaller, Inline
- Change from chunky pill badges to a single line of small text with separators
- Format: `+1,000 clientas · 5 estrellas Google · Garantizado`
- Font size `11px`, color `#888`, no backgrounds or borders — clean and minimal
- Reduce margin-top from `16px` to `10px`

#### 7. Tighten Testimonial
- Reduce margin-top from `20px` to `12px`
- Reduce star size from `18px` to `14px`
- Reduce quote font from `14px` to `12px`
- Reduce attribution font from `13px` to `11px`
- Reduce bottom padding from `44px` to `20px`

---

### Technical Summary

| Element | Before | After |
|---|---|---|
| Card padding | `40px 28px 44px` | `20px 20px 20px` |
| Logo width | `180px` | `120px` |
| Promo badge font | `13px` | `11px` |
| Headline font | `30px` | `26px` |
| Subheadline | Generic copy | Mentions Denver + "toca el boton" |
| Subheadline font | `16px` | `14px` |
| CTA height | `56px` | `56px` (unchanged) |
| Trust pills | 3 chunky pill badges | Single line of text with dots |
| Testimonial | Large spacing | Tighter spacing, smaller fonts |

### No Changes To
- Quiz pages, routing, Pixel events, images, colors, CTA text

