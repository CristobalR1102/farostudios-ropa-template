function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-sm ${i < count ? 'text-[#c9a84c]' : 'text-[#ccc]'}`}>★</span>
      ))}
    </div>
  )
}

export default function Reviews({ reviews }) {
  if (!reviews?.length) return null

  return (
    <section className="bg-white py-10 px-6 border-t border-[#e8e6e0]">
      <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-6">
        Lo que dicen nuestros clientes
      </p>
      <div className="grid gap-4 max-w-3xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#f9f8f6] border border-[#ebe8e1] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#0a0a0a] flex items-center justify-center text-xs font-bold text-[#c9a84c] flex-shrink-0">
                {r.name?.[0]}
              </div>
              <div>
                <div className="text-xs font-bold text-[#1a1a1a]">{r.name}</div>
                <div className="text-[10px] text-[#aaa] tracking-wide">{r.product_name}</div>
              </div>
            </div>
            <Stars count={r.stars} />
            <p className="text-xs text-[#555] leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
