

## Divas Beauty Studio — Full Quiz Funnel Redesign

This is a complete copy, layout, and UX overhaul across the Landing page, all 4 quiz steps, the disqualification screen, and the post-submission confirmation screen. No image files, routing, or Pixel ID will be changed.

---

### Overview of Changes

| Area | What Changes |
|---|---|
| Landing Page | New headline, subheadline, CTA text, promo badge text, trust badges, add testimonial |
| ProgressBar | Endowed progress effect (first segment animates from 60% to 100%), gap increased to 6px, unfilled color to #F0F0F0 |
| ServiceTile | Add description prop, add "Precio Especial" / "Precio Fijo" badge, reorder cards, selected state uses #FFF0F5 bg, Hibrido gets rose border even unselected |
| Step 1 | New headline/subheadline, reorder services (Clasico first), auto-advance delay 400ms, add descriptions |
| Step 2 | Stacked vertical buttons (not side-by-side), new headline/subheadline, rose address box instead of yellow, subtext on buttons |
| Step 3 | New headline, 80x80 thumbnail, location reminder row, testimonial block, updated trust bullets with green checkmarks, new CTA text |
| Step 4 | New headline/subheadline, updated form labels (700 weight, #888, 0.08em spacing), phone microcopy, trust badges as pills with backgrounds, new CTA text, SMS consent text, avatar testimonial, disabled button at 60% opacity |
| Disqualification | Updated emoji (yellow heart), body copy, frozen progress bar at step 2 |
| Success/Confirmation | Complete redesign: emoji 🎉, personalized headline, body text, service pill badge, location reminder, NO WhatsApp button, NO FAQ, NO external links |
| Facebook Pixel | Add InitiateCheckout on landing CTA, CustomizeProduct on Step 1 select, fb_quiz_qualified/disqualified on Step 2, Lead with service data on submit, CompleteRegistration on confirmation render |

---

### File-by-File Technical Details

#### 1. `src/pages/Landing.tsx`

**Promo badge text**: Change to "🎟️ Clientas nuevas — 10% de descuento este mes", font 600, 13px, padding 8px 16px

**Headline H1**: Replace with two lines:
- Line 1: "Despierta lista." (black)  
- Line 2: "Sin rimel. Sin enchinador." (#C2185B)
- Font: 30px, ExtraBold

**Subheadline**: "Mas de 1,000 mujeres en Thornton ya tienen las pestanas de sus suenos. Tu tambien puedes." — 16px, 400 weight, maxWidth 320px

**CTA button**: Text to "Quiero mi 10% de descuento →", height 56px, border-radius 14px, box-shadow updated. Add `fbq('track', 'InitiateCheckout')` on click before navigating.

**Trust badges**: Update text to "+1,000 clientas", "5 estrellas Google", "Satisfaccion garantizada". Font 600, 13px, padding 8px 14px. Badge 3 bg: #F0FFF4, text #2E7D32.

**New testimonial block** (below trust badges):
- Stars: 5 gold stars, 18px, #F5A623
- Quote: italic, 14px, #555
- Attribution: "— Sandra M., Thornton, CO" — 600, 13px, #888
- Top margin: 20px

#### 2. `src/components/ProgressBar.tsx`

- Change gap from `gap-1` to `gap-[6px]`
- Change unfilled color from `#e0e0e0` to `#F0F0F0`
- Add endowed progress effect: when `step === 1`, the first segment starts at 60% width and animates to 100% over 600ms using a CSS transition or inline style with useEffect

#### 3. `src/components/ServiceTile.tsx`

Add new props:
- `description?: string` — short description text below name
- `badgeText?: string` — e.g. "Precio Especial" or "Precio Fijo"
- `badgeType?: "discount" | "flat"` — controls badge color (yellow vs gray)
- `highlightBorder?: boolean` — gives rose border even when unselected (for Hibrido)

Changes:
- Show description below name: 12px, #555, 400 weight, line-height 1.3
- Show badge inline below sale price: pill shape, 11px, 700 weight
  - "discount" type: bg #FFF3CD, border #F5C842, text #7A5C00
  - "flat" type: bg #F5F5F5, text #666, no border
- Selected state background: change to `#FFF0F5`
- If `highlightBorder` and not selected: border `1.5px solid #F0C0D4` (rose tint)

#### 4. `src/pages/Quiz.tsx` — SERVICES array

Reorder and update:

```
1. Set Clasico — description: "Natural y bonito. Un pelo a la vez." — badgeText: "Precio Especial", badgeType: "discount"
2. Set Hibrido — description: "Natural con mas volumen. El favorito de nuestras clientas." — FAVORITA badge stays, highlightBorder: true
3. Set de Volumen — description: "Mas lleno y dramatico. Ojos grandes y hermosos." — badgeText: "Precio Especial"
4. Mega Volumen — description: "El look mas llamativo. Para las que quieren brillar." — badgeText: "Precio Especial"
5. Lash Lift — description: "Riza tus pestanas naturales. Sin extensiones." — badgeText: "Precio Especial"
6. Laminado de Cejas — salePrice: "$49.99", description: "Cejas peinadas y definidas. Sin maquillaje." — badgeText: "Precio Fijo", badgeType: "flat"
```

#### 5. `src/pages/Quiz.tsx` — Step 1

- Headline: "¿Que pestanas quieres?" — 26px, ExtraBold (800)
- Subheadline: "Precio especial de clienta nueva ya incluido 👇" — 15px, 400, #555
- Auto-advance delay: change from 300ms to 400ms
- Add `fbq('trackCustom', 'CustomizeProduct', { content_name: serviceName })` on select

#### 6. `src/pages/Quiz.tsx` — Step 2

**Headline**: "¡Casi lista! 🎉" — 28px, ExtraBold
**Subheadline**: "Para agendar tu cita, necesitas poder visitarnos." — 15px, #555

**Address box**: Change from yellow (#fffde7) to soft rose:
- Background: #FFF0F5
- Border: 1px solid #F0C0D4
- Icon: 📍 left-aligned
- Address: "2121 W 84th Ave, Thornton CO 80260" — 600, 15px, #333
- Below: "Cerca del area de Westminster / Thornton" — 13px, #888

**Buttons**: Change from side-by-side to **stacked vertically** with 12px gap:

Button 1 (YES):
- Icon: ✅, Text: "Si, puedo ir", Subtext: "Tengo como llegar"
- White card, border 2px solid #E0E0E0, radius 14px, padding 18px
- On tap: advance + fire `fbq('trackCustom', 'fb_quiz_qualified')`

Button 2 (NO):
- Icon: 🚗, Text: "Me queda muy lejos", Subtext: "No podria llegar"
- On tap: disqualify + fire `fbq('trackCustom', 'fb_quiz_disqualified')`

#### 7. `src/pages/Quiz.tsx` — Disqualification Screen

- Change emoji from 🙏 to 💛 (40px)
- Headline: "¡Gracias por tu interes!" — 22px, ExtraBold
- Body: "Nuestro estudio esta en Thornton. Por el momento solo atendemos ahi. ¡Esperamos verte pronto!" — 15px, #555
- Show frozen progress bar at step 2 fill level (render ProgressBar with step=2 at the top)

#### 8. `src/pages/Quiz.tsx` — Step 3

**Headline**: "Esto es lo que escogiste:" — 24px, ExtraBold, no emoji

**Service summary card**: Redesign layout:
- Thumbnail: 80x80px, border-radius 10px, left aligned
- Name: 18px, ExtraBold
- Original price: strikethrough, #999, 14px
- Sale price: #C2185B, bold, 22px (largest element)
- Below: "✅ Ahorras 10%" — 600, 13px, #2E7D32

**Location reminder** (new, below card):
- "📍 Thornton, CO — 2121 W 84th Ave" — 500, 14px, #555, plain text row

**Trust bullets**: Replace emoji with consistent green checkmarks:
- ✅ Satisfaccion garantizada
- ✅ Pagas al terminar el servicio
- ✅ Te contactamos hoy mismo
- ✅ Cualquier pregunta, estamos aqui
- Font: 500, 15px, #333

**New testimonial** (below trust bullets):
- Stars: 5 gold stars centered
- Quote: "No puedo creer lo bonitas que quedaron. Ya no uso ni rimel." — italic, 14px, #555
- Attribution: "— Karla T., Denver" — 600, 13px, #888

**CTA**: "Recibir mi oferta →" (replaces "Continuar y Agendar →")

#### 9. `src/pages/Quiz.tsx` — Step 4

**Headline**: "¿A donde te mandamos tu descuento? 🎁" — 24px, ExtraBold
**Subheadline**: "Solo necesitamos tu nombre y celular. ¡Nosotras te escribimos!" — 15px, #555, line-height 1.5

**Form labels**: Update to 700 weight, #888, letter-spacing 0.08em

**Input fields**:
- Border radius: 12px (from 8px)
- Height: 52px (from 56px)
- Border idle: 1px solid #E0E0E0 (from 1.5px #b0b0b0)
- Border focus: 2px solid #C2185B
- Background: white always (remove gray #f5f5f5 unfocused state)
- Autocomplete attributes: given-name and tel

**Phone microcopy** (new, below phone field):
- "📱 Te mandamos tu descuento por mensaje. No spam, prometido." — 12px, #888, margin-top 6px

**Trust badges**: Change from inline dots to pill badges with backgrounds:
- 🔒 Seguro — bg #F5F5F5
- ⚡ Respuesta rapida — bg #FFF8E1
- 🎁 10% de descuento — bg #FFF0F5
- Each: 600, 12px, padding 5px 10px, radius 99px, gap 8px

**CTA**: "¡Quiero mi descuento! 🎉" (replaces "Agendar Mi Cita →")
- Disabled state: 60% opacity (not rgba color change)

**SMS consent** (new, below CTA):
- "Al enviar, aceptas recibir mensajes de texto de Divas Beauty Studio sobre tu cita. Puedes cancelar en cualquier momento." — 11px, #AAAAAA, centered, margin-top 10px

**Testimonial update**: Add avatar circle (40px, bg #F0E0E8, initials "SM" in #C2185B). Margin-top: 20px from consent.

#### 10. `src/pages/Quiz.tsx` — Success/Confirmation Screen

Complete redesign — remove WhatsApp button, FAQ accordion, address card with map link:

- Emoji: 🎉 — 48px, centered
- Headline: "¡Listo, [firstName]!" — 26px, ExtraBold, centered
- Body: "Te vamos a escribir muy pronto con tu oferta especial 💛 Revisa tus mensajes." — 16px, #555, centered, line-height 1.6
- Service pill badge: "[Service Name] — $[price] (10% OFF)" — bg #FFF0F5, border 1px solid #F0C0D4, radius 99px, 600, 14px, #C2185B, centered, margin-top 16px
- Location: "📍 Thornton, CO — 2121 W 84th Ave" — 500, 14px, #888, centered
- No buttons. No links. No FAQ.
- Fire `fbq('track', 'CompleteRegistration')` on render

#### 11. `src/pages/Quiz.tsx` — Facebook Pixel on Lead event

Update handleSubmit to pass service data:
```
fbq('track', 'Lead', {
  content_name: selectedService,
  value: parseFloat(service.salePrice.replace('$','')),
  currency: 'USD'
});
```

#### 12. Transition animation update

Change slideVariants from horizontal slide to fade + slide up:
```
enter: { y: 16, opacity: 0 }
center: { y: 0, opacity: 1 }
exit: { y: -16, opacity: 0 }
```
Duration: 0.3s, easing: easeOut

---

### Files Modified (Summary)

| File | Changes |
|---|---|
| `src/pages/Landing.tsx` | New copy, testimonial block, Pixel event |
| `src/components/ProgressBar.tsx` | Endowed progress, gap, unfilled color |
| `src/components/ServiceTile.tsx` | description, badge, highlightBorder props, selected bg |
| `src/pages/Quiz.tsx` | All steps, disqualification, success screen, Pixel events, transitions, SERVICES reorder |

### No Changes To
- Image files / asset paths
- Routing structure
- Facebook Pixel ID
- Tailwind config / color variables
- Font imports

