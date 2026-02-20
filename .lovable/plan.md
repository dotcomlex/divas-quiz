
## Services Page Glow-Up — Subheadline, Engagement & AI-Generated Photos

### What's Changing

**3 focused improvements to Step 1 (the services selection screen):**

1. Subheadline copy that makes the 10% discount obvious
2. Layout and visual hierarchy improvements to the grid
3. AI-generated photos for each of the 6 service cards

---

### 1. Subheadline — "10% Off Already Applied"

Currently the subheadline reads: `"Elige una opción para continuar"` — no mention of the discount.

**New subheadline:**
- Line 1 (dark, 13px, 500): `"Elige el look que quieres lograr"`
- Line 2 (amber/yellow pill, inline): `"🏷️ 10% de descuento ya aplicado"`

The yellow pill matches the Landing page badge style — instantly recognizable as the discount signal. It's placed directly below the question, before the grid, so the user sees the savings context before they see prices.

---

### 2. Services Grid — Engagement & Hierarchy Improvements

**Current issues:**
- Subheadline is generic ("Elige una opción para continuar") — no emotional hook
- The tiles are functional but with emoji placeholders they feel basic
- Prices appear with no context about why they're discounted

**New tile info zone improvements:**
- Service name: bump from 12px → 13px, stays 700 weight
- Sale price: stays 14px rose — but now shows a small `"(-10%)"` tag in amber/yellow next to it for non-flat services, e.g. `$134.99 · -10%`
- This small `-10%` label reinforces the discount at the point of price visibility
- For the "Laminado de Cejas" flat-rate tile, no discount tag (it already says the flat price)

**Image zone height:** bump from 88px → 100px now that we have real photos — gives more visual real estate per service

---

### 3. AI-Generated Images — One Per Service Card

Six images will be generated using the AI image model. Each will be a **close-up beauty/lash photo** styled to match Divas Beauty Studio's pink/rose aesthetic.

| Card | Prompt concept |
|---|---|
| Set Híbrido | Close-up of hybrid lash extensions — mix of classic and volume, soft brown tones, studio lighting |
| Set Clásico | Close-up of classic lash extensions — natural, one-to-one, clean look, soft focus |
| Set de Volumen | Dramatic volume lash fan extensions, bold, full look, professional studio lighting |
| Mega Volumen | Ultra-dramatic mega volume lashes, extremely full, glamorous |
| Lash Lift | Before/after style — natural lashes lifted and curled, no extensions, fresh look |
| Laminado de Cejas | Close-up eyebrow lamination — perfectly groomed, brushed-up brows |

All images will be:
- Square or slightly landscape crop (consistent aspect ratio)
- Warm pink/rose toned lighting to match the brand palette
- `objectFit: cover` in the 100px image zone — so they fill perfectly regardless of exact dimensions
- Saved to `src/assets/services/` as `hybrid.jpg`, `clasico.jpg`, etc.

---

### 4. Technical Implementation

**Files to modify:**

| File | Change |
|---|---|
| `src/pages/Quiz.tsx` | Update Step1 subheadline, add discount pill, pass `imageSrc` to each ServiceTile, bump image zone reference |
| `src/components/ServiceTile.tsx` | Bump image zone height 88→100px, add small `-10%` amber tag next to sale price |
| `src/assets/services/` (new folder) | 6 AI-generated JPG images, one per service |

**Image generation approach:**
- Generate all 6 images via the Gemini image model in one pass
- Each saved as a base64 → file in `src/assets/services/`
- Referenced via static import in `SERVICES` array in `Quiz.tsx`

**No new dependencies required.** The `imageSrc` prop already exists on `ServiceTile`.

---

### Visual Result (Step 1 wireframe)

```text
¿Qué servicio te interesa?
Elige el look que quieres lograr
[🏷️ 10% de descuento ya aplicado]

┌──────────────┐  ┌──────────────┐
│  [lash photo]│  │  [lash photo]│
│──────────────│  │──────────────│
│ Set Híbrido  │  │ Set Clásico  │
│ ~~$149~~ $134│  │ ~~$99~~ $89  │
│         -10% │  │        -10%  │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│  [lash photo]│  │  [lash photo]│
│──────────────│  │──────────────│
│ Set Volumen  │  │ Mega Volumen │
│ ~~$179~~ $161│  │ ~~$119~~ $107│
│         -10% │  │        -10%  │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│  [lash photo]│  │  [brow photo]│
│──────────────│  │──────────────│
│ Lash Lift    │  │ Lam. Cejas   │
│ ~~$79~~ $71  │  │       $50.00 │
│         -10% │  │              │
└──────────────┘  └──────────────┘
```
