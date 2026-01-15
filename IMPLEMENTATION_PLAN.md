# Justin He Portfolio - Implementation Plan

## Overview
Landing page with animated signature drawing, dynamic background, and interactive category system.

## Tech Stack
- **Next.js 16** + React 19 + TypeScript
- **anime.js** - SVG path animations, CSS variable animations, timelines
- **grained.js** - Animated grain/noise background
- **Tailwind CSS** - Styling and layout
- **CSS Variables** - Dynamic color theming

---

## Visual Concept

### Landing State
- Centered signature vector drawing left to right
- Grainy background with slow-moving green gradient

### Split State
- Signature moves to left column (40% width)
- Left: Signature + personal message (2-3 sentences)
- Right: Three categories (Projects, Hobbies, Blog) in 60% width

### Hover States
- **Projects** → Blue theme, signature redraws in blue
- **Hobbies** → Red theme, signature redraws in red
- **Blog** → Yellow theme, signature redraws in yellow
- Background gradient transitions left to right

### Focused State (after click)
- Page shrinks to thin sidebar (50-100px)
- Sidebar: Signature at top (home), three category icons below
- Main area: Card grid for selected category
- Background faded to 30-40% opacity

---

## Phased Implementation

### Phase 1: Foundation Setup ✓
**Goal:** Get dependencies and basic structure ready

**Tasks:**
- [x] Install anime.js: `npm install animejs`
- [ ] Download grained.js (or use CDN)
- [ ] Copy vector SVG to `/public/justin_j_vector.svg`
- [ ] Create basic Next.js page structure with TypeScript
- [ ] Set up CSS variables for color themes

**Deliverable:** Blank page with dependencies loaded

---

### Phase 2: Animated Grain Background
**Goal:** Create the moving grainy gradient background

**Implementation:**
- Use `grained.js` to generate animated grain texture
- CSS gradient background (white with green gradient)
- Slow CSS animation for gradient position movement
- Set up CSS variables for background colors: `--bg-color-1`, `--bg-color-2`

**Test:** Background should have visible grain that slowly shifts

**Code approach:**
```javascript
grained('#container', {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.15,
  grainDensity: 1
});
```

---

### Phase 3: Center Vector + Path Drawing
**Goal:** SVG signature draws itself from left to right in center of screen

**Implementation:**
- Center the SVG absolutely on the page
- Use anime.js to animate `strokeDashoffset` from full length to 0
- Duration: ~2-3 seconds
- Use the vector's single `<path>` element

**Test:** Vector should smoothly draw on page load

**Code approach:**
```javascript
anime({
  targets: '.signature-path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutQuad',
  duration: 2500
});
```

---

### Phase 4: Split Screen Animation
**Goal:** After drawing, vector slides left and screen splits into two columns

**Implementation:**
- Create timeline with anime.js
- Step 1: Drawing animation (from Phase 3)
- Step 2: Translate vector to left position using CSS transforms
- Step 3: Fade in two-column grid layout (CSS Grid)
- Left column: 40%, Right column: 60%

**Test:** Smooth transition from centered to split layout

**Code approach:**
```javascript
const timeline = anime.timeline();
timeline
  .add({ /* drawing animation */ })
  .add({
    targets: '.signature',
    translateX: '-40vw',
    duration: 800,
    easing: 'easeOutCubic'
  })
  .add({
    targets: '.split-layout',
    opacity: [0, 1],
    duration: 600
  }, '-=400'); // Overlap slightly
```

---

### Phase 5: Content Fade-In + Email Signup
**Goal:** Text and categories appear after split, with email signup form

**Implementation:**

**Left Column:**
- Your message (2-3 sentences) below vector
- Underlined text button below message: "sign up for my email list :)"
- On click: Inline expand to show email input + submit button
- On submit: Animate to checkmark + "thank you for signing up!"
- Supabase integration for storing emails

**Right Column:**
- Three category buttons (Projects, Hobbies, Blog)

**Animations:**
- Stagger fade-in for all content using anime.js
- Email form expand/collapse animation
- Success state transition animation

**Test:** Content appears smoothly, email form expands/submits/confirms

**Code approach:**
```javascript
// Content fade-in
anime({
  targets: ['.message', '.email-signup', '.category-btn'],
  opacity: [0, 1],
  translateY: [20, 0],
  delay: anime.stagger(150)
});

// Email form expand animation
anime({
  targets: '.email-input-container',
  height: [0, 'auto'],
  opacity: [0, 1],
  duration: 400,
  easing: 'easeOutCubic'
});
```

