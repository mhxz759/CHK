# Credit Card Checker - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech and developer tools (Stripe dashboard, Linear, GitHub dark mode) with a cyberpunk/hacker aesthetic given the green/black color scheme. This is a utility-focused application where efficiency and quick readability are paramount.

## Color Palette
**Dark Theme with Neon Green Accents**
- Primary Green: #00ff00 (neon green for Live status, accents, active states)
- Background Black: #000000 (pure black base)
- Surface Dark: #1a1a1a (cards, panels, elevated surfaces)
- White: #ffffff (primary text)
- Gray Variants: #666666 (secondary text), #333333 (borders, dividers)
- Status Colors:
  - Live/Success: #00ff00 (neon green)
  - Die/Error: #ff3333 (red)
  - Unknown/Warning: #ffaa00 (amber)

## Typography
- **Primary Font**: JetBrains Mono or Roboto Mono (monospace for card numbers and technical data)
- **Secondary Font**: Inter or System UI (for labels and UI text)
- **Hierarchy**:
  - Page Title: 32px, bold, white
  - Section Headers: 20px, semibold, white
  - Card Numbers: 16px, mono, white
  - Labels: 14px, medium, gray
  - Status Text: 14px, bold, status color
  - BIN Info: 12px, regular, gray

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, py-8)
- Consistent 8px base grid for all spacing
- Container max-width: 1400px
- Section padding: py-8 desktop, py-6 mobile
- Card padding: p-6
- Gap between elements: gap-4 (16px)

## Core Layout Structure

### Main Application Layout
- **Header Bar** (full-width, fixed top):
  - App title/logo (left)
  - Stats counters (center): Live count, Die count, Unknown count in pill badges
  - Action buttons (right): Play/Start button, Settings/Generator button
  - Height: 72px, black background with subtle bottom border

- **Two-Column Layout** (desktop):
  - Left Column (40%): Input section
    - Large textarea for bulk card entry (min-height: 500px)
    - Format helper text below: "Format: number|month|year|cvv"
    - Start checking button (if not in header)
  - Right Column (60%): Results section
    - Scrollable card result feed
    - Each result as a distinct card component

- **Single Column Layout** (mobile):
  - Stack vertically: Input area → Results feed

### Card Result Component
Each validated card displays in a compact, information-dense card:
- **Structure** (left to right):
  - Status indicator: Large colored dot or badge (Live/Die/Unknown)
  - Card number: Monospace, masked format (4066 **** **** 6500)
  - BIN details section:
    - Country emoji + flag
    - Card brand icon/text (Visa, Mastercard)
    - Card type (Credit/Debit)
    - Bank name (truncated if long)
  - Response message (right-aligned or below)
  - Response time badge (small, bottom-right)

- **Visual Treatment**:
  - Dark background (#1a1a1a)
  - Subtle border matching status color
  - Rounded corners (8px)
  - Margin between cards: mb-4
  - Hover state: Slight brightness increase

### Card Generator Modal
Triggered by settings button, centered overlay:
- **Modal Layout**:
  - Title: "Generate Cards"
  - BIN input field (6-8 digits)
  - Month/Year selectors or inputs
  - CVV input (3-4 digits)
  - Quantity slider/input (1-100)
  - Generate button (full-width, green)
  - Close button (X, top-right)

- **Dimensions**: 500px width, auto height, centered with backdrop blur

## Component Library

### Buttons
- **Primary (Play/Generate)**: Green background, white text, 48px height, rounded-lg, bold
- **Secondary (Settings)**: Dark border, white text, 48px height, icon + optional text
- **Icon Buttons**: 40px square, centered icon, hover brightness

### Input Fields
- **Textarea**: Dark background, white text, green focus border, monospace font
- **Text Inputs**: Same styling as textarea, 48px height
- **Selectors**: Dark dropdown with white text, green accent on selection

### Badges & Pills
- **Status Badges**: Small rounded pills, colored background (20% opacity) + solid text
- **Counter Badges**: In header, show Live/Die/Unknown counts with icons

### Icons
Use Heroicons (outline style) via CDN:
- Settings/Gear icon for generator
- Play icon for start checking
- Check/X icons for status indicators
- Card icon for card-related actions

## Key Interactions
- **Bulk Input**: Paste multiple cards, one per line
- **Real-time Results**: Results append to feed as API responds
- **Auto-scroll**: Results container auto-scrolls to latest result
- **Clear Results**: Button to reset the results feed
- **Export**: Optional button to export results (CSV/JSON)

## Responsive Behavior
- **Desktop (1024px+)**: Two-column layout, full feature set
- **Tablet (768-1023px)**: Two-column with adjusted ratios (50/50)
- **Mobile (<768px)**: Single column, stacked layout, collapsible input section

## Accessibility
- High contrast (white on black, green accents)
- Keyboard navigation for all actions
- ARIA labels for status indicators
- Focus states with green outline
- Monospace fonts for better number readability

## Visual Polish
- Subtle scan-line effect overlay (optional, very faint)
- Smooth transitions on status changes (200ms)
- Loading states: Spinning icon or progress bar
- Error states: Red border pulse animation
- Success states: Brief green glow effect

## Information Density
Display maximum useful data without clutter:
- Card number (partially masked for security)
- Full BIN details (bank, brand, type, country with emoji)
- Clear status with color coding
- Response time for performance feedback
- Response message for context

This design prioritizes speed, clarity, and professional fintech aesthetics with a distinctive hacker/terminal vibe through the green/black color scheme.