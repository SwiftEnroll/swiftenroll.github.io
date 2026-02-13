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
    function trackEvent(eventName, eventParams) {
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
            gtag('event', eventName, eventParams);
        } else {
            // Only log in development or if explicitly debugged
            // We can infer development if localhost or if we add a debug flag
            // For now, we'll reduce noise by commenting out the log unless needed
            // console.log('Analytics Event (gtag unavailable):', eventName, eventParams);
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
            if (button.getAttribute('data-analytics-tracked') === 'true') return;
            button.setAttribute('data-analytics-tracked', 'true');

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
                        const container = this.closest('div');
                        if (container) {
                            const header = container.querySelector('h3');
                            if (header) {
                                planName = header.textContent.trim();
                            }
                        }
                    }

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

        // Check for success state
        // Unified logic: Check URL param OR visible success div
        let formSuccessTracked = false;
        
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const submittedParam = urlParams.get('submitted');
        
        if (submittedParam === 'true' || submittedParam === '1') {
            trackEvent('form_submit_success', {
                event_category: 'conversion',
                event_label: 'Contact Form Success',
                form_name: 'contact',
                form_location: window.location.pathname
            });
            formSuccessTracked = true;
        }

        // 2. Check visible success div (if not already tracked via URL)
        if (!formSuccessTracked) {
            const successDiv = document.getElementById('contact-form-success');
            if (successDiv && !successDiv.classList.contains('hidden')) {
                trackEvent('form_submit_success', {
                    event_category: 'conversion',
                    event_label: 'Contact Form Success',
                    form_name: 'contact',
                    form_location: window.location.pathname
                });
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
                const scrollPercent = Math.round((scrollTop / docHeight) * 100);

                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                }

                scrollMilestones.forEach(function(milestone) {
                    if (scrollPercent >= milestone && sentMilestones.indexOf(milestone) === -1) {
                        sentMilestones.push(milestone);
                        trackEvent('scroll_depth', {
                            event_category: 'engagement',
                            event_label: milestone + '% Scroll Depth',
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

        const faqButtons = document.querySelectorAll('.faq-button');
        faqButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // If the element has 'hidden' class REMOVED by the inline onclick handler,
                // it means it is now visible.
                // However, to be safe against race conditions, we can check the parent.
                // The safest way without assuming timing is to check a short time after.
                // Or, since we want to know if user INTENDED to open, we can assume the click
                // on a closed item opens it.
                // BUT, the inline script toggles it.
                
                // Let's rely on the fact that standard DOM events usually fire after inline handlers.
                const content = this.parentElement.querySelector('.faq-content');
                if (!content) return;
                
                // If content is NOT hidden, it means it is OPEN.
                const isOpen = !content.classList.contains('hidden');
                
                if (isOpen) {
                    const span = this.querySelector('span');
                    const questionText = span ? span.textContent.trim() : 'Unknown Question';
                    trackEvent('faq_interaction', {
                        event_category: 'engagement',
                        event_label: 'FAQ Expanded: ' + questionText,
                        question_text: questionText,
                        interaction_type: 'expand'
                    });
                }
            });
        });
    }

    /**
     * Track External Links, Social Media, Mailto, and Tel
     */
    function initExternalLinkTracking() {
        if (!ANALYTICS_CONFIG.trackExternalLinks) {
            return;
        }

        const links = document.querySelectorAll('a');
        
        links.forEach(function(link) {
            const href = link.getAttribute('href');
            if (!href) return;

            // Check for Mailto
            if (href.indexOf('mailto:') === 0) {
                link.addEventListener('click', function() {
                    trackEvent('contact_click', {
                        event_category: 'engagement',
                        event_label: 'Email Click: ' + href.replace('mailto:', ''),
                        contact_type: 'email',
                        contact_destination: href.replace('mailto:', '')
                    });
                });
                return;
            }

            // Check for Tel
            if (href.indexOf('tel:') === 0) {
                link.addEventListener('click', function() {
                    trackEvent('contact_click', {
                        event_category: 'engagement',
                        event_label: 'Phone Click: ' + href.replace('tel:', ''),
                        contact_type: 'phone',
                        contact_destination: href.replace('tel:', '')
                    });
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
                    
                    try {
                        linkOrigin = new URL(href).origin;
                    } catch (e) {
                        // Invalid URL, skip
                        return;
                    }

                    if (linkOrigin !== currentOrigin) {
                        // It is external
                        
                        // Check if it's a known social media link
                        const isSocial = /facebook|twitter|instagram|linkedin|youtube|github|discord|slack|medium|dribbble|behance|telegram/i.test(href);
                        
                        if (isSocial) {
                            link.addEventListener('click', function() {
                                // Extract network name roughly
                                let network = 'social';
                                if (href.includes('facebook')) network = 'Facebook';
                                else if (href.includes('twitter') || href.includes('x.com')) network = 'Twitter';
                                else if (href.includes('instagram')) network = 'Instagram';
                                else if (href.includes('linkedin')) network = 'LinkedIn';
                                else if (href.includes('youtube')) network = 'YouTube';
                                else if (href.includes('github')) network = 'GitHub';
                                
                                trackEvent('social_click', {
                                    event_category: 'engagement',
                                    event_label: 'Social Click: ' + network,
                                    social_network: network,
                                    destination_url: href
                                });
                            });
                        } else {
                            // Generic external link
                            link.addEventListener('click', function() {
                                trackEvent('outbound_click', {
                                    event_category: 'engagement',
                                    event_label: 'Outbound Link: ' + href,
                                    destination_url: href
                                });
                            });
                        }
                    }
                }
            } catch (e) {
                // Fallback or ignore
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
