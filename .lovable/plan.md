

## Full Funnel Upgrade — All Remaining Edits

Implementing all the changes from the approved plan: new commitment step, landing page overhaul, and readability improvements.

---

### 1. New Step 3: Commitment Confirmation (Quiz.tsx)

Insert a new step between the address check (current Step 2) and the contact form (current Step 3). This shows a summary of the selected service before asking for contact info.

**What the user sees:**

```text
Step 3 of 4

Tu cita seleccionada

+----------------------------------+
|  [service image]     Set Hibrido |
|  ~~$149.99~~  $134.99            |
|  Ahorras 10%                     |
+----------------------------------+

  Satisfaccion garantizada
  Pagas despues del servicio
  Te contactamos hoy mismo

[   Continuar y Agendar  ->   ]
```

**Technical details:**
- Add a new `Step3Confirm` component inside Quiz.tsx that receives the selected service name, looks it up in the SERVICES array, and renders a horizontal card with image + price info
- The savings line reads "Ahorras 10%" (percentage only, no dollar amount)
- Three trust bullets below the card
- Single CTA button advances to Step 4 (the contact form)
- Renumber old Step 3 (contact form) to Step 4
- Update the `goBack` function to handle 4 steps
- Update step routing: Step 2 onYes goes to Step 3, Step 3 Confirm goes to Step 4

---

### 2. Progress Bar Update (ProgressBar.tsx)

- Change from 3 segments to 4 segments
- Update the comment from "1, 2, or 3" to "1, 2, 3, or 4"

---

### 3. Landing Page Overhaul (Landing.tsx)

**Copy changes:**
- Headline: "Pestanas perfectas," / "10% OFF solo este mes" (second line in rose)
- Subheadline: "Elige tu servicio, dejanos tu numero y te confirmamos tu cita hoy mismo. Rapido y sin compromiso."
- CTA: "Ver Servicios y Precios ->"

**Background texture:**
- Add a subtle visual texture to the landing card background using CSS: faint diagonal grid lines (~3% opacity, rose-tinted) and soft radial gradient blobs at corners
- Replaces flat `#fffaf9` with layered background

---

### 4. Services Page Readability (Quiz.tsx Step 1 + ServiceTile.tsx)

**Step 1 headline/subheadline (Quiz.tsx):**
- Headline: "Elige tu Servicio con 10% OFF" at 24px (up from 22px)
- Subheadline: "Oferta valida solo este mes - precios con descuento ya aplicado" at 14px (up from 13px)
- Remove the separate yellow discount pill (now redundant since "10% OFF" is in the headline)

**ServiceTile.tsx font size bumps:**
- Service name: 13px to 14px
- Original price (strikethrough): 11px to 12px, color slightly darker (#888 instead of #9e9e9e)
- Sale price: 14px to 15px
- Discount badge: 9px to 10px

---

### Files Changed

| File | What |
|---|---|
| `src/pages/Quiz.tsx` | New Step3Confirm component; renumber steps 3->4; update Step 1 headline/subheadline; remove discount pill; update goBack for 4 steps |
| `src/pages/Landing.tsx` | New headline, subheadline, CTA text; background texture on card |
| `src/components/ProgressBar.tsx` | 3 segments to 4 |
| `src/components/ServiceTile.tsx` | Bump font sizes for name, prices, discount badge |

No new dependencies or files needed.

