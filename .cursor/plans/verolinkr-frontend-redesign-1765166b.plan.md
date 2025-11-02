<!-- 1765166b-e0ca-4500-8407-84c4a37669c0 522b0c8a-ad37-43fd-a53b-a7a908ae12ed -->
# VeroLinkr Frontend Redesign & Completion

## Phase 1: Design System Foundation

### Create Reusable Component Library

- **Typography System**: Implement large, bold font scales (72px-96px hero headings, 48px-64px section titles, 32px-40px subsections)
- **Color Palette**: White backgrounds, black primary text, strategic gradient usage (blue-purple for brands, purple-pink for creators, green for success states)
- **Spacing System**: Generous whitespace with 8px base unit (use 48px-96px section spacing)
- **Component Library** (`src/components/design-system/`):
- `Button.tsx`: Primary (black), Secondary (gradient), Tertiary (outline) variants
- `Input.tsx`: Large, clean input fields with focus states
- `Card.tsx`: Minimal cards with subtle shadows
- `Badge.tsx`: Status, type, and category badges
- `Typography.tsx`: Heading, subheading, body, and caption components
- `Container.tsx`: Responsive max-width containers
- `Section.tsx`: Consistent section wrapper with spacing

### Global Styles & Theme

- Update `globals.css` with custom font weights (300 light, 400 regular, 700 bold, 900 black)
- Define CSS variables for consistent spacing, colors, and animations
- Set up responsive breakpoints (mobile-first approach)

## Phase 2: Landing Page Complete Redesign

### Hero Section (`src/componets/Hero.tsx`)

- **Ultra-large heading** (96px): "The Premium Platform for Authentic Influencer Marketing"
- **Minimal design**: Clean white background with subtle gradient overlay
- **Strategic gradient CTA**: Large button with animated gradient (blue-purple)
- **Remove excessive animations**: Keep only subtle parallax and fade-ins

### Problem & Solution Sections

- **Larger typography**: 64px section headings with 24px body text
- **Grid layouts**: Clean 2-3 column grids with generous spacing
- **Minimal iconography**: Simple, outlined icons like Heroicons
- **Strategic color**: Black text, gradient accents only on key elements

### Stats Section

- **Bold numbers**: 72px font-weight-900 stats
- **Clean presentation**: No backgrounds, just text with dividers
- **Animated counters**: Smooth count-up on scroll into view

### Trust Section

- **Logo wall**: Grayscale brand logos (Google/Apple style)
- **Social proof**: Large testimonials with minimal styling

## Phase 3: Authentication & Registration Flow

### Auth Page (`src/app/auth/page.tsx`)

- Redesign with minimal aesthetic: centered card, large headings (48px)
- Clean tab switcher with smooth transitions
- Large input fields (56px height) with proper focus states
- Remove gradient backgrounds, use pure white

### Creator Registration (7 Steps)

**Step 1**: Basic Info - redesign with large typography
**Step 2**: Email/Phone Verification - OTP input with auto-focus
**Step 3**: Profile Setup - name, bio, profile picture upload
**Step 4**: Social Media Links - Instagram, YouTube, TikTok connections
**Step 5**: Content Categories - multi-select with visual chips
**Step 6**: Audience Demographics - location, age range, gender split
**Step 7**: Bank Details - account info for payments (with encryption notice)

### Brand Registration (5 Steps)

**Step 1**: Company Info - redesign existing
**Step 2**: KYC Verification - GST, PAN, business documents upload
**Step 3**: Business Details - industry, target audience, budget range
**Step 4**: Campaign Preferences - campaign types interest, creator categories
**Step 5**: Payment Setup - billing info, payment methods

## Phase 4: Dashboard Refinements

### Brand Dashboard (`src/app/brand-dashboard/page.tsx`)

- **Redesign header**: 72px bold heading, minimal status badges
- **Stats cards**: Remove colored backgrounds, use borders and shadows
- **Campaign cards**: Cleaner layout, larger typography, better hierarchy
- **Gradient usage**: Only on primary CTA buttons and critical elements

### Creator Dashboard (`src/app/creator-dashboard/page.tsx`)

- Apply same design principles as brand dashboard
- Emphasize earnings and active campaigns with bold typography
- Minimal status colors, focus on clarity

### Analytics Pages

**Brand Analytics** (`src/app/brand-dashboard/analytics/page.tsx`):

- Chart visualizations with Recharts/Chart.js (minimal styling)
- ROI calculator with large, bold result displays
- Campaign performance breakdowns

