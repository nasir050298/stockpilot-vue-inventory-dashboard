export function money(value: number) {
  return `৳ ${Number(value || 0).toLocaleString()}`
}

export function margin(cost: number, price: number) {
  if (!price) return 0
  return Math.round(((price - cost) / price) * 100)
}
