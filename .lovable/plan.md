

## Revamp the Thank You Page

### Overview
Transform the current bare-bones success screen into an engaging, trust-building confirmation page with clear next steps, a prominent address card, and a horizontally scrollable strip of 5 detailed reviews from women across Denver.

### Content Structure (top to bottom)

1. **Celebration header** -- keep the party emoji + "Listo, {name}!" title
2. **Service badge** -- keep the selected service pill (already exists)
3. **"Next Steps" section** -- a styled card explaining:
   - "Te vamos a enviar un mensaje de texto muy pronto"
   - "Vamos a repasar los detalles de tu servicio"
   - "Juntas seleccionamos el dia y hora perfecta para tu cita"
   - Use numbered steps (1, 2, 3) with small icons or emoji for clarity
4. **Address card** -- more prominent, styled as a highlighted box with a pin icon, bold address text, warm background (like the yellow `#FFFDE7` from the brand palette)
5. **Reviews strip** -- horizontal scrollable row of 5 review cards from women in Denver neighborhoods (Aurora, Lakewood, Thornton, Westminster, Arvada). Each card shows:
   - Avatar image (use the 4 existing avatar assets + 1 reused)
   - Name and neighborhood
   - Star rating (5 stars)
   - 2-3 sentence detailed testimonial in Spanish mentioning Divas Beauty

### Files Changed

**`src/pages/Quiz.tsx`** -- Rewrite the `SuccessScreen` component:
- Add a "Pasos Siguientes" numbered section
- Restyle the address as a prominent card with yellow/gold background
- Add a horizontally scrollable reviews section using the existing avatar images (`avatar-ana.webp`, `avatar-jessica.webp`, `avatar-lucia.webp`, `avatar-sandra.webp`) plus reusing one for a 5th reviewer
- Reviews data defined as a const array with name, location (Denver neighborhoods), avatar import, and testimonial text
- All inline styles consistent with existing patterns (Montserrat font, brand colors)

