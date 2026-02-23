

## Add "No sé cuál elegir" Option to Service Selection

### What

Add a friendly, visible call-to-action at the bottom of the service grid (Step 1) for clients who are unsure which service to pick. When tapped, it skips service selection and goes straight to the contact form so the team can help them choose.

### Design

- Placed below the 6 service tiles
- Styled as a soft, rounded pill/card with a warm background (light rose or similar) so it stands out but doesn't compete with the service tiles
- Text like: "¿No sabes cuál elegir? Nosotras te ayudamos a escoger el mejor estilo para ti"
- A subtle arrow or tap indicator
- When clicked, sets selectedService to something like "No sé cuál elegir" and advances to Step 2

### File Changed

**`src/pages/Quiz.tsx`**

- In the `Step1` component, add a clickable card/button below the service grid
- When clicked, call `onSelect("No sé cuál elegir")` which will set the service name and advance to the contact form
- The webhook submission will send "No sé cuál elegir" as the service name so the team knows to assist

