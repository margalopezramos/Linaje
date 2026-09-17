'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mainNav, treatmentsNav } from '@/lib/site-data';
import BookButton from './BookButton';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-bone p-2 -mr-2"
      >
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 bg-charcoal-dark max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Navegación móvil" className="px-6 py-8 flex flex-col gap-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-bone"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-bone/10 pt-6 mt-2">
              <p className="text-xs tracking-[0.2em] uppercase text-bone/40 mb-4">Tratamientos</p>
              <div className="flex flex-col gap-4">
                {treatmentsNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-bone/80 text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <BookButton className="w-full justify-center mt-4" />
          </nav>
        </div>
      )}
    </div>
  );
}
