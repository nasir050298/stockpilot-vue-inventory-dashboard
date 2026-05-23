<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <main class="ops-bg grid min-h-screen place-items-center p-4">
    <div class="w-full max-w-md">
      <RouterLink to="/" class="mb-6 inline-flex items-center gap-2 font-black text-ops-indigo dark:text-ops-cyan">
        <ArrowLeft :size="18" />
        Back to Website
      </RouterLink>
      <div class="ops-panel p-8">
        <h1 class="text-4xl font-black">Reset password</h1>
        <p class="mb-6 mt-2 text-slate-500">Frontend placeholder</p>
        <input class="ops-input mb-4" placeholder="Email" />
        <button class="ops-button w-full">Send Reset Link</button>
      </div>
    </div>
  </main>
</template>
