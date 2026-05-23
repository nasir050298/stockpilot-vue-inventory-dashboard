import { defineStore } from 'pinia'
import { notifications, products } from '../data/mockData'
import type { NotificationItem, Product } from '../types'

interface InventoryState {
  products: Product[]
  notifications: NotificationItem[]
}

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryState => ({
    products: JSON.parse(localStorage.getItem('stockpilot_products') || 'null') || products,
    notifications
  }),
  getters: {
    lowStockProducts: (state) => state.products.filter((product) => product.stock <= product.reorder),
    totalStockValue: (state) => state.products.reduce((sum, product) => sum + product.stock * product.cost, 0),
    potentialRevenue: (state) => state.products.reduce((sum, product) => sum + product.stock * product.price, 0)
  },
  actions: {
    addProduct(product: Product) {
      this.products.unshift(product)
      localStorage.setItem('stockpilot_products', JSON.stringify(this.products))
    },
    deleteProduct(id: string) {
      this.products = this.products.filter((product) => product.id !== id)
      localStorage.setItem('stockpilot_products', JSON.stringify(this.products))
    },
    markNotificationRead(id: string) {
      this.notifications = this.notifications.map((item) => item.id === id ? { ...item, read: true } : item)
    }
  }
})
