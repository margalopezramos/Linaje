'use client';

import { useCookieConsent } from './CookieConsentContext';

export default function ManageCookiesButton({ className }: { className?: string }) {
  const { openBanner } = useCookieConsent();
  return (
    <button
      onClick={openBanner}
      className={
        className ??
        'inline-flex items-center px-5 py-2.5 text-sm font-medium border border-gold text-gold-dark hover:bg-gold hover:text-charcoal-dark transition-colors'
      }
    >
      Gestionar preferencias de cookies
    </button>
  );
}
