'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { products, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/products';

export type CartLine = {
  productId: string;
  quantity: number; // nº de bonos/unidades iguales
  sesiones?: number; // paquete elegido (6 o 10), solo pricingMode 'package'
  customAmount?: number; // solo para pricingMode 'custom' (tarjeta regalo)
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (productId: string, quantity: number, options?: { sesiones?: number; customAmount?: number }) => void;
  removeItem: (productId: string, sesiones?: number) => void;
  updateQuantity: (productId: string, quantity: number, sesiones?: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  count: number;
  hasPhysicalItems: boolean;
  physicalSubtotal: number;
  digitalSubtotal: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'linaje-cart';

function lineTotal(line: CartLine): number {
  const product = products.find((p) => p.id === line.productId);
  if (!product) return 0;
  if (product.pricingMode === 'fixed') return (product.priceValue ?? 0) * line.quantity;
  if (product.pricingMode === 'package') {
    const paquete = product.paquetes?.find((pk) => pk.sesiones === line.sesiones);
    if (!paquete) return 0;
    return paquete.sesiones * paquete.precioPorSesion * line.quantity;
  }
  if (product.pricingMode === 'custom') return (line.customAmount ?? 0) * line.quantity;
  return 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar del localStorage al montar (solo en el navegador)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // localStorage no disponible o dato corrupto — se ignora, carrito vacío
    }
    setHydrated(true);
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // si falla el guardado, no rompemos la app
    }
  }, [lines, hydrated]);

  const addItem = (productId: string, quantity: number, options?: { sesiones?: number; customAmount?: number }) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId && l.sesiones === options?.sesiones);
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + quantity, customAmount: options?.customAmount ?? l.customAmount } : l
        );
      }
      return [...prev, { productId, quantity, sesiones: options?.sesiones, customAmount: options?.customAmount }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, sesiones?: number) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.sesiones === sesiones)));
  };

  const updateQuantity = (productId: string, quantity: number, sesiones?: number) => {
    if (quantity < 1) return;
    setLines((prev) => prev.map((l) => (l.productId === productId && l.sesiones === sesiones ? { ...l, quantity } : l)));
  };

  const clearCart = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const physicalLines = lines.filter((l) => products.find((p) => p.id === l.productId)?.delivery === 'physical');
    const digitalLines = lines.filter((l) => products.find((p) => p.id === l.productId)?.delivery === 'digital');

    const physicalSubtotal = physicalLines.reduce((sum, l) => sum + lineTotal(l), 0);
    const digitalSubtotal = digitalLines.reduce((sum, l) => sum + lineTotal(l), 0);

    return {
      lines,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      hasPhysicalItems: physicalLines.length > 0,
      physicalSubtotal,
      digitalSubtotal,
      subtotal: physicalSubtotal + digitalSubtotal,
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}

export { lineTotal, FREE_SHIPPING_THRESHOLD, SHIPPING_COST };
