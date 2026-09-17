import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site-data';
import { FacebookIcon, InstagramIcon } from './SocialIcons';
import ManageCookiesButton from './ManageCookiesButton';

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-bone mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-3 text-sm">
        <div>
          <Image src="/logo.png" alt={site.name} width={44} height={38} className="mb-4" />
          <p className="text-bone/60">
            {site.address.street}, {site.address.postalCode} {site.address.city}
            <br />
            {site.address.neighborhood} · {site.address.metro}
          </p>
        </div>

        <div>
          <p className="text-bone/40 mb-2">Contacto</p>
          <p>
            <a href={`tel:${site.phonePrimary}`} className="hover:text-gold">
              {site.phonePrimaryDisplay}
            </a>
          </p>
          <p>
            <a href={`tel:${site.phoneSecondary}`} className="hover:text-gold">
              {site.phoneSecondaryDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-gold">
              {site.email}
            </a>
          </p>
        </div>

        <div>
          <p className="text-bone/40 mb-2">Síguenos</p>
          <p className="flex gap-4">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold">
              <FacebookIcon />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold">
              <InstagramIcon />
            </a>
          </p>
          <p className="mt-6">
            <Link href="/politica-de-privacidad-y-cookies" className="text-bone/40 hover:text-gold">
              Política de privacidad
            </Link>
          </p>
          <p className="mt-2">
            <ManageCookiesButton className="text-bone/40 hover:text-gold text-sm" />
          </p>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-bone/40">
          {/* TODO(cliente): si el centro está homologado por la Comunidad de
              Madrid o tiene código de sanidad/registro sanitario, ponlo aquí
              tal cual — genera mucha confianza y varias de tus competidoras
              lo muestran en su footer. Ejemplo: "Centro de Estética
              homologado por la Comunidad de Madrid · Código de sanidad: XXXXX" */}
          Centro de Estética homologado — TODO(cliente): código de registro sanitario
        </div>
      </div>
    </footer>
  );
}
