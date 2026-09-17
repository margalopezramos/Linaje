export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
};

// Requiere dos variables de entorno (en .env.local, NUNCA en el código ni en git):
//   GOOGLE_PLACES_API_KEY=tu_api_key
//   GOOGLE_PLACE_ID=ChIJ...
//
// Límite real de Google: como máximo 5 reseñas por negocio, sin importar
// cuántas tenga en total. Pedimos las más recientes (reviews_sort=newest)
// y filtramos solo las de 5 estrellas — puede que salgan menos de 5.
export async function getGoogleReviews(): Promise<GoogleReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    // Sin credenciales configuradas todavía — el componente que llama a esto
    // debe usar el fallback de reseñas de ejemplo.
    return null;
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=reviews` +
      `&reviews_sort=newest` +
      `&language=es` +
      `&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 }, // recarga como máximo 1 vez al día
    });

    if (!res.ok) return null;

    const data = await res.json();
    const reviews = data?.result?.reviews;
    if (!Array.isArray(reviews)) return null;

    return reviews
      .filter((r: any) => r.rating === 5 && typeof r.text === 'string' && r.text.trim().length > 20)
      .map((r: any) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
      }));
  } catch {
    return null;
  }
}
