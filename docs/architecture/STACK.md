# Technology Stack

## Core Stack

### Generator
**Hugo (Extended)**
- Static site generator
- Must support PostCSS for Tailwind compilation
- Version: 0.111+ required

### Styling
**Tailwind CSS + PostCSS**
- Utility-first CSS framework
- Compiled from `assets/css/main.css` to `static/css/style.css`
- Configuration in `tailwind.config.js` and `postcss.config.js`

### Hosting
**GitHub Pages**
- Static file hosting
- Deploys from `public/` directory
- URL: https://swiftenroll.github.io/

### Forms
**submit-form.com** (External handler)
- Direct POST requests for form submissions
- Configuration in `hugo.toml` -> `[params.forms]`
- Endpoints: contact, demo, subscribe

**Cloudflare Turnstile** (Anti-spam)
- CAPTCHA replacement
- Site key configured in `hugo.toml`

### CI/CD
**GitHub Actions**
- Automated builds
- Link checking
- Lighthouse CI (performance, accessibility, SEO testing)

### Analytics
**Google Analytics 4 (GA4)**
- Analytics ID configured in `hugo.toml`

## Prerequisites

### Development Environment
- **Hugo Extended:** 0.111+ (PostCSS support required)
- **Node.js:** 18+
- **npm:** 9+ (or compatible)
- **Git:** For version control

### Build Tools
- PostCSS (via npm)
- Tailwind CSS (via npm)
- Concurrently (for parallel dev server processes)

## No Backend Services

This is a static site. There is:
- No database
- No server-side code
- No authentication system
- No search backend

All dynamic behavior (forms, analytics) is handled by third-party services.

---

**Last Updated:** 2026-02-15
