# AGENTS.md

## Project Overview

This repository is the Aucor marketing site / auction landing experience. It is a React + Vite + Tailwind application with a premium, dark, editorial visual direction and a strong landing-page focus rather than a dashboard/product-app feel.

The current project emphasis is on:

- premium property-auction presentation
- clear conversion paths into registration and property discovery
- polished motion, spacing, and typography
- consistency between navbar, hero, section transitions, and footer

This project has had an active visual refinement pass tied to **Linear issue `DES-8`**.

## Stack

- React 19
- Vite 7
- Tailwind CSS 3
- React Router DOM 6
- Framer Motion
- GSAP
- `lucide-react`
- `clsx`
- `date-fns`

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Builds have been passing during the DES-8 workstream. The main recurring build note has been the existing Vite chunk-size warning, not a compile failure.

## App Structure

Top-level app shell:

- [`src/App.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/App.jsx)
  - global shell
  - navbar
  - routed pages
  - footer

Primary routes:

- `/` -> home / landing page
- `/properties` -> catalog
- `/properties/:id` -> property detail

Home page composition:

- [`src/pages/Home.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/pages/Home.jsx)
  - `Hero`
  - `FeaturedProperties`
  - `Features`
  - `Philosophy`
  - `Protocol`
  - `GetStarted`
  - `FAQSection`

## Core Components To Know

- [`src/components/Navbar.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Navbar.jsx)
  - floating home navbar
  - desktop nav + CTA + landline
  - mobile drawer menu
  - theme toggle support exists

- [`src/components/Hero.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Hero.jsx)
  - top-of-page hero
  - shares width rhythm with the floating navbar

- [`src/components/SearchBar.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/SearchBar.jsx)
  - hero search UI
  - sends query params to `/properties`
  - spacing and shell treatment were recently normalized to better match the navbar

- [`src/components/UpcomingAuction.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/UpcomingAuction.jsx)
  - auction countdown / promo card
  - expanded modal
  - frequent source of visual QA feedback

- [`src/components/FeaturedProperties.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/FeaturedProperties.jsx)
  - “Upcoming Highlights” / featured card grid

- [`src/components/Features.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Features.jsx)
  - “Engineered for results”
  - historically this section has changed a lot and should be approached carefully

- [`src/components/Philosophy.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Philosophy.jsx)
  - large editorial statement section

- [`src/components/GetStarted.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/GetStarted.jsx)
  - lower-page registration CTA section

- [`src/components/FAQSection.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/FAQSection.jsx)
  - FAQ heading + accordions
  - header spacing has been a recent refinement target

- [`src/components/Footer.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Footer.jsx)
  - footer links and closing brand area
  - top seam with FAQ was recently adjusted

## Visual / UX Direction

When editing this project, preserve these principles:

- The site should feel **intentional, premium, and editorial**, not generic SaaS.
- Dark surfaces, subtle gradients, restrained glass effects, and soft glow are preferred over flat default cards.
- Motion should feel purposeful and premium, not gimmicky.
- Hover states should generally favor:
  - color shifts
  - overlay reveals
  - slight arrow motion
  - very restrained lift only when clearly beneficial
- Avoid noisy hover behavior on informational cards.
- CTA hierarchy should stay clear and consistent.
- Spacing rhythm matters a lot on this project; padding inconsistencies are very noticeable.

## Current UX Conventions

These are the conventions future agents should preserve unless explicitly asked to revisit them.

### Branding

- Favicon should use `public/favicon-32x32.png`.
- The top nav logo should use `public/logo-white.png`.

### Primary CTA Copy

Primary registration CTA copy has been standardized to:

- `Register`

Do not casually reintroduce variants like:

- `Register now`
- `Register Now`

The exception is when the action is intentionally different, for example:

- `Pre-Register`

### Navbar Behavior

- Menu links and landline should feel centered and stable.
- Hover motion on nav links should be restrained; avoid y-axis “jump” effects unless explicitly requested.
- Navbar spacing should feel aligned with the hero search bar spacing system.

### Search Bar

- The search bar should feel prominent, but not oversized.
- Input and button heights should feel refined rather than bulky.
- Outer shell padding and internal gaps should align with the navbar rhythm.

### Featured / Highlight Cards

- Card hover theatrics should be limited.
- If hover is used, prioritize it on buttons rather than the entire card/image/title.

### Philosophy Section

The current copy direction favors clarity over decorative styling. Avoid overly hard-to-read combinations of:

- long italic lines
- underlined hero words
- tight overflow clipping on descenders

### FAQ / Footer Transition

- The FAQ-to-footer seam should feel flush and intentional.
- Be careful with large top radii or mismatched background seams that create visible corner gaps.

## DES-8 Context

The recent `DES-8` refinement pass included work across:

- favicon + logo updates
- navbar alignment and hover simplification
- hero width alignment
- search bar prominence and spacing cleanup
- next auction countdown / modal refinements
- featured card hover simplification
- philosophy copy and readability updates
- FAQ header spacing
- footer seam and spacing
- CTA copy consistency
- general padding normalization across navbar / drawer / search areas

There is also an open PR created from branch:

- `codex/agileroutesfeedback`

PR title:

- `[DES-8] Refine landing page UI based on client feedback`

If working after that PR, review its diff first before making additional UI changes so you do not accidentally undo the refinements.

## Areas That Need Extra Care

These sections tend to be sensitive to small visual changes:

- navbar
- hero search bar
- next auction card and modal countdown
- “Engineered for results”
- FAQ heading block
- footer top seam

When touching these, check:

- vertical alignment
- text wrapping at narrower desktop widths
- padding consistency
- hover behavior
- whether the component still feels consistent with the rest of the site

## Working Norms For Future Agents

- Prefer small, deliberate visual changes over sweeping restyles unless requested.
- Match existing visual language before introducing new patterns.
- Do not revert recent client feedback changes unless the user explicitly asks.
- If the user asks for a “review,” focus on regressions, alignment issues, spacing issues, hover noise, responsiveness, and missing tests.
- For layout changes, verify mobile, tablet, and desktop behavior.
- For date-sensitive auction UI, confirm the target date rather than assuming.

## Recommended Validation Checklist

After meaningful UI edits, check:

- `npm run build`
- navbar alignment on desktop
- mobile drawer spacing
- hero width relative to navbar
- search bar control heights and gaps
- next auction countdown layout at multiple widths
- FAQ heading spacing
- footer seam against the section above

## Assets / Content Notes

Important public assets currently in use:

- [`public/favicon-32x32.png`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/public/favicon-32x32.png)
- [`public/logo-white.png`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/public/logo-white.png)

If branding assets change again, update both the implementation and this file.

