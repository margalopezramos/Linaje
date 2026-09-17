import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/lib/send-booking-confirmation-email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, nombre, servicio, fecha, hora, especialista, precio } = body;

    if (!nombre || !servicio || !fecha || !hora || !especialista) {
      return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
    }

    const result = await sendBookingConfirmationEmail({
      to,
      nombre,
      servicio,
      fecha,
      hora,
      especialista,
      precio: typeof precio === 'number' ? precio : 0,
    });

    return NextResponse.json(result);
  } catch (err) {
    // Nunca dejamos que un fallo de email tumbe la reserva: solo lo
    // registramos y devolvemos una respuesta controlada.
    console.error('Error enviando email de confirmación de reserva:', err);
    return NextResponse.json({ sent: false }, { status: 200 });
  }
}
