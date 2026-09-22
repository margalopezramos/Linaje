import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gracias por tu compra',
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-4">¡Gracias por tu compra!</h1>
      <p className="text-stone mb-2">Gracias por confiar en nosotr@s.</p>
      <p className="text-stone mb-8">
        Hemos recibido tu pedido. Te contactaremos en breve para confirmar los
        detalles. Si tienes cualquier duda, escríbenos por WhatsApp.
      </p>
      <Link href="/" className="inline-flex items-center text-sm font-medium text-gold-dark hover:underline">
        Volver a la home →
      </Link>
    </section>
  );
}
