import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateVoucherPdf, generateVoucherCode } from '@/lib/generate-voucher-pdf';
import { sendVoucherEmail } from '@/lib/send-voucher-email';

// Stripe necesita el cuerpo de la petición SIN procesar para poder
// verificar la firma — desactivamos el bodyParser de Next para esta ruta.
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.warn('Webhook de Stripe recibido pero faltan STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET.');
    return NextResponse.json({ received: true, skipped: true });
  }

  const stripe = new Stripe(secretKey);
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? '', webhookSecret);
  } catch (err) {
    console.error('Firma de webhook inválida:', err);
    return NextResponse.json({ error: 'invalid-signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // Solo generamos bono/PDF para los artículos "digitales" (bonos,
      // tarjeta regalo). Los productos físicos (velas) no llevan bono.
      const digitalItems = lineItems.data.filter((item) => {
        const product = item.price?.product as Stripe.Product | undefined;
        return product?.metadata?.delivery === 'digital';
      });

      if (digitalItems.length > 0) {
        const buyerEmail = session.customer_details?.email;
        const recipientNameField = session.custom_fields?.find((f) => f.key === 'recipient_name');
        const recipientName = recipientNameField?.text?.value || undefined;

        if (buyerEmail) {
          const code = generateVoucherCode();
          const totalAmount = (session.amount_total ?? 0) / 100;

          const pdfBytes = await generateVoucherPdf({
            code,
            recipientName,
            buyerEmail,
            items: digitalItems.map((item) => ({
              name: item.description ?? 'Bono',
              quantity: item.quantity ?? 1,
            })),
            totalAmount,
          });

          await sendVoucherEmail({ to: buyerEmail, recipientName, code, pdfBytes });
        }
      }
    } catch (err) {
      // No relanzamos el error: si algo falla generando el PDF/email,
      // el pago ya está cobrado igualmente y no queremos que Stripe
      // reintente el webhook indefinidamente por un fallo de envío.
      console.error('Error generando/enviando el bono tras el pago:', err);
    }
  }

  return NextResponse.json({ received: true });
}
