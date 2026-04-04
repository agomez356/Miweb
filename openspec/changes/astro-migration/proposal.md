# Proposal: FísicaFans — Migración a Astro + Vue + TailwindCSS

## Intent

Migrar FísicaFans de HTML/CSS estático sin framework a un stack moderno basado en Astro 4, Vue 3 y TailwindCSS 3, desplegado en GitHub Pages, con el objetivo de establecer una base de contenido escalable, un sistema de diseño coherente ("The Celestial Archive") y soporte nativo para ecuaciones físicas vía KaTeX en MDX.

## Background

El sitio actual es HTML/CSS puro sin sistema de build, sin package.json, sin gestión de dependencias y sin pipeline de contenido. Tiene 5 secciones de física (Termodinámica, Mecánica Cuántica, Física Clásica, Electromagnetismo, Relatividad) y 6 imágenes en `Imagenes/`, una de las cuales pesa 698 KB — un problema crítico de performance. No existe design system, las fuentes no son consistentes, y agregar contenido nuevo requiere editar HTML a mano.

La migración resuelve tres problemas concretos:
1. **Contenido**: MDX + Content Collections permite escribir posts de física con ecuaciones LaTeX sin tocar HTML.
2. **Performance**: optimización de imágenes, bundle <200 KB, FCP <1 s.
3. **Mantenibilidad**: design tokens centralizados, componentes reutilizables, pipeline automatizado.

## Scope

### In Scope (MVP — Fases 1–5)

- Scaffold Astro 4 con `output: 'static'`, configurado para GitHub Pages (`/Miweb`)
- Conversión de imagen 698 KB a WebP <200 KB (crítico — Fase 1)
- Validación del pipeline KaTeX en MDX (Fase 1)
- `BaseLayout.astro` con tokens de diseño, fuentes Space Grotesk + Manrope, y glassmorphism utilities
- Configuración TailwindCSS con tokens de "The Celestial Archive"
- Home page: hero Canvas particles (pure Canvas API) + grid `PhysicsCategories`
- Blog system: Content Collections, `BlogPostLayout.astro`, `PostCard.astro`, routing dinámico
- 5 posts MDX migrados con ecuaciones KaTeX y contenido en español
- Despliegue en GitHub Pages vía GitHub Actions (`gh-pages` branch)

### In Scope (Fase 2 — post-MVP)

- `RelativityVisualizer.vue` — primer componente interactivo (mejor ratio wow/complejidad)
- `WaveSimulator.vue` — segundo componente interactivo
- Páginas de categoría por sección física
- Página About

### In Scope (Fase 3 — Polish)

- Sweep de optimización de imágenes restantes
- OG tags, sitemap (`@astrojs/sitemap`), robots.txt
- README profesional
- 3 componentes Canvas restantes

### Out of Scope

- Docker — eliminado del alcance completo
- ThemeToggle / modo claro — diseño dark-only, sin variante light
- Chart.js — reemplazado por Canvas API puro
- Vercel u otro hosting — GitHub Pages únicamente
- Custom domain — URL de GitHub Pages únicamente (`agomez356.github.io/Miweb`)
- MathJax — KaTeX únicamente
- Página About — Fase 2, no MVP
- Server-Side Rendering (SSR) — sitio 100% estático

## Approach

### Architecture

**Stack:**
- **Astro 4** — framework principal; islands architecture para hidratar solo los componentes Vue que lo necesiten (`client:visible` para Canvas)
- **Vue 3** — UI interactiva (visualizadores físicos en Fase 2); en MVP solo para componentes triviales si aplica
- **TailwindCSS 3.x** — utilidades CSS; NO v4
- **TypeScript** — `strict: true` en todo el proyecto; `unknown` sobre `any`
- **MDX** — posts de blog con ecuaciones KaTeX inlineadas
- **KaTeX** — renderizado de ecuaciones; plugin para Astro/remark

**Rationale:**
- Astro es la única opción que genera HTML estático puro compatible con GitHub Pages sin configuración especial de SSR
- Islands architecture significa que el Canvas particle hero NO hidrata el DOM innecesariamente — solo el componente Canvas se activa con `client:visible`
- TailwindCSS 3.x (no v4) porque la API de v4 es incompatible con el patrón de tokens que usa `The Celestial Archive` (variables CSS en `tailwind.config.js`)

