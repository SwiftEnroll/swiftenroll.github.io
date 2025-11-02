# Troubleshooting Guide

Common issues and solutions when working with the Hugo Saasify Theme. Find quick fixes for installation, build, styling, content, deployment, and performance problems.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Build Errors](#build-errors)
- [Styling Problems](#styling-problems)
- [Content Issues](#content-issues)
- [Deployment Problems](#deployment-problems)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Getting Help](#getting-help)

## Installation Issues

### Theme Not Found

**Problem**: Hugo can't find the theme

```
Error: unable to locate theme directory "hugo-saasify-theme"
```

**Solutions**:

1. **Verify theme directory exists**:
```bash
ls themes/hugo-saasify-theme
```

2. **Check theme name in config**:
```toml
# hugo.toml
theme = "hugo-saasify-theme"  # Must match directory name exactly
```

3. **If using Git submodule, initialize it**:
```bash
git submodule init
git submodule update --recursive
```

4. **Check directory structure**:
```bash
# Should show theme files
ls -la themes/hugo-saasify-theme/layouts/
```

### Hugo Extended Not Installed

**Problem**: Error about Hugo Extended being required

```
Error: this theme requires Hugo Extended
```

**Solutions**:

1. **Check your Hugo version**:
```bash
hugo version
```

Expected output should include "extended":
```
hugo v0.120.0+extended darwin/amd64
```

2. **Install Hugo Extended**:
   - Visit [Hugo Releases](https://github.com/gohugoio/hugo/releases)
   - Download version with "extended" in the name
   - Install and verify

3. **On macOS with Homebrew**:
```bash
brew install hugo
```

### Submodule Empty

**Problem**: Theme directory exists but is empty

**Solutions**:

1. **Update submodules**:
```bash
git submodule update --init --recursive
```

2. **If still empty, remove and re-add**:
```bash
git submodule deinit -f themes/hugo-saasify-theme
rm -rf .git/modules/themes/hugo-saasify-theme
git rm -f themes/hugo-saasify-theme
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme
```

### npm Dependencies Failed

**Problem**: npm install fails

```
npm ERR! code ENOENT
```

**Solutions**:

1. **Check Node.js is installed**:
```bash
node --version
npm --version
```

2. **Ensure config files are copied to site root**:
```bash
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
```

3. **Clear npm cache**:
```bash
npm cache clean --force
```

4. **Delete and reinstall**:
```bash
rm -rf node_modules package-lock.json
npm install
```

5. **Use different npm registry** (if blocked):
```bash
npm config set registry https://registry.npmjs.org/
npm install
```

## Build Errors

### Tailwind CSS Not Processing

**Problem**: Site loads without styling

**Solutions**:

1. **Enable build stats** in `hugo.toml`:
```toml
[build]
  writeStats = true

[build.buildStats]
  enable = true
```

2. **Clear Hugo cache**:
```bash
hugo --gc
```

3. **Verify Tailwind config exists**:
```bash
ls themes/hugo-saasify-theme/tailwind.config.js
```

4. **Rebuild from clean state**:
```bash
rm -rf public resources
hugo server -D
```

### Template Errors

**Problem**: Error in template execution

```
Error: error calling partial: template: partials/header.html...
```

**Solutions**:

1. **Check the error message** - it usually points to the specific line
2. **Common causes**:
   - Missing closing tags
   - Incorrect variable names
   - Missing required parameters
   - Syntax errors in shortcodes

3. **Validate configuration**:
```bash
hugo config
```

4. **Test with minimal config**:
   - Copy `exampleSite/hugo.toml`
   - Gradually add your customizations

### Shortcode Errors

**Problem**: Shortcode fails to render

```
Error: failed to render shortcode "pricing-table-1"
```

**Solutions**:

1. **Check JSON syntax** (for shortcodes accepting JSON):
   - Use double quotes, not single quotes
   - No trailing commas
   - Valid JSON structure
   - Use JSON validator online

2. **Verify shortcode exists**:
```bash
ls themes/hugo-saasify-theme/layouts/shortcodes/pricing-table-1.html
```

3. **Check shortcode syntax**:
```markdown
# Correct
{{< shortcode-name >}}

# Incorrect
{< shortcode-name >}     # Missing one brace
{{<shortcode-name>}}     # Missing spaces
```

### Build Fails in CI/CD

**Problem**: Builds work locally but fail in CI

**Solutions**:

1. **Match Hugo versions**:
   - Check local: `hugo version`
   - Set in CI config: `HUGO_VERSION=0.120.0`

2. **Install theme dependencies**:
```yaml
# GitHub Actions example
- name: Install dependencies
  run: |
    cp themes/hugo-saasify-theme/package.json .
    cp themes/hugo-saasify-theme/postcss.config.js .
    cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
    npm install
```

3. **Check environment variables**:
   - Verify all required env vars are set
   - Check for typos in variable names

4. **Review build logs**:
   - Look for specific error messages
   - Check file paths are correct
   - Verify permissions

## Styling Problems

### Custom CSS Not Loading

**Problem**: Custom CSS changes don't appear

**Solutions**:

1. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or use incognito/private mode

2. **Verify CSS file path**:
```toml
[params]
  customCSS = ["css/custom.css"]  # File must be in static/css/
```

3. **Check file exists**:
```bash
ls static/css/custom.css
```

4. **Clear Hugo cache**:
```bash
hugo --gc
rm -rf resources
hugo server -D
```

### Tailwind Classes Not Working

**Problem**: Tailwind utility classes have no effect

**Solutions**:

1. **Check class is in content paths**:
```javascript
// tailwind.config.js
content: ["./layouts/**/*.html"]
```

2. **Avoid dynamic class names**:
```html
<!-- Don't do this -->
<div class="text-{{ .Color }}-600">

<!-- Do this instead -->
<div class="{{ if eq .Color "blue" }}text-blue-600{{ end }}">
```

3. **Rebuild site**:
```bash
hugo --gc
hugo
```

4. **Check Tailwind version compatibility**:
```bash
npm list tailwindcss
```

### Colors Not Matching Design

**Problem**: Colors appear different than expected

**Solutions**:

1. **Check color values in `tailwind.config.js`**:
```javascript
colors: {
  primary: {
    600: '#425ad6',  // Your primary color
  }
}
```

2. **Verify you're using correct shade**:
```html
<div class="bg-primary-600">  <!-- Not bg-primary -->
```

3. **Check for color overrides** in custom CSS

4. **Test in different browsers** to rule out rendering differences

### Responsive Design Issues

**Problem**: Layout broken on mobile/tablet

**Solutions**:

1. **Test with DevTools**:
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test various screen sizes

2. **Check responsive classes**:
```html
<!-- Use responsive prefixes -->
<div class="text-sm md:text-base lg:text-lg">
```

3. **Verify viewport meta tag** (should be in baseof.html):
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

4. **Test breakpoints**:
   - sm: 640px
   - md: 768px
   - lg: 1024px
   - xl: 1280px

## Content Issues

### Page Not Rendering

**Problem**: Page exists but shows 404

**Solutions**:

1. **Check front matter**:
```yaml
---
title: "My Page"
draft: false  # Make sure this is false
---
```

2. **Verify file location**:
```bash
ls content/my-page.md
```

3. **Check URL structure**:
   - `content/about.md` → `/about/`
   - `content/blog/post.md` → `/blog/post/`

4. **Restart server**:
```bash
hugo server -D  # -D shows drafts
```

### Images Not Displaying

**Problem**: Images don't show on page

**Solutions**:

1. **Check file path**:
```markdown
# Correct - absolute from static/
![Image](/images/photo.jpg)

# Incorrect - relative path
![Image](../images/photo.jpg)
```

2. **Verify file exists**:
```bash
ls static/images/photo.jpg
```

3. **Check file permissions**:
```bash
chmod 644 static/images/photo.jpg
```

4. **Test URL directly**:
   - Visit `http://localhost:1313/images/photo.jpg`
   - Should display the image

5. **Check file extension** matches exactly (case-sensitive on some systems)

### Shortcode Shows as Text

**Problem**: Shortcode appears as plain text instead of rendering

**Solutions**:

1. **Check syntax**:
```markdown
# Correct
{{< shortcode >}}

# Incorrect
{{ < shortcode > }}
{< shortcode >}
```

2. **Verify shortcode exists**:
```bash
ls themes/hugo-saasify-theme/layouts/shortcodes/
```

3. **Check if content uses correct format**:
   - Markdown files: Use `{{< >}}`
   - HTML files: Use `{{ .Inner }}`

### Taxonomy Pages Empty

**Problem**: Category or tag pages show no posts

**Solutions**:

1. **Enable taxonomies** in `hugo.toml`:
```toml
[taxonomies]
  category = 'categories'
  tag = 'tags'
```

2. **Check front matter**:
```yaml
categories: ["Technology"]  # Use array, not string
tags: ["Hugo", "Tutorial"]
```

3. **Verify taxonomy matches config**:
```toml
# If you have:
[taxonomies]
  category = 'categories'

# Use in front matter:
categories: ["Tech"]  # Not category:
```

## Deployment Problems

### Build Fails on Platform

**Problem**: Build works locally but fails on Netlify/Vercel/etc.

**Solutions**:

1. **Set Hugo version**:

Netlify:
```toml
# netlify.toml
[build.environment]
  HUGO_VERSION = "0.120.0"
```

Vercel:
```json
// vercel.json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.120.0"
    }
  }
}
```

2. **Install theme dependencies**:

Add to build command:
```bash
cp themes/hugo-saasify-theme/package.json . && cp themes/hugo-saasify-theme/postcss.config.js . && cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js && npm install && hugo --minify
```

3. **Check environment variables** are set in platform UI

### Assets Not Loading After Deploy

**Problem**: CSS/JS/images don't load on deployed site

**Solutions**:

1. **Verify baseURL** in `hugo.toml`:
```toml
baseURL = "https://yourdomain.com/"  # Must match your domain
```

2. **Use absolute paths**:
```html
<!-- Correct -->
<img src="/images/logo.svg">

<!-- Incorrect -->
<img src="images/logo.svg">
```

3. **Check CDN/cache**:
   - Clear CDN cache
   - Wait for propagation
   - Hard refresh browser

4. **Verify build output**:
```bash
# Check public/ directory
ls -la public/css/
ls -la public/images/
```

### SSL Certificate Issues

**Problem**: HTTPS not working or certificate errors

**Solutions**:

1. **Wait for provisioning** (can take 24-48 hours)

2. **Check DNS configuration**:
   - A record points to correct IP
   - CNAME points to correct host

3. **Force HTTPS** in platform settings

4. **Clear browser SSL cache**

### 404 on Deployed Site

**Problem**: Pages work locally but 404 on deployed site

**Solutions**:

1. **Check baseURL** includes trailing slash:
```toml
baseURL = "https://example.com/"  # Note the /
```

2. **Verify case sensitivity**:
   - URLs are case-sensitive on most servers
   - Use lowercase for consistency

3. **Check redirects** (if you have them):
   - Verify redirect rules are correct
   - Check for infinite redirect loops

## Performance Issues

### Slow Build Times

**Problem**: Site takes too long to build

**Solutions**:

1. **Enable caching**:
```toml
[caches]
  [caches.images]
    dir = ":resourceDir/_gen"
    maxAge = "1440h"
```

2. **Optimize images** before adding:
   - Compress images
   - Reduce dimensions
   - Use appropriate formats

3. **Limit content during development**:
```bash
hugo server -D --buildFuture=false --buildExpired=false
```

4. **Check for template loops**:
   - Review custom templates
   - Look for inefficient queries

### Site Loads Slowly

**Problem**: Pages take long time to load in browser

**Solutions**:

1. **Enable minification**:
```bash
hugo --minify
```

2. **Optimize images**:
   - Compress all images
   - Use WebP format
   - Implement lazy loading

3. **Use CDN** for static assets

4. **Enable caching** on server:
```nginx
# Nginx example
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
}
```

5. **Run Lighthouse audit**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run performance audit
   - Follow recommendations

### Large CSS File

**Problem**: Generated CSS is too large

**Solutions**:

1. **Verify PurgeCSS is working**:
```bash
# Check file size
ls -lh public/css/*.css
```

2. **Ensure build stats enabled**:
```toml
[build]
  writeStats = true
```

3. **Check content paths** in `tailwind.config.js`:
```javascript
content: ["./layouts/**/*.html"]
```

## Browser Compatibility

### Works in Chrome, Not Safari

**Problem**: Site works in Chrome but has issues in Safari

**Solutions**:

1. **Check for unsupported CSS**:
   - Avoid bleeding-edge features
   - Test CSS properties on [Can I Use](https://caniuse.com/)

2. **Add vendor prefixes** if needed:
```css
-webkit-transition: all 0.3s;
transition: all 0.3s;
```

3. **Test in multiple browsers**:
   - Chrome
   - Firefox
   - Safari
   - Edge

### JavaScript Errors in IE11

**Problem**: Site broken in Internet Explorer

**Note**: IE11 is deprecated. Modern browsers only.

**Solutions**:

1. **Display upgrade message** for old browsers
2. **Focus on modern browsers** (Chrome, Firefox, Safari, Edge)
3. **IE11 usage is <1%** globally - consider if support is needed

## Getting Help

### Before Asking for Help

1. **Check this guide** for your issue
2. **Review documentation**:
   - [INSTALLATION.md](INSTALLATION.md)
   - [CONFIGURATION.md](CONFIGURATION.md)
   - [LAYOUTS.md](LAYOUTS.md)
   - [SHORTCODES.md](SHORTCODES.md)
3. **Search existing issues** on GitHub
4. **Try example site** to isolate problem

### Gathering Information

When reporting issues, include:

1. **Hugo version**:
```bash
hugo version
```

2. **Operating system**:
```bash
uname -a  # Linux/Mac
# or
ver  # Windows
```

3. **Error messages** (complete output)

4. **Configuration** (relevant parts of `hugo.toml`)

5. **Steps to reproduce**:
   - What you did
   - What you expected
   - What actually happened

6. **Minimal reproduction**:
   - Simplest case that shows the problem
   - Remove unrelated code/config

### Where to Get Help

1. **Documentation**: Check all docs in `/docs` directory

2. **Example Site**: Review working examples in `/exampleSite`

3. **GitHub Issues**:
   - Search: [Existing Issues](https://github.com/chaoming/hugo-saasify-theme/issues)
   - Create: [New Issue](https://github.com/chaoming/hugo-saasify-theme/issues/new)

4. **Hugo Community**:
   - [Hugo Discourse](https://discourse.gohugo.io/)
   - [Hugo Documentation](https://gohugo.io/documentation/)

5. **Stack Overflow**:
   - Tag: `hugo`, `hugo-theme`

### Creating a Good Issue Report

**Template**:

```markdown
## Description
Brief description of the problem

## Environment
- Hugo version: 0.120.0+extended
- OS: macOS 14.0
- Theme version: main branch

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Error Messages
```
Paste error messages here
```

## Configuration
```toml
Relevant parts of hugo.toml
```

## Additional Context
Any other relevant information
```

## Common Error Messages

### "Page Not Found"

**Cause**: Content file doesn't exist or is draft

**Fix**:
- Check file exists
- Verify `draft: false`
- Restart server

### "Template Not Found"

**Cause**: Missing or misnamed template file

**Fix**:
- Check template file exists
- Verify layout name in front matter
- Check template lookup order

### "Failed to Process"

**Cause**: CSS/Asset processing error

**Fix**:
- Check PostCSS configuration
- Verify Hugo Extended installed
- Review asset file syntax

### "Submodule Not Found"

**Cause**: Git submodule not initialized

**Fix**:
```bash
git submodule update --init --recursive
```

## Quick Fixes Checklist

When something isn't working:

- [ ] Restart Hugo server
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Clear Hugo cache (`hugo --gc`)
- [ ] Delete `public/` and `resources/` directories
- [ ] Verify Hugo version (`hugo version`)
- [ ] Check `hugo.toml` syntax
- [ ] Review error messages carefully
- [ ] Test with example site configuration
- [ ] Check file permissions
- [ ] Verify file paths are correct

## Prevention Best Practices

Avoid issues before they happen:

1. **Use Version Control**: Commit working states
2. **Test Locally**: Before deploying
3. **Keep Updated**: Update Hugo and dependencies
4. **Follow Documentation**: Don't guess
5. **Start Simple**: Add complexity gradually
6. **Backup Configuration**: Save working configs
7. **Use Example Site**: Reference working examples
8. **Read Error Messages**: They usually tell you what's wrong

## Related Documentation

- [INSTALLATION.md](INSTALLATION.md) - Installation guide
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration options
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guides
- [Hugo Troubleshooting](https://gohugo.io/troubleshooting/)

## Still Stuck?

If you've tried everything and still have issues:

1. **Create minimal reproduction** - Simplest case showing problem
2. **Open GitHub issue** with all relevant information
3. **Be patient** - Maintainers are volunteers
4. **Be detailed** - More info = faster resolution
5. **Follow up** - Respond to questions

Remember: Most issues have been encountered before. Search first, then ask.
