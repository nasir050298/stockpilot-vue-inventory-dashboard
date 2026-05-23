<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Plus } from 'lucide-vue-next'
import {
  categories,
  customers,
  movements,
  notifications,
  products,
  purchases,
  sales,
  suppliers
} from '../../data/mockData'
import { useInventoryStore } from '../../stores/inventory'
import { money } from '../../utils/format'
import PageHeader from '../../components/ui/PageHeader.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import BarTrend from '../../components/charts/BarTrend.vue'
import CategoryDonut from '../../components/charts/CategoryDonut.vue'

const route = useRoute()
const store = useInventoryStore()
const title = computed(() => String(route.meta.title || 'Module'))
const kind = computed(() => String(route.meta.kind || 'module'))
</script>

<template>
  <PageHeader :title="title" subtitle="Operational module with real business dashboard UI, tables, cards, filters, forms, and management actions.">
    <template #action>
      <RouterLink
        v-if="kind === 'sales'"
        to="/app/sales/create"
        class="ops-button"
      >
        <Plus :size="18" />
        Create Sale
      </RouterLink>
      <RouterLink
        v-else-if="kind === 'purchases'"
        to="/app/purchases/create"
        class="ops-button"
      >
        <Plus :size="18" />
        Create Purchase
      </RouterLink>
    </template>
  </PageHeader>

  <div v-if="kind === 'categories'" class="grid gap-5 md:grid-cols-4">
    <div v-for="category in categories" :key="category.id" class="ops-panel p-6">
      <div class="flex justify-between">
        <h3 class="text-2xl font-black">{{ category.name }}</h3>
        <StatusBadge :status="category.status" />
      </div>
      <p class="mt-2 text-sm text-slate-500">{{ category.description }}</p>
      <div class="mt-6 grid grid-cols-2 gap-3">
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Products</p>
          <p class="font-black">{{ category.productCount }}</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Low stock</p>
          <p class="font-black text-ops-amber">{{ category.lowStockCount }}</p>
        </div>
      </div>
      <p class="mt-4 font-black text-ops-cyan">{{ money(category.stockValue) }}</p>
      <button class="ops-button-alt mt-5 w-full">Edit Category</button>
    </div>
  </div>

  <div v-else-if="kind === 'stock'" class="grid gap-6 lg:grid-cols-[380px_1fr]">
    <div class="ops-panel p-6">
      <h2 class="text-2xl font-black">Stock adjustment</h2>
      <div class="mt-5 space-y-3">
        <select class="ops-input">
          <option v-for="product in products" :key="product.id">{{ product.name }}</option>
        </select>
        <select class="ops-input">
          <option>Stock In</option>
          <option>Stock Out</option>
          <option>Damage</option>
          <option>Return</option>
          <option>Correction</option>
          <option>Transfer</option>
        </select>
        <input class="ops-input" placeholder="Quantity" />
        <input class="ops-input" placeholder="Reason" />
        <input class="ops-input" type="date" />
        <textarea class="ops-input h-24" placeholder="Note" />
        <button class="ops-button w-full">Apply Adjustment</button>
      </div>
    </div>

    <div class="ops-panel overflow-auto">
      <table class="w-full min-w-[850px]">
        <thead>
          <tr>
            <th class="table-th">Date</th>
            <th class="table-th">Product</th>
            <th class="table-th">Type</th>
            <th class="table-th">Qty</th>
            <th class="table-th">Previous</th>
            <th class="table-th">New</th>
            <th class="table-th">Handled By</th>
            <th class="table-th">Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in movements" :key="movement.id" class="border-t border-slate-100 dark:border-white/10">
            <td class="table-td">{{ movement.date }}</td>
            <td class="table-td font-black">{{ movement.product }}</td>
            <td class="table-td">{{ movement.type }}</td>
            <td class="table-td">{{ movement.quantity }}</td>
            <td class="table-td">{{ movement.previousStock }}</td>
            <td class="table-td">{{ movement.newStock }}</td>
            <td class="table-td">{{ movement.handledBy }}</td>
            <td class="table-td">{{ movement.reason }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else-if="kind === 'sales'" class="ops-panel overflow-auto">
    <table class="w-full min-w-[950px]">
      <thead>
        <tr>
          <th class="table-th">Invoice</th>
          <th class="table-th">Customer</th>
          <th class="table-th">Products</th>
          <th class="table-th">Payment</th>
          <th class="table-th">Total</th>
          <th class="table-th">Payment Status</th>
          <th class="table-th">Sale Status</th>
          <th class="table-th">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ sale.invoiceNo }}</td>
          <td class="table-td">{{ sale.customer }}</td>
          <td class="table-td">{{ sale.products.join(', ') }}</td>
          <td class="table-td">{{ sale.paymentMethod }}</td>
          <td class="table-td font-black text-ops-green">{{ money(sale.total) }}</td>
          <td class="table-td"><StatusBadge :status="sale.paymentStatus" /></td>
          <td class="table-td"><StatusBadge :status="sale.status" /></td>
          <td class="table-td">{{ sale.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="kind === 'createSale' || kind === 'createPurchase'" class="ops-panel p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <select class="ops-input">
        <option v-if="kind === 'createSale'" v-for="customer in customers" :key="customer.id">{{ customer.name }}</option>
        <option v-else v-for="supplier in suppliers" :key="supplier.id">{{ supplier.company }}</option>
      </select>
      <input class="ops-input" type="date" />
      <select class="ops-input">
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Partial</option>
      </select>
    </div>

    <div class="mt-6 rounded-[1.5rem] bg-slate-50 p-4 dark:bg-white/5">
      <h3 class="mb-4 font-black">Line items</h3>
      <div
        v-for="product in products.slice(0, 3)"
        :key="product.id"
        class="mb-3 grid gap-3 md:grid-cols-[1fr_120px_160px]"
      >
        <input class="ops-input" :value="product.name" />
        <input class="ops-input" value="1" />
        <input class="ops-input" :value="kind === 'createSale' ? product.price : product.cost" />
      </div>
    </div>

    <div class="mt-6 flex justify-end">
      <div class="w-full max-w-sm rounded-[1.5rem] bg-ops-navy p-5 text-white">
        <p class="flex justify-between"><span>Subtotal</span><b>৳ 16,000</b></p>
        <p class="mt-2 flex justify-between"><span>Discount</span><b>৳ 500</b></p>
        <p class="mt-2 flex justify-between"><span>Tax</span><b>৳ 775</b></p>
        <p class="mt-4 flex justify-between border-t border-white/10 pt-4 text-xl">
          <span>Total</span><b class="text-ops-cyan">৳ 16,275</b>
        </p>
      </div>
    </div>

    <button class="ops-button mt-5">
      {{ kind === 'createSale' ? 'Save Sale & Generate Invoice' : 'Save Purchase Order' }}
    </button>
  </div>

  <div v-else-if="kind === 'purchases'" class="ops-panel overflow-auto">
    <table class="w-full min-w-[900px]">
      <thead>
        <tr>
          <th class="table-th">Order No</th>
          <th class="table-th">Supplier</th>
          <th class="table-th">Products</th>
          <th class="table-th">Cost</th>
          <th class="table-th">Status</th>
          <th class="table-th">Payment</th>
          <th class="table-th">Expected</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="purchase in purchases" :key="purchase.id" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ purchase.orderNo }}</td>
          <td class="table-td">{{ purchase.supplier }}</td>
          <td class="table-td">{{ purchase.products.join(', ') }}</td>
          <td class="table-td font-black">{{ money(purchase.totalCost) }}</td>
          <td class="table-td"><StatusBadge :status="purchase.status" /></td>
          <td class="table-td"><StatusBadge :status="purchase.paymentStatus" /></td>
          <td class="table-td">{{ purchase.expectedDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="kind === 'suppliers'" class="grid gap-5 md:grid-cols-3">
    <div v-for="supplier in suppliers" :key="supplier.id" class="ops-panel p-6">
      <div class="flex justify-between">
        <h3 class="text-2xl font-black">{{ supplier.company }}</h3>
        <StatusBadge :status="supplier.status" />
      </div>
      <p class="mt-2 text-sm text-slate-500">
        {{ supplier.contactPerson }} • {{ supplier.phone }}
      </p>
      <p class="mt-1 text-sm text-slate-500">{{ supplier.email }}</p>
      <div class="mt-5 grid grid-cols-2 gap-3">
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Products</p>
          <p class="font-black">{{ supplier.productsSupplied }}</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Outstanding</p>
          <p class="font-black text-ops-amber">{{ money(supplier.outstandingBalance) }}</p>
        </div>
      </div>
      <p class="mt-4 font-black text-ops-cyan">
        Total purchases: {{ money(supplier.totalPurchases) }}
      </p>
    </div>
  </div>

  <div v-else-if="kind === 'customers'" class="ops-panel overflow-auto">
    <table class="w-full min-w-[900px]">
      <thead>
        <tr>
          <th class="table-th">Customer</th>
          <th class="table-th">Contact</th>
          <th class="table-th">Type</th>
          <th class="table-th">Total Purchases</th>
          <th class="table-th">Outstanding</th>
          <th class="table-th">Last Purchase</th>
          <th class="table-th">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ customer.name }}</td>
          <td class="table-td">{{ customer.phone }}<br /><span class="text-xs text-slate-500">{{ customer.email }}</span></td>
          <td class="table-td">{{ customer.type }}</td>
          <td class="table-td">{{ money(customer.totalPurchases) }}</td>
          <td class="table-td">{{ money(customer.outstandingBalance) }}</td>
          <td class="table-td">{{ customer.lastPurchase }}</td>
          <td class="table-td"><StatusBadge :status="customer.status" /></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="kind === 'invoices'" class="ops-panel overflow-auto">
    <table class="w-full min-w-[850px]">
      <thead>
        <tr>
          <th class="table-th">Invoice</th>
          <th class="table-th">Customer</th>
          <th class="table-th">Total</th>
          <th class="table-th">Payment</th>
          <th class="table-th">Status</th>
          <th class="table-th">Date</th>
          <th class="table-th">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.id" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ sale.invoiceNo }}</td>
          <td class="table-td">{{ sale.customer }}</td>
          <td class="table-td">{{ money(sale.total) }}</td>
          <td class="table-td"><StatusBadge :status="sale.paymentStatus" /></td>
          <td class="table-td"><StatusBadge :status="sale.status" /></td>
          <td class="table-td">{{ sale.date }}</td>
          <td class="table-td"><RouterLink :to="`/app/invoices/${sale.id}`" class="font-black text-ops-cyan">Preview</RouterLink></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="kind === 'reports'" class="grid gap-6 xl:grid-cols-2">
    <BarTrend />
    <CategoryDonut />
    <div class="ops-panel p-6">
      <h3 class="text-2xl font-black">Available reports</h3>
      <div class="mt-5 grid gap-3 md:grid-cols-2">
        <button
          v-for="report in ['Sales report','Purchase report','Inventory report','Profit/loss report','Low-stock report','Customer report','Supplier report','Tax report']"
          :key="report"
          class="rounded-2xl bg-slate-50 p-4 text-left font-black dark:bg-white/5"
        >
          {{ report }}
        </button>
      </div>
    </div>
    <div class="ops-panel p-6">
      <h3 class="text-2xl font-black">Export actions</h3>
      <div class="mt-5 flex flex-wrap gap-3">
        <button class="ops-button-alt">Export CSV</button>
        <button class="ops-button-alt">Export PDF</button>
        <button class="ops-button">Print Report</button>
      </div>
    </div>
  </div>

  <div v-else-if="kind === 'lowStock'" class="grid gap-5 md:grid-cols-3">
    <div v-for="product in store.lowStockProducts" :key="product.id" class="ops-panel p-6">
      <img :src="product.image" class="h-44 w-full rounded-[1.5rem] object-cover" />
      <div class="mt-4 flex justify-between">
        <h3 class="text-xl font-black">{{ product.name }}</h3>
        <StatusBadge :status="product.status" />
      </div>
      <p class="mt-2 text-sm text-slate-500">{{ product.sku }} • {{ product.supplier }}</p>
      <div class="mt-5 grid grid-cols-2 gap-3">
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Current</p>
          <p class="font-black text-ops-amber">{{ product.stock }}</p>
        </div>
        <div class="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
          <p class="text-xs text-slate-500">Reorder</p>
          <p class="font-black">{{ product.reorder }}</p>
        </div>
      </div>
      <button class="ops-button mt-5 w-full">Create Purchase Order</button>
    </div>
  </div>

  <div v-else-if="kind === 'notifications'" class="space-y-4">
    <div v-for="item in store.notifications" :key="item.id" class="ops-panel p-5">
      <div class="flex justify-between gap-4">
        <div>
          <p class="font-black">{{ item.title }}</p>
          <p class="text-slate-500 dark:text-slate-300">{{ item.message }}</p>
          <p class="mt-2 text-xs text-slate-400">{{ item.type }} • {{ item.createdAt }}</p>
        </div>
        <button v-if="!item.read" @click="store.markNotificationRead(item.id)" class="ops-button-alt">
          Mark read
        </button>
      </div>
    </div>
  </div>

  <div v-else-if="kind === 'users'" class="ops-panel overflow-auto">
    <table class="w-full min-w-[780px]">
      <thead>
        <tr>
          <th class="table-th">User</th>
          <th class="table-th">Email</th>
          <th class="table-th">Role</th>
          <th class="table-th">Permissions</th>
          <th class="table-th">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in ['Admin Manager','Warehouse Manager','Sales Staff']" :key="user" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ user }}</td>
          <td class="table-td">{{ user.toLowerCase().split(' ').join('.') }}@stockpilot.com</td>
          <td class="table-td">{{ user.includes('Admin') ? 'Admin' : user.includes('Warehouse') ? 'Manager' : 'Staff' }}</td>
          <td class="table-td">Products, Sales, Reports</td>
          <td class="table-td"><StatusBadge status="Active" /></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="kind === 'settings'" class="ops-panel p-6">
    <div class="grid gap-4 md:grid-cols-2">
      <input class="ops-input" value="StockPilot Trading Co." />
      <input class="ops-input" value="support@stockpilot.com" />
      <input class="ops-input" value="+880 1700 000000" />
      <input class="ops-input" value="Dhaka, Bangladesh" />
      <select class="ops-input">
        <option>Currency: BDT</option>
        <option>Currency: USD</option>
      </select>
      <input class="ops-input" value="Default tax rate: 5%" />
      <input class="ops-input" value="Invoice prefix: INV-2026" />
      <input class="ops-input" value="Low-stock alert threshold: Reorder level" />
    </div>
    <div class="mt-4 rounded-[2rem] border border-dashed border-ops-cyan/50 p-8 text-center text-slate-500">
      Company logo upload placeholder
    </div>
    <button class="ops-button mt-5">Save Settings</button>
  </div>
</template>
