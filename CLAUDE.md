# CLAUDE.md

> Este archivo describe el sitio estático previo a la migración y varias decisiones que ya no aplican. La guía vigente para agentes es [`AGENTS.md`](AGENTS.md).

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**FísicaFans** - A physics education website project currently in migration from static HTML/CSS to a modern Astro-based blog platform.

**Current State:** Static single-page website (index.html + stylesheet.css) covering 5 physics topics
**Target State:** Modern blog with Astro 4.x + Vue 3 + TailwindCSS featuring interactive physics visualizations

## Project Migration Status

This repository is undergoing a complete architectural migration. See `PLAN_MIGRACION_ASTRO.md` for the comprehensive migration plan (500+ lines detailing phases, architecture, and implementation roadmap).

### Current Files
- `index.html` - Static homepage with 5 physics sections (Termodinámica, Mecánica Cuántica, Física Clásica, Electromagnetismo, Relatividad)
- `stylesheet.css` - Basic responsive styles with Montserrat/Macondo fonts
- `Imagenes/` - Physics-related images (6 files, ~750KB total)
- `PLAN_MIGRACION_ASTRO.md` - Complete migration blueprint

### Planned Architecture (Post-Migration)

```
Stack: Astro 4.x (SSG) + Vue 3 (Composition API) + TailwindCSS 3.x
Content: MDX-based blog posts with embedded interactive components
Math: KaTeX for equation rendering
Visualizations: Canvas API + Chart.js for physics simulations
Theme: Dark space-themed design with glassmorphism effects
```

## Development Commands

### Current Static Site
```bash
# Serve locally (simple HTTP server)
python -m http.server 8000
# or
npx serve .
```

### Post-Migration (Astro)
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## Migration Implementation Plan

The migration is structured in 10 phases (20-30 hours estimated):

1. **Setup Base** - Initialize Astro + Vue + TailwindCSS, move old files to `/old_version`
2. **Structure & Layout** - Create BaseLayout with navbar/footer, implement space theme color palette
3. **Home Page** - Hero with animated particles, PhysicsCategories grid
4. **Blog System** - Content Collections, PostLayout with TOC, reading progress bar
5. **Content Migration** - Convert HTML to MDX, add LaTeX equations, SEO metadata
6. **Interactive Components** - Build 5 physics visualizations (WaveSimulator, ThermodynamicsChart, ElectromagneticField, RelativityVisualizer, ForceSimulator)
7. **Category Pages** - Individual pages for each physics field with filtered posts
8. **Polish & Optimization** - Image optimization (webp), SEO tags, Lighthouse audit
9. **Deployment** - GitHub Actions + Vercel/GitHub Pages
10. **Documentation** - Professional README with screenshots

## Key Design Decisions

### Space Theme Color Palette
```css
--bg-primary: #0a0e27      /* Deep space blue */
--bg-secondary: #1a1f3a
--accent-nebula: #667eea   /* Purple nebula */
--accent-star: #fbbf24     /* Star yellow */
--accent-cosmic: #ec4899   /* Cosmic pink */
--text-primary: #f9fafb
```

### Interactive Physics Components

Five Vue components planned for physics visualization:

- **WaveSimulator.vue** - Quantum mechanics wave function with amplitude/frequency/phase controls
- **ThermodynamicsChart.vue** - P-V diagrams for thermodynamic processes (isothermal, adiabatic, isochoric, isobaric)
- **ElectromagneticField.vue** - Vector field visualization with drag-and-drop charges
- **RelativityVisualizer.vue** - Time dilation demonstration with Lorentz factor calculation
- **ForceSimulator.vue** - Classical mechanics force simulation (F=ma in real-time)

Each component uses Canvas API for rendering and reactive Vue 3 controls.

## Content Strategy

### Existing Content to Migrate
- 5 physics topics from current HTML (convert to MDX blog posts)
- Images in `Imagenes/` (optimize to webp, organize by topic)

### New Content Planned
- Personal "Why I love physics" introduction
- "Physics in programming: JavaScript simulations" technical post
- "Newton to Quantum Computing" historical perspective
- "Visualizing the invisible: Modern physics with code" showcase

## Important Notes

### Pre-Migration Checklist
- Backup original files to `/old_version` before starting
- Create `feature/astro-migration` branch for development
- Verify image optimization before committing (target: webp format)
- Test all interactive components in viewport before deploying

### Performance Targets
- Lighthouse Score: 95+ all metrics
- First Contentful Paint: < 1s
- Bundle size: < 200KB initial
- Mobile responsive: 100%

### Content Guidelines
- Use KaTeX for all mathematical equations (not MathJax)
- Lazy load Canvas visualizations (only render in viewport)
- Add breadcrumbs for navigation between category pages
- Implement reading progress bar on all blog posts
- Cross-link related posts within same physics category

## Git Workflow

```bash
# Start migration
git checkout -b feature/astro-migration

# Preserve original version
mkdir old_version
mv index.html stylesheet.css Imagenes/ old_version/

# After each major phase, commit
git add .
git commit -m "feat: complete Phase N - [description]"

# When MVP complete
git checkout main
git merge feature/astro-migration
git push origin main
```

## Repository Structure (Post-Migration)

```
Miweb/
├── src/
│   ├── components/
│   │   ├── common/         # Header, Footer, BackToTop, ThemeToggle
│   │   ├── home/           # Hero, PhysicsCategories, FeaturedPosts
│   │   ├── blog/           # PostCard, PostGrid, TableOfContents, ReadingProgress
│   │   └── physics/        # 5 interactive visualization components
│   ├── layouts/            # BaseLayout, BlogPostLayout, CategoryLayout
│   ├── pages/              # Astro routes (index, blog/[slug], physics/*)
│   ├── content/            # MDX blog posts with frontmatter
│   └── utils/              # formatDate, sortPosts helpers
├── public/                 # Static assets (images, fonts, favicon)
├── old_version/            # Original HTML/CSS backup
└── astro.config.mjs
```

## Dependencies (Post-Migration)

```json
{
  "dependencies": {
    "astro": "^4.0.0",
    "vue": "^3.4.0",
    "@astrojs/vue": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "@astrojs/mdx": "^2.0.0",
    "tailwindcss": "^3.4.0",
    "katex": "^0.16.9",
    "chart.js": "^4.4.0",
    "vue-chartjs": "^5.3.0",
    "lucide-vue-next": "^0.309.0"
  }
}
```

## Testing Strategy

1. **Visual Testing:** Verify all 5 physics category sections render correctly
2. **Interactive Testing:** Each Canvas component must render only when in viewport
3. **Responsive Testing:** Test on mobile (320px), tablet (768px), desktop (1200px+)
4. **Math Rendering:** Verify KaTeX equations render properly in all blog posts
5. **Performance:** Run Lighthouse audit, ensure 95+ scores

## Deployment

**Recommended:** Vercel (zero-config Astro support)
**Alternative:** GitHub Pages (requires GitHub Actions workflow)

```bash
# Vercel deployment
npx vercel

# GitHub Pages (add to .github/workflows/deploy.yml)
- astro build
- deploy to gh-pages branch
```

## SEO Considerations

- Add Open Graph meta tags to BaseLayout
- Generate sitemap.xml automatically (Astro plugin)
- Create robots.txt for search engine indexing
- Optimize alt tags for all physics images
- Use semantic HTML5 structure
- Implement JSON-LD structured data for blog posts
