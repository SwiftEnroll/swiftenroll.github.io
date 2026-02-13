document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.faq-content');
            const icon = this.querySelector('svg');

            // Determine if opening (hidden class is about to be removed)
            const isOpening = content && content.classList.contains('hidden');

            if (content) {
                content.classList.toggle('hidden');
            }
            if (icon) {
                icon.classList.toggle('rotate-180');
            }

            // Dispatch event for analytics if opening
            if (isOpening) {
                const span = this.querySelector('span');
                const questionText = span ? span.textContent.trim() : 'Unknown Question';
                
                document.dispatchEvent(new CustomEvent('faq:expand', { 
                    detail: { question: questionText } 
                }));
            }
        });
    });

    // Contact Form Success Handling & URL Cleanup
    (function() {
        const urlParams = new URLSearchParams(window.location.search);
        const submitted = urlParams.get('submitted');

        if (submitted === 'true' || submitted === '1') {
            const form = document.getElementById('contact-form');
            const successDiv = document.getElementById('contact-form-success');
            
            // Show success message
            if (form && successDiv) {
                form.style.display = 'none';
                successDiv.classList.remove('hidden');
            }

            // Clean up URL (remove ?submitted=true)
            // This runs after analytics.js (if enabled) has had a chance to read the param
            // because main.js is loaded after analytics.js and both use DOMContentLoaded.
            // Using setTimeout to ensure other scripts have time to process the parameter first.
            setTimeout(() => {
                const url = new URL(window.location.href);
                url.searchParams.delete('submitted');
                window.history.replaceState({}, document.title, url.toString());
            }, 100);
        }
    })();
});
