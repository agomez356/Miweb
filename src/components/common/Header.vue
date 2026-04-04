<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { cn } from '@/utils/cn';
import type { NavLink } from '@/types/index';

const base = import.meta.env.BASE_URL;

const navLinks: NavLink[] = [
  { label: 'Inicio', href: `${base}` },
  { label: 'Blog', href: `${base}/blog/` },
];

const isScrolled = ref(false);
const isMobileOpen = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header
    :class="cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'glass py-3' : 'py-5'
    )"
  >
    <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
      <!-- Logo -->
      <a :href="base" class="font-space font-bold text-xl text-primary-light hover:text-primary transition-colors">
        FísicaFans
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="font-body text-text-secondary hover:text-text-primary transition-colors text-sm"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Mobile toggle -->
      <button
        @click="isMobileOpen = !isMobileOpen"
        class="md:hidden text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <svg v-if="!isMobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileOpen" class="md:hidden glass mt-2 mx-4 rounded-celestial p-4">
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        class="block py-2 font-body text-text-secondary hover:text-text-primary transition-colors"
        @click="isMobileOpen = false"
      >
        {{ link.label }}
      </a>
    </div>
  </header>
</template>
