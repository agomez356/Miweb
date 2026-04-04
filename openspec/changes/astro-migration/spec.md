# Spec: FísicaFans — Migración a Astro (MVP Fases 1–5)

**Change:** astro-migration  
**Project:** Miweb (FísicaFans)  
**Source:** proposal.md v1.0  
**Date:** 2026-04-04  
**Status:** Draft

---

## Conventions

- All requirement IDs follow the pattern `REQ-{phase}-{nn}`.
- Acceptance criteria are binary: **PASS** or **FAIL**.
- "Internal link" means any `<a href>`, `<Link>`, or Astro `href` that navigates within the site.
- "Build" means `pnpm build` completing with exit code 0.
- "Dev server" means `pnpm dev` running without errors on `localhost:4321`.

---

## Phase 1 — Scaffold & Foundation

### Requirements

**REQ-1-01:** The project MUST be initialized as an Astro 4.x project using `pnpm create astro@latest` with TypeScript strict mode enabled from setup.

**REQ-1-02:** `package.json` MUST declare the following runtime integrations at the specified major versions:
- `astro` `^4.x`
- `@astrojs/vue` `^4.x`
- `@astrojs/tailwind` `^5.x`
- `@astrojs/mdx` `^3.x`
- `@astrojs/sitemap` `^3.x`
- `vue` `^3.x`
- `tailwindcss` `^3.x`
- `remark-math` `^5.x`
- `rehype-katex` `^7.x`
- `katex` `^0.16.x`
- `zod` `^3.x`

**REQ-1-03:** `package.json` MUST declare `sharp ^0.33.x` and `@types/node ^20.x` as dev dependencies.

**REQ-1-04:** `tsconfig.json` MUST extend `astro/tsconfigs/strict` and include `"strict": true`. No `any` type is permitted in source files — use `unknown` instead.

**REQ-1-05:** `astro.config.mjs` MUST configure:
- `site: 'https://agomez356.github.io'`
- `base: '/Miweb'`
- `output: 'static'`
- integrations: `vue()`, `tailwind()`, `mdx()`, `sitemap()`
- MDX remarkPlugins: `[remarkMath]`
- MDX rehypePlugins: `[rehypeKatex]`

**REQ-1-06:** The file `Imagenes/3DXRAXN2INEAFCWH7AXAF4WHNI.jpg` (698 KB) MUST be converted to `public/images/galaxy-network.webp` with a file size strictly less than 150 KB, at a minimum resolution of 1200×600 px.

**REQ-1-07:** The original static files (`index.html`, `stylesheet.css`, `Imagenes/`) MUST be moved to `old_version/` before any Astro source files are created. The `old_version/` directory MUST NOT be processed by Astro build.

**REQ-1-08:** A git branch named `feature/astro-migration` MUST exist and be the working branch for all MVP changes.

**REQ-1-09:** KaTeX pipeline validation: an MDX file at `src/content/blog/_test-katex.mdx` MUST render both an inline equation (`$E=mc^2$`) and a block equation (`$$\Delta S \geq 0$$`) without build errors. This file MUST have `draft: true` in frontmatter and MUST NOT appear in the blog listing.

**REQ-1-10:** The dev server MUST start without errors or warnings after Phase 1 setup.

### Scenarios

**S-1-A: KaTeX inline equation renders**
- Given a `.mdx` file containing `$E=mc^2$`
- When the dev server renders the page
- Then the HTML output contains a `<span class="katex">` element with the rendered equation
- And no JavaScript errors appear in the browser console

**S-1-B: KaTeX block equation renders**
- Given a `.mdx` file containing `$$\Delta S \geq 0$$`
- When the dev server renders the page
- Then the HTML output contains a `<span class="katex-display">` element
- And the equation is visible and properly styled

**S-1-C: Galaxy image weight constraint**
- Given the file `public/images/galaxy-network.webp`
- When its file size is measured
- Then it is less than 150 KB
- And its dimensions are at least 1200×600 px

**S-1-D: Build with base path**
- Given `astro.config.mjs` with `base: '/Miweb'`
- When `pnpm build` runs
- Then `dist/` contains an `index.html` at `dist/Miweb/index.html`
- And all asset paths in that file start with `/Miweb/`

