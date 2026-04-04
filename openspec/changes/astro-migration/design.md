# Design: FísicaFans — Migración a Astro MVP (Fases 1–5)

**Change:** astro-migration  
**Project:** Miweb (FísicaFans)  
**Source:** spec.md v1.0  
**Date:** 2026-04-04  
**Status:** Draft

---

## 1. Directory Structure

```
Miweb/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # GitHub Actions: build + gh-pages deploy
├── public/
│   ├── robots.txt                        # Sitemap reference + allow all
│   └── images/
│       ├── galaxy-network.webp           # Hero image, < 150 KB, 1200×600+
│       ├── termodinamica/
│       │   └── hero-termodinamica.webp   # < 200 KB
│       ├── mecanica-cuantica/
│       │   └── hero-mecanica-cuantica.webp
│       ├── fisica-clasica/
│       │   └── hero-fisica-clasica.webp
│       ├── electromagnetismo/
│       │   └── hero-electromagnetismo.webp
│       └── relatividad/
│           └── hero-relatividad.webp
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── global.css               # Tailwind directives + .glass + body base + scrollbar + KaTeX dark
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.vue               # Sticky glass nav, links HOME + BLOG
│   │   │   └── Footer.vue               # Copyright + year, glass bg
│   │   ├── home/
│   │   │   ├── Hero.vue                 # Canvas particles, client:visible
│   │   │   └── PhysicsCategories.vue    # Grid of 5 CategoryCard items
│   │   └── blog/
│   │       ├── PostCard.vue             # Blog listing card, glass, hover lift
│   │       ├── TableOfContents.vue      # Sticky ToC, collapsible on mobile
│   │       └── ReadingProgress.vue      # Fixed top bar, scroll-driven width
│   ├── content/
│   │   ├── config.ts                    # Astro Content Collections schema (Zod)
│   │   └── blog/
│   │       ├── _test-katex.mdx          # draft: true — KaTeX pipeline validation only
│   │       ├── introduccion-a-la-termodinamica.mdx
│   │       ├── mecanica-cuantica-fundamentos.mdx
│   │       ├── fisica-clasica-leyes-de-newton.mdx
│   │       ├── electromagnetismo-ecuaciones-de-maxwell.mdx
│   │       └── teoria-de-la-relatividad-especial.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Shell: head, fonts, KaTeX CSS, Header, Footer
│   │   └── BlogPostLayout.astro         # Extends BaseLayout: progress bar + ToC + post meta
│   ├── pages/
│   │   ├── index.astro                  # Home: Hero + PhysicsCategories
│   │   └── blog/
│   │       ├── index.astro              # Blog listing: all non-draft posts sorted by date
│   │       └── [...slug].astro          # Dynamic blog post route (getStaticPaths)
│   └── types/
│       └── index.ts                     # Shared TypeScript interfaces
├── old_version/                         # Original static site (not processed by Astro)
│   ├── index.html
│   ├── stylesheet.css
│   └── Imagenes/
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
└── package.json
```

> `old_version/` is excluded from Astro's build by not being under `src/` or `public/`. No special config needed.

---

## 2. Configuration Files

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://agomez356.github.io',
  base: '/Miweb',
  output: 'static',
  integrations: [
    vue(),
    tailwind({
      configFile: './tailwind.config.cjs',
    }),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],
});
```

> `rehype-katex` v7 renders KaTeX at build time — no client-side JS needed for equations. CSS still must be imported globally.

---

### `tailwind.config.cjs`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'space-bg':        '#0d112a',  // canonical background — matches background token
        'primary':         '#667eea',
        'primary-light':   '#b9c3ff',
        'secondary':       '#ec4899',
        'secondary-light': '#ffb0cd',
        'tertiary':        '#fbbf24',
        'star':            '#fbbf24',  // alias of tertiary
        'aurora':          '#10b981',  // replaces 'success' for semantics
        'background':      '#0d112a',
        'text-primary':    '#f9fafb',
        'text-secondary':  '#9ca3af',
        'text-muted':      '#6b7280',
        'surface':         '#1a1e37',
        'surface-high':    '#242842',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        body:  ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'celestial':    '8px',
        'celestial-lg': '16px',
        'celestial-xl': '24px',
      },
    },
  },
  plugins: [],
};
```

> `darkMode: 'class'` — `BaseLayout.astro` always sets `<html class="dark">`. No toggle logic needed.  
> Colors `background` and `space-bg` are identical values; both are defined so token names read clearly in templates.

