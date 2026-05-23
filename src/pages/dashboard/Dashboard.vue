<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { PackagePlus } from 'lucide-vue-next'
import { purchases, sales } from '../../data/mockData'
import { useInventoryStore } from '../../stores/inventory'
import { money } from '../../utils/format'
import BarTrend from '../../components/charts/BarTrend.vue'
import CategoryDonut from '../../components/charts/CategoryDonut.vue'
import PageHeader from '../../components/ui/PageHeader.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'

const store = useInventoryStore()
const todaysSales = computed(() => sales.reduce((sum, sale) => sum + sale.total, 0))
const pendingPurchases = computed(() => purchases.filter((purchase) => purchase.status !== 'Received').length)
const expectedProfit = computed(() => store.potentialRevenue - store.totalStockValue)
</script>

<template>
  <PageHeader
    title="Dashboard overview"
    subtitle="Warehouse, stock, sales, purchases, invoices, alerts, and valuation at a glance."
  >
    <template #action>
      <RouterLink to="/app/products/new" class="ops-button">
        <PackagePlus :size="18" />
        Add Product
      </RouterLink>
    </template>
  </PageHeader>

  <div class="grid gap-5 md:grid-cols-4 xl:grid-cols-8">
    <StatCard label="Products" :value="String(store.products.length)" note="Active SKUs" />
    <StatCard label="Stock Value" :value="money(store.totalStockValue)" note="Cost basis" tone="green" />
    <StatCard label="Today Sales" :value="money(todaysSales)" note="Completed + pending" />
    <StatCard label="Monthly Revenue" :value="money(238000)" note="May revenue" />
    <StatCard label="Low Stock" :value="String(store.lowStockProducts.length)" note="Needs reorder" tone="amber" />
    <StatCard label="Pending PO" :value="String(pendingPurchases)" note="Supplier orders" tone="amber" />
    <StatCard label="Potential Revenue" :value="money(store.potentialRevenue)" note="Current inventory" />
    <StatCard label="Expected Profit" :value="money(expectedProfit)" note="Inventory margin" tone="green" />
  </div>

  <div class="mt-8 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
    <BarTrend />
    <CategoryDonut />
  </div>

  <div class="mt-8 grid gap-6 xl:grid-cols-2">
    <div class="ops-panel p-6">
      <h2 class="text-2xl font-black">Recent sales</h2>
      <div class="mt-5 space-y-3">
        <div
          v-for="sale in sales"
          :key="sale.id"
          class="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-white/5"
        >
          <div>
            <p class="font-black">{{ sale.invoiceNo }}</p>
            <p class="text-sm text-slate-500">{{ sale.customer }} • {{ sale.paymentMethod }}</p>
          </div>
          <div class="text-right">
            <p class="font-black text-ops-green">{{ money(sale.total) }}</p>
            <StatusBadge :status="sale.status" />
          </div>
        </div>
      </div>
    </div>

    <div class="ops-panel p-6">
      <h2 class="text-2xl font-black">Low-stock alerts</h2>
      <div class="mt-5 space-y-3">
        <div
          v-for="product in store.lowStockProducts"
          :key="product.id"
          class="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-white/5"
        >
          <div>
            <p class="font-black">{{ product.name }}</p>
            <p class="text-sm text-slate-500">{{ product.sku }} • Reorder at {{ product.reorder }}</p>
          </div>
          <p class="font-black text-ops-amber">{{ product.stock }} left</p>
        </div>
      </div>
    </div>
  </div>
</template>
