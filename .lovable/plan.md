

## Remove FAVORITA Badge and Fix Hybrid Image Position

### Changes

**1. Remove FAVORITA badge (`src/pages/Quiz.tsx`, line 18)**
- Set `isFavorite: false` on the Set Hibrido service entry
- This removes the gold "FAVORITA" badge from the card entirely

**2. Move Hybrid image up (`src/pages/Quiz.tsx`, line 18)**
- Change `imagePosition` from `"center 40%"` to `"center 35%"`
- At 40%, the bottom of the eye gets hidden behind the white gradient fade. Moving to 35% shifts the image up so the full eye and lash line are visible above the gradient overlay.

Both changes are on line 18 of `src/pages/Quiz.tsx` in the SERVICES array -- a single line edit.

