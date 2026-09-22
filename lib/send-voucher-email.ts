import { Resend } from 'resend';
import { site, getBaseUrl } from '@/lib/site-data';
import { emailWrapper } from '@/lib/email-template';

type VoucherAdjunto = { code: string; pdfBytes: Uint8Array; entrega: 'email' | 'recogida' };

export async function sendVoucherEmail({
  to,
  recipientName,
  vouchers,
}: {
  to: string;
  recipientName?: string;
  vouchers: VoucherAdjunto[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('RESEND_API_KEY no configurada — no se envía el email del bono.');
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  const hayRecogida = vouchers.some((v) => v.entrega === 'recogida');
  const codigos = vouchers.map((v) => v.code).join(', ');

  const html = emailWrapper({
    preheader: `Tu compra en ${site.name} ya está lista — código${vouchers.length > 1 ? 's' : ''}: ${codigos}.`,
    heading: vouchers.length > 1 ? '¡Tu compra ya es tuya!' : '¡Tu bono ya es tuyo!',
    bodyHtml: `
      <p style="margin:0 0 16px;">¡Hola${recipientName ? ` ${recipientName}` : ''}!</p>
      <p style="margin:0 0 16px;">
        Gracias por tu compra en ${site.name}, y gracias por confiar en nosotr@s.
        Te adjuntamos tu${vouchers.length > 1 ? 's bonos/tarjetas' : ' bono'} en PDF,
        con ${vouchers.length > 1 ? 'los códigos' : 'el código'}: <strong>${codigos}</strong>.
      </p>
      ${
        hayRecogida
          ? `<p style="margin:0 0 16px;">Elegiste recogerlo gratis en el centro — no hace falta que lo imprimas, con enseñarnos el código en cabina es suficiente.</p>`
          : ''
      }
      <p style="margin:0;">
        Para reservar tu cita, escríbenos por WhatsApp o llama al ${site.phonePrimaryDisplay}.
      </p>
    `,
    ctaLabel: 'Reservar mi cita',
    ctaUrl: `${getBaseUrl()}/reservar`,
  });

  await resend.emails.send({
    from: `${site.name} <${fromEmail}>`,
    to,
    subject: vouchers.length > 1 ? `Tu compra en ${site.name} — códigos ${codigos}` : `Tu bono de ${site.name} — código ${codigos}`,
    html,
    attachments: vouchers.map((v) => ({
      filename: `bono-${v.code}.pdf`,
      content: Buffer.from(v.pdfBytes),
    })),
  });

  // Copia interna para que sepáis que hay que agendar la sesión / preparar la recogida.
  if (process.env.BUSINESS_NOTIFICATION_EMAIL) {
    const htmlInterno = emailWrapper({
      preheader: `Nueva venta — ${codigos}`,
      heading: 'Nueva venta de bono/tarjeta',
      bodyHtml: `<p style="margin:0;">Se ha vendido: código${vouchers.length > 1 ? 's' : ''} <strong>${codigos}</strong>, a ${to}${recipientName ? ` para ${recipientName}` : ''}.${
        hayRecogida ? ' Al menos uno es para <strong>recogida en el centro</strong>.' : ''
      }</p>`,
    });
    await resend.emails.send({
      from: `${site.name} <${fromEmail}>`,
      to: process.env.BUSINESS_NOTIFICATION_EMAIL,
      subject: `Nueva venta — ${codigos}`,
      html: htmlInterno,
      attachments: vouchers.map((v) => ({ filename: `bono-${v.code}.pdf`, content: Buffer.from(v.pdfBytes) })),
    });
  }

  return { sent: true };
}
