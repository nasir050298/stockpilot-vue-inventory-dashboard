<script setup lang="ts">
import { useRoute } from 'vue-router'
import { sales } from '../../data/mockData'
import { money } from '../../utils/format'
import PageHeader from '../../components/ui/PageHeader.vue'

const route = useRoute()
const invoice = sales.find((item) => item.id === route.params.id) || sales[0]
const subtotal = invoice.total - 775 + 500
</script>

<template>
  <PageHeader
    title="Invoice preview"
    subtitle="Print-ready invoice document UI with company, customer, product line items, subtotal, tax, discount, and grand total."
  />

  <div class="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-ops dark:bg-white/[0.06]">
    <div class="flex justify-between border-b border-slate-200 pb-6 dark:border-white/10">
      <div>
        <h2 class="text-4xl font-black">StockPilot Vue</h2>
        <p class="text-slate-500">Inventory & Sales Management</p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-black">{{ invoice.invoiceNo }}</p>
        <p class="text-slate-500">{{ invoice.date }}</p>
      </div>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <div>
        <p class="font-black">Bill To</p>
        <p class="mt-2 text-slate-500">
          {{ invoice.customer }}<br />
          Dhaka, Bangladesh<br />
          customer@example.com
        </p>
      </div>
      <div class="text-right">
        <p class="font-black">Payment</p>
        <p class="mt-2 text-slate-500">{{ invoice.paymentMethod }}<br />{{ invoice.paymentStatus }}</p>
      </div>
    </div>

    <table class="mt-8 w-full">
      <thead>
        <tr>
          <th class="table-th">Item</th>
          <th class="table-th">Qty</th>
          <th class="table-th">Price</th>
          <th class="table-th">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in invoice.products" :key="product" class="border-t border-slate-100 dark:border-white/10">
          <td class="table-td font-black">{{ product }}</td>
          <td class="table-td">1</td>
          <td class="table-td">{{ money(subtotal / invoice.products.length) }}</td>
          <td class="table-td">{{ money(subtotal / invoice.products.length) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-8 flex justify-end">
      <div class="w-full max-w-sm space-y-2">
        <p class="flex justify-between"><span>Subtotal</span><b>{{ money(subtotal) }}</b></p>
        <p class="flex justify-between"><span>Discount</span><b>{{ money(500) }}</b></p>
        <p class="flex justify-between"><span>Tax</span><b>{{ money(775) }}</b></p>
        <p class="flex justify-between border-t border-slate-200 pt-3 text-xl dark:border-white/10">
          <span>Total</span><b class="text-ops-cyan">{{ money(invoice.total) }}</b>
        </p>
      </div>
    </div>

    <div class="mt-8 flex gap-3">
      <button class="ops-button">Print Invoice</button>
      <button class="ops-button-alt">Download PDF</button>
    </div>
  </div>
</template>
