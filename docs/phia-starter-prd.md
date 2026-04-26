# Phia Starter — Build PRD for Cursor

*A robust, presentation-grade demo prototype of the Phia Starter onboarding flow. Built for the Phia x Design Meetup design-a-thon final round, Sunday April 26 2026, 11am pitch.*

## How to use this doc

This PRD is written for Cursor (or any agentic coding tool). Paste it into a new Cursor chat and ask it to scaffold the project. Then build screen by screen using the per-section specs below. Sections are ordered roughly in the order you should implement them. The "Definition of done" section at the end is the final acceptance test.

## 1. Project context

**The product.** Phia Starter is a new mode inside the Phia app (a real shopping platform — Chrome extension + iOS app + price-comparison tool, founded by Phoebe Gates and Sophia Kianni, $35M Series A Jan 2026). Phia Starter helps a user with a specific high-friction shopping moment — buying a wardrobe for a new job — by anchoring on an item they were already about to buy, then building a 12-piece company-aware capsule around it.

**This prototype.** A demo built to walk an audience through the user journey in 3 minutes. Not a real product. The data is hand-curated, the company logic is faked, the checkout doesn't work. Every interaction should feel polished and tactile — this is a *visual craft* deliverable.

**The persona being demoed.** Edith, 22, just graduated, starts at a consulting firm in 2 weeks, $500 budget, mid-shop on an Aritzia Effortless Pant ($148).

**Demo requirements.**
- Run on a 1440×900 laptop screen, projected.
- Phone-frame mobile view (~380px wide × 760px tall) centered on the page.
- All clickable affordances must work; no broken states.
- Demo controls (restart, jump to screen) accessible at the bottom outside the phone frame.

## 2. Tech stack

**Recommended:**
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling (configure custom colors below)
- **Framer Motion** for transitions and the outfit-flip animation
- **Lucide-react** for icons
- Self-hosted brand fonts: **GT Super Display** (display / `font-serif` in Tailwind) + **Neue Montreal** (UI / `font-sans`), files under `public/fonts/`

If you prefer Next.js or vanilla CSS, swap in. The visual + interaction spec is what matters.

## 3. File structure

```
src/
  App.tsx                    // Root, holds screen router state
  main.tsx
  index.css                  // Tailwind + font imports
  data/
    capsule.ts               // 12 pieces with full metadata
    industries.ts            // Industry-specific dress code data
    styles.ts                // 4 style picker options
    contexts.ts              // Outfit context tags
  types/
    index.ts                 // All TS types
  components/
    PhoneFrame.tsx           // Wraps a screen in the iPhone-style frame
    PageHeader.tsx           // Title + description above the phone
    DemoControls.tsx         // Restart / jump-to-screen buttons below
    BackButton.tsx
    ProgressDots.tsx
    CTA.tsx                  // Primary + secondary button variants
    Field.tsx                // Pre-filled label + value + edit affordance
    AnchorCard.tsx           // "Your pick" item card
    DressCodeCard.tsx
    StyleCard.tsx            // Selectable mood card
    PieceCard.tsx            // Individual capsule piece in the grid
    ConfidenceSheet.tsx      // Bottom sheet with sourced trust artifact
    OutfitRow.tsx            // One row in the Cher's-closet cycler
    Tabs.tsx                 // Pieces / Outfits toggle
  screens/
    ExtensionScreen.tsx      // Screen 0
    SetupScreen.tsx          // Screen 1
    StyleScreen.tsx          // Screen 2
    CapsuleScreen.tsx        // Screen 3 (contains both views)
  hooks/
    useScreenRouter.ts       // Tiny in-memory router
```

## 4. Visual system

### Colors (Tailwind config)

```js
colors: {
  'phia-bg': '#EFEDE6',         // page background
  'phia-app': '#F4F3EF',        // inside-phone background
  'phia-card': '#FFFFFF',
  'phia-card-soft': '#ECEAE3',  // dress code card, tabs background
  'phia-blue': '#1B1FE8',       // primary
  'phia-blue-hover': '#0F12C7',
  'phia-text': '#0E0E0E',
  'phia-muted': '#6B6B68',
  'phia-border': '#E2E0D9',
  'phia-orange': '#E07A2D',     // "price typical" accent
  'phia-resale': '#2D8C5C',     // resale badge
}
```

