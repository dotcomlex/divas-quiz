

## Fix Lash Lift + Replace Brow Lamination Image

Three changes:

### 1. Fix Lash Lift alignment
Change `imagePosition` from `"center 30%"` to `"center 60%"` so the eye/lashes are centered in the crop.

### 2. Replace Laminado de Cejas image
Copy the new before/after brow lamination photo (uploaded image) to `src/assets/services/cejas.webp`, replacing the current one.

### 3. Adjust Cejas positioning for the split image
Since this is a vertical before/after split (top half + bottom half), set `imagePosition: "center 25%"` to focus on the top brow result, ensuring the groomed brow is clearly visible in the 120px crop. The tile is roughly 175x120px so we want to show the best portion of the split.

### Files Changed

| File | What |
|---|---|
| `src/assets/services/cejas.webp` | Replace with new before/after brow image |
| `src/pages/Quiz.tsx` | Fix Lash Lift to `"center 60%"`, add `imagePosition: "center 25%"` to Cejas |

