

## Improve Service Cards to "Wow" with Discount Visibility

### Headline and Subheadline

**Current:**
- Headline: "Elige tu Servicio"
- Sub: "Todos los precios ya incluyen tu 10% de descuento solo por este mes"

**New -- more urgent, emotional, discount-forward:**
- Headline: "🔥 Oferta Solo Este Mes" (bigger, bolder, creates urgency)
- Sub: "10% de descuento en todos los servicios. Elige el tuyo y te contactamos hoy 👇"

This leads with the deal, not the action. People scroll Facebook, see an ad, land here -- they need to immediately feel "this is a deal I can't miss."

### Service Tile Pricing Redesign

The current tiles show the original price small and gray (easy to miss), and the discount badge is a tiny pill. We need to make the savings impossible to ignore.

**Changes to `ServiceTile.tsx` pricing section (non-flat services only):**

1. **Original price**: Bump to `14px`, keep strikethrough, but use a slightly more visible red-gray (`#999` to `#aa7777`) so it reads as "was this much"
2. **Sale price**: Increase to `17px`, keep bold rose color -- make it the hero number
3. **Savings callout**: Replace the small "Incluye 10% desc." pill with a bold green savings line: **"Ahorras $X.XX"** in green (`#2e7d32`) with a small tag icon, positioned right below the sale price. This is the "wow" moment -- people see exactly how many dollars they save, not just a percentage.
4. **Remove the badge pill** for discounted services -- the savings line replaces it and is more impactful

**Example for Set Hibrido:**
```
  $149.99  (strikethrough, visible)
  $134.99  (big, bold, rose)
  Ahorras $15.00  (green, bold)
```

### Calculated Savings

We add a `savings` field or compute it on the fly in `ServiceTile`:
- Set Clasico: $99.99 - $89.99 = **$10.00**
- Set Hibrido: $149.99 - $134.99 = **$15.00**
- Volumen: $179.99 - $161.99 = **$18.00**
- Mega Volumen: $119.99 - $107.99 = **$12.00**
- Lash Lift: $79.99 - $71.99 = **$8.00**
- Laminado de Cejas: no discount (flat price, stays as-is)

### Technical Changes

**File: `src/components/ServiceTile.tsx`**
- In the non-flat pricing block (lines 229-274):
  - Compute savings from `originalPrice` and `salePrice` (parse the dollar values, subtract)
  - Show original price at 14px with strikethrough
  - Show sale price at 17px bold rose
  - Show "Ahorras $X.XX" in green bold below
  - Remove the `badgeText` pill for discount-type services
- Keep the flat pricing section unchanged (Laminado de Cejas stays with "Precio Fijo" badge)

**File: `src/pages/Quiz.tsx`**
- Lines 184-198: Update headline to "Oferta Solo Este Mes" with fire emoji, update subheadline copy

### No structural changes
Same files, same components, same props. Just visual and copy tweaks to make the discount feel real and urgent.

