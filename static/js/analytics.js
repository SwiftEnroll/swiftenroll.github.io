/**
 * SwiftEnroll Analytics Tracker
 * Lightweight client-side analytics for tracking CTA clicks and form submissions
 */

(function() {
    'use strict';
    
    // Analytics configuration from Hugo params
    const ANALYTICS_CONFIG = window.HUGO_ANALYTICS_CONFIG || {
        enable: false,
        trackCTAClicks: false,
        trackFormSubmissions: false
    };

    // Check if analytics is enabled
    if (!ANALYTICS_CONFIG.enable) {
        console.log('SwiftEnroll Analytics: Tracking disabled via config');
        return;
    }

    /**
     * Send event to Google Analytics (GA4)
     * Falls back gracefully if gtag is not available
     */
    function trackEvent(eventName, eventParams) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            console.log('Analytics Event:', eventName, eventParams);
        } else {
            console.log('Analytics Event (gtag unavailable):', eventName, eventParams);
        }
    }

    /**
     * Track CTA button clicks
     */
    function initCTATracking() {
        if (!ANALYTICS_CONFIG.trackCTAClicks) {
            return;
        }

        // Track header CTA buttons
        const headerCTAs = document.querySelectorAll('header a[href*="/contact"], header a.btn-primary, header .btn-primary');
        headerCTAs.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const ctaText = this.textContent.trim();
                const ctaUrl = this.getAttribute('href');
                trackEvent('cta_click', {
                    event_category: 'engagement',
                    event_label: 'Header CTA: ' + ctaText,
                    cta_location: 'header',
                    cta_text: ctaText,
                    cta_url: ctaUrl
                });
            });
        });

        // Track global CTA section buttons
        const globalCTAs = document.querySelectorAll('.cta-section a.btn, .cta-section a[class*="btn"]');
        globalCTAs.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const ctaText = this.textContent.trim();
                const ctaUrl = this.getAttribute('href');
                trackEvent('cta_click', {
                    event_category: 'engagement',
                    event_label: 'Global CTA: ' + ctaText,
                    cta_location: 'global_cta',
                    cta_text: ctaText,
                    cta_url: ctaUrl
                });
            });
        });

        // Track pricing page CTAs (any link to /contact on the pricing page)
        if (window.location.pathname.includes('/pricing')) {
            const pricingCTAs = document.querySelectorAll('a[href*="/contact"]');
            pricingCTAs.forEach(function(button) {
                // Skip header buttons (already tracked)
                if (button.closest('header')) {
                    return;
                }
                button.addEventListener('click', function(e) {
                    const ctaText = this.textContent.trim();
                    const ctaUrl = this.getAttribute('href');
                    const planName = this.closest('div')?.querySelector('h3')?.textContent.trim() || 'Unknown Plan';
                    trackEvent('cta_click', {
                        event_category: 'engagement',
                        event_label: 'Pricing CTA: ' + ctaText,
                        cta_location: 'pricing',
                        cta_text: ctaText,
                        cta_url: ctaUrl,
                        plan_name: planName
                    });
                });
            });
        }

        console.log('SwiftEnroll Analytics: CTA tracking initialized');
    }

    /**
     * Track form submissions
     */
    function initFormTracking() {
        if (!ANALYTICS_CONFIG.trackFormSubmissions) {
            return;
        }

        // Track contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                trackEvent('form_submit', {
                    event_category: 'conversion',
                    event_label: 'Contact Form Submit',
                    form_name: 'contact',
                    form_location: window.location.pathname
                });
            });
        }

        // Track form success based on URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('submitted') === 'true') {
            trackEvent('form_submit_success', {
                event_category: 'conversion',
                event_label: 'Contact Form Success',
                form_name: 'contact',
                form_location: window.location.pathname
            });
        }

        // Also track when success div is shown (for other forms or delayed display)
        const successDiv = document.getElementById('contact-form-success');
        if (successDiv && !successDiv.classList.contains('hidden')) {
            trackEvent('form_submit_success', {
                event_category: 'conversion',
                event_label: 'Contact Form Success',
                form_name: 'contact',
                form_location: window.location.pathname
            });
        }

        console.log('SwiftEnroll Analytics: Form tracking initialized');
    }

    /**
     * Initialize analytics tracking when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initCTATracking();
                initFormTracking();
            });
        } else {
            initCTATracking();
            initFormTracking();
        }
    }

    // Start tracking
    init();
})();
