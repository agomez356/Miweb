---
name: astro-seo-optimizer
description: Optimize SEO metadata for Astro static sites including Open Graph tags, meta descriptions, JSON-LD structured data, and sitemap generation. Use when working with SEO, meta tags, social media previews, or page optimization.
allowed-tools: Read, Write, Edit
---

# Astro SEO Optimizer

Optimize search engine and social media metadata for the FísicaFans Astro blog to maximize visibility and click-through rates.

## Instructions

When optimizing SEO for Astro pages or blog posts:

1. **Meta Tags**: Ensure title, description, canonical URL
2. **Open Graph**: Add OG tags for social media previews
3. **Twitter Cards**: Include Twitter-specific meta tags
4. **Structured Data**: Generate JSON-LD for rich results
5. **Sitemap**: Verify sitemap.xml generation
6. **Robots.txt**: Ensure proper crawling directives

## BaseLayout SEO Template

Every Astro page should include comprehensive meta tags in the `<head>`:

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

const {
  title,
  description,
  image = '/images/og-default.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = []
} = Astro.props

const canonicalURL = new URL(Astro.url.pathname, Astro.site)
const ogImageURL = new URL(image, Astro.site)
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>{title} | FísicaFans</title>
  <meta name="title" content={title}>
  <meta name="description" content={description}>
  <meta name="author" content="Alejandro Gómez">
  <link rel="canonical" href={canonicalURL}>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type}>
  <meta property="og:url" content={canonicalURL}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={ogImageURL}>
  <meta property="og:site_name" content="FísicaFans">
  <meta property="og:locale" content="es_ES">

  {type === 'article' && publishedTime && (
    <>
      <meta property="article:published_time" content={publishedTime}>
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime}>}
      <meta property="article:author" content="Alejandro Gómez">
      {tags.map(tag => <meta property="article:tag" content={tag}>)}
    </>
  )}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content={canonicalURL}>
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content={ogImageURL}>

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <!-- Sitemap -->
  <link rel="sitemap" href="/sitemap-index.xml">

  <slot name="head" />
</head>
<body>
  <slot />
</body>
</html>
```

## Blog Post SEO Best Practices

### Frontmatter Schema

```yaml
---
title: "Mecánica Cuántica: Fundamentos"
description: "Explora los principios fundamentales de la mecánica cuántica, desde la dualidad onda-partícula hasta el principio de incertidumbre de Heisenberg."
pubDate: 2025-11-04
updatedDate: 2025-11-05
category: "quantum"
heroImage: "/images/physics/quantum/hero.webp"
tags: ["mecánica cuántica", "física moderna", "función de onda", "heisenberg"]
author: "Alejandro Gómez"
readingTime: 8
featured: true
---
```

### Meta Description Guidelines

**Length**: 120-160 characters (optimal: 155)

**Structure**:
1. **Action verb** + **benefit** + **keyword**
2. Include primary keyword naturally
3. Create curiosity or value proposition

**Examples:**

❌ **Bad**: "This post is about thermodynamics."
✅ **Good**: "Descubre las leyes de la termodinámica y cómo gobiernan la energía en el universo. Ejemplos prácticos y visualizaciones interactivas."

❌ **Bad**: "Quantum mechanics explained."
✅ **Good**: "Explora la mecánica cuántica desde cero: dualidad onda-partícula, principio de incertidumbre y la ecuación de Schrödinger explicados visualmente."

### Title Tag Optimization

**Length**: 50-60 characters (optimal: 55)

**Structure**: `Keyword-rich phrase | Brand`

**Examples:**
- "Relatividad Especial: Einstein y el Espacio-Tiempo | FísicaFans"
- "Termodinámica: Las 4 Leyes Fundamentales | FísicaFans"
- "Mecánica Cuántica para Principiantes | FísicaFans"

## Structured Data (JSON-LD)

Add JSON-LD structured data to blog posts for rich search results:

```astro
---
// src/layouts/BlogPostLayout.astro
import BaseLayout from './BaseLayout.astro'

const { frontmatter } = Astro.props
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": frontmatter.title,
  "description": frontmatter.description,
  "image": new URL(frontmatter.heroImage, Astro.site).toString(),
  "datePublished": frontmatter.pubDate.toISOString(),
  "dateModified": (frontmatter.updatedDate || frontmatter.pubDate).toISOString(),
  "author": {
    "@type": "Person",
    "name": frontmatter.author || "Alejandro Gómez",
    "url": "https://github.com/agomez356"
  },
  "publisher": {
    "@type": "Organization",
    "name": "FísicaFans",
    "logo": {
      "@type": "ImageObject",
      "url": new URL("/images/logo.png", Astro.site).toString()
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": new URL(Astro.url.pathname, Astro.site).toString()
  },
  "keywords": frontmatter.tags.join(", "),
  "articleSection": frontmatter.category,
  "wordCount": frontmatter.readingTime * 200 // Approx 200 words/minute
}
---

