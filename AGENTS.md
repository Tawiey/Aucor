# AGENTS.md

## Project Overview

This repository is the Aucor marketing site / auction landing experience. It is a React + Vite + Tailwind application with a premium, dark, editorial visual direction and a strong landing-page focus rather than a dashboard/product-app feel.

The current project emphasis is on:

- premium property-auction presentation
- clear conversion paths into registration and property discovery
- route-based auction discovery and event detail pages
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
- `/auctions` -> upcoming auctions index
- `/auctions/:slug` -> dedicated auction detail
- `/properties` -> catalog
- `/properties/:id` -> property detail

Home page composition:

- [`src/pages/Home.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/pages/Home.jsx)
  - `Hero`
  - `FeaturedProperties`
  - `Features`
  - `Philosophy`
  - `Protocol`
  - `Testimonials`
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
  - routes users into auction detail pages
  - frequent source of visual QA feedback

- [`src/components/FeaturedProperties.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/FeaturedProperties.jsx)
  - “Selected Highlights” / featured card grid

- [`src/components/Features.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Features.jsx)
  - “Engineered for results”
  - historically this section has changed a lot and should be approached carefully

- [`src/components/Philosophy.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Philosophy.jsx)
  - large editorial statement section

- [`src/components/GetStarted.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/GetStarted.jsx)
  - lower-page pre-registration CTA section

- [`src/components/Testimonials.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/Testimonials.jsx)
  - split intro + animated testimonial stream
  - compact cards in two staggered columns on desktop

- [`src/components/TrustedByMarquee.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/components/TrustedByMarquee.jsx)
  - full-width trust logo band
  - slow marquee with minimal chrome

- [`src/pages/Auctions.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/pages/Auctions.jsx)
  - image-led auctions index page

- [`src/pages/AuctionDetail.jsx`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/src/pages/AuctionDetail.jsx)
  - dedicated auction event detail page

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
- Copy should feel clear, direct, and short. Prefer plain English over institutional language.
- Avoid noisy hover behavior on informational cards.
- CTA hierarchy should stay clear and consistent.
- Spacing rhythm matters a lot on this project; padding inconsistencies are very noticeable.

## Current UX Conventions

These are the conventions future agents should preserve unless explicitly asked to revisit them.

### Branding

- Favicon should use `public/favicon-32x32.png`.
- The top nav logo should use `public/logo-white.png`.

### CTA Copy

- Use action-specific labels, not generic CTA copy.
- Auction-event CTAs should prefer `Pre-register to bid`.
- Navbar account CTAs are now:
  - `Log In`
  - `Create Account`
- Avoid reintroducing generic `Register now` / `Register Now` copy unless the user explicitly asks.

### Navbar Behavior

- Menu links and landline should feel centered and stable.
- Hover motion on nav links should be restrained; avoid y-axis “jump” effects unless explicitly requested.
- Navbar spacing should feel aligned with the hero search bar spacing system.
- Desktop right-side account actions should be lighter than the main auction CTAs:
  - `Log In` is text-only with red hover text
  - `Create Account` is a ghost button with subtle arrow motion

### Search Bar

- The search bar should feel prominent, but not oversized.
- Input and button heights should feel refined rather than bulky.
- Outer shell padding and internal gaps should align with the navbar rhythm.

### Featured / Highlight Cards

- Card hover theatrics should be limited.
- If hover is used, prioritize it on buttons rather than the entire card/image/title.

### Auctions

- The site now uses route-based auction discovery, not modal-first auction detail.
- `UpcomingAuction` on the homepage should route into `/auctions/:slug`.
- The auctions index should feel editorial and image-led, with less copy and fewer outlined containers.
- Auction property previews should use thumbnails where possible.
- Countdown modules should stay compact, elegant, and low-noise.

### How It Works

- `Protocol` is a pinned editorial section powered by `src/data/auctionProcess.js`.
- Process imagery now lives in `public/Process/Aucor-Step1.png` through `Aucor-Step4.png`.
- Keep process images in full color. Do not reintroduce grayscale treatment.
- Image crops should use centered `object-cover` framing.

### Testimonials / Trust

- The testimonials section now sits below `How It Works`.
- Desktop layout uses a smaller left intro panel and a larger right animated panel.
- Testimonial cards should keep consistent width/height and read clearly at a compact size.
- The second testimonial column should stay half a card offset for readability.
- Trusted-by logos should span the available width, move slowly, and avoid outlined logo capsules.

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
- route-based auctions pages and auction details
- featured card hover simplification
- philosophy copy and readability updates
- homepage micro-copy simplification
- testimonials redesign
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
- next auction card and countdown
- auctions index hero and countdown
- “Engineered for results”
- testimonials stream
- `How It Works` pinned cards
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
- For copy changes, keep sentences short and front-load meaning.

## Recommended Validation Checklist

After meaningful UI edits, check:

- `npm run build`
- navbar alignment on desktop
- mobile drawer spacing
- hero width relative to navbar
- search bar control heights and gaps
- next auction countdown layout at multiple widths
- auctions pages and auction-detail routing
- process image treatment and cropping
- testimonial stream layout at desktop and mobile
- FAQ heading spacing
- footer seam against the section above

## Assets / Content Notes

Important public assets currently in use:

- [`public/favicon-32x32.png`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/public/favicon-32x32.png)
- [`public/logo-white.png`](/Users/tawandamutambwe/Documents/Antigravity/Aucor/public/logo-white.png)

If branding assets change again, update both the implementation and this file.
