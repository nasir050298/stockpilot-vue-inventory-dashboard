<script setup lang="ts">
import { categories } from '../../data/mockData'
import { money } from '../../utils/format'

const max = Math.max(...categories.map((item) => item.stockValue))
const colors = ['#22D3EE', '#6366F1', '#F59E0B', '#22C55E']
</script>

<template>
  <div class="ops-panel p-6">
    <h3 class="text-2xl font-black">Stock value by category</h3>
    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Inventory valuation overview
    </p>
    <div class="mt-6 space-y-4">
      <div v-for="(item, index) in categories" :key="item.id">
        <div class="mb-2 flex justify-between text-sm font-bold">
          <span class="flex items-center gap-2">
            <span class="h-3 w-3 rounded-full" :style="{ background: colors[index] }" />
            {{ item.name }}
          </span>
          <span>{{ money(item.stockValue) }}</span>
        </div>
        <div class="stock-meter">
          <div
            class="h-full rounded-full"
            :style="{ width: `${(item.stockValue / max) * 100}%`, background: colors[index] }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