**Creator Analytics** (`src/app/creator-dashboard/analytics/page.tsx`):

- Earnings timeline with clean chart
- Engagement metrics with bold numbers
- Campaign history table

## Phase 5: Campaign Management

### Campaign Creation Flow

- **CPV Campaign**: Multi-step form with clear progress indicator
- **Gigs Campaign**: Marketplace-style listing creation
- **One-Time Campaign**: Product launch campaign setup with product upload

### Campaign Detail Pages

- Large campaign title (48px), clean metadata display
- Progress tracking with minimal progress bars
- Creator list/grid with profile cards
- Real-time metrics dashboard

### Creator Campaign Views

- Available campaigns browse/filter page
- Campaign detail view with application form
- Active campaign tracking with deliverables checklist

## Phase 6: Additional Pages

### Profile Pages

- **Creator Profile**: Portfolio view, stats showcase, social proof
- **Brand Profile**: Company info, past campaigns, ratings
- **Settings**: Account settings, notification preferences, currency selection

### Support Pages

- **Contact**: Large form with minimal design
- **FAQ**: Accordion-style with search
- **Terms & Privacy**: Clean typography-focused pages

## Phase 7: Micro-interactions & Polish

### Animations

- **Hover states**: Subtle scale (1.02), shadow increase
- **Page transitions**: Smooth fade-ins using Framer Motion
- **Skeleton loaders**: For async content
- **Toast notifications**: Success, error, info states

### Responsive Design

- Mobile-first approach for all pages
- Tablet breakpoint adjustments
- Desktop optimization with max-width containers

### Currency System

- Create `CurrencyContext` for ₹ (INR) / $ (USD) switching
- Store preference in user settings (localStorage initially)
- Format all monetary values through context

## Phase 8: Component Optimization

### Navigation

- Redesign `Navigation.tsx`: Minimal header with logo, sparse menu
- Sticky navigation with blur background on scroll
- Mobile hamburger menu with full-screen overlay

### FloatingNav

- Redesign with larger icons, minimal styling
- Context-aware navigation based on user type

### Footer

- Minimal multi-column layout
- Social links, legal pages, contact info
- Newsletter signup with clean input

## Key Design Principles

1. **Typography First**: Let bold, large typography create hierarchy
2. **Whitespace**: Generous padding/margins (48px-96px sections)
3. **Minimal Color**: Black text, white backgrounds, strategic gradients
4. **Subtle Shadows**: 0-1px subtle shadows, nothing harsh
5. **Clean Interactions**: Smooth, predictable animations
6. **Mobile-First**: Responsive from the ground up
7. **Accessibility**: WCAG 2.1 AA compliance (contrast, keyboard nav)

## Files to Modify/Create

**New Design System** (~15 files):

- `src/components/design-system/` - all base components

**Existing Pages to Redesign** (~30 files):

- Landing page components (Hero, Problem, Solution, etc.)
- All auth/registration pages
- Both dashboards
- All analytics pages

**New Pages to Create** (~20 files):

- Complete registration flows
- Campaign creation/detail pages
- Profile pages
- Settings pages
- Support pages

**Infrastructure**:

- Currency context & provider
- Theme configuration
- Animation utilities
- Form validation utilities

### To-dos

- [ ] Create design system foundation with typography, colors, spacing, and base component library
- [ ] Update globals.css with design tokens, custom properties, and font configurations
- [ ] Complete redesign of landing page with Google/Apple aesthetic - Hero, Problem, Solution, Stats, Trust sections
- [ ] Redesign authentication page with minimal design and clean user flow
- [ ] Complete all 7 steps of creator registration flow with consistent design
- [ ] Complete all 5 steps of brand registration flow including KYC
- [ ] Redesign brand dashboard with bold typography and minimal color palette
- [ ] Redesign creator dashboard matching brand dashboard aesthetic
- [ ] Build analytics pages for both brand and creator with chart visualizations
- [ ] Create campaign creation flows for CPV, Gigs, and One-Time campaigns
- [ ] Build campaign detail pages with tracking and creator management
- [ ] Create profile and settings pages for creators and brands
- [ ] Implement currency context for INR/USD with user preference storage
- [ ] Redesign Navigation and FloatingNav components with minimal aesthetic
- [ ] Add polished micro-interactions, animations, and loading states throughout
- [ ] Ensure all pages are fully responsive and mobile-optimized
- [ ] Create contact, FAQ, terms, and privacy pages