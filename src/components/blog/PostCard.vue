<script setup lang="ts">
import { formatDate } from '@/utils/formatDate';
import type { PhysicsCategory } from '@/types/index';

interface Props {
  title: string;
  description: string;
  category: PhysicsCategory;
  pubDate: Date;
  slug: string;
}

defineProps<Props>();
const base = import.meta.env.BASE_URL;

function isoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const categoryColors: Record<PhysicsCategory, string> = {
  'termodinamica': '#ec4899',
  'mecanica-cuantica': '#667eea',
  'fisica-clasica': '#fbbf24',
  'electromagnetismo': '#10b981',
  'relatividad': '#b9c3ff',
};

const categoryLabels: Record<PhysicsCategory, string> = {
  'termodinamica': 'Termodinámica',
  'mecanica-cuantica': 'Mecánica Cuántica',
  'fisica-clasica': 'Física Clásica',
  'electromagnetismo': 'Electromagnetismo',
  'relatividad': 'Relatividad',
};
</script>

<template>
  <article class="glass relative rounded-celestial-lg p-6 group hover:-translate-y-1 transition-all duration-300">
    <div class="flex items-center gap-3 mb-4">
      <span
        class="font-space text-xs px-3 py-1 rounded-full"
        :style="{
          backgroundColor: `${categoryColors[category]}20`,
          color: categoryColors[category],
          border: `1px solid ${categoryColors[category]}40`,
        }"
      >
        {{ categoryLabels[category] }}
      </span>
      <time class="font-body text-xs text-text-muted" :datetime="isoDate(pubDate)">{{ formatDate(pubDate) }}</time>
    </div>

    <h3 class="font-space font-semibold text-lg text-text-primary mb-2 group-hover:text-primary-light transition-colors">
      <a
        :href="`${base}/blog/${slug}/`"
        class="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm"
      >
        {{ title }}
      </a>
    </h3>

    <p class="font-body text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
      {{ description }}
    </p>

    <span class="font-space text-sm text-primary group-hover:text-primary-light transition-colors inline-flex items-center gap-1">
      Leer más
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  </article>
</template>
