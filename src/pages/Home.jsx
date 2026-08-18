import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: cfg }, { data: prods }, { data: revs }] = await Promise.all([
        supabase.from('store_config').select('*').single(),
        supabase.from('products').select('*').order('created_at'),
        supabase.from('reviews').select('*').order('created_at'),
      ])
      setConfig(cfg)
      setProducts(prods || [])
      setReviews(revs || [])
      setLoading(false)
    }
    load()
  }, [])

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'Todo' ? products : products.filter(p => p.category === filter)

  const addToCart = (product, size) => {
    setCart(prev => [...prev, { ...product, size, uid: Date.now() + Math.random() }])
  }

  const removeFromCart = (uid) => {
    setCart(prev => prev.filter(x => x.uid !== uid))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <span className="text-[#c9a84c] tracking-widest uppercase text-sm animate-pulse">Cargando...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans">
      <div className="bg-[#c9a84c] text-[#0a0a0a] text-center text-[11px] font-bold tracking-widest uppercase py-2 px-4">
        Demo de @cristobalr1102 · Así se vería tu tienda ·{' '}
        <a href="/" className="underline underline-offset-2">Quiero la mía</a>
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