### Typography

- **Headings:** GT Super Display (`font-serif`), weights 300–500 (Regular file backs 500). Use italic for emphasized words *("which **two** feel most like you?")*. Tight letter-spacing (-0.01em).
- **Body:** Neue Montreal (`font-sans`), 400/500 weight, comfortable line-height (1.5).
- **Labels:** Neue Montreal, 500 weight, 10–11px, uppercase, letter-spacing 0.10em.

### Spacing + sizing

- Phone frame: 380px × 760px, border-radius 36px, soft outer shadow.
- Screen padding: 28px top / 24px sides / 24px bottom.
- All cards: border-radius 12–14px.
- Primary buttons: pill shape (border-radius 999px), 14px padding-y.
- Card spacing: 8–12px gap between cards.

### Motion

Use Framer Motion. Standard easing curve: `[0.32, 0.72, 0, 1]` (smooth-out, feels native).

- Screen transitions: 200ms cross-fade.
- Bottom sheet slide-up: 300ms, ease-out.
- Outfit swatch flip: 300ms, scaleX from 1 → 0 → 1.
- Capsule grid stagger reveal: each piece animates in with 50ms delay between, scale 0.92 → 1, opacity 0 → 1.
- Context bar pulse (Screen 0): 2.4s ease-in-out infinite, box-shadow expanding from 0 → 6px in `rgba(27,31,232,0.15)`.

## 5. Data layer

### `data/capsule.ts`

Twelve pieces. Each conforms to:

```ts
export type Piece = {
  key: string;
  name: string;
  category: 'top' | 'bottom' | 'shoe' | 'outerwear' | 'accessory';
  retailer: string;
  priceNow: number;          // current price (resale or new)
  priceWas: number;          // original retail
  isResale: boolean;
  isAnchor?: boolean;        // user's seed item
  swatch: string;            // CSS class name OR image URL
  confidenceStat: string;    // sourced trust artifact
  pairsWith: string;         // styling note
};
```

The 12 pieces (industry: Consulting):

```ts
export const consultingCapsule: Piece[] = [
  {
    key: 'aritzia',
    name: 'Aritzia Effortless Pant',
    category: 'bottom',
    retailer: 'Poshmark (used)',
    priceNow: 50, priceWas: 148, isResale: true, isAnchor: true,
    swatch: 's-aritzia',
    confidenceStat: 'In 76% of first-year consulting wardrobes — your pick anchors the rest.',
    pairsWith: 'Silk shell, blazer, loafer. The capsule was built around this.'
  },
  {
    key: 'blazer', name: 'Theory tailored blazer', category: 'top',
    retailer: 'The RealReal',
    priceNow: 48, priceWas: 340, isResale: true,
    swatch: 's-navy',
    confidenceStat: 'In 78% of first-year consulting wardrobes.',
    pairsWith: 'Your Aritzia trouser, silk shell, leather loafer.'
  },
  {
    key: 'shell', name: 'Vince silk shell', category: 'top',
    retailer: 'Poshmark',
    priceNow: 32, priceWas: 185, isResale: true,
    swatch: 's-white-silk',
    confidenceStat: 'In 71% of first-year consulting wardrobes.',
    pairsWith: 'Tailored blazer, your trouser, gold hoops.'
  },
  {
    key: 'cashmere', name: 'Naadam crewneck', category: 'top',
    retailer: 'The RealReal',
    priceNow: 58, priceWas: 220, isResale: true,
    swatch: 's-cream',
    confidenceStat: 'In 62% of first-year consulting wardrobes.',
    pairsWith: 'Your trouser, dark jean, loafer.'
  },
  {
    key: 'loafer', name: 'Sam Edelman Loraine', category: 'shoe',
    retailer: 'Nordstrom',
    priceNow: 65, priceWas: 130, isResale: false,
    swatch: 's-loafer',
    confidenceStat: 'In 81% of first-year consulting wardrobes.',
    pairsWith: 'Your trouser, jean, blazer.'
  },
  {
    key: 'sneaker', name: 'Veja V-10', category: 'shoe',
    retailer: 'Veja',
    priceNow: 40, priceWas: 165, isResale: false,
    swatch: 's-sneaker',
    confidenceStat: 'In 58% of first-year consulting wardrobes.',
    pairsWith: 'Jean, button-down, trench.'
  },
  {
    key: 'trench', name: 'Burberry Kensington', category: 'outerwear',
    retailer: 'The RealReal',
    priceNow: 89, priceWas: 1890, isResale: true,
    swatch: 's-trench',
    confidenceStat: 'In 44% of first-year consulting wardrobes — favored Sept–April.',
    pairsWith: 'Anything underneath. Reads instantly polished.'
  },
  {
    key: 'jean', name: 'AGOLDE Riley straight', category: 'bottom',
    retailer: 'Madewell',
    priceNow: 35, priceWas: 188, isResale: false,
    swatch: 's-jean',
    confidenceStat: 'In 67% of first-year consulting wardrobes — Friday rotation.',
    pairsWith: 'Cashmere, button-down, sneaker.'
  },
  {
    key: 'stripe', name: 'J.Crew slim button-down', category: 'top',
    retailer: 'Poshmark',
    priceNow: 24, priceWas: 98, isResale: true,
    swatch: 's-stripe',
    confidenceStat: 'In 53% of first-year consulting wardrobes.',
    pairsWith: 'Your trouser, dark jean, loafer.'
  },
  {
    key: 'turtleneck', name: 'Uniqlo HEATTECH knit', category: 'top',
    retailer: 'Uniqlo',
    priceNow: 18, priceWas: 30, isResale: false,
    swatch: 's-turtleneck',
    confidenceStat: 'In 49% of first-year consulting wardrobes — winter layering.',
    pairsWith: 'Your trouser, jean, blazer.'
  },
  {
    key: 'tote', name: 'Madewell Transport', category: 'accessory',
    retailer: 'The RealReal',
    priceNow: 32, priceWas: 168, isResale: true,
    swatch: 's-tote',
    confidenceStat: 'In 59% of first-year consulting wardrobes.',
    pairsWith: 'Every outfit. Holds a 13" laptop.'
  },
  {
    key: 'hoops', name: 'Mejuri small hoops (gold-plated)', category: 'accessory',
    retailer: 'Mejuri',
    priceNow: 14, priceWas: 58, isResale: false,
    swatch: 's-gold',
    confidenceStat: 'In 73% of first-year consulting wardrobes.',
    pairsWith: 'Daily wear. Quiet, not flashy.'
  }
];
```

