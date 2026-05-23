<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Boxes, Moon, Sun } from 'lucide-vue-next'

const dark = ref(localStorage.getItem('stockpilot_theme') === 'dark')

watchEffect(() => {
  document.documentElement.classList.toggle('dark', dark.value)
  localStorage.setItem('stockpilot_theme', dark.value ? 'dark' : 'light')
})

const links = [
  ['Features', '/features'],
  ['Pricing', '/pricing'],
  ['FAQ', '/faq'],
  ['Contact', '/contact']
]
</script>

<template>
  <div class="ops-bg min-h-screen">
    <div class="border-b border-white/10 bg-ops-navy py-2 text-sm font-bold text-cyan-100">
      <div class="mx-auto flex max-w-7xl justify-between px-4">
        <span>Vue 3 inventory, sales, purchases, invoices, and stock control dashboard.</span>
        <span class="hidden md:inline">SKU • Barcode • Low-stock alerts • Reports</span>
      </div>
    </div>

    <header class="sticky top-0 z-50 border-b border-slate-200 bg-ops-cloud/90 backdrop-blur-xl dark:border-white/10 dark:bg-ops-ink/90">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <RouterLink to="/" class="flex items-center gap-3">
          <span class="rounded-2xl bg-ops-indigo p-3 text-white shadow-glow">
            <Boxes :size="28" />
          </span>
          <div>
            <p class="text-2xl font-black leading-none">StockPilot Vue</p>
            <p class="text-xs font-black uppercase tracking-[0.28em] text-ops-cyan">
              Inventory Ops
            </p>
          </div>
        </RouterLink>

        <div class="hidden rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/5 lg:flex">
          <RouterLink
            v-for="[label, to] in links"
            :key="to"
            :to="to"
            class="rounded-xl px-4 py-2 text-sm font-black text-slate-600 hover:text-ops-indigo dark:text-slate-300 dark:hover:text-ops-cyan"
            active-class="bg-ops-cyan text-ops-ink dark:bg-ops-cyan dark:text-ops-ink"
          >
            {{ label }}
          </RouterLink>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="dark = !dark"
            class="rounded-2xl border border-slate-200 p-3 dark:border-white/10"
          >
            <Sun v-if="dark" :size="19" />
            <Moon v-else :size="19" />
          </button>
          <RouterLink to="/login" class="ops-button-alt hidden md:inline-flex">
            Login
          </RouterLink>
        </div>
      </nav>
    </header>

    <RouterView />

    <footer class="border-t border-white/10 bg-ops-navy py-14 text-slate-200">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
        <div>
          <div class="flex items-center gap-3 text-2xl font-black">
            <Boxes class="text-ops-cyan" />
            StockPilot Vue
          </div>
          <p class="mt-4 text-slate-400">
            Operational inventory, sales, purchases, customers, suppliers, invoices, and reports.
          </p>
        </div>
        <div>
          <h3 class="font-black text-white">Inventory</h3>
          <p class="mt-3 text-slate-400">Products<br />Stock movements<br />Low stock<br />Valuation</p>
        </div>
        <div>
          <h3 class="font-black text-white">Commerce</h3>
          <p class="mt-3 text-slate-400">Sales<br />Purchases<br />Invoices<br />Payments</p>
        </div>
        <div>
          <h3 class="font-black text-white">Business</h3>
          <p class="mt-3 text-slate-400">Suppliers<br />Customers<br />Reports<br />Roles</p>
        </div>
      </div>
    </footer>
  </div>
</template>
