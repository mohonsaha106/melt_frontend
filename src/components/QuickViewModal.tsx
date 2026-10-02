import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Star, Clock, Truck, ShieldCheck, Sparkles, Check, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'Pack'>('S');
  const [isAdded, setIsAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);
  const activeSizeOption = quickViewProduct.sizes.find(s => s.size === selectedSize) || quickViewProduct.sizes[0];
  const currentPrice = activeSizeOption ? activeSizeOption.price : quickViewProduct.price;

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/shop?product=${quickViewProduct.id}`;
    const shareData = {
      title: `${quickViewProduct.name} | Melt Sparkle`,
      text: `Check out ${quickViewProduct.name} - Handcrafted Keepsake (৳${currentPrice} BDT) on Melt Sparkle!`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 border border-black/10 text-[#111111]"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-600 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Artwork Visual */}
          <div className="bg-[#DFD8C7] p-8 sm:p-12 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-black/10">
            <div className="w-full aspect-square flex items-center justify-center max-w-[280px]">
              <img
                src={quickViewProduct.imageUrl}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
            {quickViewProduct.tag && (
              <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-black text-[#E8E2D3]">
                {quickViewProduct.tag}
              </span>
            )}
          </div>

          {/* Right: Product Details & Size Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Placements tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <span className="text-[11px] font-mono text-zinc-600 uppercase mr-1">COLLECTION:</span>
                {quickViewProduct.placements.map((p, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#DFD8C7] text-zinc-800 text-[11px] rounded-full font-medium"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* Title & Wishlist */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] font-sans">
                    {quickViewProduct.name}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-zinc-600">
                    <span className="font-mono text-zinc-500">{quickViewProduct.sku}</span>
                    <span>•</span>
                    <div className="flex items-center text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                      <span className="font-bold text-[#111111]">{quickViewProduct.rating}</span>
                      <span className="text-zinc-600 ml-1">({quickViewProduct.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-[#DFD8C7] hover:bg-[#D4CCB8] text-zinc-700 hover:text-black border border-black/10 transition-colors relative"
                    aria-label="Share product"
                    title={isCopied ? "Link Copied!" : "Share Product"}
                  >
                    {isCopied ? (
                      <Check className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                    ) : (
                      <Share2 className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-2.5 rounded-full bg-[#DFD8C7] hover:bg-[#D4CCB8] text-zinc-700 hover:text-red-500 border border-black/10 transition-colors"
                    aria-label="Wishlist"
                    title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-[#111111]">৳{currentPrice}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">৳{quickViewProduct.originalPrice}</span>
                )}
                <span className="text-xs text-zinc-600 font-medium">Minimum order ৳250</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 block">
                  Select Size / Option
                </span>
                <div className="space-y-2">
                  {quickViewProduct.sizes.map((s) => {
                    const isSelected = selectedSize === s.size;
                    return (
                      <div
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`relative p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-black bg-black text-[#E8E2D3] shadow-sm'
                            : 'border-black/15 hover:border-black/30 bg-[#F2EDE2] text-[#111111]'
                        }`}
                      >
                        {s.isRecommended && (
                          <span className={`absolute -top-2 left-3 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider rounded ${
                            isSelected ? 'bg-amber-400 text-black' : 'bg-black text-[#E8E2D3]'
                          }`}>
                            ★ POPULAR
                          </span>
                        )}
                        <div className="flex items-center space-x-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isSelected ? 'bg-[#E8E2D3] text-black' : 'bg-[#DFD8C7] text-zinc-800'
                          }`}>
                            {s.size}
                          </span>
                          <span className={`text-xs ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>{s.dimensions}</span>
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-[#E8E2D3]' : 'text-zinc-900'}`}>৳{s.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-4">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${
                  isAdded
                    ? 'bg-emerald-700 text-[#E8E2D3]'
                    : 'bg-black hover:bg-zinc-900 text-[#E8E2D3] active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART · ৳{currentPrice}</span>
                  </>
                )}
              </button>

              {/* 4 Feature Chips */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                <div className="p-2 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Clock className="w-4 h-4 text-black mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-zinc-800 block">{quickViewProduct.durability}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Truck className="w-4 h-4 text-black mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-zinc-800 block">2–4 Days</span>
                </div>
                <div className="p-2 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <ShieldCheck className="w-4 h-4 text-black mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-zinc-800 block">UV Archival</span>
                </div>
                <div className="p-2 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Sparkles className="w-4 h-4 text-black mx-auto mb-1" />
                  <span className="text-[10px] font-medium text-zinc-800 block">Handcrafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

