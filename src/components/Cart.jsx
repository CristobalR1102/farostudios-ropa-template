import { useState } from 'react'

export default function Cart({ cart, onClose, onRemove, config }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const total = cart.reduce((s, x) => s + x.price, 0)
  const fmt = n => '$' + n.toLocaleString('es-CL')

  const storePhone = config?.whatsapp || '56912345678'
  const storeIg = `https://instagram.com/${(config?.instagram || 'tunombreig').replace('@', '')}`

  const handleWhatsApp = () => {
    if (!cart.length) return alert('Agrega productos primero.')
    const lines = cart.map(i => `• ${i.name} (Talla ${i.size}) — ${fmt(i.price)}`).join('\n')
    const msg = `Hola! Quiero hacer un pedido 🛍\n\n*Nombre:* ${name || 'Cliente'}\n${address ? `*Dirección:* ${address}\n` : ''}\n*Productos:*\n${lines}\n\n*Total: ${fmt(total)}*`
    window.open(`https://wa.me/${storePhone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const inputClass = "w-full border-2 border-[#ddd] px-3 py-2 text-sm rounded focus:border-[#0a0a0a] outline-none mb-2 font-[inherit] text-[#1a1a1a] bg-white"

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-80 h-full bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#eee] flex items-center justify-between">
          <span className="text-xs font-bold tracking-[.15em] uppercase text-[#0a0a0a]">Tu pedido</span>
          <button onClick={onClose} className="text-[#888] text-xl bg-transparent border-none cursor-pointer p-0.5">
            <i className="ti ti-x" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center pt-10 text-[#aaa] text-sm">
              <i className="ti ti-shopping-bag text-4xl block mb-2 text-[#ddd]" />
              Tu carrito está vacío
            </div>
          ) : (
            cart.map(item => (
              <div key={item.uid} className="flex items-center gap-3 py-3 border-b border-[#f0ede6]">
                <div className="w-12 h-16 bg-[#ede9e1] rounded flex items-center justify-center text-2xl flex-shrink-0">
                  {item.image_url
                    ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded" />
                    : item.emoji || '👗'
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-[#1a1a1a]">{item.name}</div>
                  <div className="text-[11px] text-[#999] mt-0.5">Talla {item.size}</div>
                  <div className="text-[13px] text-[#c9a84c] font-bold mt-0.5">{fmt(item.price)}</div>
                </div>
                <button
                  onClick={() => onRemove(item.uid)}
                  aria-label="Quitar"
                  className="text-[#ccc] hover:text-[#888] text-base bg-transparent border-none cursor-pointer p-0.5"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#eee]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#888]">Total</span>
            <span className="text-xl font-bold text-[#0a0a0a]">{fmt(total)}</span>
          </div>

          <input className={inputClass} placeholder="Tu nombre" value={name} onChange={e => setName(e.target.value)} />
          <input className={inputClass} placeholder="Tu WhatsApp (912345678)" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className={`${inputClass} mb-3`} placeholder="Dirección de envío (opcional)" value={address} onChange={e => setAddress(e.target.value)} />

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-md text-sm font-bold tracking-wide cursor-pointer border-none mb-2 hover:bg-[#1db954] transition-colors"
          >
            <i className="ti ti-brand-whatsapp text-lg" />
            Pedir por WhatsApp
          </button>

          <button
            onClick={() => window.open(storeIg, '_blank')}
            className="w-full flex items-center justify-center gap-2 bg-[#833ab4] text-white py-2.5 rounded-md text-sm font-bold tracking-wide cursor-pointer border-none hover:bg-[#6a2f93] transition-colors"
          >
            <i className="ti ti-brand-instagram text-base" />
            Ver tienda en Instagram
          </button>

          <p className="text-[11px] text-[#bbb] text-center mt-2">El pedido llega directo al vendedor</p>
        </div>
      </div>
    </div>
  )
}
