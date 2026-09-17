import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Limpieza Facial en Argüelles | Tratamientos Faciales — Linaje',
  description:
    'Limpieza facial y tratamientos faciales en Argüelles: hidratación, luminosidad y cuidado antiedad con protocolos personalizados en Centro de Estética Linaje.',
  alternates: { canonical: '/tratamientos/facial' },
};

export default function FacialPage() {
  return (
    <TreatmentPage
      title="Tratamientos Faciales en Argüelles"
      image="/images/facial.jpg"
      intro="Piel sana, cutis perfecto: limpieza facial, hidratación, antiedad y luminosidad con protocolos personalizados para cada tipo de piel."
      sections={[
        {
          heading: 'Limpieza facial profunda',
          body: 'Eliminamos impurezas, exceso de grasa y células muertas para dejar la piel visiblemente más limpia, luminosa y preparada para absorber mejor los tratamientos posteriores. TODO(cliente): completar con el protocolo real (pasos, duración).',
        },
        {
          heading: 'Diagnóstico personalizado',
          body: 'Cada tratamiento facial se diseña según el tipo de piel y los objetivos de cada clienta — hidratación, luminosidad, antiedad o control de imperfecciones.',
        },
        {
          heading: 'Cosmética de alta gama',
          body: 'Trabajamos con cosmética profesional seleccionada para maximizar resultados, combinable con tecnología avanzada como INDIBA facial para potenciar la regeneración de la piel.',
        },
      ]}
    />
  );
}
