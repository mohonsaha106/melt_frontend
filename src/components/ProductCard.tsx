import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col bg-[#F2EDE2] rounded-2xl p-3 sm:p-4 border border-[#D3CBBA] hover:border-black/40 hover:shadow-xl transition-all duration-300 relative"
    >
      {/* Artwork Box */}
      <div 
        onClick={() => setQuickViewProduct(product)}
        className="relative aspect-square w-full rounded-xl bg-[#DFD8C7] flex items-center justify-center p-2 overflow-hidden cursor-pointer shadow-inner"
      >
        {/* Tag / Badge */}
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-black text-[#E8E2D3] shadow-sm">
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-[#E8E2D3]/90 hover:bg-[#E8E2D3] text-zinc-700 hover:text-red-500 shadow-sm transition-all duration-200 active:scale-90"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'text-red-500 fill-red-500' : ''
            }`}
          />
        </button>

        {/* Product Artwork / Photography Image */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-[#E8E2D3] hover:bg-[#F2EDE2] text-zinc-900 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center space-x-1.5 transition-transform active:scale-95 border border-[#D3CBBA]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 'S');
            }}
            className="p-2 bg-black hover:bg-zinc-800 text-[#E8E2D3] rounded-lg shadow-md transition-transform active:scale-95"
            title="Quick Add"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3.5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
          <span className="font-mono text-[11px]">{product.sku}</span>
          <div className="flex items-center space-x-1 text-zinc-700">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-medium text-[11px]">{product.rating}</span>
            <span className="text-[10px] text-zinc-500">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-sm sm:text-base font-semibold text-zinc-900 line-clamp-1 hover:text-black cursor-pointer transition-colors"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-2 pt-2 border-t border-[#D3CBBA]/60 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-bold text-zinc-900">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Mobile Direct Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 'S')}
            className="sm:hidden p-2 rounded-lg bg-black text-[#E8E2D3] active:scale-95 shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
