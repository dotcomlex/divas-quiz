

## Clean Up Trust Badges & Update Promo Text

### Changes to `src/pages/Landing.tsx`

#### 1. Make all trust badges one solid color
Right now each badge has a different background and text color (rose, green, blue) which looks busy. Change all three to use the same subtle rose theme so they feel cohesive:
- Background: `#FFF0F3` (light rose) for all three
- Text color: `#C2185B` (brand rose) for all three
- Keep the emoji icons as visual differentiators

#### 2. Update promo badge text
Change from:
> "Clientas nuevas — 10% de descuento este mes"

To:
> "10% de descuento este mes"

Remove the "Clientas nuevas" / "for new clients" qualifier as requested.

### No changes to
- Headline, subheadline, CTA button text
- Reviews section, routing, images, colors, fonts

