

## Improve Trust Signals & Add Reviews Title

### Changes to `src/pages/Landing.tsx`

#### 1. Replace trust signals text with styled pill badges
The current trust line (`+1,000 clientas · 5 estrellas Google · Garantizado`) is tiny 11px gray text that's barely visible. Replace it with three individual pill badges that are larger and more readable:

- **"+1,000 clientas felices"** — light rose background (#FFF0F3), rose text (#C2185B), with a heart or sparkle icon
- **"Satisfaccion garantizada"** — light green background (#F0FFF4), green text (#2E7D32), with a checkmark icon  
- **"Atencion personalizada"** — light blue background (#F0F4FF), blue text (#1565C0), with a star icon

Each badge: 13px font, 600 weight, rounded-full, padding 6px 14px, inline-flex with gap. No mention of Google per the request.

#### 2. Add a reviews section title
Before the review cards scroller, add a short heading like:

> **"Lo que dicen nuestras clientas"**

Style: 15px, weight 700, color #1a1a1a, center-aligned, marginTop 16px, marginBottom 8px.

#### 3. Spacing adjustments
- Trust badges container: `marginTop: 12px`, flex-wrap with gap 8px, centered
- Reviews title: `marginTop: 16px`
- Reviews scroller: `marginTop: 8px` (reduced from 18px since the title now provides separation)

### No changes to
- Copy in headline, subheadline, CTA button, or promo badge
- Routing, images, colors, fonts, or any other page

