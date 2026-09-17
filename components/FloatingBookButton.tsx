import BookButton from './BookButton';

export default function FloatingBookButton({ servicio }: { servicio?: string }) {
  return (
    <div className="lg:hidden fixed bottom-5 left-5 z-40">
      <BookButton servicio={servicio} label="Reservar sesión" className="shadow-lg" />
    </div>
  );
}
