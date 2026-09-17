import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Cejas y Pestañas en Argüelles | Laminado, Lifting, Tinte y Extensiones',
  description:
    'Laminado de cejas, lifting de pestañas, tinte y extensiones en Argüelles. Realza tu mirada de forma natural en Centro de Estética Linaje.',
  alternates: { canonical: '/tratamientos/cejas-pestanas' },
};

export default function CejasPestanasPage() {
  return (
    <TreatmentPage
      title="Cejas y Pestañas en Argüelles"
      image="/images/cejas-pestanas.jpg"
      intro="Realza la belleza de tu mirada de forma natural: laminado de cejas, lifting de pestañas, tinte y extensiones, con un resultado a medida para cada clienta."
      sections={[
        {
          heading: 'Laminado de cejas',
          body: 'Técnica que peina y fija el pelo de las cejas en la dirección deseada, aportando un efecto más poblado, ordenado y definido durante varias semanas. TODO(cliente): completar con duración media del resultado.',
        },
        {
          heading: 'Lifting de pestañas',
          body: 'Curva y levanta las pestañas naturales desde la raíz, dando sensación de mirada más abierta sin necesidad de extensiones ni rímel. TODO(cliente): completar con duración media del resultado.',
        },
        {
          heading: 'Tinte de cejas y pestañas',
          body: 'Oscurece el vello para definir la mirada, ideal para combinar con el laminado o el lifting, o como servicio independiente. TODO(cliente): completar con tipo de tinte que usáis.',
        },
        {
          heading: 'Extensión de pestañas',
          body: 'Aplicación de extensiones pelo a pelo o en mechones para conseguir un volumen y una longitud personalizados, adaptados a la forma de tu ojo. TODO(cliente): completar con técnicas disponibles (clásico, volumen ruso, híbrido...) y mantenimiento recomendado.',
        },
      ]}
    />
  );
}