Hero stats derived from this set:
- Total now: $487, total was: $1,116, savings: $629.
- Resale count: 7 of 12.
- New count: 5 of 12.
- "62% below typical for a 12-piece work wardrobe" (hardcoded line).

### `data/industries.ts`

Stretch but recommended — lets you demo company-awareness during Q&A.

```ts
export type Industry = {
  key: string;
  label: string;
  dressCodeSummary: string;
  dressCodeSourceCount: number;  // e.g. 2140
  capsule: Piece[];              // can reuse consulting capsule for v1
};

export const industries: Industry[] = [
  {
    key: 'consulting',
    label: 'Consulting',
    dressCodeSummary: 'Polished business casual — blazers, loafers, quiet luxury.',
    dressCodeSourceCount: 2140,
    capsule: consultingCapsule
  },
  // For v1: only Consulting needs a real capsule. Stub the others with a label
  // and dress code preview only — switching industries during demo shows the
  // dress code change, even if the capsule is identical.
  {
    key: 'banking',
    label: 'Banking & finance',
    dressCodeSummary: 'Sharp formal — suiting, structured shoes, conservative palette.',
    dressCodeSourceCount: 1842,
    capsule: consultingCapsule  // stub, replace if time
  },
  {
    key: 'creative',
    label: 'Startups & creative',
    dressCodeSummary: 'Considered casual — denim, sneakers, expressive layers.',
    dressCodeSourceCount: 967,
    capsule: consultingCapsule
  },
  {
    key: 'tech',
    label: 'Tech',
    dressCodeSummary: 'Neutral comfort — clean basics, sneakers, low-key knits.',
    dressCodeSourceCount: 3104,
    capsule: consultingCapsule
  }
];
```

### `data/styles.ts`