### Acceptance Criteria

| ID | Criterion | Result |
|----|-----------|--------|
| AC-1-01 | `pnpm dev` starts without errors | PASS/FAIL |
| AC-1-02 | `pnpm build` exits with code 0 | PASS/FAIL |
| AC-1-03 | `public/images/galaxy-network.webp` exists and is < 150 KB | PASS/FAIL |
| AC-1-04 | `tsconfig.json` has `"strict": true` | PASS/FAIL |
| AC-1-05 | `astro.config.mjs` has `site`, `base: '/Miweb'`, `output: 'static'` | PASS/FAIL |
| AC-1-06 | `remark-math` and `rehype-katex` are in MDX plugin arrays | PASS/FAIL |
| AC-1-07 | Inline `$E=mc^2$` renders `<span class="katex">` in browser | PASS/FAIL |
| AC-1-08 | Block `$$\Delta S \geq 0$$` renders `<span class="katex-display">` | PASS/FAIL |
| AC-1-09 | `old_version/` contains `index.html`, `stylesheet.css`, and `Imagenes/` | PASS/FAIL |
| AC-1-10 | Branch `feature/astro-migration` exists in git | PASS/FAIL |
| AC-1-11 | No `any` type in any `.ts` or `.astro` source file | PASS/FAIL |

---

## Phase 2 — Design System & Layout

### Requirements

**REQ-2-01:** `tailwind.config.cjs` MUST extend the default theme with the following color tokens under `theme.extend.colors`:

| Token | Value |
|-------|-------|
| `primary` | `#667eea` |
| `primary-light` | `#b9c3ff` |
| `secondary` | `#ec4899` |
| `secondary-light` | `#ffb0cd` |
| `tertiary` | `#fbbf24` |
| `star` | `#fbbf24` |
| `background` | `#0d112a` |
| `success` | `#10b981` |

**REQ-2-02:** `tailwind.config.cjs` MUST configure `content` to scan `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`.

**REQ-2-03:** `tailwind.config.cjs` MUST set `darkMode: 'class'` — the design is dark-only; the `dark` class is always applied on `<html>`.

**REQ-2-04:** `src/styles/global.css` MUST define a `.glass` utility class with:
- `background`: semi-transparent primary-tinted value (e.g., `rgba(102, 126, 234, 0.05)`)
- `backdrop-filter: blur(16px)` (and `-webkit-backdrop-filter`)
- `border`: 1px solid with primary-tinted rgba (e.g., `rgba(102, 126, 234, 0.2)`)
- `box-shadow`: tinted with primary, not black (e.g., `0 8px 32px rgba(102, 126, 234, 0.1)`)
- NO `@apply` — plain CSS only

**REQ-2-05:** `global.css` MUST set `background-color: #0d112a` on `body` and `html` globally.

**REQ-2-06:** `global.css` MUST NOT use `@apply` anywhere.

