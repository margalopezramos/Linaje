import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BookButton from '@/components/BookButton';
import BrandsBanner from '@/components/BrandsBanner';
import CtaBanner from '@/components/CtaBanner';
import ServicesCarousel from '@/components/ServicesCarousel';
import Testimonials from '@/components/Testimonials';
import MapEmbed from '@/components/MapEmbed';
import { treatments } from '@/lib/treatments';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Centro de Estética en Argüelles – Linaje, Centro de Estética',
  description:
    'Tratamientos estéticos en Centro de Estética Linaje, en Argüelles. No pierdas el tiempo y pregúntanos sobre cualquier duda. Calidad/Precio garantizado.',
  alternates: { canonical: '/' },
};

const reasons = [
  {
    title: 'Especialistas en piel',
    body: 'Nos dedicamos al cuidado de la piel y al rejuvenecimiento facial, con protocolos diseñados para cada tipo de piel.',
  },
  {
    title: 'Regeneración, no solo apariencia',
    body: 'Trabajamos la firmeza y luminosidad desde la regeneración celular, previniendo los signos del envejecimiento desde su origen.',
  },
  {
    title: 'Resultados desde la primera sesión',
    body: 'Visibles y duraderos: ese es el objetivo de cada tratamiento, con seguimiento cercano en cada visita.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24 grid md:grid-cols-2 gap-10 sm:gap-12 items-end">
        <div className="order-2 md:order-1">
          <p className="text-gold-dark text-sm mb-4">Argüelles, Madrid</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.1] sm:leading-[1.05] text-ink">
            Rejuvenecimiento y belleza en equilibrio
          </h1>
          <p className="mt-6 text-stone max-w-prose text-base sm:text-lg">
            En nuestro Centro de Estética en Argüelles entendemos que cada
            piel es única. Por eso diseñamos tratamientos con protocolos
            personalizados. Combinando tecnología avanzada — como INDIBA,
            nuestro tratamiento de radiofrecuencia facial y corporal más
            avanzado — diagnóstico profesional y cosmética de alta gama,
            seleccionada para garantizar resultados visibles desde la
            primera sesión.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 border border-gold/50 text-xs sm:text-sm text-gold-dark hover:bg-gold/10 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
            Bono INDIBA Corporal desde 59,99 € / sesión →
          </Link>

          <div className="mt-6 flex flex-wrap gap-4">
            <BookButton />
            <Link
              href="/indiba"
              className="inline-flex items-center px-6 py-3 text-sm font-medium border border-ink/20 text-ink hover:border-gold-dark hover:text-gold-dark"
            >
              Descubre INDIBA
            </Link>
          </div>
        </div>

        {/* Carrusel de servicios — sustituye a la foto estática. */}
        {/* En móvil aparece PRIMERO (antes que el texto) para no abrir con un muro de letra. */}
        <div className="order-1 md:order-2">
          <ServicesCarousel />
        </div>
      </section>

      <BrandsBanner />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10">
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10 sm:mb-12 max-w-md">¿Por qué elegirnos?</h2>
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
          {reasons.map((r) => (
            <div key={r.title}>
              <h3 className="font-display text-xl text-ink mb-3">{r.title}</h3>
              <p className="text-stone">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="relative aspect-[4/3] border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public/images/equipo.jpg */}
          <Image
            src="/images/equipo.jpg"
            alt="Equipo de Centro de Estética Linaje"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">Detrás de Linaje</h2>
          <p className="text-stone max-w-prose mb-6">
            {/* TODO(cliente): sustituir por una frase real sobre ti/el equipo */}
            Un equipo dedicado al cuidado de tu piel, con formación específica
            en cada tecnología que utilizamos — porque confiar tu piel a
            alguien también es parte del tratamiento.
          </p>
          <Link
            href="/quienes-somos"
            className="inline-flex items-center text-sm font-medium text-gold-dark hover:underline"
          >
            Conócenos →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="order-2 sm:order-1">
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
            Rejuvenecimiento facial con tecnología avanzada
          </h2>
          <p className="text-stone max-w-prose mb-4">
            Tratamiento de radiofrecuencia regenerativa que estimula la
            producción natural de colágeno y elastina, mejorando la firmeza,
            textura y luminosidad de la piel.
          </p>
          <p className="text-stone max-w-prose">
            INDIBA trabaja a nivel celular para prevenir, tratar los signos
            del envejecimiento, redefinir el óvalo facial y revitalizar la
            piel desde la primera sesión.
          </p>
          <Link
            href="/indiba"
            className="inline-flex items-center mt-6 text-sm font-medium text-gold-dark hover:underline"
          >
            Descubre INDIBA facial →
          </Link>
        </div>
        <div className="relative aspect-[4/3] order-1 sm:order-2 border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public/images/indiba-facial.jpg */}
          <Image
            src="/images/indiba-facial.jpg"
            alt="Rejuvenecimiento facial con INDIBA"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="relative aspect-[4/3] border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public/images/indiba-corporal.jpg */}
          <Image
            src="/images/indiba-corporal.jpg"
            alt="Remodelación corporal con INDIBA"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">
            Remodelación corporal INDIBA
          </h2>
          <p className="text-stone max-w-prose mb-4">
            Tratamiento de radiofrecuencia avanzada que activa la
            regeneración natural del tejido, mejorando la firmeza de la
            piel, reduciendo la celulitis y favoreciendo el drenaje de
            líquidos.
          </p>
          <p className="text-stone max-w-prose mb-4">
            Actúa en profundidad estimulando la circulación y producción de
            colágeno, ayudando a remodelar la silueta y mejorar la calidad
            de la piel de forma progresiva y duradera.
          </p>
          <p className="text-stone max-w-prose">
            Consulta los tratamientos combinados con drenaje linfático
            manual y maderoterapia para potenciar el resultado.
          </p>
          <Link
            href="/indiba"
            className="inline-flex items-center mt-6 text-sm font-medium text-gold-dark hover:underline"
          >
            Descubre INDIBA corporal →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10">
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">Nuestros tratamientos</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {treatments.map((t) => (
            <Link key={t.href} href={t.href} className="group block">
              <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                {/* NOMBRE DE ARCHIVO: public{t.img} (horizontal, ideal 1200x800) */}
                <Image
                  src={t.img}
                  alt={t.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-xl text-ink group-hover:text-gold-dark">{t.title}</h3>
              <p className="mt-1 text-sm text-stone">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Ubicación — mapa embebido de Google Maps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10 grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4">Visítanos en Argüelles</h2>
          <p className="text-stone max-w-prose mb-2">
            {site.address.street}, {site.address.postalCode} {site.address.city} ({site.address.metro})
          </p>
          <p className="text-stone max-w-prose mb-6">
            <a href={`tel:${site.phonePrimary}`} className="hover:text-gold-dark">{site.phonePrimaryDisplay}</a>
            {' · '}
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gold-dark hover:underline">
              Cómo llegar →
            </a>
          </p>
          <BookButton />
        </div>
        <div className="aspect-[4/3] border border-gold/40 p-1.5">
          <MapEmbed src={site.mapsEmbedSrc} title={`Ubicación de ${site.name} en ${site.address.neighborhood}, Madrid`} />
        </div>
      </section>

      <CtaBanner
        title="Reserva tu sesión de INDIBA"
        body="Resultados visibles desde la primera sesión, con un protocolo diseñado para tu piel."
      />
    </>
  );
}
