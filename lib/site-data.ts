export const site = {
  name: 'Centro de Estética Linaje',
  shortName: 'Linaje',
  url: 'https://centrodeesteticalinaje.com',
  phonePrimary: '+34911697075',
  phonePrimaryDisplay: '911 69 70 75',
  phoneSecondary: '+34615619473',
  phoneSecondaryDisplay: '615 61 94 73',
  whatsappNumber: '34615619473', // sin "+" ni espacios, formato requerido por wa.me
  email: 'esteticalinaje@gmail.com',
  address: {
    street: 'Calle Ferraz, 74',
    postalCode: '28008',
    city: 'Madrid',
    neighborhood: 'Argüelles',
    metro: 'Metro Argüelles',
  },
  // URL de Google Maps para el enlace "Cómo llegar" (abre la app/web de Maps).
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Centro+de+Estetica+Linaje+Calle+Ferraz+74+Madrid',
  // URL para el <iframe> embebido del mapa (no requiere API key de Google).
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Calle+Ferraz+74,+28008+Madrid&output=embed',
  social: {
    facebook: 'https://www.facebook.com/esteticalinaje/',
    instagram: 'https://www.instagram.com/esteticalinaje/',
  },
};

// Horario confirmado por el cliente.
export const openingHours = [
  { day: 'Lunes', hours: '10:00 – 20:00' },
  { day: 'Martes', hours: '10:00 – 20:00' },
  { day: 'Miércoles', hours: '10:00 – 20:00' },
  { day: 'Jueves', hours: '10:00 – 20:00' },
  { day: 'Viernes', hours: '10:00 – 20:00' },
  { day: 'Sábado', hours: '10:30 – 14:00' },
  { day: 'Domingo', hours: 'Cerrado' },
];

export type NavItem = { label: string; href: string };

export const treatmentsNav: NavItem[] = [
  { label: 'Todos los servicios', href: '/estetica-arguelles' },
  { label: 'INDIBA', href: '/indiba' },
  { label: 'Tratamientos faciales', href: '/facial-arguelles' },
  { label: 'Dermapen', href: '/dermapen' },
  { label: 'Corporal', href: '/tratamientos-corporales-arguelles' },
  { label: 'Cejas y pestañas', href: '/cejas-y-pestanas-arguelles' },
  { label: 'Depilación láser', href: '/depilacion-laser' },
  { label: 'Depilación', href: '/depilacion-facial-corporal' },
  { label: 'Uñas', href: '/unas' },
  { label: 'Microblading', href: '/microblading' },
];

export const mainNav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Tratamientos', href: '/estetica-arguelles' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  { label: 'Contacto', href: '/contact-arguelles' },
];