**REQ-2-07:** `src/layouts/BaseLayout.astro` MUST:
- Import `katex/dist/katex.min.css` in `<head>`
- Import `../styles/global.css`
- Include `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Load Space Grotesk and Manrope from Google Fonts via `<link rel="preconnect">` + `<link>` tags with `font-display: swap`
- Accept a `title` prop of type `string` and set it as `<title>{title} — FísicaFans</title>`
- Apply `class="dark"` on `<html>` — dark mode is always active
- Render `<Header />` and `<Footer />` wrapping a `<slot />`

**REQ-2-08:** `src/components/layout/Header.vue` MUST:
- Use the `.glass` utility class for its background
- Be `position: sticky; top: 0` with a `z-index` sufficient to stay above page content
- Contain a link to Home (`import.meta.env.BASE_URL + '/'`) and a link to Blog (`import.meta.env.BASE_URL + '/blog'`)
- Display the site name "FísicaFans" in Space Grotesk
- Use `class` composition via `cn()` for any conditional styling — no inline `style` for Tailwind tokens
- Have NO `<hr>` or solid bottom border — spacing or glass shadow only

**REQ-2-09:** `src/components/layout/Footer.vue` MUST:
- Display "© {currentYear} FísicaFans — Todos los derechos reservados"
- Have NO `<hr>` or solid top border
- Have a subtle glassmorphism or dark-transparent background

**REQ-2-10:** No component in Phases 2–5 MAY use `var()` inside a `className` prop or Tailwind class string — CSS variables are used in `global.css` or passed via `style` attribute only.

**REQ-2-11:** No component MAY use `@apply` — Tailwind utilities are composed in template/JSX only.

**REQ-2-12:** No solid dividers (`<hr>`, solid `border-t`, `border-b`) ANYWHERE in the layout — spacing separates sections.

### Scenarios

**S-2-A: Glass utility renders correctly**
- Given a component that applies `class="glass"` to a `<div>`
- When the page renders in a browser
- Then the element has `backdrop-filter: blur(16px)` computed style
- And the background has visible transparency over a dark background
- And no solid opaque border is visible

**S-2-B: BaseLayout renders Google Fonts**
- Given any page using `BaseLayout`
- When inspecting `<head>` in the browser
- Then `<link rel="preconnect" href="https://fonts.googleapis.com">` is present
- And `<link>` for Space Grotesk and Manrope with `display=swap` is present
- And `katex.min.css` is linked

**S-2-C: Header sticky on scroll**
- Given the home page loaded in a 320px-wide viewport
- When the user scrolls 200px down
- Then the Header remains visible at the top of the viewport
- And it renders with glassmorphism background (not solid color)

**S-2-D: Dark class always active**
- Given any page using `BaseLayout`
- When the page loads
- Then `<html>` has `class="dark"`
- And `body` background color matches `#0d112a`

### Acceptance Criteria

| ID | Criterion | Result |
|----|-----------|--------|
| AC-2-01 | `tailwind.config.cjs` has all 8 color tokens at specified values | PASS/FAIL |
| AC-2-02 | `.glass` class has `backdrop-filter: blur(16px)` and primary-tinted border | PASS/FAIL |
| AC-2-03 | `global.css` has zero `@apply` statements | PASS/FAIL |
| AC-2-04 | `BaseLayout.astro` imports `katex.min.css` | PASS/FAIL |
| AC-2-05 | `BaseLayout.astro` loads Space Grotesk + Manrope via Google Fonts preconnect | PASS/FAIL |
| AC-2-06 | `<html>` always has `class="dark"` | PASS/FAIL |
| AC-2-07 | Header is sticky and glassmorphic (no solid bg) | PASS/FAIL |
| AC-2-08 | Footer shows current year and has no solid top border | PASS/FAIL |
| AC-2-09 | No `var()` inside any `className` string across all components | PASS/FAIL |
| AC-2-10 | No `<hr>` anywhere in layout components | PASS/FAIL |
| AC-2-11 | Build passes with no TypeScript errors | PASS/FAIL |

---

## Phase 3 — Home Page

### Requirements

**REQ-3-01:** `src/components/home/Hero.vue` MUST implement a Canvas-based particle animation (floating stars) using the native Canvas 2D API. No external animation library is permitted.

**REQ-3-02:** The Hero canvas MUST be mounted as an Astro island with `client:visible` directive — it MUST NOT hydrate until the component enters the viewport.

**REQ-3-03:** The Hero canvas animation loop (`requestAnimationFrame`) MUST stop when the component leaves the viewport, implemented via `IntersectionObserver`. The observer MUST disconnect when the component is unmounted (`onUnmounted`).

**REQ-3-04:** The Hero MUST render a static placeholder (dark gradient background matching `#0d112a`) visible during SSR and before hydration, so no layout shift occurs.

**REQ-3-05:** The Hero headline ("FísicaFans" or equivalent main title) MUST use the Space Grotesk font and a gradient text effect using `primary` to `secondary` colors (`#667eea` → `#ec4899`).

**REQ-3-06:** The Hero subtitle text MUST use the Manrope font and `text-primary-light` color.

**REQ-3-07:** The Hero MUST include a CTA button that links to `import.meta.env.BASE_URL + '/blog'` with:
- Background: gradient `primary` to `secondary`
- `border-radius`: `radius-xl` (24px)
- Hover state: opacity change or scale transform — no solid color fallback

