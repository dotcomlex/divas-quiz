
## Two Issues to Fix: Logo & Contrast

### Issue 1: Logo Stuck in Quiz Header
The logo is currently rendered on every quiz step inside the shared `PageWrapper` layout in `Quiz.tsx` (lines 220–222). It was placed there to mirror the landing page branding, but it takes up valuable space and feels "stuck" since it doesn't move with the slide transitions. The fix is simple: **remove the logo block entirely from the quiz header** (lines 219–222 in `Quiz.tsx`).

### Issue 2: Low Contrast — What to Fix and Why

After reviewing the code, here are all the low-contrast elements and the recommended fix for each:

**Current problem areas:**

| Element | Current color | Issue |
|---|---|---|
| Hint text ("Elige una opción...") | `#9e9e9e` | WCAG AA fails on white bg |
| Form labels ("TU NOMBRE", "TU CELULAR") | `#9e9e9e` | Too light for uppercase labels |
| Privacy line | `#bdbdbd` | Very low contrast |
| Testimonial text + attribution | `#bdbdbd` | Nearly invisible |
| Strikethrough original prices | `#bdbdbd` | Hard to read even as secondary |
| Address pill text on Step 2 | `#9e9e9e` | Low contrast on `#f5f5f5` bg |
| Map address text on success | `#9e9e9e` | Low contrast |
| "← Regresar" back link | `#9e9e9e` | Low contrast |

**Recommended contrast improvements:**

- **Hint text** under questions: `#9e9e9e` → `#757575` (darker gray, much more readable, still clearly secondary)
- **Form labels** ("TU NOMBRE", "TU CELULAR"): `#9e9e9e` → `#616161` (dark enough for small uppercase text to pass contrast)
- **Privacy line**: `#bdbdbd` → `#9e9e9e` (one step darker, keeps it subtle but readable)
- **Testimonial text**: `#bdbdbd` → `#9e9e9e` (same — readable but still clearly secondary/subdued)
- **Strikethrough prices**: `#bdbdbd` → `#9e9e9e` (still visually "crossed out" but legible)
- **Address pill text**: `#9e9e9e` → `#757575` on the `#f5f5f5` background
- **"← Regresar"**: `#9e9e9e` → `#757575`
- **Disabled button**: Keep white text on the `rgba(194,24,91,0.35)` — this communicates "not yet available" cleanly. No change needed here.

### Files to Change
- **`src/pages/Quiz.tsx`**: Remove logo header (3 lines), update all color values listed above
- **`src/components/ServiceTile.tsx`**: Update strikethrough price color from `#bdbdbd` → `#9e9e9e`

### What stays the same
- The brand rose `#c2185b` — perfect contrast on white
- Headlines `#1a1a1a` — already excellent contrast
- The tile service names `#1a1a1a` — no change needed
- The selected tile rose tint — no change needed
- The disabled button opacity approach — intentional UX signal
