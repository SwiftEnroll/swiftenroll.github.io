# Alternative/Comparison Pages

This directory contains comparison pages for SwiftEnroll vs. competitors. These pages are designed to capture high-intent buyers searching for alternatives to other enrollment management systems.

## Creating a New Comparison Page

1. Create a new markdown file in this directory (e.g., `sawyer.md`, `jackrabbit.md`)

2. Use the following frontmatter template:

```yaml
---
title: "[Competitor] Alternative - SwiftEnroll"
subtitle: "A simpler, more affordable alternative to [Competitor] for camps, after-school programs, and youth organizations"
description: "Looking for a [Competitor] alternative? SwiftEnroll offers simpler enrollment management with transparent pricing, better support, and features designed for modern programs."
layout: "comparison"
competitorName: "[Competitor Name]"

comparison:
  - feature: "Feature Name"
    swiftenroll: "✓" # or "✗" or "Text value"
    competitor: "✓" # or "✗" or "Text value"
  
  # Add more comparison items...

whySwitch:
  - title: "Reason Title"
    description: "Detailed explanation of why this is a benefit..."
  
  # Add more reasons...
---

## Additional Content

Add any additional markdown content here that will appear after the comparison table and "Why Switch" sections.
```

## Visual Indicators

- Use `"✓"` for checkmarks (green circles with check icon)
- Use `"✗"` for X marks (red circles with X icon)
- Use any other text for custom values (displayed as plain text)

## Tips for Effective Comparison Pages

1. **Be Honest**: Only claim advantages where SwiftEnroll genuinely excels
2. **Focus on Value**: Highlight differences that matter to your target audience
3. **Keep it Scannable**: Use 8-12 comparison points for the table
4. **Tell a Story**: The "Why Switch" section should have 3-5 compelling reasons
5. **Include CTAs**: The template automatically includes "Contact Us" and "View Features" buttons
6. **SEO Optimization**: 
   - Include competitor name in title and description
   - Use natural language in the description
   - Add relevant keywords in the additional content section

## Example Pages

- `active-network.md` - First comparison page, demonstrates all features

## Layout Template

The comparison layout is located at `layouts/_default/comparison.html` and includes:
- Hero section with title and subtitle
- Side-by-side comparison table
- "Why Switch" narrative cards
- Additional content area
- CTA section with buttons
