# Unify Primary CTAs to Book a Demo — Implementation Plan

> Autonomous execution — no human review gate.

**Goal:** Update all primary CTAs across the site to use "Book a Demo" text pointing to /demo/, and unify analytics tracking.  
**Architecture:** Pure content/template edits — no new components needed. Analytics via a new tracking partial included in baseof.html.  
**Tech Stack:** Hugo, Tailwind CSS, vanilla JS, GA4 (gtag.js)  
**Planning Decisions:**
- Non-Profit pricing plan keeps "Contact Sales" text (different audience/flow than demo bookings)
- Enterprise pricing button: change "Talk to Us" → "Book a Demo" and URL `/contact` → `/demo/` (eligible for demo, consistent with For-Profit)
- Analytics tracking implemented as a passive script listening for clicks on `a[href="/demo/"]` — catches all demo CTAs automatically regardless of source
- Homepage hero currently has NO CTA buttons; adding "Book a Demo" → /demo/ per task description
- No existing analytics CTA events found; this is a net new addition

---

## Tasks

### Task 1: Fix homepage hero CTA
- File: `content/_index.md`
- Add `primary_button_text="Book a Demo"` and `primary_button_url="/demo/"` to the `{{< hero >}}` shortcode

### Task 2: Fix pricing page CTAs
- File: `content/pricing.md`
- For-Profit: change URL `/contact/` → `/demo/` (text already "Book a Demo")
- Enterprise: change text "Talk to Us" → "Book a Demo", URL `/contact` → `/demo/`

### Task 3: Add demo_cta_click analytics tracking
- Create: `layouts/partials/analytics/demo-cta-tracking.html`
  - Script that fires `gtag('event', 'demo_cta_click', { cta_location: ... })` for clicks on `a[href="/demo/"]`
- Include in `layouts/_default/baseof.html` after existing analytics partials
- Include in `layouts/_default/landing.html` after existing analytics partials

### Task 4: Build verification
- Run `npm run build` and confirm 0 errors
