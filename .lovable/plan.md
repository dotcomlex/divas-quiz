

## Restyle "No sé cuál elegir" as a Clear Button

**File: `src/pages/Quiz.tsx`** (Step1 component)

Replace the current dashed-border pink card with a solid, clearly clickable button:

- **Background**: Warm neutral tone like `#2d2d2d` (dark charcoal) or `#5c4033` (warm brown) so it contrasts against the pink/cream page instead of blending in
- **Text**: White, bold, single line -- "No sé cuál elegir"
- **Subtitle**: Light gray/white subtitle below -- "Te ayudamos a escoger el mejor estilo →"
- **Shape**: Full-width rounded button (`border-radius: 14px`), solid background, no dashed border
- **Height**: ~56px to match the submit button feel
- Same click behavior (calls `onSelect("No sé cuál elegir")`)

This makes it unmistakably a button and the dark color creates strong contrast against the light pink page.

