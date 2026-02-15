# Lighthouse CI Configuration

This document explains the Lighthouse CI setup and how to maintain it as the site evolves.

## Overview

Lighthouse CI automatically audits site quality on every pull request, measuring:
- **Performance**: Page load speed and optimization
- **Accessibility**: ARIA compliance, contrast ratios, semantic HTML
- **Best Practices**: Security, modern standards, console errors
- **SEO**: Meta tags, structured data, mobile-friendliness

Results are posted as PR comments with pass/fail status and links to detailed reports.

## Configuration File

The configuration lives in `.lighthouserc.json` at the repository root.

### URLs Being Audited

We audit 7 representative pages covering all major templates and high-intent pages:

| URL | Purpose | Represents |
|-----|---------|------------|
| `/index.html` | Homepage | Landing page template, hero design |
| `/features/index.html` | Product features | Feature pages, content-heavy layouts |
| `/pricing/index.html` | Pricing table | Pricing page, tables, CTAs |
| `/demo/index.html` | Demo request form | Form pages, conversion flows |
| `/contact/index.html` | Contact form | Contact pages, form validation |
| `/industries/youth-sports-fitness/index.html` | Industry vertical | Industry template, repeated layout |
| `/company/index.html` | About page | Simple content pages |

This sample provides coverage across:
- Different content densities (heavy vs. light pages)
- Different user intents (browse vs. convert)
- Different layouts (single-column vs. multi-column)
- All custom page templates

### Threshold Strategy

Current thresholds are set based on actual baseline scores (as of Feb 2026):

| Category | Threshold | Baseline | Rationale |
|----------|-----------|----------|-----------|
| Performance | **90%** | 99-100% | Mobile emulation can vary; 90% protects against major regressions while allowing variance |
| Accessibility | **95%** | 100% | High bar for enrollment platform; critical for trust and legal compliance |
| Best Practices | **90%** | 96% | Catches security issues and outdated patterns without being overly strict |
| SEO | **90%** | 92-100% | Protects organic discoverability; critical for marketing site |

**Philosophy**: Thresholds are protective, not aspirational. They're set slightly below current performance to:
1. Catch meaningful regressions
2. Avoid false positives from normal score variance
3. Allow incremental improvement without blocking PRs

### Number of Runs

Each URL is audited **3 times**, and the median scores are used. This reduces flakiness from:
- Network jitter in CI environment
- Animation timing
- Resource loading order
- Chromium warmup effects

## Adding a New Page to Lighthouse CI

When you add a new page type or critical page to the site:

1. **Build the site locally** to verify the page exists:
   ```bash
   npm run build
   ```

2. **Edit `.lighthouserc.json`** and add the URL to the `url` array:
   ```json
   "url": [
     "http://localhost/index.html",
     "http://localhost/your-new-page/index.html",
     ...
   ]
   ```
   
   **URL format rules**:
   - Always use `http://localhost/` as the base (CI runs a local server)
   - Path must match the build output in `public/` directory
   - Must end with `/index.html` for Hugo-generated pages

3. **Test locally** before committing:
   ```bash
   just lighthouse
   ```
   
   Or manually:
   ```bash
   npm run build
   npx @lhci/cli autorun
   ```

4. **Check the results**:
   - All 4 scores should be at or above thresholds
   - If a new page fails, investigate why before adjusting thresholds
   - Common issues: large unoptimized images, missing alt text, poor color contrast

5. **Commit the change**:
   ```bash
   git add .lighthouserc.json
   git commit -m "Add [page name] to Lighthouse CI coverage"
   ```

## When to Add a Page

**Do add**:
- New page templates (if it's a new layout, test it)
- High-traffic pages (features, verticals, pricing changes)
- Conversion pages (forms, signups, demos)
- Pages with complex interactions (calculators, configurators)

**Don't add**:
- Pages using existing tested templates (e.g., 6th industry page when 1 is already tested)
- Rarely-visited utility pages (unless they're legally critical like Privacy Policy)
- Dynamic content pages that will flake in CI

**Guideline**: Aim for 5-10 URLs. More coverage is better, but:
- Each URL adds ~30 seconds to CI time
- Too many URLs makes failures harder to diagnose
- Redundant testing of identical templates wastes resources

## Interpreting Failures

When Lighthouse CI fails on a PR:

1. **Check which URL failed** in the CI output or PR comment
2. **Check which category failed** (performance, accessibility, best-practices, seo)
3. **View the full report** linked in the PR comment
4. **Common failure causes**:
   - **Performance**: Large images, render-blocking CSS, unused JavaScript
   - **Accessibility**: Missing alt text, insufficient color contrast, keyboard navigation issues
   - **Best Practices**: Mixed content (http/https), deprecated APIs, console errors
   - **SEO**: Missing meta descriptions, incorrect heading hierarchy, no viewport meta tag

5. **Fixing the issue**:
   - For layout/code issues: Fix the template or component
   - For content issues: Fix the Markdown front matter or content
   - For asset issues: Optimize images, defer scripts
   - For false positives: Document why in the PR and consider threshold adjustment

## Adjusting Thresholds

**When to lower thresholds**:
- Adding a new page type that legitimately performs worse (e.g., image gallery)
- Site-wide architectural change affects baseline (e.g., adding analytics)
- Consensus that current thresholds are too strict

**How to adjust**:
1. Run Lighthouse locally on the problematic page
2. Document the new baseline scores
3. Set threshold 3-5 points below the new baseline
4. Update this documentation with the rationale
5. Get team approval before merging

**When NOT to lower thresholds**:
- To make a failing PR pass without investigating root cause
- In response to one-off flakiness (run CI again first)
- To avoid fixing legitimate quality issues

## Local Development

Run Lighthouse CI locally to catch issues before pushing:

```bash
# Quick check (uses justfile)
just lighthouse

# Manual workflow
npm run build
npx @lhci/cli autorun
```

**Tip**: The HTML reports in `.lighthouseci/*.html` are very detailed. Open them in a browser to see specific audit failures and recommendations.

## CI Workflow

Lighthouse CI runs on every PR via `.github/workflows/lighthouse-ci.yml`:

1. Checkout code
2. Install Hugo, Node.js, Dart Sass, Go
3. Build the site with `hugo --gc --minify`
4. Install Lighthouse CI globally
5. Run `lhci autorun` (reads `.lighthouserc.json`)
6. Upload results to temporary public storage
7. Post results as PR comment

The workflow has read access to the repository and write access to PR comments (for posting results).

## Troubleshooting

### "Could not find any auditable URLs"
- Check that `npm run build` succeeds and creates `public/` directory
- Verify URLs in `.lighthouserc.json` match files in `public/`
- URLs must use `http://localhost/` prefix, not filesystem paths

### Scores vary dramatically between runs
- This is normal for performance scores in CI
- If variance > 10 points, check for animations or dynamic content
- Consider adding `settings` in `.lighthouserc.json` to disable animations

### All pages fail best-practices
- Check browser console for errors
- Look for mixed content warnings (http images on https page - though local testing is http)
- Review deprecated API usage

### GitHub token errors
- These are warnings, not failures
- The token is provided in CI, not needed locally
- Affects only the PR comment posting, not the audit itself

## References

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Web.dev Lighthouse Guides](https://web.dev/learn/#lighthouse)
