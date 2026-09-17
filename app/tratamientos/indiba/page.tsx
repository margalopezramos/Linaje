import type { Metadata } from 'next';
import Image from 'next/image';
import BookButton from '@/components/BookButton';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'INDIBA en Argüelles | Tratamiento Facial y Corporal para la Celulitis',
  description:
    'Tratamiento INDIBA en Centro de Estética Linaje, Argüelles: radiofrecuencia regenerativa facial y corporal para la celulitis y el rejuvenecimiento de la piel. Reserva tu sesión.',
  alternates: { canonical: '/tratamientos/indiba' },
};

const faqItems = [
  {
    question: '¿Duele el tratamiento INDIBA?',
    answer:
      'No, es un procedimiento indoloro. La mayoría de clientas describen una sensación de calor agradable y relajante durante la sesión.',
  },
  {
    question: '¿Cuántas sesiones de INDIBA necesito para ver resultados?',
    answer:
      'El número de sesiones depende de cada caso. En tu primera consulta valoramos tu piel y objetivos para diseñarte un protocolo personalizado.',
    // TODO(cliente): sustituir por el protocolo real (nº de sesiones, frecuencia).
  },
  {
    question: '¿INDIBA facial y corporal se pueden combinar?',
    answer:
      'Sí, muchas clientas combinan ambos protocolos según sus objetivos, siempre con un plan personalizado.',
  },
  {
    question: '¿Qué diferencia hay entre INDIBA y otras radiofrecuencias?',
    answer:
      'INDIBA es una tecnología específica de 448 kHz con protocolos clínicamente validados, distinta de la radiofrecuencia genérica.',
  },
];

// TODO(cliente): revisar y completar con criterio profesional real (embarazo, marcapasos, etc.)

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tratamiento INDIBA para la Celulitis',
  serviceType: 'Radiofrecuencia estética facial y corporal, tratamiento de la celulitis',
  provider: { '@type': 'BeautySalon', name: site.name, url: site.url },
  areaServed: 'Madrid',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function IndibaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-12">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-ink max-w-2xl">
          INDIBA en Argüelles: Tratamiento Facial y Corporal para la Celulitis
        </h1>
        <p className="mt-6 text-stone max-w-prose text-base sm:text-lg">
          En {site.name} somos especialistas en tratamientos INDIBA en el
          barrio de Argüelles, Madrid. Esta tecnología de radiofrecuencia
          trabaja a nivel celular, activando la regeneración natural de la
          piel desde dentro para tratar la celulitis y mejorar la firmeza,
          con resultados visibles desde la primera sesión, tanto en rostro
          como en cuerpo.
        </p>
        <BookButton label="Reservar tu sesión de INDIBA" className="mt-8" />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 border-t border-ink/10">
        <h2 className="font-display text-xl sm:text-2xl text-ink mb-4">¿Qué es INDIBA?</h2>
        <p className="text-stone max-w-prose">
          INDIBA es una tecnología de radiofrecuencia de alta frecuencia (448
          kHz) desarrollada específicamente para uso profesional en estética
          y fisioterapia. A diferencia de la radiofrecuencia genérica,
          trabaja de forma controlada sobre los tejidos, estimulando el
          metabolismo celular, la producción de colágeno y elastina, y la
          microcirculación — sin agredir la piel y sin tiempo de
          recuperación.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 border-t border-ink/10 grid sm:grid-cols-2 gap-8 items-center">
        <div className="order-2 sm:order-1">
          <h2 className="font-display text-xl sm:text-2xl text-ink mb-4">Tratamiento INDIBA Facial</h2>
          <p className="text-stone max-w-prose">
            Estimula la producción de colágeno y elastina de forma natural,
            mejorando la firmeza y elasticidad de la piel, reduciendo arrugas y
            líneas de expresión, aumentando la hidratación y luminosidad, y
            redefiniendo el óvalo facial.
          </p>
        </div>
        <div className="relative aspect-[4/3] order-1 sm:order-2 border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public/images/indiba-facial.jpg (horizontal, ideal 1200x800) */}
          <Image
            src="/images/indiba-facial.jpg"
            alt="Tratamiento INDIBA facial"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 border-t border-ink/10 grid sm:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] border border-gold/40 p-1.5">
          {/* NOMBRE DE ARCHIVO: public/images/indiba-corporal.jpg (horizontal, ideal 1200x800) */}
          <Image
            src="/images/indiba-corporal.jpg"
            alt="Tratamiento INDIBA corporal"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-ink mb-4">Tratamiento INDIBA Corporal</h2>
          <p className="text-stone max-w-prose">
            Aplicamos radiofrecuencia a 448 kHz sobre zonas como abdomen,
            muslos y glúteos para reducir la apariencia de la celulitis,
            mejorar la firmeza y textura de la piel, favorecer el drenaje
            linfático y estimular la circulación. Es un procedimiento
            indoloro, no invasivo y sin tiempo de recuperación.
          </p>
          <p className="mt-4 text-stone max-w-prose">
            En Linaje potenciamos los resultados de INDIBA corporal
            combinándolo con drenaje linfático manual y maderoterapia.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 border-t border-ink/10">
        <h2 className="font-display text-xl sm:text-2xl text-ink mb-6">Preguntas frecuentes</h2>
        <Faq items={faqItems} />
      </section>

      <CtaBanner
        title="Reserva tu sesión de INDIBA en Argüelles"
        ctaLabel="Reservar tu sesión de INDIBA"
      />
    </>
  );
}
