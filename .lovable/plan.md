
## Step 2 Redesign — "¿Puedes llegar?" Page

### Root Cause of the "Pre-Selected" Problem

The current layout uses two full-width stacked buttons: a filled rose (#c2185b) YES button and a light gray NO button. Because rose is the brand's selection/active color (used on the progress bar and selected tiles), the brain reads the filled YES button as **"already chosen."** This is a classic UX anti-pattern for binary yes/no questions.

### The Fix — Change the Button Pattern Entirely

Instead of two stacked full-width buttons (one filled, one ghost), switch to a **side-by-side two-card layout** — both options are the same visual weight, clearly selectable, and neither looks pre-chosen.

**New layout:**

```text
┌──────────────────────────────────────┐
│  Address info card (just address,    │
│  no map link, info only)             │
└──────────────────────────────────────┘

┌─────────────┐   ┌─────────────┐
│     ✅       │   │     ❌      │
│  big emoji  │   │  big emoji  │
│             │   │             │
│  Sí, puedo  │   │  Muy lejos  │
│   llegar    │   │  para mí    │
└─────────────┘   └─────────────┘
```

Each card:
- Equal width (roughly 47% each in a flex row with a gap)
- Rounded `border-radius: 14px`
- Same size — 120px tall
- White background with a `1.5px solid #e0e0e0` border
- On the YES card: a green checkmark emoji `✅` (32px), then text below
- On the NO card: a map/distance emoji `🚗` or `😔` (32px), then text below
- Text: 14px, 700, `#1a1a1a`, centered
- When tapped (whileTap): scale 0.96

This way **neither button looks pre-selected** — they're visually equal until tapped.

**On tap (onYes / onNo):** keep the instant navigation behavior, no visual selected state needed.

---

### Address Card — Simplify Further

The current address card has a rose left border + tiny uppercase "NUESTRO STUDIO" label. The label and left accent are creating visual noise. Replace with:

- A clean white card, `border: 1.5px solid #f0d0da`, `border-radius: 12px`
- A single line: `📍 2121 W 84th Ave, Thornton CO 80260`
- 14px, `#444444`, font-weight 500
- Centered text, `padding: 14px 16px`
- No left accent border, no uppercase label, no map link

This is clean, scannable, and clearly just context — not an interactive element.

---

### Question & Subtext Polish

- Headline: `"¿Puedes llegar a nuestro studio?"` — keep as-is, it's clear
- Subtext: Change from `"Atendemos con cita en Thornton, CO"` to `"Estamos en Thornton, CO — solo con cita previa"` — slightly more specific and trustworthy
- Subtext color: keep `#555555`

---

### Files to Change

| File | Change |
|------|--------|
| `src/pages/Quiz.tsx` | Replace Step2 component: new side-by-side card layout for YES/NO, simplified address card |

Only one file needs to change. No new dependencies required.
