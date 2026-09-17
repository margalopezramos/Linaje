import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Depilación con Cera y con Hilo en Argüelles — Linaje',
  description:
    'Depilación con cera y con hilo en Argüelles, facial y corporal: cejas, piernas, axilas, ingles y espalda. Resultados duraderos en Centro de Estética Linaje.',
  alternates: { canonical: '/depilacion-facial-corporal' },
};

export default function DepilacionPage() {
  return (
    <TreatmentPage
      title="Depilación Facial y Corporal en Argüelles"
      image="/images/depilacion.jpg"
      intro="Luce una piel libre de vello de manera natural y duradera con nuestros tratamientos de depilación con hilo y con cera, facial y corporal."
      sections={[
        {
          heading: 'Depilación facial (con hilo)',
          body: 'Técnica tradicional, precisa y respetuosa con la piel, ideal para cejas, labio superior o mentón. No irrita la piel y permite mucha precisión en el diseño. TODO(cliente): completar con zonas faciales concretas que trabajáis con hilo.',
        },
        {
          heading: 'Depilación corporal (con cera)',
          body: 'Elimina el vello de raíz con resultados duraderos en cualquier zona del cuerpo: piernas (completas o medias), axilas, ingles, espalda y brazos. Es nuestra técnica más solicitada para grandes superficies, por rapidez y duración del resultado. TODO(cliente): completar con tipo de cera que usáis (caliente, tibia, etc.), duración media del resultado y zonas exactas disponibles.',
        },
        {
          heading: 'Depilación con cera también en rostro',
          body: 'La cera también se puede usar en zonas faciales como el labio superior, cuando se busca un resultado más duradero que con el hilo. Te recomendamos la técnica más adecuada según la zona en tu cita.',
        },
        {
          heading: '¿Hilo o cera? ¿Cuál elegir?',
          body: 'El hilo es más preciso para zonas pequeñas del rostro; la cera es más rápida y eficaz para zonas grandes del cuerpo. En tu cita te recomendamos la técnica más adecuada según la zona y tu tipo de piel.',
        },
      ]}
      serviceQuery="Depilación"
    />
  );
}
