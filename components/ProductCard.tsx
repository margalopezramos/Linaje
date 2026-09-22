'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { formatEUR } from '@/lib/format';
import { useCart } from './CartContext';

const CATEGORY_LABEL: Record<Product['category'], string> = {
  bono: 'Bono',
  producto: 'Producto',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState(30);
  const [paqueteElegido, setPaqueteElegido] = useState(product.paquetes?.[0]?.sesiones);
  const [entrega, setEntrega] = useState<'email' | 'recogida'>('email');
  const [added, setAdded] = useState(false);

  const paquete = product.paquetes?.find((p) => p.sesiones === paqueteElegido);

  const unitPrice =
    product.pricingMode === 'fixed'
      ? product.priceValue ?? 0
      : product.pricingMode === 'package'
        ? (paquete ? paquete.precioTotal : 0)
        : customAmount;

  const lineTotal = unitPrice * quantity;

  const handleAdd = () => {
    addItem(product.id, quantity, {
      sesiones: product.pricingMode === 'package' ? paqueteElegido : undefined,
      customAmount: product.pricingMode === 'custom' ? customAmount : undefined,
      entrega: product.delivery === 'digital' ? entrega : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="border border-ink/10 hover:border-gold/50 transition-colors flex flex-col">
      <div className="relative aspect-[4/3] p-1.5 pb-0">
        <div className="relative w-full h-full border border-gold/30 overflow-hidden">
          {/* NOMBRE DE ARCHIVO: public{product.image} */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
          <span className="absolute top-2 left-2 bg-charcoal-dark/90 text-bone text-[10px] tracking-wide uppercase px-2 py-1">
            {CATEGORY_LABEL[product.category]}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-base sm:text-lg text-ink mb-1">{product.name}</h3>
        <p className="text-xs sm:text-sm text-stone mb-3">{product.description}</p>

        <div className="mt-auto">
          {product.pricingMode === 'package' && product.paquetes && (
            <div className="flex gap-2 mb-2">
              {product.paquetes.map((p) => (
                <button
                  key={p.sesiones}
                  type="button"
                  onClick={() => setPaqueteElegido(p.sesiones)}
                  className={`flex-1 text-left border-2 px-3 py-2 transition-colors ${
                    paqueteElegido === p.sesiones ? 'border-gold bg-gold/10' : 'border-ink/15 hover:border-gold/50'
                  }`}
                >
                  <span className="block text-sm font-medium text-ink">{p.sesiones} sesiones</span>
                  <span className="block text-xs text-gold-dark">{formatEUR(p.precioTotal)} total</span>
                  <span className="block text-[10px] text-stone">{formatEUR(p.precioTotal / p.sesiones)}/sesión</span>
                </button>
              ))}
            </div>
          )}

          {product.duracion && <p className="text-[11px] text-stone mb-2">Duración de la sesión: {product.duracion}</p>}

          {product.precioSesionSuelta && (
            <p className="text-[11px] text-stone mb-3">
              Precio de una sesión suelta (sin bono): {formatEUR(product.precioSesionSuelta)}
            </p>
          )}

          {product.pricingMode === 'custom' && (
            <label className="block mb-3 text-xs text-stone">
              Importe por tarjeta
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="number"
                  min={10}
                  step={5}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Math.max(10, Number(e.target.value) || 0))}
                  className="w-20 border border-ink/20 px-2 py-1 text-sm text-ink"
                />
                <span>€</span>
              </div>
            </label>
          )}

          {product.ofrecerRecogida && (
            <div className="mb-3">
              <p className="text-xs text-stone mb-1">Cómo lo quieres recibir</p>
              <div className="flex gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={entrega === 'email'} onChange={() => setEntrega('email')} className="accent-gold-dark" />
                  Por email (PDF)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={entrega === 'recogida'} onChange={() => setEntrega('recogida')} className="accent-gold-dark" />
                  Recogida gratis en el centro
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-stone">Cantidad</span>
            <div className="flex items-center border border-ink/20">
              <button
                type="button"
                aria-label="Quitar una unidad"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-ink hover:bg-gold/10 hover:text-gold-dark"
              >
                −
              </button>
              <span className="w-7 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Añadir una unidad"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-ink hover:bg-gold/10 hover:text-gold-dark"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gold-dark font-medium text-sm mb-1">{formatEUR(lineTotal)}</p>
          <p className="text-[11px] text-stone mb-3">IVA incluido</p>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-xs sm:text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark transition-colors"
          >
            {added ? 'Añadido ✓' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}
