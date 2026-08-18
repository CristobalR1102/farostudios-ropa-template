import { useEffect, useState } from 'react'
import { getConfig, getProducts, getReviews } from '../lib/demoStore'
import Header from '../components/Header'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'
import Cart from '../components/Cart'
import Reviews from '../components/Reviews'

export default function Home() {
  const [config, setConfig] = useState(null)
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('Todo')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    setConfig(getConfig())
    setProducts(getProducts())
    setReviews(getReviews())
  }, [])

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'Todo' ? products : products.filter(p => p.category === filter)

  const addToCart = (product, size) => {
    setCart(prev => [...prev, { ...product, size, uid: Date.now() + Math.random() }])
  }

  const removeFromCart = (uid) => {
    setCart(prev => prev.filter(x => x.uid !== uid))
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans">
      <div className="bg-[#c9a84c] text-[#0a0a0a] py-2.5 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] font-bold tracking-widest uppercase text-center">
        <span>
          Demo de @cristobalr1102 · Así se vería tu tienda ·{' '}
          <a href="/" className="underline underline-offset-2">Quiero la mía</a>
        </span>
        <a
          href="/demo/admin"
          className="bg-[#0a0a0a] text-[#c9a84c] px-4 py-2 rounded-full text-xs tracking-widest hover:bg-[#1a1a1a] transition-colors"
        >
          Ver panel admin
        </a>
      </div>
      <Header config={config} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white text-center px-6 py-16 border-b border-[#222]">
        <p className="text-[11px] tracking-[.25em] uppercase text-[#c9a84c] mb-3">Nueva colección · 2025</p>
        <h1 className="text-4xl font-light tracking-widest uppercase leading-tight mb-3">
          {config?.store_name || 'Tu Nombre'}
        </h1>
        <p className="text-sm text-[#888] tracking-wide">{config?.hero_text || 'Piezas únicas · Envío a todo Chile'}</p>
      </section>

      {/* Catálogo */}
      <section className="px-6 py-10">
        <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-5">Catálogo</p>
        <FilterBar categories={categories} active={filter} onChange={setFilter} />
        <div className="grid gap-5 max-w-3xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <Reviews reviews={reviews} />

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-[#555] text-center py-5 text-[11px] tracking-widest uppercase">
        Hecho con ♥ por <span className="text-[#c9a84c]">@cristobalr1102</span>
      </footer>

      {cartOpen && (
        <Cart
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          config={config}
        />
      )}
    </div>
  )
}
