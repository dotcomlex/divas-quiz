

## Refined Service Card Design: Clean, Premium, High-Converting

### Design Philosophy
The current cards work but feel a bit "template-y." The goal is to make them feel premium and spa-like while making the discount feel like a genuine deal -- not a used-car-lot sale.

### Changes

**1. Headline area (Quiz.tsx, Step1)**
- Change headline from "Oferta Solo Este Mes" to something softer but still urgent: **"Elige Tu Servicio ✨"**
- Move the discount messaging into a slim, elegant banner ABOVE the grid: a soft rose-tinted strip with text like **"🎉 10% de descuento este mes en todos los servicios"**
- This separates the urgency from the headline, making it feel less "salesy" and more like a pleasant surprise

**2. Service tile image zone (ServiceTile.tsx)**
- Add a subtle bottom gradient overlay on each image (transparent to white) so the image fades gently into the info area instead of a hard edge -- this is a common premium design pattern
- Reduce image height slightly from 120px to 110px to give more breathing room

**3. Pricing layout (ServiceTile.tsx)**
- Instead of stacking original/sale/savings vertically (3 lines of price info), consolidate into a cleaner layout:
  - Original price and sale price on the SAME line: `~~$149.99~~ $134.99` with the strikethrough smaller and the sale price bigger
  - The "Ahorras 10%" line gets a small green background pill/badge style instead of plain text, making it pop without being loud
- For the flat-price service (Cejas), keep the simple display as-is

**4. Card hover/tap feel (ServiceTile.tsx)**
- Add a very subtle inner shadow on hover/selected state instead of a heavy outer glow
- Soften the selected state: instead of the pink background (#FFF0F5), use a barely-there tint and rely on the rose border for selection indication

**5. FAVORITA badge**
- Redesign from blocky yellow to a small, elegant rose-gold pill: white text on a soft gold gradient, positioned top-left overlapping the image -- feels more "luxury" and less "clearance sale"

### Technical Details

**File: `src/pages/Quiz.tsx` (Step1 component, lines 182-223)**
- Update headline text and styling
- Add a discount banner div above the grid with rose-tinted background, centered text, rounded corners

**File: `src/components/ServiceTile.tsx`**
- Image zone (lines 67-76): Add a gradient overlay div at bottom of image (position absolute, bottom 0, linear-gradient transparent to white, ~30px tall)
- Image height: reduce from 120px to 110px
- Pricing section (lines 228-274): Restructure non-flat pricing to put original + sale price on one line; wrap "Ahorras X%" in a styled pill (background #e8f5e9, border-radius 99px, padding 2px 8px)
- Selected state (line 58): Lighten background from #FFF0F5 to #FFFBFC, reduce box-shadow intensity
- FAVORITA badge (lines 103-120): Change from yellow block to elegant gold-rose pill with updated colors (background: linear-gradient #f5c842 to #e6b830, white text, smaller font)

### What stays the same
- 2-column grid layout
- All service data, images, and positions
- The checkmark on selection
- Flat-price service styling (Cejas)
- Overall page structure and flow

### Result
Cards that feel like a boutique beauty menu, not a discount flyer. The savings are clear but presented elegantly. The headline invites rather than shouts.

