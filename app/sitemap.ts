import type { MetadataRoute } from 'next';
import { site } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/estetica-arguelles',
    '/indiba',
    '/facial-arguelles',
    '/dermapen',
    '/tratamientos-corporales-arguelles',
    '/cejas-y-pestanas-arguelles',
    '/depilacion-laser',
    '/depilacion-facial-corporal',
    '/microblading',
    '/unas',
    '/tienda',
    '/quienes-somos',
    '/contact-arguelles',
    '/politica-de-privacidad-y-cookies',
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    priority: route === '/indiba' ? 1 : route === '' ? 1 : 0.7,
  }));
}