```ts
export const styles = [
  { key: 'polished', label: 'Polished classic', gradient: 'linear-gradient(160deg, #2C3144 0%, #4A5066 50%, #1A1F30 100%)' },
  { key: 'soft',     label: 'Soft tailored',    gradient: 'linear-gradient(160deg, #C4A789 0%, #E8D7C0 50%, #8B6F52 100%)' },
  { key: 'sharp',    label: 'Sharp minimal',    gradient: 'linear-gradient(160deg, #1A1A1A 0%, #3A3A3A 50%, #0A0A0A 100%)' },
  { key: 'easy',     label: 'Easy elevated',    gradient: 'linear-gradient(160deg, #E8E1D2 0%, #F5F0E2 50%, #C4B89E 100%)' }
];
```

### `data/contexts.ts`

Used by the outfit cycler — a small contextual tag rotates through these as outfits change.

```ts
export const contexts = [
  'Day-1 ready',
  'Client meeting',
  'Casual Friday',
  'Coffee with mentor',
  'Office presentation',
  'Late dinner with team',
  'Weekend coworking',
  'Travel day'
];
```

### Swatch system

Each piece references a `swatch` key. In `index.css`, define one CSS class per swatch with a gradient that approximates the item's color/material. (A reference HTML file with all 12 swatch classes already exists at `Prototypes/phia-starter-onboarding.html` — copy the gradients from there.)

If time permits, replace gradients with real product imagery via Unsplash query URLs (e.g. `https://images.unsplash.com/photo-...`) — but only if you can find on-brand imagery in 30 minutes. Gradients are the safe fallback and look intentional.

## 6. Screens — detailed specs

### Screen 0 — Phia extension entry

**Purpose.** Mock the existing Phia Chrome extension as Edith sees it mid-shop. The "Anything coming up?" black bar is the new layer. The product surface is **Chrome extension over a real tab**; the demo frame is projection-friendly presentation chrome (see repo `src/config/prototype.ts` for layout constants).