---

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

> `astro/tsconfigs/strict` already sets `"strict": true`, but it is re-declared explicitly to make intent clear. `@/*` maps to `src/` so imports like `import type { PostFrontmatter } from '@/types'` work everywhere.

---

### `pnpm-workspace.yaml`

Not needed — this is a single-package project, not a monorepo. Do NOT create this file.

---

## 3. TypeScript Interfaces

**File:** `src/types/index.ts`

```ts
// ─── Category ──────────────────────────────────────────────────────────────

export type PhysicsCategory =
  | 'termodinamica'
  | 'mecanica-cuantica'
  | 'fisica-clasica'
  | 'electromagnetismo'
  | 'relatividad';

// ─── Content Collections ───────────────────────────────────────────────────

/**
 * Matches the Zod schema defined in src/content/config.ts.
 * Used when accessing entry.data in .astro files.
 */
export interface PostFrontmatter {
  title: string;
  description: string;
  category: PhysicsCategory;
  pubDate: Date;
  draft: boolean;
  heroImage?: string;
}

// ─── Navigation ────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;        // always prefixed with import.meta.env.BASE_URL
  isActive?: boolean;
}

// ─── Canvas Hero ───────────────────────────────────────────────────────────

export interface ParticleConfig {
  count: number;       // 80 desktop / 40 mobile
  minRadius: number;   // 0.5
  maxRadius: number;   // 2.0
  minOpacity: number;  // 0.3
  maxOpacity: number;  // 0.8
  speed: number;       // max absolute vx/vy — suggested 0.3
  colors: string[];    // hex values drawn from design tokens
}

export interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}
```

> `interface` is used for extendable object shapes (`PostFrontmatter`, `NavLink`, `ParticleConfig`, `Particle`).  
> `type` is used for the union (`PhysicsCategory`).

---

## 4. Content Collections Schema

**File:** `src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    category:    z.enum([
      'termodinamica',
      'mecanica-cuantica',
      'fisica-clasica',
      'electromagnetismo',
      'relatividad',
    ]),
    pubDate:   z.coerce.date(),
    draft:     z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

> `z.coerce.date()` handles ISO date strings in frontmatter (e.g. `pubDate: 2025-03-15`).  
> `draft` defaults to `false` — omitting the field in frontmatter is equivalent to `draft: false`.  
> This is Zod v3 syntax. Do NOT upgrade to Zod v4 unless Astro explicitly supports it — `.default()` behavior changed in v4.

---

## 5. Component Contracts

### `Header.vue`

```ts
// Props
interface Props {
  currentPath?: string;  // used to mark active nav link
}
```

**Emits:** none

**Template structure:**
```html
<header class="glass sticky top-0 z-50 ...">
  <nav class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
    <a :href="baseUrl + '/'" class="font-space text-xl font-bold text-primary">
      FísicaFans
    </a>
    <ul class="flex gap-6">
      <li v-for="link in navLinks" :key="link.href">
        <a :href="link.href" :class="cn('font-space text-sm', link.isActive ? 'text-primary' : 'text-text-secondary hover:text-primary-light transition-colors')">
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</header>
```

**Key implementation notes:**
- `baseUrl` is computed from `import.meta.env.BASE_URL` — accessed via `const baseUrl = import.meta.env.BASE_URL` in `<script setup>`
- `navLinks` is a static array: `[{ label: 'Inicio', href: baseUrl + '/' }, { label: 'Blog', href: baseUrl + '/blog' }]`
- NO `<hr>` at the bottom — glass shadow provides visual separation
- `z-50` ensures header stays above Canvas and any overlapping content
- `cn()` from `clsx` + `tailwind-merge` — install both as deps

---

### `Footer.vue`

```ts
// Props: none
```

**Emits:** none

**Template structure:**
```html
<footer class="glass mt-20 py-8 text-center">
  <p class="font-body text-text-muted text-sm">
    © {{ currentYear }} FísicaFans — Todos los derechos reservados
  </p>
