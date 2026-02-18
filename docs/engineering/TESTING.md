# Testing Requirements

## Mandatory Pre-Deployment Checks

Every change must pass these checks before merging:

### 1. Build Success
```bash
npm run build
```
- Must complete without errors
- Produces valid HTML in `public/`
- CSS compilation succeeds

### 2. Link Validation
```bash
just lychee
```
- No broken links (404s)
- All internal links resolve
- External links accessible

### 3. Lighthouse CI Scores

Run locally:
```bash
just lighthouse
```

**Minimum Thresholds:**
- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 90
- **SEO:** > 90

**Tested Pages:**
- Homepage (`/`)
- Pricing page (`/pricing/`)

### 4. Responsive Testing

**Mobile:** Test at 375px width (iPhone SE)
- No horizontal scrollbars
- All content readable
- Buttons/forms usable

**Desktop:** Test at 1280px+ width
- Layout uses space effectively
- No excessive whitespace
- Images load correctly

## Unacceptable Issues

The following issues will cause PR rejection:

### Visual
- ❌ Broken images
- ❌ Horizontal scrollbars on mobile
- ❌ Text overflow or truncation
- ❌ Misaligned components

### Technical
- ❌ Console errors in browser DevTools
- ❌ Build failures
- ❌ Broken navigation links
- ❌ Form submission errors

### Performance
- ❌ Lighthouse scores below thresholds
- ❌ Large unoptimized images (>500KB)
- ❌ Blocking JavaScript on critical pages

## Development Testing

### Local Development
```bash
npm start
```
- Runs Hugo + Tailwind in watch mode
- Auto-reloads on file changes
- Available at http://localhost:1313

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation works on mobile and desktop
- [ ] Forms display Turnstile widget
- [ ] Pricing cards render properly
- [ ] Footer links work
- [ ] Images have alt text
- [ ] Mobile menu functions

## CI/CD Automation

GitHub Actions automatically run:
- Build verification
- Lighthouse CI on PR
- Link checking
- Deployment to GitHub Pages (on main branch)

**PR Status Checks:**
- Build must succeed
- Lighthouse thresholds must be met
- All checks must pass before merge

## Test Data

### Form Testing
- Use `.env` to disable form submissions locally
- Test form validation (required fields)
- Verify Turnstile widget loads

### Content Testing
- Check different content lengths
- Test special characters in titles
- Verify Front Matter parsing

## Performance Testing

### Critical Pages
- **Landing Page (`/`):** No heavy images, minimal JS
- **Pricing (`/pricing`):** Fast load, clear CTA

### Image Optimization
```bash
# Check image sizes
find static/images -type f -exec ls -lh {} \; | awk '{print $5, $9}'
```

### Build Size
Monitor `public/` directory size:
- Should stay under 10MB total
- Individual pages under 500KB

## Regression Prevention

### Before Changes
1. Take note of current Lighthouse scores
2. Document existing functionality
3. Screenshot UI if changing layouts

### After Changes
1. Compare Lighthouse scores (should not decrease)
2. Verify existing functionality still works
3. Compare screenshots (UI should improve or stay same)

## Documentation Testing

If documentation changes:
- [ ] Links in docs resolve correctly
- [ ] Code examples are accurate
- [ ] Commands can be run successfully
- [ ] Screenshots are up-to-date

---

**Last Updated:** 2026-02-15
