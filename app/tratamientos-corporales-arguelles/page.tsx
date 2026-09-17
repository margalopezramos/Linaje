import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Tratamientos Corporales en Argüelles | Cavitación, Presoterapia, Radiofrecuencia',
  description:
    'Amplia gama de tratamientos corporales en Argüelles: cavitación, radiofrecuencia, drenaje linfático, presoterapia y maderoterapia en Centro de Estética Linaje.',
  alternates: { canonical: '/tratamientos-corporales-arguelles' },
};

export default function CorporalPage() {
  return (
    <TreatmentPage
      title="Tratamientos Corporales en Argüelles"
      image="/images/corporal.jpg"
      intro="Amplia gama de tratamientos corporales en nuestra clínica de Argüelles: cavitación, drenaje linfático, presoterapia y maderoterapia, combinables entre sí según tu objetivo."
      sections={[
        {
          heading: 'Cavitación corporal',
          body: 'Tratamiento no invasivo que utiliza ultrasonidos de baja frecuencia para ayudar a reducir la grasa localizada, favoreciendo su eliminación natural a través del sistema linfático. Ideal para combinar con presoterapia o drenaje linfático para potenciar el resultado. TODO(cliente): completar con nº de sesiones recomendado y zonas que tratáis.',
        },
        {
          heading: 'Radiofrecuencia corporal (INDIBA)',
          body: 'Para firmeza, celulitis y remodelación de la silueta trabajamos con radiofrecuencia INDIBA, nuestra tecnología corporal más avanzada.',
        },
        {
          heading: 'Drenaje linfático manual',
          body: 'Técnica de masaje terapéutico suave y rítmico que estimula el sistema linfático, ayudando al cuerpo a eliminar la retención de líquidos, toxinas y desechos metabólicos de forma natural.',
        },
        {
          heading: 'Presoterapia',
          body: 'Utiliza tecnología de compresión controlada mediante un traje con cámaras inflables que aplican presión secuencial, estimulando el flujo linfático y sanguíneo. Ayuda a reducir la hinchazón, la celulitis y la sensación de piernas pesadas.',
        },
        {
          heading: 'Maderoterapia',
          body: 'Técnica manual con instrumentos de madera diseñados para remodelar el cuerpo, estimular la circulación y mejorar la calidad de la piel de forma no invasiva, trabajando en profundidad sobre la grasa localizada.',
        },
        {
          heading: 'Masaje relax',
          body: 'Nuestro masaje relajante está diseñado para ofrecerte una experiencia de bienestar completa, reduciendo el estrés y fomentando una profunda sensación de relajación. Sesiones de 30 o 60 minutos.',
        },
      ]}
      serviceQuery="Corporal"
    />
  );
}
