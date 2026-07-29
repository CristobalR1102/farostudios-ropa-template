export default function Header({ config, cartCount, onCartOpen }) {
  const igHandle = config?.instagram || '@tunombreig'
  const igUrl = `https://instagram.com/${igHandle.replace('@', '')}`

  return (
    <header className="bg-[#0a0a0a] text-white flex items-center justify-between px-6 h-16 sticky top-0 z-50">
      <span className="text-[#c9a84c] text-lg font-medium tracking-widest uppercase">
        {config?.store_name || 'Boutique ✦'}
      </span>

      <div className="flex items-center gap-4">
        <a
          href={igUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#c9a84c] text-xs tracking-wide border border-[#c9a84c44] px-3 py-1.5 rounded-full hover:bg-[#c9a84c18] transition-colors"
        >
          <i className="ti ti-brand-instagram text-base" />
          {igHandle}
        </a>

        <button
          onClick={onCartOpen}
          aria-label="Abrir carrito"
          className="relative text-white text-lg p-1 bg-transparent border-none cursor-pointer"
        >
          <i className="ti ti-shopping-bag" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-1.5 bg-[#c9a84c] text-[#0a0a0a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
