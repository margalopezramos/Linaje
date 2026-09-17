'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { treatments } from '@/lib/treatments';
import BookButton from './BookButton';

// Añadimos una diapositiva final promocionando la tienda (bonos y tarjeta
// regalo), con la misma forma que un tratamiento para no tener que tocar
// el resto del carrusel.
const slides = [
  ...treatments,
  {
    title: 'Tarjeta Regalo y Bonos',
    href: '/tienda',
    desc: 'El regalo perfecto, o ahorra comprando por sesiones.',
    img: '/images/tienda/tarjeta-regalo.jpg',
  },
];

export default function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
  };

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  return (
    <div className="relative aspect-[4/5] sm:aspect-[3/4] border border-gold/40 p-2">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((t, i) => (
          <div
            key={t.href}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? 'auto' : 'none' }}
            aria-hidden={i !== active}
          >
            {/* NOMBRE DE ARCHIVO: public{t.img} */}
            <Image
              src={t.img}
              alt={t.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/85 via-charcoal-dark/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl text-bone mb-1">{t.title}</p>
              <p className="text-bone/70 text-sm mb-4 max-w-xs">{t.desc}</p>
              <Link
                href={t.href}
                className="inline-flex items-center text-sm text-gold hover:text-gold-light"
              >
                {t.href === '/tienda' ? 'Ir a la tienda →' : 'Ver tratamiento →'}
              </Link>
            </div>
          </div>
        ))}

        {/* Botón de reserva, siempre visible encima del carrusel */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
          <BookButton className="!px-4 !py-2 !text-xs shadow-lg" />
        </div>

        {/* Flechas laterales de navegación manual */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-charcoal-dark/60 text-bone hover:bg-charcoal-dark/90 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-charcoal-dark/60 text-bone hover:bg-charcoal-dark/90 transition-colors"
        >
          ›
        </button>

        {/* Indicadores / navegación manual */}
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-5 flex gap-1.5">
          {slides.map((t, i) => (
            <button
              key={t.href}
              type="button"
              aria-label={`Ver ${t.title}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-5 bg-gold' : 'w-1.5 bg-bone/40 hover:bg-bone/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
