/* The Index — theme interactions
   - Full-screen mobile menu
   - Pinned preview pane image swap on index-row hover
   - Magnetic links (gated by body.has-magnetic)
   - Hero statement *highlight* → gold emphasis
*/
(function () {
    'use strict';

    var doc = document;

    /* ── Mobile menu ─────────────────────────────────────────── */
    function initMenu() {
        var menu = doc.getElementById('mobile-menu');
        var openBtn = doc.querySelector('[data-menu-open]');
        var closeEls = doc.querySelectorAll('[data-menu-close]');
        if (!menu || !openBtn) { return; }

        function open() {
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            openBtn.setAttribute('aria-expanded', 'true');
            doc.body.classList.add('menu-open');
        }
        function close() {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            openBtn.setAttribute('aria-expanded', 'false');
            doc.body.classList.remove('menu-open');
        }
        openBtn.addEventListener('click', open);
        Array.prototype.forEach.call(closeEls, function (el) {
            el.addEventListener('click', close);
        });
        doc.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { close(); }
        });
    }

    /* ── Pinned pane image swap ──────────────────────────────── */
    function initPane() {
        var pane = doc.getElementById('index-pane');
        if (!pane) { return; }
        var rows = doc.querySelectorAll('[data-pane-img]');
        var caption = doc.getElementById('pane-caption');

        // Seed the pane from the first row when nothing is set yet.
        if (rows.length && !pane.style.backgroundImage) {
            var firstImg = rows[0].getAttribute('data-pane-img');
            if (firstImg) { pane.style.backgroundImage = "url('" + firstImg + "')"; }
        }

        Array.prototype.forEach.call(rows, function (row) {
            row.addEventListener('mouseenter', function () {
                var img = row.getAttribute('data-pane-img');
                if (img) { pane.style.backgroundImage = "url('" + img + "')"; }
                if (caption) {
                    var cap = row.getAttribute('data-pane-caption');
                    if (cap !== null) { caption.textContent = cap; }
                }
            });
        });
    }

    /* ── Magnetic links ──────────────────────────────────────── */
    function initMagnetic() {
        if (!doc.body.classList.contains('has-magnetic')) { return; }
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
        if (window.matchMedia && window.matchMedia('(hover: none)').matches) { return; }

        var els = doc.querySelectorAll('[data-magnetic]');
        Array.prototype.forEach.call(els, function (el) {
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                var x = e.clientX - (r.left + r.width / 2);
                var y = e.clientY - (r.top + r.height / 2);
                el.style.transform = 'translate(' + x * 0.3 + 'px,' + y * 0.4 + 'px)';
            });
            el.addEventListener('mouseleave', function () {
                el.style.transform = 'translate(0,0)';
            });
        });
    }

    /* ── Hero *highlight* → gold ─────────────────────────────── */
    function initHighlight() {
        var els = doc.querySelectorAll('[data-highlight]');
        Array.prototype.forEach.call(els, function (el) {
            if (el.innerHTML.indexOf('*') === -1) { return; }
            el.innerHTML = el.innerHTML.replace(/\*([^*]+)\*/g, '<em class="gold">$1</em>');
        });
    }

    function ready(fn) {
        if (doc.readyState !== 'loading') { fn(); }
        else { doc.addEventListener('DOMContentLoaded', fn); }
    }

    ready(function () {
        initMenu();
        initPane();
        initMagnetic();
        initHighlight();
    });
})();
