# The Index

A dark, editorial custom [Ghost](https://ghost.org) theme for Kasey McDonnell
(kaseymcdonnell.co.nz). Numbered indexes, a pinned preview pane that swaps as
you scan, restrained mono labels, and Instrument Serif doing the talking — on a
midnight background with grain and a single warm light.

Built to the **Ghost Handoff Spec**. The design rule that governs the build:
_no copy is hard-coded in a template if a content editor could conceivably want
to change it._ Every text region maps to a native Ghost source.

## Setup

1. Build the theme (`npm install && npm run zip`) and upload the resulting
   `dist/the-index.zip` in **Ghost Admin → Settings → Design → Change theme →
   Upload theme**. Or upload the whole folder if you develop locally.
2. Upload `routes.yaml` in **Settings → Labs → Routes** (or drop it into your
   Ghost `content/settings/` folder). This wires up the `/work/`, `/writing/`,
   and `/photography/` collections and points `/` at the homepage template.
3. Create the internal tags that drive routing:
   - `#work` — projects / case studies (add a category tag too, e.g. `Advertising`)
   - `#photo` — photographs
   - `#role` — work-history entries for the About page (title = role,
     excerpt = place, the visible tag = date range, e.g. `2023 — Now`)
4. Flag up to five `#work` posts as **Featured** — those fill the homepage index.
5. Create Pages with the slugs `about`, `now`, and `colophon`. The About page
   uses a dedicated layout (`page-about.hbs`); Now and Colophon use `page.hbs`
   and are written entirely in the Koenig editor.
6. Set the editable UI copy in **Settings → Design** (see below).

## Content model

| Content            | Ghost type | Tag(s)                                  |
| ------------------ | ---------- | --------------------------------------- |
| Project / case study | Post     | `#work` + a category tag                |
| Article / essay    | Post       | anything except `#work` / `#photo` / `#role` |
| Photograph         | Post       | `#photo` + a category tag               |
| Work-history role  | Post       | `#role` (no public URL — feeds About)   |
| About / Now / Colophon | Page   | —                                       |

`post.hbs` branches on the post's tags: `#work` → case-study layout,
`#photo` → photo detail, otherwise → centred long-form article.

## Editable theme settings (Settings → Design)

`hero_eyebrow`, `hero_statement` (wrap a phrase in `*asterisks*` to gild it),
`work_heading`, `work_cta`, `footer_line`, `contact_email`, social links,
`accent_color`, `default_theme` (Dark / Light), and the `enable_grain` /
`enable_glow` / `enable_magnetic` effect toggles. Navigation labels come from
**Settings → Navigation** (primary + secondary).

## Development

Requires [Node](https://nodejs.org/) 18+.

```bash
npm install      # install build deps
npm run dev      # build + watch (gulp)
npm test         # gscan theme validation
npm run zip      # package dist/the-index.zip
```

Edit source in `/assets/css/` and `/assets/js/`; gulp compiles them to
`/assets/built/`. Fonts (Instrument Serif · Inter · JetBrains Mono) are loaded
from Google Fonts in `default.hbs`; self-host them in `/assets/fonts/` for
production.

## Copyright & License

Released under the [MIT license](LICENSE). Originally scaffolded from Ghost's
London theme.
