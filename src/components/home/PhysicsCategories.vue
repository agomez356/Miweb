<script setup lang="ts">
import type { PhysicsCategory } from '@/types/index';

interface Category {
  id: PhysicsCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    id: 'termodinamica',
    title: 'Termodinámica',
    description: 'Energía, calor y las leyes que gobiernan las transformaciones en la materia.',
    icon: '🌡️',
    color: '#ec4899',
  },
  {
    id: 'mecanica-cuantica',
    title: 'Mecánica Cuántica',
    description: 'La naturaleza a escalas subatómicas: partículas, ondas y el principio de incertidumbre.',
    icon: '⚛️',
    color: '#667eea',
  },
  {
    id: 'fisica-clasica',
    title: 'Física Clásica',
    description: 'Newton, movimiento, fuerzas y las leyes que gobiernan nuestro mundo cotidiano.',
    icon: '🍎',
    color: '#fbbf24',
  },
  {
    id: 'electromagnetismo',
    title: 'Electromagnetismo',
    description: 'Cargas, campos eléctricos y magnéticos unificados en la teoría de Maxwell.',
    icon: '⚡',
    color: '#10b981',
  },
  {
    id: 'relatividad',
    title: 'Teoría de la Relatividad',
    description: 'Einstein, espacio-tiempo, dilatación temporal y la velocidad de la luz.',
    icon: '🌌',
    color: '#b9c3ff',
  },
];
</script>

<template>
  <section class="py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <p class="font-space text-tertiary text-sm uppercase tracking-widest mb-3">
          Campos de la Física
        </p>
        <h2 class="font-space font-bold text-4xl md:text-5xl text-text-primary">
          Explorá las ramas
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="cat in categories"
          :key="cat.id"
          href="#"
          class="glass rounded-celestial-lg p-8 group transition-all duration-300 hover:-translate-y-1"
          :style="{ '--cat-color': cat.color }"
        >
          <div class="text-4xl mb-4">{{ cat.icon }}</div>
          <h3
            class="font-space font-semibold text-xl mb-3 text-text-primary group-hover:text-primary-light transition-colors"
          >
            {{ cat.title }}
          </h3>
          <p class="font-body text-text-secondary text-sm leading-relaxed">
            {{ cat.description }}
          </p>
          <div
            class="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
            :style="{ backgroundColor: cat.color }"
          />
        </a>
      </div>
    </div>
  </section>
</template>