**REQ-3-08:** `src/components/home/PhysicsCategories.vue` MUST render exactly 5 category cards, one per physics category:
1. Termodinámica
2. Mecánica Cuántica
3. Física Clásica
4. Electromagnetismo
5. Relatividad

**REQ-3-09:** Each category card MUST use the `.glass` utility class and display:
- A representative icon (SVG or Unicode symbol — no external icon library required, but `lucide-vue-next` is permitted)
- The category title in Space Grotesk
- A 1–2 sentence description in Manrope
- A link to the future category page (can be `#` placeholder in MVP) — no broken navigation

**REQ-3-10:** Each category card MUST have a hover state that applies:
- Vertical lift: `translateY(-4px)` or equivalent
- Border glow using `primary` color (e.g., `box-shadow` or `border-color` change)
- Transition duration ≤ 300ms

**REQ-3-11:** `src/pages/index.astro` MUST import and render `<Hero client:visible />` and `<PhysicsCategories />` inside `<BaseLayout title="Inicio">`.

**REQ-3-12:** The home page layout MUST be responsive at three breakpoints:
- **320px**: single column, Hero canvas fills full width, categories stack vertically
- **768px**: categories displayed in 2-column grid
- **1280px+**: categories displayed in 3-column grid (with one card centered in last row if needed) or 5-column layout

**REQ-3-13:** No JPG or PNG images from the original site MUST appear on the home page — only the optimized WebP hero image or no image at all.

### Scenarios

**S-3-A: Canvas stops when out of viewport**
- Given the home page is loaded
- When the user scrolls the Hero completely out of the viewport
- Then the `requestAnimationFrame` loop is paused (no active animation callbacks)
- When the user scrolls back to make the Hero visible
- Then the animation loop resumes

**S-3-B: Hero renders without JS**
- Given JavaScript is disabled in the browser
- When the home page loads
- Then a static dark background placeholder is visible where the Hero canvas would be
- And no JavaScript error is thrown

**S-3-C: Category card hover state**
- Given the home page at ≥ 768px viewport
- When the user hovers over a PhysicsCategories card
- Then the card lifts with `translateY(-4px)` within 300ms
- And a primary-colored glow appears on the border or shadow

**S-3-D: Responsive grid at 768px**
- Given the home page at 768px viewport width
- When the page renders
- Then PhysicsCategories shows 2 cards per row

**S-3-E: CTA button navigates to blog**
- Given the home page
- When the user clicks the CTA button in the Hero
- Then the browser navigates to `{BASE_URL}/blog`
- And no 404 error occurs

### Acceptance Criteria

| ID | Criterion | Result |
|----|-----------|--------|
| AC-3-01 | `Hero.vue` uses `client:visible` in `index.astro` | PASS/FAIL |
| AC-3-02 | Canvas animation loop stops when Hero leaves viewport (IntersectionObserver) | PASS/FAIL |
| AC-3-03 | Hero renders a visible static placeholder before hydration | PASS/FAIL |
| AC-3-04 | Headline uses gradient from `#667eea` to `#ec4899` | PASS/FAIL |
| AC-3-05 | CTA button has gradient background and 24px border-radius | PASS/FAIL |
| AC-3-06 | Exactly 5 category cards render with icon + title + description | PASS/FAIL |
| AC-3-07 | Card hover: `translateY(-4px)` + primary glow within 300ms | PASS/FAIL |
| AC-3-08 | Home page renders single column at 320px viewport | PASS/FAIL |
| AC-3-09 | Home page renders 2-column grid at 768px viewport | PASS/FAIL |
| AC-3-10 | No `<img>` pointing to `.jpg` or `.png` on the home page | PASS/FAIL |
| AC-3-11 | `pnpm build` passes with home page | PASS/FAIL |

---

## Phase 4 — Blog System

### Requirements

**REQ-4-01:** `src/content/config.ts` MUST define a `blog` collection using Astro Content Collections with the following Zod schema:

```ts
z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum([
    'termodinamica',
    'mecanica-cuantica',
    'fisica-clasica',
    'electromagnetismo',
    'relatividad',
  ]),
  pubDate: z.coerce.date(),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
})
```