<BaseLayout {...frontmatter}>
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  <slot />
</BaseLayout>
```

## Sitemap Configuration

Ensure `@astrojs/sitemap` is configured in `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://fisicafans.vercel.app', // Replace with your actual domain
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Exclude draft pages
      filter: (page) => !page.includes('/draft/'),
      // Custom entries
      customPages: [
        'https://fisicafans.vercel.app/physics/thermodynamics',
        'https://fisicafans.vercel.app/physics/quantum-mechanics',
      ]
    })
  ]
})
```

## Robots.txt

Create `public/robots.txt`:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin/draft pages
Disallow: /admin/
Disallow: /draft/

# Sitemap location
Sitemap: https://fisicafans.vercel.app/sitemap-index.xml
```

## Open Graph Image Optimization

### Image Requirements
- **Dimensions**: 1200 × 630 px (1.91:1 ratio)
- **Format**: PNG or JPG (WebP not universally supported for OG)
- **Size**: < 1 MB (ideally < 300 KB)
- **Location**: `/public/images/og/`

### Dynamic OG Image Generation

For blog posts, create category-specific OG images:

```
/public/images/og/
├── thermodynamics-og.png
├── quantum-og.png
├── classical-og.png
├── electromagnetism-og.png
├── relativity-og.png
└── default-og.png
```

### OG Image Template Design
- **Background**: Space theme (#0a0e27)
- **Title**: Large, readable font (48-60px)
- **Logo**: FísicaFans branding
- **Visual**: Category-specific physics icon/illustration
- **URL**: Subtle site URL at bottom

## SEO Checklist

Before publishing any page/post, verify:

### Content
- [ ] Title is 50-60 characters
- [ ] Description is 120-160 characters
- [ ] Primary keyword in title and first paragraph
- [ ] Headers (H2, H3) use semantic structure
- [ ] Alt text on all images
- [ ] Internal links to related posts
- [ ] External links use `rel="noopener noreferrer"`

### Meta Tags
- [ ] `<title>` tag present and unique
- [ ] Meta description unique per page
- [ ] Canonical URL set correctly
- [ ] Open Graph tags complete (title, description, image, URL, type)
- [ ] Twitter card tags complete
- [ ] Favicon links present

### Technical
- [ ] Sitemap includes page
- [ ] Robots.txt allows crawling
- [ ] JSON-LD structured data valid (test with [Google Rich Results](https://search.google.com/test/rich-results))
- [ ] Page loads in < 3 seconds
- [ ] Mobile responsive (test with Google Mobile-Friendly Test)
- [ ] HTTPS enabled

### Images
- [ ] Hero image optimized (< 200 KB)
- [ ] OG image exists (1200×630 px)
- [ ] Alt text descriptive and keyword-rich
- [ ] Images use WebP format (except OG image)

## Testing Tools

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Validates JSON-LD structured data

2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Preview OG tags and refresh cache

3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Preview Twitter card appearance

4. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - Test performance and Core Web Vitals

5. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
   - Verify mobile responsiveness

## Common SEO Mistakes to Avoid

1. **Duplicate Content**: Every page must have unique title/description
2. **Missing Alt Tags**: Search engines can't "see" images without alt text
3. **Broken Internal Links**: Use relative paths, verify links work
4. **No Canonical URL**: Prevents duplicate content issues
5. **Slow Load Times**: Optimize images, minimize JS bundles
6. **Missing H1**: Every page should have exactly one H1 tag
7. **Keyword Stuffing**: Use keywords naturally, focus on readability
8. **No Mobile Optimization**: > 60% of traffic is mobile
9. **Ignoring Core Web Vitals**: LCP, FID, CLS affect rankings
10. **Missing Structured Data**: JSON-LD helps Google understand content

## Keywords Strategy for FísicaFans

### Primary Keywords (Target in titles)
- "física moderna"
- "mecánica cuántica"
- "termodinámica"
- "relatividad especial"
- "electromagnetismo"
- "física clásica"

### Long-tail Keywords (Target in content)
- "ecuación de Schrödinger explicada"
- "leyes de la termodinámica ejemplos"
- "relatividad de Einstein para principiantes"
- "simulador de física online"
- "visualización de ondas cuánticas"

### Location-based (if relevant)
- "blog de física en español"
- "física educativa online"

## Monitoring SEO Performance

Track these metrics in Google Search Console:

1. **Impressions**: How many times your page appears in search
2. **CTR (Click-Through Rate)**: % of impressions that result in clicks
3. **Average Position**: Where you rank for target keywords
4. **Core Web Vitals**: LCP, FID, CLS scores
5. **Coverage**: Pages indexed vs errors

**Goal**: Achieve CTR > 3% and position < 10 for primary keywords.

## Reference

For complete SEO checklist, see [seo-checklist.md](seo-checklist.md).
