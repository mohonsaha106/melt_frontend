import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingBottomCartBar: React.FC = () => {
  const {
    cart,
    totalCartItemCount,
    cartSubtotal,
    isCartOpen,
    isCheckoutOpen,
    openCart,
    setIsCheckoutOpen,
    isMinimumOrderMet
  } = useStore();

  if (cart.length === 0 || isCartOpen || isCheckoutOpen) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 24, stiffness: 260 }}
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-40 max-w-lg mx-auto sm:mx-0 select-none"
    >
      <div className="bg-[#0A0A0A] text-[#E8E2D3] px-4 py-3 rounded-full shadow-2xl border border-zinc-800 flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-md">
        {/* Left: Cart Info */}
        <div
          onClick={openCart}
          className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-amber-400">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#E8E2D3] flex items-center space-x-1.5">
              <span>{totalCartItemCount} keepsake{totalCartItemCount > 1 ? 's' : ''} in cart</span>
              <span className="text-zinc-500">•</span>
              <span className="text-amber-400">৳{cartSubtotal}</span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              Preserve your memories today
            </p>
          </div>
        </div>

        {/* Right: Checkout CTA */}
        <button
          onClick={() => {
            if (isMinimumOrderMet) {
              setIsCheckoutOpen(true);
            } else {
              openCart();
            }
          }}
          className="px-4 py-2 bg-[#E8E2D3] text-black hover:bg-[#DFD8C7] text-xs font-bold uppercase tracking-wider rounded-full flex items-center space-x-1.5 transition-transform active:scale-95 shadow-sm flex-shrink-0"
        >
          <span>Checkout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
