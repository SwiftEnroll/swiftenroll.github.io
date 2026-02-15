# Analytics Coverage Map

## Overview

This document maps all analytics tracking implemented on the SwiftEnroll marketing website. It identifies what is currently tracked and highlights gaps where tracking could be added to support growth decisions.

**Last Updated:** 2026-02-15  
**Analytics Platform:** Google Analytics 4 (GA4)  
**Tracking ID:** `G-412XPZYPQM`

---

## Current Implementation

### Base Setup

✅ **Google Analytics 4 (GA4)**
- **Location:** `layouts/partials/analytics/google-analytics.html`
- **Configuration:** `hugo.toml` → `[params] googleAnalytics = "G-412XPZYPQM"`
- **Environment:** Production only (`hugo.IsProduction` check)
- **Status:** Active

⚠️ **Google Tag Manager (GTM)**
- **Location:** `layouts/partials/analytics/google-tag-manager.html`
- **Configuration:** `hugo.toml` → `[params.googleTagManager]` (not configured)
- **Status:** Installed but not configured

---

## Page View Tracking

### ✅ Tracked Pages (Automatic via GA4)

All pages below receive automatic pageview tracking when GA4 is loaded:

| Page | URL | Layout Type | Priority | Notes |
|------|-----|-------------|----------|-------|
| **Landing Page** | `/` | `landing` | 🔴 Critical | Main conversion page |
| **Pricing** | `/pricing` | `pricing` | 🔴 Critical | High-value page |
| **Features** | `/features` | `feature` | 🟡 High | Product info |
| **Demo Request** | `/demo/` | `page` | 🔴 Critical | Conversion page |
| **Contact** | `/contact/` | `page` | 🟡 High | Lead generation |
| **About/Company** | `/company/` | `page` | 🟢 Medium | Brand building |
| **Privacy Policy** | `/privacy/` | `page` | 🟢 Low | Legal compliance |
| **404 Error** | `/404.html` | `404` | 🟢 Low | Error tracking |

### ✅ Industry Pages (Automatic Tracking)

All industry-specific landing pages:

| Page | URL | Priority |
|------|-----|----------|
| Summer Camps | `/industries/summer-school-break-camps/` | 🟡 High |
| After-School Programs | `/industries/after-school-enrichment-programs/` | 🟡 High |
| Youth Sports & Fitness | `/industries/youth-sports-fitness/` | 🟡 High |
| Arts & Performance | `/industries/music-art-performance-programs/` | 🟡 High |
| STEM & Academics | `/industries/stem-academic-learning/` | 🟡 High |
| Early Childhood | `/industries/preschool-early-childhood-programs/` | 🟡 High |

---

## Event Tracking

### ❌ NOT Tracked (Gaps)

The following user interactions are **NOT** currently tracked as custom events:

#### Forms
| Form Type | Location | Priority | Business Impact |
|-----------|----------|----------|-----------------|
| Demo Request Form | `/demo/` | 🔴 Critical | Direct conversion metric |
| Contact Form | `/contact/` | 🔴 Critical | Lead generation metric |
| Newsletter Subscribe | Footer (all pages) | 🟡 High | Email list growth |

**Gap Impact:** Cannot measure form conversion rates, abandonment, or field-level errors.

#### Button Clicks & CTAs
| Element | Location | Priority | Business Impact |
|---------|----------|----------|-----------------|
| "Book a Demo" (Header) | All pages | 🔴 Critical | Primary CTA |
| "Book a Demo" (Global CTA) | Most pages | 🔴 Critical | Secondary conversion |
| Industry page CTAs | Industry pages | 🟡 High | Segment-specific interest |
| Pricing card buttons | `/pricing` | 🔴 Critical | Plan selection signal |
| Social media links | Footer | 🟢 Medium | Social engagement |

**Gap Impact:** Cannot attribute button clicks to conversions or A/B test CTA effectiveness.

