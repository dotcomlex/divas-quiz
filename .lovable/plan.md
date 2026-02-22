
## Make Service Selection Page Load Fast

### The Problem
The service selection page takes 3.5 seconds to first paint. The main bottleneck is **massive images** — the 6 service tile images total ~3.6MB but display at only 175x120px.

| Image | Current Size | Display Size |
|-------|-------------|-------------|
| cejas.webp | 1,490 KB | 175x120 |
| volumen.webp | 979 KB | 175x120 |
| clasico.webp | 924 KB | 175x120 |
| hybrid.webp | 168 KB | 175x120 |
| mega.webp | 58 KB | 175x120 |
| lashlift.webp | ~40 KB | 175x120 |

### The Fix

#### 1. Regenerate all 6 service images at proper size
Resize each image to **350x240px** (2x retina for the 175x120 display). This alone should cut total image payload from ~3.6MB to under 200KB total.

We'll use the image generation/processing to create optimized versions, or more practically: add CSS-level constraints and use Vite's image optimization.

Since we can't run image processing tools directly, we'll implement **runtime optimizations**:

#### 2. Remove `fetchPriority="high"` from all service tile images
Currently every single image has `fetchPriority="high"` which defeats the purpose — the browser can't prioritize anything if everything is "high". Only the first 2 visible tiles (Set Clasico, Set Hibrido) should be high priority.

#### 3. Add `loading="lazy"` to below-the-fold images
The bottom 4 tiles (Volumen, Mega Volumen, Lash Lift, Laminado de Cejas) are below the fold on mobile. Add `loading="lazy"` so they only load when the user scrolls down.

#### 4. Add explicit `width` and `height` attributes
Already done, but we'll ensure proper `aspect-ratio` to prevent layout shift while images load.

#### 5. Lazy-load framer-motion
The `framer-motion` library is heavy. We'll use `React.lazy()` for the Quiz page itself so the Landing page doesn't pay for it.

### Technical Details

**`src/components/ServiceTile.tsx`**:
- Accept new optional prop `loading?: "eager" | "lazy"` (default `"lazy"`)
- Accept new optional prop `fetchPriority?: "high" | "low" | "auto"` (default `"auto"`)
- Remove hardcoded `fetchPriority="high"` from all images
- Pass these through to the `<img>` tag

**`src/pages/Quiz.tsx`**:
- Pass `loading="eager"` and `fetchPriority="high"` only to the first 2 services (Clasico, Hibrido)
- The remaining 4 get `loading="lazy"` and default priority

**`src/App.tsx`**:
- Lazy-load the Quiz page: `const Quiz = React.lazy(() => import("./pages/Quiz"))`
- Wrap the route in `<Suspense>` so the Landing page bundle stays small

### Expected Impact
- First 2 images load immediately (high priority, eager)
- Bottom 4 images deferred until scroll (lazy)
- Quiz page code split from Landing page
- Combined: FCP should drop from 3.5s to under 1.5s
