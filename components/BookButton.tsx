import Link from 'next/link';

export default function BookButton({
  label = 'Reservar sesión',
  variant = 'solid',
  className = '',
  servicio,
}: {
  label?: string;
  variant?: 'solid' | 'outline';
  className?: string;
  servicio?: string; // si se indica, precarga la búsqueda en /reservar
}) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors';
  const styles =
    variant === 'solid'
      ? 'bg-gold text-charcoal-dark hover:bg-gold-dark'
      : 'border border-gold text-gold hover:bg-gold hover:text-charcoal-dark';

  const href = servicio ? `/reservar?servicio=${encodeURIComponent(servicio)}` : '/reservar';

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {label}
    </Link>
  );
}
