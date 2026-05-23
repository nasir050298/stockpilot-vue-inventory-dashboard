<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PackagePlus, Trash2 } from 'lucide-vue-next'
import { useInventoryStore } from '../../stores/inventory'
import { margin, money } from '../../utils/format'
import PageHeader from '../../components/ui/PageHeader.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'

const store = useInventoryStore()
</script>

<template>
  <PageHeader
    title="Product management"
    subtitle="Product CRUD, images, SKU, barcode, category, brand, prices, tax, stock, supplier, and status."
  >
    <template #action>
      <RouterLink to="/app/products/new" class="ops-button">
        <PackagePlus :size="18" />
        Add Product
      </RouterLink>
    </template>
  </PageHeader>

  <div class="ops-panel mb-5 p-4">
    <div class="grid gap-3 md:grid-cols-5">
      <input class="ops-input md:col-span-2" placeholder="Search product, SKU, barcode" />
      <select class="ops-input">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Accessories</option>
        <option>Office Supplies</option>
      </select>
      <select class="ops-input">
        <option>All Stock Status</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <button class="ops-button">Filter</button>
    </div>
  </div>

  <div class="ops-panel overflow-auto">
    <table class="w-full min-w-[1100px]">
      <thead>
        <tr>
          <th class="table-th">Product</th>
          <th class="table-th">SKU/Barcode</th>
          <th class="table-th">Category</th>
          <th class="table-th">Cost</th>
          <th class="table-th">Selling</th>
          <th class="table-th">Margin</th>
          <th class="table-th">Stock</th>
          <th class="table-th">Supplier</th>
          <th class="table-th">Status</th>
          <th class="table-th">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.products" :key="product.id" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td">
            <div class="flex items-center gap-3">
              <img :src="product.image" class="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <p class="font-black">{{ product.name }}</p>
                <p class="text-xs text-slate-500">{{ product.brand }}</p>
              </div>
            </div>
          </td>
          <td class="table-td">
            <p class="font-bold">{{ product.sku }}</p>
            <p class="text-xs text-slate-500">{{ product.barcode }}</p>
          </td>
          <td class="table-td">{{ product.category }}</td>
          <td class="table-td">{{ money(product.cost) }}</td>
          <td class="table-td">{{ money(product.price) }}</td>
          <td class="table-td">{{ margin(product.cost, product.price) }}%</td>
          <td class="table-td">
            <p class="font-black">{{ product.stock }} pcs</p>
            <p class="text-xs text-slate-500">Reorder: {{ product.reorder }}</p>
          </td>
          <td class="table-td">{{ product.supplier }}</td>
          <td class="table-td">
            <StatusBadge :status="product.status" />
          </td>
          <td class="table-td">
            <div class="flex gap-2">
              <RouterLink :to="`/app/products/${product.id}/edit`" class="font-black text-ops-cyan">
                Edit
              </RouterLink>
              <button @click="store.deleteProduct(product.id)" class="text-ops-red">
                <Trash2 :size="18" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
