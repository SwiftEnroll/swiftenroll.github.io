# AGENTS.md

> **Canonical Operating Manual for AI Agents & Contributors**
> *Read this file before generating code or opening a PR.*

This file defines the strict protocols, standards, and expectations for contributing to the SwiftEnroll public repository. Failure to adhere to these guidelines will result in rejected pull requests.

---

## 1. Product & Mission

**What this software is:**
This is the **public marketing website** for SwiftEnroll (swiftenroll.github.io). It is NOT the SaaS application itself.

**Who it serves:**
- **Parents:** Searching for simple enrollment in youth programs.
- **Program Directors:** Looking to modernize their camps, after-school programs, and payment systems.

**Critical Outcomes:**
- **Trust:** The design must look professional, secure, and established. Sloppy UI kills conversions.
- **Speed:** Parents on mobile devices need instant page loads.
- **Clarity:** Navigation and copy must clearly explain complex enrollment features (waitlists, approvals, payments).

**Mission:**
To persuade program directors that enrollment can be simple, transparent, and fair.

---

## 2. Architecture Overview

### Stack
- **Generator:** Hugo (Extended)
- **Styling:** Tailwind CSS + PostCSS
- **Host:** GitHub Pages (Static file hosting)
- **Forms:** `submit-form.com` (External handler) + Cloudflare Turnstile (Anti-spam)
- **CI/CD:** GitHub Actions (Builds, Link Checks, Lighthouse CI)

### Data Flow
1. **Content:** Written in Markdown (`content/`) with Front Matter.
2. **Templates:** Hugo Layouts (`layouts/`) process Markdown into HTML.
3. **Styles:** Tailwind scans HTML/content, compiles `assets/css/main.css` → `static/css/style.css`.
4. **Build:** `hugo --minify` generates static HTML in `public/`.

### Integrations
- **Forms:** Direct POST requests to `submit-form.com`. Configuration is in `hugo.toml` -> `[params.forms]`.
- **Analytics:** GA4 (ID in `hugo.toml`).
- **Search:** None (static site).

---

## 3. Local Development

**Prerequisites:** Node.js 18+, Hugo Extended (must support PostCSS).

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Run development server (Auto-reloads Hugo + Tailwind)
npm start
```
*Server runs at `http://localhost:1313`.*

### Build for Production
```bash
npm run build
```

### Verification
```bash
# Run link checker (requires build first)
just lychee

# Run Lighthouse CI locally
just lighthouse
```

---

## 4. Repository Map

| Directory | Responsibility |
|-----------|----------------|
| `content/` | **Primary workspace.** Markdown files for site pages. |
| `layouts/` | HTML templates. `_default` for page types, `partials` for components. |
| `assets/css/` | Tailwind source files (`main.css`). |
| `static/` | Raw assets (images, favicon). content copied directly to `public/`. |
| `hugo.toml` | **Single source of truth** for site config, menus, and global params. |
| `docs/` | Internal documentation. **Must stay updated.** |
| `.lighthouserc.json` | Performance & Accessibility thresholds. |

---

## 5. Coding Standards

### Tailwind CSS
- **Utility First:** Do NOT write custom CSS in `main.css` unless absolutely necessary (e.g., specific animations).
- **Responsive Design:** Mobile-first. Use `sm:`, `md:`, `lg:` prefixes.
  - Breakpoints: `sm: 450px`, `md: 600px`, `lg: 800px`, `xl: 1280px`.
- **Colors:** Use semantic names from config (`bg-primary-600` not `#1F1C4E`).
- **Typography:** Use `prose` (tailwindcss/typography) for Markdown content areas.

### HTML / Go Templates
- **Semantic HTML:** Use `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`.
- **Components:** Reusable UI goes in `layouts/partials/components/`.
- **Safe HTML:** Standard Hugo escaping is on. Use `safeHTML` only if you have verified the source.

### Configuration
- **No Hardcoding:** URLs, API keys, and business names belong in `hugo.toml` or Front Matter.
- **Environment Variables:** Use `HUGO_PARAMS_...` for local overrides (e.g., disabling forms).

