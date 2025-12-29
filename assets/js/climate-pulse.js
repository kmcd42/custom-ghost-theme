/**
 * Climate Pulse - A Living Connection to Our Atmosphere
 *
 * Born at 366ppm. The number rises. The colors warm.
 * Not doom - awareness. Not despair - agency.
 *
 * This is a bicycle for climate consciousness.
 */

(function() {
    'use strict';

    // Kasey's birth CO₂ level - the anchor point
    const BIRTH_PPM = 366;

    // Current approximate CO₂ (updates yearly, or could fetch from API)
    // As of late 2024, we're around 422-425ppm
    // This increases by roughly 2.5ppm per year
    const BASE_PPM_2024 = 422;
    const BASE_YEAR = 2024;

    // Calculate current approximate CO₂
    function getCurrentPPM() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const yearFraction = now.getMonth() / 12;
        const yearsSince2024 = (currentYear - BASE_YEAR) + yearFraction;

        // Roughly 2.5ppm increase per year
        return Math.round(BASE_PPM_2024 + (yearsSince2024 * 2.5));
    }

    // Calculate the warming factor (0 to 1 scale)
    // At 366ppm = 0, at 450ppm = 1 (arbitrary ceiling for visual effect)
    function getWarmingFactor(currentPPM) {
        const ceiling = 450;
        const factor = (currentPPM - BIRTH_PPM) / (ceiling - BIRTH_PPM);
        return Math.min(Math.max(factor, 0), 1);
    }

    // Apply warming to the design
    function applyClimateColors(warmingFactor) {
        const root = document.documentElement;

        // Shift the accent color warmer as CO₂ rises
        // From cool amber (hue 38) toward warm orange-red (hue 20)
        const hue = 38 - (warmingFactor * 18);
        const saturation = 70 + (warmingFactor * 15);
        const lightness = 55 + (warmingFactor * 5);

        // Set climate-aware accent
        root.style.setProperty('--color-climate-accent', `hsl(${hue}, ${saturation}%, ${lightness}%)`);

        // Subtle background warmth
        const bgWarmth = warmingFactor * 0.03;
        root.style.setProperty('--climate-warmth', bgWarmth);

        // Glow intensity increases with warming
        const glowIntensity = 0.06 + (warmingFactor * 0.08);
        root.style.setProperty('--climate-glow-intensity', glowIntensity);
    }

    // Create the climate pulse indicator
    function createClimatePulse() {
        const currentPPM = getCurrentPPM();
        const delta = currentPPM - BIRTH_PPM;
        const warmingFactor = getWarmingFactor(currentPPM);

        // Apply colors
        applyClimateColors(warmingFactor);

        // Create the pulse element if it doesn't exist
        let pulse = document.querySelector('.climate-pulse');
        if (!pulse) {
            pulse = document.createElement('div');
            pulse.className = 'climate-pulse';
            pulse.setAttribute('aria-label', `Current atmospheric CO₂: ${currentPPM}ppm, up ${delta}ppm since 1990`);
            pulse.setAttribute('role', 'status');

            pulse.innerHTML = `
                <div class="climate-pulse-inner">
                    <span class="climate-pulse-current">${currentPPM}</span>
                    <span class="climate-pulse-unit">ppm</span>
                    <span class="climate-pulse-delta">+${delta}</span>
                </div>
                <div class="climate-pulse-label">since I was born</div>
            `;

            // Add to the footer area
            const footer = document.querySelector('.gh-foot-meta');
            if (footer) {
                footer.insertBefore(pulse, footer.firstChild);
            }
        }

        // Store values for other scripts
        window.climatePulse = {
            birthPPM: BIRTH_PPM,
            currentPPM: currentPPM,
            delta: delta,
            warmingFactor: warmingFactor
        };

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('climatepulse:ready', {
            detail: window.climatePulse
        }));
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createClimatePulse);
    } else {
        createClimatePulse();
    }

})();
