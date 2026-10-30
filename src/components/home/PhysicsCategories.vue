<script setup lang="ts">
import { CATEGORIES, categoryHref } from '@/utils/categories';

const categories = CATEGORIES;
</script>

<template>
  <section class="py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <p class="font-space text-tertiary text-sm uppercase tracking-widest mb-3">Campos de la Física</p>
        <h2 class="font-space font-bold text-4xl md:text-5xl text-text-primary">Explorá las ramas</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="cat in categories"
          :id="cat.id"
          :key="cat.id"
          :href="categoryHref(cat.id)"
          class="glass rounded-celestial-lg p-8 group scroll-mt-24 transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          :style="{ '--cat-color': cat.color }"
        >
          <div class="text-4xl mb-4">{{ cat.icon }}</div>
          <h3 class="font-space font-semibold text-xl mb-3 text-text-primary group-hover:text-primary-light transition-colors">
            {{ cat.title }}
          </h3>
          <p class="font-body text-text-secondary text-sm leading-relaxed">
            {{ cat.description }}
          </p>
          <div class="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" :style="{ backgroundColor: cat.color }" />
        </a>
      </div>
    </div>
  </section>
</template>
