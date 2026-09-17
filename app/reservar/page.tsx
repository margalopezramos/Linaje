import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';

export const metadata: Metadata = {
  title: 'Reservar Cita',
  description: 'Reserva tu cita online en Centro de Estética Linaje, Argüelles.',
  alternates: { canonical: '/reservar' },
};

export default function ReservarPage() {
  return (
    <Suspense fallback={null}>
      <BookingWizard />
    </Suspense>
  );
}