**Estructura de directorios:**
```
src/
  components/
    layout/       # BaseLayout, Header, Footer
    home/         # HeroCanvas, PhysicsCategories, CategoryCard
    blog/         # PostCard, BlogPostLayout
    interactive/  # RelativityVisualizer.vue (Fase 2)
  content/
    blog/         # 5 .mdx posts
  layouts/
  pages/
    index.astro
    blog/
      [...slug].astro
  styles/
    global.css    # tokens + glassmorphism utils
public/
  images/         # WebP optimizadas
```

### Design System

"The Celestial Archive" — dark mode only, sin variante light.

| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | `#667eea` | CTAs, links activos, bordes focus |
| `primary-light` | `#b9c3ff` | Texto sobre fondos oscuros, hover states |
| `secondary` | `#ec4899` | Acentos, tags de categoría |
| `secondary-light` | `#ffb0cd` | Hover sobre secondary |
| `tertiary` / `star` | `#fbbf24` | Estrellas, ratings, highlights especiales |
| `background` | `#0d112a` | Fondo global — canónico de Stitch |
| `success` | `#10b981` | Estados de éxito/utilidad ÚNICAMENTE |
| `font-headline` | Space Grotesk | Headlines, labels, nav |
| `font-body` | Manrope | Cuerpo de texto, párrafos |
| `radius-base` | 8px | Elementos base |
| `radius-lg` | 16px | Cards, modales |
| `radius-xl` | 24px | Overlays grandes |
| `blur-glass` | 16–24px | `backdrop-blur` en glassmorphism |

**Glassmorphism:** `backdrop-blur-[16px]` a `backdrop-blur-[24px]`, sin bordes sólidos, sombras tintadas con `primary` (no negro puro).

**Reglas TailwindCSS:**
- `cn()` para clases condicionales/dinámicas
- Sin `var()` dentro de `className` — variables CSS via `style` prop o CSS directamente
- Sin `@apply` en componentes — componer utilidades en JSX/template

### GitHub Pages Setup

`astro.config.mjs` requerido:

```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agomez356.github.io',
  base: '/Miweb',
  output: 'static',
  integrations: [vue(), tailwind(), mdx(), sitemap()],
});
```

**Reglas críticas:**
- Todos los links internos deben usar `import.meta.env.BASE_URL` como prefijo
- Build output va a `dist/` — deploy via GitHub Actions a branch `gh-pages`
- Sin features server-side (SSR) — output 100% estático
- GitHub Actions workflow: `actions/checkout` → `pnpm install` → `pnpm build` → `peaceiris/actions-gh-pages`

### Content Strategy

- Idioma: **español** en todo el contenido (posts, UI, metadatos)
- Formato: **MDX** con frontmatter tipado vía Content Collections schema (Zod)
- Ecuaciones: **KaTeX** vía `remark-math` + `rehype-katex` — NO MathJax
- Imágenes en posts: WebP, <200 KB, lazy-load nativo (`loading="lazy"`)
- 5 categorías = 5 posts iniciales (uno por sección de física)
- Slug en español + fecha en frontmatter para ordering

**Schema de Content Collection (blog):**
```ts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['termodinamica', 'mecanica-cuantica', 'fisica-clasica', 'electromagnetismo', 'relatividad']),
    pubDate: z.date(),
    heroImage: z.string().optional(),
  }),
});
```

## Risks & Mitigations

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Links rotos en GitHub Pages por `base: '/Miweb'` | Alto — sitio inutilizable | Usar `import.meta.env.BASE_URL` en TODOS los links; test en preview local con `--base /Miweb` |
| Canvas particles hero degrada FCP | Alto — experiencia y SEO | Cargar Canvas con `client:visible` + IntersectionObserver; placeholder estático mientras carga |
| KaTeX CSS no cargado correctamente en build estático | Medio — ecuaciones sin estilo | Importar `katex/dist/katex.min.css` globalmente en `BaseLayout.astro` |
| Imagen 698 KB impacta LCP antes de ser convertida | Alto — Core Web Vitals | Conversión a WebP es tarea #1 de Fase 1, bloqueante para el resto |
| Fuentes Space Grotesk + Manrope impactan TTFB | Medio — performance | `<link rel="preconnect">` a Google Fonts + `font-display: swap` |
| pnpm lockfile inconsistente entre entornos | Bajo | `engines.node` fijo en `package.json`; CI usa exactamente la misma versión |
| Vite/Astro no procesa correctamente archivos MDX complejos | Medio | Probar pipeline KaTeX en Fase 1 con ecuación de prueba antes de migrar los 5 posts |

