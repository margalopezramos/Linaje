import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Tienda — Bonos, Tarjetas Regalo y Productos | Linaje',
  description:
    'Compra bonos de tratamientos INDIBA, Dermapen, peeling, tarjeta regalo y velas de masaje de Centro de Estética Linaje en Argüelles, Madrid.',
  alternates: { canonical: '/tienda' },
};

const GRUPOS = [
  { nombre: 'INDIBA', slug: 'indiba' },
  { nombre: 'Dermapen', slug: 'dermapen' },
  { nombre: 'Peeling', slug: 'peeling' },
  { nombre: 'Tarjeta regalo', slug: 'tarjeta-regalo' },
  { nombre: 'Productos', slug: 'productos' },
] as const;

export default function TiendaPage() {
  const gruposConProductos = GRUPOS.map((g) => ({
    ...g,
    productos: products.filter((p) => p.grupo === g.nombre),
  })).filter((g) => g.productos.length > 0);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <p className="text-gold-dark text-sm mb-3">Argüelles, Madrid</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">Tienda</h1>
      <p className="text-stone max-w-prose mb-2">
        Regala o regálate bienestar: bonos de sesiones, tarjeta regalo a tu
        gusto, y productos para seguir cuidándote en casa.
      </p>
      <p className="text-xs text-stone mb-6">Todos los precios incluyen IVA.</p>

      {/* Índice de secciones — fijo al hacer scroll, enlaces que saltan a cada grupo */}
      <nav
        aria-label="Secciones de la tienda"
        className="sticky top-16 z-30 flex gap-2 overflow-x-auto bg-bone/95 backdrop-blur-sm border-b border-gold/20 py-3 mb-10 sm:mb-14 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
      >
        {gruposConProductos.map((g) => (
          <a
            key={g.slug}
            href={`#${g.slug}`}
            className="shrink-0 text-xs sm:text-sm border border-gold/40 text-ink px-3 py-1.5 hover:border-gold hover:bg-gold/10 transition-colors whitespace-nowrap"
          >
            {g.nombre}
            <span className="text-stone"> ({g.productos.length})</span>
          </a>
        ))}
      </nav>

      {gruposConProductos.map((g) => (
        <div key={g.slug} id={g.slug} className="mb-14 sm:mb-16 scroll-mt-32">
          <h2 className="font-display text-2xl text-ink mb-6 pb-2 border-b border-gold/30">{g.nombre}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {g.productos.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
