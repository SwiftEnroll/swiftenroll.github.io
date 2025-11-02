# Content Creation Guide

Complete guide to creating and managing content in the Hugo Saasify Theme. Learn how to create different types of pages, blog posts, documentation, and optimize for SEO.

## Table of Contents

- [Content Structure](#content-structure)
- [Front Matter Reference](#front-matter-reference)
- [Page Types](#page-types)
- [Blog Posts](#blog-posts)
- [Documentation Pages](#documentation-pages)
- [Creating Pages](#creating-pages)
- [Taxonomies](#taxonomies)
- [Media Management](#media-management)
- [SEO Optimization](#seo-optimization)

## Content Structure

Hugo content is organized in the `content/` directory with a hierarchical structure.

### Directory Layout

```
content/
├── _index.md              # Homepage
├── blog/
│   ├── _index.md          # Blog listing page
│   ├── my-first-post.md   # Blog post
│   └── another-post.md    # Blog post
├── docs/
│   ├── _index.md          # Docs home
│   ├── getting-started/
│   │   ├── _index.md
│   │   └── installation.md
│   └── guides/
│       ├── _index.md
│       └── advanced.md
├── features/
│   ├── _index.md
│   ├── performance.md
│   └── security.md
├── pricing.md
├── about.md
└── contact.md
```

### Content Types

- **Single Pages**: Individual pages (About, Contact, Pricing)
- **List Pages**: Section indexes (`_index.md`)
- **Blog Posts**: Content in `blog/` directory
- **Documentation**: Content in `docs/` directory
- **Custom Types**: Any custom content sections

## Front Matter Reference

Front matter is metadata at the top of your markdown files.

### Common Front Matter

```yaml
---
title: "Page Title"
date: 2025-10-06
lastmod: 2025-10-06
draft: false
description: "Page description for SEO and social sharing"
slug: "custom-url-slug"
aliases:
  - /old-url/
  - /another-old-url/
---
```

### Complete Front Matter Options

```yaml
---
# Basic Info
title: "Complete Page Title"
date: 2025-10-06T10:00:00-07:00
lastmod: 2025-10-06T15:30:00-07:00
draft: false
publishDate: 2025-10-06T10:00:00-07:00
expiryDate: 2026-10-06T10:00:00-07:00

# Content
description: "Detailed description for meta tags and previews"
summary: "Short summary for listing pages"
keywords: ["keyword1", "keyword2", "keyword3"]

# Layout
layout: "single"  # or: simple, pricing, company, career, feature
type: "blog"      # Content type

# URL
slug: "custom-url-slug"
url: "/custom/path/"
aliases:
  - /old-path/
  - /another-old-path/

# Taxonomies
categories: ["Technology", "Web Development"]
tags: ["Hugo", "SaaS", "Tutorial"]
series: ["Getting Started"]

# Author
author: "John Doe"
authors: ["John Doe", "Jane Smith"]

# Media
images:
  - /images/featured-image.jpg
  - /images/social-share.jpg

# SEO
robots: "index, follow"
canonical: "https://example.com/canonical-url/"

# Features
toc: true              # Show table of contents
comments: true         # Enable comments
share: true           # Show share buttons
featured: true        # Mark as featured
weight: 10            # Sort order (lower = earlier)

# Custom Parameters
custom_field: "value"
---
```

### Field Descriptions

**Basic Info**:
- `title`: Page title (required)
- `date`: Publication date
- `draft`: If true, page won't be published
- `publishDate`: Schedule future publication
- `expiryDate`: Auto-expire content

**Content**:
- `description`: Meta description (150-160 chars recommended)
- `summary`: Short summary for cards/listings
- `keywords`: SEO keywords (optional, less important today)

**Layout**:
- `layout`: Template to use
- `type`: Content type for organization

**URL**:
- `slug`: Custom URL slug (defaults to filename)
- `url`: Full custom URL path
- `aliases`: Redirects from old URLs

**Taxonomies**:
- `categories`: Broad categories
- `tags`: Specific tags
- `series`: Part of a series

## Page Types

### Homepage

**File**: `content/_index.md`

```yaml
---
title: "Home"
description: "Build your SaaS faster with our modern Hugo theme"
---

{{< hero
    headline="Build Your SaaS <span class='text-primary-600'>Faster</span>"
    sub_headline="A modern, responsive Hugo theme for SaaS companies"
    primary_button_text="Get Started"
    primary_button_url="/signup"
    hero_image="/images/hero.png"
>}}

{{< features-section title="Why Choose Us" >}}
{{< feature icon="zap" title="Fast" description="Lightning fast performance" >}}
{{< feature icon="lock" title="Secure" description="Enterprise security" >}}
{{< /features-section >}}
```

### Simple Page

For clean, focused content pages.

```yaml
---
title: "Privacy Policy"
layout: simple
description: "Our privacy policy and data handling practices"
---

# Privacy Policy

Last updated: October 6, 2025

## Introduction

Your privacy is important to us...

## Data Collection

We collect the following information...
```

**Use Cases**:
- Privacy Policy
- Terms of Service
- Legal pages
- Documentation

### Feature Page

Showcase a specific feature or product.

```yaml
---
title: "Performance Features"
layout: feature
description: "Lightning-fast performance for your SaaS application"
featured_image: "/images/feature-performance.jpg"
---

{{< hero
    headline="Unmatched Performance"
    sub_headline="Built for speed from the ground up"
    hero_image="/images/performance.png"
>}}

## Lightning Fast

Our platform is optimized for speed...

{{< stat value="<50ms" label="Response Time" >}}
{{< stat value="99.9%" label="Uptime" >}}
```

### Pricing Page

Display your pricing plans.

```yaml
---
title: "Pricing"
layout: pricing
description: "Choose the perfect plan for your needs"
---

{{< pricing-table-1 >}}
{
  "title": "Simple, Transparent Pricing",
  "plans": [...]
}
{{< /pricing-table-1 >}}

{{< faq >}}
{
  "title": "Pricing FAQ",
  "questions": [...]
}
{{< /faq >}}
```

### Company/About Page

For company information and team pages.

```yaml
---
title: "About Us"
layout: company
description: "Learn about our mission, vision, and team"
---

{{< hero headline="Our Story" sub_headline="Building the future of SaaS" >}}

## Our Mission

We're on a mission to...

{{< stat value="100+" label="Customers" >}}
{{< stat value="50+" label="Team Members" >}}
{{< stat value="10+" label="Countries" >}}

## Our Team

{{< team-member
    name="Jane Doe"
    title="CEO & Founder"
    image="/images/team/jane.jpg"
    bio="Jane has 15 years of experience..."
    linkedin="https://linkedin.com/in/janedoe"
>}}
```

### Career Page

Job listings and career information.

```yaml
---
title: "Careers"
layout: career
description: "Join our team and build the future"
---

## Why Work With Us

Great benefits, amazing culture...

## Open Positions

Our job listings are below...
```

### Job Single

Individual job postings.

```yaml
---
title: "Senior Software Engineer"
layout: job-single
date: 2025-10-06
department: "Engineering"
location: "Remote"
type: "Full-time"
salary_range: "$120k - $180k"
---

## About the Role

We're looking for a senior software engineer...

## Requirements

- 5+ years of experience
- Strong knowledge of Go/Python
- Experience with distributed systems

## Benefits

- Competitive salary
- Health insurance
- Remote work
- Unlimited PTO
```

## Blog Posts

Creating and managing blog content.

### Creating a Blog Post

```bash
# Create new post
hugo new blog/my-awesome-post.md
```

### Blog Post Front Matter

```yaml
---
title: "How to Build a SaaS Application"
date: 2025-10-06
lastmod: 2025-10-06
author: "John Doe"
description: "Complete guide to building your first SaaS application"
categories: ["Tutorials"]
tags: ["SaaS", "Web Development", "Tutorial"]
featured_image: "/images/blog/saas-guide.jpg"
draft: false
toc: true
---

Your blog post content here...
```

### Blog Post Structure

```markdown
---
title: "Complete Blog Post Example"
date: 2025-10-06
author: "John Doe"
categories: ["Technology"]
tags: ["Hugo", "Web Development"]
featured_image: "/images/blog/featured.jpg"
description: "Learn how to write great blog posts"
---

## Introduction

Start with a hook that grabs attention...

## Main Content

### Subsection 1

Detailed content with examples...

```javascript
// Code example
function example() {
  return "Hello, World!";
}
```

### Subsection 2

More content...

## Conclusion

Wrap up with key takeaways...

## Further Reading

- [Related Article 1](#)
- [Related Article 2](#)
```

### Blog Features

**Table of Contents**:
```yaml
---
toc: true
---
```

**Featured Image**:
```yaml
---
featured_image: "/images/blog/my-post.jpg"
---
```

**Author Info**:
```yaml
---
author: "John Doe"
# or multiple authors
authors: ["John Doe", "Jane Smith"]
---
```

**Categories & Tags**:
```yaml
---
categories: ["Technology", "Business"]
tags: ["Hugo", "SaaS", "Web", "Tutorial"]
---
```

## Documentation Pages

Create structured documentation with sidebar navigation.

### Documentation Structure

```
content/docs/
├── _index.md                    # Docs home
├── getting-started/
│   ├── _index.md                # Section index
│   ├── installation.md          # weight: 1
│   ├── configuration.md         # weight: 2
│   └── first-steps.md          # weight: 3
├── guides/
│   ├── _index.md
│   ├── customization.md
│   └── deployment.md
└── reference/
    ├── _index.md
    ├── api.md
    └── configuration.md
```

### Documentation Front Matter

```yaml
---
title: "Installation Guide"
description: "How to install the theme"
weight: 1              # Sort order in sidebar
draft: false
toc: true             # Show table of contents
---

# Installation Guide

Complete installation instructions...
```

### Documentation Index Pages

**Section Index** (`_index.md`):

```yaml
---
title: "Getting Started"
description: "Start here to learn the basics"
weight: 1
---

# Getting Started

Welcome to our documentation!

## In This Section

- [Installation](installation/)
- [Configuration](configuration/)
- [First Steps](first-steps/)
```

### Sidebar Navigation

The sidebar automatically generates from:
1. Directory structure
2. `weight` parameter (lower = earlier)
3. Front matter titles

**Example Sidebar Order**:

```yaml
# content/docs/getting-started/_index.md
---
title: "Getting Started"
weight: 1
---

# content/docs/getting-started/installation.md
---
title: "Installation"
weight: 1
---

# content/docs/getting-started/configuration.md
---
title: "Configuration"
weight: 2
---

# content/docs/guides/_index.md
---
title: "Guides"
weight: 2
---
```

### Documentation Best Practices

1. **Hierarchical Structure**: Organize content logically
2. **Clear Titles**: Use descriptive, searchable titles
3. **Weight Ordering**: Use weights for custom ordering
4. **Cross-Linking**: Link related documentation
5. **Examples**: Include code examples and screenshots
6. **Table of Contents**: Enable TOC for long pages
7. **Keep Updated**: Review and update regularly

### Documentation Features

**Table of Contents**:
```markdown
---
toc: true
---

{{< toc >}}

# Your Content
```

**Code Examples**:
```markdown
{{< code lang="bash" title="Installation" >}}
hugo new site mysite
{{< /code >}}
```

**Callouts/Alerts**:
```markdown
> **Note**: Important information here

> **Warning**: Caution about this action
```

**Cross-References**:
```markdown
See [Installation Guide](../getting-started/installation/) for details.
```

## Creating Pages

### Using Hugo CLI

```bash
# Create a blog post
hugo new blog/my-post.md

# Create a documentation page
hugo new docs/guides/my-guide.md

# Create a custom page
hugo new features/new-feature.md
```

### Manual Creation

Create file directly in `content/` directory:

```bash
touch content/about.md
```

Add front matter and content:

```yaml
---
title: "About Us"
description: "Learn about our company"
layout: simple
---

# About Us

Our story begins...
```

### Content Organization

**Flat Structure** (simple sites):
```
content/
├── _index.md
├── about.md
├── pricing.md
└── contact.md
```

**Hierarchical Structure** (complex sites):
```
content/
├── _index.md
├── blog/
│   └── posts...
├── docs/
│   └── documentation...
├── features/
│   └── feature pages...
└── company/
    ├── about.md
    ├── team.md
    └── careers/
        └── jobs...
```

## Taxonomies

Organize content with categories, tags, and custom taxonomies.

### Using Categories

```yaml
---
title: "My Post"
categories: ["Technology", "Web Development"]
---
```

**Category Page**: Automatically created at `/categories/technology/`

### Using Tags

```yaml
---
title: "My Post"
tags: ["Hugo", "SaaS", "Tutorial", "Beginner"]
---
```

**Tag Page**: Automatically created at `/tags/hugo/`

### Custom Taxonomies

1. **Define in `hugo.toml`**:
```toml
[taxonomies]
  category = 'categories'
  tag = 'tags'
  series = 'series'
  author = 'authors'
```

2. **Use in Content**:
```yaml
---
title: "My Post"
series: ["Getting Started Guide"]
authors: ["John Doe"]
---
```

3. **Access**: `/series/getting-started-guide/`, `/authors/john-doe/`

### Taxonomy Best Practices

- **Categories**: Broad topics (5-10 total)
- **Tags**: Specific keywords (unlimited)
- **Consistent Naming**: Use consistent case and format
- **Don't Over-Tag**: 3-7 tags per post is ideal

## Media Management

### Images

**Storage Location**: `static/images/`

```
static/
└── images/
    ├── logo.svg
    ├── hero.png
    ├── blog/
    │   ├── post-1.jpg
    │   └── post-2.jpg
    └── team/
        ├── john.jpg
        └── jane.jpg
```

**Using in Content**:

```markdown
![Alt text](/images/blog/my-image.jpg)
```

**Using with Shortcode**:

```markdown
{{< figure
    src="/images/diagram.png"
    alt="System Architecture"
    caption="Our microservices architecture"
>}}
```

### Image Optimization

**Best Practices**:
- Compress images before uploading
- Use appropriate formats (WebP, JPEG, PNG)
- Use responsive images
- Include alt text for accessibility

**Tools**:
- [TinyPNG](https://tinypng.com/) - Compression
- [Squoosh](https://squoosh.app/) - Format conversion
- ImageOptim (Mac)
- ImageMagick (CLI)

### Featured Images

**Blog Posts**:
```yaml
---
featured_image: "/images/blog/post-featured.jpg"
---
```

**Social Sharing**:
```yaml
---
images:
  - /images/social-share.jpg
---
```

### Videos

**YouTube Embed**:
```markdown
{{< youtube VIDEO_ID >}}
```

**Vimeo Embed**:
```markdown
{{< vimeo VIDEO_ID >}}
```

**Self-Hosted**:
```html
<video controls>
  <source src="/videos/demo.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

### Files & Downloads

**PDFs and Documents**:

Store in `static/files/`:

```markdown
[Download PDF](/files/whitepaper.pdf)
```

## SEO Optimization

### Essential SEO Elements

**Title & Description**:
```yaml
---
title: "How to Build a SaaS Application in 2025"
description: "Complete guide to building, launching, and scaling your SaaS application with modern tools and best practices."
---
```

**URL Structure**:
```yaml
---
slug: "build-saas-application-2025"
---
```

**Canonical URL**:
```yaml
---
canonical: "https://example.com/blog/original-post/"
---
```

### Open Graph Tags

Automatically generated from:

```yaml
---
title: "Page Title"
description: "Page description"
images:
  - /images/social-share.jpg
---
```

### Twitter Cards

Same as Open Graph:

```yaml
---
title: "Twitter-friendly Title"
description: "Compelling description under 200 characters"
images:
  - /images/twitter-card.jpg
---
```

### Structured Data

Add JSON-LD structured data for rich results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ .Title }}",
  "description": "{{ .Description }}",
  "datePublished": "{{ .Date.Format "2006-01-02" }}"
}
</script>
```

### SEO Best Practices

1. **Descriptive Titles**: 50-60 characters
2. **Meta Descriptions**: 150-160 characters
3. **Headings Hierarchy**: Use h1, h2, h3 properly
4. **Image Alt Text**: Describe images accurately
5. **Internal Linking**: Link related content
6. **Fast Loading**: Optimize performance
7. **Mobile Friendly**: Ensure responsive design
8. **HTTPS**: Use secure connections
9. **Sitemap**: Auto-generated by Hugo
10. **robots.txt**: Control crawler access

### Keywords

```yaml
---
keywords: ["SaaS", "web development", "Hugo", "tutorial"]
---
```

**Note**: Less important for SEO today, but can help with organization.

## Content Best Practices

### Writing Guidelines

1. **Clear Headlines**: Descriptive, engaging titles
2. **Short Paragraphs**: 2-3 sentences max
3. **Bullet Points**: Break up long lists
4. **Visual Elements**: Images, diagrams, videos
5. **Code Examples**: Syntax highlighted, tested
6. **Internal Links**: Guide readers to related content
7. **CTAs**: Clear next steps
8. **Proofreading**: Check spelling and grammar

### Content Workflow

1. **Plan**: Outline structure and key points
2. **Draft**: Write content in markdown
3. **Review**: Check for accuracy and clarity
4. **Optimize**: Add SEO elements, images
5. **Preview**: Test with `hugo server -D`
6. **Publish**: Remove `draft: true`
7. **Promote**: Share on social media
8. **Update**: Review and refresh periodically

### Markdown Tips

**Bold & Italic**:
```markdown
**bold text**
*italic text*
***bold and italic***
```

**Lists**:
```markdown
- Unordered item
- Another item

1. Ordered item
2. Another ordered item
```

**Links**:
```markdown
[Link text](https://example.com)
[Internal link](/about/)
```

**Code**:
```markdown
Inline `code` with backticks

```language
code block
```
```

**Blockquotes**:
```markdown
> This is a quote
> Second line
```

**Tables**:
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## Related Documentation

- [SHORTCODES.md](SHORTCODES.md) - Available shortcodes
- [LAYOUTS.md](LAYOUTS.md) - Layout templates
- [CONFIGURATION.md](CONFIGURATION.md) - Site configuration
- [STYLING.md](STYLING.md) - Styling customization

## Additional Resources

- [Hugo Content Management](https://gohugo.io/content-management/)
- [Markdown Guide](https://www.markdownguide.org/)
- [SEO Best Practices](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org/)
