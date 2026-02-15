# Image Optimization Pipeline

This document describes the image optimization pipeline implemented for the SwiftEnroll website to improve page speed and reduce Cumulative Layout Shift (CLS).

## Overview

The image optimization system uses Hugo's built-in image processing capabilities to:
1. Convert PNG images to modern webp format
2. Generate multiple responsive image variants (srcset)
3. Add explicit width/height attributes to prevent layout shift
4. Implement lazy loading for non-critical images
5. Automatically process images at build time

## Implementation

### Core Component: Optimized Image Partial

Location: `layouts/partials/components/optimized-image.html`

This reusable partial handles all image optimization logic:

**Features:**
- Automatic webp conversion for raster images
- **Responsive image variants with srcset** (480px, 768px, 1024px, 1440px widths)
- **Intelligent sizes attribute** for viewport-based image selection
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
    "sizes" "(min-width: 800px) 50vw, 100vw"
) }}
```

**Parameters:**
- `src` (required): Image path relative to assets/ or static/
- `alt` (required): Alt text for accessibility
- `class` (optional): CSS classes
- `loading` (optional): "lazy" (default) or "eager" (for hero images)
- `width` (optional): Target width for processing
- `height` (optional): Target height for processing
- `sizes` (optional): Responsive sizes attribute (defaults to "(min-width: 1280px) 1280px, 100vw")
- `responsiveWidths` (optional): Custom widths for responsive variants (defaults to [480, 768, 1024, 1440])

### Image Location

**Assets Directory (`assets/images/`):**
- All images that should be processed are stored here
- Hugo automatically processes these at build time
- Generates webp variants with optimized sizes and responsive variants

**Static Directory (`static/images/`):**
- Keep small assets like SVG icons here
- Files that don't need processing
- These are served directly without optimization

### Responsive Images (srcset)

The partial automatically generates multiple image variants at different widths for responsive delivery:

**Default Responsive Widths:**
These values represent the **rendered image width**, not viewport width:
- 480px (mobile devices)
- 768px (tablets and larger mobile screens)
- 1024px (desktop displays)
- 1440px (large desktop displays and HiDPI screens)

**Important:** The browser automatically selects the appropriate image based on:
- **Viewport width** - How wide the screen is
- **Device pixel ratio (DPR)** - Retina/HiDPI displays have 2x or 3x DPR
- **sizes attribute** - How much of the viewport the image occupies

**Selection Formula:** `effective_width = viewport_width × (sizes_percentage / 100) × DPR`

*Examples:*
- 375px iPhone (2x DPR) with `sizes="100vw"`: 375 × 1.0 × 2 = 750px → selects 768px variant
- 375px iPhone (2x DPR) with `sizes="50vw"`: 375 × 0.5 × 2 = 375px → selects 480px variant
- 1920px desktop (1x DPR) with `sizes="(min-width: 1280px) 1280px, 100vw"`: 1280px → selects 1440px variant

The `sizes` attribute is critical - it tells the browser what portion of the viewport the image will occupy, directly affecting which variant is selected.

**How it Works:**
1. For each image, Hugo generates variants at the specified widths
2. Only variants smaller than the original image are generated
3. All variants are combined into a `srcset` attribute
4. The browser selects the optimal image based on screen size and DPI

**Example Output:**
```html
<img 
  src="/images/hero-image_hu3851710922404901588.webp" 
  srcset="/images/hero-image_hu5088603857882619867.webp 480w, 
          /images/hero-image_hu6791666635821129554.webp 768w, 
          /images/hero-image_hu2718349167102537924.webp 1024w, 
          /images/hero-image_hu3230465244030238840.webp 1440w, 
          /images/hero-image_hu3851710922404901588.webp 1478w" 
  sizes="(min-width: 800px) 50vw, 100vw"
  alt="Illustration"
  loading="eager"
>
```

**sizes Attribute:**
The `sizes` attribute tells the browser what size the image will be displayed at different viewport widths:

- **Full width images:** `"(min-width: 1280px) 1280px, 100vw"` (default)
- **Two-column layouts:** `"(min-width: 800px) 50vw, 100vw"` (hero, features)
- **Fixed size images:** `"200px"` (logos)

**Custom Responsive Widths:**
You can override the default widths for specific images:
```hugo
{{ partial "components/optimized-image.html" (dict 
    "src" "/images/custom.png" 
    "alt" "Custom" 
    "responsiveWidths" (slice 320 640 960 1280)
) }}
```

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

## Configuration

### Site-wide Image Settings

Configure responsive image defaults in `hugo.toml`:

```toml
[params.images]
  # Default responsive image widths for srcset generation
  responsiveWidths = [480, 768, 1024, 1440]
  
  # Default sizes attribute for responsive images
  defaultSizes = "(min-width: 1280px) 1280px, 100vw"
```

**Why configure these?**
- `responsiveWidths`: Adjust to match your site's actual breakpoints
- `defaultSizes`: Should match your site's max-width container (usually 1280px or 1536px)

**Per-image overrides:**
Both can be overridden on individual images when needed:
```hugo
{{ partial "components/optimized-image.html" (dict 
    "src" "/images/custom.png" 
    "responsiveWidths" (slice 320 640 960 1280)
    "sizes" "(min-width: 600px) 50vw, 100vw"
) }}
```

## Performance Results

### Responsive Image Variants
With responsive images enabled:
- **52 images processed** (up from 17 previously)
- Multiple variants generated automatically per image
- Browser selects optimal variant based on screen size and DPI
- Significant bandwidth savings on mobile devices

### File Size Reduction
| Image | Original (PNG) | Optimized (WebP) | Savings |
|-------|---------------|------------------|---------|
| hero-image.png | 847 KB | 124 KB | 85% |
| happy-parent.png | 156 KB | 30 KB | 81% |
| happy-kid-phone.png | 89 KB | 15 KB | 83% |
| secure-payments.png | 206 KB | 38 KB | 82% |
| woman-desk.png | 202 KB | 39 KB | 81% |

**Additional Savings with Responsive Images:**
- Mobile devices (480px width) typically load 50-70% smaller images
- Tablet devices (768px width) load appropriately sized variants
- Desktop users get full-quality images only when needed

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
- **Performance score** - Should improve with smaller images and responsive variants
- **LCP (Largest Contentful Paint)** - Should improve with optimized hero images
- **CLS (Cumulative Layout Shift)** - Should improve with explicit dimensions
- **Best Practices** - Should show proper image formats

**Testing Responsive Images:**
1. Use Chrome DevTools Network tab
2. Throttle to different network speeds
3. Resize viewport to different widths
4. Verify correct image variant is loaded for each screen size

## Troubleshooting

### Images not processing
- Ensure images are in `assets/images/` not `static/images/`
- Check Hugo build output for processing count
- Verify Hugo extended version is installed

### Responsive variants not generating
- Check that original image is larger than variant widths
- Verify Hugo processes: should show "Processed images: 52" or higher
- Check for errors in build output

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
- Implement art direction with `<picture>` element for different aspect ratios
- Add automatic image compression before webp conversion
- Create image CDN integration for global delivery
