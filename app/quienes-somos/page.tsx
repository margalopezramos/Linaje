import type { Metadata } from 'next';
import Image from 'next/image';
import BookButton from '@/components/BookButton';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'Conoce al equipo de Centro de Estética Linaje en Argüelles, Madrid: profesionales dedicadas al cuidado de tu piel.',
  alternates: { canonical: '/quienes-somos' },
};

// TODO(cliente): sustituir todo este contenido por el real — nombre de
// la responsable/equipo, formación, años de experiencia, filosofía propia.
// Una web de estética sin cara detrás genera menos confianza que una que sí
// la tiene; esta página es la que más se nota si se deja con contenido de relleno.
export default function QuienesSomosPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-8">Quiénes Somos</h1>

      <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-center mb-14">
        <div className="relative aspect-[4/5] border border-gold/40 p-1.5">
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
          <h2 className="font-display text-2xl text-ink mb-4">
            [Nombre] — TODO(cliente)
          </h2>
          <p className="text-stone max-w-prose mb-4">
            TODO(cliente): breve presentación en primera persona o del
            equipo — quién eres, por qué te dedicas a la estética, cuántos
            años lleváis en Argüelles.
          </p>
          <p className="text-stone max-w-prose">
            TODO(cliente): formación y especialización (certificaciones,
            cursos de INDIBA, etc.) — esto genera mucha confianza en un
            sector donde la piel de la clienta está en juego.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="font-display text-2xl text-ink mb-4">Nuestra filosofía</h2>
        <p className="text-stone max-w-prose">
          TODO(cliente): 2-3 frases sobre cómo trabajáis — personalización,
          naturalidad de los resultados, cercanía con la clienta, etc.
          (Puedes inspirarte en lo que ya dices en el resto de la web:
          protocolos personalizados, resultados visibles desde la primera
          sesión, tecnología avanzada.)
        </p>
      </div>

      <BookButton label="Reserva tu primera cita" />
    </section>
  );
}