#### Navigation & Engagement
| Interaction | Priority | Business Impact |
|-------------|----------|-----------------|
| Main menu interactions | 🟢 Medium | Navigation patterns |
| Dropdown menu usage | 🟢 Medium | Feature discovery |
| Scroll depth | 🟡 High | Content engagement |
| Video plays (if added) | 🟡 High | Content effectiveness |
| PDF downloads (if added) | 🟡 High | Resource engagement |

**Gap Impact:** Cannot optimize page structure or content placement.

#### External Links
| Link Type | Priority | Business Impact |
|-----------|----------|-----------------|
| LinkedIn profile | 🟢 Medium | Social proof |
| Twitter/X profile | 🟢 Medium | Social engagement |
| Submit-form.com redirects | 🟢 Low | Technical monitoring |

**Gap Impact:** Cannot measure off-site engagement.

---

## Form Tracking Details

### Current Form Infrastructure

#### Demo Request Form (`layouts/shortcodes/demo-form.html`)
- **Submission Endpoint:** `https://submit-form.com/InyGZDbvs`
- **Fields Collected:** name, email, organization, program_type, num_students, phone, message
- **Anti-spam:** Cloudflare Turnstile + honeypot field
- **Current Tracking:** ❌ None
- **Recommended Events:**
  - `form_start` - User focuses first field
  - `form_submit` - User clicks submit button
  - `form_success` - Submission succeeds
  - `form_error` - Validation or submission fails

#### Contact Form (`layouts/shortcodes/contact-form.html`)
- **Submission Endpoint:** `https://submit-form.com/9cR1q3cWi`
- **Fields Collected:** name, email, organization, message
- **Anti-spam:** Cloudflare Turnstile + honeypot field
- **Current Tracking:** ❌ None
- **Recommended Events:** Same as demo form

#### Newsletter Subscribe (`layouts/partials/components/subscribe-form.html`)
- **Submission Endpoint:** `https://submit-form.com/subscribe`
- **Fields Collected:** email
- **Current Tracking:** ❌ None
- **Recommended Events:**
  - `newsletter_signup_start`
  - `newsletter_signup_submit`
  - `newsletter_signup_success`

---

## Technical Integration Points

### Analytics Partial Inclusion

GA4 tracking is loaded in two layout types:

1. **`layouts/_default/baseof.html`** (Line 61)
   - Used by: Most pages (features, pricing, contact, demo, company, privacy)
   - Loads: `{{ partial "analytics/google-analytics" . }}`

2. **`layouts/_default/landing.html`** (Line 109)
   - Used by: Homepage (`_index.md`)
   - Loads: `{{ partial "analytics/google-analytics" . }}`

### Configuration Source

All analytics configuration lives in `hugo.toml`:

```toml
[params]
  googleAnalytics = "G-412XPZYPQM"  # Active
  # googleTagManager = ""           # Not configured
```

---

## Gap Analysis Summary

### Critical Gaps (Blocking Growth Decisions)

1. **❌ Form Submission Tracking**
   - **Impact:** Cannot measure conversion funnel effectiveness
   - **Recommended Fix:** Add `gtag('event', 'form_submit')` to form handlers
   - **Effort:** Medium (JavaScript required for each form)

2. **❌ CTA Click Tracking**
   - **Impact:** Cannot optimize primary conversion paths
   - **Recommended Fix:** Add `onclick` event tracking to buttons
   - **Effort:** Low (template changes only)

3. **❌ Form Field Engagement**
   - **Impact:** Cannot identify form abandonment points
   - **Recommended Fix:** Add field-level focus/blur tracking
   - **Effort:** High (requires custom form instrumentation)

### High-Value Gaps

4. **❌ Scroll Depth Tracking**
   - **Impact:** Cannot optimize content length or placement
   - **Recommended Fix:** Add scroll event listeners
   - **Effort:** Medium (global JavaScript)

