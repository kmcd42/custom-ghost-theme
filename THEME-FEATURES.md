# Warmth at the Edge of Tomorrow
## A Ghost Theme for Kasey McDonnell

*"Curious, compassionate, and focused on making great work that resonates."*
*The well-worn favourite sweater of the future.*

---

## Design Philosophy

This theme is built around the idea of **warmth with intention**. It uses a golden yellow (`#EEC643`) as the primary accent, paired with a cream (`#FFFCF1`) for light mode and deep midnight blues for dark mode. The design is editorial, personal, and climate-conscious—with subtle organic touches that make it feel handmade rather than manufactured.

---

## Color System

### Primary Palette
- **Golden Yellow** `#EEC643` - The signature accent color
- **Cream** `#FFFCF1` - Light mode background
- **Midnight** `#0A0E12` - Dark mode background

### Complementary Accents (for subtle color pops)
- **Coral** `#EE7B5A` - Warm accent glow
- **Rose** `#E88EA4` - Soft pink glow
- **Teal** `#43CDBE` - Cool balance
- **Lavender** `#9B7ED9` - Purple undertones

These colors appear subtly in ambient background glows, creating depth without overwhelming the golden primary.

---

## Typography

- **Display/Headings**: Instrument Serif - elegant, editorial character
- **Body Text (paragraphs)**: Inter - clean, readable sans-serif
- **Monospace**: JetBrains Mono - for code blocks

The theme uses fluid typography with `clamp()` for smooth scaling between breakpoints.

---

## Page Templates

### Homepage (`index.hbs`)
A bento-box layout with:
- Hero section with site description and cover image
- Grid of pathway cards: Portfolio, Writing, About, Photography, Now, Colophon
- Recent Work & Writing section
- Subscribe CTA (if members enabled)

### Custom Templates

| Template | Slug | Description |
|----------|------|-------------|
| `custom-about.hbs` | `/about/` | Personal story with portrait, content, and photography section |
| `custom-blog.hbs` | `/blog/` | Traditional blog index with featured posts |
| `custom-now.hbs` | `/now/` | "Now page" for current focus and activities |
| `custom-colophon.hbs` | `/colophon/` | Technical details about how the site is built |
| `custom-photography-index.hbs` | `/photography/` | Bento-style grid of photography posts |
| `custom-photography.hbs` | Individual photo posts | Full-bleed image with metadata |
| `custom-portfolio-index.hbs` | `/portfolio/` | Portfolio work grid |
| `custom-portfolio.hbs` | Individual portfolio pieces | Standard project layout |
| `custom-portfolio-experimental.hbs` | Portfolio posts | Bold, chaotic hero with floating decorative elements |
| `custom-portfolio-cinematic.hbs` | Portfolio posts | Full-screen immersive hero experience |
| `custom-portfolio-magazine.hbs` | Portfolio posts | Editorial magazine-style layout |

To use a custom template, set it in Ghost Admin under Page/Post Settings > Template.

---

## Interactive Features

### Navigation Drawer
The main navigation uses a **dropdown drawer system** instead of a traditional menu. Click the toggle button to reveal:
- Large serif navigation links with staggered animation
- Photo grid showing recent photography
- Social links and members area

### Theme Toggle (Light/Dark Mode)
- Automatically respects system preference
- Manual toggle in header and footer
- Preference saved to localStorage
- Smooth transition between modes

### Scroll Reveal
Elements with `.reveal-on-scroll` class fade in as they enter the viewport. Use `.reveal-child` on children for staggered animations.

### Magnetic Buttons
Buttons with `.magnetic` class respond to mouse movement with a subtle magnetic pull effect.

### Kinetic Typography
Add `.kinetic-text` class to headings for stamp-style entrance animations.

### Time-Aware Styling
The site adds time-based classes to the `<html>` element:
- `time-dawn` (5am-9am)
- `time-day` (9am-5pm)
- `time-dusk` (5pm-9pm)
- `time-night` (9pm-5am)

Use `.time-greeting` for dynamic greeting text that changes based on time of day.

### Easter Egg
Enter the Konami code (↑↑↓↓←→←→BA) to reveal a hidden message.

---

## Climate Pulse

A unique feature that connects the site to real atmospheric data.

Located in the footer, Climate Pulse displays:
- Current atmospheric CO₂ level (fetched from NOAA)
- The increase since 1990 (birth year reference)

