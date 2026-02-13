# SEO Checklist - Complete Reference

Use this checklist before publishing any page or blog post on FísicaFans.

## Pre-Publishing Checklist

### ✅ Meta Tags (Required)

- [ ] **Title tag**: 50-60 characters, includes primary keyword
- [ ] **Meta description**: 120-160 characters, compelling and keyword-rich
- [ ] **Canonical URL**: Set to prevent duplicate content
- [ ] **Author meta**: `<meta name="author" content="Alejandro Gómez">`
- [ ] **Viewport meta**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### ✅ Open Graph Tags (Social Media)

- [ ] **og:type**: "website" or "article"
- [ ] **og:url**: Canonical URL
- [ ] **og:title**: Page title (can differ slightly from title tag)
- [ ] **og:description**: Same as meta description or variant
- [ ] **og:image**: 1200×630 px image URL
- [ ] **og:site_name**: "FísicaFans"
- [ ] **og:locale**: "es_ES"

For articles only:
- [ ] **article:published_time**: ISO 8601 format
- [ ] **article:modified_time**: If updated
- [ ] **article:author**: Author name
- [ ] **article:tag**: Each tag as separate meta

### ✅ Twitter Cards

- [ ] **twitter:card**: "summary_large_image"
- [ ] **twitter:url**: Same as og:url
- [ ] **twitter:title**: Same as og:title
- [ ] **twitter:description**: Same as og:description
- [ ] **twitter:image**: Same as og:image

### ✅ Structured Data (JSON-LD)

For blog posts:
- [ ] **@type**: "Article"
- [ ] **headline**: Post title
- [ ] **description**: Post description
- [ ] **image**: Hero image URL
- [ ] **datePublished**: Publication date (ISO 8601)
- [ ] **dateModified**: Last update date
- [ ] **author**: Person object with name and URL
- [ ] **publisher**: Organization object with logo
- [ ] **mainEntityOfPage**: Canonical URL
- [ ] **keywords**: Comma-separated tags
- [ ] **articleSection**: Category name

Validate with: https://search.google.com/test/rich-results

### ✅ Content Optimization

- [ ] **H1 tag**: Exactly one per page, matches or similar to title
- [ ] **H2-H6 hierarchy**: Logical structure, no skipped levels
- [ ] **Keyword placement**: Primary keyword in first 100 words
- [ ] **Keyword density**: 1-2% (natural usage, no stuffing)
- [ ] **Internal links**: 2-4 links to related content
- [ ] **External links**: Sources and references (with rel="noopener noreferrer")
- [ ] **Alt text**: All images have descriptive, keyword-rich alt attributes
- [ ] **Readability**: Paragraphs < 4 lines, bullet points, clear structure

### ✅ Images

- [ ] **Hero image**: < 200 KB, WebP format
- [ ] **OG image**: 1200×630 px, PNG/JPG, < 1 MB
- [ ] **Alt text**: All images (except decorative)
- [ ] **File names**: Descriptive, lowercase, hyphens (e.g., `quantum-wave-simulation.webp`)
- [ ] **Lazy loading**: Enabled for below-fold images

### ✅ Technical SEO

- [ ] **Sitemap**: Page included in sitemap.xml
- [ ] **Robots.txt**: Allows crawling (`Allow: /`)
- [ ] **HTTPS**: Secure connection enabled
- [ ] **Mobile-friendly**: Responsive design tested
- [ ] **Page speed**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **No broken links**: All internal/external links work
- [ ] **Clean URLs**: No query parameters, lowercase, hyphens

### ✅ Accessibility (affects SEO)

- [ ] **Semantic HTML**: Proper use of `<article>`, `<section>`, `<nav>`, etc.
- [ ] **ARIA labels**: For interactive elements
- [ ] **Color contrast**: WCAG AA standard (4.5:1 for normal text)
- [ ] **Keyboard navigation**: All interactive elements accessible
- [ ] **Focus indicators**: Visible on focus

## Post-Publishing Checklist

### ✅ Validation

- [ ] **Google Rich Results**: https://search.google.com/test/rich-results
- [ ] **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- [ ] **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- [ ] **PageSpeed Insights**: https://pagespeed.web.dev/
- [ ] **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- [ ] **HTML Validator**: https://validator.w3.org/

### ✅ Google Search Console

