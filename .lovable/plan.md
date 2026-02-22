

## Make Landing Page More Compact — Fill the Empty Space

### Problem
The landing page content (logo, headline, CTA, reviews) sits at the top of a `100dvh` container, leaving a large empty gap at the bottom on taller phones. The content only takes up about 60-70% of the screen.

### Solution
Vertically center all content within the card so it sits in the middle of the screen instead of being pinned to the top. This eliminates the dead space at the bottom and makes the page feel balanced on any phone size.

### Technical Details

**File: `src/pages/Landing.tsx`**

1. **Change the inner card from top-aligned to vertically centered**: Add `justify-content: center` to the `.landing-card` flex container so content sits in the middle of the viewport rather than the top.

2. **Tighten spacing slightly**: Reduce some of the top margins (e.g., headline `marginTop` from 18px to 14px, CTA `marginTop` from 20px to 16px) so the content block is more compact as a unit.

3. **Keep `overflowY: auto`** so on very short screens (older iPhones, landscape) it still scrolls if needed.

No changes to copy, routing, images, colors, or any other page.

