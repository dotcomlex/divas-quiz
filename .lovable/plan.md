

## Fix Trust Badges — One Line, No Wrapping

### Problem
The three trust badges wrap to two lines because the text is too long for a 390px screen.

### Solution
Shorten the text on each badge so all three fit on a single row:

- "💖 +1,000 clientas felices" → "💖 +1,000 clientas"
- "✅ Satisfacción garantizada" → "✅ Garantizado"
- "⭐ Atención personalizada" → "⭐ Personalizado"

Also reduce font size from 13px to 11px and padding from 6px 14px to 5px 10px, and add `flexWrap: "nowrap"` to the container so they never wrap.

### Technical Details

**File: `src/pages/Landing.tsx`**

1. Update the badge text array to shorter labels
2. Change container `flexWrap` from `"wrap"` to `"nowrap"`
3. Reduce badge font size to 11px and padding to 5px 10px

No changes to copy, routing, images, colors, or any other section.

