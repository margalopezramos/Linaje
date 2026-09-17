import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  robots: { index: true, follow: true },
  alternates: { canonical: '/politica-de-privacidad' },
};

// TODO(cliente): trasladar aquí el texto legal completo desde WordPress
// (/politica-de-privacidad-y-cookies/), revisado por quien gestione el
// cumplimiento legal/RGPD del negocio.
export default function PoliticaPrivacidadPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-display text-3xl text-ink mb-6">Política de Privacidad</h1>
      <p className="text-stone max-w-prose">
        Contenido pendiente de trasladar desde la página legal actual del
        sitio en WordPress. No publicar sin revisión.
      </p>
    </section>
  );
}
