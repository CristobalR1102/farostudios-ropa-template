# FaroStudios · Ropa Template 🛍

Template de tienda de ropa para venta por WhatsApp e Instagram. Desarrollado por **FaroStudios**.

## Stack
- React + Vite + TailwindCSS
- Supabase (base de datos + auth)
- Vercel (deploy)

## Funcionalidades
- Catálogo con filtros por categoría
- Selector de tallas por producto
- Contador de stock (disponible / últimas unidades / agotado)
- Carrito de compra
- Checkout por **WhatsApp** (mensaje pre-armado con el pedido)
- Link directo al **perfil de Instagram** de la tienda
- Sección de reseñas de clientes
- **Panel admin** en `/admin` con login:
  - CRUD de productos (nombre, precio, stock, tallas, categoría, tag, emoji)
  - Configuración global (nombre tienda, WhatsApp, Instagram, frase hero)

---

## Setup

### 1. Instalar
```bash
npm install
```

### 2. Supabase
1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar `supabase/schema.sql` en el SQL Editor
3. Crear usuario admin en Authentication > Users

### 3. Variables de entorno
Crear `.env` en la raíz:
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Dev
```bash
npm run dev
```

### 5. Deploy Vercel
Conectar repo, agregar las variables de entorno, listo.

## Rutas
| Ruta | Descripción |
|------|-------------|
| `/` | Tienda pública |
| `/admin` | Panel admin (requiere login) |

---
*Iluminamos tu presencia digital · FaroStudios*
