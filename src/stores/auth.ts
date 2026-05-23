import { defineStore } from 'pinia'
import type { Role, User } from '../types'
import { demoUsers } from '../data/mockData'

interface AuthState {
  user: User | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('stockpilot_user') || 'null')
  }),
  actions: {
    async login(email: string, password: string) {
      const found = demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)
      if (!found) throw new Error('Invalid demo credentials')
      const { password: _password, ...safeUser } = found
      this.user = safeUser
      localStorage.setItem('stockpilot_user', JSON.stringify(safeUser))
    },
    async register(data: { name: string; email: string; password: string; role?: Role }) {
      const user: User = { id: `u-${Date.now()}`, name: data.name, email: data.email, role: data.role || 'staff' }
      this.user = user
      localStorage.setItem('stockpilot_user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('stockpilot_user')
    }
  }
})
