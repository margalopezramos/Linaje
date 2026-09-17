import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Depilación con Cera y con Hilo en Argüelles — Linaje',
  description:
    'Depilación con cera y con hilo en Argüelles, facial y corporal. Resultados duraderos en Centro de Estética Linaje.',
  alternates: { canonical: '/tratamientos/depilacion' },
};

export default function DepilacionPage() {
  return (
    <TreatmentPage
      title="Depilación Facial y Corporal en Argüelles"
      image="/images/depilacion.jpg"
      intro="Luce una piel libre de vello de manera natural y duradera con nuestros tratamientos de depilación con hilo y con cera, facial y corporal."
      sections={[
        {
          heading: 'Depilación con hilo',
          body: 'Técnica tradicional, precisa y respetuosa con la piel, ideal para zonas del rostro como cejas, labio superior o mentón. No irrita la piel y permite mucha precisión en el diseño. TODO(cliente): completar con zonas que trabajáis con hilo.',
        },
        {
          heading: 'Depilación con cera',
          body: 'Elimina el vello de raíz con resultados duraderos, adecuada tanto para rostro como para cuerpo (piernas, axilas, ingles, espalda). TODO(cliente): completar con tipo de cera que usáis (caliente, tibia, etc.) y zonas disponibles.',
        },
        {
          heading: '¿Hilo o cera? ¿Cuál elegir?',
          body: 'El hilo es más preciso para zonas pequeñas del rostro; la cera es más rápida para zonas grandes del cuerpo. En tu cita te recomendamos la técnica más adecuada según la zona y tu tipo de piel.',
        },
      ]}
    />
  );
}
