

## Add Spacing Between CTA Section and Reviews

### Problem
The reviews section ("Lo que dicen nuestras clientas" heading + review cards) sits too close to the trust badges above, making the layout feel cramped.

### Solution
Increase the `marginTop` on the reviews title from `16px` to `28px`. This adds breathing room between the trust badges and the testimonials section, giving each section its own visual space.

### Technical Details

**File: `src/pages/Landing.tsx`**

- Change the "Lo que dicen nuestras clientas" paragraph's `marginTop` from `"16px"` to `"28px"`

One-line change, no other modifications.

