import Link from 'next/link';
import Image from 'next/image';
import { mainNav, site } from '@/lib/site-data';
import { treatments } from '@/lib/treatments';
import BookButton from './BookButton';
import MobileMenu from './MobileMenu';
import CartButton from './CartButton';

export default function Header() {
  return (
    <header className="relative bg-charcoal-dark sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Image src="/logo.png" alt={site.name} width={36} height={40} priority className="h-9 w-auto sm:h-10" />
          <span className="leading-tight">
            <span className="block font-display text-base sm:text-lg tracking-[0.15em] text-bone uppercase">
              {site.shortName}
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.2em] text-gold/80 uppercase">
              Centro de Estética
            </span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8 text-sm">
          {mainNav.map((item) =>
            item.href === '/estetica-arguelles' ? (
              // Menú "Tratamientos": desplegable rico solo con CSS (sin JS),
              // se abre al pasar el ratón por encima.
              <div key={item.href} className="group relative">
                <Link href={item.href} className="text-bone/80 hover:text-gold py-3">
                  {item.label}
                </Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[560px] z-50">
                  <div className="bg-bone border border-ink/10 shadow-xl p-4 grid grid-cols-2 gap-1">
                    {treatments.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        className="flex items-center gap-3 p-2 hover:bg-ink/5 transition-colors"
                      >
                        <span className="relative w-12 h-12 shrink-0 overflow-hidden">
                          <Image src={t.img} alt="" fill sizes="48px" className="object-cover" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-ink">{t.title}</span>
                          <span className="block text-xs text-stone">{t.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/tienda"
                    className="flex items-center justify-between bg-charcoal-dark text-bone px-4 py-3 hover:bg-gold hover:text-charcoal-dark transition-colors"
                  >
                    <span className="text-sm font-medium">🎁 Bonos y tarjetas regalo — visita nuestra tienda</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="text-bone/80 hover:text-gold">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          <CartButton />
          <BookButton label="Reservar" className="!px-4 !py-2 !text-xs sm:!px-6 sm:!py-3 sm:!text-sm" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
