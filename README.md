# Dream Golden NGO — Landing Page

Landing page for **Belyamaharajpur Dream Golden Memories Club (DGMC)**, built with
Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui and Framer Motion.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint
```

## Swapping in your own assets

Everything visual is a placeholder you can replace without touching layout code.

### Logo

The brand mark is derived from `public/new-images/ngo-logo.jpeg` (the original
1440×1440 artwork). That file is a JPEG with a solid blue field and wide empty
margins, so it was cropped to the emblem circle and given transparent corners:

| File | Size | Used for |
| --- | --- | --- |
| `public/logo.png` | 512×512 | Open Graph / social previews |
| `public/logo-256.png` | 256×256 | spare, high-DPI use |
| `public/logo-192.png` | 192×192 | header + footer mark, Apple touch icon |
| `public/logo-96.png` | 96×96 | favicon |
| `src/app/icon.png` | 180×180 | Next.js auto-favicon route |

To regenerate after changing the source art, re-crop to the emblem circle and
export the same five sizes. The mark renders at 48×48 in
`src/components/logo.tsx` — change it there if you want it larger.

## Photo sizes

Every photo slot uses `object-cover`, so the image is cropped to fill the box —
keep your subject near the centre. These are the **rendered CSS sizes measured
in the browser**; supply roughly 2× for retina.

### Hero — `public/images/hero-main.svg`

| Viewport | Rendered box | Aspect |
| --- | --- | --- |
| Desktop 1440 | 490 × 612 | 4:5 |
| Laptop 1280 | 483 × 604 | 4:5 |
| Tablet 640–1024 | square | 1:1 |
| Mobile 390 | 358 × 448 | 4:5 |

**Supply 1200 × 1500 px (4:5), ~200–300 KB JPEG.**
Note the box becomes square between 640px and 1024px, so the top and bottom of a
4:5 photo get cropped there — keep faces out of the outer edges.

### What We Do (pillars) — `public/images/pillar-*.svg`

The image column stretches to match the text beside it, so the box height varies
per card.

| Viewport | Rendered box | Aspect |
| --- | --- | --- |
| Desktop 1440 | 607 × 359–417 | 1.45:1 – 1.70:1 |
| Laptop 1280 | 600 × 359–417 | 1.44:1 – 1.67:1 |
| Mobile 390 | 356 × 223 | 16:10 |

**Supply 1200 × 750 px (16:10), ~150–250 KB JPEG each** — one per pillar:
`pillar-education`, `pillar-health`, `pillar-food`, `pillar-animals`.

### Other slots

| File | Rendered | Supply |
| --- | --- | --- |
| `cta-band.svg` | 1425 × 471, full-bleed behind the contact section | 1920 × 800 (heavily overlaid, detail is not critical) |
| `hero-side-1/2.svg` | 80–96 px squares (currently commented out in `hero.tsx`) | 300 × 300 (1:1) |
| `gallery-1…4.svg` | 4:5 portraits (Gallery section not currently rendered) | 800 × 1000 (4:5) |

Swapping `.svg` for `.jpg`/`.png` is fine — update the extension in
`src/lib/site.ts` (and `hero.tsx` for the hero image).

## Editing copy

All text, stats, bank details and contact info live in **`src/lib/site.ts`**.
Nothing in the JSX hardcodes content, so wording changes never require touching
components.

## Notes on the code

- **Above-the-fold motion is CSS, not JS.** The header and hero animate via the
  `rise-in` / `fade-in` / `zoom-in` classes in `globals.css`, so they paint with
  the first frame of HTML rather than waiting on hydration. Framer Motion drives
  the scroll reveals further down, where hydration has long finished. A
  `<noscript>` rule in `layout.tsx` un-hides those if JS is off entirely.
- **Brand palette** is defined as Tailwind theme tokens in `globals.css`
  (`forest-*`, `gold-*`, `cream-*`).
- **shadcn/ui here is built on Base UI**, so polymorphic components use
  `render={<a href="…" />}` rather than the older `asChild` prop.
- All animations respect `prefers-reduced-motion`.

## Structure

```
src/
├─ app/            layout (fonts, metadata), page, globals.css
├─ components/     one file per page section, plus ui/ (shadcn)
│  ├─ motion-primitives.tsx   Reveal / Stagger / CountUp / ProgressBar
│  └─ icons.tsx              inline SVG icon set
└─ lib/site.ts     ← all page content
```