**Supabase Setup (during this phase):**
1. Install: `npm install @supabase/supabase-js @supabase/ssr`
2. Create Supabase project + get API keys
3. Create `email_list` table with `id`, `email`, `created_at`
4. Add `.env.local` with Supabase credentials
5. Create Supabase client utility
6. Build EmailSignup component with form states

---

### Phase 6: Hover Effects + Theme Switching
**Goal:** Category hover changes entire theme with vector redraw

**Implementation:**
- Define 4 color themes (default green, projects blue, hobbies red, blog yellow)
- On hover:
  - Animate CSS variables for background gradient colors
  - Highlight category text
  - Redraw vector in new color (reset strokeDashoffset and animate again)
- Use smooth left-to-right gradient sweep effect

**Test:** Hovering each category smoothly transitions theme

**Code approach:**
```javascript
// Hover Projects → Blue theme
anime({
  targets: ':root',
  '--bg-color-1': '#E3F2FD',
  '--bg-color-2': '#1976D2',
  duration: 800,
  easing: 'easeInOutQuad'
});

// Redraw signature in blue
anime({
  targets: '.signature-path',
  stroke: '#1976D2',
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 1500
});
```

---

### Phase 7: Click → Sidebar Collapse
**Goal:** Page shrinks to thin left sidebar, main content area opens

**Implementation:**
- Click category → trigger shrink animation
- Animate layout from 40/60 split to 100px sidebar / rest main
- Sidebar content:
  - Vector at top (home button, clickable)
  - Three icons below (representing categories)
- Main area prepares for card layout
- Background opacity reduces to 30-40%

**Test:** Smooth collapse animation, sidebar functional

**Code approach:**
```javascript
anime({
  targets: '.left-column',
  width: '100px',
  duration: 600,
  easing: 'easeInOutQuart'
});

anime({
  targets: '.background-overlay',
  opacity: [0, 0.7], // Dim background
  duration: 600
});
```

---

### Phase 8: Card Grid Layout
**Goal:** Display category content as cards in main area

**Implementation:**
- Create card components (different styles per category)
- Grid layout with Tailwind (responsive)
- Animate cards in with stagger effect
- Category switching animates old cards out, new cards in
- Background remains visible but faded

**Test:** Cards display properly, category switching works smoothly

**Code approach:**
```javascript
// Animate cards in
anime({
  targets: '.card',
  opacity: [0, 1],
  translateY: [40, 0],
  delay: anime.stagger(100, {start: 300}),
  easing: 'easeOutExpo'
});
```

---

### Phase 9: Mobile Responsive Design
**Goal:** Make the site work beautifully on mobile devices

**Landing Page (Mobile):**
- Signature draws centered (same as desktop)
- After drawing, signature scales down and moves to top
- Content stacks vertically:
  1. Signature at top (smaller)
  2. Personal message below
  3. Email signup below message
  4. Category buttons stacked below

**Split Layout → Vertical Stack:**
```css
/* Mobile breakpoint */
@media (max-width: 768px) {
  .grid-cols-2 → flex flex-col
}
```

**Category Page (Mobile):**
- **Header** instead of sidebar:
  - Signature logo (left)
  - Category icons (right) or hamburger menu
  - Fixed at top, ~60px height
- Cards fill full width below header
- Background still visible but more faded

**Touch Interactions:**
- Category buttons: Increase tap target size (min 44px height)
- Remove hover effects, use active states instead
- Swipe gestures for card navigation (optional)

**Responsive Breakpoints:**
- Mobile: < 768px (stack vertically)
- Tablet: 768px - 1024px (adjust proportions)
- Desktop: > 1024px (current 2-column layout)

**Animation Adjustments:**
- Faster animations on mobile (reduce duration by 30%)
- Simpler transitions (avoid complex blur effects)
- Reduce particle count in grain background for performance

**Implementation:**
```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

// Responsive text sizes
<p className="text-2xl md:text-3xl lg:text-3xl">

// Mobile header (after category click)
{isMobile && categorySelected ? (
  <MobileHeader signature={<Signature />} />
) : (
  <Sidebar />
)}
```

**Test:**
- Test on actual mobile devices (iPhone, Android)
- Verify touch targets are adequate
- Check animation performance on lower-end devices

---

## Technical Decisions

