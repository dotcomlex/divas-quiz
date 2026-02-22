

## Update Trust Badge Text

### Changes to `src/pages/Landing.tsx`

Update the three trust badge texts to the user's chosen copy:

- "💖 +1,000 clientas" → "💖 +1,000"
- "✅ Garantizado" → "✅ Satisfacción garantizada" 
- "⭐ Personalizado" → "⭐ Las mejores en Denver"

Since "Satisfacción garantizada" and "Las mejores en Denver" are longer, reduce font size to 10px to keep all three on one line at 390px width.

### Technical Details

**File: `src/pages/Landing.tsx`** (lines 151-153)

Update the badge array:
```
{ text: "💖 +1,000", bg: "#F5F5F5", color: "#555555" },
{ text: "⭐ Las mejores en Denver", bg: "#F5F5F5", color: "#555555" },
{ text: "✅ Satisfacción garantizada", bg: "#F5F5F5", color: "#555555" },
```

Reduce font size from 11px to 10px and padding to `4px 8px` to ensure single-line fit.

No other changes.
