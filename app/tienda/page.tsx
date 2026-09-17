import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Tienda — Bonos, Tarjetas Regalo y Productos | Linaje',
  description:
    'Compra bonos de tratamientos, tarjeta regalo y velas de masaje de Centro de Estética Linaje en Argüelles, Madrid.',
  alternates: { canonical: '/tienda' },
};

export default function TiendaPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <p className="text-gold-dark text-sm mb-3">Argüelles, Madrid</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">Tienda</h1>
      <p className="text-stone max-w-prose mb-2">
        Regala o regálate bienestar: bonos de sesiones, tarjeta regalo a tu
        gusto, y productos para seguir cuidándote en casa.
      </p>
      <p className="text-xs text-stone mb-8 sm:mb-10">Todos los precios incluyen IVA.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
