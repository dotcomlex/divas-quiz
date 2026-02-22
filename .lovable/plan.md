

## Step 2 & Step 3 Copy and Layout Updates

### 1. Step 2 -- Address Buttons: Rewrite Button Text

**Current buttons (lines 358-396):**
- YES: "Si, puedo ir" / "Tengo como llegar"
- NO: "Me queda muy lejos" / "No podria llegar"

**New copy:**
- YES button: **"Si, puedo ir"** (keep) / sub: **"Yo puedo llegar a este local sin problema"**
- NO button: **"No, me queda lejos"** (keep bold) / sub: **"Esta muy lejos para mi y no podre llegar a la cita"**

### 2. Step 2 -- Bottom Warning: Make It More Dominant

**Current (line 399):** Small 13px italic gray text.

**New:** Bigger, bolder, more visible warning:
- Background: `#FFF3E0` (warm orange tint) with `#FF9800` left border (4px)
- Font size: `14px`, weight `600`, color `#BF360C` (dark orange-red)
- Not italic -- straight, serious tone
- Icon: warning emoji
- Copy: **"⚠️ Por favor, solo continua si de verdad puedes llegar. Queremos respetar tu tiempo y el nuestro, y evitar citas perdidas."**

### 3. Step 3 -- Add Reassurance Message Under the Service Box

After the service summary box and before the "Continuar" button (around line 517), add a paragraph:

- Font: 13px, color `#666`, `Montserrat`
- Copy: **"Confirma que este es el servicio que quieres para contactarte y agendar. No pagas nada ahora — el pago es despues de tu servicio."**

This tells them: (a) confirm this is the right service, (b) no upfront payment, pay after service is done.

### Technical Summary

**File:** `src/pages/Quiz.tsx`
- Lines 363-364: Update YES button sub-text
- Lines 392-394: Update NO button sub-text
- Lines 399-401: Replace small italic warning with a bold warning box
- Lines 516-517: Insert reassurance paragraph before the CTA button

No new files, no dependencies, no structural changes. All copy in Mexican Spanish "tu" form.
