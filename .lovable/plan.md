

## Fix Set Hibrido Image Position

The image for Set Hibrido is positioned too high at `center 30%`, making the eye barely visible. Need to move it down so the eye and lashes are properly centered in the frame.

### Change

**File: `src/pages/Quiz.tsx`, line 18**

Update `imagePosition` for Set Hibrido from `"center 30%"` to `"center 40%"`. The previous adjustment overcompensated — 40% will center the eye nicely in the 110px frame while keeping it above the gradient fade.

