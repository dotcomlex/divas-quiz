

## Move FAQ to Contact Form Page (Step 2)

The FAQ section was added to the thank-you/success screen, but you want it on the contact form page shown in the screenshot (Step 2).

### Changes

**File: `src/pages/Quiz.tsx`**

1. **Remove FaqAccordion from SuccessScreen** - Delete the `<div>` wrapping `<FaqAccordion />` from the success screen component.

2. **Add FaqAccordion to Step4Contact** - Place `<FaqAccordion />` below the testimonial section (after the "Sandra M." quote), so it appears beneath the form and social proof on the contact step.

No new files or dependencies needed -- just moving the component from one screen to another.