**Aritzia PDP in context (implementation).** The retailer layer mimics the live product page: [The Effortless Pant (Crepette) on Aritzia](https://www.aritzia.com/us/en/product/the-effortless-pant%E2%84%A2/77775.html?color=1274). Use a **full-bleed screenshot** at `public/aritzia-effortless-pdp.png` (not an iframe; retailer sites often block embeds). Optionally add a very light dim/scrim so the Phia panel reads clearly.

**Layout (top to bottom, inside phone frame):**

1. Faked retailer page background — the Aritzia PDP (screenshot or simplified replica). If not using a bitmap, fall back to: Crumbs: *"Aritzia / Babaton / Effortless Pant"*. Title: *"Effortless Pant"*. Price: *"$148"*. Olive product image (use `s-aritzia` swatch). Lorem-ish description text. All set to ~50% opacity so it reads as background.

2. Phia extension panel — floats over the page, top: 50px, left/right: 16px, bottom: 24px. White-ish (`bg-phia-app`), 18px border-radius, soft shadow.
   - Header: italic serif "phia" logo (left), three circular icon buttons (bell, person, ×) (right).
   - Product card: small olive swatch + brand label "ARITZIA" + "$148" + bookmark button.
   - Price pill: orange dot + "This price is **typical**" + chevron. Use orange accent color.
   - **The hero element — context bar:** Black background (`#1A1A1A`), 14px border-radius, padding 14px. Text "Anything coming up?" in white (95% opacity). Below: chip row.
     - Chips: rounded pill (border-radius 999px), 6×12px padding, 12px font.
     - First chip "Work start" — featured (white background, dark text, 500 weight).
     - Other chips: transparent background, white text, 1px white border at 25% opacity.
   - "See visually similar" section: title + 2 rows of resale alternatives. Each row has a 36px swatch thumb + brand/source line + price + "% less" stat.

**Interaction.** Any chip tap → advance to Screen 1. Featured chip ("Work start") is the demo path.

**Animation.** The black context bar should pulse subtly (box-shadow expanding 0 → 6px in primary blue at 15% opacity, 2.4s loop). This draws the eye on first reveal.

### Screen 1 — Confirm setup

**Purpose.** Three pre-filled fields + the anchor item + dress code preview. Confirms what Phia inferred from LinkedIn.

**Layout:**

1. Top nav: back button (←) + 3-dot progress indicator (first dot active) + spacer.
2. Title: *"Build a **work-start** capsule."* (GT Super Display, 500, italic on "work-start").
3. Subtitle: "Phia will pair these around your pick. Edit anything that's off." (muted color).
4. **Anchor card** — white card with 1.5px solid blue border. Floating "YOUR PICK" badge at top-left. Inside: 56px olive swatch + brand "ARITZIA" + name "Effortless Pant" + price "$148 new · $50 used (Poshmark)".
5. Three Field components:
   - Industry: "Consulting" with "Edit" link.
   - Start date: "June 22, 2026" with "Edit" link.
   - Budget for the capsule: "$500" with "Edit" link.
6. **Dress code card** — soft-card background, 14px border-radius. Tiny uppercase label "WHAT WE KNOW ABOUT YOUR DRESS CODE" + summary in serif 15px ("Polished business casual — blazers, loafers, quiet luxury.") + source line ("Sourced from 2,140 current consultants · updated weekly").
7. CTA at bottom: "Continue" (full-width, primary blue, pill shape).

**Stretch:** clicking "Edit" on the Industry field opens a modal/drawer with the 4 industry options from `industries.ts`. Selecting a different one updates the dress code card live. This sets up a great Q&A demo: *"Watch what happens when I switch to Banking & finance..."*

### Screen 2 — Style picker

**Purpose.** Pick 2 of 4 mood cards. Phia uses both as style signals.

**Layout:**

1. Top nav: back + 3-dot progress (second dot active) + spacer.
2. Title: *"Which **two** feel most like you?"*
3. Helper line: "Pick 2 — Phia tunes the rest. **0/2 selected**" (count updates live; counter colored primary blue).
4. 2×2 grid of style cards. Each card:
   - 3:4 aspect ratio, 14px border-radius.
   - Background: full-bleed gradient swatch (from `data/styles.ts`).
   - Bottom-left label in serif white (or dark if the swatch is light — Soft and Easy variants).
   - Selected state: 2px primary-blue border, blue circle with white check at top-right.
5. CTA at bottom: "Build my capsule" (disabled until 2 selected).

**Interaction.** Tap to toggle. Max 2. CTA enables on second selection.

### Screen 3 — Capsule reveal

**Purpose.** The hero moment. Two views: Pieces (grid + confidence) and Outfits (Cher's-closet cycler).

**Layout (top section — shared across both views):**

1. Top nav: back + small "YOUR CAPSULE" label centered + spacer.
2. Title: *"Built around your **Aritzia trouser**."* (italic on the brand).
3. Subtitle: "12 pieces, 20 outfits, day one to day ninety."
4. **Tab toggle** — pill background `phia-card-soft`, two buttons inside:
   - "Pieces (12)" — active by default
   - "Outfits (20)"
   - Active tab: white background, soft shadow.
5. **Capsule hero card** — white card with subtle border:
   - Strikethrough "$1,116" + bold "$487" (serif, 24px).
   - Meta line: "7 resale · 5 new · saves $629".
   - Below: "↓ 62% below typical for a 12-piece work wardrobe" in orange accent, 11px.
6. **Pills row:** "12 pieces" / "20+ outfits" / "$50 Aritzia (resale)". Numbers in primary blue.

#### View A — Pieces

3-column grid, 12 pieces. Each piece:

- 3:4 aspect ratio, 8px border-radius.
- Full-bleed swatch.
- Top-left badge:
  - Anchor piece: "YOUR PICK" in primary blue background.
  - Resale pieces: "RESALE" in resale-green background.
  - New pieces: "NEW" in white background, dark text.
- Bottom info overlay (linear gradient from transparent to black 70%): 9px name + 8px price.
- Anchor piece has 2px outline in primary blue.
- Hover: translateY(-2px).
- On reveal (when this view becomes active or screen mounts): each piece animates in with staggered delay (50ms between, 400ms duration, scale 0.92 → 1, opacity 0 → 1).

**Tap any piece** → opens Confidence Sheet (see Components section).

#### View B — Outfits (Cher's closet)

A small italic header line above the cycler: *"— Cher's closet, but make it Phia —"*

**Three OutfitRow components stacked vertically:**

- Top row: cycles through 5 tops (blazer, shell, cashmere, button-down, turtleneck).
- Bottom row: cycles through 2 bottoms (Aritzia anchor, AGOLDE jean).
- Shoe row: cycles through 2 shoes (loafer, sneaker).

Each row layout (white card, 12px border-radius, 1px border):
- Left: 60×80 swatch (rounded 8px).
- Center: small uppercase "TOP/BOTTOM/SHOES" label + serif 14px name + 11px price.
- Right: stacked prev (◀) / next (▶) buttons (28×22, soft border, hover → primary blue background + white).
- When the anchor item is the current bottom, swatch shows a "YOUR PICK" badge in the top-left corner.

**Outfit stat line below the stack:**
"Outfit **N** of 20 · **$XXX** total · *contextual tag*"
N is the combo index. XXX is the sum of current top + bottom + shoe prices. Context tag rotates from `data/contexts.ts`.

**Action buttons (bottom):**
- "♡ Save outfit" — secondary style. Toggles to "♥ Saved" with red fill + light pink background when saved. Resets to unsaved when outfit changes.
- "✨ Dress Me" — primary style. Random combo from all three cycles. **All three swatches flip simultaneously** with the flip animation.

**Cycling animation:** When you tap an arrow or "Dress Me," the affected swatch(es) rotate around the X-axis (rotateX 0 → 90deg → 0) over 300ms. Use Framer Motion's `key` prop on the swatch element so it re-renders cleanly.

## 7. Shared components — quick specs

### `<ConfidenceSheet />`

Bottom sheet that slides up from inside the phone frame.

- Overlay: `rgba(10,10,10,0.4)`, fills the phone frame (respects 36px outer border-radius).
- Sheet: `bg-phia-app`, top corners 24px, padding 14/20/20px.
- Top: small handle bar (40×4 gray rounded).
- 3:2 hero swatch.
- Serif 18px name + 11px retailer line.
- Price row: serif 22px now + 12px strikethrough was + small green-tinted "% off" pill.
- **Confidence card:** soft-card background, 12px radius, padding 12/14. Inside: serif 15px stat + 10px source line ("Sourced from 2,140 current consultants · updated weekly").
- Pairs line: 11px muted with bold strong tag for "Pairs with:".
- Two action buttons: secondary "Swap" + primary "Keep it".

Open: `transform: translateY(100%) → translateY(0)` over 300ms.
Close: triggered by clicking outside the sheet OR clicking either action button.

### `<DemoControls />`

Below the phone frame, outside it. Three small pill buttons:
- "Restart" → goes to Screen 0
- "Style" → goes to Screen 2
- "Skip to capsule" → goes to Screen 3

Use during the live pitch when you want to jump.

### `<PhoneFrame />`

Wraps children. 380px × 760px, border-radius 36px, soft shadow. Centered on the page. `overflow-hidden` so content respects the rounded corners.

## 8. State management

Keep it simple. Three pieces of app state:

1. `currentScreen: 0 | 1 | 2 | 3` — held in App.tsx, prop-drilled or via Context.
2. `selectedStyles: string[]` — for Screen 2.
3. `capsuleView: 'pieces' | 'outfits'` — for Screen 3 tab.

Plus local state inside `CapsuleScreen` for the cycler:
- `topIdx`, `bottomIdx`, `shoeIdx`
- `savedCombo: boolean`
- `industry` (if you build the industry-switcher stretch)

No Redux, no Zustand, no localStorage. **Important:** Cursor will sometimes try to add `localStorage` or `sessionStorage` for persistence. Don't let it. Demo state is in-memory only.

## 9. Demo control affordances

Add the following to make the live pitch easier:

- **Keyboard shortcuts** (optional but nice):
  - `1`, `2`, `3`, `0` → jump to that screen.
  - `R` → restart (back to Screen 0).
  - `D` → "Dress Me" if on Outfits view.
  - `Escape` → close confidence sheet if open.

- **Auto-advance on the entry screen** (stretch): after 4 seconds of being on Screen 0, the "Work start" chip glows briefly to draw attention. Not auto-clicked — Edith still has to tap.

## 10. Definition of done

The prototype is done when all of the following are true:

- [ ] All four screens render and navigate correctly forward and backward.
- [ ] Screen 0: extension panel sits over a faked retailer background. Black "Anything coming up?" bar pulses. Tapping any chip advances.
- [ ] Screen 1: anchor card shows the Aritzia trouser with the "YOUR PICK" badge. All three fields display the correct pre-filled values. Dress code card shows the consulting summary + source count.
- [ ] Screen 2: 4 style cards render with correct gradients. Tap to toggle, max 2 selected. CTA disabled until 2 are picked. Counter updates.
- [ ] Screen 3 — Pieces view: 12-piece grid renders, anchor outlined in blue with "YOUR PICK" badge, resale pieces have green badges. Pieces stagger-animate in on first reveal.
- [ ] Screen 3 — Pieces view: tapping any piece opens the bottom sheet with that piece's data. Sheet closes by tapping outside or the action buttons.
- [ ] Screen 3 — Outfits view: three rows cycle independently. Outfit number updates. Total recalculates. Context tag rotates. Anchor "YOUR PICK" badge appears on bottom row when the Aritzia is current.
- [ ] "Dress Me" button picks a random combo and flip-animates all three swatches.
- [ ] "Save outfit" toggles state and visual (heart fills, label changes).
- [ ] Demo controls below the phone frame work.
- [ ] Project runs cleanly with `npm run dev`. No console errors. No broken images.
- [ ] Looks correct on Chrome at 1440×900 viewport.

## 11. Stretch goals (only if time permits)

These add presentation polish but aren't required.

1. **Industry switcher modal.** Tapping "Edit" on the Industry field opens a modal with the 4 industries. Switching updates the dress code card live. Lets you demo company-awareness during Q&A.

2. **Day-1 outfit preview screen.** From the Pieces view, the bottom button "Preview Day 1" opens a screen showing one assembled outfit (top + bottom + shoes + bag, vertically stacked) with a context line: *"What a first-year consultant wears to a kickoff meeting."*

3. **Real product imagery via Unsplash.** Replace gradient swatches with actual fashion photography. Use specific Unsplash photo IDs for stability. Skip this if you can't find on-brand images in 30 minutes — the gradients look intentional.

4. **Discovery animation.** When Screen 0 first mounts, run a quick sequence: extension panel slides in, product loads, "Anything coming up?" bar appears with a subtle bounce. ~1.5 seconds total. Sets the tone.

5. **Post-purchase Day-7 check-in screen.** After "Buy capsule" (currently does nothing), navigate to a 4th screen showing the wear log: 12 piece thumbnails with thumbs-up / thumbs-down / swap micro-buttons. Header: *"How was your first week?"* Closes the post-purchase use case from the brief.

6. **Sound design.** Soft "click" on chip tap, "whoosh" on screen transition. 2–3 sound files only. (Tone.js is a clean way to synthesize without files.)

## 12. Out of scope

Don't build any of the following — they'll eat time without improving the demo:

- Real authentication.
- Real backend or API.
- Real shopping cart / checkout.
- Mobile responsiveness beyond the phone-frame viewport.
- Cross-browser testing (Chrome only is fine).
- Accessibility (you're demoing, not shipping).
- Dark mode.
- Internationalization.
- Analytics, tracking, anything observability-related.
- Test coverage.
- A landing page or marketing site for the prototype.

## 13. Reference

Working static HTML version: `Prototypes/phia-starter-onboarding.html` — copy any logic, color, gradient, or text from this file. The React build is replacing this prototype, but the visual + interaction spec is identical.

*Optional (add to this repo if you have them):* pitch script and brief evaluation as `docs/pitch-script.md` and `docs/idea-3-vs-brief-evaluation.md` — the demo flow should match the script’s beats: Discovery → Setup → Style → Capsule (Pieces → Outfits → Dress Me).

## 14. Suggested build order

If you have ~6 hours total to build with Cursor:

1. **Hour 1 — Scaffold.** Vite project, Tailwind, fonts, color tokens, file structure, types, data files.
2. **Hour 2 — Shared components.** PhoneFrame, BackButton, ProgressDots, CTA, Field, Tabs.
3. **Hour 3 — Screens 1 + 2.** Setup + Style. Easiest screens, get navigation working end-to-end.
4. **Hour 4 — Screen 3 Pieces view + ConfidenceSheet.** The trust mechanic. Highest fidelity.
5. **Hour 5 — Screen 3 Outfits view + Dress Me.** The Cher's-closet cycler with the flip animation.
6. **Hour 6 — Screen 0 (extension entry) + polish.** This screen is fiddly but visual; save for last.

Stretch goals only after Hour 6 and only if Definition of Done is met.

---

*Built for the Phia × Design Meetup design-a-thon, NYC, April 25–26, 2026.*
