import type { Metadata } from 'next';
import BookButton from '@/components/BookButton';
import MapEmbed from '@/components/MapEmbed';
import { site, openingHours } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contacta con ${site.name} en ${site.address.neighborhood}, Madrid. Teléfono, email, horario y ubicación.`,
  alternates: { canonical: '/contact-arguelles' },
};

export default function ContactoPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-6">Contacto</h1>
      <p className="text-stone max-w-prose mb-8">
        Estamos aquí para ayudarte a resplandecer. Contáctanos para recibir
        asesoramiento personalizado y resolver todas tus dudas.
      </p>

      <div className="grid sm:grid-cols-2 gap-10 mb-10">
        <dl className="space-y-4 text-ink">
          <div>
            <dt className="text-stone text-sm">Dirección</dt>
            <dd>
              {site.address.street}, {site.address.postalCode} {site.address.city} ({site.address.metro})
            </dd>
            <dd className="mt-1">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold-dark hover:underline"
              >
                Cómo llegar →
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-stone text-sm">Teléfono</dt>
            <dd>
              <a href={`tel:${site.phonePrimary}`} className="hover:text-gold-dark">{site.phonePrimaryDisplay}</a>
              {' · '}
              <a href={`tel:${site.phoneSecondary}`} className="hover:text-gold-dark">{site.phoneSecondaryDisplay}</a>
            </dd>
          </div>
          <div>
            <dt className="text-stone text-sm">Email</dt>
            <dd><a href={`mailto:${site.email}`} className="hover:text-gold-dark">{site.email}</a></dd>
          </div>
        </dl>

        {/* TODO(cliente): confirmar horario real — este es provisional (ver lib/site-data.ts) */}
        <div>
          <p className="text-stone text-sm mb-3">Horario</p>
          <table className="w-full text-sm text-ink">
            <tbody>
              {openingHours.map((row) => (
                <tr key={row.day} className="border-b border-ink/10 last:border-0">
                  <td className="py-2 pr-4 text-stone">{row.day}</td>
                  <td className="py-2 text-right">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookButton label="Reservar cita" className="mb-12" />

      <div className="aspect-[16/9] border border-gold/40 p-1.5">
        <MapEmbed src={site.mapsEmbedSrc} title={`Ubicación de ${site.name} en ${site.address.neighborhood}, Madrid`} />
      </div>
    </section>
  );
}
