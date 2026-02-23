

## Add FAQ Section to Success Screen

There's already a `FaqAccordion` component built with animated expand/collapse. We'll update the address to the correct one (**Federal Heights** instead of Thornton) and add the FAQ to the success/confirmation screen.

### Changes

**1. Update address in FaqAccordion (`src/components/FaqAccordion.tsx`)**
- Fix the location answer from "Thornton, CO 80260" to **"Federal Heights, CO 80260"**

**2. Update address in Success Screen (`src/pages/Quiz.tsx`)**
- Fix the location line from "Thornton, CO" to **"Federal Heights, CO"**

**3. Add FaqAccordion to Success Screen (`src/pages/Quiz.tsx`)**
- Import `FaqAccordion`
- Place it below the location text inside the `SuccessScreen` component
- Adjust the success screen layout: reduce top padding and switch from centered flex to top-aligned scrollable layout so the FAQ fits nicely below the confirmation info
- Add horizontal padding so the FAQ aligns with the rest of the content

