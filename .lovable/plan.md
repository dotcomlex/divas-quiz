

## Fix Set Hibrido Image - Move Eye Into View

The previous changes went in the wrong direction. In CSS `object-position`, a lower percentage moves the anchor point higher in the image, which pushes the eye area DOWN and behind the bottom gradient fade. We need to go the opposite way.

Looking at the screenshot: Set Clasico at `center 35%` shows the eye perfectly. The Hybrid photo has the eye positioned lower in the original image, so it needs a higher percentage value to bring it into the visible frame.

### Change

**File: `src/pages/Quiz.tsx`, line 18**

Change `imagePosition` for Set Hibrido from `"center 15%"` to `"center 50%"`. This shifts the visible crop area downward in the image, bringing the eye and lashes into the center of the tile instead of hiding them behind the gradient.

