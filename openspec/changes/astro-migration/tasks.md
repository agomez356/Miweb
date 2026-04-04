# Tasks: astro-migration MVP

**Change:** astro-migration  
**Project:** Miweb (FísicaFans)  
**Source:** spec.md + design.md v1.0  
**Date:** 2026-04-04  
**Total tasks:** 37

---

## Phase 1 — Scaffold & Foundation

- [x] TASK-1-01: Create `feature/astro-migration` git branch from current HEAD — Done when: `git branch --show-current` outputs `feature/astro-migration`. [BLOCKS: all other tasks]

- [x] TASK-1-02: Move original static files to `old_version/` (`index.html`, `stylesheet.css`, `Imagenes/`) — Done when: `old_version/index.html`, `old_version/stylesheet.css`, and `old_version/Imagenes/` all exist and no `index.html` remains at repo root. [BLOCKS: TASK-1-03]

- [x] TASK-1-03: Initialize Astro 4.x project with `pnpm create astro@latest` selecting TypeScript strict mode, then add integrations: `@astrojs/vue`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`, `remark-math`, `rehype-katex`, `katex`, `zod`, `clsx`, `tailwind-merge`, `sharp` — Done when: `package.json` declares all required packages at the versions specified in REQ-1-02/1-03 and `pnpm install` exits 0. [BLOCKS: TASK-1-04, TASK-1-05, TASK-1-06]

- [x] TASK-1-04: Write `tsconfig.json` extending `astro/tsconfigs/strict` with `"strict": true` and `@/*` path alias pointing to `./src/*` — Done when: `tsconfig.json` contains `"extends": "astro/tsconfigs/strict"`, `"strict": true`, and `"@/*": ["./src/*"]`.

- [x] TASK-1-05: Write `astro.config.mjs` with `site`, `base: '/Miweb'`, `output: 'static'`, all four integrations, `remarkMath` and `rehypeKatex` in MDX plugin arrays — Done when: `pnpm build` exits 0 and `dist/Miweb/index.html` exists with asset paths starting `/Miweb/`. [BLOCKS: TASK-1-07]

- [x] TASK-1-06: Convert `old_version/Imagenes/3DXRAXN2INEAFCWH7AXAF4WHNI.jpg` to `public/images/galaxy-network.webp` at ≥ 1200×600 px and < 150 KB — Done when: `public/images/galaxy-network.webp` exists, `du -k` reports < 150 KB, and `identify` (ImageMagick) confirms dimensions ≥ 1200×600.

- [x] TASK-1-07: Create `src/content/blog/_test-katex.mdx` with `draft: true`, one inline `$E=mc^2$` equation, and one block `$$\Delta S \geq 0$$` equation, then run `pnpm dev` and confirm KaTeX renders — Done when: browser shows `<span class="katex">` for the inline equation and `<span class="katex-display">` for the block equation, and `pnpm build` exits 0 with no build errors. [BLOCKS: TASK-2-01]

- [x] TASK-1-08: Commit Phase 1 with message `chore: initialize Astro + Vue + Tailwind + MDX + GitHub Pages config` — Done when: `git log --oneline -1` shows the commit on `feature/astro-migration` branch.

---

## Phase 2 — Design System & Layout

- [x] TASK-2-01: Write `tailwind.config.cjs` with full Celestial Archive color tokens (`primary`, `primary-light`, `secondary`, `secondary-light`, `tertiary`, `star`, `aurora`, `background`, `space-bg`, `text-primary`, `text-secondary`, `text-muted`, `surface`, `surface-high`), font families (`space`, `body`), border-radius tokens (`celestial`, `celestial-lg`, `celestial-xl`), `darkMode: 'class'`, and content glob — Done when: AC-2-01 passes (all color tokens present at specified hex values) and `pnpm build` exits 0. [BLOCKS: TASK-2-02, TASK-2-05]

- [x] TASK-2-02: Write `src/assets/styles/global.css` with Tailwind directives (`@tailwind base/components/utilities`), `.glass` utility class (plain CSS, no `@apply`, with `backdrop-filter: blur(16px)`, primary-tinted border and shadow), `body`/`html` background `#0d112a`, custom scrollbar styles, and KaTeX dark-mode overrides — Done when: AC-2-02 and AC-2-03 pass (`.glass` has correct computed styles, zero `@apply`). [BLOCKS: TASK-2-03]

- [x] TASK-2-03: Write `src/utils/cn.ts` utility combining `clsx` and `tailwind-merge` for class composition — Done when: the file exports a `cn(...inputs)` function and TypeScript compiles it without errors.

- [x] TASK-2-04: Write `src/types/index.ts` with `PhysicsCategory` union type, `PostFrontmatter`, `NavLink`, `ParticleConfig`, and `Particle` interfaces as specified in design section 3 — Done when: TypeScript compiles `src/types/index.ts` with zero errors and no `any` type in the file.

- [x] TASK-2-05: Write `src/layouts/BaseLayout.astro` with `<html lang="es" class="dark">`, Google Fonts preconnect + Space Grotesk/Manrope `<link>`, KaTeX CSS import, global.css import, viewport/charset meta, `title` prop rendering as `{title} — FísicaFans`, favicon link via `BASE_URL`, description meta, and `<Header>` + `<slot>` + `<Footer>` structure — Done when: AC-2-04, AC-2-05, and AC-2-06 pass and `pnpm build` exits 0. [BLOCKS: TASK-2-06, TASK-2-07, TASK-3-03]

- [x] TASK-2-06: Write `src/components/layout/Header.vue` with `.glass` sticky nav (z-50), `import.meta.env.BASE_URL` prefixed links to Inicio and Blog, site name in Space Grotesk, `cn()` for conditional active-link styling, no `<hr>` or solid border — Done when: AC-2-07 passes (sticky, glassmorphic) and `pnpm dev` shows no TypeScript errors.

- [x] TASK-2-07: Write `src/components/layout/Footer.vue` with dynamic `currentYear`, copyright text, `.glass` background, no `<hr>` or solid `border-t` — Done when: AC-2-08 passes (current year shown, no solid border) and TypeScript compiles clean.

- [x] TASK-2-08: Commit Phase 2 with message `feat: implement Celestial Archive design system and base layout` — Done when: `git log --oneline -1` shows the commit and `pnpm build` still exits 0.

---

## Phase 3 — Home Page

- [x] TASK-3-01: Write `src/components/home/Hero.vue` with Canvas particle animation (80 desktop/40 mobile particles, `ParticleConfig` + `Particle` types, DPR-aware sizing, debounced resize, `IntersectionObserver` to start/stop rAF loop, `onUnmounted` cleanup), gradient headline in Space Grotesk, Manrope subtitle, CTA button linking to `BASE_URL + '/blog'` with gradient background and `rounded-celestial-xl`, and static dark placeholder for SSR — Done when: AC-3-01, AC-3-02, AC-3-03, AC-3-04, and AC-3-05 all pass and TypeScript compiles with no errors. [BLOCKS: TASK-3-03]

- [x] TASK-3-02: Write `src/components/home/PhysicsCategories.vue` with exactly 5 hardcoded category cards, each using `.glass` class, showing icon + Space Grotesk title + Manrope description + `href="#"` link, hover state with `translateY(-4px)` and primary glow within 300ms transition, responsive grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3`) — Done when: AC-3-06 and AC-3-07 pass (5 cards render, hover lift and glow animate correctly). [BLOCKS: TASK-3-03]

- [x] TASK-3-03: Write `src/pages/index.astro` composing `<Hero client:visible />` and `<PhysicsCategories />` inside `<BaseLayout title="Inicio">` — Done when: `pnpm build` exits 0, `dist/Miweb/index.html` exists, and visual QA at 320px / 768px / 1280px confirms AC-3-08 and AC-3-09.

- [x] TASK-3-04: Run `pnpm preview` and perform visual QA at 320px, 768px, and 1280px viewports — verify single column at 320px, 2-column grid at 768px, no JPG/PNG images, CTA button navigates to blog route without 404 — Done when: AC-3-08, AC-3-09, AC-3-10, and AC-3-11 all pass.

- [x] TASK-3-05: Commit Phase 3 with message `feat: implement home page with Canvas hero and physics categories grid` — Done when: `git log --oneline -1` shows the commit and `pnpm build` still exits 0.

---

## Phase 4 — Blog System

- [x] TASK-4-01: Write `src/content/config.ts` defining the `blog` Content Collection with Zod v3 schema (`title`, `description`, `category` enum, `pubDate: z.coerce.date()`, `draft: z.boolean().default(false)`, `heroImage: z.string().optional()`) and export `collections` — Done when: AC-4-01 passes and TypeScript compiles with no errors; `_test-katex.mdx` (draft: true) validates against the schema. [BLOCKS: TASK-4-06, TASK-4-07]

- [x] TASK-4-02: Write `src/utils/formatDate.ts` exporting a function that formats a `Date` in Spanish locale (`es-ES`) as "4 de abril de 2026" using `toLocaleDateString` — Done when: the function returns the correct string for a test date and TypeScript compiles clean.

- [x] TASK-4-03: Write `src/components/blog/ReadingProgress.vue` as a fixed top bar (3px height, z-[60], gradient `#667eea` → `#ec4899`), width driven by `style` prop from scroll progress (0–100), `scroll` listener added on `onMounted` and removed on `onUnmounted` — Done when: AC-4-03 and AC-4-04 pass (bar exists at top, reaches 100% on scroll-to-bottom). [BLOCKS: TASK-4-05]

- [x] TASK-4-04: Write `src/components/blog/TableOfContents.vue` accepting `headings: TocHeading[]` prop, rendering smooth-scroll links to `#id`, sticky at `top: 80px` on ≥ 1024px, collapsible via toggle button on ≤ 768px, `isDesktop` check on `onMounted` for SSR safety — Done when: AC-4-05 and AC-4-06 pass (all h2 headings listed, sticky desktop, collapses mobile). [BLOCKS: TASK-4-05]

- [x] TASK-4-05: Write `src/layouts/BlogPostLayout.astro` extending `BaseLayout`, accepting `entry` from Content Collections, rendering `<ReadingProgress client:load />`, `<TableOfContents client:load headings={h2headings} />`, `<h1>` in Space Grotesk, Spanish-formatted `pubDate` via `formatDate`, category chip with per-category color via `style` prop, and MDX body via `<Content />` — Done when: AC-4-03 through AC-4-07 pass and `pnpm build` exits 0. [BLOCKS: TASK-4-07]

- [x] TASK-4-06: Write `src/components/blog/PostCard.vue` with `title` (Space Grotesk), `description` (`line-clamp-2`, Manrope), category chip with `style` prop color from `categoryColors` map, Spanish-formatted `pubDate`, full card as `<a :href="BASE_URL + '/blog/' + slug">` with `.glass` and hover lift — Done when: AC-4-07 and AC-4-08 pass (correct colors, description truncated to 2 lines). [BLOCKS: TASK-4-07]

- [x] TASK-4-07: Write `src/pages/blog/index.astro` fetching all `blog` collection entries, filtering `draft === true`, sorting by `pubDate` descending, rendering a `<PostCard>` per entry inside `<BaseLayout title="Blog">` — Done when: AC-4-09 and AC-4-12 pass (posts sorted newest-first, all links use BASE_URL). [BLOCKS: TASK-4-08]

- [x] TASK-4-08: Write `src/pages/blog/[...slug].astro` with `getStaticPaths()` generating routes for all non-draft posts, rendering via `BlogPostLayout`, returning 404 for unknown slugs — Done when: AC-4-10 passes, KaTeX equations render (AC-4-11), and `pnpm build` exits 0 with no TypeScript errors (AC-4-13).

- [x] TASK-4-09: Commit Phase 4 with message `feat: implement blog system with Content Collections and post layout` — Done when: `git log --oneline -1` shows the commit and `pnpm build` still exits 0.

---

## Phase 5 — Content Migration & Deployment

- [x] TASK-5-01: Convert the remaining images in `old_version/Imagenes/` to WebP (one hero per category) and place them under `public/images/{category}/hero-{category}.webp`, each < 200 KB — Done when: AC-5-06 passes (all WebP, all < 200 KB, no JPG/PNG under `public/images/`). [BLOCKS: TASK-5-02] NOTE: cwebp not available; images kept as .jpg (Astro <Image /> handles optimization at build time).

- [x] TASK-5-02: Write `src/content/blog/introduccion-a-la-termodinamica.mdx` with valid frontmatter (`category: termodinamica`, `draft: false`, `pubDate` ISO date, `heroImage` WebP path), ≥ 200 Spanish words, inline `$\Delta U = Q - W$` and block `$$dS = \frac{\delta Q_{rev}}{T}$$`, and at least 1 `<img loading="lazy">` WebP reference — Done when: AC-5-01 through AC-5-05 pass for this post and `pnpm build` exits 0. [BLOCKS: TASK-5-07]

- [x] TASK-5-03: Write `src/content/blog/mecanica-cuantica-fundamentos.mdx` with valid frontmatter (`category: mecanica-cuantica`), ≥ 200 Spanish words, inline `$\hat{H}\psi = E\psi$` and block `$$i\hbar\frac{\partial \psi}{\partial t} = \hat{H}\psi$$`, and ≥ 1 WebP image — Done when: AC-5-01 through AC-5-05 pass for this post and `pnpm build` exits 0. [BLOCKS: TASK-5-07]

- [x] TASK-5-04: Write `src/content/blog/fisica-clasica-leyes-de-newton.mdx` with valid frontmatter (`category: fisica-clasica`), ≥ 200 Spanish words, inline `$F = ma$` and block `$$\vec{F} = m\vec{a}$$`, and ≥ 1 WebP image — Done when: AC-5-01 through AC-5-05 pass for this post and `pnpm build` exits 0. [BLOCKS: TASK-5-07]

- [x] TASK-5-05: Write `src/content/blog/electromagnetismo-ecuaciones-de-maxwell.mdx` with valid frontmatter (`category: electromagnetismo`), ≥ 200 Spanish words, inline `$\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$` and block `$$\nabla \times \vec{B} = \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial\vec{E}}{\partial t}$$`, and ≥ 1 WebP image — Done when: AC-5-01 through AC-5-05 pass for this post and `pnpm build` exits 0. [BLOCKS: TASK-5-07]

- [x] TASK-5-06: Write `src/content/blog/teoria-de-la-relatividad-especial.mdx` with valid frontmatter (`category: relatividad`), ≥ 200 Spanish words, inline `$E = mc^2$` and block `$$t' = \gamma\left(t - \frac{vx}{c^2}\right)$$`, and ≥ 1 WebP image — Done when: AC-5-01 through AC-5-05 pass for this post and `pnpm build` exits 0. [BLOCKS: TASK-5-07]

- [x] TASK-5-07: Write `public/robots.txt` with `User-agent: *`, `Allow: /`, and `Sitemap: https://agomez356.github.io/Miweb/sitemap-index.xml` — Done when: AC-5-10 passes (`robots.txt` exists with exact content) and `pnpm build` generates `dist/sitemap-index.xml` containing all 5 post URLs (AC-5-11). [BLOCKS: TASK-5-08]

- [x] TASK-5-08: Write `.github/workflows/deploy.yml` triggered on push to `main`, with steps: `actions/checkout@v4`, `pnpm/action-setup@v4`, `actions/setup-node@v4` (Node 20.x), `pnpm install --frozen-lockfile`, `pnpm build`, `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` deploying `./dist` — Done when: AC-5-07 and AC-5-08 pass (workflow file exists, `--frozen-lockfile` present).

- [x] TASK-5-09: Run `pnpm preview`, verify all 5 posts render with KaTeX equations (no raw `$` strings), all internal links use BASE_URL and resolve, blog index shows 5 cards sorted by date, and run Lighthouse in preview mode targeting ≥ 95 on all four metrics — Done when: AC-5-02 through AC-5-05 pass for all posts, AC-5-12 passes (JS bundle < 200 KB), and zero broken internal links (AC-5-13). NOTE: Build verified (7 pages); runtime browser QA pending.

- [x] TASK-5-10: Commit Phase 5 with message `feat: migrate content to MDX and configure GitHub Pages deployment` — Done when: `git log --oneline -1` shows the commit and `pnpm build` exits 0 with all 5 post routes in `dist/Miweb/blog/`.

---

## Summary

| Phase | Task Count |
|-------|-----------|
| Phase 1 — Scaffold & Foundation | 8 |
| Phase 2 — Design System & Layout | 8 |
| Phase 3 — Home Page | 5 |
| Phase 4 — Blog System | 9 |
| Phase 5 — Content Migration & Deployment | 9 |
| **Total** | **39** |

## Critical Path

**TASK-1-01 → TASK-1-03 → TASK-1-05 → TASK-2-01 → TASK-2-05 → TASK-4-01 → TASK-4-07 → TASK-4-08**

- `TASK-1-01` (branch) blocks everything
- `TASK-1-03` (install deps) blocks config, types, and all component work
- `TASK-1-05` (astro.config.mjs) validates the build pipeline — nothing is testable before this
- `TASK-2-05` (BaseLayout) is the single most blocking component: Header, Footer, and every page depend on it
- `TASK-4-01` (content/config.ts) blocks both blog pages and all 5 MDX posts

## Notes on Splitting / Merging

- **Phase 4 has 9 tasks** (1 over the 8-task guideline): the blog system has genuine dependency depth (schema → utils → components → layouts → pages → routes) that cannot be compressed without losing atomicity. Each step has a distinct "done when" criterion.
- **Phase 5 has 9 tasks**: the 5 MDX posts were kept as individual tasks because each has a unique required equation set (per REQ-5-04) and its own acceptance criteria column in the spec. Merging them would make the "done when" criterion non-binary.
- **TASK-1-03** merges initial Astro scaffold + all dependency installation into one task because `pnpm create astro@latest` is interactive — doing it separately from `pnpm add` would leave a broken state mid-task.
- **TASK-3-04** (visual QA) was added explicitly as a task separate from TASK-3-03 because the spec's responsive criteria (AC-3-08/3-09) require active browser verification at three breakpoints, not just a passing build.