5. **❌ Pricing Tier Interaction**
   - **Impact:** Cannot identify which plans generate most interest
   - **Recommended Fix:** Track clicks on pricing cards
   - **Effort:** Low (template changes)

### Nice-to-Have Gaps

6. **❌ External Link Tracking**
   - **Impact:** Limited visibility into off-site engagement
   - **Effort:** Low (add to footer partials)

7. **❌ Navigation Menu Usage**
   - **Impact:** Cannot optimize information architecture
   - **Effort:** Medium (JavaScript required)

---

## Recommended Implementation Order

### Phase 1: Form Conversion Tracking (Week 1)
**Goal:** Measure critical conversion events

1. Add form submission event tracking
   - Demo request form
   - Contact form
   - Newsletter subscribe
2. Add form start tracking (engagement metric)
3. Test in GA4 DebugView

**Expected Outcome:** Can measure form conversion rates and identify drop-off.

### Phase 2: CTA & Button Tracking (Week 2)
**Goal:** Attribute conversions to specific CTAs

1. Add click tracking to "Book a Demo" buttons (header + global CTA)
2. Add tracking to pricing page CTAs
3. Add tracking to industry page CTAs

**Expected Outcome:** Can A/B test CTA copy and placement.

### Phase 3: Engagement Metrics (Week 3)
**Goal:** Understand content effectiveness

1. Implement scroll depth tracking (25%, 50%, 75%, 100%)
2. Track external link clicks (social media, LinkedIn)
3. Track navigation dropdown usage

**Expected Outcome:** Can optimize page structure and content placement.

### Phase 4: Advanced Tracking (Week 4+)
**Goal:** Granular user behavior insights

1. Field-level form analytics
2. Time-on-section tracking
3. Error tracking (form validation, 404s)
4. Enhanced e-commerce tracking (if applicable)

---

## GA4 Custom Events Reference

### Recommended Event Naming Convention

Follow GA4 best practices:

```javascript
// Form Events
gtag('event', 'form_start', {
  form_name: 'demo_request',
  form_location: '/demo/'
});

gtag('event', 'form_submit', {
  form_name: 'demo_request',
  form_location: '/demo/'
});

gtag('event', 'form_success', {
  form_name: 'demo_request',
  form_location: '/demo/'
});

// Button Clicks
gtag('event', 'cta_click', {
  cta_text: 'Book a Demo',
  cta_location: 'header',
  destination: '/demo/'
});

// Scroll Tracking
gtag('event', 'scroll', {
  percent_scrolled: 75,
  page_location: window.location.pathname
});
```

---

## Monitoring & Maintenance

### How to Verify Tracking

1. **GA4 DebugView**
   - Enable debug mode: Install Google Analytics Debugger Chrome extension
   - Visit pages and trigger events
   - Verify events appear in GA4 DebugView (Admin → DebugView)

2. **GA4 Realtime Report**
   - Navigate to Reports → Realtime
   - Trigger events on site
   - Verify events appear within 60 seconds

3. **Browser DevTools**
   - Open Network tab
   - Filter by "collect" or "gtag"
   - Verify requests sent to google-analytics.com

### Update Cadence

- **Quarterly Review:** Assess if new pages/features need tracking
- **After Major Releases:** Verify all tracking still functions
- **Monthly Check:** Review GA4 data quality and completeness

---

## Additional Resources

- **GA4 Documentation:** https://support.google.com/analytics/answer/9304153
- **Event Tracking Guide:** https://developers.google.com/analytics/devguides/collection/ga4/events
- **Hugo Analytics Setup:** https://gohugo.io/content-management/front-matter/#configure-googleanalytics

---

## Questions or Issues?

If you need to add tracking for new features:

1. Review this document to understand current patterns
2. Add event tracking following GA4 naming conventions
3. Test in DebugView before deploying
4. Update this document with new tracking details

**Document Maintainer:** Update owner when analytics implementation changes.
