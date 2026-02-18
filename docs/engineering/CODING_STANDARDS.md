# Coding Standards

## Tailwind CSS

### Utility-First Approach
- **DO:** Use Tailwind utility classes directly in HTML
- **DO NOT:** Write custom CSS in `main.css` unless absolutely necessary
- Exception: Custom animations or truly unique styles

### Responsive Design
- **Mobile-first:** Start with mobile styles, add larger breakpoints as needed
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- **Breakpoints:**
  - `sm: 450px` - Small mobile devices
  - `md: 600px` - Tablets
  - `lg: 800px` - Small desktops
  - `xl: 1280px` - Large desktops

### Color System
- **Use semantic names** from `tailwind.config.js`
- Example: `bg-primary-600` not `bg-[#1F1C4E]`
- Never hardcode hex colors in HTML

### Typography
- Use `prose` class (tailwindcss/typography) for Markdown content areas
- Font families defined in config (Inter)

## HTML / Go Templates

### Semantic HTML
Use appropriate semantic elements:
- `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`
- Improves accessibility and SEO

### Components
- Reusable UI components belong in `layouts/partials/components/`
- One component per file
- Clear, descriptive filenames

### HTML Safety
- Standard Hugo escaping is enabled by default
- Only use `safeHTML` if you have verified the source
- Never use `safeHTML` on user input

## Configuration Management

### No Hardcoding
Configuration belongs in specific places:
- **URLs, business names, contact info:** `hugo.toml` under `[params]`
- **Page metadata:** Front Matter in Markdown files
- **Component config:** Pass via Hugo template parameters

### Environment Variables
- Use `HUGO_PARAMS_...` for local overrides
- Example: `HUGO_PARAMS_FORMS_CONTACTENDPOINT=""` to disable forms locally
- Document new environment variables in `/docs/CONFIGURATION.md`

## Images

### Storage
- **Processed images:** `assets/images/` (Hugo can resize/optimize)
- **Static images:** `static/images/` (no processing needed)

### Best Practices
- Always include `alt` text for accessibility
- Use Hugo's image processing for large assets
- **Never serve** multi-megabyte images
- Prefer WebP format when possible

### Alt Text Requirements
- Describe the image content for screen readers
- Be concise but descriptive
- Never use "image of" or "picture of"

## Code Style

### Formatting
- **HTML:** Standard indentation (2 spaces)
- **JavaScript:** Standard indentation (2 spaces)
- **Markdown:** One sentence per line (for easier git diffs)

### Naming Conventions
- **Files:** `kebab-case.html`
- **CSS classes:** Tailwind utilities (already kebab-case)
- **Template variables:** `camelCase` or `snake_case` (follow Hugo conventions)

## Do Not

### Forbidden Patterns
- ❌ Temporary hacks or "TODO: fix this" code
- ❌ Magic numbers (use named variables or config)
- ❌ Unused Tailwind classes (bloats CSS)
- ❌ External Google Fonts links (performance risk)
- ❌ Third-party JS widgets (tracking, chat) without approval

### Security
- ❌ Never commit secrets (API keys, tokens)
- ❌ Never create custom form handlers (use configured endpoints)
- ❌ Never add admin interfaces

## Glossary

- **Front Matter:** YAML/TOML block at top of Markdown files defining metadata
- **Partial:** Reusable template snippet (e.g., `footer.html`)
- **Shortcode:** Snippet used inside Markdown content (e.g., `{{< cta >}}`)
- **Turnstile:** Cloudflare's CAPTCHA replacement
- **Justfile:** Command runner configuration file

---

**Last Updated:** 2026-02-15
