import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

interface GalleryPiece {
  id: string;
  sku: string;
  collectionName: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  editionTag: string;
}

const GALLERY_PIECES: GalleryPiece[] = [
  {
    id: 'prod-forever-rose-pendant',
    sku: 'MS-107',
    collectionName: 'THE SIGNATURE COLLECTION',
    title: 'Eternal Rosebud Teardrop Pendant',
    subtitle: 'Real miniature red rosebud set in 24K gold foil',
    description: 'A genuine botanical rosebud immortalized inside museum-clarity crystal epoxy on an anti-tarnish 18K gold-plated chain.',
    price: 550,
    originalPrice: 700,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    editionTag: 'FINE JEWELRY NO. 01'
  },
  {
    id: 'prod-gold-monogram-keychain',
    sku: 'MS-102',
    collectionName: 'GOLDEN MONOGRAM SERIES',
    title: '24K Gold Leaf Initial Locket',
    subtitle: 'Pressed baby’s breath florals with 24K gold flakes',
    description: 'Personalized alphabet charm hand-poured with real gold leaf, natural pressed flowers, and luxury swivel clasp hardware.',
    price: 350,
    originalPrice: 450,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    editionTag: 'PERSONALIZED HEIRLOOM'
  },
  {
    id: 'prod-floral-ring-dish',
    sku: 'MS-106',
    collectionName: 'CEREMONIAL BRIDAL ATELIER',
    title: 'Personalized Floral Trinket Dish',
    subtitle: 'Scalloped jewelry tray with gold foil script',
    description: 'Adorned with real dried rose petals, botanical ferns, and custom couple calligraphy for ring and vanity display.',
    price: 650,
    originalPrice: 850,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=85',
    editionTag: 'BRIDAL ESSENTIAL'
  },
  {
    id: 'prod-geode-emerald-wall-clock',
    sku: 'MS-103',
    collectionName: 'STATEMENT MINERAL DECOR',
    title: 'Royal Emerald Geode Wall Clock',
    subtitle: 'Natural crushed quartz veins & silent quartz movement',
    description: 'Statement luxury resin art piece capturing deep jewel emerald pigments and metallic gold veins for modern interiors.',
    price: 3400,
    originalPrice: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85',
    editionTag: 'STATEMENT PIECE'
  },
  {
    id: 'prod-botanical-hair-clips',
    sku: 'MS-112',
    collectionName: 'BOTANICAL ACCESSORIES',
    title: 'Pressed Daisy & Gold Hair Clips',
    subtitle: 'Forget-me-nots & golden leaves (Set of 3)',
    description: 'Handcrafted alligator hair barrettes cast with real organic florals and golden leaf accents in clear archival epoxy.',
    price: 420,
    originalPrice: 550,
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85',
    editionTag: 'TRENDING ACCESSORY'
  }
];

const AUTOPLAY_DURATION = 5; // 5 seconds per slide

