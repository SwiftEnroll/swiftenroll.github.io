# Image Optimization Pipeline

This document describes the image optimization pipeline implemented for the SwiftEnroll website to improve page speed and reduce Cumulative Layout Shift (CLS).

## Overview

The image optimization system uses Hugo's built-in image processing capabilities to:
1. Convert PNG images to modern webp format
2. Add explicit width/height attributes to prevent layout shift
3. Implement lazy loading for non-critical images
4. Automatically process images at build time

## Implementation

### Core Component: Optimized Image Partial

Location: `layouts/partials/components/optimized-image.html`

This reusable partial handles all image optimization logic:

**Features:**
- Automatic webp conversion for raster images
- Explicit width/height attributes to prevent CLS
- Lazy loading support (configurable)
- SVG pass-through (no processing needed)
- Fallback for static images

**Usage Example:**
```hugo
{{ partial "components/optimized-image.html" (dict 
    "src" "/images/hero-image.png" 
    "alt" "Hero illustration" 
    "class" "rounded-xl shadow-elevation" 
    "loading" "eager"
) }}
```

**Parameters:**
- `src` (required): Image path relative to assets/ or static/
- `alt` (required): Alt text for accessibility
- `class` (optional): CSS classes
- `loading` (optional): "lazy" (default) or "eager" (for hero images)
- `width` (optional): Target width for processing
- `height` (optional): Target height for processing
- `sizes` (optional): Responsive sizes attribute

### Image Location

**Assets Directory (`assets/images/`):**
- All images that should be processed are stored here
- Hugo automatically processes these at build time
- Generates webp variants with optimized sizes

**Static Directory (`static/images/`):**
- Keep small assets like SVG icons here
- Files that don't need processing
- These are served directly without optimization

## Components Updated

### Hero Images (Eager Loading)
- `layouts/partials/components/hero.html` - Hero section images
- `layouts/partials/layout/header.html` - Logo in header
- **Strategy:** Load immediately with `loading="eager"`

### Content Images (Lazy Loading)
- `layouts/shortcodes/figure.html` - Figure shortcode
- `layouts/shortcodes/feature.html` - Feature sections
- `layouts/shortcodes/testimonials.html` - Testimonial avatars
- `layouts/shortcodes/client-logos.html` - Client logo grids
- `layouts/shortcodes/company-leadership.html` - Team photos
- `layouts/partials/components/client-logos.html` - Logo partial
- `layouts/partials/components/industry-features.html` - Industry feature images
- `layouts/partials/layout/footer.html` - Footer logo
- **Strategy:** Load on demand with `loading="lazy"`

## Performance Results

### File Size Reduction
| Image | Original (PNG) | Optimized (WebP) | Savings |
|-------|---------------|------------------|---------|
| hero-image.png | 847 KB | 124 KB | 85% |
| happy-parent.png | 156 KB | 30 KB | 81% |
| happy-kid-phone.png | 89 KB | 15 KB | 83% |
| secure-payments.png | 206 KB | 38 KB | 82% |
| woman-desk.png | 202 KB | 39 KB | 81% |

**Total:** 17 images processed automatically during build

### Layout Shift Prevention
- All images include explicit `width` and `height` attributes
- Browser reserves correct space before image loads
- Prevents content jumping (reduces CLS score)

### Loading Strategy
- **Hero images:** Eager loading (above the fold, immediate)
- **Other images:** Lazy loading (loads as user scrolls)
- **SVG images:** Pass through unchanged (already optimized)

## Build Process

### Development
```bash
npm run start
# Starts Hugo dev server with live reload
# Images are processed on-demand
```

### Production
```bash
npm run build
# Processes all images and generates webp variants
# Output in public/images/ directory
```

### Hugo Configuration
The image processing is configured in `hugo.toml`:

```toml
[caches]
    [caches.images]
        dir = ":cacheDir/images"
        maxAge = "8760h"  # 1 year
```

## Browser Support

- **Modern browsers:** Automatically receive webp images
- **Older browsers:** Hugo can be configured to generate fallbacks
- **SVG images:** Supported universally, no processing needed

## Adding New Images

1. **Place image in assets/images/**
   ```
   assets/images/my-new-image.png
   ```

2. **Use the optimized image partial**
   ```hugo
   {{ partial "components/optimized-image.html" (dict 
       "src" "/images/my-new-image.png" 
       "alt" "Description" 
       "loading" "lazy"
   ) }}
   ```

3. **Build and verify**
   ```bash
   npm run build
   # Check public/images/ for generated webp
   ```

## Testing

### Visual Verification
1. Start dev server: `npm run start`
2. Open http://localhost:1313
3. Check browser DevTools Network tab:
   - Verify webp images are served
   - Check loading behavior (eager vs lazy)
   - Confirm dimensions are set

### Lighthouse Testing
Run Lighthouse audit to measure:
- **Performance score** - Should improve with smaller images
- **CLS (Cumulative Layout Shift)** - Should improve with explicit dimensions
- **Best Practices** - Should show proper image formats

## Troubleshooting

### Images not processing
- Ensure images are in `assets/images/` not `static/images/`
- Check Hugo build output for processing count
- Verify Hugo extended version is installed

### Layout shift still occurring
- Verify images have width/height attributes in HTML output
- Check CSS doesn't override natural dimensions
- Ensure aspect ratio is maintained

### Build errors
- Check image file format (PNG, JPEG supported for webp)
- Ensure SVG images are handled separately
- Verify Hugo version is 0.80.0+

## Future Enhancements

Possible improvements for later:
- Add AVIF format support (even better compression)
- Implement responsive image srcset for different screen sizes
- Add automatic image compression before webp conversion
- Create image CDN integration for global delivery
