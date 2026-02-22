

## Make Every Screen Fit the Viewport — No Page Scroll, Native Feel

The root cause is that every screen uses `minHeight: 100dvh`, which lets content grow beyond the viewport and triggers page-level scrolling. On mobile, this feels like a web page, not an app.

The fix: lock the outer shell to exactly `100dvh` on mobile, and if any step has more content than fits (like the 6-card service grid), scroll only the content area internally — not the whole page.

---

### Changes

#### 1. `src/pages/Quiz.tsx` — PageWrapper

Change the outer wrapper from `minHeight: 100dvh` to `height: 100dvh` with `overflow: hidden`. Restructure the quiz layout into a fixed 3-row layout:

- **Top**: Progress bar (fixed height)
- **Middle**: Step content (flex-grow, `overflow-y: auto` so it scrolls internally if needed)
- **Bottom**: Back button (fixed height)

This keeps the shell locked to the screen and only scrolls the content area if it overflows.

```
PageWrapper (height: 100dvh, overflow: hidden)
  |-- quiz-card (height: 100%, display: flex, flex-direction: column)
        |-- Progress bar area (flex-shrink: 0)
        |-- Content area (flex: 1, overflow-y: auto, -webkit-overflow-scrolling: touch)
        |-- Back button area (flex-shrink: 0)
```

On desktop (min-width 480px), keep the current card behavior with `max-height` and border-radius.

#### 2. `src/pages/Quiz.tsx` — Disqualification and Success screens

Same treatment: wrap in the fixed-height shell so they don't scroll the page. Content is centered within the available space.

#### 3. `src/pages/Landing.tsx` — Lock to viewport

Change `minHeight: 100dvh` to `height: 100dvh` on the outer container and `landing-card`. Add `overflow-y: auto` on the card so if content is slightly taller on very small screens, it scrolls internally, not the page.

#### 4. `src/index.css` — Prevent body scroll

Add `overflow: hidden` to `html, body, #root` so the page itself never scrolls. All scrolling happens inside the app shell.

---

### Technical Details

**`src/index.css`** — Add `overflow: hidden; height: 100dvh;` to `html, body, #root`

**`src/pages/Landing.tsx`**:
- Outer div: `height: 100dvh` (not `minHeight`)
- Inner `.landing-card`: `height: 100dvh` (not `minHeight`), add `overflow-y: auto`, add `-webkit-overflow-scrolling: touch`
- On desktop media query: keep `min-height: auto`

**`src/pages/Quiz.tsx`**:
- `PageWrapper` outer div: `height: 100dvh` (not `minHeight`), `overflow: hidden`
- `.quiz-card` inner div: `height: 100dvh` (not `minHeight`), `display: flex`, `flex-direction: column`
- Move the quiz rendering so that:
  - Progress bar div gets `flexShrink: 0`
  - Content area (AnimatePresence wrapper) gets `flex: 1`, `overflow-y: auto`, `-webkit-overflow-scrolling: touch`
  - Back button div gets `flexShrink: 0`
- Disqualified screen: same flex layout, content centered with `flex: 1` and `justify-content: center`
- Success screen: same flex layout, content centered

### No Changes To
- Copy, colors, images, routing, Pixel events, ServiceTile, ProgressBar

