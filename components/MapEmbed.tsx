'use client';

import { useCookieConsent } from './CookieConsentContext';

export default function MapEmbed({ src, title }: { src: string; title: string }) {
  const { hasConsent, hasDecided, openBanner } = useCookieConsent();

  if (hasConsent('maps')) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-sand/40">
      <p className="text-sm text-stone mb-3">
        Este mapa usa cookies de Google Maps. {hasDecided ? 'Las rechazaste al entrar.' : ''}
      </p>
      <button
        onClick={openBanner}
        className="text-sm font-medium text-gold-dark hover:underline"
      >
        Gestionar cookies para ver el mapa →
      </button>
    </div>
  );
}
