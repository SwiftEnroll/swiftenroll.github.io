# Industry Pages SEO Sections Redesign

## Problem
The industry pages previously relied on a single, text-heavy markdown body (`.Content`) to deliver SEO value. This resulted in:
- Poor scannability for users
- A visual disconnect from the rest of the polished, component-driven site
- Dense paragraphs that were hard to read on mobile devices
- Lack of visual hierarchy and rhythm

## Solution
We introduced a new reusable pattern for industry pages that allows content to be structured in front matter and rendered using a new partial component (`layouts/partials/components/industry-seo-sections.html`).

This approach:
- Preserves all SEO content and semantic HTML (H2s, H3s, etc.)
- Breaks dense text into scannable, visually appealing modules (intros, benefit grids, text blocks, FAQs)
- Matches the design system of the rest of the site (using existing Tailwind classes and icons)
- Makes it easy for content editors to update and add new sections without writing HTML

## Implementation Details

### 1. New Partial: `industry-seo-sections.html`
Created a new partial that iterates over a `seo_sections` array in the page's front matter. It supports four section types:
- `intro`: A centered, text-focused section for the main SEO introduction.
- `benefits`: A grid of cards with icons, titles, and descriptions.
- `text_block`: A standard text section for additional content.
- `faq`: An accordion-style FAQ section.

### 2. Updated Template: `industry.html`
Modified the `layouts/_default/industry.html` template to check for the presence of `seo_sections` in the front matter. If present, it renders the new partial; otherwise, it falls back to the legacy `.Content` rendering to ensure backward compatibility.

### 3. Refactored Content Pages
Updated the front matter of the following industry pages to use the new `seo_sections` structure:
- `content/industries/youth-sports-fitness.md`
- `content/industries/after-school-enrichment-programs.md`

The original markdown content was carefully migrated into the structured front matter, preserving all headings, paragraphs, and links.

## How to Use the New Pattern

To use the new pattern on an industry page, add a `seo_sections` array to the front matter. Here is an example:

```yaml
seo_sections:
  - type: "intro"
    title: "Main SEO Heading"
    content: |
      Introductory paragraphs go here. You can use **markdown**.
  - type: "benefits"
    title: "Why Choose Us"
    subtitle: "Optional subtitle"
    columns: 2
    items:
      - title: "Benefit 1"
        icon: "check"
        description: "Description of benefit 1."
      - title: "Benefit 2"
        icon: "users"
        description: "Description of benefit 2."
  - type: "text_block"
    title: "Additional Information"
    content: |
      More paragraphs here.
  - type: "faq"
    title: "Frequently Asked Questions"
    items:
      - question: "Question 1?"
        answer: "Answer 1."
      - question: "Question 2?"
        answer: "Answer 2."
```

## Follow-up Recommendations
- **Migrate Remaining Pages:** The remaining industry pages should be migrated to the new `seo_sections` structure for consistency.
- **Add More Section Types:** Consider adding more section types to the partial, such as a "proof" block (testimonials/stats) or a "process" block (step-by-step guide).
- **Enhance FAQ Schema:** The current FAQ implementation in the partial does not include JSON-LD schema markup. Consider adding it to improve SEO further.