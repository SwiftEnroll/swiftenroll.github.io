# SwiftEnroll Documentation

Welcome to the SwiftEnroll website documentation. This repository contains the public marketing website for SwiftEnroll, built with Hugo and Tailwind CSS.

---

## 📍 Start Here

**New contributors or AI agents:** Read `AGENTS.md` first to understand operating constraints and workflows.

**For specific needs:**
- **Understanding the system?** → [Architecture Documentation](#architecture)
- **Making code changes?** → [Engineering Documentation](#engineering)
- **Learning about the product?** → [Product Documentation](#product)
- **Need step-by-step guides?** → [Runbooks](#runbooks)

---

## 🏗️ Architecture

Technical documentation about the system design and structure.

### [Overview](architecture/OVERVIEW.md)
System architecture, data flow, build pipeline, and integrations.
- How Hugo processes content
- Build pipeline diagram
- Integration points (forms, analytics)
- Performance characteristics

### [Technology Stack](architecture/STACK.md)
Complete reference for the technology stack.
- Hugo, Tailwind CSS, PostCSS
- Hosting (GitHub Pages)
- External services (submit-form.com, Turnstile, GA4)
- Prerequisites and build tools

### [Repository Map](architecture/REPOSITORY_MAP.md)
Navigate the repository structure.
- Directory responsibilities
- Configuration files
- Critical files and hot paths
- Build artifacts

---

## 🔧 Engineering

Standards and practices for development.

### [Coding Standards](engineering/CODING_STANDARDS.md)
How to write code in this repository.
- Tailwind CSS guidelines
- HTML/Go template standards
- Configuration management
- Image handling
- Code style

### [Testing Requirements](engineering/TESTING.md)
What must pass before deployment.
- Build verification
- Link checking
- Lighthouse CI thresholds
- Responsive testing
- CI/CD automation

### [Development Workflow](engineering/WORKFLOW.md)
Step-by-step development process.
- Analysis → Content → Layout → Style → Verify
- Local development setup
- Common development tasks
- Environment variables
- Debugging tips

### [Documentation Requirements](engineering/DOCUMENTATION.md)
How to maintain documentation.
- The Documentation Rule (code and docs evolve together)
- What to update for each change type
- Documentation standards and style
- Maintenance guidelines

---

## 📦 Product

What we're building and why.

### [Mission & Goals](product/MISSION.md)
Product context and critical outcomes.
- What this software is (marketing site, not SaaS app)
- Who it serves (parents, program directors)
- Success criteria (trust, speed, clarity)
- Core mission

---

## 🛡️ Risk Boundaries & Safety

### [Risk Boundaries](RISK_BOUNDARIES.md)
What must NEVER be done in this repository.
- Security rules (secrets, external code, access control)
- Data & privacy guidelines
- Payment restrictions
- External integration rules
- Performance critical paths
- Build & deployment safety

---

## 📖 Runbooks

Practical guides for common tasks.

### [Common Tasks](runbooks/COMMON_TASKS.md)
Step-by-step playbooks for frequent operations.
- Adding new industry pages
- Updating pricing
- Changing contact info
- Adding forms
- Navigation menu updates
- Image optimization
- And more...

---

## 🎨 Theme Documentation

The site is built on the Hugo Saasify Theme. Theme-specific documentation:

### Getting Started with the Theme

1. **[Installation Guide](INSTALLATION.md)** - Set up theme and dependencies
2. **[Configuration Guide](CONFIGURATION.md)** - Configure site settings
3. **[Content Creation Guide](CONTENT-CREATION.md)** - Create pages and blog posts

### Theme Core Concepts

4. **[Layouts Guide](LAYOUTS.md)** - Layout templates and structure
5. **[Shortcodes Reference](SHORTCODES.md)** - All 21 shortcodes
6. **[Styling Guide](STYLING.md)** - TailwindCSS customization

### Theme Deployment

7. **[Deployment Guide](DEPLOYMENT.md)** - Deploy to various platforms
8. **[Troubleshooting Guide](TROUBLESHOOTING.md)** - Common issues and solutions

### Additional Theme Topics

- **[SEO Guide](SEO.md)** - SEO optimization techniques
- **[Image Optimization](IMAGE_OPTIMIZATION.md)** - Image best practices
- **[Internationalization](INTERNATIONALIZATION.md)** - Multi-language support

---

## 🚀 Quick Start

Get the site running locally:

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. View at http://localhost:1313
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
just lychee        # Link checking
just lighthouse    # Performance testing
```

---

## 📚 Documentation Principles

This documentation follows these principles:

1. **Retrieval-friendly** - Easy to search and scan
2. **Scope-focused** - Each doc has a clear purpose
3. **Invariant-driven** - Defines what must remain true
4. **Linked** - Cross-references to related areas
5. **Living** - Updated with code changes (not after)

---

## 🔄 Documentation Maintenance

**The Documentation Rule:** Code and docs must evolve together.

When making changes:
- Behavior changes? Update relevant `/docs` files
- New config? Update `CONFIGURATION.md`
- New workflow? Update `engineering/WORKFLOW.md`
- New task? Update `runbooks/COMMON_TASKS.md`

See `AGENTS.md` for the complete documentation update requirements.

---

## 🗺️ Documentation Map

```
docs/
├── README.md (this file)
│
├── architecture/
│   ├── OVERVIEW.md          # System design
│   ├── STACK.md             # Technology stack
│   └── REPOSITORY_MAP.md    # File structure
│
├── engineering/
│   ├── CODING_STANDARDS.md  # Code style guide
│   ├── TESTING.md           # Test requirements
│   └── WORKFLOW.md          # Development process
│
├── product/
│   └── MISSION.md           # Product goals
│
├── runbooks/
│   └── COMMON_TASKS.md      # Step-by-step guides
│
└── [theme docs]
    ├── CONFIGURATION.md
    ├── INSTALLATION.md
    ├── SHORTCODES.md
    └── ...
```

---

## 🆘 Getting Help

1. **Read the docs** - Most questions are answered here
2. **Check AGENTS.md** - Understand constraints and workflows
3. **Review issue tracker** - Someone may have had the same problem
4. **Open an issue** - Provide context, error messages, and steps to reproduce

---

## 📄 License

This repository is licensed under the MIT License. See LICENSE for details.

---

**Last Updated:** 2026-02-15
