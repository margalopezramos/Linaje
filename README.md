# Centro de Estética Linaje — Next.js

Migración de centrodeesteticalinaje.com (WordPress) a Next.js 14 (App Router
+ TypeScript + Tailwind), pensada para no perder SEO y mejorar el
posicionamiento de INDIBA como servicio estrella.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Qué incluye ya

- Arquitectura de rutas (`/tratamientos/indiba`, `/tratamientos/corporal`, etc.)
- Redirects 301 de todas las URLs antiguas de WordPress (`next.config.js`)
- Página pilar de INDIBA completa: metadatos, contenido, FAQ con schema `FAQPage`, schema `Service`
- Schema `BeautySalon` (LocalBusiness) global en el layout
- `sitemap.xml` y `robots.txt` dinámicos
- Sistema de diseño propio (Tailwind tokens: bone/ink/moss/clay/stone, tipografía Fraunces + Inter)
- Botón de reserva unificado apuntando a `reservalinaje.netlify.app` (confirmado como sistema definitivo)

## Pendiente — busca "TODO(cliente)" en el código

- Protocolo real de sesiones de INDIBA (número, frecuencia, duración) y contraindicaciones
- Contenido real de: Facial, Dermapen (estaba duplicado con INDIBA en WordPress), Depilación, Microblading, Cejas y pestañas, Uñas
- Fotos reales (cabina, equipo, antes/después con consentimiento) — sustituir los bloques `aspect-[4/5] bg-ink/5`
- Texto legal completo de la Política de Privacidad
- Decisión sobre la tienda de bonos/tarjetas regalo (WooCommerce) — de momento fuera de alcance, con redirect temporal (302) a `/contacto`
- Completar inventario de URLs `/producto/*` de WooCommerce si se decide migrar la tienda

## Antes de lanzar a producción

1. Verificar con Screaming Frog (o similar) que **todas** las URLs con tráfico real en Search Console tienen su redirect 301 correspondiente en `next.config.js`.
2. Corregir en el WordPress actual (mientras siga vivo) los botones "Reservar" que aún apuntan a Bewe — deben ir a Netlify.
3. Enviar el nuevo `sitemap.xml` en Google Search Console tras el lanzamiento.
4. Monitorizar cobertura de indexación y Core Web Vitals la primera semana.
"# Linaje" 
