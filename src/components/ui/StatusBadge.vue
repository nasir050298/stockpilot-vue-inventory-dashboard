<script setup lang="ts">
defineProps<{ status: string }>()

const styles: Record<string, string> = {
  'In Stock': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  'Low Stock': 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  'Out of Stock': 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  'Discontinued': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Unpaid: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Partial: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Received: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Ordered: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'Partially Received': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  Refunded: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
}
</script>

<template>
  <span
    class="ops-badge tracking-normal"
    :class="styles[status] || 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200'"
  >
    {{ status }}
  </span>
</template>
