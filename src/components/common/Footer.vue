<script setup lang="ts">
import { withBase } from '@/utils/withBase';

const year = new Date().getFullYear();
const acercaHref = withBase('/acerca/');
</script>

<template>
  <footer class="glass mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
      <p class="font-space font-bold text-lg text-primary-light mb-2">FísicaFans</p>
      <a
        :href="acercaHref"
        class="inline-flex items-center justify-center min-h-11 mb-2 font-body text-sm text-text-secondary hover:text-primary-light transition-colors"
      >
        Acerca de
      </a>
      <p class="font-body text-text-muted text-sm">
        © {{ year }} FísicaFans — Explorando el universo, un concepto a la vez.
      </p>
    </div>
  </footer>
</template>
