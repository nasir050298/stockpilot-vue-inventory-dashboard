<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Boxes,
  ChartNoAxesCombined,
  FileText,
  PackagePlus,
  ReceiptText,
  ShieldCheck,
  Truck,
  Users
} from 'lucide-vue-next'

const route = useRoute()
const title = computed(() => String(route.meta.title || 'Features'))
const icons = [Boxes, PackagePlus, ReceiptText, Truck, Users, FileText, ChartNoAxesCombined, ShieldCheck]

const items = computed(() => {
  if (title.value === 'Pricing') return ['Starter', 'Business', 'Enterprise', 'Custom']
  if (title.value === 'FAQ') return ['Can I manage products and stock?', 'Does it include invoice UI?', 'Can I add backend later?', 'Does it support roles?']
  if (title.value === 'Contact') return ['Inventory support', 'Sales workflow', 'Backend integration', 'Report request']
  return ['Product management', 'Stock management', 'Sales workflow', 'Purchases', 'Customers and suppliers', 'Invoice system', 'Reports', 'Role-based UI']
})
</script>

<template>
  <section class="py-12">
    <div class="mx-auto max-w-7xl px-4">
      <div class="mb-12 text-center">
        <span class="ops-badge bg-cyan-100 text-ops-indigo dark:bg-white/10 dark:text-ops-cyan">
          {{ title }}
        </span>
        <h1 class="mt-4 text-5xl font-black md:text-7xl">
          {{
            title === 'Pricing'
              ? 'Plans for every operation size.'
              : title === 'FAQ'
                ? 'Questions and answers.'
                : title === 'Contact'
                  ? 'Talk to the operations desk.'
                  : 'Everything an inventory dashboard needs.'
          }}
        </h1>
      </div>
      <div class="grid gap-5 md:grid-cols-4">
        <div v-for="(item, index) in items" :key="item" class="ops-panel p-6">
          <component :is="icons[index % icons.length]" class="text-ops-cyan" />
          <h3 class="mt-4 text-xl font-black">{{ item }}</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">
            Professional Vue inventory dashboard module.
          </p>
          <button v-if="title === 'Contact'" class="ops-button-alt mt-5 w-full">Contact</button>
        </div>
      </div>
    </div>
  </section>
</template>
