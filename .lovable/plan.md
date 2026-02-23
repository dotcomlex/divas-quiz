

## Simplify Funnel: 4 Steps to 2 Steps

### The Problem
$100 spent on Facebook ads with zero leads. Current funnel has too many steps before capturing contact info. Every extra screen is a drop-off point.

### Current Flow (4 steps + landing)
Landing page -> Pick service -> Address check -> Service confirmation -> Contact form -> Success

### New Flow (2 steps, no landing)
Pick service -> Contact form -> Success

### What Changes

**1. Remove Landing Page**
- Update `src/App.tsx`: Change the `/` route to render `Quiz` directly (lazy-loaded) instead of `Landing`
- Remove the `Landing` import
- Users from Facebook ads land straight on the service picker -- zero wasted clicks

**2. Remove Step 2 (Address Confirmation)**
- Delete the entire address qualification step from `src/pages/Quiz.tsx`
- Remove the "disqualified" screen since there's no longer a disqualification path
- The Thornton address can be mentioned on the success screen instead ("Tu cita sera en nuestro local en Thornton...")

**3. Remove Step 3 (Service Confirmation)**
- Delete the service summary/confirmation step
- After picking a service, go straight to the contact form

**4. Update Step Numbering**
- Old Step 1 (services) becomes Step 1
- Old Step 4 (contact form) becomes Step 2
- Update `ProgressBar` to show 2 total steps instead of 4
- Update `goBack` logic accordingly

**5. Update handleServiceSelect**
- After selecting a service, go to step 2 (contact form) instead of step 2 (address)

**6. Success Screen: Add Address Info**
- Move the Thornton address mention to the success screen so they know where to go after booking, without it being a blocker before they submit their info

### Files Modified
- `src/App.tsx` -- route change (/ serves Quiz)
- `src/pages/Quiz.tsx` -- remove steps 2 and 3, renumber, update progress bar
- `src/components/ProgressBar.tsx` -- may need update if total steps is hardcoded

### Why This Works
- Facebook ad already sold them -- no need for a landing page pitch
- Qualify location AFTER you have their phone number, not before
- Every removed screen = fewer drop-offs
- Target: service pick (1 tap) then name + phone (type + submit) = lead captured in under 30 seconds
