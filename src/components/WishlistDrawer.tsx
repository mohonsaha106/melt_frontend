import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openCart
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(p => addToCart(p, 'S'));
    setIsWishlistOpen(false);
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
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
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-bold text-[#111111]">Saved Keepsakes</h2>
              <span className="px-2 py-0.5 bg-[#DFD8C7] text-zinc-900 text-xs font-bold rounded-full border border-black/10">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-zinc-600 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-2xl border border-black/10 bg-[#F2EDE2] flex items-center justify-between gap-3 hover:border-black/30 transition-all"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#DFD8C7] border border-black/10 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#111111] truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-zinc-600 mt-0.5">
                      <span className="font-mono">{product.sku}</span>
                      <span>•</span>
                      <span className="font-bold text-[#111111]">৳{product.price}</span>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => addToCart(product, 'S')}
                        className="px-3 py-1.5 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs font-semibold rounded-lg flex items-center space-x-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DFD8C7] flex items-center justify-center mx-auto text-zinc-600">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#111111]">No saved keepsakes yet</h3>
                <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                  Click the heart icon on any handcrafted piece to save it to your wishlist.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-black/10 bg-[#DFD8C7]">
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98"
              >
                <span>Add All ({wishlistedProducts.length}) to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
