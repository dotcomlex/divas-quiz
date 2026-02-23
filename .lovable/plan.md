

## Adjust Service Card Images and Replace Cejas Photo

### 1. Replace Brow Lamination Image
- Copy the uploaded brow photo (`user-uploads://image-14.png`) to `src/assets/services/cejas.webp` (replacing the current one)
- This new image shows the brow and eye clearly -- much better for the card

### 2. Adjust Image Positions to Keep Eyes Visible
The gradient overlay at the bottom of each card image eats into the visible area. With 110px height and a 30px gradient, the eyes need to be positioned higher/more centered to stay fully visible.

**Current positions and proposed changes in `src/pages/Quiz.tsx` (SERVICES array, lines 17-22):**

| Service | Current | New | Reason |
|---------|---------|-----|--------|
| Set Clasico | `center 40%` | `center 35%` | Eye sits a bit low, nudge up slightly |
| Set Hibrido | `center 40%` | `center 30%` | Eye is clearly cut off at the bottom (visible in screenshot) -- move up more |
| Volumen | `center 40%` | `center 35%` | Same issue as clasico |
| Mega Volumen | `center 40%` | `center 35%` | Keep eye centered |
| Lash Lift | `center 60%` | `center 55%` | Slightly higher to account for gradient |
| Laminado de Cejas | `center 25%` | `center 40%` | New image has brow at top and eye at bottom -- center more to show both |

### Technical Details

**Files to change:**
- `src/pages/Quiz.tsx` -- update 6 `imagePosition` values in the SERVICES array (lines 17-22)
- Copy uploaded image to `src/assets/services/cejas.webp` to replace current brow photo

