/**
 * Internal URLs under the site base (`/Miweb/`).
 * `import.meta.env.BASE_URL` already ends with a slash.
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith('/') ? base : `${base}/`;
  return `${root}${path.replace(/^\/+/, '')}`;
}

/** Compare pathnames ignoring the hash, index.html, duplicate slashes and a trailing slash. */
export function normalizePath(path: string): string {
  const withoutHash = path.split('#')[0] ?? '';
  const collapsed = withoutHash.replace(/\/{2,}/g, '/');
  const withoutIndex = collapsed.replace(/\/index\.html$/, '');
  if (withoutIndex === '/') return '/';
  return withoutIndex.replace(/\/+$/, '') || '/';
}

/** True when `href` is the current section. The site root matches only the home. */
export function isCurrentSection(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);
  const home = normalizePath(import.meta.env.BASE_URL);
  if (target === home) return current === home;
  return current === target || current.startsWith(`${target}/`);
}
