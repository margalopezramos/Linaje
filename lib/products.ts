export type PriceTier = { sessions: string; price: string };

export type Paquete = { sesiones: number; precioPorSesion: number };

export type PricingMode = 'fixed' | 'package' | 'custom';

export type Product = {
  id: string;
  name: string;
  category: 'bono' | 'producto';
  delivery: 'digital' | 'physical'; // digital: bonos/tarjetas · physical: productos que se envían
  description: string;
  price: string; // texto mostrado en la tarjeta
  priceValue?: number; // precio unitario fijo (pricingMode: 'fixed')
  pricingMode: PricingMode;
  unitLabel: string; // "unidades", para el selector de cantidad de bonos iguales
  paquetes?: Paquete[]; // opciones de nº de sesiones (pricingMode: 'package')
  image: string;
  // Enlace de pago fijo (Stripe Payment Link) — alternativa rápida fuera
  // del carrito. El carrito (Stripe Checkout dinámico) es el camino
  // recomendado para todo lo demás.
  paymentUrl?: string;
};

export const FREE_SHIPPING_THRESHOLD = 90;
export const SHIPPING_COST = 5.9;

export const products: Product[] = [
  {
    id: 'bono-indiba-facial',
    name: 'INDIBA Facial',
    category: 'bono',
    delivery: 'digital',
    description: 'Radiofrecuencia INDIBA facial, en bonos de 6 o 10 sesiones — cuanto más grande el bono, menos pagas por sesión.',
    price: 'Desde 64,99 € / sesión',
    pricingMode: 'package',
    unitLabel: 'unidades',
    paquetes: [
      { sesiones: 6, precioPorSesion: 69.99 },
      { sesiones: 10, precioPorSesion: 64.99 },
    ],
    image: '/images/tienda/bono-indiba-facial.jpg',
  },
  {
    id: 'bono-indiba-corporal',
    name: 'INDIBA Corporal',
    category: 'bono',
    delivery: 'digital',
    description: 'Radiofrecuencia INDIBA corporal, en bonos de 6 o 10 sesiones — cuanto más grande el bono, menos pagas por sesión.',
    price: 'Desde 69,99 € / sesión',
    pricingMode: 'package',
    unitLabel: 'unidades',
    paquetes: [
      { sesiones: 6, precioPorSesion: 74.99 },
      { sesiones: 10, precioPorSesion: 69.99 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },
  {
    id: 'tarjeta-regalo',
    name: 'Tarjeta Regalo Linaje',
    category: 'bono',
    delivery: 'digital',
    description: 'El regalo perfecto: que ella misma elija su tratamiento. Disponible por el importe que quieras.',
    price: 'Importe a elegir',
    pricingMode: 'custom',
    unitLabel: 'unidades',
    image: '/images/tienda/tarjeta-regalo.jpg',
  },
  {
    id: 'vela-masaje',
    name: 'Vela de Masaje',
    category: 'producto',
    delivery: 'physical',
    description: 'Vela de masaje que se funde en aceite tibio para masajes en casa — el mismo ritual de cabina, en tu piel.',
    price: '15 €',
    priceValue: 15,
    pricingMode: 'fixed',
    unitLabel: 'unidades',
    image: '/images/tienda/vela-masaje.jpg',
    paymentUrl: 'https://buy.stripe.com/9B69AT8737PbeBnaIQ7ok00',
  },
];
