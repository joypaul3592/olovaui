# Olova UI Homepage Redesign Plan

## Summary

Redesign the landing page in `apps/web/src/app/(landing)` into a polished, conversion-focused homepage for Olova UI. The page should make the product value clear quickly, prove the `500+ animated components` claim with real component previews, and keep Lighthouse Performance, Accessibility, and Best Practices as hard constraints.

The homepage should feel like a serious modern UI library, closer to shadcn/ui, Radix, and MUI in proof and clarity, while keeping Olova UI's identity as an animated React component library built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Radix UI, and Lucide icons.

## Goals

- Show real components on the homepage so the main selling point is visible.
- Add a live component showcase with approximately 46 curated component previews.
- Add an interactive component playground with `Preview | Code` tabs.
- Keep the above-the-fold experience focused, fast, and readable.
- Use clear CTAs: `Get Started`, `Browse Components`, and `GitHub`.
- Keep the page responsive across mobile, tablet, laptop, and large desktop.
- Preserve static export compatibility and avoid unnecessary client-side weight.
- Verify TypeScript, lint, build, responsiveness, accessibility, and Lighthouse quality before completion.

## Page Structure

Implement the homepage in this order:

1. Navbar
2. Hero
3. Trusted By
4. Features Grid
5. Component Showcase
6. Interactive Component Playground
7. Code Example
8. Installation
9. Testimonials
10. CTA
11. Footer

## Section Plan

### Navbar

- Keep the existing `Header` integration unless redesigning the landing header is required for visual consistency.
- Ensure visible links for Docs, Components, GitHub, search, and theme switching.
- Keep mobile navigation accessible with proper button labels, focus states, and no layout overflow.
- Avoid adding heavy animation to the navbar.

### Hero

- Use a strong headline centered on Olova UI as a React animated component library.
- Mention the value clearly: copy-paste friendly, customizable, accessible, animated components for modern React apps.
- Include the three required CTAs:
  - `Get Started` -> `/docs`
  - `Browse Components` -> `/components`
  - `GitHub` -> `https://github.com/olovalabs/olovaui`
- Include lightweight proof points near the CTA area, such as `500+ animated components`, `Tailwind CSS`, `Framer Motion`, and `Open Source`.
- Do not place a full component preview grid above the fold if it makes the first viewport too heavy or visually crowded. The hero can include minimal product proof, but the main live showcase should start after trust/features content.
- Avoid heavy decorative SVG wireframes, large blur effects, and background elements that hurt performance or distract from the product.

### Trusted By

- Add a trust strip after the hero.
- Use real customer/project logos only if verified.
- If verified logos are not available, use honest ecosystem trust markers instead: React, Next.js, Tailwind CSS, Framer Motion, Radix UI, TypeScript.
- Keep this section compact and low-motion.

### Features Grid

Add a concise feature grid focused on developer value:

- Copy-paste component registry workflow.
- Animated components built with Framer Motion.
- Tailwind-first customization.
- Accessible primitives with Radix UI where applicable.
- TypeScript-ready APIs.
- Static-export friendly documentation and registry.

Use icons from `lucide-react`. Keep cards simple with stable dimensions and an 8px or smaller radius unless existing local UI patterns require otherwise.

### Component Showcase

Build a real showcase of approximately 46 components, grouped by category. The section should show actual UI previews, not placeholders.

Recommended groups:

- Core: Button, Button Group, Badge, Card, Avatar, Separator.
- Forms: Input, Input Group, Textarea, Checkbox, Radio Group, Select, Combobox, Date Picker, Input OTP, Switch, Slider, Label.
- Overlays: Dialog or Modal, Alert Dialog, Drawer, Popover, Tooltip, Dropdown Menu, Context Menu.
- Navigation and structure: Tabs, Accordion, Collapsible, Pagination, Table.
- Feedback: Alert, Toast, Progress, Skeleton, Spinner.
- Advanced and animated: Border Beam, Shine Border, Glow Card, Code Block, Network Graph, Hero Video Player.
- Text animation: Flip Link, Shiny Text, Gradient Text, Scramble Text, Slide In Text, Blur Text, Rolling Letters, Letter Glitch.
- Slider and media: 3D Carousel, Rotating Cards, Memories Card, Photo Slider, Moody Carousel, Focus Cards, Video Accordion.

Behavior:

- Use category filters or tabs so users can scan quickly.
- Mount only visible or active previews where possible.
- Avoid running all animations continuously.
- Respect `prefers-reduced-motion`.
- Use stable grid dimensions so cards do not jump when previews load or filters change.
- Each showcase item should link to its docs route when available.

### Interactive Component Playground

Add a dedicated playground with a `Preview | Code` interface.

Requirements:

