# AGENTS.md

Instrucciones para agentes de código que trabajan en **FísicaFans** (`agomez356/Miweb`).

Si este archivo contradice a `CLAUDE.md` o a `PLAN_MIGRACION_ASTRO.md`, manda este archivo y el código en `src/`. Esos documentos describen el sitio HTML anterior y decisiones que ya no aplican (npm, Vercel, Chart.js, MathJax, modo claro, Docker).

## Qué es este repositorio

Blog educativo de física en español. Sitio estático generado con Astro 4, islas Vue 3 y Tailwind CSS 3. Se publica en GitHub Pages en `https://agomez356.github.io/Miweb` (`base: '/Miweb'`).

El MVP (fases 1–5 de `openspec/changes/astro-migration/`) está implementado y archivado. El sitio ya no es el HTML de `old_version/`.

## Comandos

Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`, Node 20, pnpm 10 en CI). No uses npm ni yarn.

```bash
pnpm install
pnpm dev        # http://localhost:4321/Miweb/
pnpm build      # debe terminar en 0 antes de dar por cerrado un cambio
pnpm preview
pnpm format     # prettier
```

`pnpm build` escribe en `dist/` con las rutas bajo `/Miweb`. El workflow `.github/workflows/deploy.yml` instala con `pnpm install --frozen-lockfile` y despliega `dist/` a GitHub Pages en cada push a `main`.

## Mapa del código

```
src/pages/index.astro                 Home
src/pages/blog/index.astro            Índice del blog
src/pages/blog/[...slug].astro        Post (getStaticPaths, excluye draft)
src/layouts/BaseLayout.astro          HTML, fuentes, KaTeX CSS, SEO básico
src/layouts/BlogPostLayout.astro      Progreso de lectura, TOC, chip de categoría
src/components/common/                Header.vue, Footer.vue
src/components/home/                  Hero.vue, PhysicsCategories.vue
src/components/blog/                  PostCard.vue, ReadingProgress.vue, TableOfContents.vue
src/content/config.ts                 Schema Zod de la colección blog
src/content/blog/*.mdx                Posts en español
src/assets/styles/global.css          Fondo, scrollbar y clase .glass
src/utils/cn.ts                       clsx + tailwind-merge
src/utils/formatDate.ts               Fechas en es-ES
src/types/index.ts                    PhysicsCategory, PostFrontmatter, partículas
public/images/                        Imágenes publicadas
public/robots.txt
old_version/                          Copia del sitio HTML original. No editarla.
astro.config.mjs
tailwind.config.cjs                   Tailwind 3, CommonJS
```

Alias TypeScript: `@/*` → `src/*`. `tsconfig.json` extiende `astro/tsconfigs/strict`.

## Reglas que no se negocian

### Sitio estático y base path

- `output: 'static'` en `astro.config.mjs`. No añadas SSR, adapters ni endpoints de servidor.
- `site` es `https://agomez356.github.io` y `base` es `/Miweb`.
- Todo enlace interno lleva el prefijo de base. En Vue: `const base = import.meta.env.BASE_URL`. En Astro usa `Astro.site`, `Astro.url` o el mismo `BASE_URL`. Un `href="/blog"` se rompe en GitHub Pages.
- Hosting: solo GitHub Pages. No configures Vercel ni un dominio propio.

### Stack fijado

- Astro 4, Vue 3 (`<script setup lang="ts">`), Tailwind CSS **3.x** (no v4).
- TypeScript strict. Prohibido `any`. Estrecha `unknown` antes de usarlo.
- MDX con `remark-math` y `rehype-katex`. Ecuaciones solo con KaTeX, nunca MathJax.
- El CSS de KaTeX vive en el `<head>` de `BaseLayout.astro` (CDN 0.16.9). No lo muevas a `global.css`.
- Zod 3 en `src/content/config.ts`. No migres el schema a Zod 4.
- Sin Chart.js, sin React, sin Docker y sin toggle de tema.

### Diseño: The Celestial Archive

Modo oscuro único. `<html lang="es" class="dark">`. No crees variante clara ni `ThemeToggle`.

Tokens en `tailwind.config.cjs`. Úsalos en lugar de hex sueltos en los componentes:

| Token | Hex | Uso |
| --- | --- | --- |
| `background` / `space-bg` | `#0d112a` | Fondo |
| `surface` | `#1a1e37` | Superficies |
| `primary` | `#667eea` | Acentos y links |
| `primary-light` | `#b9c3ff` | Texto sobre oscuro |
| `secondary` | `#ec4899` | Acento rosa |
| `tertiary` / `star` | `#fbbf24` | Acento ámbar |
| `aurora` | `#10b981` | Acento verde |
| `text-primary` | `#f9fafb` | Texto principal |
| `text-secondary` | `#9ca3af` | Texto secundario |

- Títulos: `font-space` (Space Grotesk). Cuerpo: `font-body` (Manrope).
- Radios: `rounded-celestial`, `rounded-celestial-lg`, `rounded-celestial-xl`.
- Cristal: clase `.glass` de `global.css`. No reescribas el blur en cada componente y no uses `@apply`.
- Clases condicionales: `cn()` de `@/utils/cn`.
- Valores dinámicos (ancho de la barra de progreso, color de categoría): atributo `style`, no `var()` dentro de una clase de Tailwind.
- Header y footer no llevan `<hr>` ni un borde sólido a todo lo ancho.

Colores de categoría, ya definidos en `PostCard.vue`. Reutiliza el mapa:

- `termodinamica` `#ec4899`
- `mecanica-cuantica` `#667eea`
- `fisica-clasica` `#fbbf24`
- `electromagnetismo` `#10b981`
- `relatividad` `#b9c3ff`

Las tarjetas de `PhysicsCategories.vue` apuntan a `href="#"`. Son un marcador hasta que existan páginas de categoría. No las conviertas en rutas que aún no existen.

### Vue e islas

- Hidrata el Canvas con `client:visible`. `Hero` ya lo hace.
- Lo que depende de `window` o del scroll (`Header`, `ReadingProgress`, `TableOfContents`) se engancha en `onMounted`. El HTML estático tiene que ser válido sin JavaScript.
- Animaciones Canvas: `IntersectionObserver` para arrancar y parar `requestAnimationFrame`, limpieza en `onUnmounted` (listeners, observadores y frames) y tamaño consciente de `devicePixelRatio`.
- Composables nuevos: prefijo `use`, devuelven `ref` o `computed`, y viven junto al componente hasta que haya un segundo consumidor.

### Contenido

Los posts van en `src/content/blog/*.mdx`. El frontmatter tiene que validar este schema:

```yaml
title: string
description: string
category: termodinamica | mecanica-cuantica | fisica-clasica | electromagnetismo | relatividad
pubDate: YYYY-MM-DD
draft: false
heroImage: /images/...   # opcional
```

- El texto de cara al lector va en español. Las fechas pasan por `formatDate` (`es-ES`, por ejemplo «15 de marzo de 2024»).
- `draft: true` no entra en `getStaticPaths` ni en el índice. `_test-katex.mdx` se queda en borrador.
- Matemáticas: `$...$` en línea y `$$...$$` en bloque. Fracciones con `\frac{}{}`. Vectores con `\vec{}` o `\mathbf{}`. Solo el subconjunto que soporta KaTeX.
- Unidades del SI. Constantes con valores aceptados (NIST cuando aplique). No afirmes un resultado físico que no hayas comprobado.
- Una categoría nueva exige cambiar a la vez el enum de `src/content/config.ts`, el tipo `PhysicsCategory` y los mapas de color y etiqueta.

### Imágenes y rendimiento

- Publica imágenes en `public/images/`. Objetivo: WebP y menos de 200 KB. Los originales permanecen en `old_version/Imagenes/`; no los borres.
- Hoy conviven `public/images/galaxy-network.webp` y JPG de categoría. Al tocar una imagen, conviértela a WebP y actualiza las rutas. No dejes el JPG publicado si ya existe el WebP.
- `loading="lazy"` en imágenes de contenido. El Canvas no se pinta fuera del viewport.
- Referencia del MVP: Lighthouse 95+, FCP por debajo de 1 s, JS inicial por debajo de 200 KB. No añadas una dependencia de cliente para algo que Astro puede dejar resuelto en el build.

### SEO

`BaseLayout` ya emite `lang="es"`, el título como `{title} — FísicaFans`, description, canonical y Open Graph básico. Amplía ese layout; no dupliques `<head>` en cada página. El sitemap lo genera `@astrojs/sitemap`. `public/robots.txt` apunta a `https://agomez356.github.io/Miweb/sitemap-index.xml`.

## Qué no hacer salvo que te lo pidan

El trabajo posterior al MVP no está hecho y no se arranca solo:

- Visualizadores Canvas (`RelativityVisualizer`, `WaveSimulator`, `ElectromagneticField`, `ForceSimulator`, diagramas P-V). Si se construyen, Canvas API puro: Chart.js quedó fuera del alcance.
- Páginas de categoría y página About.
- README, dominio propio, modo claro, Docker.

Tampoco:

- No reescribas `old_version/`.
- No reformatees archivos que no estés cambiando.
- No subas `node_modules/`, `dist/` ni `.astro/`.

## Cómo verificar

Antes de dar por cerrado un cambio de UI o de contenido:

1. `pnpm build` termina en 0.
2. Recorre `/`, `/blog/` y al menos un `/blog/[slug]`, con el prefijo `/Miweb` en local y en Pages.
3. Un post `draft: true` no aparece en el índice ni genera ruta.
4. Las ecuaciones salen como KaTeX (`.katex` / `.katex-display`), no como texto con `$`.
5. Los enlaces internos resuelven bajo `/Miweb`.
6. Revisa 320 px, 768 px y 1200 px si tocaste layout. El menú se colapsa por debajo de `md`.

## Commits

Mensajes en formato convencional (`feat:`, `fix:`, `chore:`, `docs:`). El historial mezcla español e inglés; iguala el idioma del mensaje al del cambio que estás describiendo.

## Dónde leer más

- Este archivo y `src/`: fuente de verdad.
- `openspec/changes/astro-migration/`: spec archivada del MVP (`proposal.md`, `design.md`, `tasks.md`). Sirve para entender decisiones. No reabras esas tareas.
- `.claude/skills/`: guías de SEO en Astro, WebP, LaTeX/KaTeX, validación de física, breakpoints y composables Vue. Léelas cuando el cambio caiga en ese tema.
- `CLAUDE.md` y `PLAN_MIGRACION_ASTRO.md`: plan histórico. Están desactualizados respecto al código.
