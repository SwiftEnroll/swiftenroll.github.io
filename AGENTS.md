# AGENTS.md

> **Operating Contract for AI Agents & Contributors**
> *Read this before making any changes.*

This file defines how agents and contributors must operate in this repository. It establishes constraints, responsibilities, and navigation to detailed knowledge.

---

## Mission

This repository contains the **public marketing website** for SwiftEnroll (swiftenroll.github.io). It is NOT the SaaS application.

See `/docs/product/MISSION.md` for goals, audience, and critical outcomes.

---

## Source of Truth

- **Configuration:** `hugo.toml` - Never hardcode what belongs in config
- **Documentation:** `/docs` - If not documented, it doesn't exist
  - `/docs/architecture/` - System design, stack, data flow
  - `/docs/engineering/` - Coding standards, testing, workflow
  - `/docs/product/` - Mission, goals, audience
  - `/docs/runbooks/` - Common tasks and playbooks

---

## Mandatory Workflow

### Before Any Changes
1. Read `/docs/architecture/OVERVIEW.md` for system design
2. Read `/docs/architecture/REPOSITORY_MAP.md` for file locations
3. Read `/docs/engineering/CODING_STANDARDS.md` and `/docs/engineering/TESTING.md`
4. Plan minimal, surgical changes

### During Changes
1. Follow coding standards (Tailwind utility-first, semantic HTML)
2. Test locally: `npm start` at http://localhost:1313
3. Verify mobile (375px) and desktop (1280px+) layouts

### Before Submission
1. Run: `npm run build && just lychee && just lighthouse`
2. Update documentation (see `/docs/engineering/DOCUMENTATION.md`)
3. Open a pull request and request code review from at least one maintainer in GitHub
4. Ensure all required GitHub Actions / CI checks pass on the pull request (including any security scans that are configured)

**Documentation updates are NOT optional. Code and docs must evolve together.**

---

## Risk Boundaries

**Critical rules (violating these = PR rejection):**

### Security
- ❌ Commit secrets, API keys, tokens
- ❌ Add third-party JS without approval
- ❌ Create custom form handlers

### Data & Integrations
- ❌ Log or store user data in this repository
- ❌ Change approved integrations (forms, analytics, anti-spam)
- ❌ Add payment processing (this is a marketing site)

### Performance
- ❌ Add heavy images or blocking JS to `/` or `/pricing`
- ❌ Skip Lighthouse thresholds (Performance > 70, Accessibility > 85)

**See `/docs/RISK_BOUNDARIES.md` for complete details.**

---

## Quality Standards

**Minimum requirements:**
- Build passes: `npm run build`
- No broken links: `just lychee`
- Lighthouse: Performance > 70, Accessibility > 85, Best Practices > 85, SEO > 90
- Responsive: Works at 375px (mobile) and 1280px+ (desktop)
- No console errors, broken images, or horizontal scrollbars

**See `/docs/engineering/TESTING.md` for complete requirements.**

---

## Navigation

**Start here:** `/docs/README.md` - Complete documentation index

**Quick links:**
- New? → `/docs/architecture/OVERVIEW.md` + `/docs/engineering/WORKFLOW.md`
- Coding? → `/docs/engineering/CODING_STANDARDS.md` + `/docs/engineering/TESTING.md`
- Common tasks? → `/docs/runbooks/COMMON_TASKS.md`

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
