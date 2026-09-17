import Image from 'next/image';

// Franja de marcas con las que trabaja el centro.
// Cada logo se busca en public/images/marcas/<archivo>.
// Sustituye esos PNG por los logotipos reales (con permiso del proveedor)
// manteniendo el mismo nombre de archivo — no hace falta tocar el código.
const BRANDS = [
  { name: 'IrMedical', file: 'irmedical.png' },
  { name: 'Skinderma', file: 'skinderma.png' },
  { name: 'INDIBA', file: 'indiba.png' },
  { name: 'Mesoestetic', file: 'mesoestetic.png' },
];

export default function BrandsBanner() {
  return (
    <section className="border-y border-ink/10 bg-sand/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-center text-xs tracking-[0.2em] uppercase text-stone mb-6">
          Trabajamos con las mejores marcas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-6">
          {BRANDS.map((brand) => (
            <div key={brand.file} className="relative h-10 w-32 sm:h-12 sm:w-40 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition">
              {/* NOMBRE DE ARCHIVO: public/images/marcas/{brand.file} */}
              <Image
                src={`/images/marcas/${brand.file}`}
                alt={brand.name}
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
