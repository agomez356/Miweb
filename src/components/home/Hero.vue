<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Particle, ParticleConfig } from '@/types/index';

const base = import.meta.env.BASE_URL;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isVisible = ref(false);
let animationId = 0;
let observer: IntersectionObserver | null = null;
let resizeTimer: ReturnType<typeof setTimeout>;
let prefersReducedMotion = false;
let motionQuery: MediaQueryList | null = null;

const config: ParticleConfig = {
  count: 80,
  minRadius: 0.5,
  maxRadius: 2,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  speed: 0.3,
  colors: ['#667eea', '#b9c3ff', '#fbbf24'],
};

let particles: Particle[] = [];

function isMobile(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticles(width: number, height: number): Particle[] {
  const count = isMobile() ? 40 : config.count;
  return Array.from({ length: count }, () => ({
    x: random(0, width),
    y: random(0, height),
    radius: random(config.minRadius, config.maxRadius),
    opacity: random(config.minOpacity, config.maxOpacity),
    vx: random(-config.speed, config.speed),
    vy: random(-config.speed, config.speed),
    color: config.colors[Math.floor(Math.random() * config.colors.length)],
  }));
}

function resizeCanvas(): void {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.scale(dpr, dpr);
  particles = createParticles(rect.width, rect.height);
}

function shouldAnimate(): boolean {
  return isVisible.value && !document.hidden && !prefersReducedMotion;
}

function paint(): void {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function draw(): void {
  if (!shouldAnimate()) {
    stopAnimation();
    return;
  }

  const canvas = canvasRef.value;
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Wrap at edges
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;
  }

  paint();
  animationId = requestAnimationFrame(draw);
}

function startAnimation(): void {
  cancelAnimationFrame(animationId);
  draw();
}

function stopAnimation(): void {
  cancelAnimationFrame(animationId);
  animationId = 0;
}

function syncAnimation(): void {
  if (shouldAnimate()) {
    startAnimation();
    return;
  }

  stopAnimation();
  if (prefersReducedMotion) paint();
}

function handleResize(): void {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resizeCanvas();
    syncAnimation();
  }, 100);
}

function onMotionChange(event: MediaQueryListEvent): void {
  prefersReducedMotion = event.matches;
  syncAnimation();
}

function onVisibilityChange(): void {
  syncAnimation();
}

onMounted(() => {
  resizeCanvas();

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion = motionQuery.matches;
  motionQuery.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', onVisibilityChange);

  observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = entries[0].isIntersecting;
      syncAnimation();
    },
    { threshold: 0.1 }
  );

  if (canvasRef.value) {
    observer.observe(canvasRef.value);
  }

  window.addEventListener('resize', handleResize);

  if (prefersReducedMotion) paint();
});

onUnmounted(() => {
  stopAnimation();
  observer?.disconnect();
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  motionQuery?.removeEventListener('change', onMotionChange);
  clearTimeout(resizeTimer);
});
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Canvas particles background -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />

    <!-- Hero content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
      <p class="font-space text-tertiary text-sm uppercase tracking-widest mb-4">
        Blog Educativo de Física
      </p>

      <h1 class="font-space font-bold text-5xl md:text-7xl leading-tight mb-6">
        <span
          class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Explorá el Universo
        </span>
        <br />
        <span class="text-text-primary">un concepto a la vez</span>
      </h1>

      <p class="font-body text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
        Física moderna explicada con rigor y pasión. Mecánica cuántica, relatividad,
        termodinámica y más — con visualizaciones interactivas.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          :href="`${base}/blog/`"
          class="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-space-bg font-space font-semibold rounded-celestial-xl hover:opacity-90 transition-opacity"
        >
          Leer el Blog
        </a>
        <a
          :href="`${base}/blog/`"
          class="px-8 py-4 glass font-space font-semibold text-text-primary rounded-celestial-xl hover:bg-primary/10 transition-colors"
        >
          Ver Categorías
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce" aria-hidden="true">
      <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>
