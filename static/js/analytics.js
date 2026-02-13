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
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            // console.log('Analytics Event:', eventName, eventParams); // Uncomment for debugging
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
                    // Use data-plan-name attribute if available, otherwise try to find h3
                    const planName = this.getAttribute('data-plan-name') || 
                                    this.closest('div')?.querySelector('h3')?.textContent.trim() || 
                                    'Unknown Plan';
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

        // Track form success based on URL parameter (primary method)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('submitted') === 'true') {
            trackEvent('form_submit_success', {
                event_category: 'conversion',
                event_label: 'Contact Form Success',
                form_name: 'contact',
                form_location: window.location.pathname
            });
        } else {
            // Fallback: Also track when success div is shown (for other scenarios)
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

        console.log('SwiftEnroll Analytics: Form tracking initialized');
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

        window.addEventListener('scroll', function() {
            // Throttled scroll handling could be added here for performance if needed
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }

            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !sentMilestones.includes(milestone)) {
                    sentMilestones.push(milestone);
                    trackEvent('scroll_depth', {
                        event_category: 'engagement',
                        event_label: milestone + '% Scroll Depth',
                        percent_scrolled: milestone,
                        page_path: window.location.pathname
                    });
                }
            });
        });
        
        console.log('SwiftEnroll Analytics: Scroll tracking initialized');
    }

    /**
     * Track FAQ Interactions
     */
    function initFAQTracking() {
        if (!ANALYTICS_CONFIG.trackFAQInteractions) {
            return;
        }

        const faqButtons = document.querySelectorAll('.faq-button');
        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Check if we are opening or closing (if the content is currently hidden, we are opening)
                // The class toggle happens in the onclick handler in HTML, which runs *before* this event listener
                // So if 'hidden' is NOT present, it means it is now visible (was just opened)
                const content = this.parentElement.querySelector('.faq-content');
                const isOpening = !content.classList.contains('hidden');
                
                if (isOpening) {
                    const questionText = this.querySelector('span').textContent.trim();
                    trackEvent('faq_interaction', {
                        event_category: 'engagement',
                        event_label: 'FAQ Expanded: ' + questionText,
                        question_text: questionText,
                        interaction_type: 'expand'
                    });
                }
            });
        });
        
        if (faqButtons.length > 0) {
            console.log('SwiftEnroll Analytics: FAQ tracking initialized');
        }
    }

    /**
     * Track External Links, Social Media, Mailto, and Tel
     */
    function initExternalLinkTracking() {
        if (!ANALYTICS_CONFIG.trackExternalLinks) {
            return;
        }

        const links = document.querySelectorAll('a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            // Check for Mailto
            if (href.startsWith('mailto:')) {
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
            if (href.startsWith('tel:')) {
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

            // Check for External Links (including Social Media)
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
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
        });
        
        console.log('SwiftEnroll Analytics: External link tracking initialized');
    }

    /**
     * Initialize analytics tracking when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initCTATracking();
                initFormTracking();
                initScrollTracking();
                initFAQTracking();
                initExternalLinkTracking();
            });
        } else {
            initCTATracking();
            initFormTracking();
            initScrollTracking();
            initFAQTracking();
            initExternalLinkTracking();
        }
    }

    // Start tracking
    init();
})();
