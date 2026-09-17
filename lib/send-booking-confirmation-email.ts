import { Resend } from 'resend';
import { site } from '@/lib/site-data';

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

  const html = `
    <p>¡Hola ${nombre}!</p>
    <p>Hemos recibido tu reserva en ${site.name}. Queda <strong>pendiente de confirmación</strong> por nuestro equipo — te avisaremos si hubiera cualquier cambio.</p>
    <table style="border-collapse:collapse;margin:16px 0;">
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Servicio</td><td style="padding:4px 0;"><strong>${servicio}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Fecha</td><td style="padding:4px 0;text-transform:capitalize;">${fechaBonita}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Hora</td><td style="padding:4px 0;">${hora}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Especialista</td><td style="padding:4px 0;">${especialista}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Precio</td><td style="padding:4px 0;">${precio.toFixed(2)} €</td></tr>
    </table>
    <p>Si necesitas cambiar o cancelar tu cita, escríbenos por WhatsApp o llama al ${site.phonePrimaryDisplay}.</p>
    <p>¡Te esperamos!<br/>${site.name}</p>
  `;

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
