export const DEFAULT_CONFIG = {
  store_name: 'Boutique Aurora ✦',
  hero_text: 'Piezas únicas · Envío a todo Chile',
  instagram: '@boutiquearora',
  whatsapp: '56912345678',
}

const UNSPLASH = (id) => `https://images.unsplash.com/${id}?w=600&q=75&auto=format&fit=crop`

export const DEFAULT_PRODUCTS = [
  { id: 'demo-1', name: 'Vestido Lino', description: 'Tela natural, corte holgado', price: 32900, stock: 3, category: 'Vestidos', tag: 'Nuevo', image_url: UNSPLASH('photo-1625158244856-e5e20f733c1f'), sizes: ['XS', 'S', 'M', 'L'] },
  { id: 'demo-2', name: 'Top Seda', description: 'Escote en V, varios colores', price: 18500, stock: 7, category: 'Tops', tag: '', image_url: UNSPLASH('photo-1704775989365-eebfd4659a23'), sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'demo-3', name: 'Pantalón Wide', description: 'Tiro alto, fit relajado', price: 28900, stock: 2, category: 'Pantalones', tag: 'Popular', image_url: UNSPLASH('photo-1610241532145-96771e5088e8'), sizes: ['34', '36', '38', '40'] },
  { id: 'demo-4', name: 'Blazer Oversize', description: 'Entalle moderno, unisex', price: 45900, stock: 1, category: 'Abrigos', tag: '', image_url: UNSPLASH('photo-1559127452-829071a09516'), sizes: ['S', 'M', 'L'] },
  { id: 'demo-5', name: 'Falda Midi', description: 'Plisada, tiro alto', price: 22500, stock: 5, category: 'Faldas', tag: 'Nuevo', image_url: UNSPLASH('photo-1533659828870-95ee305cee3e'), sizes: ['XS', 'S', 'M', 'L'] },
  { id: 'demo-6', name: 'Set Loungewear', description: 'Buzo + top coordinado', price: 38900, stock: 0, category: 'Conjuntos', tag: '', image_url: UNSPLASH('photo-1759229874681-39fb36b01e32'), sizes: ['Única'] },
]

export const DEFAULT_REVIEWS = [
  { id: 'demo-r1', name: 'Valentina R.', stars: 5, text: 'La calidad es increíble, llegó antes de lo esperado y el empaque muy cuidado.', product_name: 'Vestido Lino' },
  { id: 'demo-r2', name: 'Camilo M.', stars: 5, text: 'Me quedó perfecto el tallaje, muy fiel a la descripción. Volvería a comprar.', product_name: 'Pantalón Wide' },
  { id: 'demo-r3', name: 'Fernanda G.', stars: 4, text: 'Buena atención y producto de calidad. El color es exactamente como en la foto.', product_name: 'Blazer Oversize' },
  { id: 'demo-r4', name: 'Tomás T.', stars: 5, text: 'El set es increíble, la tela muy suave. Súper cómodo para el día a día.', product_name: 'Set Loungewear' },
]
