

## Redesign Trust Badges — Clean and Aesthetic

### Problem
The pill-style badges wrap text internally on mobile, creating an ugly two-line mess inside each pill. The format doesn't suit the text length.

### Solution
Replace the pill badges with a clean **3-column icon grid** — emoji centered on top, short bold text below. No background pills, no borders. Just clean, minimal, elegant typography. This is a common pattern on high-end beauty/wellness landing pages.

**Visual concept:**

```text
   💖              ⭐                ✅
 +1,000      Las mejores en     Satisfacción
clientas        Denver           garantizada
```

Each column is equal width (1/3), centered text, with the emoji larger (16px) and the label in small caps-style (10px, weight 600, color #888). No background color, no pills, no borders — just clean whitespace and alignment.

### Technical Details

**File: `src/pages/Landing.tsx`**

Replace the current trust badges section (the flex container with `.map()` over badge array) with a CSS Grid layout:

- Container: `display: grid`, `gridTemplateColumns: repeat(3, 1fr)`, `gap: 0`, `textAlign: center`, `marginTop: 12px`, `width: 100%`
- Each item: two lines — emoji (fontSize 16px, lineHeight 1) and label (fontSize 10px, fontWeight 600, color #888, fontFamily Montserrat, lineHeight 1.3, marginTop 2px)
- Labels: "+1,000 clientas", "Las mejores en Denver", "Satisfacción garantizada"
- No background, no border-radius, no box-shadow on individual items

This eliminates wrapping entirely since each column has room to breathe, and the stacked layout handles longer text gracefully.

