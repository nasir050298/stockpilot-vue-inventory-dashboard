<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Barcode,
  Bell,
  Boxes,
  FileText,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users
} from 'lucide-vue-next'
import BarTrend from '../../components/charts/BarTrend.vue'
import CategoryDonut from '../../components/charts/CategoryDonut.vue'

const modules = [
  { icon: Boxes, title: 'Products', text: 'SKU, barcode, price, supplier, and product image.' },
  { icon: Truck, title: 'Purchases', text: 'Purchase orders, supplier deliveries, and receiving.' },
  { icon: FileText, title: 'Invoices', text: 'Invoice preview, payment status, and print-ready UI.' },
  { icon: Users, title: 'Customers', text: 'Sales history, balances, and customer types.' }
]
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-24">
    <div class="absolute inset-0 shelf-grid opacity-70" />
    <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1fr_560px]">
      <div>
        <span class="ops-badge bg-cyan-100 text-ops-indigo dark:bg-white/10 dark:text-ops-cyan">
          Vue-powered inventory system
        </span>
        <h1 class="mt-6 text-6xl font-black leading-[0.95] text-ops-ink dark:text-white md:text-8xl">
          Control stock, sales, purchases, and invoices.
        </h1>
        <p class="mt-6 max-w-2xl text-xl leading-9 text-slate-600 dark:text-slate-300">
          StockPilot Vue helps businesses track products, monitor stock, manage suppliers,
          process sales, and generate reports from one operational dashboard.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink to="/login" class="ops-button">Open Dashboard</RouterLink>
          <RouterLink to="/features" class="ops-button-alt">Explore Modules</RouterLink>
        </div>
        <div class="mt-10 grid grid-cols-3 gap-4">
          <div
            v-for="item in [['482','SKUs'],['৳ 11.8L','Stock value'],['14','Low alerts']]"
            :key="item[1]"
            class="ops-card p-5 text-center"
          >
            <p class="text-3xl font-black text-ops-cyan">{{ item[0] }}</p>
            <p class="text-xs font-black uppercase tracking-widest text-slate-500">{{ item[1] }}</p>
          </div>
        </div>
      </div>

      <div class="ops-panel p-5">
        <div class="rounded-[1.6rem] bg-ops-navy p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-bold text-ops-cyan">Today’s Operations</p>
              <p class="mt-2 text-5xl font-black">৳ 2,38,000</p>
            </div>
            <PackageCheck class="text-ops-cyan" :size="46" />
          </div>
          <div class="mt-6 grid grid-cols-3 gap-3">
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="text-xs text-slate-300">Sales</p>
              <p class="font-black text-ops-cyan">18</p>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="text-xs text-slate-300">Purchases</p>
              <p class="font-black text-ops-amber">3</p>
            </div>
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="text-xs text-slate-300">Invoices</p>
              <p class="font-black text-ops-green">24</p>
            </div>
          </div>
        </div>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <div class="rounded-[1.5rem] bg-white p-5 dark:bg-white/5">
            <Barcode class="text-ops-cyan" />
            <p class="mt-3 font-black">SKU & Barcode</p>
            <p class="text-sm text-slate-500">Search by code, scan placeholder, and product tracking.</p>
          </div>
          <div class="rounded-[1.5rem] bg-white p-5 dark:bg-white/5">
            <Bell class="text-ops-amber" />
            <p class="mt-3 font-black">Low-stock alerts</p>
            <p class="text-sm text-slate-500">Reorder level, supplier contact, and purchase order flow.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16">
    <div class="mx-auto max-w-7xl px-4">
      <div class="mx-auto mb-12 max-w-3xl text-center">
        <span class="ops-badge bg-cyan-100 text-ops-indigo dark:bg-white/10 dark:text-ops-cyan">
          Core modules
        </span>
        <h2 class="mt-4 text-4xl font-black md:text-6xl">
          Built for real inventory operations
        </h2>
      </div>
      <div class="grid gap-5 md:grid-cols-4">
        <div v-for="module in modules" :key="module.title" class="ops-panel p-6">
          <component :is="module.icon" class="text-ops-cyan" />
          <h3 class="mt-5 text-xl font-black">{{ module.title }}</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-300">{{ module.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white/60 py-16 dark:bg-white/[0.03]">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2">
      <BarTrend />
      <CategoryDonut />
    </div>
  </section>

  <section class="py-16">
    <div class="mx-auto max-w-7xl px-4">
      <div class="ops-panel grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span class="ops-badge bg-cyan-100 text-ops-indigo dark:bg-white/10 dark:text-ops-cyan">
            Vue portfolio project
          </span>
          <h2 class="mt-4 text-5xl font-black">
            Show Vue 3, Pinia, Router, tables, forms, charts, and business logic.
          </h2>
          <p class="mt-3 text-slate-500 dark:text-slate-300">
            A complete operational dashboard different from your React portfolio projects.
          </p>
        </div>
        <RouterLink to="/login" class="ops-button">View Demo</RouterLink>
      </div>
    </div>
  </section>
</template>
