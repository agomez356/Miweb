<script setup lang="ts">
import { formatDate } from '@/utils/formatDate';
import { formatReadingTime } from '@/utils/readingTime';
import { readingLevelLabels, type PhysicsCategory, type ReadingLevel } from '@/types/index';

interface Props {
  title: string;
  description: string;
  category: PhysicsCategory;
  level: ReadingLevel;
  pubDate: Date;
  readingMinutes: number;
  slug: string;
}

const props = defineProps<Props>();
const base = import.meta.env.BASE_URL;

function isoDate(value: unknown): string | undefined {
  const date = value instanceof Date ? value : new Date(typeof value === 'string' ? value : Number.NaN);
  if (Number.isNaN(date.valueOf())) return undefined;
  return date.toISOString().slice(0, 10);
}

const published = isoDate(props.pubDate);

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
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
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
        <span class="font-body text-xs text-text-secondary">{{ readingLevelLabels[level] }}</span>
      </div>
      <time class="font-body text-xs text-text-muted" :datetime="published">{{ formatDate(pubDate) }}</time>
      <span class="font-body text-xs text-text-muted">{{ formatReadingTime(readingMinutes) }}</span>
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
