import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', 'Única']

export default function Admin() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [products, setProducts] = useState([])
  const [config, setConfig] = useState(null)
  const [tab, setTab] = useState('products') // 'products' | 'config'
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // Formulario nuevo producto
  const emptyForm = { name: '', description: '', price: '', stock: '', category: '', tag: '', emoji: '👗', sizes: [] }
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    supabase.auth.onAuthStateChange((_e, session) => setSession(session))
  }, [])

  useEffect(() => {
    if (session) { loadProducts(); loadConfig() }
  }, [session])

  async function loadProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at')
    setProducts(data || [])
  }

  async function loadConfig() {
    const { data } = await supabase.from('store_config').select('*').single()
    setConfig(data || {})
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  function toggleSize(size) {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      category: product.category || '',
      tag: product.tag || '',
      emoji: product.emoji || '👗',
      sizes: product.sizes || [],
    })
    setTab('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSaveProduct(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      stock: parseInt(form.stock),
      category: form.category,
      tag: form.tag,
      emoji: form.emoji,
      sizes: form.sizes,
    }
    if (editingId) {
      await supabase.from('products').update(payload).eq('id', editingId)
    } else {
      await supabase.from('products').insert(payload)
    }
    setForm(emptyForm)
    setEditingId(null)
    await loadProducts()
    setSaving(false)
    setMsg(editingId ? 'Producto actualizado ✓' : 'Producto agregado ✓')
    setTimeout(() => setMsg(''), 2500)
  }

  async function handleDeleteProduct(id) {
    if (!confirm('¿Eliminar este producto?')) return
    await supabase.from('products').delete().eq('id', id)
    await loadProducts()
  }

  async function handleSaveConfig(e) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('store_config').upsert({ id: config.id || 1, ...config })
    setSaving(false)
    setMsg('Configuración guardada ✓')
    setTimeout(() => setMsg(''), 2500)
  }

  const inputClass = "w-full border-2 border-[#333] bg-[#2a2a2a] text-[#eee] px-3 py-2 text-sm rounded outline-none focus:border-[#c9a84c] font-[inherit]"
  const labelClass = "text-[10px] tracking-widest uppercase text-[#777] block mb-1"

  // --- LOGIN ---
  if (!session) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-[#c9a84c] text-center tracking-widest uppercase text-sm font-bold mb-8">Admin · FaroStudios</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input className={inputClass} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className={inputClass} type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
          <button type="submit" className="bg-[#c9a84c] text-[#0a0a0a] font-bold py-2.5 rounded text-sm tracking-widest uppercase cursor-pointer border-none mt-1">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )

  // --- ADMIN PANEL ---
  return (
    <div className="min-h-screen bg-[#111] font-sans text-[#eee]">
      <div className="bg-[#0a0a0a] px-6 py-4 flex items-center justify-between border-b border-[#333]">
        <span className="text-[#c9a84c] tracking-widest uppercase text-sm font-bold">Panel Admin</span>
        <button onClick={handleLogout} className="text-[11px] text-[#777] hover:text-[#eee] tracking-wide uppercase border border-[#333] px-3 py-1.5 rounded cursor-pointer bg-transparent transition-colors">
          Cerrar sesión
        </button>
      </div>

      {msg && (
        <div className="bg-[#c9a84c] text-[#0a0a0a] text-center py-2 text-xs font-bold tracking-widest uppercase">
          {msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#333]">
        {['products', 'config'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-xs tracking-widest uppercase font-bold border-none cursor-pointer transition-colors ${tab === t ? 'bg-[#1e1e1e] text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'bg-transparent text-[#777] hover:text-[#eee]'}`}
          >
            {t === 'products' ? 'Productos' : 'Tienda'}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-4xl mx-auto">

        {/* TAB PRODUCTOS */}
        {tab === 'products' && (
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[#c9a84c] mb-4 font-bold">
              {editingId ? 'Editar producto' : 'Agregar producto'}
            </p>
            <form onSubmit={handleSaveProduct} className="bg-[#1e1e1e] border border-[#333] rounded-lg p-5 mb-8 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div><label className={labelClass}>Nombre</label><input className={inputClass} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required /></div>
              <div><label className={labelClass}>Descripción</label><input className={inputClass} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
              <div><label className={labelClass}>Precio (CLP)</label><input className={inputClass} type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required /></div>
              <div><label className={labelClass}>Stock</label><input className={inputClass} type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} required /></div>
              <div><label className={labelClass}>Categoría</label><input className={inputClass} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="ej: Tops" /></div>
              <div><label className={labelClass}>Tag</label><input className={inputClass} value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} placeholder="ej: Nuevo" /></div>
              <div><label className={labelClass}>Emoji (placeholder)</label><input className={inputClass} value={form.emoji} onChange={e => setForm(p => ({ ...p, emoji: e.target.value }))} /></div>
              <div className="col-span-full">
                <label className={labelClass}>Tallas disponibles</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ALL_SIZES.map(sz => (
                    <button key={sz} type="button" onClick={() => toggleSize(sz)}
                      className={`text-[11px] font-bold px-3 py-1 rounded border-2 cursor-pointer transition-all ${form.sizes.includes(sz) ? 'border-[#c9a84c] bg-[#c9a84c22] text-[#c9a84c]' : 'border-[#555] bg-[#2a2a2a] text-[#777]'}`}>
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-full flex gap-3">
                <button type="submit" disabled={saving} className="bg-[#c9a84c] text-[#0a0a0a] font-bold py-2 px-6 rounded text-xs tracking-widest uppercase cursor-pointer border-none">
                  {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Agregar producto'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="border-2 border-[#555] text-[#777] font-bold py-2 px-5 rounded text-xs tracking-widest uppercase cursor-pointer bg-transparent">
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            {/* Lista de productos */}
            <p className="text-[11px] tracking-widest uppercase text-[#c9a84c] mb-4 font-bold">Productos existentes</p>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {products.map(p => (
                <div key={p.id} className="bg-[#1e1e1e] border border-[#333] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide">{p.name}</div>
                      <div className="text-[11px] text-[#777]">{p.category}</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#c9a84c] font-bold mb-1">${p.price?.toLocaleString('es-CL')}</div>
                  <div className="text-[11px] text-[#777] mb-3">Stock: {p.stock} · Tallas: {p.sizes?.join(', ')}</div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="flex-1 bg-[#2a2a2a] border border-[#444] text-[#eee] text-[11px] font-bold py-1.5 rounded tracking-wide uppercase cursor-pointer">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="flex-1 bg-[#2a2a2a] border border-[#e03030] text-[#e03030] text-[11px] font-bold py-1.5 rounded tracking-wide uppercase cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONFIG */}
        {tab === 'config' && config && (
          <div>
            <p className="text-[11px] tracking-widest uppercase text-[#c9a84c] mb-4 font-bold">Configuración de la tienda</p>
            <form onSubmit={handleSaveConfig} className="bg-[#1e1e1e] border border-[#333] rounded-lg p-5 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div><label className={labelClass}>Nombre de la tienda</label><input className={inputClass} value={config.store_name || ''} onChange={e => setConfig(p => ({ ...p, store_name: e.target.value }))} /></div>
              <div><label className={labelClass}>Frase hero</label><input className={inputClass} value={config.hero_text || ''} onChange={e => setConfig(p => ({ ...p, hero_text: e.target.value }))} /></div>
              <div><label className={labelClass}>Instagram (@handle)</label><input className={inputClass} value={config.instagram || ''} onChange={e => setConfig(p => ({ ...p, instagram: e.target.value }))} /></div>
              <div><label className={labelClass}>WhatsApp (56912345678)</label><input className={inputClass} value={config.whatsapp || ''} onChange={e => setConfig(p => ({ ...p, whatsapp: e.target.value }))} /></div>
              <div className="col-span-full">
                <button type="submit" disabled={saving} className="bg-[#c9a84c] text-[#0a0a0a] font-bold py-2 px-6 rounded text-xs tracking-widest uppercase cursor-pointer border-none">
                  {saving ? 'Guardando...' : 'Guardar configuración'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
