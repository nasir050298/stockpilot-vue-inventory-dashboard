<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useInventoryStore } from '../../stores/inventory'
import PageHeader from '../../components/ui/PageHeader.vue'
import type { Product } from '../../types'

const router = useRouter()
const store = useInventoryStore()

function save() {
  const name = (document.getElementById('name') as HTMLInputElement)?.value || 'New Product'
  const sku = (document.getElementById('sku') as HTMLInputElement)?.value || `SKU-${Date.now()}`

  const product: Product = {
    id: `P-${Date.now()}`,
    name,
    sku,
    barcode: '893456199999',
    category: 'Electronics',
    brand: 'NewBrand',
    cost: 1200,
    price: 2200,
    discount: 1990,
    tax: 5,
    stock: 24,
    reorder: 8,
    supplier: 'TechSource Ltd.',
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?auto=format&fit=crop&w=900&q=80',
    status: 'In Stock',
    description: 'New product added from Vue form.'
  }

  store.addProduct(product)
  router.push('/app/products')
}
</script>

<template>
  <PageHeader
    title="Add / Edit Product"
    subtitle="Complete product form with SKU, barcode, price, tax, stock quantity, reorder level, supplier, and image upload placeholder."
  />

  <div class="ops-panel p-6">
    <div class="grid gap-4 md:grid-cols-3">
      <input id="name" class="ops-input md:col-span-2" placeholder="Product name" />
      <input id="sku" class="ops-input" placeholder="SKU" />
      <input class="ops-input" placeholder="Barcode" />
      <select class="ops-input">
        <option>Electronics</option>
        <option>Accessories</option>
        <option>Office Supplies</option>
        <option>Home Appliances</option>
      </select>
      <input class="ops-input" placeholder="Brand" />
      <input class="ops-input" placeholder="Cost price" />
      <input class="ops-input" placeholder="Selling price" />
      <input class="ops-input" placeholder="Discount price" />
      <input class="ops-input" placeholder="Tax rate" />
      <input class="ops-input" placeholder="Stock quantity" />
      <input class="ops-input" placeholder="Reorder level" />
      <input class="ops-input" placeholder="Unit" />
      <select class="ops-input">
        <option>TechSource Ltd.</option>
        <option>Global Parts</option>
        <option>OfficeHub</option>
      </select>
      <select class="ops-input">
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
    </div>
    <textarea class="ops-input mt-4 h-32" placeholder="Description" />
    <div class="mt-4 rounded-[2rem] border border-dashed border-ops-cyan/50 p-10 text-center text-slate-500">
      Product image upload placeholder
    </div>
    <button @click="save" class="ops-button mt-5">Save Product</button>
  </div>
</template>
