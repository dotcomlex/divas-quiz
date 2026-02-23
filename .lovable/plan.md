

## Make "No sé cuál elegir" a Prominent, Clickable Button

The current dark charcoal (`#2d2d2d`) blends into the bottom of the page and looks like a footer element. The fix is to use the brand's primary pink/magenta (`#c2185b`) as the background -- the same color used for the submit button. This makes it unmistakably a clickable button that matches the rest of the UI.

### Changes

**File: `src/pages/Quiz.tsx`** (Step1 component, the "No sé cuál elegir" button)

- **Background**: Change from `#2d2d2d` to `#c2185b` (the brand pink already used for the submit button)
- **Add shadow**: `box-shadow: 0 4px 16px rgba(194,24,91,0.25)` to give it depth and make it pop off the page
- **Keep everything else the same**: white text, 56px height, 14px border-radius, same click behavior

This reuses the brand's action color so it reads as a primary button, not a passive footer.

