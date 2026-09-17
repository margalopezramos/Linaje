import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CartProvider } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { CookieConsentProvider } from '@/components/CookieConsentContext';
import CookieBanner from '@/components/CookieBanner';
import { site, openingHours } from '@/lib/site-data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Argüelles, Madrid`,
    template: `%s | ${site.name}`,
  },
  description:
    'Tratamientos estéticos en Centro de Estética Linaje, en Argüelles. No pierdas el tiempo y pregúntanos sobre cualquier duda. Calidad/Precio garantizado.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: site.name,
    url: site.url,
  },
};

const DAY_SCHEMA_MAP: Record<string, string> = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

const openingHoursSpecification = openingHours
  .filter((row) => row.hours !== 'Cerrado')
  .map((row) => {
    const [opens, closes] = row.hours.split('–').map((t) => t.trim());
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_SCHEMA_MAP[row.day],
      opens,
      closes,
    };
  });

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: site.name,
  url: site.url,
  telephone: site.phonePrimary,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: 'ES',
  },
  openingHoursSpecification,
  areaServed: ['Argüelles', 'Madrid', 'Moncloa', 'Chamberí', 'Ciudad Universitaria'],
  sameAs: [site.social.facebook, site.social.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <CookieConsentProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <CartDrawer />
          </CartProvider>
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
