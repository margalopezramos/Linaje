export type Paquete = { sesiones: number; precioTotal: number };

export type PricingMode = 'fixed' | 'package' | 'custom';

export type Product = {
  id: string;
  name: string;
  grupo: 'INDIBA' | 'Dermapen' | 'Peeling' | 'Tarjeta regalo' | 'Para casa';
  category: 'bono' | 'producto';
  delivery: 'digital' | 'physical';
  description: string;
  duracion?: string; // ej. "90 minutos"
  price: string; // texto mostrado en la tarjeta
  priceValue?: number; // precio fijo (pricingMode: 'fixed')
  precioSesionSuelta?: number; // precio de una sesión sin bono, para mostrar el ahorro
  pricingMode: PricingMode;
  unitLabel: string;
  paquetes?: Paquete[]; // opciones de nº de sesiones, con su precio TOTAL cada una
  ofrecerRecogida?: boolean;
  image: string;
  paymentUrl?: string;
};

export const FREE_SHIPPING_THRESHOLD = 90;
export const SHIPPING_COST = 5.9;

export const products: Product[] = [
  // ——— INDIBA ———
  {
    id: 'bono-indiba-facial',
    name: 'INDIBA Facial',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    // TODO(cliente): revisar — el bono de 6 sesiones (640€ → 106,67€/sesión)
    // sale MÁS CARO por sesión que el de 10 (590€ → 59€/sesión) y que la
    // sesión suelta (69,90€). Probablemente estén cambiados los importes.
    description: 'Radiofrecuencia INDIBA facial.',
    price: 'Desde 59 € / sesión',
    precioSesionSuelta: 69.90,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 640 },
      { sesiones: 10, precioTotal: 590 },
    ],
    image: '/images/tienda/bono-indiba-facial.jpg',
  },
  {
    id: 'bono-indiba-corporal-60',
    name: 'INDIBA Corporal (60 min)',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    description: 'Radiofrecuencia INDIBA corporal, sesión de 60 minutos.',
    duracion: '60 minutos',
    price: 'Desde 69,90 € / sesión',
    precioSesionSuelta: 79.90,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 449.40 },
      { sesiones: 10, precioTotal: 699.00 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },
  {
    id: 'bono-indiba-corporal-90',
    name: 'INDIBA Corporal (90 min)',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    description: 'Radiofrecuencia INDIBA corporal, sesión larga de 90 minutos.',
    duracion: '90 minutos',
    price: 'Desde 85 € / sesión',
    precioSesionSuelta: 99,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 540 },
      { sesiones: 10, precioTotal: 850 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },
  {
    id: 'combo-indiba-drenaje',
    name: 'INDIBA + Drenaje Linfático Manual',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    description: 'Combinado de radiofrecuencia INDIBA y drenaje linfático manual.',
    duracion: '90 minutos',
    price: 'Desde 100,50 € / sesión',
    precioSesionSuelta: 115,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 660 },
      { sesiones: 10, precioTotal: 1005 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },
  {
    id: 'combo-indiba-presoterapia',
    name: 'INDIBA + Presoterapia',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    description: 'Combinado de radiofrecuencia INDIBA y presoterapia.',
    duracion: '90 minutos',
    price: 'Desde 75 € / sesión',
    precioSesionSuelta: 85,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 640 },
      { sesiones: 10, precioTotal: 750 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },
  {
    id: 'combo-indiba-completo',
    name: 'INDIBA + Drenaje + Maderoterapia + Presoterapia',
    grupo: 'INDIBA',
    category: 'bono',
    delivery: 'digital',
    description: 'El combinado más completo: INDIBA, drenaje linfático manual, maderoterapia y presoterapia en una sola sesión.',
    duracion: '120 minutos',
    price: 'Desde 100 € / sesión',
    precioSesionSuelta: 140,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [
      { sesiones: 6, precioTotal: 780 },
      { sesiones: 10, precioTotal: 1200 },
    ],
    image: '/images/tienda/bono-indiba-corporal.jpg',
  },

  // ——— Dermapen ———
  {
    id: 'dermapen-antiage',
    name: 'Dermapen Antiage',
    grupo: 'Dermapen',
    category: 'bono',
    delivery: 'digital',
    description: 'Microagujas Dermapen centradas en firmeza y signos de la edad.',
    price: '82 € / sesión (bono 3)',
    precioSesionSuelta: 89.90,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [{ sesiones: 3, precioTotal: 246 }],
    image: '/images/tienda/bono-indiba-facial.jpg',
  },
  {
    id: 'dermapen-hidraface',
    name: 'Dermapen Hidraface',
    grupo: 'Dermapen',
    category: 'bono',
    delivery: 'digital',
    description: 'Microagujas Dermapen enfocadas en hidratación profunda.',
    price: '70 € / sesión (bono 3)',
    precioSesionSuelta: 74.90,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [{ sesiones: 3, precioTotal: 210 }],
    image: '/images/tienda/bono-indiba-facial.jpg',
  },
  {
    id: 'dermapen-manchas',
    name: 'Dermapen Stop Manchas',
    grupo: 'Dermapen',
    category: 'bono',
    delivery: 'digital',
    description: 'Microagujas Dermapen para tratar manchas e hiperpigmentación.',
    price: '70 € / sesión (bono 3)',
    precioSesionSuelta: 74.90,
    pricingMode: 'package',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    paquetes: [{ sesiones: 3, precioTotal: 210 }],
    image: '/images/tienda/bono-indiba-facial.jpg',
  },
  {
    id: 'combo-dermapen-indiba',
    name: 'Combinado Dermapen + INDIBA',
    grupo: 'Dermapen',
    category: 'bono',
    delivery: 'digital',
    description: '3 sesiones de Dermapen + 6 sesiones de INDIBA facial, en un único bono.',
    price: '560 €',
    priceValue: 560,
    pricingMode: 'fixed',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    image: '/images/tienda/bono-indiba-facial.jpg',
  },

  // ——— Peeling ———
  {
    id: 'peeling-despigmentante',
    name: 'Peeling Despigmentante Unificador + Limpieza Facial',
    grupo: 'Peeling',
    category: 'bono',
    delivery: 'digital',
    description: 'Bono de 3 sesiones de peeling despigmentante y unificador, con limpieza facial incluida.',
    price: '220 € (3 sesiones)',
    priceValue: 220,
    pricingMode: 'fixed',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    image: '/images/tienda/facial.jpg',
  },
  {
    id: 'peeling-hidratacion',
    name: 'Peeling Hidratación y Luminosidad + Limpieza Facial',
    grupo: 'Peeling',
    category: 'bono',
    delivery: 'digital',
    description: 'Bono de 3 sesiones de peeling de hidratación y luminosidad, con limpieza facial incluida.',
    price: '195 € (3 sesiones)',
    priceValue: 195,
    pricingMode: 'fixed',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    image: '/images/tienda/facial.jpg',
  },

  // ——— Tarjeta regalo ———
  {
    id: 'tarjeta-regalo',
    name: 'Tarjeta Regalo Linaje',
    grupo: 'Tarjeta regalo',
    category: 'bono',
    delivery: 'digital',
    description: 'El regalo perfecto: que ella misma elija su tratamiento. Disponible por el importe que quieras.',
    price: 'Importe a elegir',
    pricingMode: 'custom',
    unitLabel: 'unidades',
    ofrecerRecogida: true,
    image: '/images/tienda/tarjeta-regalo.jpg',
  },

  // ——— Para casa ———
  {
    id: 'vela-masaje',
    name: 'Vela de Masaje',
    grupo: 'Para casa',
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
