'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type CookieCategory = 'maps' | 'analytics';

export type ConsentState = {
  necessary: true; // siempre activas, no son opcionales (técnicas)
  maps: boolean;
  analytics: boolean;
  decidedAt: string | null; // null = todavía no ha decidido nada
};

type CookieConsentContextValue = {
  consent: ConsentState;
  hasDecided: boolean;
  hasConsent: (cat: CookieCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: { maps: boolean; analytics: boolean }) => void;
  bannerOpen: boolean;
  openBanner: () => void;
  closeBanner: () => void;
};

const STORAGE_KEY = 'linaje-cookie-consent';

const DEFAULT_STATE: ConsentState = { necessary: true, maps: false, analytics: false, decidedAt: null };

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_STATE);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setConsent(parsed);
        setBannerOpen(!parsed.decidedAt);
      } else {
        setBannerOpen(true);
      }
    } catch {
      setBannerOpen(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // si falla el guardado, seguimos sin romper nada
    }
  }, [consent, hydrated]);

  const persist = (next: Omit<ConsentState, 'necessary' | 'decidedAt'>) => {
    setConsent({ necessary: true, ...next, decidedAt: new Date().toISOString() });
    setBannerOpen(false);
  };

  const value: CookieConsentContextValue = {
    consent,
    hasDecided: Boolean(consent.decidedAt),
    hasConsent: (cat) => consent[cat],
    acceptAll: () => persist({ maps: true, analytics: true }),
    rejectAll: () => persist({ maps: false, analytics: false }),
    savePreferences: (prefs) => persist(prefs),
    bannerOpen,
    openBanner: () => setBannerOpen(true),
    closeBanner: () => setBannerOpen(false),
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent debe usarse dentro de <CookieConsentProvider>');
  return ctx;
}
