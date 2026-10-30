import type { PhysicsCategory } from '@/types/index';
import { withBase } from '@/utils/url';

export interface CategoryInfo {
  id: PhysicsCategory;
  /** Etiqueta corta del chip y de las tarjetas. */
  label: string;
  /** Nombre de la página de la rama. */
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const CATEGORIES: readonly CategoryInfo[] = [
  {
    id: 'termodinamica',
    label: 'Termodinámica',
    title: 'Termodinámica',
    description: 'Energía, calor y las leyes que gobiernan las transformaciones en la materia.',
    icon: '🌡️',
    color: '#ec4899',
  },
  {
    id: 'mecanica-cuantica',
    label: 'Mecánica Cuántica',
    title: 'Mecánica Cuántica',
    description: 'La naturaleza a escalas subatómicas: partículas, ondas y el principio de incertidumbre.',
    icon: '⚛️',
    color: '#667eea',
  },
  {
    id: 'fisica-clasica',
    label: 'Física Clásica',
    title: 'Física Clásica',
    description: 'Newton, movimiento, fuerzas y las leyes que gobiernan nuestro mundo cotidiano.',
    icon: '🍎',
    color: '#fbbf24',
  },
  {
    id: 'electromagnetismo',
    label: 'Electromagnetismo',
    title: 'Electromagnetismo',
    description: 'Cargas, campos eléctricos y magnéticos unificados en la teoría de Maxwell.',
    icon: '⚡',
    color: '#10b981',
  },
  {
    id: 'relatividad',
    label: 'Relatividad',
    title: 'Teoría de la Relatividad',
    description: 'Einstein, espacio-tiempo, dilatación temporal y la velocidad de la luz.',
    icon: '🌌',
    color: '#b9c3ff',
  },
];

const byId = new Map<PhysicsCategory, CategoryInfo>(CATEGORIES.map((category) => [category.id, category]));

export function getCategory(id: PhysicsCategory): CategoryInfo {
  const category = byId.get(id);
  if (!category) {
    throw new Error(`Categoría desconocida: ${id}`);
  }
  return category;
}

export function categoryHref(id: PhysicsCategory): string {
  return withBase(`blog/categoria/${id}/`);
}
