import { useState } from 'react'

const SALES_WHATSAPP = '56920331153'
const SALES_IG = 'cristobalr1102'
const SALES_MSG = 'Hola! Vi tu página y quiero una tienda online para mi marca de ropa 🛍✨'
const salesWaLink = `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(SALES_MSG)}`

const FEATURES = [
  { icon: 'ti-category', title: 'Catálogo con filtros', text: 'Tus clientas filtran por categoría y encuentran lo que buscan sin scrollear 100 fotos.' },
  { icon: 'ti-ruler-2', title: 'Selector de tallas', text: 'Cada producto muestra sus tallas disponibles, sin mensajes de ida y vuelta.' },
  { icon: 'ti-flame', title: 'Stock en tiempo real', text: '"Últimas 2 unidades" genera urgencia y evita vender algo que ya no tienes.' },
  { icon: 'ti-shopping-bag', title: 'Carrito de compra', text: 'Arman su pedido completo antes de escribirte, como en una tienda real.' },
  { icon: 'ti-brand-whatsapp', title: 'Checkout por WhatsApp', text: 'El pedido llega armado y ordenado directo a tu WhatsApp, listo para confirmar.' },
  { icon: 'ti-brand-instagram', title: 'Conectada a tu Instagram', text: 'Un solo link en tu bio lleva a la tienda completa, no a un feed desordenado.' },
  { icon: 'ti-star', title: 'Reseñas de clientas', text: 'Muestra la confianza que ya te ganaste y ayuda a cerrar nuevas ventas.' },
  { icon: 'ti-settings', title: 'Panel admin simple', text: 'Agrega productos, cambia precios y stock tú misma, sin depender de nadie.' },
]

const STEPS = [
  { n: '01', title: 'Nos cuentas de tu marca', text: 'Nombre, colores, WhatsApp, Instagram y tu catálogo actual.' },
  { n: '02', title: 'Armamos tu tienda', text: 'Cargamos tus productos y dejamos todo personalizado y funcionando.' },
  { n: '03', title: 'Recibes tu link y vendes', text: 'Lo pones en tu bio de Instagram y empiezas a recibir pedidos ordenados.' },
]

const INCLUDES = [
  'Tienda online a tu nombre y con tus colores',
  'Catálogo y stock ilimitado de productos',
  'Checkout directo a tu WhatsApp',
  'Panel admin para que administres todo sola',
  'Hosting y dominio configurado',
  'Soporte para cambios y dudas',
]

