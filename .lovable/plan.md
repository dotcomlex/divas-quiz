

## Optimize Service Tile Images for Instant Style Recognition

The 5 new images are loading correctly. To ensure customers immediately see each lash style, I'll make two improvements:

### 1. Increase image height
The current 100px height crops the lash photos too aggressively. Bumping to **120px** gives more room to show the lash style while keeping tiles compact on mobile.

### 2. Add per-service focal point positioning
Each photo has the lashes in a slightly different position. Using `objectPosition` per image ensures the lash style is always centered in the crop:

| Service | Focus | objectPosition |
|---|---|---|
| Set Hibrido | Eye/lashes center | `center 40%` |
| Set Clasico | Eye/lashes center | `center 40%` |
| Set de Volumen | Eye/lashes center | `center 40%` |
| Mega Volumen | Eye/lashes center | `center 40%` |
| Lash Lift | Natural lifted lashes | `center 30%` |
| Laminado de Cejas | Brows | `center center` (default) |

### Technical Details

**ServiceTile.tsx**
- Add optional `imagePosition` prop (string, defaults to `"center center"`)
- Apply it as `objectPosition` on the `<img>` tag
- Change image container height from `100px` to `120px`

**Quiz.tsx (SERVICES array)**
- Add `imagePosition` field to each service entry with the appropriate focal point value

### Files Changed

| File | What |
|---|---|
| `src/components/ServiceTile.tsx` | Add `imagePosition` prop, increase image height to 120px |
| `src/pages/Quiz.tsx` | Add `imagePosition` values to SERVICES array |