**REQ-4-02:** The `draft` field MUST default to `false`. Posts with `draft: true` MUST NOT appear in any listing page or be reachable via public URL.

**REQ-4-03:** `src/layouts/BlogPostLayout.astro` MUST:
- Accept `frontmatter` or Astro `Content` props from MDX routing
- Render a fixed reading progress bar at the top of the page (full-width, height 3px, gradient `primary` → `secondary`)
- Render a sticky Table of Contents (ToC) from `<h2>` headings in the post body
- Use `BaseLayout` for outer shell
- Render the post `title` in Space Grotesk as `<h1>`
- Render `pubDate` formatted in Spanish locale (e.g., "4 de abril de 2026")
- Render the category as a chip/badge with a distinct background color per category (see REQ-4-06)
- Render the MDX body via `<slot />` or `<Content />`

**REQ-4-04:** The reading progress bar MUST update its width (0% to 100%) as the user scrolls the post, implemented via a `scroll` event listener on `window`. The listener MUST be removed on component unmount.

**REQ-4-05:** The Table of Contents MUST:
- List all `<h2>` headings found in the rendered post
- Use smooth-scroll `href="#heading-id"` links
- Be `position: sticky; top: 80px` (below the header)
- Collapse into an expandable section on mobile (≤ 768px)

**REQ-4-06:** Category chip color mapping (background color, using Tailwind or inline style):

| Category | Color |
|----------|-------|
| `termodinamica` | `#f97316` (orange) |
| `mecanica-cuantica` | `#8b5cf6` (purple) |
| `fisica-clasica` | `#3b82f6` (blue) |
| `electromagnetismo` | `#eab308` (yellow) |
| `relatividad` | `#ec4899` (pink / secondary) |

**REQ-4-07:** `src/components/blog/PostCard.vue` MUST render:
- Post `title` in Space Grotesk
- Post `description` in Manrope (truncated to 2 lines via CSS `line-clamp-2`)
- Category chip with color mapping from REQ-4-06
- `pubDate` formatted in Spanish locale
- Full card is a clickable link to `{BASE_URL}/blog/{slug}`
- Card uses `.glass` utility class with hover lift (same pattern as category cards)

**REQ-4-08:** `src/pages/blog/index.astro` MUST:
- Fetch all blog posts from the `blog` collection
- Filter out posts where `draft === true`
- Sort remaining posts by `pubDate` descending (newest first)
- Render a `<PostCard>` for each post
- Use `BaseLayout` with `title="Blog"`

**REQ-4-09:** `src/pages/blog/[...slug].astro` MUST:
- Use `getStaticPaths()` to generate routes for all non-draft blog posts
- Return a 404 response (or redirect) if the requested slug does not match any published post
- Render the post using `BlogPostLayout`

**REQ-4-10:** KaTeX rendering in blog posts MUST support:
- Inline syntax: `$...$` — renders as inline `<span class="katex">`
- Block syntax: `$$...$$` — renders as `<span class="katex-display">`
- KaTeX CSS MUST be loaded globally (via `BaseLayout`) — NOT per-page

**REQ-4-11:** All internal links in `PostCard` and blog routing MUST use `import.meta.env.BASE_URL` as prefix — no hardcoded `/blog/` paths.

### Scenarios

**S-4-A: Draft post not accessible**
- Given a post with `draft: true` in frontmatter
- When the site is built with `pnpm build`
- Then no HTML file is generated for that post's slug
- And the blog listing page does not include that post

**S-4-B: Reading progress bar updates**
- Given a blog post page loaded in the browser
- When the user scrolls to 50% of the page
- Then the reading progress bar width is approximately 50%
- When the user reaches the bottom
- Then the bar is at 100%

**S-4-C: Table of Contents sticky on scroll**
- Given a blog post with 3+ `<h2>` headings, at ≥ 1024px viewport
- When the user scrolls past the first `<h2>`
- Then the ToC remains visible at the right side, sticky at 80px from top

**S-4-D: ToC collapses on mobile**
- Given a blog post at 375px viewport width
- When the page loads
- Then the ToC is collapsed (not visible)
- When the user taps/clicks the ToC toggle
- Then the ToC expands to show heading links

