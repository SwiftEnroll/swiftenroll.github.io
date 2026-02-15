# AGENTS.md

> **Operating Contract for AI Agents & Contributors**
> *Read this before making any changes.*

This file defines how agents and contributors must operate in this repository. It establishes constraints, responsibilities, and navigation to detailed knowledge.

---

## Mission

This repository contains the **public marketing website** for SwiftEnroll (swiftenroll.github.io). It is NOT the SaaS application.

**Goal:** Persuade program directors that enrollment can be simple, transparent, and fair.

**Audience:** Parents searching for programs, and program directors modernizing their operations.

**Critical outcomes:** Trust (professional design), Speed (instant mobile loads), Clarity (explain complex features simply).

See `/docs/product/MISSION.md` for full context.

---

## Source of Truth

### Configuration
**`hugo.toml`** is the single source of truth for:
- Site metadata and URLs
- Global parameters (company info, social links, form endpoints)
- Menu structure
- Analytics configuration

**Never hardcode** what belongs in configuration.

### Documentation
**`/docs`** is the authoritative knowledge base:
- `/docs/architecture/` - System design, stack, data flow
- `/docs/engineering/` - Coding standards, testing, workflow
- `/docs/product/` - Mission, goals, audience
- `/docs/runbooks/` - Common tasks and playbooks

**If reality is not documented, it does not exist.**

---

## Mandatory Workflow

### Before Any Changes
1. **Understand the system**
   - Read `/docs/architecture/OVERVIEW.md` for system design
   - Read `/docs/architecture/REPOSITORY_MAP.md` for file locations
   - Review `hugo.toml` for current configuration

2. **Understand the standards**
   - Read `/docs/engineering/CODING_STANDARDS.md`
   - Read `/docs/engineering/TESTING.md`

3. **Plan minimal changes**
   - Surgical, precise modifications only
   - Change as few lines as possible
   - No unrelated fixes

### During Changes
1. Follow coding standards (Tailwind utility-first, semantic HTML)
2. Test locally (`npm start` at http://localhost:1313)
3. Verify mobile (375px) and desktop (1280px+) layouts
4. Run build (`npm run build`)

### Before Submission
1. **Run all tests:**
   ```bash
   npm run build      # Must pass
   just lychee        # No broken links
   just lighthouse    # Must meet thresholds
   ```

2. **Update documentation:**
   - Changed behavior? Update `/docs`
   - New config? Update `/docs/CONFIGURATION.md`
   - New workflow? Update `/docs/engineering/WORKFLOW.md` or `/docs/runbooks/COMMON_TASKS.md`

3. **Request code review** (use `code_review` tool)

4. **Run security scan** (use `codeql_checker` tool after code review)

**Documentation updates are NOT optional. Code and docs must evolve together.**

---

## The Documentation Rule

**Documentation is part of the feature.**

If code behavior or public interfaces change, documentation MUST be updated in the same PR.

### What Must Be Updated

| Change Type | Update These Files |
|-------------|-------------------|
| Setup/commands change | `README.md` |
| `hugo.toml` parameters change | `docs/CONFIGURATION.md` |
| New shortcodes | `docs/SHORTCODES.md` |
| Workflows change | `docs/engineering/WORKFLOW.md` |
| Architecture change | `docs/architecture/OVERVIEW.md` |
| New common task | `docs/runbooks/COMMON_TASKS.md` |

If you cannot find documentation to update, **create it**.

### Before Submitting Checklist
- [ ] User-visible behavior documented
- [ ] Configuration changes documented
- [ ] Setup instructions verified
- [ ] Integration changes reflected
- [ ] Architecture diagrams updated (if applicable)

---

## Risk Boundaries

### Security (Never Do)
- ❌ Commit secrets (API keys, tokens, passwords)
- ❌ Expose admin interfaces (there isn't one; don't create one)
- ❌ Create custom form handlers (use configured endpoints)
- ❌ Add third-party JS (tracking, widgets) without approval

### Data & Privacy
- ❌ Log or store user data in this repository
- ❌ Add analytics beyond configured GA4
- ❌ Track users without consent

### Payments
This is a marketing site. It does not handle payments. Do not add payment processing.

### External Integrations
Current integrations (DO NOT change without approval):
- Forms: `submit-form.com`
- Anti-spam: Cloudflare Turnstile
- Analytics: Google Analytics 4

### Performance Critical Paths
- **Homepage (`/`)** - No heavy images, minimal JS
- **Pricing (`/pricing`)** - Fast loads essential
- Never add blocking JavaScript to these pages

---

## Quality Standards

### Testing Thresholds
**Lighthouse CI (enforced):**
- Performance: > 70
- Accessibility: > 85
- Best Practices: > 85
- SEO: > 90

**Responsive:**
- Must work at 375px width (mobile)
- Must work at 1280px+ width (desktop)
- No horizontal scrollbars

### Unacceptable
- Broken images
- Broken links
- Console errors
- Failed builds
- Test failures

### PR Requirements
- Explain **why** change was made
- Include screenshots for UI changes
- Confirm local testing completed
- Pass all CI checks

---

## Navigation to Knowledge

### New to the Repository?
Start here:
1. `/docs/architecture/OVERVIEW.md` - Understand the system
2. `/docs/architecture/REPOSITORY_MAP.md` - Find files
3. `/docs/engineering/WORKFLOW.md` - Development process

### Making Changes?
Consult:
- `/docs/engineering/CODING_STANDARDS.md` - How to write code
- `/docs/engineering/TESTING.md` - How to test
- `/docs/runbooks/COMMON_TASKS.md` - Step-by-step guides

### Understanding the Product?
Read:
- `/docs/product/MISSION.md` - What we're building and why
- `hugo.toml` - Current configuration
- `/docs/architecture/STACK.md` - Technology choices

### Troubleshooting?
See:
- `/docs/TROUBLESHOOTING.md` - Common issues
- `/docs/runbooks/COMMON_TASKS.md` - Task-specific guides

---

## Development Quick Start

```bash
# First time setup
npm install

# Start dev server
npm start

# Production build
npm run build

# Run tests
just lychee        # Link checking
just lighthouse    # Performance testing
```

---

## What This Repository Is Not

- ❌ Not the SaaS application (this is marketing site only)
- ❌ Not a backend service (static site, no server)
- ❌ Not a database (no data storage)
- ❌ Not a payment processor (no payment handling)

---

## Operating Principles

1. **Minimal changes** - Change as few lines as possible
2. **Documentation first** - If not documented, it doesn't exist
3. **Test everything** - No changes without verification
4. **Security matters** - Never compromise security for convenience
5. **Performance matters** - Slow pages lose conversions
6. **Mobile first** - Most users are on mobile devices

---

**Last Updated:** 2026-02-15

**Questions?** Read the `/docs` directory. If docs are wrong, fix them in the same PR.