- [ ] **URL Inspection**: Request indexing for new pages
- [ ] **Sitemaps**: Submit sitemap if first time
- [ ] **Coverage**: Check for indexing errors
- [ ] **Core Web Vitals**: Monitor performance metrics

### ✅ Monitoring (Weekly)

- [ ] **Search Performance**: Track impressions, clicks, CTR, position
- [ ] **Core Web Vitals**: Ensure all pages pass
- [ ] **Coverage issues**: Fix any errors
- [ ] **Internal links**: Verify no broken links

## Target Metrics

| Metric | Target | Excellent |
|--------|--------|-----------|
| **Title length** | 50-60 chars | 55 chars |
| **Description length** | 120-160 chars | 155 chars |
| **LCP** | < 2.5s | < 1.8s |
| **FID** | < 100ms | < 50ms |
| **CLS** | < 0.1 | < 0.05 |
| **CTR** | > 2% | > 5% |
| **Search Position** | < 20 | < 10 |
| **Page Load Time** | < 3s | < 2s |
| **Mobile Speed Score** | > 85 | > 95 |

## Priority Keywords for FísicaFans

### Homepage
- Primary: "física moderna blog"
- Secondary: "blog de física educativo", "visualizaciones de física"

### Category Pages
| Category | Primary Keyword | Secondary Keywords |
|----------|----------------|-------------------|
| Thermodynamics | "termodinámica leyes" | "primera ley termodinámica", "entropía explicación" |
| Quantum | "mecánica cuántica" | "función de onda", "principio incertidumbre" |
| Classical | "física clásica" | "leyes de newton", "dinámica movimiento" |
| EM | "electromagnetismo" | "campo eléctrico", "leyes de maxwell" |
| Relativity | "relatividad especial" | "einstein teoría", "dilatación temporal" |

### Blog Posts
Each post should target 1-2 long-tail keywords (3-5 words):
- "ecuación de schrödinger explicada"
- "leyes de newton ejemplos prácticos"
- "relatividad einstein para principiantes"

## SEO Red Flags (Fix Immediately)

🚨 **Critical Issues:**
- Missing title or description
- Duplicate title/description across pages
- No canonical URL
- Broken internal links
- Page load time > 5s
- Not mobile-friendly
- HTTP instead of HTTPS

⚠️ **High Priority:**
- Missing alt text on images
- No structured data
- Missing OG tags
- No internal links
- Title/description too short or too long
- Core Web Vitals failing

💡 **Medium Priority:**
- No H1 tag
- Keyword not in first paragraph
- Few internal links
- No external references
- Images not optimized

## Monthly SEO Tasks

1. **Content Audit**: Review underperforming posts, update content
2. **Keyword Research**: Find new long-tail keywords to target
3. **Backlink Check**: Monitor referring domains
4. **Competitor Analysis**: Track competitor rankings
5. **Technical SEO**: Run full site audit (Lighthouse, Screaming Frog)
6. **Content Updates**: Refresh old posts with new information

## Useful Tools

| Tool | Purpose | URL |
|------|---------|-----|
| Google Search Console | Performance tracking | https://search.google.com/search-console |
| PageSpeed Insights | Performance testing | https://pagespeed.web.dev/ |
| Rich Results Test | Structured data validation | https://search.google.com/test/rich-results |
| Facebook Debugger | OG tags testing | https://developers.facebook.com/tools/debug/ |
| Ahrefs/SEMrush | Keyword research (paid) | https://ahrefs.com |
| Lighthouse | Full SEO audit | Built into Chrome DevTools |

## Quick Reference: Meta Tags Template

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Your Title Here (50-60 chars) | FísicaFans</title>
  <meta name="title" content="Your Title Here">
  <meta name="description" content="Your compelling description here (120-160 characters)">
  <meta name="author" content="Alejandro Gómez">
  <link rel="canonical" href="https://fisicafans.com/page-url">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://fisicafans.com/page-url">
  <meta property="og:title" content="Your Title Here">
  <meta property="og:description" content="Your description here">
  <meta property="og:image" content="https://fisicafans.com/images/og/your-image.png">
  <meta property="og:site_name" content="FísicaFans">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Your Title Here">
  <meta name="twitter:description" content="Your description here">
  <meta name="twitter:image" content="https://fisicafans.com/images/og/your-image.png">
</head>
```

---

**Last Updated**: 2025-11-04
**Next Review**: Monthly