</footer>
```

**Key implementation notes:**
- `currentYear` = `new Date().getFullYear()` in `<script setup>`
- NO `<hr>` or `border-t` — top margin on the footer itself provides spacing
- Glass background matches header for visual consistency

---

### `Hero.vue` (Canvas particles)

```ts
// Props: none (data is internal)
```

**Emits:** none

**Key implementation notes:**

**Canvas lifecycle:**
1. `onMounted`: create `IntersectionObserver` watching `canvasRef.value`, initialize particles, start rAF if intersecting
2. `onUnmounted`: observer.disconnect(), cancel active rAF frame id
3. `isVisible` ref (boolean) — set to `true` when canvas enters viewport, `false` when it leaves
4. rAF loop: check `isVisible.value` at top of each frame; if `false`, do not re-schedule

**Particle initialization:**
```ts
const config: ParticleConfig = {
  count:      isMobile() ? 40 : 80,   // matchMedia('(max-width: 768px)')
  minRadius:  0.5,
  maxRadius:  2.0,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  speed:      0.3,
  colors:     ['#667eea', '#b9c3ff', '#fbbf24'],  // primary, primary-light, tertiary
};
```

**Canvas resize:** debounced (100ms) `resize` event listener on `window`. On resize: update `canvas.width` / `canvas.height` to `canvas.offsetWidth * devicePixelRatio`, reinitialize particle positions within new bounds.

**rAF draw loop (per frame):**
1. `ctx.clearRect(0, 0, width, height)`
2. For each particle:
   - Update `x += vx`, `y += vy`
   - Wrap: if `x < 0` → `x = width`; if `x > width` → `x = 0`; same for y
   - `ctx.beginPath()`
   - `ctx.arc(x, y, radius, 0, Math.PI * 2)`
   - `ctx.fillStyle` = hex with opacity injected via `globalAlpha` or RGBA string
   - `ctx.fill()`

**Static placeholder (SSR):** The `<canvas>` element is wrapped in a `<div>` with `style="background: #0d112a"` and a minimum height of `600px`. Before the canvas initializes, this dark background is visible — no layout shift.

**Template structure (simplified):**
```html
<section class="relative min-h-[600px] flex items-center justify-center overflow-hidden"
         style="background: #0d112a;">
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
  <div class="relative z-10 text-center max-w-3xl mx-auto px-6">
    <h1 class="font-space text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      FísicaFans
    </h1>
    <p class="font-body text-primary-light mt-4 text-lg">
      Explorando el universo a través de la física
    </p>
    <a :href="baseUrl + '/blog'"
       class="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-celestial-xl font-space font-semibold text-white hover:opacity-90 hover:scale-105 transition-all duration-200">
      Explorar el Blog
    </a>
  </div>
</section>
```

---

### `PhysicsCategories.vue`

```ts
// Props: none (data is hardcoded — categories don't come from a CMS)
```

**Emits:** none

**Internal data structure:**
```ts
interface CategoryData {
  slug: PhysicsCategory;
  title: string;
  description: string;
  icon: string;   // Unicode symbol or inline SVG string
  href: string;   // '#' placeholder in MVP
}
```

**Categories array (hardcoded in component):**
```ts
const categories: CategoryData[] = [
  { slug: 'termodinamica',     title: 'Termodinámica',    icon: '🌡️', description: 'Calor, entropía y los fundamentos del equilibrio térmico.',                href: '#' },
  { slug: 'mecanica-cuantica', title: 'Mecánica Cuántica', icon: '⚛️', description: 'El comportamiento extraño de la materia a escala subatómica.',            href: '#' },
  { slug: 'fisica-clasica',    title: 'Física Clásica',    icon: '⚙️', description: 'Las leyes de Newton y el movimiento del mundo macroscópico.',             href: '#' },
  { slug: 'electromagnetismo', title: 'Electromagnetismo', icon: '⚡', description: 'Campos eléctricos, magnéticos y las ecuaciones de Maxwell.',              href: '#' },
  { slug: 'relatividad',       title: 'Relatividad',       icon: '🌌', description: 'Espacio-tiempo, dilatación temporal y la velocidad de la luz.',           href: '#' },
];
```

> Icons are Unicode emoji — no external icon library required (lucide-vue-next is permitted but NOT required for MVP).

**Hover state (CSS via Tailwind utility):**
```html
<div :class="cn('glass rounded-celestial-lg p-6 cursor-pointer',
                 'transition-all duration-300',
                 'hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(102,126,234,0.4)]')">
```

> `hover:shadow-[0_0_20px_rgba(102,126,234,0.4)]` is an arbitrary Tailwind v3 value — this is valid in v3 (NOT v4 restriction).

**Grid layout:**
```html
<section class="max-w-6xl mx-auto px-6 py-16">
  <h2 class="font-space text-3xl font-bold text-text-primary text-center mb-12">
    Áreas de Física
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <CategoryCard v-for="cat in categories" :key="cat.slug" v-bind="cat" />
  </div>
