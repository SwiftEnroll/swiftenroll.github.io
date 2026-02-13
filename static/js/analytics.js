/**
 * SwiftEnroll Analytics Tracker
 * Lightweight client-side analytics for tracking CTA clicks, form submissions, and user engagement
 */

(function() {
    'use strict';
    
    // Analytics configuration from Hugo params
    const ANALYTICS_CONFIG = window.HUGO_ANALYTICS_CONFIG || {
        enable: false,
        trackCTAClicks: false,
        trackFormSubmissions: false,
        trackScrollDepth: false,
        trackFAQInteractions: false,
        trackExternalLinks: false
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
    function trackEvent(eventName, eventParams, callback) {
        // Sanitize string parameters
        if (eventParams) {
            Object.keys(eventParams).forEach(function(key) {
                if (typeof eventParams[key] === 'string') {
                    // Limit length to 100 characters to prevent issues
                    if (eventParams[key].length > 100) {
                        eventParams[key] = eventParams[key].substring(0, 100) + '...';
                    }
                    // Basic sanitization
                    eventParams[key] = eventParams[key].replace(/[<>]/g, '');
                }
            });
        }

        if (typeof gtag === 'function') {
            const paramsWithCallback = Object.assign({}, eventParams);
            if (callback) {
                let wasCalled = false;
                const safeCallback = function() {
                    if (wasCalled) return;
                    wasCalled = true;
                    callback();
                };
                paramsWithCallback.event_callback = safeCallback;
                // Fallback timeout in case GA fails to load or callback hangs
                setTimeout(safeCallback, 1000);
            }
            gtag('event', eventName, paramsWithCallback);
        } else {
            // Log in development/debug mode (when gtag is missing)
            console.log('Analytics Event (gtag unavailable):', eventName, eventParams);
            if (callback) {
                callback();
            }
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
            button.setAttribute('data-analytics-tracked', 'true');
            button.addEventListener('click', function(e) {
                const ctaText = this.textContent.trim();
                const ctaUrl = this.getAttribute('href');
                trackEvent('cta_click', {
                    event_category: 'engagement',
                    cta_location: 'header',
                    cta_text: ctaText,
                    cta_url: ctaUrl
                });
            });
        });

        // Track global CTA section buttons
        const globalCTAs = document.querySelectorAll('.cta-section a.btn, .cta-section a[class*="btn"]');
        globalCTAs.forEach(function(button) {
            if (button.getAttribute('data-analytics-tracked') === 'true') return;
            button.setAttribute('data-analytics-tracked', 'true');

            button.addEventListener('click', function(e) {
                const ctaText = this.textContent.trim();
                const ctaUrl = this.getAttribute('href');
                trackEvent('cta_click', {
                    event_category: 'engagement',
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
                // Skip if already tracked (e.g. header buttons)
                if (button.getAttribute('data-analytics-tracked') === 'true') {
                    return;
                }
                button.setAttribute('data-analytics-tracked', 'true');

                button.addEventListener('click', function(e) {
                    const ctaText = this.textContent.trim();
                    const ctaUrl = this.getAttribute('href');
                    
                    // Robust plan name detection without optional chaining
                    let planName = 'Unknown Plan';
                    const planNameAttr = this.getAttribute('data-plan-name');
                    if (planNameAttr) {
                        planName = planNameAttr;
                    } else {
                        // Traverse up to the flex container which is a common ancestor for title and button
                        const container = this.closest('.flex-grow');
                        if (container) {
                            const header = container.querySelector('h3');
                            if (header) {
                                planName = header.textContent.trim();
                            }
                        }
                    }

                    trackEvent('cta_click', {
                        event_category: 'engagement',
                        cta_location: 'pricing',
                        cta_text: ctaText,
                        cta_url: ctaUrl,
                        plan_name: planName
                    });
                });
            });
        }
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
                    form_name: 'contact',
                    form_location: window.location.pathname
                });
            });
        }

        // Check for success state
        // Unified logic: Check URL param OR visible success div
        let formSuccessTracked = false;
        
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const submittedParam = urlParams.get('submitted');
        
        if (submittedParam === 'true' || submittedParam === '1') {
            trackEvent('form_submit_success', {
                event_category: 'conversion',
                form_name: 'contact',
                form_location: window.location.pathname
            });
            document.dispatchEvent(new CustomEvent('analytics:form_tracked'));
            formSuccessTracked = true;
        }

        // 2. Check visible success div (if not already tracked via URL)
        if (!formSuccessTracked) {
            const successDiv = document.getElementById('contact-form-success');
            if (successDiv && !successDiv.classList.contains('hidden')) {
                trackEvent('form_submit_success', {
                    event_category: 'conversion',
                    form_name: 'contact',
                    form_location: window.location.pathname
                });
                document.dispatchEvent(new CustomEvent('analytics:form_tracked'));
            }
        }
    }

    /**
     * Track Scroll Depth
     */
    function initScrollTracking() {
        if (!ANALYTICS_CONFIG.trackScrollDepth) {
            return;
        }

        let maxScroll = 0;
        let scrollMilestones = [25, 50, 75, 90];
        let sentMilestones = [];
        let scrollTimeout;

        window.addEventListener('scroll', function() {
            // Throttle scroll events
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                
                // Avoid divide by zero
                const scrollPercent = docHeight <= 0 ? 100 : Math.round((scrollTop / docHeight) * 100);

                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                }

                scrollMilestones.forEach(function(milestone) {
                    if (scrollPercent >= milestone && sentMilestones.indexOf(milestone) === -1) {
                        sentMilestones.push(milestone);
                        trackEvent('scroll_depth', {
                            event_category: 'engagement',
                            percent_scrolled: milestone,
                            page_path: window.location.pathname
                        });
                    }
                });
                
                scrollTimeout = null;
            }, 200); // Check every 200ms
        });
    }

    /**
     * Track FAQ Interactions
     */
    function initFAQTracking() {
        if (!ANALYTICS_CONFIG.trackFAQInteractions) {
            return;
        }

        // Listen for custom event dispatched from main.js
        document.addEventListener('faq:expand', function(e) {
            if (e.detail && e.detail.question) {
                const questionText = e.detail.question;
                trackEvent('faq_interaction', {
                    event_category: 'engagement',
                    question_text: questionText,
                    interaction_type: 'expand'
                });
            }
        });
    }

    /**
     * Track External Links, Social Media, Mailto, and Tel
     */
    function initExternalLinkTracking() {
        if (!ANALYTICS_CONFIG.trackExternalLinks) {
            return;
        }

        // Use event delegation for better performance
        document.body.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href) return;

            // Check for Mailto
            if (href.indexOf('mailto:') === 0) {
                trackEvent('contact_click', {
                    event_category: 'engagement',
                    contact_type: 'email'
                    // Redacted PII: contact_destination
                });
                return;
            }

            // Check for Tel
            if (href.indexOf('tel:') === 0) {
                trackEvent('contact_click', {
                    event_category: 'engagement',
                    contact_type: 'phone'
                    // Redacted PII: contact_destination
                });
                return;
            }

            // Check for External Links
            // Use URL object for more robust domain checking
            try {
                // Only process absolute URLs that are http/https
                if (href.indexOf('http') === 0) {
                    const currentOrigin = window.location.origin;
                    let linkOrigin;
                    let linkUrlObj;
                    
                    try {
                        linkUrlObj = new URL(href);
                        linkOrigin = linkUrlObj.origin;
                    } catch (e) {
                        // Invalid URL, skip
                        return;
                    }

                    if (linkOrigin !== currentOrigin) {
                        // It is external
                        
                        const socialDomains = {
                            'facebook.com': 'Facebook',
                            'twitter.com': 'Twitter',
                            'x.com': 'Twitter',
                            'instagram.com': 'Instagram',
                            'linkedin.com': 'LinkedIn',
                            'youtube.com': 'YouTube',
                            'github.com': 'GitHub',
                            'discord.com': 'Discord',
                            'slack.com': 'Slack',
                            'medium.com': 'Medium',
                            'dribbble.com': 'Dribbble',
                            'behance.net': 'Behance',
                            't.me': 'Telegram'
                        };
                        
                        let socialNetworkName = null;
                        const linkHostname = linkUrlObj.hostname.toLowerCase();

                        for (const domain in socialDomains) {
                            if (linkHostname === domain || linkHostname.endsWith('.' + domain)) {
                                socialNetworkName = socialDomains[domain];
                                break;
                            }
                        }

                        if (socialNetworkName) {
                            trackEvent('social_click', {
                                event_category: 'engagement',
                                social_network: socialNetworkName,
                                destination_url: linkOrigin // Only send origin to avoid deep PII in URLs if any
                            });
                        } else {
                            // Generic external link
                            // Sanitize URL: only send origin + pathname, remove search params
                            const sanitizedUrl = linkOrigin + linkUrlObj.pathname;
                            
                            trackEvent('outbound_click', {
                                event_category: 'engagement',
                                destination_url: sanitizedUrl
                            });
                        }
                    }
                }
            } catch (e) {
                console.error('Error processing link for analytics:', e);
            }
        });
    }

    /**
     * Initialize analytics tracking when DOM is ready
     */
    function init() {
        initCTATracking();
        initFormTracking();
        initScrollTracking();
        initFAQTracking();
        initExternalLinkTracking();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
