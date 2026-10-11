import React from 'react';
import { useStore } from '../context/StoreContext';
import { FREE_GIFT_CATALOG } from '../data/products';
import { X, Gift, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const FreeDesignModal: React.FC = () => {
  const {
    isFreeGiftModalOpen,
    setIsFreeGiftModalOpen,
    addFreeGift,
    freeGifts,
    eligibleFreeGiftCount,
    remainingFreeGiftSlots
  } = useStore();

  if (!isFreeGiftModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsFreeGiftModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-black/10 text-[#111111]"
      >
        {/* Top Header Banner */}
        <div className="bg-[#0A0A0A] text-[#E8E2D3] p-5 sm:p-6 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Pick Your Free Keepsake Gift
              </h3>
              <p className="text-xs text-[#E8E2D3]/70">
                You have unlocked {eligibleFreeGiftCount} complimentary handcrafted gift{eligibleFreeGiftCount > 1 ? 's' : ''}!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-amber-400">
              {freeGifts.length}/{eligibleFreeGiftCount} SELECTED
            </span>
            <button
              onClick={() => setIsFreeGiftModalOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Designs Catalog Grid */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-[#111111]">Choose From Our Bestseller Keepsakes</h4>
            <p className="text-xs text-zinc-600 mt-1">
              Select any complimentary handmade resin item below to add it directly to your parcel at ৳0.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {FREE_GIFT_CATALOG.map((product) => {
              const isAlreadyAdded = freeGifts.some(g => g.productId === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-[#F2EDE2] border border-black/10 rounded-2xl p-4 flex flex-col justify-between hover:border-black/30 hover:shadow-md transition-all group"
                >
                  <div className="aspect-square bg-[#DFD8C7] rounded-xl p-3 flex items-center justify-center relative overflow-hidden border border-black/5">
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-[#E8E2D3] text-[10px] font-bold rounded">
                      FREE GIFT
                    </span>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-3">
                    <h5 className="text-xs sm:text-sm font-semibold text-[#111111] truncate">
                      {product.name}
                    </h5>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-emerald-700">৳0 FREE</span>
                      <span className="text-[11px] text-zinc-500 line-through">৳{product.price}</span>
                    </div>

                    <button
                      disabled={isAlreadyAdded || remainingFreeGiftSlots <= 0}
                      onClick={() => addFreeGift(product)}
                      className={`mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1 transition-all ${
                        isAlreadyAdded
                          ? 'bg-[#DFD8C7] text-zinc-500 cursor-not-allowed'
                          : 'bg-black hover:bg-zinc-900 text-[#E8E2D3] active:scale-95 shadow-sm'
                      }`}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Claim Gift</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#DFD8C7] border-t border-black/10 flex items-center justify-between">
          <div className="text-xs text-zinc-700">
            {remainingFreeGiftSlots > 0 ? (
              <span>You still have <strong>{remainingFreeGiftSlots}</strong> free gift slot{remainingFreeGiftSlots > 1 ? 's' : ''} available.</span>
            ) : (
              <span className="text-emerald-700 font-semibold">All complimentary gifts have been selected!</span>
            )}
          </div>
          <button
            onClick={() => setIsFreeGiftModalOpen(false)}
            className="px-5 py-2 bg-black text-[#E8E2D3] text-xs font-bold rounded-xl hover:bg-zinc-900 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