**S-4-E: KaTeX renders in MDX**
- Given a blog post with `$F = ma$` and `$$E = \frac{1}{2}mv^2$$`
- When the page renders
- Then `$F = ma$` produces `<span class="katex">` inline
- And `$$E = ...$$` produces `<span class="katex-display">` block element
- And no raw `$` characters appear in the rendered HTML

**S-4-F: Blog index sorted by date**
- Given posts with pubDates: 2025-01-15, 2025-03-01, 2024-12-20
- When `/blog` renders
- Then posts appear in order: 2025-03-01, 2025-01-15, 2024-12-20

**S-4-G: Slug 404 for unknown slug**
- Given `pnpm build` has generated static pages
- When a browser requests `/Miweb/blog/nonexistent-slug`
- Then the server returns a 404 (GitHub Pages serves the 404.html or Astro 404 page)

### Acceptance Criteria

| ID | Criterion | Result |
|----|-----------|--------|
| AC-4-01 | `src/content/config.ts` defines `blog` collection with correct Zod schema | PASS/FAIL |
| AC-4-02 | Posts with `draft: true` are absent from build output and listing | PASS/FAIL |
| AC-4-03 | `BlogPostLayout.astro` renders reading progress bar (fixed, 3px, gradient) | PASS/FAIL |
| AC-4-04 | Reading progress bar reaches 100% on scroll to bottom | PASS/FAIL |
| AC-4-05 | ToC lists all `<h2>` headings with smooth-scroll links | PASS/FAIL |
| AC-4-06 | ToC is sticky at ≥ 1024px and collapses at ≤ 768px | PASS/FAIL |
| AC-4-07 | Category chips use correct color per category (6 distinct colors) | PASS/FAIL |
| AC-4-08 | `PostCard` truncates description to 2 lines | PASS/FAIL |
| AC-4-09 | Blog index is sorted by `pubDate` descending | PASS/FAIL |
| AC-4-10 | `[...slug].astro` uses `getStaticPaths()` | PASS/FAIL |
| AC-4-11 | KaTeX inline and block equations render correctly | PASS/FAIL |
| AC-4-12 | All blog links use `import.meta.env.BASE_URL` prefix | PASS/FAIL |
| AC-4-13 | Build passes with no TypeScript errors | PASS/FAIL |

---

## Phase 5 — Content Migration & Deployment

### Requirements

**REQ-5-01:** Five MDX files MUST exist under `src/content/blog/`, one per physics category, with the following slugs:

| Slug | Category |
|------|----------|
| `introduccion-a-la-termodinamica` | `termodinamica` |
| `mecanica-cuantica-fundamentos` | `mecanica-cuantica` |
| `fisica-clasica-leyes-de-newton` | `fisica-clasica` |
| `electromagnetismo-ecuaciones-de-maxwell` | `electromagnetismo` |
| `teoria-de-la-relatividad-especial` | `relatividad` |

**REQ-5-02:** Each MDX post MUST have valid frontmatter conforming to the schema defined in REQ-4-01 with:
- `draft: false`
- `pubDate` set to a past date in ISO format
- `heroImage` pointing to a WebP file under `public/images/{category}/`

**REQ-5-03:** Each MDX post MUST contain:
- Minimum 200 words of body content in Spanish
- Minimum 2 KaTeX equations (at least 1 inline and 1 block per post)
- At least 1 image referencing a WebP file via Astro `<Image />` component or standard `<img loading="lazy" />`

**REQ-5-04:** Required equations per post (minimum — additional equations are encouraged):

| Post | Required equations |
|------|--------------------|
| Termodinámica | `$\Delta U = Q - W$` and `$$dS = \frac{\delta Q_{rev}}{T}$$` |
| Mecánica Cuántica | `$\hat{H}\psi = E\psi$` and `$$i\hbar\frac{\partial \psi}{\partial t} = \hat{H}\psi$$` |
| Física Clásica | `$F = ma$` and `$$\vec{F} = m\vec{a}$$` |
| Electromagnetismo | `$\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$` and `$$\nabla \times \vec{B} = \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial\vec{E}}{\partial t}$$` |
| Relatividad | `$E = mc^2$` and `$$t' = \gamma\left(t - \frac{vx}{c^2}\right)$$` |

