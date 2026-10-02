import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

interface JewelryProductItem {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  badge: string;
  description: string;
}

const JEWELRY_SHOWCASE: JewelryProductItem[] = [
  {
    id: 'prod-forever-rose-pendant',
    sku: 'MS-107',
    name: 'Eternal Dried Rosebud Teardrop Pendant',
    subtitle: 'Preserved real red rosebud in UV crystal cabochon on 18K gold chain',
    category: 'Pendants & Necklaces',
    price: 550,
    originalPrice: 700,
    rating: 4.9,
    reviews: 175,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    badge: '★ BESTSELLER PENDANT',
    description: 'A real miniature red rosebud preserved forever inside a high-clarity resin teardrop cabochon, suspended on an anti-tarnish 18k gold plated chain.'
  },
  {
    id: 'prod-gold-monogram-keychain',
    sku: 'MS-102',
    name: '24K Gold Leaf Initial Monogram Locket',
    subtitle: 'Genuine 24K gold leaf with pressed baby’s breath florals',
    category: 'Monogram Jewelry & Charms',
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviews: 420,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=85',
    badge: 'MOST POPULAR GIFT',
    description: 'Hand-poured crystal alphabet letter keychain infused with genuine 24K gold foil flakes and a luxury metallic swivel lobster clasp.'
  },
  {
    id: 'prod-floral-ring-dish',
    sku: 'MS-106',
    name: 'Personalized Floral Trinket & Ring Dish',
    subtitle: 'Dried rose petals, botanical ferns & personalized gold lettering',
    category: 'Jewelry Trays & Dishes',
    price: 650,
    originalPrice: 850,
    rating: 4.8,
    reviews: 88,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85',
    badge: 'NEW BRIDAL EDITION',
    description: 'Scalloped edge jewelry tray adorned with real dried rose petals, botanical ferns, and custom gold script lettering.'
  },
  {
    id: 'prod-botanical-hair-clips',
    sku: 'MS-112',
    name: 'Pressed Daisy & Gold Foil Hair Clips (3 Pcs)',
    subtitle: 'Forget-me-nots & golden flakes set in gold alligator barrettes',
    category: 'Hair Jewelry & Accessories',
    price: 420,
    originalPrice: 550,
    rating: 4.8,
    reviews: 156,
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
    badge: 'TRENDING ACCESSORY',
    description: 'Handmade alligator hair barrettes cast with real pressed forget-me-nots, golden flakes, and delicate dried leaves.'
  }
];

export const HeroV2: React.FC = () => {
  const { addToCart, setQuickViewProduct, setSelectedCategory, setSelectedPlacement } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % JEWELRY_SHOWCASE.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + JEWELRY_SHOWCASE.length) % JEWELRY_SHOWCASE.length);
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

  const currentItem = JEWELRY_SHOWCASE[activeIndex];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const product = PRODUCTS.find((p) => p.id === currentItem.id);
    if (product) {
      addToCart(product, 'S');
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    const product = PRODUCTS.find((p) => p.id === currentItem.id);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  const handleExploreAll = () => {
    setSelectedCategory('jewelry');
    setSelectedPlacement(null);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#E8E2D3] border-b border-[#D3CBBA] py-10 sm:py-16 lg:py-20 select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-100/40 via-[#DDD3BE]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase text-amber-900 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>FINE JEWELRY & HEIRLOOM KEEPSAKES</span>
        </div>

        {/* Hero Section Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] max-w-2xl mx-auto leading-tight">
          Wearable Gems Infused with Real 24K Gold & Botanicals
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 font-normal max-w-xl mx-auto leading-relaxed">
          Explore our signature collection of handcrafted jewelry, pendants, and personalized monogram keepsakes.
        </p>

        {/* Center-Focused Product Carousel Stage */}
        <div className="relative mt-8 sm:mt-12 flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg border border-[#D3CBBA] backdrop-blur-md transition-all active:scale-95 focus:outline-none"
            aria-label="Previous Jewelry Piece"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-zinc-900 shadow-lg border border-[#D3CBBA] backdrop-blur-md transition-all active:scale-95 focus:outline-none"
            aria-label="Next Jewelry Piece"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 3-Card Carousel Track (Center Large, Left/Right Partially Visible) */}
          <div className="w-full flex items-center justify-center overflow-hidden py-4">
            <div className="relative flex items-center justify-center max-w-4xl w-full h-[340px] sm:h-[400px]">
              {JEWELRY_SHOWCASE.map((item, idx) => {
                const total = JEWELRY_SHOWCASE.length;
                let offset = (idx - activeIndex + total) % total;
                if (offset > total / 2) offset -= total;

                const isCenter = offset === 0;
                const isLeft = offset === -1 || (offset === total - 1 && total === 3);
                const isRight = offset === 1 || (offset === -(total - 1) && total === 3);
                const isVisible = isCenter || isLeft || isRight;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(idx);
                    }}
                    initial={false}
                    animate={{
                      x: isCenter ? '0%' : isLeft ? '-75%' : '75%',
                      scale: isCenter ? 1 : 0.82,
                      opacity: isCenter ? 1 : 0.45,
                      zIndex: isCenter ? 20 : 10,
                      filter: isCenter ? 'blur(0px)' : 'blur(1.5px)'
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className={`absolute w-[280px] sm:w-[380px] h-full rounded-2xl overflow-hidden bg-white border border-[#D3CBBA] shadow-2xl transition-shadow cursor-pointer ${
                      isCenter ? 'ring-1 ring-black/10' : 'hover:opacity-75'
                    }`}
                  >
                    <div className="relative w-full h-full overflow-hidden group">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Gradient Vignette Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                        <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-bold text-base text-white">৳{item.price}</span>
                          <span className="text-xs text-zinc-300 line-through">৳{item.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Product Detail Card (Below Carousel) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="max-w-xl mx-auto mt-6 bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#D3CBBA] shadow-md text-left"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
              <div>
                <div className="flex items-center space-x-2 text-xs text-amber-600 font-bold mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-zinc-800">{currentItem.rating}</span>
                  <span className="text-zinc-400">({currentItem.reviews} verified reviews)</span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-zinc-900">
                  {currentItem.name}
                </h2>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  OFFER PRICE
                </span>
                <span className="text-2xl font-bold text-zinc-900 font-serif">৳{currentItem.price}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-black text-[#E8E2D3] hover:bg-zinc-800 text-xs font-bold tracking-widest uppercase transition-all active:scale-95 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER THIS PIECE • ৳{currentItem.price}</span>
              </button>

              <button
                onClick={handleQuickView}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-3 rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-bold tracking-wider uppercase transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>QUICK VIEW</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination & Slide Counter */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            {JEWELRY_SHOWCASE.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  idx === activeIndex ? 'w-8 bg-black' : 'w-2 bg-[#D3CBBA] hover:bg-zinc-500'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
            0{activeIndex + 1} / 0{JEWELRY_SHOWCASE.length}
          </span>

          <button
            onClick={handleExploreAll}
            className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:underline inline-flex items-center space-x-1 ml-4"
          >
            <span>VIEW ALL JEWELRY</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
};
