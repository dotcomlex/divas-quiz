

## Remove Testimonial/Review from Contact Form

Remove the Sandra M. review section (avatar, stars, quote, and name) from the `Step4Contact` component in `src/pages/Quiz.tsx`, keeping only the FAQ accordion below the submit button.

### Change

**File: `src/pages/Quiz.tsx`**

Delete the entire testimonial block (avatar image, stars, quote text, and "Sandra M., Thornton" name) from `Step4Contact`, leaving `<FaqAccordion />` directly after the submit button.

