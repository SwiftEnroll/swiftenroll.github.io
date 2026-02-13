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

Environment variables
No secrets are required for local development. Some forms use external services and may reference IDs or endpoints directly in templates. Update those values as needed in layouts/shortcodes or partials.

Contributing
We welcome issues and suggestions via GitHub Issues. For small fixes, please open a PR.

License
This repository is licensed under the MIT License. See LICENSE for details.

Acknowledgments
This site is built with the excellent open-source Hugo Saasify Theme as a base, with customizations for SwiftEnroll. The original theme documentation has been preserved in THEME_README.md for reference.
