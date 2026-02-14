# Analytics Documentation

This site uses a lightweight, privacy-aware analytics implementation built on top of Google Analytics 4 (GA4).

## Enabling Analytics

Analytics are **disabled by default** to prevent tracking during local development.

To enable analytics in production:
1. Ensure your `hugo.toml` has a valid `googleAnalytics` ID.
2. Set `enableAnalytics = true` in `hugo.toml` (or override via environment variable `HUGO_PARAMS_ENABLEANALYTICS=true`).
3. Ensure the environment is production (Hugo sets this automatically when building with `hugo` command, but not `hugo server` unless `--environment production` is used).

## Tracked Events

The following events are automatically tracked by `static/js/analytics.js`.

### Primary Conversions

| Event Name | Trigger | GA4 Conversion? |
| :--- | :--- | :--- |
| `demo_request_submit` | Successful submission of the inline demo request form. | Yes |
| `contact_submit` | Successful submission of the contact form (on `/contact/`). | Yes |
| `cta_primary_click` | Click on primary CTA buttons (e.g. "Get Started"). | Yes |
| `cta_secondary_click` | Click on secondary CTA buttons (e.g. "Learn More"). | No |
| `pricing_request` | Clicks on specific pricing page CTAs. | Yes |
| `email_click` | Click on any `mailto:` link (PII masked). | Yes |
| `phone_click` | Click on any `tel:` link (PII masked). | Yes |

### High-Intent Micro-Events

| Event Name | Trigger | Description |
| :--- | :--- | :--- |
| `view_pricing_page` | Page Load | User visits `/pricing/`. |
| `view_testimonials` | Scroll | Testimonials section comes into view (50% visibility). |
| `faq_expand` | Click | User expands an FAQ accordion item. |
| `engaged_session` | Time / Depth | Session > 2 minutes OR > 3 pages viewed. |
| `repeat_visit_30d` | Page Load | User returns within 30 days of previous visit. |

### Page Classification

Events fired on page load to simplify reporting:

- `page_home`
- `page_pricing`
- `page_features`
- `page_about`
- `page_contact`
- `page_industry`

## Testing

To test analytics locally:

1.  Enable analytics in `hugo.toml`:
    ```toml
    [params]
      enableAnalytics = true
    ```
2.  Run Hugo in production mode (to bypass `hugo.IsProduction` check):
    ```bash
    hugo server --environment production
    ```
3.  Open the browser console.
4.  Verify that `[Analytics] Fired: ...` logs appear when interacting with tracked elements.
    *   *Note: If GA4 is blocked by ad-blockers, the script gracefully degrades to console logging in debug mode (localhost).*

## Implementation Details

-   **Script**: `static/js/analytics.js`
-   **Loading**: Deferred loading in `layouts/_default/baseof.html`.
-   **Attributes**: `data-analytics-category` and `data-analytics-event` are used on HTML elements to drive click tracking.
