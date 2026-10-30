// ─── Category ──────────────────────────────────────────────────────────────

export type PhysicsCategory =
  | 'termodinamica'
  | 'mecanica-cuantica'
  | 'fisica-clasica'
  | 'electromagnetismo'
  | 'relatividad';

export type ReadingLevel = 'introduccion' | 'intermedio';

export const readingLevelLabels: Record<ReadingLevel, string> = {
  introduccion: 'Introducción',
  intermedio: 'Intermedio',
};

// ─── Content Collections ───────────────────────────────────────────────────

/**
 * Matches the Zod schema defined in src/content/config.ts.
 * Used when accessing entry.data in .astro files.
 */
export interface PostFrontmatter {
  title: string;
  description: string;
  category: PhysicsCategory;
  level: ReadingLevel;
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