**REQ-5-05:** Images for blog posts MUST be organized under `public/images/{category}/` subdirectories. All images MUST be WebP format. No JPG or PNG files are permitted under `public/images/`.

**REQ-5-06:** All images under `public/images/` MUST be less than 200 KB each.

**REQ-5-07:** A GitHub Actions workflow MUST exist at `.github/workflows/deploy.yml` with:
- Trigger: `push` to `main` branch
- Steps:
  1. `actions/checkout@v4`
  2. `pnpm/action-setup` (latest) for pnpm install
  3. `actions/setup-node@v4` with Node 20.x
  4. `pnpm install --frozen-lockfile`
  5. `pnpm build`
  6. `peaceiris/actions-gh-pages@v4` deploying `dist/` to `gh-pages` branch with `publish_dir: ./dist`
- The workflow MUST NOT skip `--frozen-lockfile` — reproducible builds are required

**REQ-5-08:** `astro.config.mjs` MUST include `sitemap()` in integrations (already required from REQ-1-05). The sitemap MUST be generated at `dist/sitemap-index.xml` when built.

**REQ-5-09:** `public/robots.txt` MUST exist with content:
```
User-agent: *
Allow: /
Sitemap: https://agomez356.github.io/Miweb/sitemap-index.xml
```

**REQ-5-10:** After deployment to GitHub Pages, the live site at `https://agomez356.github.io/Miweb` MUST pass Lighthouse CI with:
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

**REQ-5-11:** First Contentful Paint (FCP) MUST be < 1 second on Lighthouse mobile simulation (4G throttled).

**REQ-5-12:** Total initial JavaScript bundle size (sum of all `.js` files in `dist/_astro/` loaded on first navigation to home) MUST be < 200 KB uncompressed.

**REQ-5-13:** The deployed site MUST have zero broken internal links — all `href` values that reference `{BASE_URL}/...` paths MUST resolve to a real page.

**REQ-5-14:** `<html lang="es">` MUST be set on every page for language accessibility.

### Scenarios

**S-5-A: GitHub Actions deploys on push to main**
- Given a commit pushed to the `main` branch
- When the GitHub Actions workflow `deploy.yml` runs
- Then the `pnpm build` step succeeds (exit code 0)
- And the `gh-pages` branch is updated with the content of `dist/`
- And `https://agomez356.github.io/Miweb` returns HTTP 200

**S-5-B: Blog listing shows 5 posts**
- Given the deployed site
- When a user navigates to `https://agomez356.github.io/Miweb/blog`
- Then exactly 5 post cards are visible
- And each card shows a title, description, category chip, and date in Spanish

**S-5-C: KaTeX equations in each deployed post**
- Given the deployed post for each of the 5 categories
- When a user opens any post
- Then at least 2 rendered equations are visible (no raw `$` or `$$` strings)
- And KaTeX CSS is loaded (equations are styled, not unstyled)

**S-5-D: Robots.txt accessible**
- Given the deployed site
- When a crawler requests `https://agomez356.github.io/Miweb/robots.txt`
- Then the response is HTTP 200 with `User-agent: *\nAllow: /`

**S-5-E: Sitemap contains all 5 posts**
- Given the built `dist/sitemap-index.xml` or `dist/sitemap-0.xml`
- When parsed
- Then it contains URLs for all 5 blog post slugs
- And the base URL is `https://agomez356.github.io/Miweb`

**S-5-F: No images over 200KB**
- Given all files under `public/images/`
- When each file's size is checked
- Then no file exceeds 200 KB
- And no file has extension `.jpg` or `.png`

**S-5-G: Lighthouse Performance ≥ 95**
- Given the live site `https://agomez356.github.io/Miweb`
- When Lighthouse runs in mobile simulation mode
- Then Performance score is ≥ 95
- And FCP is < 1 second

**S-5-H: JS bundle < 200KB**
- Given `pnpm build` output in `dist/_astro/`
- When the total size of `.js` files loaded on home page initial navigation is summed
- Then the total is < 200 KB

### Acceptance Criteria

