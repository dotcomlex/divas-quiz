

## Fix Quiz Funnel — Simplify and Correct Copy

The redesign over-complicated several screens and used incorrect CTAs that make it sound like we're sending a discount, when really we're collecting info to contact them for booking. Here are the specific fixes:

---

### 1. Reorder Services (Step 1)

Change order to: **Hibrido first**, then Clasico, Volumen (remove "Set de"), Mega Volumen, Lash Lift, Laminado de Cejas.

### 2. Step 1 — Headline / Subheadline

- Headline: **"Elige tu Servicio — Ahorra el 10%"** (restore the original style with discount mention)
- Subheadline: **"Precio especial de clienta nueva ya incluido 👇"** (keep as-is)

### 3. Step 2 — Fix Subheadline

Current (awkward): "Para agendar tu cita, necesitas poder visitarnos."
New: **"Antes de continuar, por favor confirma que puedes llegar a nuestro local."**

### 4. Step 3 — Simplify Dramatically

Remove the testimonial, location reminder, and trust bullets. Keep it simple — just the service summary card and CTA.

- Headline: **"Confirma tu servicio:"** (simpler)
- Service card: keep as-is (thumbnail, name, prices, "Ahorras 10%")
- CTA: **"Continuar →"** (not "Recibir mi oferta")
- Remove: testimonial block, location reminder, trust bullets

### 5. Step 4 — Fix All Copy

- Headline: **"¡Ya casi! ¿Cómo te contactamos?"** (we're asking for their info to contact them)
- Subheadline: **"Déjanos tu nombre y celular para agendar tu cita."**
- Phone microcopy: **"📱 Te escribimos por mensaje para confirmar tu cita. No spam, prometido."**
- CTA: **"Enviar mi info →"** (not "Quiero mi descuento")
- Trust badge: Change "10% de descuento" pill to **"💅 10% de descuento incluido"**

### 6. Success Screen — Fix "10% OFF"

Never write "10% OFF" — change service pill to: **"[Service Name] — $[price] (10% de descuento)"**

Also update body text: **"Te vamos a escribir muy pronto para agendar tu cita 💛 Revisa tus mensajes."**

---

### Technical Summary

| File | Changes |
|---|---|
| `src/pages/Quiz.tsx` | Reorder SERVICES array (Hibrido first, remove "Set de" from Volumen), fix Step 1 headline, fix Step 2 subheadline, simplify Step 3 (remove testimonial/trust/location), fix Step 4 headline/subheadline/microcopy/CTA, fix success screen pill badge text and body |

### No Changes To
- Landing page, ProgressBar, ServiceTile component, images, routing, Pixel events