</section>
```

---

### `PostCard.vue`

```ts
// Props
interface Props {
  title:       string;
  description: string;
  category:    PhysicsCategory;
  pubDate:     Date;
  slug:        string;  // used to build href
}
```

**Emits:** none

**Category color map:**
```ts
const categoryColors: Record<PhysicsCategory, string> = {
  'termodinamica':     '#f97316',
  'mecanica-cuantica': '#8b5cf6',
  'fisica-clasica':    '#3b82f6',
  'electromagnetismo': '#eab308',
  'relatividad':       '#ec4899',
};
```

**Key implementation notes:**
- `href` = `import.meta.env.BASE_URL + '/blog/' + slug`
- `pubDate` formatted via `new Date(pubDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })`
- Description truncated with `line-clamp-2` (Tailwind utility, requires `@tailwindcss/line-clamp` plugin OR Tailwind v3.3+ where it's built-in — use v3.3+)
- Entire card is wrapped in `<a :href="href">` for full-card click
- Category chip: `<span :style="{ backgroundColor: categoryColors[category] }" class="text-white text-xs font-space px-2 py-1 rounded-celestial">{{ category }}</span>`
- Use `style` prop for dynamic color (NOT arbitrary Tailwind class — this is a dynamic value)

---

### `TableOfContents.vue`

```ts
// Props
interface Props {
  headings: TocHeading[];
}

interface TocHeading {
  text: string;
  id:   string;  // matches the id attribute Astro injects on h2 elements
}
```

**Emits:** none

**Key implementation notes:**
- Headings are PASSED as props from `BlogPostLayout.astro` — NOT queried client-side in this component
- `BlogPostLayout.astro` uses `await entry.render()` which returns `headings` array — use those
- `isExpanded` ref (boolean, default `false` on mobile) — toggled by a button
- Desktop: always visible via `hidden md:block lg:block` + `sticky top-20`
- Mobile: toggle button shows/hides the list via `v-show="isExpanded || isDesktop"`
- `isDesktop` = `window.innerWidth >= 768` checked on mount (wrap in `onMounted` for SSR safety)

**Astro `headings` shape from `entry.render()`:**
```ts
// Astro built-in type
interface MarkdownHeading {
  depth:  number;
  slug:   string;  // this becomes the id
  text:   string;
}
```

Pass `headings.filter(h => h.depth === 2)` from layout to ToC component.

---

### `ReadingProgress.vue`

```ts
// Props: none
```

**Emits:** none

**Key implementation notes:**
- `progress` ref (number, 0–100) initialized to `0`
- `onMounted`: add `scroll` listener to `window`
- `onUnmounted`: remove `scroll` listener from `window`
- Scroll handler:
  ```ts
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  };
  ```
- Template:
  ```html
  <div class="fixed top-0 left-0 z-[60] h-[3px] transition-all duration-100"
       :style="{ width: progress + '%', background: 'linear-gradient(to right, #667eea, #ec4899)' }" />
  ```
- `z-[60]` — above the header (`z-50`)
- Width driven via `style` prop (dynamic value — NOT Tailwind arbitrary class per project rules)

---

## 6. Layout Contracts

### `BaseLayout.astro`

```ts
// Props
interface Props {
  title:       string;   // page title — rendered as "{title} — FísicaFans"
  description?: string;  // meta description — defaults to site description
}
```

**Slots:** `default` (main page content between Header and Footer)

**Meta tags included:**
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<meta name="description" content={description ?? 'Blog de física: termodinámica, cuántica, relatividad y más.'}`
- `<title>{title} — FísicaFans</title>`
- `<link rel="icon" type="image/svg+xml" href={import.meta.env.BASE_URL + '/favicon.svg'}>`
- `<html lang="es" class="dark">` — `lang` and `dark` class always present

