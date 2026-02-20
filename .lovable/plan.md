
## Step 2 + Step 3 Copy & Style Updates

### What's Changing

Two focused updates — no structural changes, just copy polish and a visual highlight on the address card.

---

### Change 1: Step 2 — Subheadline + Address Card Yellow Highlight

**Current subheadline (line 456):**
> "Estamos en Thornton, CO — solo con cita previa"

**New subheadline:**
> "Para agendar tu cita, ¿podrás llegar sin problema a esta dirección?"

This reframes the question around the appointment context — it's asking in service of the booking, not as a gatekeeping question. Warmer, clearer intent.

**Address card — add yellow background:**

Currently the address card is white with a pink border (`#f0d0da`). The user wants it to stand out visually as the key piece of information to read before answering. 

New address card style:
- `background: #fffde7` (very light warm yellow)
- `border: 1.5px solid #ffe082` (amber border — matches the discount pill on Step 1)
- Keep the `border-radius: 12px` and centered `📍` text
- Font color: `#444444`, font-weight: `600` (bump from 500 → 600 so it's bolder and easier to read at a glance)
- Padding: `16px 18px` (slightly more breathing room)

This makes the address card feel like a highlighted callout — the yellow background draws the eye immediately, separating it from the white card option buttons below. The user sees the address first, then answers.

---

### Change 2: Step 3 — Subheadline Update

**Current subheadline (line 585-587):**
> "Solo necesitamos tu nombre y tu número"

**New subheadline:**
> "Solo necesitamos tu nombre y número para contactarte y agendar tu cita. ¡Nosotros te escribimos!"

This clarifies:
1. What happens with their info (they'll be contacted)
2. What the outcome is (scheduling an appointment)
3. Reduces friction — "nosotros te escribimos" signals it's low-effort for the user

The color stays `#555555` at 13px — already good contrast.

---

### Files to Change

| File | Lines | Change |
|---|---|---|
| `src/pages/Quiz.tsx` | ~456 | Update Step 2 subheadline copy |
| `src/pages/Quiz.tsx` | ~459–481 | Address card: background → `#fffde7`, border → `#ffe082`, font-weight → 600 |
| `src/pages/Quiz.tsx` | ~585–587 | Update Step 3 subheadline copy |

Only one file, three small targeted edits.
