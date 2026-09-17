import Image from 'next/image';
import BookButton from './BookButton';

export default function CtaBanner({
  title,
  body,
  ctaLabel = 'Reservar sesión',
}: {
  title: string;
  body?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative bg-charcoal-dark text-bone overflow-hidden">
      {/* Marca de agua del logo, muy sutil, puramente decorativa */}
      <Image
        src="/logo.png"
        alt=""
        width={420}
        height={462}
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-16 -top-16 opacity-[0.07] hidden sm:block"
      />
      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl mb-4 max-w-2xl mx-auto">{title}</h2>
        {body && <p className="text-bone/60 max-w-prose mx-auto mb-8">{body}</p>}
        <BookButton label={ctaLabel} />
      </div>
    </section>
  );
}
