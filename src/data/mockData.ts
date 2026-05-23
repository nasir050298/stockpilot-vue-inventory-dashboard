import type { CategoryItem, Customer, NotificationItem, Product, Purchase, Sale, StockMovement, Supplier, User } from '../types'

export const demoUsers: Array<User & { password: string }> = [
  { id: 'u-admin', name: 'Admin Manager', email: 'admin@stockpilot.com', password: 'demo123', role: 'admin' },
  { id: 'u-manager', name: 'Warehouse Manager', email: 'manager@stockpilot.com', password: 'demo123', role: 'manager' },
  { id: 'u-staff', name: 'Sales Staff', email: 'staff@stockpilot.com', password: 'demo123', role: 'staff' }
]

export const products: Product[] = [
  { id:'P-1001', name:'Wireless Barcode Scanner', sku:'SKU-SCN-001', barcode:'893456100001', category:'Electronics', brand:'ScanPro', cost:4200, price:6500, discount:6100, tax:5, stock:42, reorder:10, supplier:'TechSource Ltd.', image:'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?auto=format&fit=crop&w=900&q=80', status:'In Stock', description:'2D wireless scanner for POS and warehouse operations.' },
  { id:'P-1002', name:'USB-C Cable 1.5m', sku:'SKU-CBL-009', barcode:'893456100009', category:'Accessories', brand:'VoltLine', cost:120, price:350, discount:299, tax:5, stock:3, reorder:25, supplier:'Global Parts', image:'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?auto=format&fit=crop&w=900&q=80', status:'Low Stock', description:'Durable cable for charging and data transfer.' },
  { id:'P-1003', name:'Thermal Receipt Printer', sku:'SKU-PRN-014', barcode:'893456100014', category:'Electronics', brand:'PrintMate', cost:6200, price:9500, discount:8990, tax:7.5, stock:18, reorder:6, supplier:'TechSource Ltd.', image:'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80', status:'In Stock', description:'POS thermal invoice printer with USB and Bluetooth.' },
  { id:'P-1004', name:'Office Chair Ergonomic', sku:'SKU-FUR-021', barcode:'893456100021', category:'Office Supplies', brand:'WorkNest', cost:5200, price:9800, discount:9200, tax:5, stock:0, reorder:8, supplier:'OfficeHub', image:'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80', status:'Out of Stock', description:'Ergonomic chair for office and home workstations.' },
  { id:'P-1005', name:'LED Desk Lamp', sku:'SKU-LGT-033', barcode:'893456100033', category:'Home Appliances', brand:'Brighto', cost:900, price:1800, discount:1590, tax:5, stock:76, reorder:15, supplier:'HomeLine', image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80', status:'In Stock', description:'Adjustable LED lamp with warm and cool modes.' },
  { id:'P-1006', name:'Printer Ink Black', sku:'SKU-INK-045', barcode:'893456100045', category:'Office Supplies', brand:'InkMax', cost:550, price:1100, discount:1050, tax:5, stock:5, reorder:20, supplier:'OfficeHub', image:'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=80', status:'Low Stock', description:'High-yield black ink cartridge.' }
]

export const categories: CategoryItem[] = [
  { id:'C-1', name:'Electronics', description:'POS devices, scanners, printers and gadgets', productCount:18, stockValue:420000, lowStockCount:2, status:'Active' },
  { id:'C-2', name:'Accessories', description:'Cables, adapters, chargers and small parts', productCount:42, stockValue:185000, lowStockCount:8, status:'Active' },
  { id:'C-3', name:'Office Supplies', description:'Office furniture and stationery items', productCount:27, stockValue:265000, lowStockCount:5, status:'Active' },
  { id:'C-4', name:'Home Appliances', description:'Small appliances and daily devices', productCount:16, stockValue:310000, lowStockCount:1, status:'Active' }
]

export const sales: Sale[] = [
  { id:'S-1', invoiceNo:'INV-2026-1001', customer:'BD Retail Shop', products:['Wireless Barcode Scanner','Thermal Receipt Printer'], paymentMethod:'Bank Transfer', total:16275, paymentStatus:'Paid', status:'Completed', date:'2026-05-22' },
  { id:'S-2', invoiceNo:'INV-2026-1002', customer:'Walk-in Customer', products:['USB-C Cable 1.5m','LED Desk Lamp'], paymentMethod:'Cash', total:2205, paymentStatus:'Paid', status:'Completed', date:'2026-05-21' },
  { id:'S-3', invoiceNo:'INV-2026-1003', customer:'North Office Ltd.', products:['Office Chair Ergonomic'], paymentMethod:'Card', total:9660, paymentStatus:'Partial', status:'Pending', date:'2026-05-20' }
]

export const purchases: Purchase[] = [
  { id:'PO-1', orderNo:'PO-2026-201', supplier:'TechSource Ltd.', products:['Wireless Barcode Scanner','Thermal Receipt Printer'], totalCost:220000, status:'Received', paymentStatus:'Paid', expectedDate:'2026-05-20' },
  { id:'PO-2', orderNo:'PO-2026-202', supplier:'Global Parts', products:['USB-C Cable 1.5m'], totalCost:48000, status:'Ordered', paymentStatus:'Unpaid', expectedDate:'2026-05-29' },
  { id:'PO-3', orderNo:'PO-2026-203', supplier:'OfficeHub', products:['Printer Ink Black','Office Chair Ergonomic'], totalCost:125000, status:'Partially Received', paymentStatus:'Partial', expectedDate:'2026-05-27' }
]

export const suppliers: Supplier[] = [
  { id:'SUP-1', company:'TechSource Ltd.', contactPerson:'Hasan Mahmud', phone:'+8801700000001', email:'sales@techsource.com', productsSupplied:18, totalPurchases:860000, outstandingBalance:0, status:'Active' },
  { id:'SUP-2', company:'Global Parts', contactPerson:'Mira Chowdhury', phone:'+8801700000002', email:'hello@globalparts.com', productsSupplied:42, totalPurchases:430000, outstandingBalance:48000, status:'Active' },
  { id:'SUP-3', company:'OfficeHub', contactPerson:'Rafi Ahmed', phone:'+8801700000003', email:'orders@officehub.com', productsSupplied:27, totalPurchases:520000, outstandingBalance:75000, status:'Active' }
]

export const customers: Customer[] = [
  { id:'CU-1', name:'BD Retail Shop', phone:'+8801711111111', email:'bdretail@example.com', type:'Wholesale', totalPurchases:245000, outstandingBalance:0, lastPurchase:'2026-05-22', status:'Active' },
  { id:'CU-2', name:'North Office Ltd.', phone:'+8801722222222', email:'north@example.com', type:'Corporate', totalPurchases:138000, outstandingBalance:9660, lastPurchase:'2026-05-20', status:'Active' },
  { id:'CU-3', name:'Walk-in Customer', phone:'N/A', email:'N/A', type:'Retail', totalPurchases:58000, outstandingBalance:0, lastPurchase:'2026-05-21', status:'Active' }
]

export const movements: StockMovement[] = [
  { id:'SM-1', date:'2026-05-22', product:'USB-C Cable 1.5m', type:'Stock Out', quantity:12, previousStock:15, newStock:3, handledBy:'Sales Staff', reason:'Retail sale' },
  { id:'SM-2', date:'2026-05-21', product:'Wireless Barcode Scanner', type:'Stock In', quantity:20, previousStock:22, newStock:42, handledBy:'Warehouse Manager', reason:'Supplier delivery' },
  { id:'SM-3', date:'2026-05-20', product:'Printer Ink Black', type:'Damage', quantity:2, previousStock:7, newStock:5, handledBy:'Warehouse Staff', reason:'Damaged packaging' },
  { id:'SM-4', date:'2026-05-19', product:'LED Desk Lamp', type:'Return', quantity:3, previousStock:73, newStock:76, handledBy:'Sales Staff', reason:'Customer return' }
]

export const notifications: NotificationItem[] = [
  { id:'N-1', title:'USB-C Cable is below reorder level', message:'Current stock is 3 units. Suggested reorder: 100 units.', type:'Low Stock', read:false, createdAt:'Today' },
  { id:'N-2', title:'Office Chair is out of stock', message:'Create purchase order for OfficeHub.', type:'Out of Stock', read:false, createdAt:'Today' },
  { id:'N-3', title:'Purchase order received', message:'PO-2026-201 was received and stock updated.', type:'Purchase', read:true, createdAt:'Yesterday' },
  { id:'N-4', title:'Invoice payment pending', message:'North Office Ltd. has partial payment for INV-2026-1003.', type:'Payment', read:false, createdAt:'May 20' }
]

export const trend = [
  { month:'Jan', sales:122000, purchases:78000, profit:44000 },
  { month:'Feb', sales:148000, purchases:91000, profit:57000 },
  { month:'Mar', sales:172000, purchases:105000, profit:67000 },
  { month:'Apr', sales:195000, purchases:128000, profit:67000 },
  { month:'May', sales:238000, purchases:150000, profit:88000 },
  { month:'Jun', sales:265000, purchases:169000, profit:96000 }
]
