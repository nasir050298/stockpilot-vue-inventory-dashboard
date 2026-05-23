export type Role = 'admin' | 'manager' | 'staff'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface Product {
  id: string
  name: string
  sku: string
  barcode: string
  category: string
  brand: string
  cost: number
  price: number
  discount?: number
  tax?: number
  stock: number
  reorder: number
  supplier: string
  image: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued'
  description?: string
}

export interface CategoryItem {
  id: string
  name: string
  description: string
  productCount: number
  stockValue: number
  lowStockCount: number
  status: 'Active' | 'Inactive'
}

export interface Sale {
  id: string
  invoiceNo: string
  customer: string
  products: string[]
  paymentMethod: string
  total: number
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial' | 'Refunded'
  status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded'
  date: string
}

export interface Purchase {
  id: string
  orderNo: string
  supplier: string
  products: string[]
  totalCost: number
  status: 'Draft' | 'Ordered' | 'Received' | 'Partially Received' | 'Cancelled'
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial'
  expectedDate: string
}

export interface Supplier {
  id: string
  company: string
  contactPerson: string
  phone: string
  email: string
  productsSupplied: number
  totalPurchases: number
  outstandingBalance: number
  status: 'Active' | 'Inactive'
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  type: 'Regular' | 'VIP' | 'Wholesale' | 'Retail' | 'Corporate'
  totalPurchases: number
  outstandingBalance: number
  lastPurchase: string
  status: 'Active' | 'Inactive'
}

export interface StockMovement {
  id: string
  date: string
  product: string
  type: 'Stock In' | 'Stock Out' | 'Damage' | 'Return' | 'Correction' | 'Transfer'
  quantity: number
  previousStock: number
  newStock: number
  handledBy: string
  reason: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}
