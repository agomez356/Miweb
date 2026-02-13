---
name: vue-composable-generator
description: Generate Vue 3 composables with TypeScript for reusable logic including Canvas animations, Intersection Observer, and physics simulations. Use when creating Vue composables or extracting reusable component logic.
allowed-tools: Read, Write
---

# Vue Composable Generator

Generate type-safe Vue 3 composables using Composition API for the FísicaFans blog, focusing on Canvas animations, intersection observers, and physics simulation logic.

## What are Composables?

Composables are reusable functions that encapsulate reactive logic in Vue 3. They follow the convention of being named with `use` prefix (e.g., `useCanvas`, `useIntersectionObserver`).

## Core Composables for Physics Blog

### 1. useCanvas (Canvas Animation Loop)

For physics visualizations requiring animation frames.

**File**: `src/composables/useCanvas.ts`

```typescript
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseCanvasOptions {
  width?: number
  height?: number
  fps?: number
}

export function useCanvas(options: UseCanvasOptions = {}) {
  const {
    width = 800,
    height = 600,
    fps = 60
  } = options

  const canvas = ref<HTMLCanvasElement>()
  const ctx = ref<CanvasRenderingContext2D | null>(null)
  const isAnimating = ref(false)
  const actualFps = ref(0)

  let animationFrameId: number
  let lastTime = 0
  let frameCount = 0
  let fpsUpdateTime = 0

  const initCanvas = () => {
    if (!canvas.value) return
    ctx.value = canvas.value.getContext('2d')
  }

  const startAnimation = (callback: (ctx: CanvasRenderingContext2D, deltaTime: number) => void) => {
    if (!ctx.value) return

    isAnimating.value = true
    lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isAnimating.value || !ctx.value) return

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // FPS calculation
      frameCount++
      if (currentTime - fpsUpdateTime >= 1000) {
        actualFps.value = frameCount
        frameCount = 0
        fpsUpdateTime = currentTime
      }

      // Call user's render function
      callback(ctx.value, deltaTime)

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  const stopAnimation = () => {
    isAnimating.value = false
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }

  const clearCanvas = () => {
    if (!ctx.value || !canvas.value) return
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }

  onMounted(() => {
    initCanvas()
  })

  onUnmounted(() => {
    stopAnimation()
  })

  return {
    canvas,
    ctx,
    isAnimating,
    actualFps,
    width: ref(width),
    height: ref(height),
    startAnimation,
    stopAnimation,
    clearCanvas
  }
}
```

**Usage:**

```vue
<script setup lang="ts">
import { useCanvas } from '@/composables/useCanvas'

const { canvas, width, height, startAnimation, stopAnimation, clearCanvas } = useCanvas({
  width: 800,
  height: 600,
  fps: 60
})

const amplitude = ref(1)
const frequency = ref(1)

onMounted(() => {
  startAnimation((ctx, deltaTime) => {
    clearCanvas()

    // Draw wave
    ctx.strokeStyle = '#667eea'
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let x = 0; x < width.value; x++) {
      const y = height.value / 2 + amplitude.value * 50 * Math.sin(frequency.value * x * 0.02)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }

    ctx.stroke()
  })
})
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>
```

---

### 2. useIntersectionObserver (Lazy Load Components)

For loading physics visualizations only when in viewport.

**File**: `src/composables/useIntersectionObserver.ts`

```typescript
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  once?: boolean
}

export function useIntersectionObserver(
  target: Ref<HTMLElement | undefined>,
  callback: (isIntersecting: boolean) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    once = false
  } = options

  const isIntersecting = ref(false)
  const hasIntersected = ref(false)
  let observer: IntersectionObserver | null = null

  const cleanup = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.value = entry.isIntersecting

        if (entry.isIntersecting) {
          hasIntersected.value = true
          callback(true)

          if (once) {
            cleanup()
          }
        } else {
          callback(false)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    isIntersecting,
    hasIntersected
  }
}
```

**Usage:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const container = ref<HTMLDivElement>()
const shouldRender = ref(false)

useIntersectionObserver(
  container,
  (isVisible) => {
    if (isVisible) {
      shouldRender.value = true
      console.log('Physics simulator now visible')
    }
  },
  { threshold: 0.3, once: true }
)
</script>

<template>
  <div ref="container">
    <WaveSimulator v-if="shouldRender" />
  </div>
</template>
```

---

### 3. usePhysicsSimulation (Reusable Physics Logic)

For common physics calculations.

**File**: `src/composables/usePhysicsSimulation.ts`

```typescript
import { ref, computed, type Ref } from 'vue'

export interface Vector2D {
  x: number
  y: number
}

