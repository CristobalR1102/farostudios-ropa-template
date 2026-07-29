-- Tabla de productos
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price integer not null,
  stock integer not null default 0,
  category text,
  tag text,
  emoji text default '👗',
  image_url text,
  sizes text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Tabla de reseñas
create table reviews (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  stars integer not null check (stars between 1 and 5),
  text text not null,
  product_name text,
  created_at timestamp with time zone default now()
);

-- Configuración de la tienda (fila única)
create table store_config (
  id integer primary key default 1,
  store_name text default 'Boutique',
  hero_text text default 'Piezas únicas · Envío a todo Chile',
  instagram text default '@tunombreig',
  whatsapp text default '56912345678'
);

-- Insertar config inicial
insert into store_config (id, store_name, hero_text, instagram, whatsapp)
values (1, 'Boutique ✦', 'Piezas únicas · Envío a todo Chile', '@tunombreig', '56912345678')
on conflict (id) do nothing;

-- Datos de ejemplo
insert into products (name, description, price, stock, category, tag, emoji, sizes) values
  ('Vestido Lino', 'Tela natural, corte holgado', 32900, 3, 'Vestidos', 'Nuevo', '👗', array['XS','S','M','L']),
  ('Top Seda', 'Escote en V, varios colores', 18500, 7, 'Tops', '', '👚', array['S','M','L','XL']),
  ('Pantalón Wide', 'Tiro alto, fit relajado', 28900, 2, 'Pantalones', 'Popular', '👖', array['34','36','38','40']),
  ('Blazer Oversize', 'Entalle moderno, unisex', 45900, 1, 'Abrigos', '', '🧥', array['S','M','L']),
  ('Falda Midi', 'Plisada, tiro alto', 22500, 5, 'Faldas', 'Nuevo', '👘', array['XS','S','M','L']),
  ('Set Loungewear', 'Buzo + top coordinado', 38900, 4, 'Conjuntos', '', '🩱', array['Única']);

insert into reviews (name, stars, text, product_name) values
  ('Valentina R.', 5, 'La calidad es increíble, llegó antes de lo esperado y el empaque muy cuidado.', 'Vestido Lino'),
  ('Camilo M.', 5, 'Me quedó perfecto el tallaje, muy fiel a la descripción. Volvería a comprar.', 'Pantalón Wide'),
  ('Fernanda G.', 4, 'Buena atención y producto de calidad. El color es exactamente como en la foto.', 'Blazer Oversize'),
  ('Tomás T.', 5, 'El set es increíble, la tela muy suave. Súper cómodo para el día a día.', 'Set Loungewear');

-- RLS: productos y reseñas públicos para lectura
alter table products enable row level security;
alter table reviews enable row level security;
alter table store_config enable row level security;

create policy "Lectura pública productos" on products for select using (true);
create policy "Lectura pública reseñas" on reviews for select using (true);
create policy "Lectura pública config" on store_config for select using (true);

-- Solo usuarios autenticados pueden escribir
create policy "Admin escribe productos" on products for all using (auth.role() = 'authenticated');
create policy "Admin escribe reseñas" on reviews for all using (auth.role() = 'authenticated');
create policy "Admin escribe config" on store_config for all using (auth.role() = 'authenticated');
