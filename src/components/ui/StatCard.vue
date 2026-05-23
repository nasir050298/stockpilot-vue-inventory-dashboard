<script setup lang="ts">
defineProps<{
  label: string
  value: string
  note?: string
  tone?: 'cyan' | 'green' | 'amber' | 'red'
}>()
</script>

<template>
  <div class="ops-card p-5">
    <p class="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
      {{ label }}
    </p>
    <p
      class="mt-3 text-3xl font-black"
      :class="tone === 'red'
        ? 'text-ops-red'
        : tone === 'amber'
          ? 'text-ops-amber'
          : tone === 'green'
            ? 'text-ops-green'
            : 'text-ops-cyan'"
    >
      {{ value }}
    </p>
    <p v-if="note" class="mt-1 text-sm text-slate-500 dark:text-slate-400">
      {{ note }}
    </p>
  </div>
</template>
