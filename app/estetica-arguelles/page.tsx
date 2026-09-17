import type { Metadata } from 'next';
import Link from 'next/link';
import { treatmentsNav } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Nuestros Tratamientos',
  description:
    'Todos los tratamientos de Centro de Estética Linaje en Argüelles: INDIBA, facial, corporal, depilación láser, microblading y más.',
  alternates: { canonical: '/estetica-arguelles' },
};

export default function TratamientosIndexPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="font-display text-4xl text-ink mb-4 max-w-xl">
        Nuestros tratamientos
      </h1>
      <p className="text-stone max-w-prose mb-12">
        En Linaje contamos con una amplia gama de servicios diseñados para
        adaptarse a cada una de tus necesidades.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
        {treatmentsNav
          .filter((t) => t.href !== '/unas')
          .concat([{ label: 'Uñas', href: '/unas' }])
          .map((t) => (
            <Link key={t.href} href={t.href} className="group border-t border-ink/10 pt-4">
              <h2 className="font-display text-xl text-ink group-hover:text-gold-dark">{t.label}</h2>
            </Link>
          ))}
      </div>
    </section>
  );
}
