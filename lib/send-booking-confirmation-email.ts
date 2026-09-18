import { Resend } from 'resend';
import { site } from '@/lib/site-data';
import { emailWrapper, infoRow, infoTable } from '@/lib/email-template';

export async function sendBookingConfirmationEmail({
  to,
  nombre,
  servicio,
  fecha,
  hora,
  especialista,
  precio,
}: {
  to?: string;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  especialista: string;
  precio: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('RESEND_API_KEY no configurada — no se envía el email de confirmación de reserva.');
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  const fechaBonita = new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const bodyHtml = `
    <p style="margin:0 0 16px;">¡Hola ${nombre}!</p>
    <p style="margin:0 0 16px;">
      Hemos recibido tu reserva en ${site.name}. Queda
      <strong>pendiente de confirmación</strong> por nuestro equipo —
      te avisaremos si hubiera cualquier cambio.
    </p>
    ${infoTable(
      infoRow('Servicio', servicio) +
        infoRow('Fecha', fechaBonita.charAt(0).toUpperCase() + fechaBonita.slice(1)) +
        infoRow('Hora', hora) +
        infoRow('Especialista', especialista) +
        infoRow('Precio', `${precio.toFixed(2)} €`)
    )}
    <p style="margin:16px 0 0;">
      Si necesitas cambiar o cancelar tu cita, escríbenos por WhatsApp o
      llama al ${site.phonePrimaryDisplay}.
    </p>
  `;

  const html = emailWrapper({
    preheader: `Tu reserva de ${servicio} el ${fecha} a las ${hora} está pendiente de confirmación.`,
    heading: 'Reserva recibida',
    bodyHtml,
    ctaLabel: 'Ver la web',
    ctaUrl: site.url,
  });

  // Si el cliente no dio email, mandamos el aviso solo a la administradora
  // (para que no se pierda la notificación) en vez de fallar.
  const destinatario = to || process.env.BUSINESS_NOTIFICATION_EMAIL;
  if (!destinatario) return { sent: false };

  await resend.emails.send({
    from: `${site.name} <${fromEmail}>`,
    to: destinatario,
    subject: `Reserva recibida — ${servicio}, ${fecha} ${hora}`,
    html,
  });

  // Copia interna, si el cliente sí dio su email (para no duplicar si ya
  // era el mismo destinatario de arriba).
  if (to && process.env.BUSINESS_NOTIFICATION_EMAIL && process.env.BUSINESS_NOTIFICATION_EMAIL !== to) {
    await resend.emails.send({
      from: `${site.name} <${fromEmail}>`,
      to: process.env.BUSINESS_NOTIFICATION_EMAIL,
      subject: `Nueva reserva web — ${nombre}`,
      html,
    });
  }

  return { sent: true };
}
