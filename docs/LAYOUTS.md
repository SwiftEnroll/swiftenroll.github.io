# Layouts Guide

Complete guide to the Hugo Saasify Theme's layout system, templates, and components.

## Table of Contents

- [Layout Architecture](#layout-architecture)
- [Base Template](#base-template)
- [Default Layouts](#default-layouts)
- [Page Templates](#page-templates)
- [Partial Components](#partial-components)
- [Custom Layouts](#custom-layouts)
- [Layout Variables](#layout-variables)
- [Best Practices](#best-practices)

## Layout Architecture

The Hugo Saasify Theme follows Hugo's template lookup order with specialized layouts for different page types.

### Directory Structure

```
layouts/
├── _default/
│   ├── baseof.html          # Base template (all pages)
│   ├── single.html           # Single page layout
│   ├── list.html             # List page layout
│   ├── simple.html           # Simple page layout
│   ├── pricing.html          # Pricing page layout
│   ├── company.html          # Company/About page layout
│   ├── career.html           # Careers page layout
│   ├── job-single.html       # Single job posting layout
│   └── feature.html          # Feature page layout
├── docs/
│   └── single.html           # Documentation page layout
├── partials/
│   ├── header.html           # Site header
│   ├── footer.html           # Site footer
│   ├── sidebar.html          # Blog sidebar
│   ├── docs-sidebar.html     # Documentation sidebar
│   ├── post-card.html        # Blog post card
│   ├── post-meta.html        # Post metadata
│   ├── google-analytics.html # GA4 tracking
│   ├── google-tag-manager.html # GTM tracking
│   └── components/
│       ├── cta.html          # CTA component
│       └── subscribe-form.html # Newsletter form
├── taxonomy/
│   ├── list.html             # Category/tag listing
│   └── terms.html            # All categories/tags
├── shortcodes/
│   └── [various shortcodes]  # See SHORTCODES.md
└── index.html                # Homepage template
```

## Base Template

The `baseof.html` template provides the HTML structure for all pages.

### Location
`layouts/_default/baseof.html`

### Structure

```html
<!DOCTYPE html>
<html lang="{{ .Site.Language.Lang }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ block "title" . }}{{ .Title }} | {{ .Site.Title }}{{ end }}</title>

    <!-- Meta tags -->
    <meta name="description" content="{{ block "description" . }}{{ .Description | default .Site.Params.description }}{{ end }}">

    <!-- Styles -->
    {{ $styles := resources.Get "css/main.css" }}
    {{ $styles = $styles | postCSS | minify | fingerprint }}
    <link rel="stylesheet" href="{{ $styles.RelPermalink }}">

    <!-- Analytics -->
    {{ partial "google-tag-manager.html" . }}
    {{ partial "google-analytics.html" . }}
</head>
<body>
    <!-- GTM noscript -->
    {{ partial "google-tag-manager.html" . }}

    <!-- Header -->
    {{ partial "header.html" . }}

    <!-- Main content -->
    <main>
        {{ block "main" . }}{{ end }}
    </main>

    <!-- Footer -->
    {{ partial "footer.html" . }}
</body>
</html>
```

### Available Blocks

1. **title** - Page title (default: `{{ .Title }} | {{ .Site.Title }}`)
2. **description** - Meta description
3. **main** - Main content area

### Customizing Base Template

To override the base template, create:
```
layouts/baseof.html
```

Or extend it in your custom layouts:
```html
{{ define "main" }}
    <!-- Your content -->
{{ end }}
```

## Default Layouts

### Single Page Layout

**File**: `layouts/_default/single.html`

Used for individual blog posts and standard pages.

**Features**:
- Full-width content area
- Post metadata (date, author, reading time)
- Table of contents support
- Related posts
- CTA section
- Social sharing buttons

**Front Matter Example**:
```yaml
---
title: "My Blog Post"
date: 2025-10-06
author: "John Doe"
description: "Post description"
layout: single  # Optional, default for posts
---
```

**Template Structure**:
```html
{{ define "main" }}
<article class="max-w-4xl mx-auto px-4 py-12">
    <!-- Post header -->
    <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ .Title }}</h1>
        {{ partial "post-meta.html" . }}
    </header>

    <!-- Post content -->
    <div class="prose prose-lg">
        {{ .Content }}
    </div>

    <!-- CTA section -->
    {{ if .Site.Params.blog.cta.enable }}
        {{ partial "components/cta.html" . }}
    {{ end }}
</article>
{{ end }}
```

### List Page Layout

**File**: `layouts/_default/list.html`

Used for blog index, category pages, and section listings.

**Features**:
- Grid layout for posts
- Pagination
- Filtering by category/tag
- Sidebar with widgets
- Post previews

**Template Structure**:
```html
{{ define "main" }}
<div class="container py-12">
    <div class="grid lg:grid-cols-3 gap-12">
        <!-- Main content -->
        <div class="lg:col-span-2">
            <div class="grid gap-8">
                {{ range .Paginator.Pages }}
                    {{ partial "post-card.html" . }}
                {{ end }}
            </div>

            <!-- Pagination -->
            {{ template "_internal/pagination.html" . }}
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
            {{ partial "sidebar.html" . }}
        </aside>
    </div>
</div>
{{ end }}
```

### Simple Page Layout

**File**: `layouts/_default/simple.html`

Used for clean, content-focused pages like privacy policy, terms of service.

**Features**:
- Centered content
- No sidebar
- Minimal chrome
- Full prose styling

**Front Matter**:
```yaml
---
title: "Privacy Policy"
layout: simple
---
```

**Use Cases**:
- Legal pages
- Documentation
- Long-form content
- Landing pages

## Page Templates

### Pricing Page Layout

**File**: `layouts/_default/pricing.html`

Specialized layout for pricing pages.

**Features**:
- Pricing table support
- Feature comparison
- FAQ section
- CTA integration
- Custom pricing shortcodes

**Front Matter**:
```yaml
---
title: "Pricing"
layout: pricing
description: "Choose the perfect plan for your needs"
---
```

**Content Example**:
```markdown
---
title: "Pricing"
layout: pricing
---

{{< pricing-table-1 >}}
{
  "title": "Choose Your Plan",
  "description": "Start free, upgrade as you grow",
  "plans": [...]
}
{{< /pricing-table-1 >}}

{{< faq >}}
# Frequently Asked Questions
...
{{< /faq >}}
```

### Company/About Page Layout

**File**: `layouts/_default/company.html`

Designed for company and about pages.

**Features**:
- Team member showcase
- Company stats
- Mission/vision sections
- Investor logos
- Value propositions

**Front Matter**:
```yaml
---
title: "About Us"
layout: company
description: "Learn about our mission and team"
---
```

**Typical Structure**:
```markdown
{{< hero headline="About Our Company" ... >}}

{{< section-container >}}
## Our Mission
...
{{< /section-container >}}

{{< stat value="100+" label="Happy Clients" >}}
{{< stat value="50+" label="Team Members" >}}

{{< team-member name="John Doe" ... >}}
{{< team-member name="Jane Smith" ... >}}
```

### Career Page Layout

**File**: `layouts/_default/career.html`

For careers/jobs listing pages.

**Features**:
- Job listings grid
- Department filtering
- Location filtering
- Application CTA
- Company culture section

**Front Matter**:
```yaml
---
title: "Careers"
layout: career
description: "Join our team"
---
```

### Job Single Layout

**File**: `layouts/_default/job-single.html`

Individual job posting pages.

**Features**:
- Job details
- Requirements list
- Benefits list
- Apply button
- Share functionality

**Front Matter**:
```yaml
---
title: "Senior Developer"
layout: job-single
department: "Engineering"
location: "Remote"
type: "Full-time"
---
```

### Feature Page Layout

**File**: `layouts/_default/feature.html`

Showcase individual features or products.

**Features**:
- Hero section
- Feature highlights
- Screenshots/demos
- Use cases
- Integration info

**Front Matter**:
```yaml
---
title: "Performance Features"
layout: feature
description: "Lightning-fast performance"
---
```

## Partial Components

Reusable components used across layouts.

### Header Partial

**File**: `layouts/partials/header.html`

**Features**:
- Responsive navigation
- Dropdown menus
- Logo
- CTA buttons
- Mobile menu

**Variables**:
- `Site.Params.header.*` - Header configuration
- `Site.Menus.main` - Navigation menu items

**Customization**:
```toml
[params.header]
  background = "bg-white"
  [params.header.logo]
    src = "/images/logo.svg"
```

### Footer Partial

**File**: `layouts/partials/footer.html`

**Features**:
- Multi-column layout
- Footer menus
- Social media links
- Newsletter signup
- Copyright notice

**Variables**:
- `Site.Params.footer.*` - Footer configuration
- `Site.Params.social.*` - Social media links
- `Site.Menus.footer_column_*` - Footer menus

### Sidebar Partial

**File**: `layouts/partials/sidebar.html`

Blog sidebar with widgets.

**Features**:
- Recent posts
- Categories
- Tags cloud
- Newsletter subscription
- Search (optional)

**Configuration**:
```toml
[params.blog.sidebar]
  [params.blog.sidebar.recent]
    enable = true
    count = 5
```

### Documentation Sidebar

**File**: `layouts/partials/docs-sidebar.html`

Navigation for documentation pages.

**Features**:
- Hierarchical navigation
- Active page highlighting
- Collapsible sections
- Search integration

**Usage**:
Automatically included in `layouts/docs/single.html`

### Post Card Partial

**File**: `layouts/partials/post-card.html`

Blog post preview card.

**Features**:
- Featured image
- Title and excerpt
- Post metadata
- Read more link
- Category badge

**Usage**:
```html
{{ range .Pages }}
    {{ partial "post-card.html" . }}
{{ end }}
```

### Post Meta Partial

**File**: `layouts/partials/post-meta.html`

Display post metadata.

**Shows**:
- Publication date
- Author
- Reading time
- Categories
- Tags

**Usage**:
```html
{{ partial "post-meta.html" . }}
```

### CTA Component

**File**: `layouts/partials/components/cta.html`

Call-to-action section.

**Features**:
- Gradient background
- Primary/secondary buttons
- Customizable text

**Configuration**:
```toml
[params.cta]
  enable = true
  title = "Ready to start?"
```

### Subscribe Form Component

**File**: `layouts/partials/components/subscribe-form.html`

Newsletter subscription form.

**Features**:
- Email input
- Submit button
- Privacy notice
- Form validation

**Configuration**:
```toml
[params.blog.sidebar.subscribe]
  enable = true
  action = "https://formspree.io/f/xxx"
```

### Analytics Partials

**Google Analytics**: `layouts/partials/google-analytics.html`
- GA4 tracking code
- Automatic page views
- Event tracking ready

**Google Tag Manager**: `layouts/partials/google-tag-manager.html`
- GTM container code
- Head and body scripts
- DataLayer support

**Custom Head**: `layouts/partials/custom-head.html`
- User-overridable partial for custom code
- Add any tracking scripts not covered by GA/GTM
- Add verification meta tags
- Include custom fonts or stylesheets
- Loaded at the end of `<head>` section

To use, create `layouts/partials/custom-head.html` in your site with your custom content.

## Custom Layouts

### Creating Custom Layouts

1. **Single Page Custom Layout**

Create `layouts/_default/mycustom.html`:
```html
{{ define "main" }}
<div class="custom-layout">
    <h1>{{ .Title }}</h1>
    {{ .Content }}
</div>
{{ end }}
```

Use in front matter:
```yaml
---
title: "My Page"
layout: mycustom
---
```

2. **Section-Specific Layout**

For pages in `content/products/`, create:
`layouts/products/single.html`

3. **Type-Based Layout**

Specify type in front matter:
```yaml
---
title: "My Page"
type: custom
---
```

Create `layouts/custom/single.html`

### Layout Lookup Order

Hugo looks for templates in this order:

For `content/blog/my-post.md`:
1. `layouts/blog/single.html`
2. `layouts/_default/single.html`

For `content/blog/_index.md`:
1. `layouts/blog/list.html`
2. `layouts/_default/list.html`

## Layout Variables

### Page Variables

Available in all layouts:

```html
{{ .Title }}              <!-- Page title -->
{{ .Content }}            <!-- Page content -->
{{ .Description }}        <!-- Page description -->
{{ .Date }}              <!-- Publication date -->
{{ .Lastmod }}           <!-- Last modified date -->
{{ .WordCount }}         <!-- Word count -->
{{ .ReadingTime }}       <!-- Reading time in minutes -->
{{ .Permalink }}         <!-- Absolute URL -->
{{ .RelPermalink }}      <!-- Relative URL -->
{{ .Params.custom }}     <!-- Custom front matter -->
```

### Site Variables

```html
{{ .Site.Title }}                    <!-- Site title -->
{{ .Site.Params.description }}       <!-- Site description -->
{{ .Site.Params.logo }}             <!-- Logo path -->
{{ .Site.BaseURL }}                 <!-- Base URL -->
{{ .Site.Language.Lang }}           <!-- Language code -->
{{ .Site.Menus.main }}              <!-- Main menu -->
{{ .Site.Params.social.twitter }}   <!-- Social links -->
```

### Taxonomy Variables

```html
{{ .Data.Terms }}         <!-- All terms in taxonomy -->
{{ .Data.Singular }}      <!-- Singular name -->
{{ .Data.Plural }}        <!-- Plural name -->
```

### Page Context

```html
{{ .IsHome }}            <!-- Is homepage? -->
{{ .IsPage }}            <!-- Is single page? -->
{{ .IsSection }}         <!-- Is section? -->
{{ .Kind }}              <!-- Page kind -->
{{ .Type }}              <!-- Page type -->
{{ .Section }}           <!-- Section name -->
```

## Best Practices

### 1. Extend, Don't Replace

Prefer extending base template:
```html
{{ define "main" }}
    <!-- Your content -->
{{ end }}
```

Over replacing entire baseof.html.

### 2. Use Partials

Break complex layouts into partials:
```html
{{ partial "components/hero.html" . }}
{{ partial "components/features.html" . }}
{{ partial "components/testimonials.html" . }}
```

### 3. Conditional Content

Use configuration to control features:
```html
{{ if .Site.Params.blog.sidebar.recent.enable }}
    {{ partial "sidebar-recent.html" . }}
{{ end }}
```

### 4. Responsive Design

Use Tailwind responsive classes:
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
```

### 5. Semantic HTML

Use proper HTML5 elements:
```html
<article>
    <header>
        <h1>{{ .Title }}</h1>
        <time datetime="{{ .Date }}">{{ .Date.Format "Jan 2, 2006" }}</time>
    </header>
    <main>{{ .Content }}</main>
</article>
```

### 6. Performance

Optimize images and assets:
```html
{{ $image := resources.Get "images/hero.jpg" }}
{{ $image = $image.Resize "1200x" }}
<img src="{{ $image.RelPermalink }}" loading="lazy">
```

### 7. Accessibility

Include ARIA attributes:
```html
<nav aria-label="Main navigation">
    <!-- Menu items -->
</nav>
```

### 8. SEO

Include proper meta tags:
```html
<meta name="description" content="{{ .Description }}">
<meta property="og:title" content="{{ .Title }}">
<meta property="og:description" content="{{ .Description }}">
```

## Testing Layouts

### Local Testing

```bash
# Test with development server
hugo server -D

# Test specific page
hugo server -D --navigateToChanged

# Test with different baseURL
hugo server -D --baseURL http://localhost:1313
```

### Build Testing

```bash
# Build without drafts
hugo

# Build with drafts
hugo -D

# Build with verbose output
hugo --verbose
```

## Related Documentation

- [SHORTCODES.md](SHORTCODES.md) - Available shortcodes
- [STYLING.md](STYLING.md) - Styling and customization
- [CONTENT-CREATION.md](CONTENT-CREATION.md) - Creating content
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration options

## Additional Resources

- [Hugo Template Documentation](https://gohugo.io/templates/)
- [Hugo Lookup Order](https://gohugo.io/templates/lookup-order/)
- [Hugo Variables](https://gohugo.io/variables/)
- [Hugo Functions](https://gohugo.io/functions/)
