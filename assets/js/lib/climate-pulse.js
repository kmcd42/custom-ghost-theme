/**
 * Climate Pulse - A Living Connection to Our Atmosphere
 *
 * Born at 366ppm. The number rises. The colors warm.
 * Not doom - awareness. Not despair - agency.
 *
 * Fetches live CO₂ data from NOAA's Global Monitoring Laboratory
 */

(function() {
    'use strict';

    // Kasey's birth CO₂ level - the anchor point
    const BIRTH_PPM = 366;

    // Cache key and duration (24 hours)
    const CACHE_KEY = 'climate-pulse-ppm';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    // Fallback values if API fails
    const FALLBACK_PPM = 425;

    // Fetch current CO₂ from NOAA's weekly data
    async function fetchCurrentPPM() {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { ppm, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return ppm;
            }
        }

        try {
            // NOAA's weekly CO₂ data from Mauna Loa
            const response = await fetch('https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_weekly_mlo.txt');
            const text = await response.text();

            // Parse the last valid data line
            const lines = text.split('\n').filter(line =>
                line.trim() && !line.startsWith('#') && !line.startsWith(' ')
            );

            if (lines.length > 0) {
                const lastLine = lines[lines.length - 1];
                const parts = lastLine.split(/\s+/).filter(Boolean);
                // Format: year, month, day, decimal, ppm, days, 1yr ago, 10yr ago
                const ppm = parseFloat(parts[4]);

                if (!isNaN(ppm) && ppm > 400) {
                    // Cache the result
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        ppm: Math.round(ppm),
                        timestamp: Date.now()
                    }));
                    return Math.round(ppm);
                }
            }
        } catch (error) {
            console.warn('Climate Pulse: Could not fetch live CO₂ data, using fallback');
        }

        // Fallback calculation if fetch fails
        const now = new Date();
        const yearsSince2024 = (now.getFullYear() - 2024) + (now.getMonth() / 12);
        return Math.round(FALLBACK_PPM + (yearsSince2024 * 2.5));
    }

    // Calculate the warming factor (0 to 1 scale)
    function getWarmingFactor(currentPPM) {
        const ceiling = 450;
        const factor = (currentPPM - BIRTH_PPM) / (ceiling - BIRTH_PPM);
        return Math.min(Math.max(factor, 0), 1);
    }

    // Apply warming to the design
    function applyClimateColors(warmingFactor) {
        const root = document.documentElement;

        // Shift the accent color warmer as CO₂ rises
        const hue = 38 - (warmingFactor * 18);
        const saturation = 70 + (warmingFactor * 15);
        const lightness = 55 + (warmingFactor * 5);

        root.style.setProperty('--color-climate-accent', `hsl(${hue}, ${saturation}%, ${lightness}%)`);
        root.style.setProperty('--climate-warmth', warmingFactor * 0.03);
        root.style.setProperty('--climate-glow-intensity', 0.06 + (warmingFactor * 0.08));
    }

    // Create the climate pulse indicator
    async function createClimatePulse() {
        const currentPPM = await fetchCurrentPPM();
        const delta = currentPPM - BIRTH_PPM;
        const warmingFactor = getWarmingFactor(currentPPM);

        applyClimateColors(warmingFactor);

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

            const footer = document.querySelector('.gh-foot-meta');
            if (footer) {
                footer.insertBefore(pulse, footer.firstChild);
            }
        }

        window.climatePulse = {
            birthPPM: BIRTH_PPM,
            currentPPM: currentPPM,
            delta: delta,
            warmingFactor: warmingFactor
        };

        window.dispatchEvent(new CustomEvent('climatepulse:ready', {
            detail: window.climatePulse
        }));
    }

    function init() {
        if (!document.body.classList.contains('has-climate-pulse')) {
            return;
        }
        createClimatePulse();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
