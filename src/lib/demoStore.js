import { DEFAULT_CONFIG, DEFAULT_PRODUCTS, DEFAULT_REVIEWS } from '../data/demoData'

const KEYS = {
  products: 'demo_products',
  config: 'demo_config',
  reviews: 'demo_reviews',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getProducts() {
  return read(KEYS.products, DEFAULT_PRODUCTS)
}

export function getConfig() {
  return read(KEYS.config, DEFAULT_CONFIG)
}

export function getReviews() {
  return read(KEYS.reviews, DEFAULT_REVIEWS)
}

export function saveConfig(config) {
  write(KEYS.config, config)
}

export function addProduct(product) {
  const products = getProducts()
  const next = [...products, { ...product, id: crypto.randomUUID() }]
  write(KEYS.products, next)
  return next
}

export function updateProduct(id, patch) {
  const next = getProducts().map(p => (p.id === id ? { ...p, ...patch } : p))
  write(KEYS.products, next)
  return next
}

export function deleteProduct(id) {
  const next = getProducts().filter(p => p.id !== id)
  write(KEYS.products, next)
  return next
}

export function resetDemo() {
  localStorage.removeItem(KEYS.products)
  localStorage.removeItem(KEYS.config)
  localStorage.removeItem(KEYS.reviews)
}