**Font loading (in `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
```

**CSS imports (in `<head>`):**
```astro
import 'katex/dist/katex.min.css';
import '../assets/styles/global.css';
```

**Full structure:**
```astro
---
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import 'katex/dist/katex.min.css';
import '../assets/styles/global.css';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Blog de física educativa — FísicaFans' } = Astro.props;
---
<!doctype html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} — FísicaFans</title>
    <link rel="icon" type="image/svg+xml" href={import.meta.env.BASE_URL + '/favicon.svg'} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body class="font-body text-text-primary bg-space-bg min-h-screen">
    <Header client:load />
    <main>
      <slot />
    </main>
    <Footer client:load />
  </body>
</html>
```

> `Header` and `Footer` use `client:load` (not `client:visible`) because they must be interactive immediately. The Canvas hero uses `client:visible`.

---

### `BlogPostLayout.astro`

```ts
// Props (from MDX frontmatter via Astro Content Collections)
interface Props {
  entry: CollectionEntry<'blog'>;  // full collection entry including rendered content
}
```

**Slots:** none (content rendered via `<Content />` component from entry.render())

**Meta tags included (in addition to BaseLayout):**
- Inherits all BaseLayout meta tags
- `<meta property="og:title">` — set to post title (MVP: basic implementation)

**Full structure:**
```astro
---
import BaseLayout from './BaseLayout.astro';
import ReadingProgress from '../components/blog/ReadingProgress.vue';
import TableOfContents from '../components/blog/TableOfContents.vue';
import type { CollectionEntry } from 'astro:content';

interface Props {
  entry: CollectionEntry<'blog'>;
}
const { entry } = Astro.props;
const { Content, headings } = await entry.render();
const h2Headings = headings.filter(h => h.depth === 2).map(h => ({ text: h.text, id: h.slug }));

const formattedDate = entry.data.pubDate.toLocaleDateString('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric',
});

const categoryColors: Record<string, string> = {
  'termodinamica':     '#f97316',
  'mecanica-cuantica': '#8b5cf6',
  'fisica-clasica':    '#3b82f6',
  'electromagnetismo': '#eab308',
  'relatividad':       '#ec4899',
};
---
<BaseLayout title={entry.data.title}>
  <ReadingProgress client:load />
  <div class="max-w-6xl mx-auto px-6 py-12 lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
    <article class="min-w-0">
      <!-- Category chip -->
      <span style={{ backgroundColor: categoryColors[entry.data.category] }}
            class="inline-block text-white text-xs font-space px-3 py-1 rounded-celestial mb-4">
        {entry.data.category}
      </span>
      <!-- Post title -->
      <h1 class="font-space text-4xl font-bold text-text-primary mb-3">
        {entry.data.title}
      </h1>
      <!-- Date -->
      <time class="font-body text-text-muted text-sm" datetime={entry.data.pubDate.toISOString()}>
        {formattedDate}
      </time>
      <!-- MDX body -->
      <div class="prose prose-invert prose-lg mt-10 max-w-none">
        <Content />
      </div>
    </article>
    <!-- Sidebar ToC -->
    <aside class="hidden lg:block">
      <TableOfContents headings={h2Headings} client:load />
    </aside>
  </div>
</BaseLayout>
```

> `prose prose-invert` requires `@tailwindcss/typography` — add it to `tailwind.config.cjs` plugins and install as dev dep.  
> ToC mobile collapse is handled inside `TableOfContents.vue` itself. The `<aside>` is hidden on mobile via `hidden lg:block`; the mobile ToC toggle button should be added INSIDE the `<article>` above the content on mobile. This is a layout tradeoff — the mobile ToC toggle lives in `BlogPostLayout.astro` as a second `<TableOfContents>` instance with `class="lg:hidden"`.

---

## 7. Page Routes

| URL | File | Data Source | Notes |
|-----|------|-------------|-------|
| `/Miweb/` | `src/pages/index.astro` | Static (hardcoded categories) | Hero + PhysicsCategories |
| `/Miweb/blog/` | `src/pages/blog/index.astro` | `getCollection('blog')` | Filter `draft: false`, sort by pubDate desc |
| `/Miweb/blog/[...slug]/` | `src/pages/blog/[...slug].astro` | `getStaticPaths()` from `getCollection('blog')` | Render via BlogPostLayout, 404 on unknown slug (static 404.html) |
| `/Miweb/robots.txt` | `public/robots.txt` | Static file | Served as-is by Astro |
| `/Miweb/sitemap-index.xml` | Generated by `@astrojs/sitemap` | Build-time | Auto-generated, no manual page needed |

**`src/pages/index.astro` pattern:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/home/Hero.vue';
import PhysicsCategories from '../components/home/PhysicsCategories.vue';
---
<BaseLayout title="Inicio">
  <Hero client:visible />
  <PhysicsCategories />
</BaseLayout>
```

**`src/pages/blog/index.astro` pattern:**
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/blog/PostCard.vue';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const posts = allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="Blog">
  <section class="max-w-6xl mx-auto px-6 py-12">
    <h1 class="font-space text-4xl font-bold text-text-primary mb-10">Blog</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard
          title={post.data.title}
          description={post.data.description}
          category={post.data.category}
          pubDate={post.data.pubDate}
          slug={post.slug}
          client:load
        />
      ))}
    </div>
  </section>
</BaseLayout>
```

**`src/pages/blog/[...slug].astro` pattern:**
```astro
---
import { getCollection } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map(entry => ({
    params: { slug: entry.slug },
    props:  { entry },
  }));
};

const { entry } = Astro.props;
---
<BlogPostLayout entry={entry} />
```

---

## 8. Canvas Hero Design

**File:** `src/components/home/Hero.vue`

### Initialization

```ts
function isMobile(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

function createParticle(canvasWidth: number, canvasHeight: number, config: ParticleConfig): Particle {
  return {
    x:       Math.random() * canvasWidth,
    y:       Math.random() * canvasHeight,
    radius:  config.minRadius + Math.random() * (config.maxRadius - config.minRadius),
    opacity: config.minOpacity + Math.random() * (config.maxOpacity - config.minOpacity),
    vx:      (Math.random() - 0.5) * 2 * config.speed,
    vy:      (Math.random() - 0.5) * 2 * config.speed,
    color:   config.colors[Math.floor(Math.random() * config.colors.length)],
  };
}
```

### Canvas Sizing

```ts
function resizeCanvas(canvas: HTMLCanvasElement): void {
  const dpr = window.devicePixelRatio ?? 1;
  canvas.width  = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
}
```

**Debounce resize:** 100ms using `setTimeout` — clear previous timeout before setting new one.

### rAF Loop

```ts
function drawFrame(
  ctx:     CanvasRenderingContext2D,
  w:       number,   // logical width (offsetWidth, not canvas.width)
  h:       number,   // logical height
  particles: Particle[],
): void {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    // Wrap edges
    if (p.x < 0)  p.x = w;
    if (p.x > w)  p.x = 0;
    if (p.y < 0)  p.y = h;
    if (p.y > h)  p.y = 0;
    // Draw
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
```

### IntersectionObserver Pattern

```ts
const isVisible  = ref(false);
const rafId      = ref<number | null>(null);
const canvasRef  = ref<HTMLCanvasElement | null>(null);
let   observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!canvasRef.value) return;
  resizeCanvas(canvasRef.value);
  const config = { /* ... */ count: isMobile() ? 40 : 80, ... };
  const particles = Array.from({ length: config.count }, () =>
    createParticle(canvasRef.value!.offsetWidth, canvasRef.value!.offsetHeight, config)
  );

  observer = new IntersectionObserver(
    ([entry]) => { isVisible.value = entry.isIntersecting; },
    { threshold: 0.1 }
  );
  observer.observe(canvasRef.value);

  const loop = () => {
    if (!isVisible.value) {
      rafId.value = null;
      return;                           // pause — do NOT re-schedule
    }
    const ctx = canvasRef.value!.getContext('2d')!;
    drawFrame(ctx, canvasRef.value!.offsetWidth, canvasRef.value!.offsetHeight, particles);
    rafId.value = requestAnimationFrame(loop);
  };

  // Watch isVisible to restart loop when re-entering viewport
  watch(isVisible, (visible) => {
    if (visible && rafId.value === null) {
      rafId.value = requestAnimationFrame(loop);
    }
  });
});

onUnmounted(() => {
  if (rafId.value !== null) cancelAnimationFrame(rafId.value);
  observer?.disconnect();
});
```

> When `isVisible` becomes `false`, the loop exits by not re-scheduling. When `isVisible` becomes `true` again, the `watch` restarts it. This avoids polling in rAF.

---

## 9. Global CSS

**File:** `src/assets/styles/global.css`

```css
/* ─── Tailwind Directives ──────────────────────────────────────────────────── */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Base ─────────────────────────────────────────────────────────────────── */
html,
body {
  background-color: #0d112a;
  color: #f9fafb;
  font-family: 'Manrope', sans-serif;
  min-height: 100vh;
}

/* ─── Glassmorphism Utility ─────────────────────────────────────────────────── */
/* NO @apply — plain CSS only (REQ-2-04, REQ-2-06) */
.glass {
  background:             rgba(102, 126, 234, 0.05);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter:         blur(16px);
  border:                  1px solid rgba(102, 126, 234, 0.2);
  box-shadow:              0 8px 32px rgba(102, 126, 234, 0.1);
}

/* ─── Scrollbar (dark, primary-tinted) ─────────────────────────────────────── */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0d112a;
}

::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}

/* Firefox scrollbar */
* {
  scrollbar-width:  thin;
  scrollbar-color:  rgba(102, 126, 234, 0.4) #0d112a;
}

/* ─── KaTeX Dark Theme Overrides ────────────────────────────────────────────── */
.katex {
  color: #f9fafb;
}

.katex-display {
  margin:     1.5em 0;
  padding:    1em 1.5em;
  background: rgba(102, 126, 234, 0.05);
  border:     1px solid rgba(102, 126, 234, 0.15);
  border-radius: 8px;
  overflow-x: auto;
}

/* ─── Smooth Scroll ─────────────────────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}
```

---

## 10. GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy FísicaFans to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir:  ./dist
          publish_branch: gh-pages
```

> `pnpm/action-setup@v4` is the current major. `pnpm install --frozen-lockfile` ensures the lockfile is respected — no auto-updates in CI (REQ-5-07).  
> `permissions: contents: write` is required for `peaceiris/actions-gh-pages` to push to the `gh-pages` branch.  
> The spec says `peaceiris/actions-gh-pages@v4` — use v4, NOT v3 (spec update from original proposal).

---

## 11. MDX Post Template

**Example file:** `src/content/blog/introduccion-a-la-termodinamica.mdx`

```mdx
---
title: "Introducción a la Termodinámica"
description: "Exploramos los principios fundamentales de la termodinámica: temperatura, calor, trabajo y los tres pilares que rigen la energía en el universo."
category: termodinamica
pubDate: 2025-11-15
draft: false
heroImage: /images/termodinamica/hero-termodinamica.webp
---

import { Image } from 'astro:assets';

La **termodinámica** es la rama de la física que estudia las transformaciones de la energía,
especialmente la conversión entre calor y trabajo. Sus leyes fundamentales describen desde
el comportamiento de los motores hasta la evolución del universo mismo.

## Primera Ley: Conservación de la Energía

La primera ley de la termodinámica es, en esencia, el principio de conservación de energía
aplicado a sistemas termodinámicos. Establece que la energía interna de un sistema cerrado
cambia cuando se transfiere calor o se realiza trabajo sobre él.

Expresada de forma compacta como ecuación inline: la variación de energía interna es $\Delta U = Q - W$,
donde $Q$ es el calor absorbido por el sistema y $W$ es el trabajo realizado por el sistema.

## Segunda Ley: Entropía y la Dirección del Tiempo

La segunda ley introduce el concepto de **entropía** ($S$), una medida del desorden o la
dispersión de la energía en un sistema. Esta ley establece una dirección en el tiempo:
los procesos naturales tienden a aumentar la entropía total del universo.

La expresión diferencial para la variación de entropía en un proceso reversible es:

$$
dS = \frac{\delta Q_{rev}}{T}
$$

Donde $T$ es la temperatura absoluta en Kelvin y $\delta Q_{rev}$ es el calor transferido
de forma reversible. En procesos irreales (irreversibles), la entropía siempre aumenta: $\Delta S \geq 0$.

## Imagen representativa

<Image
  src="/Miweb/images/termodinamica/hero-termodinamica.webp"
  alt="Diagrama de ciclo termodinámico con curvas P-V"
  width={800}
  height={400}
  loading="lazy"
/>

## Tercer Principio y Temperatura Absoluta

El tercer principio establece que la entropía de un cristal perfecto tiende a cero cuando
la temperatura se aproxima al cero absoluto ($T \to 0\,K$). Esto fija una referencia absoluta
para la entropía y tiene implicaciones profundas en criogenia y física de bajas temperaturas.

La relación entre temperatura en Celsius y Kelvin es: $T(K) = T(°C) + 273.15$.

## Conclusión

Los tres principios de la termodinámica forman un sistema coherente que describe cómo la
energía fluye, se transforma y se degrada. Comprender estas leyes es esencial para cualquier
ingeniero, físico o estudiante que quiera entender los límites fundamentales de la tecnología
y la naturaleza del tiempo físico.
```

> **Nota sobre `heroImage`:** el path en el frontmatter es relativo a `public/` — NO incluye `/Miweb`. La ruta `/images/...` se resolverá correctamente en build. Sin embargo, dentro del MDX, cuando se usa `<Image>` de Astro con una ruta estática en `public/`, se debe usar el path completo incluyendo la base: `src="/Miweb/images/..."`. Una alternativa es usar `import.meta.env.BASE_URL + '/images/...'` en el template, pero en MDX el `import.meta.env` está disponible. Para simplificar el MVP, usa `<img>` estándar con `loading="lazy"` — el `<Image />` de Astro está diseñado para imágenes en `src/assets/`, no `public/`.

---

## 12. Dependency List

### `package.json`

```json
{
  "name": "fisicafans",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev":     "astro dev",
    "build":   "astro build",
    "preview": "astro preview",
    "astro":   "astro"
  },
  "dependencies": {
    "astro":             "^4.15.0",
    "@astrojs/vue":      "^4.5.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/mdx":      "^3.1.0",
    "@astrojs/sitemap":  "^3.1.0",
    "vue":               "^3.4.0",
    "tailwindcss":       "^3.4.0",
    "remark-math":       "^5.1.0",
    "rehype-katex":      "^7.0.0",
    "katex":             "^0.16.0",
    "zod":               "^3.23.0",
    "clsx":              "^2.1.0",
    "tailwind-merge":    "^2.3.0"
  },
  "devDependencies": {
    "@types/node":            "^20.14.0",
    "sharp":                  "^0.33.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

> `clsx` + `tailwind-merge` provide the `cn()` utility required by project standards.  
> `@tailwindcss/typography` enables `prose prose-invert` classes in `BlogPostLayout.astro`.  
> `sharp` is needed by Astro's built-in image optimization pipeline at build time.

**`cn()` helper — create `src/utils/cn.ts`:**
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

Import as `import { cn } from '@/utils/cn'` in any component.

---

## Implementation Notes for the Developer

### Critical order of operations

1. **Phase 1 first**: Convert the 698 KB image BEFORE writing any Astro components. If you skip this, the image will never meet the <150 KB constraint because there's no optimization pipeline yet.

2. **KaTeX CSS import**: Must go in `BaseLayout.astro` `<head>`, NOT in `global.css`. Importing it in CSS causes double-processing issues with Astro's bundler.

3. **`base: '/Miweb'` — the single biggest footgun**: Every `href`, `src`, and `fetch()` URL must be prefixed with `import.meta.env.BASE_URL`. Forgetting this on even one link breaks navigation on the deployed site while working fine locally. Verify with `pnpm build && pnpm preview`.

4. **`client:visible` vs `client:load`**:
   - `Hero.vue` → `client:visible` (Canvas, heavy, above the fold but deferred)
   - `Header.vue` → `client:load` (nav must be interactive immediately)
   - `Footer.vue` → `client:load` (year must be current)
   - `ReadingProgress.vue` → `client:load` (must track scroll from page load)
   - `TableOfContents.vue` → `client:load` (must respond to scroll position immediately)
   - `PostCard.vue` → `client:load` (needs click handlers)
   - `PhysicsCategories.vue` → no `client:` needed if no interactivity — static render is fine

5. **`old_version/` exclusion**: Astro only processes files under `src/` and `public/`. The `old_version/` directory at the root is already excluded. No `.astroignore` or special config needed.

6. **`_test-katex.mdx` must have `draft: true`**: The `getCollection` filter in blog pages uses `!data.draft`. If this file lacks `draft: true`, it will appear in the listing and potentially break static path generation if it has unusual frontmatter.

7. **Image paths in MDX posts**: For images in `public/`, use standard `<img>` with `loading="lazy"` and manually prefix with `/Miweb/`. Astro's `<Image />` component is optimized for images in `src/assets/` — using it with `public/` paths works but adds complexity without benefit for MVP.

8. **`@tailwindcss/typography` plugin**: Must be added to `tailwind.config.cjs` plugins array:
   ```js
   plugins: [require('@tailwindcss/typography')],
   ```
   Without it, `prose` classes silently do nothing.

9. **`darkMode: 'class'` + always-dark**: The `<html class="dark">` in `BaseLayout.astro` activates all `dark:` Tailwind variants globally. No toggle logic is needed — dark mode is the only mode.

10. **`z.coerce.date()` in Zod schema**: This is critical. Without `.coerce`, YAML frontmatter dates (which are parsed as strings by Astro) will fail Zod validation. `.coerce.date()` handles string-to-Date conversion automatically.
