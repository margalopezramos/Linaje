'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart, lineTotal, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from './CartContext';
import { products } from '@/lib/products';
import { formatEUR } from '@/lib/format';
import { site } from '@/lib/site-data';

export default function CartDrawer() {
  const cart = useCart();
  const [pickup, setPickup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!cart.isOpen) return null;

  const freeShippingByValue = cart.physicalSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = !cart.hasPhysicalItems || pickup || freeShippingByValue ? 0 : SHIPPING_COST;
  const total = cart.subtotal + shippingCost;

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const deliveryMethod = cart.hasPhysicalItems ? (pickup ? 'pickup' : 'shipping') : 'digital';
    const itemsSummary = cart.lines
      .map((l) => {
        const p = products.find((pp) => pp.id === l.productId);
        return `${p?.name ?? l.productId} x${l.quantity}`;
      })
      .join(', ');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: cart.lines, deliveryMethod, shippingCost, isGift: cart.isGift }),
      });

      if (!res.ok) throw new Error('checkout-unavailable');

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error('checkout-unavailable');
    } catch {
      // Fallback: Stripe todavía no está conectado (falta STRIPE_SECRET_KEY).
      // En vez de dejar al cliente colgado, mandamos el pedido por WhatsApp.
      const message = `Hola, quiero hacer este pedido: ${itemsSummary}. Entrega: ${
        deliveryMethod === 'pickup' ? 'recogida en el centro' : deliveryMethod === 'shipping' ? 'envío a domicilio' : 'digital'
      }. Total estimado: ${formatEUR(total)}.${cart.isGift ? ' Es para regalo — me gustaría pasarme a recoger un bono/tarjeta físico personalizado.' : ''}`;
      window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
      setError('El pago online no está disponible todavía — te hemos abierto WhatsApp para cerrar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-charcoal-dark/50" onClick={cart.closeCart} />
      <div className="relative w-full max-w-sm bg-bone h-full overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-5 bg-charcoal-dark text-bone">
          <h2 className="font-display text-xl">Tu carrito</h2>
          <button type="button" onClick={cart.closeCart} aria-label="Cerrar carrito" className="text-bone/60 hover:text-gold text-xl">
            ×
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <p className="p-5 text-stone text-sm">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="flex-1 p-5 space-y-5">
              {cart.lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <div key={`${line.productId}-${line.sesiones ?? 'x'}`} className="flex gap-3">
                    <div className="relative w-16 h-16 shrink-0 border border-gold/30 p-0.5">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-ink font-medium">{product.name}</p>
                      <p className="text-xs text-stone mb-1">
                        {line.sesiones ? `Bono ${line.sesiones} sesiones` : `${line.quantity} ${product.unitLabel}`}
                        {line.sesiones ? ` · x${line.quantity}` : ''}
                        {line.customAmount ? ` · ${formatEUR(line.customAmount)} c/u` : ''}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => cart.updateQuantity(line.productId, line.quantity - 1, line.sesiones)}
                          className="w-6 h-6 border border-ink/20 text-xs hover:bg-gold/10 hover:text-gold-dark"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => cart.updateQuantity(line.productId, line.quantity + 1, line.sesiones)}
                          className="w-6 h-6 border border-ink/20 text-xs hover:bg-gold/10 hover:text-gold-dark"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(line.productId, line.sesiones)}
                          className="text-xs text-stone hover:text-red-700 ml-2"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gold-dark font-medium">{formatEUR(lineTotal(line))}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-5 border-t border-gold/30 space-y-4">
              {cart.hasPhysicalItems && (
                <div>
                  <p className="text-xs text-stone mb-2">Entrega (para los productos físicos del pedido)</p>
                  <div className="flex gap-4 text-xs mb-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" checked={pickup} onChange={() => setPickup(true)} className="accent-gold-dark" />
                      Recogida (gratis)
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" checked={!pickup} onChange={() => setPickup(false)} className="accent-gold-dark" />
                      Envío a domicilio
                    </label>
                  </div>
                  <p className="text-[11px] text-stone">
                    {shippingCost > 0
                      ? `+ ${formatEUR(SHIPPING_COST)} de envío (gratis desde ${FREE_SHIPPING_THRESHOLD} € en productos físicos)`
                      : pickup
                        ? 'Sin coste de envío'
                        : 'Envío gratis'}
                  </p>
                </div>
              )}

              <div className="flex justify-between text-sm text-stone">
                <span>Subtotal</span>
                <span>{formatEUR(cart.subtotal)}</span>
              </div>
              {shippingCost > 0 && (
                <div className="flex justify-between text-sm text-stone">
                  <span>Envío</span>
                  <span>{formatEUR(shippingCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-base text-ink font-medium">
                <span>Total</span>
                <span>{formatEUR(total)}</span>
              </div>
              <p className="text-[11px] text-stone -mt-2">IVA incluido</p>

              {cart.hasDigitalItems && (
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="es-regalo"
                    checked={cart.isGift}
                    onChange={(e) => cart.setIsGift(e.target.checked)}
                    className="mt-0.5 accent-gold-dark"
                  />
                  <label htmlFor="es-regalo" className="text-xs text-stone cursor-pointer">
                    Es para regalo — además de recibirlo por email en PDF, quiero pasarme por el centro a por un bono/tarjeta físico personalizado.
                  </label>
                </div>
              )}

              {error && <p className="text-xs text-stone bg-gold/10 border border-gold/30 p-2">{error}</p>}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-medium bg-gold text-charcoal-dark hover:bg-gold-dark transition-colors disabled:opacity-60"
              >
                {loading ? 'Procesando…' : 'Pagar'}
              </button>
              <button type="button" onClick={cart.clearCart} className="w-full text-xs text-stone hover:text-ink">
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
