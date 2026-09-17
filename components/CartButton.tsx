'use client';

import { useCart } from './CartContext';

export default function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Ver carrito (${count} artículos)`}
      className="relative text-bone/80 hover:text-gold p-2"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 4h2l.4 2M7 13h10l3-7H5.4M7 13 6 6H4M7 13l-1.5 3H18" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="19" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="17" cy="19" r="1.3" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal-dark text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
