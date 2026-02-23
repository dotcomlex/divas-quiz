

## Two Changes: Better FAQs + More Visible Form Fields

### 1. Update FAQ Content and Design

**File: `src/components/FaqAccordion.tsx`**

**New FAQ items** (keep address, replace the rest with objection-handlers):
1. "¿Duelen las extensiones de pestañas?" -- No, es relajante. Muchas clientas se quedan dormidas.
2. "¿Dañan mis pestañas naturales?" -- No, con aplicación profesional y productos de calidad son seguras.
3. "¿Cuánto duran las extensiones?" -- 3-4 semanas. Relleno recomendado cada 2-3 semanas.
4. "¿Se ven naturales?" -- Sí, personalizamos largo, curvatura y volumen para tu forma de ojos.
5. "¿Cómo llego al studio?" -- 2121 W 84th Ave, Federal Heights, CO 80260. (KEEP THIS ONE)

**Visual redesign of FAQ section:**
- Replace the plain accordion with individual **pill-style cards** -- each question is a rounded pill with a soft rose/pink background
- When tapped, the pill expands smoothly to reveal the answer
- Add a subtle left border accent in the brand rose color (#c2185b) when expanded
- Section title gets a small sparkle emoji and slightly larger text

### 2. Make Form Fields Stand Out

**File: `src/pages/Quiz.tsx`** (Step4Contact)

- Change input default border from `#E0E0E0` to a more visible warm tone like `#d4a` or a subtle shadow
- Add a light **box-shadow** to inputs (`0 2px 8px rgba(194,24,91,0.08)`) so they "pop" against the cream background
- Add a very subtle warm border color (`#e0c0cc`) that contrasts better with `#fffaf9`
- Keep the focus state as `2px solid #c2185b` (already looks good)

### Technical Summary

| File | What Changes |
|------|-------------|
| `src/components/FaqAccordion.tsx` | Keep 5 objection-handling FAQs (including address). Redesign as pill cards with rose accents. |
| `src/pages/Quiz.tsx` | Update input borders and add box-shadow so fields pop against the cream background. |

