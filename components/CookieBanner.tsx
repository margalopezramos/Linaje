'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from './CookieConsentContext';

export default function CookieBanner() {
  const { bannerOpen, acceptAll, rejectAll, savePreferences, consent } = useCookieConsent();
  const [personalizar, setPersonalizar] = useState(false);
  const [maps, setMaps] = useState(consent.maps);
  const [analytics, setAnalytics] = useState(consent.analytics);

  if (!bannerOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] bg-charcoal-dark text-bone border-t border-gold/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
        {!personalizar ? (
          <>
            <p className="text-sm mb-4">
              Usamos cookies técnicas necesarias para que la web funcione, y
              opcionalmente cookies de mapas (Google Maps) y analítica, solo
              si nos das tu permiso. Puedes leer más en nuestra{' '}
              <Link href="/politica-de-privacidad-y-cookies" className="underline hover:text-gold">
                política de cookies
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={rejectAll}
                className="px-5 py-2.5 text-sm font-medium border border-bone/40 text-bone hover:bg-bone/10 transition-colors"
              >
                Rechazar todas
              </button>
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark transition-colors"
              >
                Aceptar todas
              </button>
              <button
                onClick={() => setPersonalizar(true)}
                className="px-5 py-2.5 text-sm font-medium text-bone/70 hover:text-gold underline"
              >
                Personalizar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm mb-4 font-medium">Elige qué cookies quieres permitir</p>
            <div className="space-y-3 mb-5">
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked disabled className="mt-0.5 accent-gold" />
                <span>
                  <span className="block font-medium">Necesarias (siempre activas)</span>
                  <span className="block text-bone/60 text-xs">Imprescindibles para que la web funcione correctamente.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" checked={maps} onChange={(e) => setMaps(e.target.checked)} className="mt-0.5 accent-gold" />
                <span>
                  <span className="block font-medium">Mapas (Google Maps)</span>
                  <span className="block text-bone/60 text-xs">Necesarias para mostrar el mapa de nuestra ubicación.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-0.5 accent-gold" />
                <span>
                  <span className="block font-medium">Analítica</span>
                  <span className="block text-bone/60 text-xs">Nos ayuda a entender cómo se usa la web, de forma anónima.</span>
                </span>
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setPersonalizar(false)}
                className="px-5 py-2.5 text-sm font-medium border border-bone/40 text-bone hover:bg-bone/10 transition-colors"
              >
                ← Volver
              </button>
              <button
                onClick={() => savePreferences({ maps, analytics })}
                className="px-5 py-2.5 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
