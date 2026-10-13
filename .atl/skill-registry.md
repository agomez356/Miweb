# Skill Registry — Miweb (FísicaFans)

Generated: 2026-04-04
Project: Miweb
Source: sdd-init scan

---

## User Skills (Global — `~/.claude/skills/`)

> SDD workflow skills (sdd-*) are excluded. skill-registry is excluded.

| Trigger | Skill Name | Path |
|---------|------------|------|
| When styling with Tailwind — cn(), theme variables, no var() in className | tailwind-4 | ~/.claude/skills/tailwind-4/SKILL.md |
| When writing TypeScript code — types, interfaces, generics | typescript | ~/.claude/skills/typescript/SKILL.md |
| When writing React components — no useMemo/useCallback needed | react-19 | ~/.claude/skills/react-19/SKILL.md |
| When writing E2E tests — Page Objects, selectors, MCP workflow | playwright | ~/.claude/skills/playwright/SKILL.md |
| When working with Next.js — routing, Server Actions, data fetching | nextjs-15 | ~/.claude/skills/nextjs-15/SKILL.md |
| When building AI chat features — breaking changes from v4 | ai-sdk-5 | ~/.claude/skills/ai-sdk-5/SKILL.md |
| When managing React state with Zustand | zustand-5 | ~/.claude/skills/zustand-5/SKILL.md |
| When using Zod for validation — breaking changes from v3 | zod-4 | ~/.claude/skills/zod-4/SKILL.md |
| When building REST APIs with Django — ViewSets, Serializers, Filters | django-drf | ~/.claude/skills/django-drf/SKILL.md |
| When writing Python tests — fixtures, mocking, markers | pytest | ~/.claude/skills/pytest/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | ~/.claude/skills/go-testing/SKILL.md |
| When user asks to create a Jira epic, large feature, or multi-task initiative | jira-epic | ~/.claude/skills/jira-epic/SKILL.md |
| When user asks to create a Jira task, ticket, or issue | jira-task | ~/.claude/skills/jira-task/SKILL.md |
| When user asks to review a PR, check a PR, or gives a PR URL | pr-review | ~/.claude/skills/pr-review/SKILL.md |
| When user says "judgment day", "dual review", "doble review", "juzgar" | judgment-day | ~/.claude/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | ~/.claude/skills/skill-creator/SKILL.md |
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | ~/.claude/skills/branch-pr/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | ~/.claude/skills/issue-creation/SKILL.md |

---

## Project Skills (Workspace — `.claude/skills/`)

> These are Miweb-specific skills. Project-level wins on name collision.

| Trigger | Skill Name | Path |
|---------|------------|------|
| When working with SEO, meta tags, social media previews, or page optimization | astro-seo-optimizer | .claude/skills/astro-seo-optimizer/SKILL.md |
| When working with image optimization, WebP conversion, or performance optimization | image-webp-optimizer | .claude/skills/image-webp-optimizer/SKILL.md |
| When writing or reviewing physics content, blog posts, or educational material | physics-content-validator | .claude/skills/physics-content-validator/SKILL.md |
| When working with mathematical equations, physics formulas, MDX blog posts, LaTeX, KaTeX | physics-equation-latex | .claude/skills/physics-equation-latex/SKILL.md |
| When testing mobile, tablet, desktop layouts or validating responsive components | responsive-breakpoint-tester | .claude/skills/responsive-breakpoint-tester/SKILL.md |
| When creating Vue composables or extracting reusable component logic | vue-composable-generator | .claude/skills/vue-composable-generator/SKILL.md |

---

## Project Conventions

| File | Path |
|------|------|
| Agent instructions (project) | AGENTS.md |

**Key conventions from AGENTS.md:**
- Stack: Astro 4.x + Vue 3 (Composition API) + TailwindCSS 3.x
- Content: MDX blog posts, 5 physics categories
- Math: KaTeX only (not MathJax)
- Design: "The Celestial Archive" dark space theme with glassmorphism
- Images: WebP format, lazy-load Canvas in viewport only
- Performance targets: Lighthouse 95+, FCP < 1s, bundle < 200KB initial
- Deployment: GitHub Pages only (`base: /Miweb`), package manager pnpm
- Git: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)

---

## Compact Rules

