# SEO Configuration Guide

This document explains the SEO features configured for the SwiftEnroll website.

## Overview

The site is configured with comprehensive SEO features to ensure good search engine visibility and attractive social media previews.

## Features Implemented

### 1. Canonical URLs

Every page automatically includes a canonical URL tag pointing to its permalink:
```html
<link rel="canonical" href="https://swiftenroll.github.io/page-url/">
```

This prevents duplicate content issues and consolidates SEO value to the correct URL.

### 2. Sitemap.xml

The site automatically generates a sitemap at `/sitemap.xml` that includes:
- All public pages
- Last modified dates (from Git)
- Change frequency: weekly
- Priority: 0.5 (default)

**Configuration** (in `hugo.toml`):
```toml
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5
```

**Access**: https://swiftenroll.github.io/sitemap.xml

### 3. robots.txt

Located at `/robots.txt`, this file:
- Allows all crawlers to index all content
- Points to the sitemap location

**Content**:
```
User-agent: *
Allow: /

Sitemap: https://swiftenroll.github.io/sitemap.xml
```

**Access**: https://swiftenroll.github.io/robots.txt

### 4. OpenGraph Meta Tags

Every page includes OpenGraph tags for rich social media previews on Facebook, LinkedIn, etc.

**Site-wide defaults** (in `hugo.toml`):
```toml
[params]
  description = "SwiftEnroll simplifies enrollment, waitlists, approvals, and payments..."
  image = "/images/hero-image.png"
  twitter = "SwiftEnroll"
```

**Generated tags**:
```html
<meta property="og:title" content="Page Title | SwiftEnroll">
<meta property="og:description" content="Page description">
<meta property="og:type" content="website">
<meta property="og:url" content="https://swiftenroll.github.io/page/">
<meta property="og:site_name" content="SwiftEnroll">
<meta property="og:image" content="https://swiftenroll.github.io/images/hero-image.png">
```

### 5. Twitter Card Meta Tags

Twitter-specific tags ensure proper display on Twitter/X:

**Generated tags**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title | SwiftEnroll">
<meta name="twitter:description" content="Page description">
<meta name="twitter:site" content="@SwiftEnroll">
<meta name="twitter:image" content="https://swiftenroll.github.io/images/hero-image.png">
```

## Per-Page Customization

You can override SEO settings in any page's front matter:

### Custom Description

```yaml
---
title: "My Page"
description: "Custom description for this specific page"
---
```

### Custom Social Image

```yaml
---
title: "My Page"
image: "/images/custom-social-preview.jpg"
---
```

### Custom Canonical URL

If you need to point to a different canonical URL (e.g., for syndicated content):

```yaml
---
title: "My Page"
canonical: "https://original-site.com/original-post/"
---
```

**Note**: The template currently uses `.Permalink` for canonical URLs. To support custom canonical URLs, you would need to modify the canonical URL link tag in `layouts/_default/baseof.html`.

### Hide from Search Engines

```yaml
---
title: "Draft Page"
robots: "noindex, nofollow"
---
```

## Testing Your SEO

### 1. Validate Sitemap
Visit: https://swiftenroll.github.io/sitemap.xml

### 2. Check robots.txt
Visit: https://swiftenroll.github.io/robots.txt

### 3. Test Social Previews

**Facebook/OpenGraph**:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**Twitter**:
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

**LinkedIn**:
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 4. Verify Meta Tags

Use browser dev tools to inspect the `<head>` section of any page and verify all tags are present.

## Best Practices

### Title Guidelines
- **Homepage**: Just the site name (e.g., "SwiftEnroll")
- **Subpages**: "Page Title | SwiftEnroll"
- **Length**: 50-60 characters optimal
- **Keywords**: Include primary keyword near the start

### Description Guidelines
- **Length**: 150-160 characters
- **Unique**: Every page should have a unique description
- **Compelling**: Encourage clicks from search results
- **Accurate**: Describe the actual page content

### Social Image Guidelines
- **Dimensions**: 1200×630 pixels (OpenGraph standard)
- **Format**: JPG or PNG
- **File Size**: Under 5MB (ideally under 1MB)
- **Text**: Include minimal text overlay if any
- **Quality**: High resolution, clear visuals
- **Branding**: Include logo if appropriate

### URL Structure
- Use descriptive slugs
- Keep URLs short and readable
- Use hyphens (not underscores)
- Lowercase only
- Avoid special characters

## Troubleshooting

### Social Preview Not Updating

Social platforms cache previews. To force a refresh:

1. **Facebook**: Use the [Sharing Debugger](https://developers.facebook.com/tools/debug/) and click "Scrape Again"
2. **Twitter**: The cache typically clears within 7 days
3. **LinkedIn**: Use [Post Inspector](https://www.linkedin.com/post-inspector/) and click "Inspect"

### Sitemap Not Showing Pages

Check:
1. Is the page's `draft` status set to `false`?
2. Does the page have a valid front matter?
3. Rebuild the site with `hugo --minify`

### Canonical URL Issues

Canonical URLs use the `baseURL` from `hugo.toml`. Ensure it's set correctly:
```toml
baseURL = "https://swiftenroll.github.io/"
```

## Advanced Configuration

### Per-Section Defaults

You can set defaults for entire sections in section `_index.md` files:

```yaml
---
title: "Blog"
cascade:
  image: "/images/blog-default.jpg"
---
```

This applies the image to all pages in that section unless overridden.

### Custom Meta Tags

Add any custom meta tags via front matter:

```yaml
---
title: "My Page"
customMeta:
  - name: "custom-tag"
    content: "custom value"
---
```

## Monitoring & Analytics

Combine SEO features with analytics to track:
- Search engine rankings
- Organic traffic growth
- Social referral traffic
- Most shared content

The site includes Google Analytics (configured in `hugo.toml`):
```toml
[params]
  googleAnalytics = "G-LBWHMP8FYR"
```

## Related Documentation

- [Content Creation Guide](CONTENT-CREATION.md) - Learn about creating content
- [Configuration Guide](CONFIGURATION.md) - Site configuration details
- [Hugo SEO Documentation](https://gohugo.io/templates/internal/#open-graph)
