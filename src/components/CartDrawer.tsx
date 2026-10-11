import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    totalCartItemCount,
    isMinimumOrderMet,
    freeShippingRemaining,
    isFreeShippingUnlocked,
    eligibleFreeGiftCount,
    remainingFreeGiftSlots,
    nextTierItemsNeeded,
    nextTierProgressPercent,
    setIsFreeGiftModalOpen,
    setIsCheckoutOpen,
    setSelectedCategory
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="w-full sm:w-[440px] max-w-full bg-[#E8E2D3] shadow-2xl flex flex-col justify-between text-[#111111] border-l border-black/10 h-full"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-black/10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#111111]">Your Keepsake Cart</h2>
                <span className="px-2 py-0.5 bg-[#DFD8C7] text-zinc-900 text-xs font-bold rounded-full border border-black/10">
                  {totalCartItemCount}
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">Minimum order ৳250</p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-600 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Promo Deal Ticker Banner */}
          <div className="bg-[#DFD8C7] border-b border-black/10 p-4 space-y-3">
            {/* Free Gift Promo Notification */}
            {eligibleFreeGiftCount > 0 ? (
              <div className="bg-[#F2EDE2] border border-black/10 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center space-x-1.5 font-bold text-[#111111]">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <span>
                      {remainingFreeGiftSlots > 0
                        ? `🎉 ${remainingFreeGiftSlots} free gift unlocked — pick now!`
                        : `🎁 Complimentary gift active (${eligibleFreeGiftCount} unlocked)`}
                    </span>
                  </div>
                </div>

                {remainingFreeGiftSlots > 0 ? (
                  <button
                    onClick={() => {
                      setIsFreeGiftModalOpen(true);
                    }}
                    className="w-full py-2 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs font-bold rounded-xl transition-all active:scale-98 shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Free Gift ({remainingFreeGiftSlots} left)</span>
                  </button>
                ) : (
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>All free gifts added to parcel!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#F2EDE2] border border-black/10 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-1.5 text-zinc-700 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Gift className="w-4 h-4 text-zinc-600" />
                    <span>Add {nextTierItemsNeeded} more item{nextTierItemsNeeded > 1 ? 's' : ''} to unlock 1 FREE keepsake gift</span>
                  </div>
                  <span className="font-bold text-[11px] text-[#111111]">{Math.round(nextTierProgressPercent)}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#DFD8C7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: `${nextTierProgressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Free Shipping Tracker */}
            <div className="flex items-center justify-between text-[11px] text-zinc-700 px-1">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-zinc-600" />
                <span>
                  {isFreeShippingUnlocked ? (
                    <strong className="text-emerald-700">FREE delivery unlocked!</strong>
                  ) : (
                    <>Add <strong>৳{freeShippingRemaining}</strong> for free delivery</>
                  )}
                </span>
              </div>
              <span className="font-mono text-zinc-600">Nationwide</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                    item.isFreeGift
                      ? 'bg-amber-100/60 border-amber-300 shadow-sm'
                      : 'bg-[#F2EDE2] border-black/10 hover:border-black/30'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-[#DFD8C7] border border-black/10 flex items-center justify-center p-1 overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Sparkles className="w-6 h-6 text-amber-600" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#111111] truncate">
                        {item.name}
                      </h4>
                      {item.isFreeGift && (
                        <span className="px-1.5 py-0.2 bg-black text-[#E8E2D3] text-[9px] font-bold rounded uppercase">
                          FREE GIFT
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-zinc-600 mt-0.5">
                      <span className="font-mono">{item.sku}</span>
                      <span>•</span>
                      <span>Option: {item.size}</span>
                      {item.customFont && <span>• {item.customFont}</span>}
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="mt-2.5 flex items-center justify-between">
                      {item.isFreeGift ? (
                        <span className="text-xs font-bold text-amber-700">Complimentary Gift</span>
                      ) : (
                        <div className="flex items-center border border-black/15 rounded-lg bg-[#DFD8C7]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#D0C8B5] text-zinc-700 transition-colors rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-bold text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#D0C8B5] text-zinc-700 transition-colors rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <span className="text-xs sm:text-sm font-bold text-[#111111]">
                          {item.isFreeGift ? '৳0' : `৳${item.price * item.quantity}`}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-red-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty Cart View */
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DFD8C7] flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111111]">Your keepsake cart is empty</h3>
                  <p className="text-xs text-zinc-600 mt-1 max-w-xs mx-auto">
                    Explore our handcrafted floral preservation & resin keepsakes and start keeping memories alive!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedCategory('all');
                    const el = document.getElementById('product-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-900 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-black/10 bg-[#DFD8C7] space-y-4">
              {/* Minimum Order Check Alert */}
              {!isMinimumOrderMet && (
                <div className="p-3 bg-amber-100/80 border border-amber-300 rounded-xl flex items-center space-x-2 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-700" />
                  <span>
                    Minimum order amount is <strong>৳250</strong>. Add <strong>৳{250 - cartSubtotal}</strong> more to checkout.
                  </span>
                </div>
              )}

              {/* Subtotal row */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">Subtotal:</span>
                <span className="text-xl font-bold text-[#111111]">৳{cartSubtotal}</span>
              </div>

              {/* Checkout CTA */}
              <button
                disabled={!isMinimumOrderMet}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-black hover:bg-zinc-900 disabled:bg-[#C8C0AD] disabled:text-zinc-600 disabled:cursor-not-allowed text-[#E8E2D3] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout · ৳{cartSubtotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