Enable it by adding `has-climate-pulse` to the body class.

The CO₂ data is:
- Fetched from NOAA's Mauna Loa observatory
- Cached for 24 hours
- Falls back to estimated values if fetch fails

As CO₂ rises, the theme subtly shifts warmer—a visual reminder of our changing atmosphere.

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | < 768px | Single column, drawer navigation |
| Tablet | 768px - 1024px | Two column grids |
| Desktop | 1024px - 1400px | Full layouts |
| Large | 1400px - 1800px | Larger hero images, more spacing |
| XL | 1800px+ | Maximum content widths, fullest layouts |

---

## CSS Architecture

### File Structure
```
assets/css/
├── fonts.css      # @font-face declarations
├── vars.css       # CSS custom properties (colors, spacing, typography)
└── screen.css     # All component styles
```

### Key CSS Variables
```css
/* Colors */
--color-primary: #EEC643;
--background-color: var(--color-midnight);
--text-color: #FFFCF1;

/* Typography */
--font-display: 'Instrument Serif';
--font-sans: 'Inter';

/* Spacing (fluid) */
--space-8: clamp(1.5rem, 1.25rem + 1vw, 2rem);
--section-gap: clamp(4rem, 3rem + 8vw, 8rem);

/* Effects */
--shadow-glow: 0 0 50px rgba(238, 198, 67, 0.2);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

---

## JavaScript Features

### `assets/js/lib/playful-interactions.js`
- Image lazy loading with fade-in
- Scroll reveal animations
- Magnetic button effects
- Drawer navigation
- Breadcrumb updates
- Time awareness
- Easter eggs

### `assets/js/lib/theme-toggle.js`
- Light/dark mode switching
- System preference detection
- LocalStorage persistence

### `assets/js/lib/climate-pulse.js`
- NOAA CO₂ data fetching
- 24-hour caching
- Fallback calculations

---

## Ghost Content Tags

Use these tags to organize content:

| Tag | Purpose |
|-----|---------|
| `portfolio` | Work/projects (appears in portfolio index) |
| `photography` | Photos (appears in photography index) |
| Other tags | Blog posts and general content |

---

## Ambient Background Effects

The theme includes subtle animated background effects:

1. **Gradient Sky** - Base linear gradient background
2. **Grain Texture** - Subtle SVG noise overlay (0.015 opacity)
3. **Multi-color Glows** - Radial gradients with complementary colors:
   - Golden from top center
   - Rose/coral from top right
   - Teal from bottom left
   - Lavender from bottom right
   - Coral from left side
4. **Glow Pulse Animation** - Gentle opacity oscillation (8s cycle)

---

## Accessibility

- Respects `prefers-reduced-motion` - animations disabled
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support (Escape closes drawer)
- Sufficient color contrast in both themes
- Focus states on all interactive elements

---

## Performance Optimizations

- Lazy loading on images
- Font preloading via `default.hbs`
- CSS custom properties for efficient theming
- Minimal JavaScript (vanilla, no frameworks)
- Efficient scroll observers (IntersectionObserver)
- CO₂ data cached for 24 hours

---

## Customization

### Changing the Primary Color
Edit `assets/css/vars.css`:
```css
--color-primary: #YOUR_COLOR;
--color-primary-soft: /* lighter version */;
--color-primary-deep: /* darker version */;
--color-primary-glow: rgba(R, G, B, 0.18);
```

### Adding New Templates
1. Create `custom-templatename.hbs`
2. Add template comment at top:
   ```handlebars
   {{!< default}}
   {{!--
   Template Name: Your Template Name
   Description: What this template does
   --}}
   ```
3. Run `yarn zip` to build

### Modifying Animations
Key animation values in `vars.css`:
```css
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--duration-base: 250ms;
--duration-slow: 400ms;
```

---

## Building & Development

```bash
# Install dependencies
yarn install

# Development mode (watches for changes)
yarn dev

# Build for production
yarn build

# Create theme zip for upload
yarn zip
```

---

## Credits

- **Typography**: Instrument Serif, Inter, JetBrains Mono
- **Icons**: Custom SVG
- **CO₂ Data**: NOAA Global Monitoring Laboratory
- **Framework**: Ghost CMS

---

*Built with curiosity and care.*