export function usePhysicsSimulation() {
  const time = ref(0)
  const paused = ref(false)

  // Vector operations
  const vectorAdd = (v1: Vector2D, v2: Vector2D): Vector2D => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y
  })

  const vectorScale = (v: Vector2D, scalar: number): Vector2D => ({
    x: v.x * scalar,
    y: v.y * scalar
  })

  const vectorMagnitude = (v: Vector2D): number =>
    Math.sqrt(v.x * v.x + v.y * v.y)

  const vectorNormalize = (v: Vector2D): Vector2D => {
    const mag = vectorMagnitude(v)
    return mag > 0 ? { x: v.x / mag, y: v.y / mag } : { x: 0, y: 0 }
  }

  // Physics calculations
  const calculateLorentzFactor = (velocity: number, speedOfLight: number = 3e8): number => {
    const beta = velocity / speedOfLight
    return 1 / Math.sqrt(1 - beta * beta)
  }

  const calculateKineticEnergy = (mass: number, velocity: number): number => {
    return 0.5 * mass * velocity * velocity
  }

  const calculateWaveFunction = (
    x: number,
    t: number,
    amplitude: number,
    frequency: number,
    phase: number = 0
  ): number => {
    const k = frequency * 2 * Math.PI
    const omega = frequency * 2 * Math.PI
    return amplitude * Math.sin(k * x - omega * t + phase)
  }

  const updateTime = (deltaTime: number) => {
    if (!paused.value) {
      time.value += deltaTime / 1000 // Convert ms to seconds
    }
  }

  const resetSimulation = () => {
    time.value = 0
    paused.value = false
  }

  return {
    time,
    paused,
    vectorAdd,
    vectorScale,
    vectorMagnitude,
    vectorNormalize,
    calculateLorentzFactor,
    calculateKineticEnergy,
    calculateWaveFunction,
    updateTime,
    resetSimulation
  }
}
```

**Usage:**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCanvas } from '@/composables/useCanvas'
import { usePhysicsSimulation } from '@/composables/usePhysicsSimulation'

const { canvas, width, height, startAnimation, clearCanvas } = useCanvas()
const { time, updateTime, calculateWaveFunction, resetSimulation } = usePhysicsSimulation()

const amplitude = ref(1)
const frequency = ref(1)

onMounted(() => {
  startAnimation((ctx, deltaTime) => {
    updateTime(deltaTime)
    clearCanvas()

    ctx.strokeStyle = '#667eea'
    ctx.beginPath()

    for (let x = 0; x < width.value; x++) {
      const y = height.value / 2 + calculateWaveFunction(
        x * 0.01,
        time.value,
        amplitude.value * 50,
        frequency.value
      )
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }

    ctx.stroke()
  })
})
</script>
```

---

### 4. useResponsiveCanvas (Auto-resize Canvas)

For responsive Canvas elements.

**File**: `src/composables/useResponsiveCanvas.ts`

```typescript
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseResponsiveCanvasOptions {
  aspectRatio?: number
  maxWidth?: number
  maxHeight?: number
}

export function useResponsiveCanvas(options: UseResponsiveCanvasOptions = {}) {
  const {
    aspectRatio = 4 / 3,
    maxWidth = 1200,
    maxHeight = 900
  } = options

  const container = ref<HTMLElement>()
  const width = ref(800)
  const height = ref(600)

  const updateDimensions = () => {
    if (!container.value) return

    const containerWidth = container.value.clientWidth
    const newWidth = Math.min(containerWidth, maxWidth)
    const newHeight = Math.min(newWidth / aspectRatio, maxHeight)

    width.value = newWidth
    height.value = newHeight
  }

  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  return {
    container,
    width,
    height
  }
}
```

---

### 5. useDebounce (Debounce Slider Inputs)

For debouncing slider changes in physics controls.

**File**: `src/composables/useDebounce.ts`

```typescript
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(value, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}
```

**Usage:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const amplitude = ref(1)
const debouncedAmplitude = useDebounce(amplitude, 300)

// Use debouncedAmplitude for expensive calculations
watch(debouncedAmplitude, (newValue) => {
  console.log('Recalculating with amplitude:', newValue)
  // Expensive physics calculation here
})
</script>

<template>
  <input v-model.number="amplitude" type="range" min="0.1" max="2" step="0.1">
</template>
```

---

## Composable Best Practices

1. **Naming**: Always start with `use` prefix
2. **TypeScript**: Always use type annotations
3. **Cleanup**: Use `onUnmounted` for cleanup
4. **Reactivity**: Return `ref` or `computed` values
5. **Options**: Accept options object with defaults
6. **Reusability**: Keep composables focused and single-purpose

## Testing Composables

```typescript
// src/composables/__tests__/usePhysicsSimulation.test.ts
import { describe, it, expect } from 'vitest'
import { usePhysicsSimulation } from '../usePhysicsSimulation'

describe('usePhysicsSimulation', () => {
  it('calculates Lorentz factor correctly', () => {
    const { calculateLorentzFactor } = usePhysicsSimulation()
    const gamma = calculateLorentzFactor(0.9 * 3e8, 3e8)
    expect(gamma).toBeCloseTo(2.294, 2)
  })

  it('calculates kinetic energy correctly', () => {
    const { calculateKineticEnergy } = usePhysicsSimulation()
    const ke = calculateKineticEnergy(10, 5)
    expect(ke).toBe(125)
  })
})
```

## Composable Directory Structure

```
src/composables/
├── useCanvas.ts
├── useIntersectionObserver.ts
├── usePhysicsSimulation.ts
├── useResponsiveCanvas.ts
├── useDebounce.ts
└── __tests__/
    └── usePhysicsSimulation.test.ts
```

## Reference

For template files, see [templates/](templates/) directory.
