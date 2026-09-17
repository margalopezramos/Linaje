import type { Metadata } from 'next';
import ManageCookiesButton from '@/components/ManageCookiesButton';
import { site } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Cookies',
  robots: { index: true, follow: true },
  alternates: { canonical: '/politica-de-privacidad-y-cookies' },
};

// TODO(cliente): esta política describe honestamente lo que la web hace HOY
// (verificado en el código). Aun así, antes de publicar, que la revise
// alguien con conocimientos legales/RGPD — esto no sustituye asesoría legal.
// Si en el futuro añades Google Analytics u otras herramientas, hay que
// actualizar la sección de cookies de analítica.
export default function PoliticaPrivacidadPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h1 className="font-display text-3xl text-ink mb-8">Política de Privacidad y Cookies</h1>

      <div className="prose-sm text-stone space-y-8">
        <div>
          <h2 className="font-display text-xl text-ink mb-3">Responsable del tratamiento</h2>
          <p>
            {site.name}, con domicilio en {site.address.street}, {site.address.postalCode}{' '}
            {site.address.city}. Email de contacto: {site.email}. Teléfono: {site.phonePrimaryDisplay}.
          </p>
          {/* TODO(cliente): añadir NIF/CIF si aplica */}
        </div>

        <div>
          <h2 className="font-display text-xl text-ink mb-3">¿Qué datos recogemos y para qué?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Formulario de reserva:</strong> nombre, teléfono, email (opcional) y notas —
              para gestionar tu cita y contactarte si hace falta.
            </li>
            <li>
              <strong>Compras en la tienda:</strong> el pago se procesa directamente por Stripe, no
              almacenamos tus datos de tarjeta en ningún momento. Tu email se usa para enviarte la
              confirmación y, si compras un bono, el bono en PDF.
            </li>
            <li>
              <strong>WhatsApp:</strong> si nos escribes por WhatsApp, esa conversación la gestiona
              WhatsApp/Meta según su propia política de privacidad.
            </li>
          </ul>
          {/* TODO(cliente): confirmar plazo de conservación de los datos de citas/clientes */}
        </div>

        <div>
          <h2 className="font-display text-xl text-ink mb-3">Cookies que usamos</h2>
          <p className="mb-3">Puedes cambiar tu elección en cualquier momento:</p>
          <div className="mb-4">
            <ManageCookiesButton />
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink/10 text-left">
                <th className="py-2 pr-4">Tipo</th>
                <th className="py-2 pr-4">Para qué</th>
                <th className="py-2">¿Necesita tu permiso?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink/10">
                <td className="py-2 pr-4">Necesarias</td>
                <td className="py-2 pr-4">
                  Recordar tu carrito de compra y tu elección de cookies. No se pueden desactivar.
                </td>
                <td className="py-2">No</td>
              </tr>
              <tr className="border-b border-ink/10">
                <td className="py-2 pr-4">Mapas (Google Maps)</td>
                <td className="py-2 pr-4">Mostrar el mapa de nuestra ubicación.</td>
                <td className="py-2">Sí</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Analítica</td>
                <td className="py-2 pr-4">
                  {/* TODO(cliente): si añades Google Analytics u otra herramienta, describe aquí cuál */}
                  Actualmente no usamos ninguna herramienta de analítica en la web.
                </td>
                <td className="py-2">Sí (cuando aplique)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-display text-xl text-ink mb-3">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
            portabilidad y limitación escribiéndonos a {site.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
