import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Centro de Uñas en Argüelles | Manicura y Pedicura — Linaje',
  description:
    'Centro de uñas en Argüelles: manicura y pedicura de lujo, esmaltado semipermanente y nail art. Reserva tu cita en Linaje.',
  alternates: { canonical: '/unas' },
};

export default function UnasPage() {
  return (
    <TreatmentPage
      title="Centro de Uñas en Argüelles: Manicura y Pedicura"
      image="/images/unas.jpg"
      intro="Tu centro de uñas de confianza en Argüelles. Experimenta el lujo de lucir uñas impecables para cualquier ocasión, con acabados duraderos y un cuidado profesional de manos y pies."
      sections={[
        {
          heading: 'Manicura',
          body: 'Manicura completa con limado, cutículas y esmaltado a tu elección — tradicional o semipermanente, con mayor duración y brillo. TODO(cliente): completar con las técnicas y marcas de esmalte que usáis.',
        },
        {
          heading: 'Pedicura',
          body: 'Pedicura spa con exfoliación, hidratación profunda y esmaltado, pensada para dejar tus pies cuidados durante semanas. TODO(cliente): añadir si ofrecéis pedicura médica/podológica o solo estética.',
        },
        {
          heading: 'Nail art y diseño',
          body: 'Diseños personalizados, desde acabados minimalistas hasta nail art más elaborado. TODO(cliente): completar con ejemplos o si trabajáis con catálogo de diseños.',
        },
        {
          heading: '¿Cada cuánto se recomienda repetir?',
          body: 'El esmaltado semipermanente suele durar entre 3 y 4 semanas antes de necesitar retoque; la manicura tradicional, entre 1 y 2 semanas. TODO(cliente): confirmar la recomendación real que dais en cabina.',
        },
      ]}
      serviceQuery="Uñas"
    />
  );
}