### Images
- Place raw images in `assets/images/` for processing (resizing/webp) or `static/images/` if processing isn't needed.
- Always include `alt` text.

---

## 6. How Changes Are Implemented

1. **Analysis:** Read `hugo.toml` and existing `layouts/` to understand current patterns.
2. **Content First:** If adding a page, create `content/path/to/page.md`.
3. **Layout:** Assign a `type` or `layout` in Front Matter. Create/modify layout in `layouts/` if standard ones don't fit.
4. **Style:** Apply Tailwind classes.
5. **Verify:** Check mobile view (`< 450px`) and desktop (`> 1280px`).
6. **Commit:** `git commit -m "feat: description"` (Conventional Commits).

---

## 7. Testing Requirements

**Mandatory Checks:**
- **Build Success:** `npm run build` must pass without errors.
- **Links:** No 404s. Run `just lychee`.
- **Lighthouse:**
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 90
  - SEO: > 90
- **Responsive:** UI must not break on 375px width (mobile).

**Unacceptable:**
- Broken images.
- Horizontal scrollbars on mobile.
- Console errors in browser DevTools.

---

## 8. PR Expectations

**Quality Bar:**
- Code is formatted (standard JS/HTML indentation).
- No unused Tailwind classes.
- No "temporary" hacks or magic numbers.

**Description:**
- Explain *why* the change was made.
- Include a screenshot for UI changes.
- Confirm local testing results.

---

## 9. Security & Safety Rails

- **NEVER** commit secret keys (AWS, API tokens).
- **NEVER** expose the admin interface (there isn't one, but don't add one).
- **Forms:** Always use the configured endpoints. Do not create custom form handlers without approval.
- **External Scripts:** Do not add third-party JS (tracking, widgets) without explicit instructions.

---

## 10. Performance & Reliability Notes

- **Hot Paths:** The Landing Page (`/`) and Pricing (`/pricing`) are critical. Heavy images or blocking JS here is forbidden.
- **Images:** Use Hugo's image processing to resize large assets. Do not serve 5MB PNGs.
- **Fonts:** Inter is self-hosted. Do not add external Google Fonts links (performance risk).

---

## 11. Playbooks for Common Tasks

### Adding a New Industry Page
1. Create `content/industries/new-industry.md`.
2. Copy Front Matter structure from `content/industries/youth-sports-fitness.md`.
3. Update `title`, `description`, and `hero_image`.
4. Add to `hugo.toml` menu `[[menu.main]]` if it needs to be in the nav.

### Updating Pricing
1. Edit `content/pricing.md` Front Matter.
2. If structure changes, modify `layouts/partials/components/pricing-card.html`.

### Changing Global Contact Info
1. Edit `hugo.toml` under `[params.company]` or `[params.social]`.
2. Do NOT hunt-and-peck through HTML files.

---

## 12. Glossary

- **Front Matter:** The YAML/TOML block at the top of Markdown files defining metadata.
- **Partial:** A reusable template snippet (e.g., `footer.html`).
- **Shortcode:** A snippet used *inside* Markdown content (e.g., `{{< cta >}}`).
- **Turnstile:** Cloudflare's captcha replacement.
- **Justfile:** Command runner configuration file.

---

# 🚨 DOCUMENTATION UPDATE REQUIREMENTS

**Documentation is part of the feature.**
If code behavior or public interfaces change, documentation MUST change in the same PR.

**You must update:**
- `README.md` (if setup/commands change)
- `docs/CONFIGURATION.md` (if `hugo.toml` params change)
- `docs/SHORTCODES.md` (if new shortcodes are added)
- `AGENTS.md` (if workflows change)

**If you cannot find documentation to update, you must create it.**

### Checklist Before Submitting
- [ ] User-visible behavior documented
- [ ] New `hugo.toml` parameters documented in `docs/CONFIGURATION.md`
- [ ] Setup instructions in `README.md` verified
- [ ] API/Form integration changes reflected in docs
- [ ] Diagrams updated if architecture changed
