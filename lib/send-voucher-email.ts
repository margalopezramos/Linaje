import { Resend } from 'resend';
import { site } from '@/lib/site-data';

export async function sendVoucherEmail({
  to,
  recipientName,
  code,
  pdfBytes,
}: {
  to: string;
  recipientName?: string;
  code: string;
  pdfBytes: Uint8Array;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('RESEND_API_KEY no configurada — no se envía el email del bono.');
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: `${site.name} <${fromEmail}>`,
    to,
    subject: `Tu bono de ${site.name} — código ${code}`,
    html: `
      <p>¡Hola${recipientName ? ` ${recipientName}` : ''}!</p>
      <p>Gracias por tu compra en ${site.name}. Adjuntamos tu bono en PDF.</p>
      <p>Para reservar tu cita, escríbenos por WhatsApp o llama al ${site.phonePrimaryDisplay}.</p>
      <p>Un saludo,<br/>${site.name}</p>
    `,
    attachments: [
      {
        filename: `bono-${code}.pdf`,
        content: Buffer.from(pdfBytes),
      },
    ],
  });

  // Copia interna para que sepáis que hay que agendar la sesión.
  if (process.env.BUSINESS_NOTIFICATION_EMAIL) {
    await resend.emails.send({
      from: `${site.name} <${fromEmail}>`,
      to: process.env.BUSINESS_NOTIFICATION_EMAIL,
      subject: `Nuevo bono vendido — ${code}`,
      html: `<p>Se ha vendido un bono (código ${code}) a ${to}${recipientName ? ` para ${recipientName}` : ''}.</p>`,
      attachments: [{ filename: `bono-${code}.pdf`, content: Buffer.from(pdfBytes) }],
    });
  }

  return { sent: true };
}
