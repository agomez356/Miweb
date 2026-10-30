export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Día civil del frontmatter, en UTC, para que `2024-03-15` no cambie de fecha. */
export function isoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
