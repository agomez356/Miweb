<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

const props = defineProps<Props>();
const activeSlug = ref('');

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSlug.value = entry.target.id;
        }
      }
    },
    { rootMargin: '-20% 0% -70% 0%' }
  );

  for (const heading of props.headings) {
    const el = document.getElementById(heading.slug);
    if (el) observer.observe(el);
  }
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <nav v-if="headings.length > 0" class="hidden lg:block sticky top-24 pl-6">
    <p class="font-space text-xs uppercase tracking-widest text-text-muted mb-4">
      Contenido
    </p>
    <ul class="space-y-2">
      <li
        v-for="heading in headings"
        :key="heading.slug"
        :style="{ paddingLeft: `${(heading.depth - 2) * 12}px` }"
      >
        <a
          :href="`#${heading.slug}`"
          class="font-body text-sm transition-colors duration-200"
          :class="activeSlug === heading.slug
            ? 'text-primary-light'
            : 'text-text-muted hover:text-text-secondary'"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
