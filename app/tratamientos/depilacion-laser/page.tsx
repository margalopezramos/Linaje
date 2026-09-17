import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';
import Faq from '@/components/Faq';
import CtaBanner from '@/components/CtaBanner';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Depilación Láser en Argüelles | Tecnología SHR',
  description:
    'Depilación láser SHR en Argüelles: efectiva, indolora y adecuada para todo tipo de piel y vello. Facial y corporal, resultados progresivos desde la primera sesión.',
  alternates: { canonical: '/tratamientos/depilacion-laser' },
};

const faqItems = [
  {
    question: '¿Cuántas sesiones de depilación láser necesito?',
    answer:
      'Depende de la zona y del tipo de vello, ya que el láser actúa por fases de crecimiento. En tu primera visita valoramos tu caso y te damos un número orientativo de sesiones.',
    // TODO(cliente): sustituir por el número real de sesiones que recomendáis.
  },
  {
    question: '¿La depilación láser SHR duele?',
    answer:
      'Es mucho más cómoda que el láser tradicional: la tecnología SHR calienta el folículo de forma gradual y constante, en vez de con pulsos de alta intensidad, por lo que la mayoría de clientas la describen como indolora o muy tolerable.',
  },
  {
    question: '¿Sirve para todo tipo de piel y vello?',
    answer:
      'La tecnología SHR está diseñada para tratar una amplia variedad de tonos de piel y tipos de vello, a diferencia de otros láseres más limitados.',
  },
  {
    question: '¿Qué zonas se pueden tratar?',
    answer:
      'Tanto zonas faciales (labio, mentón, entrecejo) como corporales (axilas, piernas, ingles, espalda). En tu cita valoramos qué zonas te interesan y diseñamos un plan a medida.',
  },
];

// TODO(cliente): revisar contraindicaciones reales (embarazo, fototipo, medicación fotosensibilizante, etc.)

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Depilación Láser SHR',
  serviceType: 'Depilación láser facial y corporal',
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

export default function DepilacionLaserPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TreatmentPage
        title="Depilación Láser en Argüelles"
        image="/images/depilacion-laser.jpg"
        intro="Despídete del vello no deseado de forma efectiva e indolora con depilación láser SHR, facial y corporal."
        sections={[
          {
            heading: '¿Qué es la tecnología SHR?',
            body: 'La depilación SHR (Super Hair Removal) combina las ventajas de la tecnología IPL (luz pulsada intensa) y el láser tradicional para eliminar el vello no deseado de manera efectiva y menos dolorosa que los sistemas tradicionales.',
          },
          {
            heading: 'Cómo funciona',
            body: 'Nuestro equipo emite pulsos de luz con múltiples longitudes de onda, tratando una amplia variedad de tipos de vello y colores de piel. A diferencia de los láseres tradicionales, calienta gradualmente el folículo piloso en movimiento constante, sin sobrecalentar la piel — un procedimiento más cómodo y menos doloroso que destruye el folículo de forma progresiva.',
          },
          {
            heading: 'Zonas que tratamos',
            body: 'Facial: labio superior, mentón, entrecejo.\nCorporal: axilas, piernas (completas o medias), ingles, espalda, brazos.\nDiseñamos el plan según la zona y tus objetivos, con la posibilidad de combinar varias zonas en una misma sesión.',
          },
          {
            heading: 'Antes y después de la sesión',
            body: 'Recomendamos evitar la exposición solar directa en la zona a tratar los días previos y posteriores a la sesión, y no depilarte con cera o pinzas entre sesiones (sí puedes rasurarte). Te damos indicaciones concretas de cuidado en tu primera visita.',
          },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 border-t border-ink/10">
        <h2 className="font-display text-xl sm:text-2xl text-ink mb-6">Preguntas frecuentes</h2>
        <Faq items={faqItems} />
      </section>

      <CtaBanner
        title="Reserva tu sesión de depilación láser"
        body="Resultados progresivos desde la primera sesión, con un protocolo adaptado a tu piel y tu vello."
      />
    </>
  );
}
