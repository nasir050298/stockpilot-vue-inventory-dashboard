<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>
      <span class="ops-badge bg-cyan-100 text-ops-indigo dark:bg-white/10 dark:text-ops-cyan">
        StockPilot Vue
      </span>
      <h1 class="mt-3 text-4xl font-black text-ops-ink dark:text-white md:text-5xl">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        {{ subtitle }}
      </p>
    </div>
    <slot name="action" />
  </div>
</template>