## Success Criteria

| Criterio | Target | Medición |
|----------|--------|----------|
| Lighthouse Performance | ≥ 95 | `pnpm lighthouse` o PageSpeed Insights post-deploy |
| First Contentful Paint (FCP) | < 1 s | Lighthouse report en mobile simulado |
| Bundle JS total | < 200 KB | `pnpm build` → revisar `dist/_astro/*.js` |
| Imágenes todas WebP | 100% | No existe ningún `.jpg`/`.png` en `public/images/` |
| Posts publicados | 5 | Todos visibles en `/blog` con ecuaciones KaTeX renderizadas |
| Sitio funcional en GitHub Pages | 100% | Navegar `agomez356.github.io/Miweb` sin 404 ni assets rotos |
| Canvas particles hero funciona | ✓ | Visible en home sin errores de consola |
| Build reproducible en CI | ✓ | GitHub Actions pasa en `main` → deploy automático |

## Dependencies

| Paquete | Versión | Rol |
|---------|---------|-----|
| `astro` | `^4.x` | Framework principal |
| `@astrojs/vue` | `^4.x` | Integración Vue 3 |
| `@astrojs/tailwind` | `^5.x` | Integración TailwindCSS |
| `@astrojs/mdx` | `^3.x` | Soporte MDX en Content Collections |
| `@astrojs/sitemap` | `^3.x` | Generación de sitemap |
| `vue` | `^3.x` | UI interactiva (Fase 2) |
| `tailwindcss` | `^3.x` | CSS utilities — NO v4 |
| `remark-math` | `^5.x` | Parsear `$...$` y `$$...$$` en MDX |
| `rehype-katex` | `^7.x` | Renderizar ecuaciones con KaTeX |
| `katex` | `^0.16.x` | Motor KaTeX (peer dep de rehype-katex) |
| `typescript` | `^5.x` | Tipado estricto |
| `zod` | `^3.x` | Validación de Content Collections schema |

**Dev dependencies:**
| Paquete | Versión | Rol |
|---------|---------|-----|
| `@types/node` | `^20.x` | Tipos Node para scripts |
| `sharp` | `^0.33.x` | Optimización de imágenes en build |

## Phases Summary

| Fase | Deliverable | Criterio de completitud |
|------|-------------|------------------------|
| **1 — Scaffold** | Proyecto Astro 4 inicializado, imagen 698 KB → WebP, pipeline KaTeX validado | `pnpm dev` corre sin errores; imagen WebP <200 KB; ecuación de prueba renderiza en MDX |
| **2 — Design System** | `BaseLayout.astro`, config Tailwind con tokens Celestial Archive, fuentes, glassmorphism util | Storybook o página de prueba muestra tokens, fuentes y glassmorphism correctamente |
| **3 — Home Page** | Hero Canvas particles + grid `PhysicsCategories` | Home visible en `/`, canvas carga con `client:visible`, 5 categorías clickeables |
| **4 — Blog System** | Content Collections schema, `BlogPostLayout`, `PostCard`, routing `[...slug]` | Navegar a `/blog/[slug]` carga un post con layout y ecuaciones |
| **5 — Contenido + Deploy** | 5 posts MDX migrados, GitHub Actions deploy, sitio live en GitHub Pages | `agomez356.github.io/Miweb/blog` muestra 5 posts; Lighthouse ≥ 95 |
| **6 — Visualizadores (Fase 2)** | `RelativityVisualizer.vue`, `WaveSimulator.vue`, páginas de categoría, About | Componentes interactivos funcionan con `client:visible` sin degradar FCP |
| **7 — Polish (Fase 3)** | OG tags, sitemap, robots.txt, README, restantes Canvas | Lighthouse SEO = 100; sitemap en `sitemap-index.xml` |