export const Hero: React.FC = () => {
  const { setQuickViewProduct, addToCart, setSelectedCategory, setSelectedPlacement } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_PIECES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_PIECES.length) % GALLERY_PIECES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentPiece = GALLERY_PIECES[activeIndex];

  const handleOpenProduct = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  const handleQuickAdd = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod, 'S');
    }
  };

  const handleShopAll = () => {
    setSelectedCategory('jewelry');
    setSelectedPlacement(null);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Precise geometry for perfect border alignment with rounded corners
  const strokeWidth = isMobile ? 2 : 3;
  const strokeOffset = isMobile ? 1 : 1.5;
  const cornerRadius = isMobile ? 15 : 22.5;

  return (
    <section 
      className="relative overflow-hidden bg-[#E8E2D3] border-b border-[#D3CBBA] pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center / Asymmetric Gallery Stage */}
        <div className="relative flex items-center justify-center my-2 sm:my-4">
          {/* Asymmetric Gallery Carousel Track with continuous gliding */}
          <div className="relative w-full flex items-center justify-center min-h-[270px] sm:min-h-[320px] lg:min-h-[350px]">
            {GALLERY_PIECES.map((piece, idx) => {
              const total = GALLERY_PIECES.length;
              let offset = (idx - activeIndex + total) % total;
              if (offset > total / 2) offset -= total;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset < -1;

              return (
                <motion.div
                  key={piece.id}
                  onClick={() => {
                    if (!isCenter) setActiveIndex(idx);
                  }}
                  initial={false}
                  animate={{
                    x: isCenter
                      ? '0%'
                      : isLeft
                      ? '-62%'
                      : isRight
                      ? '62%'
                      : isFarLeft
                      ? '-120%'
                      : '120%',
                    scale: isCenter ? 1 : isLeft || isRight ? 0.82 : 0.65,
                    opacity: isCenter ? 1 : isLeft || isRight ? 0.45 : 0,
                    rotate: isCenter ? 0 : isLeft ? -3.5 : isRight ? 3.5 : isFarLeft ? -6 : 6,
                    zIndex: isCenter ? 25 : isLeft || isRight ? 10 : 0,
                    filter: isCenter ? 'blur(0px)' : isLeft || isRight ? 'blur(1.5px)' : 'blur(4px)',
                    pointerEvents: isCenter ? 'auto' : isLeft || isRight ? 'auto' : 'none'
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`absolute w-[280px] sm:w-[400px] lg:w-[460px] aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl cursor-pointer ${
                    isCenter ? 'ring-1 ring-black/10' : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={piece.imageUrl}
                    alt={piece.title}
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {piece.editionTag}
                    </span>
                  </div>

                  {/* Bottom Info Overlay on Image */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white text-left z-10">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 block mb-0.5">
                      {piece.collectionName}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl font-bold text-white leading-tight line-clamp-1">
                      {piece.title}
                    </h3>
                    <div className="mt-1.5 flex items-center justify-between pt-1.5 border-t border-white/20">
                      <span className="font-serif font-bold text-sm sm:text-base text-white">
                        ৳{piece.price} BDT
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
                        {piece.sku}
                      </span>
                    </div>
                  </div>

                  {/* ====================================================
                      ANIMATED PERIMETER BORDER (Fills from start to finish in Black)
                     ==================================================== */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                    {/* Base subtle track border */}
                    <rect
                      x={strokeOffset}
                      y={strokeOffset}
                      width={`calc(100% - ${strokeOffset * 2}px)`}
                      height={`calc(100% - ${strokeOffset * 2}px)`}
                      rx={cornerRadius}
                      fill="none"
                      stroke="#D3CBBA"
                      strokeWidth={strokeWidth}
                    />

                    {/* Filling Black Border around active card */}
                    {isCenter && (
                      <motion.rect
                        key={`hero-border-${activeIndex}-${isPaused ? 'paused' : 'playing'}-${isMobile ? 'm' : 'd'}`}
                        x={strokeOffset}
                        y={strokeOffset}
                        width={`calc(100% - ${strokeOffset * 2}px)`}
                        height={`calc(100% - ${strokeOffset * 2}px)`}
                        rx={cornerRadius}
                        fill="none"
                        stroke="#000000"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: isPaused ? undefined : 1 }}
                        transition={{ 
                          duration: AUTOPLAY_DURATION, 
                          ease: 'linear'
                        }}
                        onAnimationComplete={() => {
                          if (!isPaused) {
                            nextSlide();
                          }
                        }}
                      />
                    )}
                  </svg>
                </motion.div>
              );
            })}
          </div>

          {/* Minimal Floating Arrow Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 lg:left-12 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-black shadow-xl border border-[#D3CBBA] backdrop-blur-md transition-all active:scale-95 focus:outline-none"
            aria-label="Previous Gallery Piece"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 lg:right-12 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-black shadow-xl border border-[#D3CBBA] backdrop-blur-md transition-all active:scale-95 focus:outline-none"
            aria-label="Next Gallery Piece"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Slide Progress Pill Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-3 mb-1">
          {GALLERY_PIECES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? 'w-7 bg-black'
                  : 'w-2 bg-[#D3CBBA] hover:bg-zinc-600'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Dynamic Editorial Content Block Beneath Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPiece.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto text-center mt-3 sm:mt-5"
          >
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-amber-900 block mb-1">
              {currentPiece.collectionName}
            </span>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-zinc-900 leading-tight">
              {currentPiece.title}
            </h2>

            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed max-w-md mx-auto line-clamp-2 sm:line-clamp-none">
              {currentPiece.description}
            </p>

            {/* CTAs */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => handleQuickAdd(currentPiece.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-black text-[#E8E2D3] hover:bg-zinc-800 text-xs font-bold tracking-[0.18em] uppercase transition-all active:scale-95 shadow-md group"
              >
                <span>EXPLORE PIECE • ৳{currentPiece.price}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleOpenProduct(currentPiece.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-[#D3CBBA] hover:bg-white text-zinc-900 text-xs font-bold tracking-[0.15em] uppercase transition-all"
              >
                <span>VIEW DETAILS</span>
              </button>

              <button
                onClick={handleShopAll}
                className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline inline-flex items-center space-x-1 sm:ml-3"
              >
                <span>FULL ATELIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
