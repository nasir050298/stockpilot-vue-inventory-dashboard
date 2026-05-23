<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useInventoryStore } from '../../stores/inventory'
import {
  Bell,
  Boxes,
  ChartNoAxesCombined,
  FileText,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  ReceiptText,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  UserCog,
  Users,
  Warehouse
} from 'lucide-vue-next'

const auth = useAuthStore()
const inventory = useInventoryStore()
const router = useRouter()
const unread = computed(() => inventory.notifications.filter((item) => !item.read).length)

const allNav = [
  ['Dashboard', '/app', LayoutDashboard, ['admin', 'manager', 'staff']],
  ['Products', '/app/products', Boxes, ['admin', 'manager', 'staff']],
  ['Add Product', '/app/products/new', PackagePlus, ['admin', 'manager']],
  ['Categories', '/app/categories', Tags, ['admin', 'manager']],
  ['Stock Management', '/app/stock', Warehouse, ['admin', 'manager']],
  ['Sales', '/app/sales', ShoppingCart, ['admin', 'manager', 'staff']],
  ['Create Sale', '/app/sales/create', ReceiptText, ['admin', 'manager', 'staff']],
  ['Purchases', '/app/purchases', Truck, ['admin', 'manager']],
  ['Create Purchase', '/app/purchases/create', PackagePlus, ['admin', 'manager']],
  ['Suppliers', '/app/suppliers', Truck, ['admin', 'manager']],
  ['Customers', '/app/customers', Users, ['admin', 'manager', 'staff']],
  ['Invoices', '/app/invoices', FileText, ['admin', 'manager', 'staff']],
  ['Reports', '/app/reports', ChartNoAxesCombined, ['admin', 'manager']],
  ['Low Stock', '/app/low-stock', Bell, ['admin', 'manager']],
  ['Notifications', '/app/notifications', Bell, ['admin', 'manager', 'staff']],
  ['Users/Roles', '/app/users', UserCog, ['admin']],
  ['Settings', '/app/settings', Settings, ['admin', 'manager']]
] as const

const navItems = computed(() =>
  allNav.filter((item) => (item[3] as readonly string[]).includes(auth.user?.role || 'staff'))
)

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[#EEF2F7] dark:bg-ops-ink">
    <aside class="fixed inset-y-0 left-0 z-40 hidden w-80 flex-col border-r border-white/10 bg-ops-navy p-5 text-white lg:flex">
      <div class="flex items-center gap-3">
        <span class="rounded-2xl bg-ops-cyan p-3 text-ops-ink">
          <Boxes :size="25" />
        </span>
        <div>
          <p class="text-2xl font-black">StockPilot Vue</p>
          <p class="text-xs font-black uppercase tracking-[0.25em] text-ops-cyan">Ops Console</p>
        </div>
      </div>

      <div class="mt-8 rounded-[1.6rem] border border-white/10 bg-white/10 p-5">
        <p class="font-black">{{ auth.user?.name }}</p>
        <p class="mt-1 text-sm capitalize text-ops-cyan">{{ auth.user?.role }} access</p>
        <p class="mt-4 text-xs text-slate-300">
          SKU, barcode, stock, invoices, purchases, and reports.
        </p>
      </div>

      <nav class="mt-6 flex-1 space-y-1 overflow-y-auto pr-1">
        <RouterLink
          v-for="[label, to, Icon] in navItems"
          :key="to"
          :to="to"
          class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-300 transition hover:bg-white/10 hover:text-white"
          active-class="!bg-ops-cyan !text-ops-ink"
        >
          <component :is="Icon" :size="18" />
          <span>{{ label }}</span>
          <span
            v-if="label === 'Notifications' && unread > 0"
            class="ml-auto rounded-full bg-ops-red px-2 text-xs text-white"
          >
            {{ unread }}
          </span>
        </RouterLink>
      </nav>

      <div class="mt-5 shrink-0 border-t border-white/10 pt-5">
        <button
          @click="logout"
          class="flex w-full items-center justify-center gap-3 rounded-2xl bg-rose-500/15 px-4 py-3 text-sm font-black text-rose-200 transition hover:bg-rose-500 hover:text-white"
        >
          <LogOut :size="18" />
          Logout
        </button>
      </div>
    </aside>

    <main class="lg:pl-80">
      <header class="sticky top-0 z-30 border-b border-slate-200 bg-[#EEF2F7]/85 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-ops-ink/85">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-black">Inventory Operations Console</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Products, stock, purchases, sales, invoices, and reports.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="relative rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5">
              <Bell :size="18" />
              <span
                v-if="unread > 0"
                class="absolute -right-1 -top-1 rounded-full bg-ops-red px-1.5 text-xs text-white"
              >
                {{ unread }}
              </span>
            </span>
            <button
              @click="logout"
              class="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-black text-rose-500 transition hover:bg-rose-500 hover:text-white lg:hidden"
            >
              Logout
            </button>
            <span class="hidden rounded-2xl bg-ops-cyan px-5 py-3 font-black capitalize text-ops-ink md:inline-flex">
              {{ auth.user?.role }}
            </span>
          </div>
        </div>
      </header>

      <div class="p-4 md:p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