const FAQS = [
  { q: '¿Necesito saber programar o diseñar?', a: 'No. Tú nos pasas tu catálogo y tus datos, nosotros dejamos la tienda funcionando y personalizada.' },
  { q: '¿Los pedidos llegan a mi WhatsApp?', a: 'Sí. Cuando una clienta arma su pedido en el carrito, se genera un mensaje de WhatsApp ordenado con los productos, tallas y total, listo para confirmar.' },
  { q: '¿Puedo cambiar productos y precios yo misma?', a: 'Sí, tu tienda incluye un panel admin donde agregas, editas y eliminas productos, y actualizas el stock cuando quieras.' },
  { q: '¿Cuánto se demora la entrega?', a: 'Depende del tamaño de tu catálogo, pero en general tu tienda queda lista en pocos días.' },
  { q: '¿Puedo usar mi propio dominio?', a: 'Sí, puedes conectar el dominio que prefieras o usar el que te entregamos por defecto.' },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#e2dfd8]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="text-sm font-bold text-[#1a1a1a]">{item.q}</span>
        <i className={`ti ti-chevron-down text-[#c9a84c] text-lg flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="text-sm text-[#666] leading-relaxed pb-4 pr-8">{item.a}</p>}
    </div>
  )
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans text-[#1a1a1a]">

      {/* Nav */}
      <header className="bg-[#0a0a0a] text-white flex items-center justify-between px-6 h-16 sticky top-0 z-50">
        <span className="text-[#c9a84c] text-lg font-medium tracking-widest uppercase">@cristobalr1102 ✦</span>
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-widest uppercase text-[#bbb]">
          <a href="#funcionalidades" className="hover:text-[#c9a84c] transition-colors">Funcionalidades</a>
          <a href="#como-funciona" className="hover:text-[#c9a84c] transition-colors">Cómo funciona</a>
          <a href="#precio" className="hover:text-[#c9a84c] transition-colors">Precio</a>
          <a href="#faq" className="hover:text-[#c9a84c] transition-colors">FAQ</a>
        </nav>
        <a
          href={salesWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#0a0a0a] bg-[#c9a84c] text-xs font-bold tracking-wide px-3.5 py-2 rounded-full hover:bg-[#dbbf6c] transition-colors"
        >
          <i className="ti ti-brand-whatsapp text-base" />
          Quiero mi tienda
        </a>
      </header>

      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white text-center px-6 py-20 border-b border-[#222]">
        <p className="text-[11px] tracking-[.25em] uppercase text-[#c9a84c] mb-4">Para marcas de ropa que venden por Instagram</p>
        <h1 className="text-3xl md:text-5xl font-light tracking-wide uppercase leading-tight mb-5 max-w-3xl mx-auto">
          Deja de perder pedidos en los <span className="text-[#c9a84c]">DMs</span>
        </h1>
        <p className="text-sm md:text-base text-[#999] tracking-wide max-w-xl mx-auto mb-10 leading-relaxed">
          Una tienda online propia con catálogo, tallas, stock y carrito — y el pedido llega ordenado directo a tu WhatsApp. Sin comisiones por venta.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={salesWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#c9a84c] text-[#0a0a0a] font-bold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-[#dbbf6c] transition-colors w-full sm:w-auto justify-center"
          >
            <i className="ti ti-brand-whatsapp text-lg" />
            Quiero mi tienda
          </a>
          <a
            href="/demo"
            className="flex items-center gap-2 border-2 border-[#333] text-white font-bold text-sm tracking-wide px-6 py-3 rounded-full hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors w-full sm:w-auto justify-center"
          >
            Ver demo en vivo
            <i className="ti ti-arrow-right text-base" />
          </a>
        </div>
      </section>

      {/* Pain points */}
      <section className="px-6 py-14 max-w-3xl mx-auto text-center">
        <p className="text-[11px] tracking-[.2em] uppercase text-[#888] mb-3">¿Te suena familiar?</p>
        <h2 className="text-xl md:text-2xl font-bold mb-8">Vender por Instagram no debería ser así de caótico</h2>
        <div className="grid gap-4 text-left" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {[
            'Pedidos perdidos entre comentarios y mensajes de distintas clientas',
            'Repites precio, tallas y stock uno por uno, todo el día',
            'No sabes qué talla o color quedan disponibles en el momento',
            'Tu feed es tu catálogo y nadie encuentra nada',
          ].map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-[#e2dfd8] rounded-lg p-4">
              <i className="ti ti-x text-red-500 text-lg flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#444] leading-relaxed">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="bg-white py-16 px-6 border-y border-[#e8e6e0]">
        <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-3">Todo incluido</p>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-10">Una tienda pensada para vender ropa</h2>
        <div className="grid gap-5 max-w-5xl mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-[#f9f8f6] border border-[#ebe8e1] rounded-lg p-5">
              <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center mb-3">
                <i className={`ti ${f.icon} text-[#c9a84c] text-lg`} />
              </div>
              <div className="text-sm font-bold uppercase tracking-wide mb-1.5">{f.title}</div>
              <p className="text-[13px] text-[#777] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="px-6 py-16 max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-3">Proceso</p>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-10">Cómo funciona</h2>
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {STEPS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-light text-[#c9a84c] mb-3">{s.n}</div>
              <div className="text-sm font-bold uppercase tracking-wide mb-2">{s.title}</div>
              <p className="text-[13px] text-[#777] leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo preview */}
      <section className="bg-[#0a0a0a] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] tracking-[.2em] uppercase text-[#c9a84c] mb-3">Míralo en acción</p>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Esta es una tienda real hecha con @cristobalr1102</h2>
          <p className="text-sm text-[#999] max-w-lg mx-auto mb-8 leading-relaxed">
            Catálogo, tallas, carrito y checkout por WhatsApp funcionando de verdad. Así se vería la tuya.
          </p>

          {/* Mockup */}
          <a href="/demo" className="block max-w-md mx-auto group">
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden group-hover:border-[#c9a84c] transition-colors">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#333]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#444]" />
              </div>
              <div className="p-6 grid grid-cols-2 gap-3">
                {['👗', '👚', '👖', '🧥'].map((e, i) => (
                  <div key={i} className="aspect-[3/4] bg-[#2a2a2a] rounded-lg flex items-center justify-center text-3xl">
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <span className="inline-flex items-center gap-2 mt-5 text-[#c9a84c] text-xs font-bold tracking-widest uppercase">
              Ver demo en vivo
              <i className="ti ti-arrow-right text-base" />
            </span>
          </a>
        </div>
      </section>

      {/* Incluye / Precio */}
      <section id="precio" className="px-6 py-16 max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-3">Precio</p>
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3">Una cotización a tu medida</h2>
        <p className="text-sm text-[#777] text-center max-w-md mx-auto mb-10 leading-relaxed">
          El precio depende del tamaño de tu catálogo. Escríbenos y te cotizamos sin compromiso.
        </p>

        <div className="bg-white border border-[#e2dfd8] rounded-xl p-8">
          <div className="text-[11px] tracking-widest uppercase text-[#c9a84c] font-bold mb-5">Tu tienda incluye</div>
          <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {INCLUDES.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <i className="ti ti-check text-[#c9a84c] text-base flex-shrink-0" />
                <span className="text-sm text-[#444]">{item}</span>
              </div>
            ))}
          </div>
          <a
            href={salesWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#0a0a0a] text-[#c9a84c] font-bold text-sm tracking-wide py-3.5 rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            <i className="ti ti-brand-whatsapp text-lg" />
            Cotizar mi tienda por WhatsApp
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16 px-6 border-y border-[#e8e6e0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[.2em] uppercase text-[#888] text-center mb-3">Preguntas frecuentes</p>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">Todo lo que necesitas saber</h2>
          <div>
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#0a0a0a] text-center px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide uppercase text-white mb-4">
          Tu marca merece una <span className="text-[#c9a84c]">tienda de verdad</span>
        </h2>
        <p className="text-sm text-[#999] max-w-md mx-auto mb-8 leading-relaxed">
          Cuéntanos de tu marca y te ayudamos a dejar de perder ventas en los DMs.
        </p>
        <a
          href={salesWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0a0a0a] font-bold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-[#dbbf6c] transition-colors"
        >
          <i className="ti ti-brand-whatsapp text-lg" />
          Quiero mi tienda
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-[#555] text-center py-6 px-6 text-[11px] tracking-widest uppercase border-t border-[#1a1a1a]">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a
            href={`https://instagram.com/${SALES_IG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] hover:text-[#c9a84c] transition-colors flex items-center gap-1"
          >
            <i className="ti ti-brand-instagram text-sm" />
            @{SALES_IG}
          </a>
        </div>
        Hecho con ♥
      </footer>
    </div>
  )
}
