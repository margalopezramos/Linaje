import { Resend } from 'resend';
import { site } from '@/lib/site-data';
import { emailWrapper } from '@/lib/email-template';

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

  const html = emailWrapper({
    preheader: `Tu bono ${code} ya está listo — lo llevas adjunto en PDF.`,
    heading: '¡Tu bono ya es tuyo!',
    bodyHtml: `
      <p style="margin:0 0 16px;">¡Hola${recipientName ? ` ${recipientName}` : ''}!</p>
      <p style="margin:0 0 16px;">
        Gracias por tu compra en ${site.name}. Te adjuntamos tu bono en PDF,
        con tu código de referencia: <strong>${code}</strong>.
      </p>
      <p style="margin:0;">
        Para reservar tu cita, escríbenos por WhatsApp o llama al ${site.phonePrimaryDisplay}.
      </p>
    `,
    ctaLabel: 'Reservar mi cita',
    ctaUrl: `${site.url}/reservar`,
  });

  await resend.emails.send({
    from: `${site.name} <${fromEmail}>`,
    to,
    subject: `Tu bono de ${site.name} — código ${code}`,
    html,
    attachments: [
      {
        filename: `bono-${code}.pdf`,
        content: Buffer.from(pdfBytes),
      },
    ],
  });

  // Copia interna para que sepáis que hay que agendar la sesión.
  if (process.env.BUSINESS_NOTIFICATION_EMAIL) {
    const htmlInterno = emailWrapper({
      preheader: `Nuevo bono vendido — ${code}`,
      heading: 'Nuevo bono vendido',
      bodyHtml: `<p style="margin:0;">Se ha vendido un bono (código <strong>${code}</strong>) a ${to}${recipientName ? ` para ${recipientName}` : ''}.</p>`,
    });
    await resend.emails.send({
      from: `${site.name} <${fromEmail}>`,
      to: process.env.BUSINESS_NOTIFICATION_EMAIL,
      subject: `Nuevo bono vendido — ${code}`,
      html: htmlInterno,
      attachments: [{ filename: `bono-${code}.pdf`, content: Buffer.from(pdfBytes) }],
    });
  }

  return { sent: true };
}
