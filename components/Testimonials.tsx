import { site } from '@/lib/site-data';
import { getGoogleReviews } from '@/lib/google-reviews';

type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

// ⚠️ Reseñas de EJEMPLO — se muestran solo mientras no haya API de Google
// conectada (ver lib/google-reviews.ts). En cuanto configures
// GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID en .env.local, estas desaparecen
// solas y se sustituyen por reseñas reales de 5 estrellas automáticamente.
const fallbackReviews: Review[] = [
  { name: '[Nombre real de clienta]', rating: 5, text: 'TODO(cliente): esto se sustituye solo en cuanto conectes la API de Google — no hace falta que edites esto a mano.' },
  { name: '[Nombre real de clienta]', rating: 5, text: 'TODO(cliente): esto se sustituye solo en cuanto conectes la API de Google — no hace falta que edites esto a mano.' },
  { name: '[Nombre real de clienta]', rating: 5, text: 'TODO(cliente): esto se sustituye solo en cuanto conectes la API de Google — no hace falta que edites esto a mano.' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-gold-dark text-sm mb-2" aria-label={`${rating} de 5 estrellas`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </div>
  );
}

export default async function Testimonials() {
  const googleReviews = await getGoogleReviews();

  const reviews: Review[] =
    googleReviews && googleReviews.length > 0
      ? googleReviews.map((r) => ({
          name: r.author,
          rating: r.rating as 1 | 2 | 3 | 4 | 5,
          text: r.text,
        }))
      : fallbackReviews;

  const isLive = Boolean(googleReviews && googleReviews.length > 0);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-ink/10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <h2 className="font-display text-2xl sm:text-3xl text-ink">Lo que dicen nuestras clientas</h2>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gold-dark hover:underline"
        >
          Ver todas las reseñas en Google →
        </a>
      </div>
      <p className="text-xs text-stone mb-10">
        {isLive ? 'Reseñas reales vía Google' : 'Ejemplo — conecta la API de Google para mostrar reseñas reales'}
      </p>
      <div className="grid sm:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((r, i) => (
          <div key={i} className="border border-ink/10 p-5">
            <Stars rating={r.rating} />
            <p className="text-sm text-stone mb-3">&ldquo;{r.text}&rdquo;</p>
            <p className="text-xs text-ink font-medium">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
