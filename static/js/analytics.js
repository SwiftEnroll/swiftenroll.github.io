/**
 * SwiftEnroll Analytics Implementation
 * 
 * Handles event tracking for:
 * - Page Views & Classification
 * - Form Submissions (Demo & Contact)
 * - Engagement (Scroll, Time, FAQ)
 * - Click Tracking (CTA, Email, Phone)
 */

(function() {
  'use strict';

  // --- Configuration ---
  const DEBUG = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const ENGAGED_SESSION_TIME = 120000; // 2 minutes
  const ENGAGED_SESSION_PAGES = 3;
  const REPEAT_VISIT_THRESHOLD = 30 * 60 * 1000; // 30 minutes

  // --- Utilities ---
  
  // Safe gtag wrapper
  function trackEvent(eventName, params = {}) {
      if (typeof window.gtag === 'function') {
          window.gtag('event', eventName, params);
          if (DEBUG) console.log(`[Analytics] Fired: ${eventName}`, params);
      } else if (DEBUG) {
          console.log(`[Analytics] Simulation: ${eventName}`, params);
      }
  }

  // Get UTM parameters
  function getUTMParams() {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['source', 'medium', 'campaign', 'term', 'content'].forEach(key => {
          if (params.has(`utm_${key}`)) {
              utm[key] = params.get(`utm_${key}`);
          }
      });
      return utm;
  }

  // Store UTMs in session
  function persistUTMs() {
      const utms = getUTMParams();
      if (Object.keys(utms).length > 0) {
          sessionStorage.setItem('swiftenroll_utm', JSON.stringify(utms));
      }
  }

  // Get stored UTMs for event context
  function getStoredUTMs() {
      try {
          return JSON.parse(sessionStorage.getItem('swiftenroll_utm')) || {};
      } catch (e) {
          if (DEBUG) {
              console.error('[Analytics] Failed to retrieve or parse stored UTM data', e);
          }
          return {};
      }
  }

  // --- Page Classification ---

  function trackPageClassification() {
      const path = window.location.pathname;
      let pageEvent = 'page_other';

      if (path === '/' || path === '/index.html') pageEvent = 'page_home';
      else if (path.startsWith('/pricing')) pageEvent = 'page_pricing';
      else if (path.startsWith('/features')) pageEvent = 'page_features';
      else if (path.startsWith('/company')) pageEvent = 'page_about';
      else if (path.startsWith('/contact')) pageEvent = 'page_contact';
      else if (path.startsWith('/industries')) pageEvent = 'page_industry';

      trackEvent(pageEvent, {
          ...getStoredUTMs(),
          path: path
      });

      // Special tracking for pricing page view as high intent
      if (pageEvent === 'page_pricing') {
          trackEvent('view_pricing_page');
      }
  }

  // --- Session Logic ---

  function trackEngagedSession() {
      // Time based
      setTimeout(() => {
          if (!sessionStorage.getItem('engaged_time_fired')) {
              trackEvent('engaged_session', { method: 'time_2m' });
              sessionStorage.setItem('engaged_time_fired', 'true');
          }
      }, ENGAGED_SESSION_TIME);

      // Page depth based
      let pageCount = parseInt(sessionStorage.getItem('page_count') || '0') + 1;
      sessionStorage.setItem('page_count', pageCount.toString());

      if (pageCount >= ENGAGED_SESSION_PAGES && !sessionStorage.getItem('engaged_depth_fired')) {
          trackEvent('engaged_session', { method: 'depth_3pages' });
          sessionStorage.setItem('engaged_depth_fired', 'true');
      }
  }

  function trackRepeatVisit() {
      const now = Date.now();
      const lastVisit = localStorage.getItem('last_visit');
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      if (lastVisit) {
          const diff = now - parseInt(lastVisit);
          // Track as repeat visit if user returns after 30 minutes but within 30 days
          if (diff < thirtyDays && diff > REPEAT_VISIT_THRESHOLD) {
               if (!sessionStorage.getItem('repeat_visit_fired')) {
                   trackEvent('repeat_visit_30d');
                   sessionStorage.setItem('repeat_visit_fired', 'true');
               }
          }
      }
      
      localStorage.setItem('last_visit', now.toString());
  }

  // --- Interaction Tracking ---

  function setupClickTracking() {
      document.addEventListener('click', (e) => {
          const target = e.target.closest('a, button');
          if (!target) return;

          const href = target.getAttribute('href') || '';
          const analyticsCategory = target.getAttribute('data-analytics-category');
          const analyticsEvent = target.getAttribute('data-analytics-event');

          // Email Click
          if (href.startsWith('mailto:')) {
              // Do not send raw email address (PII) to analytics
              trackEvent('email_click', { method: 'mailto' });
          }

          // Phone Click
          else if (href.startsWith('tel:')) {
              // Do not send raw phone number (PII) to analytics
              trackEvent('phone_click', { method: 'tel' });
          }

          // Explicit Analytics Events (Pricing, FAQ, etc)
          else if (analyticsEvent) {
              trackEvent(analyticsEvent, {
                  category: analyticsCategory,
                  text: target.innerText.trim(),
                  href: href
              });
          }
      });
  }

  // --- Form Tracking ---

  function checkFormSubmission() {
      let submissionTracked = false;

      // 1. Check for URL params indicating success
      const params = new URLSearchParams(window.location.search);
      // Both "true" and "1" are accepted to support legacy/demo forms if needed
      if (params.get('submitted') === 'true' || params.get('submitted') === '1') {
          const path = window.location.pathname;
          
          // Identify form based on path
          if (path.startsWith('/contact')) {
             trackEvent('contact_submit');
             submissionTracked = true;
          } else {
             // If not on contact page, assume it's the demo form (e.g. on industry pages)
             trackEvent('demo_request_submit');
             submissionTracked = true;
          }
      }

      // 2. Watch for DOM changes (Success Messages)
      // This handles cases where form submission is handled via JS or redirects to same page with anchor/class change
      // We skip this if we already detected a submission via URL to prevent double-counting
      if (submissionTracked) return;

      const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
              if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  const target = mutation.target;
                  if (target.classList.contains('hidden')) return; // Ignore if hiding

                  if (target.id === 'contact-form-success') {
                       trackEvent('contact_submit');
                  } else if (target.id === 'demo-inline-success') {
                       trackEvent('demo_request_submit');
                  }
              }
          });
      });

      const contactSuccess = document.getElementById('contact-form-success');
      if (contactSuccess) {
          observer.observe(contactSuccess, { attributes: true });
      }

      const demoSuccess = document.getElementById('demo-inline-success');
      if (demoSuccess) {
          observer.observe(demoSuccess, { attributes: true });
      }
  }

  function setupIntersectionObservers() {
      // Testimonials view tracking
      if ('IntersectionObserver' in window) {
          const testimonialSection = document.querySelector('.testimonials-container') || document.querySelector('.section.testimonials');
          if (testimonialSection) {
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          trackEvent('view_testimonials');
                          observer.disconnect(); // Track once per page load
                      }
                  });
              }, { threshold: 0.5 }); // 50% visible
              observer.observe(testimonialSection);
          }
      }
  }

  // --- Initialization ---

  function init() {
      persistUTMs();
      trackPageClassification();
      trackEngagedSession();
      trackRepeatVisit();
      setupClickTracking();
      checkFormSubmission();
      setupIntersectionObservers();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }

})();
