<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

function updateProgress(): void {
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
}

onMounted(() => window.addEventListener('scroll', updateProgress, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', updateProgress));
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-surface">
    <div
      class="h-full bg-gradient-to-r from-primary to-secondary transition-none"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
