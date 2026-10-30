/** Technical Spanish prose, slower than narrative reading. */
const WORDS_PER_MINUTE = 200;

/** A display equation is not free to skip; count it as this many words. */
const DISPLAY_EQUATION_WORDS = 30;

/**
 * Minutes to read a Markdown body.
 * Prose is counted after stripping markup and math. Each $$...$$ block adds a fixed word weight.
 * The result is at least 1.
 */
export function readingTimeMinutes(markdown: string): number {
  const displayEquations = markdown.match(/\$\$[\s\S]*?\$\$/g)?.length ?? 0;

  const prose = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_`~|]/g, ' ');

  const words = prose.split(/\s+/).filter((word) => word.length > 0).length;
  const totalWords = words + displayEquations * DISPLAY_EQUATION_WORDS;

  return Math.max(1, Math.round(totalWords / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  const rounded = Math.max(1, Math.round(minutes));
  return rounded === 1 ? '1 minuto de lectura' : `${rounded} minutos de lectura`;
}
