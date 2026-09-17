import Image from 'next/image';
import BookButton from './BookButton';
import FloatingBookButton from './FloatingBookButton';
import { site } from '@/lib/site-data';

export default function TreatmentPage({
  title,
  intro,
  image,
  sections,
  serviceQuery,
}: {
  title: string;
  intro: string;
  image: string;
  sections: { heading: string; body: string }[];
  serviceQuery?: string; // nombre a precargar en la búsqueda de /reservar
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24 grid lg:grid-cols-[1fr_320px] gap-10 sm:gap-16">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-ink max-w-2xl">
          {title}
        </h1>
        <p className="mt-6 text-stone max-w-prose text-base sm:text-lg">{intro}</p>

        <div className="relative aspect-[3/2] mt-8 border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public{image} (horizontal, ideal 1200x800) */}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 sm:mt-14 space-y-10 sm:space-y-14">
          {sections.map((s, i) => (
            <div key={s.heading} className="grid sm:grid-cols-[auto_1fr] gap-3 sm:gap-6">
              <span className="font-display text-2xl sm:text-3xl text-gold-dark/60 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-display text-xl sm:text-2xl text-ink mb-3">{s.heading}</h2>
                <p className="text-stone max-w-prose whitespace-pre-line">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 self-start border border-ink/10 p-6 h-fit">
        <p className="font-display text-lg text-ink mb-2">{site.shortName}</p>
        <p className="text-sm text-stone mb-6">
          {site.address.neighborhood}, {site.address.city} · {site.address.metro}
        </p>
        <BookButton servicio={serviceQuery} className="w-full justify-center" />
        <p className="mt-4 text-xs text-stone">
          O llámanos: <a href={`tel:${site.phonePrimary}`} className="hover:text-gold-dark">{site.phonePrimaryDisplay}</a>
        </p>
      </aside>

      <FloatingBookButton servicio={serviceQuery} />
    </section>
  );
}
