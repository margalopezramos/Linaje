import type { Metadata } from 'next';
import TreatmentPage from '@/components/TreatmentPage';

export const metadata: Metadata = {
  title: 'Microblading en Argüelles | Cejas Perfectas — Linaje',
  description:
    'Microblading de cejas en Argüelles: resultados naturales y duraderos, técnica pelo a pelo en Centro de Estética Linaje.',
  alternates: { canonical: '/tratamientos/microblading' },
};

export default function MicrobladingPage() {
  return (
    <TreatmentPage
      title="Microblading en Argüelles"
      image="/images/microblading.jpg"
      intro="Despiértate con cejas perfectas todos los días gracias a la técnica de microblading, pelo a pelo."
      sections={[
        {
          heading: '¿Qué es el microblading?',
          body: 'Técnica de micropigmentación semipermanente que dibuja pelo a pelo la forma de la ceja, consiguiendo un resultado natural que rellena huecos y define la forma según tu rostro.',
        },
        {
          heading: 'Duración y mantenimiento',
          body: 'El resultado suele durar entre 12 y 18 meses según el tipo de piel, con una sesión de retoque recomendada. TODO(cliente): confirmar duración real y protocolo de retoque que ofrecéis.',
        },
        {
          heading: 'Cuidados posteriores',
          body: 'Es importante evitar el sol directo, el agua y las cremas sobre la zona los primeros días para que el pigmento asiente correctamente. Te damos indicaciones completas por escrito tras la sesión.',
        },
      ]}
    />
  );
}
