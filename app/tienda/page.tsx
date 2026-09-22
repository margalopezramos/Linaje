import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Tienda — Bonos, Tarjetas Regalo y Productos | Linaje',
  description:
    'Compra bonos de tratamientos INDIBA, Dermapen, peeling, tarjeta regalo y velas de masaje de Centro de Estética Linaje en Argüelles, Madrid.',
  alternates: { canonical: '/tienda' },
};

const ORDEN_GRUPOS = ['INDIBA', 'Dermapen', 'Peeling', 'Tarjeta regalo', 'Para casa'] as const;

export default function TiendaPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <p className="text-gold-dark text-sm mb-3">Argüelles, Madrid</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">Tienda</h1>
      <p className="text-stone max-w-prose mb-2">
        Regala o regálate bienestar: bonos de sesiones, tarjeta regalo a tu
        gusto, y productos para seguir cuidándote en casa.
      </p>
      <p className="text-xs text-stone mb-10 sm:mb-14">Todos los precios incluyen IVA.</p>

      {ORDEN_GRUPOS.map((grupo) => {
        const productosGrupo = products.filter((p) => p.grupo === grupo);
        if (productosGrupo.length === 0) return null;
        return (
          <div key={grupo} className="mb-14 sm:mb-16">
            <h2 className="font-display text-2xl text-ink mb-6 pb-2 border-b border-gold/30">{grupo}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {productosGrupo.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
