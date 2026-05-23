<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft, Boxes, Eye, EyeOff } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('admin@stockpilot.com')
const password = ref('demo123')
const show = ref(false)
const error = ref('')

const demos = [
  ['Admin', 'admin@stockpilot.com', 'demo123'],
  ['Manager', 'manager@stockpilot.com', 'demo123'],
  ['Staff', 'staff@stockpilot.com', 'demo123']
]

async function submit() {
  try {
    error.value = ''
    await auth.login(email.value, password.value)
    router.push('/app')
  } catch (event: any) {
    error.value = event.message
  }
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
            <h1 class="text-4xl font-black">Welcome back</h1>
            <p class="text-slate-500">Login to your inventory workspace</p>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <input v-model="email" class="ops-input" placeholder="Email" />
          <div class="relative">
            <input
              v-model="password"
              :type="show ? 'text' : 'password'"
              class="ops-input pr-12"
              placeholder="Password"
            />
            <button type="button" @click="show = !show" class="absolute right-4 top-3.5 text-slate-500">
              <EyeOff v-if="show" />
              <Eye v-else />
            </button>
          </div>
          <p v-if="error" class="text-sm font-bold text-ops-red">{{ error }}</p>
          <button class="ops-button w-full">Login</button>
        </form>

        <div class="mt-5 flex justify-between text-sm">
          <RouterLink class="font-bold text-ops-indigo dark:text-ops-cyan" to="/forgot-password">
            Forgot password?
          </RouterLink>
          <RouterLink class="font-bold text-ops-indigo dark:text-ops-cyan" to="/register">
            Create account
          </RouterLink>
        </div>

        <div class="mt-6 rounded-[1.5rem] bg-slate-50 p-4 dark:bg-white/5">
          <p class="mb-3 font-black">Demo accounts</p>
          <button
            v-for="[role, demoEmail, demoPassword] in demos"
            :key="demoEmail"
            @click="email = demoEmail; password = demoPassword"
            class="mb-2 block w-full rounded-2xl bg-white p-3 text-left dark:bg-white/5"
          >
            <b>{{ role }}</b><br />
            <span class="text-sm text-slate-500">{{ demoEmail }} / {{ demoPassword }}</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
