<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, Boxes } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
import type { Role } from '../../types'

const auth = useAuthStore()
const router = useRouter()
const name = ref('New Staff')
const email = ref('new@stockpilot.com')
const password = ref('demo123')
const role = ref<Role>('staff')

async function submit() {
  await auth.register({ name: name.value, email: email.value, password: password.value, role: role.value })
  router.push('/app')
}
</script>

<template>
  <main class="ops-bg grid min-h-screen place-items-center p-4">
    <div class="w-full max-w-md">
      <RouterLink to="/" class="mb-6 inline-flex items-center gap-2 font-black text-ops-indigo dark:text-ops-cyan">
        <ArrowLeft :size="18" />
        Back to Website
      </RouterLink>
      <div class="ops-panel p-8">
        <div class="mb-6 flex items-center gap-3">
          <span class="rounded-2xl bg-ops-cyan p-3 text-ops-ink">
            <Boxes />
          </span>
          <div>
            <h1 class="text-4xl font-black">Create account</h1>
            <p class="text-slate-500">Register staff, manager, or admin</p>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <input v-model="name" class="ops-input" placeholder="Name" />
          <input v-model="email" class="ops-input" placeholder="Email" />
          <input v-model="password" class="ops-input" placeholder="Password" />
          <select v-model="role" class="ops-input">
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button class="ops-button w-full">Create Account</button>
        </form>
      </div>
    </div>
  </main>
</template>
