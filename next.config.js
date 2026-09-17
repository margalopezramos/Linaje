/** @type {import('next').NextConfig} */

// Redirects 301 (permanentes) de las pocas URLs que sí cambian respecto a WordPress.
// La mayoría de URLs de la web actual se mantienen IDÉNTICAS en Next.js
// (indicación de la agencia SEO: minimizar cambios de URL en la migración),
// así que aquí solo quedan los casos que de verdad lo requieren.

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'centrodeesteticalinaje.com' },
    ],
  },
  async redirects() {
    return [
      // Dos páginas huérfanas del WordPress actual se consolidan en una sola
      // (/depilacion-facial-corporal/), que es la que ya estaba en el menú principal.
      { source: '/depilacion-hilo', destination: '/depilacion-facial-corporal', permanent: true },
      { source: '/depilacion-cera', destination: '/depilacion-facial-corporal', permanent: true },

      // URL con query param que había quedado indexada en WordPress.
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id', value: '460' }],
        destination: '/tratamientos-corporales-arguelles',
        permanent: true,
      },

      // La página de bonos/tienda no tenía posicionamiento propio (no aparece
      // en el informe SEO), así que renombramos su URL a algo más genérico
      // ahora que va a vender más que solo bonos — con su 301 por si acaso.
      { source: '/bonos-ofertas-premium-arguelles', destination: '/tienda', permanent: true },

      // Pendiente: URLs /producto/* de WooCommerce (falta inventario completo;
      // si se recuperan como páginas individuales, añadir redirects aquí a
      // /tienda o a la ficha de producto que corresponda).
    ];
  },
};

module.exports = nextConfig;
