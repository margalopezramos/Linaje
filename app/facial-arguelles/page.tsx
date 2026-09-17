import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Tratamientos Faciales en Argüelles | Limpieza, Hidratación y Antiedad — Linaje',
  description:
    'Tratamientos faciales en Argüelles: limpieza profunda, hidratación, antiedad, peeling, piel grasa y LED. Protocolos personalizados en Centro de Estética Linaje.',
  alternates: { canonical: '/facial-arguelles' },
};

export default function FacialPage() {
  return (
    <TreatmentPage
      title="Tratamientos Faciales en Argüelles"
      image="/images/facial.jpg"
      intro="Cada piel es distinta, y cada tratamiento facial también lo es. Diseñamos el protocolo adecuado según tu tipo de piel y tu objetivo: limpieza, hidratación, firmeza, luminosidad o control de imperfecciones."
      sections={[
        {
          heading: 'Limpieza facial profunda',
          body: 'Eliminamos impurezas, exceso de grasa y células muertas para dejar la piel visiblemente más limpia y preparada para absorber mejor los tratamientos posteriores. TODO(cliente): completar con el protocolo real (pasos, duración).',
        },
        {
          heading: 'Hidratación (Hidrafacial)',
          body: 'Tratamiento de hidratación profunda que devuelve luminosidad y suavidad a la piel, ideal para pieles deshidratadas o apagadas. TODO(cliente): completar con la técnica/aparatología concreta que usáis y duración de la sesión.',
        },
        {
          heading: 'Antiedad y firmeza',
          body: 'Protocolo facial centrado en firmeza y prevención de los signos del envejecimiento, con cosmética profesional seleccionada para cada tipo de piel. TODO(cliente): completar con activos/técnica concreta (distinto de INDIBA, que tiene su propia página).',
        },
        {
          heading: 'Peeling y exfoliación',
          body: 'Renovación celular para mejorar textura, tono y luminosidad de la piel. TODO(cliente): completar con tipo de peeling que ofrecéis (enzimático, químico suave, etc.) y para qué pieles está indicado.',
        },
        {
          heading: 'Piel grasa y acné',
          body: 'Tratamiento específico para pieles con exceso de grasa, poros dilatados o tendencia acneica, enfocado en equilibrar y controlar imperfecciones. TODO(cliente): completar con el protocolo real.',
        },
        {
          heading: 'LED / fototerapia',
          body: 'Tratamiento con luz LED que complementa otros protocolos faciales, favoreciendo la regeneración de la piel. TODO(cliente): completar con qué colores de luz usáis y para qué se indica cada uno.',
        },
      ]}
      serviceQuery="Facial"
    />
  );
}
