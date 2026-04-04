<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="glass mt-24 py-12">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <p class="font-space font-bold text-lg text-primary-light mb-2">FísicaFans</p>
      <p class="font-body text-text-muted text-sm">
        © {{ year }} FísicaFans — Explorando el universo, un concepto a la vez.
      </p>
    </div>
  </footer>
</template>
