<script setup lang="ts">
import { cn } from '@/utils/cn';
import { isCurrentSection, withBase } from '@/utils/url';

const props = defineProps<{
  currentPath: string;
}>();

const year = new Date().getFullYear();

const sections = [
  { label: 'Inicio', href: withBase() },
  { label: 'Blog', href: withBase('blog/') },
];

const branches = [
  { label: 'Termodinámica', href: withBase('#termodinamica') },
  { label: 'Mecánica Cuántica', href: withBase('#mecanica-cuantica') },
  { label: 'Física Clásica', href: withBase('#fisica-clasica') },
  { label: 'Electromagnetismo', href: withBase('#electromagnetismo') },
  { label: 'Teoría de la Relatividad', href: withBase('#relatividad') },
];

function sectionClass(href: string): string {
  const current = isCurrentSection(props.currentPath, href);
  return cn(
    'font-body text-sm transition-colors',
    current
      ? 'font-semibold underline underline-offset-4 decoration-2 text-text-primary'
      : 'text-text-secondary hover:text-text-primary',
  );
}
</script>

<template>
  <footer class="glass mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <p class="font-space font-bold text-lg text-primary-light mb-6">FísicaFans</p>

      <nav aria-label="Secciones del sitio" class="mb-8 flex flex-col items-center gap-4">
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li v-for="link in sections" :key="link.href">
            <a
              :href="link.href"
              :class="sectionClass(link.href)"
              :aria-current="isCurrentSection(currentPath, link.href) ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li v-for="link in branches" :key="link.href">
            <a
              :href="link.href"
              class="font-body text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <p class="font-body text-text-muted text-sm">
        © {{ year }} FísicaFans — Explorando el universo, un concepto a la vez.
      </p>
    </div>
  </footer>
</template>