| ID | Criterion | Result |
|----|-----------|--------|
| AC-5-01 | 5 MDX files exist in `src/content/blog/` with correct slugs | PASS/FAIL |
| AC-5-02 | Each post has valid frontmatter (title, description, category, pubDate, draft: false) | PASS/FAIL |
| AC-5-03 | Each post has ≥ 200 words in Spanish | PASS/FAIL |
| AC-5-04 | Each post has ≥ 2 KaTeX equations | PASS/FAIL |
| AC-5-05 | Each post has ≥ 1 WebP image reference | PASS/FAIL |
| AC-5-06 | All images under `public/images/` are WebP and < 200 KB | PASS/FAIL |
| AC-5-07 | `.github/workflows/deploy.yml` exists and triggers on push to main | PASS/FAIL |
| AC-5-08 | GitHub Actions workflow uses `--frozen-lockfile` | PASS/FAIL |
| AC-5-09 | `peaceiris/actions-gh-pages` deploys `dist/` to `gh-pages` branch | PASS/FAIL |
| AC-5-10 | `public/robots.txt` exists with correct content | PASS/FAIL |
| AC-5-11 | `dist/sitemap-index.xml` (or `sitemap-0.xml`) contains all 5 post URLs | PASS/FAIL |
| AC-5-12 | Lighthouse Performance ≥ 95 (mobile, live site) | PASS/FAIL |
| AC-5-13 | Lighthouse Accessibility ≥ 95 | PASS/FAIL |
| AC-5-14 | Lighthouse Best Practices ≥ 95 | PASS/FAIL |
| AC-5-15 | Lighthouse SEO ≥ 95 | PASS/FAIL |
| AC-5-16 | FCP < 1s on mobile 4G Lighthouse simulation | PASS/FAIL |
| AC-5-17 | Total initial JS bundle < 200 KB uncompressed | PASS/FAIL |
| AC-5-18 | Zero broken internal links after deployment | PASS/FAIL |
| AC-5-19 | `<html lang="es">` on every page | PASS/FAIL |

---

## Open Decisions

The following decisions were made during spec authoring due to ambiguity in the proposal:

1. **`draft` field type**: The proposal schema used `heroImage: z.string().optional()` but omitted `draft`. This spec adds `draft: z.boolean().default(false)` as required by the task description. If Zod v4 is used instead of v3, `.default()` behavior differs — verify `zod ^3.x` is pinned.

2. **ToC implementation**: The proposal mentions "sticky ToC" but not how headings are collected. This spec requires client-side heading collection via `querySelectorAll('h2')` in a Vue composable or Astro script tag. A build-time approach (remark plugin) is also valid — the implementer may choose, as long as AC-4-05 passes.

3. **`[...slug].astro` vs `[slug].astro`**: The proposal mentions `[...slug].astro` (catch-all). This spec uses `[...slug].astro` to handle potential nested paths, consistent with Astro Content Collections' `getStaticPaths()` returning `{ params: { slug } }`.

4. **Category card links in Phase 3**: Category pages are out of scope for MVP. Cards link to `#` placeholder. This is intentional — REQ-3-09 explicitly allows this to avoid dead code.

5. **Image for galaxy-network.webp**: The conversion target is 150 KB max (stricter than the proposal's 200 KB general limit) to maximize LCP improvement. The original is 698 KB.

6. **pnpm vs npm**: The proposal mentions both `pnpm` and `npm`. This spec standardizes on `pnpm` throughout (dev commands, CI). If `npm` is preferred, all `pnpm` references must be changed consistently.

7. **Specific category image paths**: Each post requires a `heroImage` under `public/images/{category}/`. The exact filenames are left to the implementer, but the directory structure is mandatory.

---

## Spec Summary

| Phase | Requirements | Scenarios | Acceptance Criteria |
|-------|-------------|-----------|---------------------|
| 1 — Scaffold | 10 | 4 | 11 |
| 2 — Design System | 12 | 4 | 11 |
| 3 — Home Page | 13 | 5 | 11 |
| 4 — Blog System | 11 | 7 | 13 |
| 5 — Content & Deploy | 14 | 8 | 19 |
| **Total** | **60** | **28** | **65** |
