<script setup lang="ts">
import { trend } from '../../data/mockData'

const max = Math.max(...trend.map((item) => item.sales))
</script>

<template>
  <div class="ops-panel p-6">
    <h3 class="text-2xl font-black">Sales / purchase rhythm</h3>
    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Monthly operational cash flow
    </p>
    <div class="mt-6 flex h-72 items-end gap-4">
      <div
        v-for="item in trend"
        :key="item.month"
        class="flex flex-1 flex-col items-center gap-2"
      >
        <div class="flex h-56 w-full items-end justify-center gap-1 rounded-2xl bg-slate-50 p-2 dark:bg-white/5">
          <div
            class="w-4 rounded-t-lg bg-ops-cyan"
            :style="{ height: `${(item.sales / max) * 100}%` }"
          />
          <div
            class="w-4 rounded-t-lg bg-ops-amber"
            :style="{ height: `${(item.purchases / max) * 100}%` }"
          />
        </div>
        <span class="text-xs font-black text-slate-500">{{ item.month }}</span>
      </div>
    </div>
  </div>
</template>