- Let users switch between a few representative components, such as Button, Card, Tabs, Accordion, Dialog, Drawer, and Input.
- Show a live preview for the selected component.
- Show matching code in the `Code` tab.
- Use existing tab and code block patterns where practical.
- Keep only the selected preview mounted to reduce runtime cost.
- Desktop layout: component selector on the side or top, preview/code area as the main panel.
- Mobile layout: compact selector with stacked `Preview | Code` content.
- Include copy-to-clipboard for code if using existing code block utilities supports it.

### Code Example

Add a section that shows the real registry workflow:

```bash
pnpm dlx shadcn@latest add "https://olovaui.olova.dev/registry/button.json"
```

Also show a small usage example for one component, such as Button or Card.

Use syntax highlighting already present in the codebase. Avoid adding a new code-highlighting dependency.

### Installation

Add an installation section that supports common package managers:

- pnpm
- npm
- yarn
- bun

Use the existing package manager tab approach where possible. Link the primary installation CTA to `/docs/installation`.

### Testimonials

- Use testimonials only if they are real and verifiable.
- Do not invent names, companies, quotes, or logos.
- If real testimonials are unavailable, replace this section with an honest proof section such as community links, GitHub link, component count, framework support, and open-source license.

### CTA

Add a final conversion section with direct next steps:

- `Get Started` -> `/docs`
- `Browse Components` -> `/components`
- `GitHub` -> `https://github.com/olovalabs/olovaui`

Keep the CTA visually distinct but not heavy. Avoid oversized decorative effects.

### Footer

Include core links:

- Docs
- Components
- Installation
- Changelog
- Sponsor
- GitHub

Include project identity, MIT license note, and author attribution if consistent with the existing site.

## Implementation Approach

- Keep `page.tsx` as the server-rendered page composition file.
- Split large landing sections into small components under `apps/web/src/app/(landing)/components`.
- Use client components only for interactive parts:
  - Showcase filters or category tabs.
  - Playground selection and `Preview | Code` tabs.
  - Copy interactions if needed.
- Keep landing content in typed data structures so copy, feature cards, component lists, CTAs, and links are easy to maintain.
- Reuse existing local components and utilities where possible:
  - `Header`
  - existing docs/component preview files
  - existing code block utilities
  - existing tabs patterns
  - `cn` utility
  - `lucide-react` icons
- Do not introduce a new animation, code editor, or UI dependency unless existing utilities cannot support the planned behavior.

## Performance Requirements

- Keep the hero lightweight and avoid loading all showcase previews on first paint.
- Use dynamic imports or lazy mounting for expensive interactive previews.
- Avoid continuous animation for offscreen items.
- Use CSS transitions for simple effects instead of Framer Motion where full motion orchestration is unnecessary.
- Respect `prefers-reduced-motion`.
- Avoid large image assets unless optimized and necessary.
- Maintain stable dimensions for previews, cards, buttons, and code panels to prevent layout shift.
- Avoid nested card layouts and heavy blur/orb backgrounds.
- Do not add client-side state to static content sections.

## Accessibility Requirements

- All CTAs and icon buttons need accessible labels.
- Tabs must be keyboard accessible and expose correct active states.
- Component filters should be reachable and understandable by keyboard and screen readers.
- Text contrast must pass in light and dark modes.
- Focus states must be visible.
- Motion-heavy previews must not be required to understand the page.
- Dialog, drawer, tooltip, and popover examples must not trap focus accidentally when displayed in the showcase.

## Responsive Requirements

- Mobile: single-column layout, compact CTAs, horizontally safe controls, no text overflow.
- Tablet: two-column feature/showcase layout where space allows.
- Desktop: wider showcase grid and richer playground layout.
- Large desktop: constrain content width so the page remains readable.
- Test common widths: 375px, 390px, 768px, 1024px, 1280px, 1440px.

## Verification Plan

Run these checks after implementation:

```bash
pnpm -C apps/web exec tsc --noEmit
pnpm -C apps/web lint
pnpm -C apps/web build
```

Then run Lighthouse against the local production build or preview:

```bash
pnpm -C apps/web perf:audit
pnpm -C apps/web seo:validate
```

Manual checks:

- Hero CTAs route correctly.
- Showcase displays real components and links to docs.
- Playground switches between `Preview` and `Code`.
- Component selector works on mobile and desktop.
- Dark mode and light mode both look intentional.
- Reduced motion mode remains usable.
- No horizontal scrolling on mobile.
- No overlapping text, buttons, cards, or preview content.

## Acceptance Criteria

- Homepage has the requested full section structure.
- The primary component-library value is visible through real previews.
- The interactive playground supports `Preview | Code`.
- Required CTAs are present and correctly linked.
- Component showcase includes the requested component types: Buttons, Cards, Modal/Dialog, Tabs, Drawer, Accordion, Inputs, and additional library components.
- Page is responsive across device sizes.
- TypeScript check passes.
- Build passes.
- Lighthouse Performance, Accessibility, and Best Practices remain strong.
- No fake testimonials or unverifiable trust claims are added.

