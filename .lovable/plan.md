

## Speed, Copy, and Contact Section Cleanup

### 1. Performance: Faster Service Page Load

The main bottleneck is the complex CSS background on the quiz card container (line 234) -- it stacks 3 gradients plus a repeating-linear-gradient pattern, which forces expensive paint operations on every frame. This gets recalculated during AnimatePresence transitions.

**Fix:**
- Simplify the quiz-card background from 4 layered gradients to a single simple solid color (`#fffaf9`) or at most one subtle gradient
- This eliminates heavy paint cost on mobile devices, especially during step transitions
- The subtle diamond pattern (`repeating-linear-gradient`) is invisible to most users but costs GPU cycles

Additionally:
- Remove the `<style>` tag that gets re-rendered inside PageWrapper on every render -- move it to a static CSS approach or use a `useMemo`

### 2. Discount Copy Clarity (Step 3 Confirmation)

**Line 510:** Change `"10% de descuento este mes"` to `"Incluye 10% de descuento"` -- clearer that the discount is already applied to the shown price, not an additional discount.

**Line 831 (Success screen):** Change `"10% de descuento este mes"` to `"incluye 10% de descuento"` -- same clarity fix.

### 3. Remove "No Spam" Message (Step 4)

**Lines 690-701:** Delete the entire phone microcopy paragraph that says "Te escribimos por mensaje para confirmar tu cita. No spam, prometido."

### 4. Tighten Contact Section Layout (Step 4)

- Reduce `marginTop` on the testimonial section (line 731) from `20px` to `14px`
- Reduce phone field `marginBottom` from `6px` to `14px` (already tight) 
- Remove the empty line gaps (lines 703-704, 728-729) to tighten vertical spacing
- This keeps everything visible on screen without scrolling

### Technical Summary

**File modified:** `src/pages/Quiz.tsx`

Changes:
- Simplify background gradient on quiz-card (line 234)
- Fix discount wording on lines 510 and 831
- Delete "no spam" microcopy (lines 690-701)
- Tighten spacing in Step 4 contact section

No structural changes. No new dependencies.