| Feature | Solution | Reason |
|---------|----------|--------|
| **SVG Animation** | anime.js strokeDashoffset | Perfect for path drawing, smooth control |
| **Background Grain** | grained.js | Lightweight (~2KB), animated grain built-in |
| **Color Transitions** | anime.js + CSS variables | Smooth theme switching across entire page |
| **Layout Animations** | anime.js + CSS Grid | Clean transitions, responsive |
| **Page Transitions** | anime.js timelines | Sequential control, easier than Framer Motion here |
| **Email List** | Supabase | Free tier, no backend needed, instant setup |

---

## File Structure

```
src/
├── app/
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # CSS variables, Tailwind, grain styles
│   └── components/
│       ├── Signature.tsx   # SVG component
│       ├── GrainBackground.tsx
│       ├── EmailSignup.tsx # Email list signup form
│       ├── CategoryButton.tsx
│       ├── Sidebar.tsx
│       ├── MobileHeader.tsx # Mobile header (Phase 9)
│       └── CardGrid.tsx
├── lib/
│   └── supabase.ts        # Supabase client setup
├── hooks/
│   └── useIsMobile.ts     # Mobile detection hook (Phase 9)
public/
└── justin_j_vector.svg    # Your signature
.env.local                 # Supabase credentials (not committed)
```

---

## Color Themes

```css
:root {
  /* Default (Green) */
  --theme-primary: #4CAF50;
  --theme-bg-1: #E8F5E9;
  --theme-bg-2: #4CAF50;
}

/* Projects (Blue) */
--theme-primary: #2196F3;
--theme-bg-1: #E3F2FD;
--theme-bg-2: #1976D2;

/* Hobbies (Red) */
--theme-primary: #F44336;
--theme-bg-1: #FFEBEE;
--theme-bg-2: #C62828;

/* Blog (Yellow) */
--theme-primary: #FFC107;
--theme-bg-1: #FFF8E1;
--theme-bg-2: #F57F17;
```

---

## Email Signup Feature (Phase 5)

### User Flow

**State 1: Initial**
- Display: Underlined text link "sign up for my email list :)"
- Position: Below personal message in left column

**State 2: Expanded (on click)**
- Animate height expand
- Show: Email input field + Submit button
- Input placeholder: "your@email.com"
- Button: "Submit" or "→"

**State 3: Success**
- Replace form with checkmark icon
- Show: "thank you for signing up!"
- Fade in animation

### Supabase Table Schema

```sql
CREATE TABLE email_list (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp DEFAULT now(),
  source text DEFAULT 'homepage'
);

-- Add index for faster lookups
CREATE INDEX idx_email_list_email ON email_list(email);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE email_list ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert
CREATE POLICY "Anyone can insert emails"
  ON email_list FOR INSERT
  TO anon
  WITH CHECK (true);
```

### Component States

```typescript
// EmailSignup component states
type SignupState = 'initial' | 'expanded' | 'submitting' | 'success' | 'error';

interface EmailSignupProps {
  onSuccess?: () => void;
}
```

### Implementation Checklist

- [ ] Create Supabase project
- [ ] Set up email_list table
- [ ] Add environment variables to .env.local
- [ ] Create lib/supabase.ts client
- [ ] Build EmailSignup component with 3 states
- [ ] Add anime.js animations for state transitions
- [ ] Test form validation (email format)
- [ ] Test duplicate email handling
- [ ] Test success/error states

---

## Resources

### Animation Libraries
- [anime.js CSS Variables](https://animejs.com/documentation/animation/animatable-properties/css-variables/)
- [anime.js CSS Variable Tweens](https://animejs.com/documentation/animation/tween-value-types/css-variable/)
- [anime.js Color Values](https://animejs.com/documentation/animation/tween-value-types/color-value/)
- [grained.js](https://sarathsaleem.github.io/grained/)
- [grained.js GitHub](https://github.com/sarathsaleem/grained)

### Supabase
- [Supabase Next.js Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Build a Waitlist with Supabase](https://tinloof.com/blog/how-to-build-a-waitlist-with-supabase-and-next-js)
- [Supabase Next.js Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

---

## Vector File Info

**Path:** `/Users/justinhe/Downloads/justin_j_vector.svg`

**SVG Details:**
- Single `<path>` element (perfect for strokeDashoffset animation)
- ViewBox: 283x195
- White stroke, 2px width
- Signature style: smooth continuous line from left to right
