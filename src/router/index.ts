import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../components/layout/PublicLayout.vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import Home from '../pages/public/Home.vue'
import PublicPage from '../pages/public/PublicPage.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import ForgotPassword from '../pages/auth/ForgotPassword.vue'
import Dashboard from '../pages/dashboard/Dashboard.vue'
import Products from '../pages/dashboard/Products.vue'
import ProductForm from '../pages/dashboard/ProductForm.vue'
import ModulePage from '../pages/dashboard/ModulePage.vue'
import InvoiceDetails from '../pages/dashboard/InvoiceDetails.vue'
import { useAuthStore } from '../stores/auth'

const moduleRoute = (
  path: string,
  title: string,
  kind: string,
  roles: string[] = ['admin', 'manager', 'staff']
) => ({
  path,
  component: ModulePage,
  meta: { requiresAuth: true, title, kind, roles }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', component: Home },
        { path: 'features', component: PublicPage, meta: { title: 'Features', kind: 'features' } },
        { path: 'pricing', component: PublicPage, meta: { title: 'Pricing', kind: 'pricing' } },
        { path: 'faq', component: PublicPage, meta: { title: 'FAQ', kind: 'faq' } },
        { path: 'contact', component: PublicPage, meta: { title: 'Contact', kind: 'contact' } }
      ]
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },
    {
      path: '/app',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: Dashboard },
        { path: 'products', component: Products },
        { path: 'products/new', component: ProductForm, meta: { roles: ['admin', 'manager'] } },
        { path: 'products/:id/edit', component: ProductForm, meta: { roles: ['admin', 'manager'] } },
        moduleRoute('categories', 'Category management', 'categories', ['admin', 'manager']),
        moduleRoute('stock', 'Stock management', 'stock', ['admin', 'manager']),
        moduleRoute('sales', 'Sales management', 'sales'),
        moduleRoute('sales/create', 'Create sale', 'createSale'),
        moduleRoute('purchases', 'Purchase management', 'purchases', ['admin', 'manager']),
        moduleRoute('purchases/create', 'Create purchase order', 'createPurchase', ['admin', 'manager']),
        moduleRoute('suppliers', 'Supplier management', 'suppliers', ['admin', 'manager']),
        moduleRoute('customers', 'Customer management', 'customers'),
        moduleRoute('invoices', 'Invoices', 'invoices'),
        { path: 'invoices/:id', component: InvoiceDetails, meta: { requiresAuth: true } },
        moduleRoute('reports', 'Reports and analytics', 'reports', ['admin', 'manager']),
        moduleRoute('low-stock', 'Low-stock alerts', 'lowStock', ['admin', 'manager']),
        moduleRoute('notifications', 'Notifications', 'notifications'),
        moduleRoute('users', 'Users and roles', 'users', ['admin']),
        moduleRoute('settings', 'Settings', 'settings', ['admin', 'manager'])
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) return '/login'
  const roles = to.meta.roles as string[] | undefined
  if (roles && auth.user && !roles.includes(auth.user.role)) return '/app'
})

export default router
