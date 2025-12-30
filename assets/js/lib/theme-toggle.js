/**
 * Theme Toggle - Light/Dark Mode with System Preference Support
 *
 * Respects system preferences, remembers user choice, and provides
 * a smooth transition between modes.
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';
    const TRANSITION_DURATION = 300;

    /**
     * Get the current theme preference
     * Priority: localStorage > system preference > default (dark)
     */
    function getPreference() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return stored;
        }

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark';
    }

    /**
     * Apply the theme to the document
     */
    function applyTheme(theme) {
        const root = document.documentElement;

        // Add transition class for smooth switching
        root.classList.add('theme-transitioning');

        // Remove both classes first
        root.classList.remove('light-mode', 'dark-mode');

        // Apply the appropriate class
        if (theme === 'light') {
            root.classList.add('light-mode');
        } else {
            root.classList.add('dark-mode');
        }

        // Update any toggle buttons
        updateToggleButtons(theme);

        // Remove transition class after animation
        setTimeout(() => {
            root.classList.remove('theme-transitioning');
        }, TRANSITION_DURATION);

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    /**
     * Toggle between light and dark modes
     */
    function toggleTheme() {
        const current = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';

        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    /**
     * Update all toggle button states and labels
     */
    function updateToggleButtons(theme) {
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            const isLight = theme === 'light';
            btn.setAttribute('aria-pressed', isLight);
            btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');

            // Update icon visibility
            const sunIcon = btn.querySelector('.theme-toggle-sun');
            const moonIcon = btn.querySelector('.theme-toggle-moon');

            if (sunIcon) sunIcon.style.display = isLight ? 'none' : 'block';
            if (moonIcon) moonIcon.style.display = isLight ? 'block' : 'none';
        });
    }

    /**
     * Create a toggle button
     */
    function createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle light/dark mode');

        btn.innerHTML = `
            <svg class="theme-toggle-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg class="theme-toggle-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        `;

        btn.addEventListener('click', toggleTheme);

        return btn;
    }

    /**
     * Initialize theme toggle
     */
    function init() {
        // Apply initial theme immediately (no transition)
        const theme = getPreference();
        document.documentElement.classList.remove('light-mode', 'dark-mode');
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.add('dark-mode');
        }

        // Add toggle button to header actions
        const headerActions = document.querySelector('.gh-head-actions');
        if (headerActions) {
            const toggle = createToggleButton();
            headerActions.insertBefore(toggle, headerActions.firstChild);
        }

        // Also add to footer if desired
        const footerSocial = document.querySelector('.gh-foot-social-links');
        if (footerSocial) {
            const toggle = createToggleButton();
            footerSocial.appendChild(toggle);
        }

        // Update button states
        updateToggleButtons(theme);

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });

        // Expose API
        window.themeToggle = {
            toggle: toggleTheme,
            get current() {
                return document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
            },
            set: (theme) => {
                localStorage.setItem(STORAGE_KEY, theme);
                applyTheme(theme);
            }
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
