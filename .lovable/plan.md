

## Spanish Copy Fix, Funnel Polish, and Background Texture Across All Pages

### Overview

Multiple targeted improvements: fix all "10% OFF" English phrasing to proper Spanish, enhance the landing page copy and trust bar, polish the commitment step and success page, and apply the landing page's background texture across the entire quiz funnel.

---

### 1. Fix "10% OFF" to Spanish Everywhere

Every instance of "10% OFF" or "10% off" gets replaced with natural Spanish phrasing:

| Location | Current | New |
|---|---|---|
| Landing promo badge (line 69) | "10% de descuento este mes" | "Ahorra el 10% este mes" |
| Landing headline (line 85) | "10% OFF solo este mes." | "Ahorra el 10% solo este mes." |
| Landing trust signal (line 143) | "10% off hoy" | "Ahorra 10%" |
| Step 1 headline (line 399) | "10% OFF" | "Ahorra el 10%" |
| Step 4 trust badge (line 851) | "10% off" | "Ahorra 10%" |

---

### 2. Landing Page — Better Subheadline and CTA Copy

**Current subheadline:**
> "Elige tu servicio, dejanos tu numero y te confirmamos tu cita hoy mismo. Rapido y sin compromiso."

**New subheadline (outcome-focused, scarcity, pain-driven):**
> "Ahorra el 10% en cualquier servicio de pestanas. Solo por este mes. Oprime el boton para agendar tu cita."

This hits: discount amount, scarcity (solo por este mes), and clear CTA instruction.

---

### 3. Landing Page — Trust Signals Bar Upgrade

The current trust bar is plain text with dot separators — looks basic. Replace with a row of small pill-style badges with subtle backgrounds, each with a slightly colored icon area, making it look polished and professional.

**New design:** Three small rounded pills with light background fills, proper spacing, and slightly bolder styling:
- "🔒 +1,000 clientas" on a light gray pill
- "⭐ 5 estrellas" on a light amber pill  
- "✅ Garantizada" on a light green pill

Each pill gets: `background`, `border-radius: 20px`, `padding: 5px 12px`, proper font weight, and a subtle border. This replaces the flat text-with-dots layout.

---

### 4. Step 3 (Commitment) — Enhance With Support Message

Currently the trust bullets are:
- Satisfaccion garantizada
- Pagas despues del servicio
- Te contactamos hoy mismo

**Add a fourth bullet:**
- "Cualquier pregunta, estamos para ayudarte"

This addresses the user's request to let them know we'll answer questions and help them out.

---

### 5. Success Page — Updates

**a) Add support message to the body text (line 162):**

Current: "Recibimos tu solicitud. Te contactamos pronto para confirmar."

New: "Recibimos tu solicitud. Te contactamos pronto para confirmar tu cita. Si tienes alguna pregunta, estamos para ayudarte."

**b) Remove the divider bar before FAQ (lines 271-276):**

Delete the `borderTop` divider `<div>` that sits between the address card and the FAQ accordion.

**c) Change testimonial name on Step 4 (line 918):**

Current: "Cristina es la mejor! Las pestanas me duran semanas."

New: "Divas Beauty es increible! Las pestanas me duran semanas."

---

### 6. Background Texture Across Entire Funnel

Currently the landing page card has a nice layered background with radial gradients and diagonal grid lines. The quiz pages use a flat `#fffaf9`. Apply the same textured background to the quiz `PageWrapper`.

**Change in PageWrapper (line 376):**

Current: `background: "#fffaf9"`

New: Same layered background as Landing.tsx:
```
radial-gradient(ellipse 60% 50% at 10% 10%, rgba(194,24,91,0.06) 0%, transparent 60%),
radial-gradient(ellipse 50% 40% at 90% 90%, rgba(194,24,91,0.05) 0%, transparent 50%),
repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(194,24,91,0.03) 18px, rgba(194,24,91,0.03) 19px),
#fffaf9
```

---

### Files Changed

| File | Changes |
|---|---|
| `src/pages/Landing.tsx` | Fix "10% OFF" to "Ahorra el 10%"; update subheadline copy; redesign trust signals bar with pill badges |
| `src/pages/Quiz.tsx` | Fix "10% OFF" in Step 1 headline; fix "10% off" in Step 4 badges; add support bullet to Step 3; update success page body text; remove FAQ divider; change testimonial from "Cristina" to "Divas Beauty"; apply textured background to PageWrapper |

No new files or dependencies.

