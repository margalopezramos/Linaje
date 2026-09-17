import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Bonos y Tarjetas Regalo en Argüelles — Linaje',
  description:
    'Compra bonos de tratamientos, tarjetas regalo y velas de masaje de Centro de Estética Linaje en Argüelles, Madrid.',
  alternates: { canonical: '/bonos-ofertas-premium-arguelles' },
};

export default function TiendaPage() {
  const bonos = products.filter((p) => p.category === 'bono');
  const productosFisicos = products.filter((p) => p.category === 'producto');

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">Bonos y Tarjetas Regalo</h1>
      <p className="text-stone max-w-prose mb-10 sm:mb-14">
        Regala o regálate bienestar: bonos de sesiones, tarjeta regalo a tu
        gusto, y productos para seguir cuidándote en casa.
      </p>

      <h2 className="font-display text-2xl text-ink mb-6">Bonos de tratamientos</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14 sm:mb-20">
        {bonos.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {productosFisicos.length > 0 && (
        <>
          <h2 className="font-display text-2xl text-ink mb-6">Para casa</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosFisicos.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
