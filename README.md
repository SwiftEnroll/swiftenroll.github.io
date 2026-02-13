SwiftEnroll Website

SwiftEnroll is a modern marketing website built with Hugo and Tailwind CSS. It promotes SwiftEnroll — a platform that simplifies enrollment, waitlists, approvals, and payments for camps, after‑school programs, and youth organizations.

Project URL: https://swiftenroll.github.io/

Contents
- Overview
- Tech stack
- Local development
- Build and deploy
- Content structure
- Customization
- Analytics configuration
- Contributing
- License
- Acknowledgments

Overview
This repository contains the source for the SwiftEnroll marketing site. It uses the Hugo static site generator with a customized Tailwind CSS design. The site is configured via hugo.toml and content pages in the content directory.

Tech stack
- Hugo (extended)
- Tailwind CSS
- PostCSS
- npm scripts

Prerequisites
- Hugo Extended 0.111+ (extended build is required for PostCSS)
- Node.js 18+
- npm 9+ (or compatible)

Getting started (local development)
1) Install dependencies
   npm install

2) Start the dev server (with Tailwind watch)
   npm run start
   - This runs two processes concurrently:
     - Tailwind in watch mode to compile assets/css/main.css to static/css/style.css
     - Hugo server with drafts enabled at http://localhost:1313

If you don’t see styles, ensure the Tailwind watcher started successfully and that static/css/style.css is referenced by the layouts.

Build
To produce a production build (minified CSS and static site output in public/):
   npm run build

Deployment
This site is configured to deploy to GitHub Pages at https://swiftenroll.github.io/.

Lighthouse CI
This repository includes automated performance, accessibility, best practices, and SEO testing using Lighthouse CI:
- Runs automatically on pull requests via GitHub Actions (see .github/workflows/lighthouse-ci.yml)
- Tests the homepage (/) and pricing page (/pricing/)
- Enforces minimum thresholds:
  - Performance: 70%
  - Accessibility: 85%
  - Best Practices: 85%
  - SEO: 90%
- Results are uploaded as artifacts in the GitHub Actions run
- PR comments show the Lighthouse scores
- The build will fail if scores drop below the configured thresholds

Configuration is in .lighthouserc.json. To run Lighthouse locally:
   npm install -g @lhci/cli@0.14.x
   npm run build
   lhci autorun

Configuration
- hugo.toml: Site metadata, menus, parameters (CTA, footer, social), etc.
- tailwind.config.js and postcss.config.js: Tailwind/PostCSS configuration.
- config.toml or hugo.toml: Only hugo.toml is used here (config.toml may exist from previous iterations).

Content and layouts
- content/: Markdown content for pages (e.g., industries, features, pricing, company, demo request).
- layouts/: Custom templates and partials overriding the theme where needed. Recent custom partials include forms and CTA components.
- static/: Static assets (images, CSS, etc.).
- assets/: Source CSS (Tailwind) and other pipeline assets.

Common tasks
- Add a new page: create a Markdown file under content/ and choose an appropriate layout via front matter (see existing pages for examples).
- Edit navigation, footer, CTA: adjust parameters in hugo.toml under [params.header], [params.footer], and [params.cta].
- Update company/team info and social links: edit hugo.toml under [params.company] and [params.social].

Environment variables and forms configuration
Form endpoints, Cloudflare Turnstile keys, and anti-spam settings are configured in hugo.toml under [params.forms]. 

For local development, you can override these settings using environment variables to prevent accidental form submissions:
- Copy .env.example to .env (not tracked in git)
- Set form endpoints to empty strings to disable submissions locally:
  - HUGO_PARAMS_FORMS_CONTACTENDPOINT=""
  - HUGO_PARAMS_FORMS_DEMOENDPOINT=""
  - HUGO_PARAMS_FORMS_SUBSCRIBEENDPOINT=""

All forms include:
- Honeypot fields for spam prevention (configured via HUGO_PARAMS_FORMS_HONEYPOTFIELDNAME)
- Cloudflare Turnstile integration (configured via HUGO_PARAMS_FORMS_TURNSTILESITEKEY)
- Development mode warnings when endpoints are disabled

No secrets are required for local development beyond what's configured in hugo.toml.

Analytics configuration
SwiftEnroll uses a lightweight, privacy-aware analytics system to track key conversion events including CTA clicks and form submissions. The analytics system works with Google Analytics (GA4) and can be easily enabled or disabled via configuration.

Features
- Track primary CTA clicks (demo, contact, pricing CTAs)
- Track form submissions and success events
- Privacy-aware with console logging for debugging
- Single config flag to enable/disable all tracking
- Granular controls for specific event types

Local development
By default, analytics tracking is enabled in hugo.toml. To test analytics locally:

1) Ensure analytics is enabled in hugo.toml:
   [params.analytics]
     enable = true
     trackCTAClicks = true
     trackFormSubmissions = true

2) Start the dev server:
   npm run start

3) Open browser console to see analytics events being logged (gtag calls will only work in production with Google Analytics configured)

Production setup
Analytics only loads Google Analytics in production builds (controlled by hugo.IsProduction). To configure for production:

1) Set your Google Analytics ID in hugo.toml:
   [params]
     googleAnalytics = "G-XXXXXXXXXX"  # Your GA4 measurement ID

2) Enable analytics tracking:
   [params.analytics]
     enable = true
     trackCTAClicks = true
     trackFormSubmissions = true

3) Build and deploy:
   npm run build

Disabling analytics
To completely disable analytics tracking, set enable to false in hugo.toml:

[params.analytics]
  enable = false

You can also selectively disable specific tracking types:
- Set trackCTAClicks = false to disable CTA tracking
- Set trackFormSubmissions = false to disable form tracking

Tracked events
The following events are tracked when enabled:
- cta_click: When users click on CTA buttons (header, global CTA, pricing CTAs)
- form_submit: When users submit the contact form
- form_submit_success: When the form submission succeeds

All events are sent to Google Analytics with relevant metadata (location, text, URL, etc.) for analysis.

Contributing
We welcome issues and suggestions via GitHub Issues. For small fixes, please open a PR.

License
This repository is licensed under the MIT License. See LICENSE for details.

Acknowledgments
This site is built with the excellent open-source Hugo Saasify Theme as a base, with customizations for SwiftEnroll. The original theme documentation has been preserved in THEME_README.md for reference.
