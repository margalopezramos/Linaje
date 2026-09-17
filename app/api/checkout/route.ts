import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products, SHIPPING_COST } from '@/lib/products';
import { site } from '@/lib/site-data';

type IncomingLine = { productId: string; quantity: number; sesiones?: number; customAmount?: number };

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  // Sin clave secreta configurada todavía: devolvemos 503 a propósito.
  // El carrito, en el navegador, interpreta esto como "Stripe no disponible
  // todavía" y ofrece el pedido por WhatsApp en su lugar — así la tienda
  // funciona desde el primer día, con o sin Stripe conectado.
  if (!secretKey) {
    return NextResponse.json({ error: 'stripe-not-configured' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);

  const body = await req.json();
  const lines: IncomingLine[] = body?.lines ?? [];
  const deliveryMethod: 'pickup' | 'shipping' | 'digital' = body?.deliveryMethod ?? 'digital';
  const shippingCost: number = typeof body?.shippingCost === 'number' ? body.shippingCost : 0;

  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: 'empty-cart' }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;

    let unitAmount = 0; // en céntimos — precio del BONO COMPLETO (ya con IVA incluido, como se muestra en la web)
    let nombreLinea = product.name;

    if (product.pricingMode === 'fixed') {
      unitAmount = Math.round((product.priceValue ?? 0) * 100);
    } else if (product.pricingMode === 'package') {
      const paquete = product.paquetes?.find((p) => p.sesiones === line.sesiones);
      if (!paquete) continue;
      unitAmount = Math.round(paquete.sesiones * paquete.precioPorSesion * 100);
      nombreLinea = `${product.name} — Bono ${paquete.sesiones} sesiones`;
    } else if (product.pricingMode === 'custom') {
      unitAmount = Math.round((line.customAmount ?? 0) * 100);
    }

    if (unitAmount <= 0) continue;

    line_items.push({
      quantity: line.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: unitAmount,
        product_data: {
          name: nombreLinea,
          metadata: { productId: product.id, delivery: product.delivery },
        },
      },
    });
  }

  if (shippingCost > 0) {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(SHIPPING_COST * 100),
        product_data: { name: 'Envío a domicilio' },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: 'nothing-to-charge' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: deliveryMethod === 'shipping' ? { allowed_countries: ['ES'] } : undefined,
      custom_fields: [
        {
          key: 'recipient_name',
          label: { type: 'custom', custom: 'Nombre para el bono/tarjeta (si es un regalo)' },
          type: 'text',
          optional: true,
        },
      ],
      success_url: `${site.url}/tienda/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site.url}/tienda`,
      metadata: { deliveryMethod },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Error creando la sesión de Stripe:', err);
    return NextResponse.json({ error: 'stripe-error' }, { status: 500 });
  }
}
