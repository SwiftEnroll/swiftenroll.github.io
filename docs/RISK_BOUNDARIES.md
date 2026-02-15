# Risk Boundaries & Safety Rails

This document defines what must NEVER be done in this repository, organized by risk category.

## Security (Never Do)

### Secrets & Credentials
- ❌ **NEVER** commit secrets (API keys, tokens, passwords, certificates)
- ❌ **NEVER** hardcode credentials in code or config files
- ❌ **NEVER** log sensitive data (even in debug mode)
- ✅ Use environment variables for sensitive configuration
- ✅ Keep secrets in `.env` (which is git-ignored)

### Access Control
- ❌ **NEVER** expose admin interfaces (there isn't one; don't create one)
- ❌ **NEVER** bypass authentication (this is a static site, but principle applies)
- ❌ **NEVER** create backdoors or debugging endpoints in production

### External Code
- ❌ **NEVER** add third-party JS (tracking, widgets) without approval
- ❌ **NEVER** load scripts from untrusted CDNs
- ❌ **NEVER** use `eval()` or `Function()` constructors
- ✅ Vet all external dependencies before adding
- ✅ Pin dependency versions

## Data & Privacy

### User Data
- ❌ **NEVER** log or store user data in this repository
- ❌ **NEVER** track users without consent
- ❌ **NEVER** share analytics data with unapproved third parties
- ✅ Forms submit to approved external service (`submit-form.com`)
- ✅ Analytics limited to configured GA4 only

### Personal Information
- ❌ **NEVER** collect more data than necessary
- ❌ **NEVER** embed email addresses in HTML (use contact forms)
- ❌ **NEVER** expose internal system details in error messages

## Payments

**This is a marketing site. It does NOT handle payments.**

- ❌ **NEVER** add payment processing
- ❌ **NEVER** collect credit card information
- ❌ **NEVER** integrate payment gateways (Stripe, PayPal, etc.)
- ⚠️ Pricing information is informational only

## External Integrations

### Approved Integrations
Current integrations (DO NOT change without approval):
- **Forms:** `submit-form.com` (configured in `hugo.toml`)
- **Anti-spam:** Cloudflare Turnstile (site key in config)
- **Analytics:** Google Analytics 4 (tracking ID in config)

### Integration Rules
- ❌ **NEVER** change integration endpoints without approval
- ❌ **NEVER** add new external services without security review
- ❌ **NEVER** create custom form handlers (use configured endpoints)
- ✅ All integrations must be configured in `hugo.toml`
- ✅ Document new integrations in `/docs/architecture/OVERVIEW.md`

## Performance Critical Paths

### Hot Pages
These pages MUST remain fast:
- **Homepage (`/`)** - First impression, highest traffic
- **Pricing (`/pricing`)** - Conversion critical

### Performance Rules
- ❌ **NEVER** add heavy images to critical paths (max 500KB)
- ❌ **NEVER** add blocking JavaScript to homepage or pricing
- ❌ **NEVER** load fonts from external CDNs (self-host only)
- ❌ **NEVER** use unoptimized images
- ✅ Lighthouse Performance score must stay > 70
- ✅ Use Hugo image processing for optimization

## Build & Deployment

### Build Safety
- ❌ **NEVER** commit build artifacts (`public/`, `node_modules/`)
- ❌ **NEVER** skip tests before merging
- ❌ **NEVER** deploy with failing builds
- ✅ All PRs must pass CI checks
- ✅ Lighthouse thresholds must be met

### Version Control
- ❌ **NEVER** force push to main branch
- ❌ **NEVER** rewrite public commit history
- ❌ **NEVER** commit large binary files
- ✅ Use conventional commit messages
- ✅ Keep commits atomic and focused

## Code Quality

### Forbidden Patterns
- ❌ **NEVER** use inline styles (use Tailwind utilities)
- ❌ **NEVER** hardcode URLs, emails, or business info (use `hugo.toml`)
- ❌ **NEVER** leave "temporary" hacks or TODOs in production code
- ❌ **NEVER** disable linting or security checks
- ✅ Follow coding standards in `/docs/engineering/CODING_STANDARDS.md`

## What This Repository Is NOT

Clear boundaries on what this repository is and is not:

- ❌ **NOT** the SaaS application (this is marketing site only)
- ❌ **NOT** a backend service (static site, no server-side code)
- ❌ **NOT** a database (no data storage)
- ❌ **NOT** a payment processor (no payment handling)
- ❌ **NOT** an API (no endpoints, no webhooks)
- ❌ **NOT** a user management system (no authentication)

## Consequences

Violating these boundaries may result in:
- Immediate PR rejection
- Required security review
- Rollback of deployed changes
- Removal of access (for repeated violations)

## Questions?

If you're unsure whether something violates these boundaries:
1. Check relevant documentation in `/docs`
2. Ask before implementing
3. Err on the side of caution

---

**Last Updated:** 2026-02-15
