import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Reset active image index whenever the product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [quickViewProduct?.id]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (quickViewProduct) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [quickViewProduct]);

  // Gallery image list (defaults to single imageUrl if images array is not present)
  const images = quickViewProduct
    ? (quickViewProduct.images && quickViewProduct.images.length > 0
        ? quickViewProduct.images
        : [quickViewProduct.imageUrl])
    : [];

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for image gallery and Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quickViewProduct) return;
      if (e.key === 'Escape') setQuickViewProduct(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    if (quickViewProduct) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, images.length]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);
  const currentPrice = quickViewProduct.price;

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
    const defaultSize = quickViewProduct.sizes[0]?.size || 'S';
    addToCart(quickViewProduct, defaultSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 600);
  };

  const currentImageUrl = images[activeImageIndex] || quickViewProduct.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Card - Compact & responsive with screen bounds */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-2xl lg:max-w-3xl w-full max-h-[88vh] sm:max-h-[85vh] shadow-2xl overflow-y-auto no-scrollbar overscroll-contain z-10 border border-black/10 text-[#111111]"
      >
        {/* Floating Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 text-zinc-700 hover:text-black bg-[#DFD8C7]/85 hover:bg-[#DFD8C7] rounded-full transition-colors border border-black/10 backdrop-blur-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Artwork Visual Container with Multi-Image Navigation */}
          <div className="bg-[#DFD8C7] p-5 sm:p-7 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-black/10 select-none">
            {/* Tag Badge */}
            {quickViewProduct.tag && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-black text-[#E8E2D3] shadow-xs">
                {quickViewProduct.tag}
              </span>
            )}

            {/* Main Interactive Image Frame */}
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[260px] sm:max-w-[280px] rounded-2xl overflow-hidden bg-black/5 shadow-md group">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={`${quickViewProduct.name} - View ${activeImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="w-full h-full object-cover select-none block"
                />
              </AnimatePresence>

              {/* Previous Image Arrow */}
              {images.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs transition-all active:scale-90 border border-white/20 z-10"
                  aria-label="Previous image"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Next Image Arrow */}
              {images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs transition-all active:scale-90 border border-white/20 z-10"
                  aria-label="Next image"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Image Counter Pill */}
              {images.length > 1 && (
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold rounded-full border border-white/20 z-10">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Indicator Dots */}
            {images.length > 1 && (
              <div className="flex items-center space-x-1.5 mt-3 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`transition-all rounded-full ${
                      activeImageIndex === idx
                        ? 'w-5 h-1.5 bg-black'
                        : 'w-1.5 h-1.5 bg-black/25 hover:bg-black/50'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Placements / Collection tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span className="text-[10px] font-mono text-zinc-600 uppercase mr-1">COLLECTION:</span>
                {quickViewProduct.placements.map((p, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#DFD8C7] text-zinc-800 text-[10px] rounded-full font-medium"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* Title & Action Icons */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-sans leading-tight">
                    {quickViewProduct.name}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-zinc-600">
                    <span className="font-mono text-zinc-500">{quickViewProduct.sku}</span>
                    <span>•</span>
                    <div className="flex items-center text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                      <span className="font-bold text-[#111111]">{quickViewProduct.rating}</span>
                      <span className="text-zinc-600 ml-1">({quickViewProduct.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 mr-8 md:mr-0">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-[#DFD8C7] hover:bg-[#D4CCB8] text-zinc-700 hover:text-black border border-black/10 transition-colors"
                    aria-label="Share product"
                    title={isCopied ? "Link Copied!" : "Share Product"}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-2 rounded-full bg-[#DFD8C7] hover:bg-[#D4CCB8] text-zinc-700 hover:text-red-500 border border-black/10 transition-colors"
                    aria-label="Wishlist"
                    title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Price & Minimum order */}
              <div className="mt-3 flex items-baseline space-x-2.5">
                <span className="text-2xl sm:text-3xl font-bold text-[#111111]">৳{currentPrice}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">৳{quickViewProduct.originalPrice}</span>
                )}
                <span className="text-xs text-zinc-600 font-medium">Minimum order ৳250</span>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-4">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Bottom Actions & Trust Chips */}
            <div className="space-y-3.5 pt-2 border-t border-black/10">
              {/* Add to Cart CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 ${
                  isAdded
                    ? 'bg-emerald-700 text-[#E8E2D3]'
                    : 'bg-black hover:bg-zinc-900 text-[#E8E2D3]'
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

              {/* 4 Compact Trust Chips */}
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="py-1.5 px-1 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Clock className="w-3.5 h-3.5 text-black mx-auto mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-zinc-800 block truncate">{quickViewProduct.durability}</span>
                </div>
                <div className="py-1.5 px-1 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Truck className="w-3.5 h-3.5 text-black mx-auto mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-zinc-800 block">2–4 Days</span>
                </div>
                <div className="py-1.5 px-1 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-black mx-auto mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-zinc-800 block">UV Epoxy</span>
                </div>
                <div className="py-1.5 px-1 rounded-xl bg-[#DFD8C7] border border-black/10">
                  <Sparkles className="w-3.5 h-3.5 text-black mx-auto mb-0.5" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-zinc-800 block">Handmade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
