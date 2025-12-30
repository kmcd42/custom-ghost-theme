/**
 * Playful Interactions - The Human Touch
 *
 * Little delights. Unexpected moments of joy.
 * Technology as bicycle for the mind, not cage for the soul.
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // IMAGE LOADING - Smooth fade in when images load
    // ═══════════════════════════════════════════════════════════

    function initImageLoading() {
        // Handle lazy loaded images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
            }
        });

        // Also handle dynamically added images
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeName === 'IMG' && node.loading === 'lazy') {
                        if (node.complete) {
                            node.classList.add('loaded');
                        } else {
                            node.addEventListener('load', () => node.classList.add('loaded'));
                        }
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ═══════════════════════════════════════════════════════════
    // KINETIC TYPOGRAPHY - Stamp-style paragraph animation
    // ═══════════════════════════════════════════════════════════

    function initKineticType() {
        // Find elements marked for kinetic treatment
        const kineticElements = document.querySelectorAll('[data-kinetic], .kinetic-text, .home-description, .home-minimal-statement');

        kineticElements.forEach(el => {
            // Skip if already processed
            if (el.dataset.kineticReady) return;
            el.dataset.kineticReady = 'true';

            // Stamp-style animation on the whole element (no word wrapping)
            el.classList.add('kinetic-stamp');
        });
    }

    // ═══════════════════════════════════════════════════════════
    // SCROLL REVEAL - Content that arrives
    // ═══════════════════════════════════════════════════════════

    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');

                    // Stagger children if present
                    const children = entry.target.querySelectorAll('.reveal-child');
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.08}s`;
                        child.classList.add('revealed');
                    });
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.reveal-on-scroll, .portfolio-grid-item, .post-author-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ═══════════════════════════════════════════════════════════
    // MAGNETIC BUTTONS - Playful hover response
    // ═══════════════════════════════════════════════════════════

    function initMagneticElements() {
        const magneticEls = document.querySelectorAll('.magnetic, .home-nav-link, .gh-head-btn');

        magneticEls.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Subtle magnetic pull
                el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    // CUSTOM CURSOR - Your presence on the page
    // ═══════════════════════════════════════════════════════════

    function initCustomCursor() {
        // Only on devices with fine pointers (not touch)
        if (!window.matchMedia('(pointer: fine)').matches) return;

        // Create cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // Smooth cursor follow
        function animateCursor() {
            dotX += (cursorX - dotX) * 0.15;
            dotY += (cursorY - dotY) * 0.15;

            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor states
        document.querySelectorAll('a, button, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });

        document.querySelectorAll('img, .portfolio-grid-image').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-view'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-view'));
        });
    }

    // ═══════════════════════════════════════════════════════════
    // HANDWRITTEN FEEL - Organic imperfection
    // ═══════════════════════════════════════════════════════════

    function initOrganicElements() {
        // Add subtle rotation variance to grid items
        document.querySelectorAll('.portfolio-grid-item').forEach((el, i) => {
            const rotation = (Math.random() - 0.5) * 0.5; // -0.25 to 0.25 degrees
            el.style.setProperty('--organic-rotation', `${rotation}deg`);
        });

        // Add organic underlines to links on hover
        document.querySelectorAll('.organic-underline').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.setProperty('--underline-offset', `${2 + Math.random() * 2}px`);
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    // EASTER EGGS - Moments of delight
    // ═══════════════════════════════════════════════════════════

    function initEasterEggs() {
        // Konami code reveals a message
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    showEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });

        function showEasterEgg() {
            const msg = document.createElement('div');
            msg.className = 'easter-egg-message';
            msg.innerHTML = `
                <p>You found it!</p>
                <p class="easter-egg-sub">Here's to the curious ones. The ones who poke around, who wonder what's behind the curtain. Keep exploring.</p>
            `;
            document.body.appendChild(msg);

            setTimeout(() => msg.classList.add('visible'), 10);
            setTimeout(() => {
                msg.classList.remove('visible');
                setTimeout(() => msg.remove(), 500);
            }, 4000);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // TIME-AWARE GREETING - The site knows when you visit
    // ═══════════════════════════════════════════════════════════

    function initTimeAwareness() {
        const hour = new Date().getHours();
        let timeClass = 'time-day';

        if (hour >= 5 && hour < 9) timeClass = 'time-dawn';
        else if (hour >= 9 && hour < 17) timeClass = 'time-day';
        else if (hour >= 17 && hour < 21) timeClass = 'time-dusk';
        else timeClass = 'time-night';

        document.documentElement.classList.add(timeClass);

        // Optional: Update greeting text
        const greeting = document.querySelector('.time-greeting');
        if (greeting) {
            const greetings = {
                'time-dawn': 'Good morning',
                'time-day': 'Hello',
                'time-dusk': 'Good evening',
                'time-night': 'Hello, night owl'
            };
            greeting.textContent = greetings[timeClass];
        }
    }

    // ═══════════════════════════════════════════════════════════
    // DRAWER NAVIGATION - The pulley system
    // ═══════════════════════════════════════════════════════════

    function initDrawerNavigation() {
        const toggle = document.querySelector('.gh-drawer-toggle');
        const drawer = document.querySelector('.gh-drawer');
        const header = document.querySelector('.gh-head');

        if (!toggle || !drawer) return;

        // Toggle drawer open/close
        toggle.addEventListener('click', () => {
            const isOpen = header.classList.contains('is-drawer-open');

            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        function openDrawer() {
            header.classList.add('is-drawer-open');
            toggle.setAttribute('aria-expanded', 'true');
            drawer.setAttribute('aria-hidden', 'false');

            // Prevent body scroll when drawer is open
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            header.classList.remove('is-drawer-open');
            toggle.setAttribute('aria-expanded', 'false');
            drawer.setAttribute('aria-hidden', 'true');

            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Close drawer when clicking outside
        document.addEventListener('click', (e) => {
            if (header.classList.contains('is-drawer-open')) {
                if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
                    closeDrawer();
                }
            }
        });

        // Close drawer on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && header.classList.contains('is-drawer-open')) {
                closeDrawer();
                toggle.focus();
            }
        });

        // Close drawer when clicking a nav link
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });
    }

    // ═══════════════════════════════════════════════════════════
    // BREADCRUMBS - Dynamic page location
    // ═══════════════════════════════════════════════════════════

    function initBreadcrumbs() {
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        if (!breadcrumbCurrent) return;

        // Determine current page type from body classes
        const body = document.body;
        let pageName = '';

        if (body.classList.contains('home-template')) {
            pageName = ''; // Empty for home
        } else if (body.classList.contains('post-template')) {
            // Get post title - check all possible title classes
            const title = document.querySelector('.post-content-title, .portfolio-title, .split-title, .cinematic-title, .magazine-title, .experimental-title, .photography-title');
            pageName = title ? truncateText(title.textContent, 30) : '';
        } else if (body.classList.contains('page-template')) {
            // Get page title - check all possible page title classes
            const title = document.querySelector('.about-hero-title, .now-title, .colophon-title, .blog-title, .portfolio-index-title, .photo-gallery-title, h1');
            pageName = title ? truncateText(title.textContent, 30) : '';
        } else if (body.classList.contains('tag-template')) {
            const tagName = document.querySelector('.page-head-title, h1');
            pageName = tagName ? truncateText(tagName.textContent, 30) : '';
        } else if (body.classList.contains('author-template')) {
            const authorName = document.querySelector('.page-head-title, h1');
            pageName = authorName ? truncateText(authorName.textContent, 30) : '';
        } else {
            // Fallback: use page title
            const title = document.querySelector('h1');
            if (title) {
                pageName = truncateText(title.textContent, 30);
            }
        }

        breadcrumbCurrent.textContent = pageName;
    }

    function truncateText(text, maxLength) {
        text = text.trim();
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '…';
    }

    // ═══════════════════════════════════════════════════════════
    // INITIALIZE ALL
    // ═══════════════════════════════════════════════════════════

    function init() {
        // Image loading works even with reduced motion
        initImageLoading();

        // Navigation always works
        initDrawerNavigation();
        initBreadcrumbs();

        // Respect reduced motion for animations
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('reduce-motion');
            return;
        }

        initKineticType();
        initScrollReveal();
        initMagneticElements();
        // Custom cursor removed - using native cursor
        initOrganicElements();
        initEasterEggs();
        initTimeAwareness();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