### tailwind-4
- No `var()` inside `className` — use theme variables via CSS or `style` prop only
- Use `cn()` for conditional/dynamic classes, not string concatenation
- Prefer Tailwind utilities over custom CSS when a class exists
- Dynamic values (e.g. widths from state): use `style={{ width: \`${x}%\` }}`
- No `@apply` in components — compose utilities in JSX/template directly

### typescript
- Always create `const` object first, then `type Foo = typeof FOO[keyof typeof FOO]`
- Prefer `interface` for extendable shapes, `type` for unions/computed types
- Use `satisfies` operator to validate without widening the type
- `unknown` over `any` — always narrow before use
- Strict mode required: `"strict": true` in tsconfig

### react-19
- No `useMemo`/`useCallback` — React Compiler handles optimization automatically
- `use()` hook for promises/context; replaces `useEffect` for async data
- `ref` is a regular prop — no `forwardRef` needed
- `useActionState` for form mutations; `useOptimistic` for optimistic UI
- Server Components by default; add `'use client'` only for interactivity/hooks

### playwright
- Use MCP Playwright tools FIRST (navigate → snapshot → interact → screenshot) before writing tests
- Page Object Model for all page interactions — no raw selectors in tests
- `getByRole` and `getByLabel` over `getByTestId` — prefer semantic selectors
- Never use `page.waitForTimeout()` — use `expect(locator).toBeVisible()` or auto-wait
- Isolate test state: each test gets a fresh context/page

### tailwind-4 (Miweb-specific note)
- TailwindCSS 3.x is the target version for this project (not v4)
- Space theme tokens are defined in AGENTS.md and `tailwind.config.cjs` — use those as semantic tokens

### vue-composable-generator
- `use` prefix required for all composables (e.g., `useCanvas`, `useWaveSimulator`)
- Always return reactive refs/computed from composables, not raw values
- Canvas composables MUST use `IntersectionObserver` — only render when in viewport
- `onUnmounted` cleanup required for all event listeners and animation frames
- TypeScript generics where appropriate; avoid `any`

### astro-seo-optimizer
- Every Astro page MUST have `title`, `description`, and canonical URL
- Open Graph tags required: `og:title`, `og:description`, `og:image`, `og:type`
- JSON-LD structured data for blog posts (BlogPosting schema)
- Use Astro's `<SEO>` component or `<head>` slot in BaseLayout — never per-page ad-hoc
- `sitemap.xml` via `@astrojs/sitemap` integration

### image-webp-optimizer
- All images MUST be converted to WebP before committing
- Target: < 200KB per image
- Use Astro's `<Image>` component for automatic optimization in posts
- Original images stay in `old_version/` — never delete originals
- Validate file size after conversion before staging

### physics-content-validator
- All equations MUST be verified against standard physics references
- SI units required — add conversions for imperial where useful
- Physical constants must use accepted NIST values
- Correct common misconceptions explicitly (e.g., "quantum tunneling is not teleportation")
- Peer-review all new physics content before publishing

### physics-equation-latex
- Inline math: `$...$`; block/display math: `$$...$$`
- Use `\frac{}{}` not `/` for fractions in display math
- Vectors: `\vec{F}` or `\mathbf{F}`; matrices: `\begin{pmatrix}...\end{pmatrix}`
- KaTeX subset only — verify operator support at katex.org/docs/support_table
- Always test render locally before publishing

### responsive-breakpoint-tester
- Mobile-first: base styles for 320px, then `sm:`, `md:`, `lg:`, `xl:` overrides
- Test at: 320px (mobile), 768px (tablet), 1200px (desktop), 1440px (wide)
- Canvas visualizations must be scrollable/zoomable on mobile
- Navigation must collapse to hamburger menu below `md` breakpoint

### branch-pr
- Issue-first: create GitHub issue BEFORE creating a PR
- Branch naming: `feature/`, `fix/`, `chore/` prefix + kebab-case description
- PR title: conventional commit format (`feat:`, `fix:`, `chore:`)
- PR body must reference the issue with `Closes #N`

### issue-creation
- Create issue before starting any significant work
- Use labels: `enhancement`, `bug`, `content`, `performance`, `migration`
- Milestone: assign to the relevant migration phase (Phase 1–10)
