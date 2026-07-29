import { useState } from 'react'

function StockLabel({ stock }) {
  if (stock === 0) return <span className="text-[11px] text-red-500 font-semibold">Sin stock</span>
  if (stock <= 2) return <span className="text-[11px] text-amber-600 font-semibold">Últimas {stock} unidades</span>
  return <span className="text-[11px] text-emerald-600 font-semibold">{stock} disponibles</span>
}

export default function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.length === 1 ? product.sizes[0] : null
  )

  const needsSize = product.sizes?.length > 1
  const outOfStock = product.stock === 0
  const disabled = outOfStock || (needsSize && !selectedSize)

  const handleAdd = () => {
    if (disabled) return
    onAdd(product, selectedSize || product.sizes?.[0] || 'Única')
  }

  return (
    <div className="bg-white border border-[#e2dfd8] rounded-lg overflow-hidden hover:-translate-y-0.5 transition-transform">
      {/* Imagen / Emoji placeholder */}
      <div className="w-full aspect-[3/4] flex items-center justify-center text-5xl bg-[#ede9e1] relative">
        {product.image_url
          ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          : <span>{product.emoji || '👗'}</span>
        }
        {product.tag && (
          <span className="absolute top-2 left-2 text-[10px] tracking-widest uppercase bg-[#0a0a0a] text-[#c9a84c] px-2 py-0.5 rounded-sm">
            {product.tag}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-2 right-2 text-[10px] tracking-wide uppercase bg-red-500 text-white px-2 py-0.5 rounded-sm">
            Agotado
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="text-xs font-bold tracking-wide uppercase text-[#1a1a1a] mb-1">{product.name}</div>
        <div className="text-[11px] text-[#888] mb-2 leading-relaxed">{product.description}</div>
        <div className="text-sm text-[#c9a84c] font-bold mb-1.5">
          ${product.price?.toLocaleString('es-CL')}
        </div>
        <div className="mb-2">
          <StockLabel stock={product.stock} />
        </div>

        {/* Selector de tallas */}
        {needsSize && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded border-2 cursor-pointer transition-all ${
                  selectedSize === size
                    ? 'border-[#0a0a0a] bg-[#0a0a0a] text-[#c9a84c]'
                    : 'border-[#999] bg-white text-[#444] hover:border-[#0a0a0a]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
        {!needsSize && product.sizes?.length === 1 && (
          <div className="text-[11px] text-[#888] mb-2">Talla: <strong>{product.sizes[0]}</strong></div>
        )}

        <button
          onClick={handleAdd}
          disabled={disabled}
          className={`w-full py-2 text-[11px] font-bold tracking-widest uppercase rounded border-2 transition-all ${
            disabled
              ? 'border-[#ccc] bg-[#f5f5f5] text-[#bbb] cursor-not-allowed'
              : 'border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#c9a84c] cursor-pointer'
          }`}
        >
          {outOfStock ? 'Sin stock' : needsSize && !selectedSize ? 'Elige talla' : '+ Agregar'}
        </button>
      </div>
    </div>
  )
}
