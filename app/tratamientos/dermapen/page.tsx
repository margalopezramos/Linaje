import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Dermapen en Argüelles | Microagujas para Regenerar la Piel — Linaje',
  description:
    'Tratamiento Dermapen en Argüelles: microagujas para estimular el colágeno, mejorar textura, cicatrices y luminosidad de la piel.',
  alternates: { canonical: '/tratamientos/dermapen' },
};

export default function DermapenPage() {
  return (
    <TreatmentPage
      title="Dermapen en Argüelles"
      image="/images/dermapen.jpg"
      intro="Tratamiento de microagujas para estimular la regeneración natural de la piel, mejorando su textura, firmeza y luminosidad."
      sections={[
        {
          heading: '¿Qué es el Dermapen?',
          body: 'El Dermapen utiliza microagujas muy finas para generar microcanales controlados en la piel, estimulando la producción natural de colágeno y elastina como respuesta regenerativa.',
        },
        {
          heading: '¿Para qué se usa?',
          body: 'Mejora la textura de la piel, marcas de acné, cicatrices superficiales, poros dilatados y falta de luminosidad. TODO(cliente): completar con el protocolo real (nº de sesiones, frecuencia recomendada).',
        },
        {
          heading: 'Dermapen vs INDIBA',
          body: 'Mientras que INDIBA trabaja con radiofrecuencia para estimular la piel en profundidad de forma no invasiva, el Dermapen actúa mediante microperforación controlada. Ambos se pueden combinar en protocolos personalizados para potenciar resultados.',
        },
      ]}
    />
  );
}
