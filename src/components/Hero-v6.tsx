import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Star, ArrowUpRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

interface ProductRevealChapter {
  id: string;
  tabTitle: string;
  collectionName: string;
  headline: string;
  subheadline: string;
  videoSrc: string;
  posterImage: string;
  productId: string;
  productSku: string;
  productName: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  productThumbnail: string;
  specs: string[];
}

const REVEAL_CHAPTERS: ProductRevealChapter[] = [
  {
    id: 'chapter-rosebud',
    tabTitle: '01 • PENDANT',
    collectionName: 'SOLITAIRE COLLECTION',
    headline: 'Eternal Rosebud Teardrop',
    subheadline: 'A genuine botanical rosebud suspended in crystal clarity with 24K gold foil flakes.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-golden-earrings-41617-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85',
    productId: 'prod-forever-rose-pendant',
    productSku: 'MS-107',
    productName: 'Eternal Rosebud Teardrop Pendant',
    price: 550,
    originalPrice: 700,
    rating: 5.0,
    reviews: 175,
    productThumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    specs: ['Real Preserved Rosebud', '24K Gold Leaf Veins', '18K Gold-Plated Chain']
  },
  {
    id: 'chapter-monogram',
    tabTitle: '02 • MONOGRAM',
    collectionName: 'PERSONALIZED GEMS',
    headline: '24K Gold Leaf Alphabet Locket',
    subheadline: 'Custom initial keychain hand-poured with real gold flakes and pressed baby’s breath.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-putting-on-a-golden-necklace-41616-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=85',
    productId: 'prod-gold-monogram-keychain',
    productSku: 'MS-102',
    productName: '24K Gold Initial Monogram Locket',
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviews: 420,
    productThumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    specs: ['Genuine 24K Gold Foil', 'Pressed Baby’s Breath', 'Metallic Swivel Clasp']
  },
  {
    id: 'chapter-ring-dish',
    tabTitle: '03 • BRIDAL DISH',
    collectionName: 'CEREMONIAL HEIRLOOMS',
    headline: 'Floral Trinket & Ring Dish',
    subheadline: 'Scalloped jewelry tray adorned with real dried rose petals and gold script calligraphy.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-putting-on-a-gold-ring-41615-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=85',
    productId: 'prod-floral-ring-dish',
    productSku: 'MS-106',
    productName: 'Personalized Floral Trinket Ring Dish',
    price: 650,
    originalPrice: 850,
    rating: 4.8,
    reviews: 88,
    productThumbnail: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80',
    specs: ['Dried Bridal Florals', 'Custom Gold Script', 'Scalloped Gloss Edge']
  },
  {
    id: 'chapter-hair-clips',
    tabTitle: '04 • HAIR JEWELRY',
    collectionName: 'BOTANICAL ACCESSORIES',
    headline: 'Pressed Daisy Gold Clips',
    subheadline: 'Handmade alligator hair barrettes cast with forget-me-nots and golden leaf accents.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-golden-earrings-41617-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=85',
    productId: 'prod-botanical-hair-clips',
    productSku: 'MS-112',
    productName: 'Pressed Daisy & Gold Hair Clips (3 Pcs)',
    price: 420,
    originalPrice: 550,
    rating: 4.8,
    reviews: 156,
    productThumbnail: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    specs: ['Real Forget-Me-Nots', 'Gold Foil Flakes', 'Set of 3 Barrettes']
  }
];

export const HeroV6: React.FC = () => {
  const { addToCart, setQuickViewProduct, setSelectedCategory, setSelectedPlacement } = useStore();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextChapter = useCallback(() => {
    setActiveChapterIndex((prev) => (prev + 1) % REVEAL_CHAPTERS.length);
  }, []);

  const prevChapter = useCallback(() => {
    setActiveChapterIndex((prev) => (prev - 1 + REVEAL_CHAPTERS.length) % REVEAL_CHAPTERS.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextChapter();
      if (e.key === 'ArrowLeft') prevChapter();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextChapter, prevChapter]);

  const currentChapter = REVEAL_CHAPTERS[activeChapterIndex];

  const handleQuickAdd = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 'S');
      setAddedProductId(productId);
      setTimeout(() => setAddedProductId(null), 2000);
    }
  };

  const handleQuickView = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  const handleShopCatalog = () => {
    setSelectedCategory('jewelry');
    setSelectedPlacement(null);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-black text-white w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] select-none border-b border-[#D3CBBA] flex flex-col justify-between py-8 sm:py-12"
      aria-label="Interactive Video and Product Reveal"
    >
      {/* Background Cinematic Video with Seamless Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
          <video
            ref={videoRef}
            src={currentChapter.videoSrc}
            poster={currentChapter.posterImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <img
            src={currentChapter.posterImage}
            alt={currentChapter.headline}
            className="w-full h-full object-cover object-center absolute inset-0 -z-10"
          />

          {/* Cinematic Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Top Header & Chapter Pill Tabs */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>MELTSPARKLE CINEMATIC REVEAL</span>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/15">
          {REVEAL_CHAPTERS.map((chap, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {chap.tabTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content & Floating Product Reveal Card */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Cinematic Title & Story (Spans 7 cols) */}
          <div className="lg:col-span-7 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id + '-text'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55 }}
              >
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-amber-300 block mb-3">
                  {currentChapter.collectionName}
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08] text-balance">
                  {currentChapter.headline}
                </h1>

                <p className="mt-4 text-sm sm:text-base lg:text-lg text-zinc-200 font-normal leading-relaxed max-w-lg">
                  {currentChapter.subheadline}
                </p>

                <div className="mt-6 flex items-center space-x-4">
                  <button
                    onClick={handleShopCatalog}
                    className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 active:scale-95 shadow-xl"
                  >
                    <span>VIEW COLLECTION</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Floating Product Reveal Card (Spans 5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id + '-reveal'}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 text-zinc-900 border border-white/30 shadow-2xl text-left"
              >
                {/* Header info */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    FEATURED IN VIDEO
                  </span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="ml-1 font-bold text-zinc-800">{currentChapter.rating}</span>
                    <span className="text-zinc-400 text-[10px] ml-1">({currentChapter.reviews})</span>
                  </div>
                </div>

                {/* Product Thumbnail & Price */}
                <div className="flex items-center space-x-4 my-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#DFD8C7] border border-zinc-200 flex-shrink-0 shadow-inner">
                    <img
                      src={currentChapter.productThumbnail}
                      alt={currentChapter.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      {currentChapter.productSku}
                    </span>
                    <h3 className="font-serif font-bold text-base text-zinc-900 leading-snug truncate">
                      {currentChapter.productName}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-serif font-bold text-lg text-zinc-900">
                        ৳{currentChapter.price}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        ৳{currentChapter.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spec Bullets */}
                <div className="space-y-1.5 py-3 border-t border-zinc-100 text-xs text-zinc-600">
                  {currentChapter.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Add to Cart & Quick View */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center space-x-2">
                  <button
                    onClick={() => handleQuickAdd(currentChapter.productId)}
                    className={`flex-1 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-1.5 shadow-md ${
                      addedProductId === currentChapter.productId
                        ? 'bg-emerald-700 text-white'
                        : 'bg-black text-white hover:bg-zinc-800'
                    }`}
                  >
                    {addedProductId === currentChapter.productId ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>ADDED TO CART</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ORDER • ৳{currentChapter.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleQuickView(currentChapter.productId)}
                    className="p-3 rounded-full border border-zinc-200 hover:bg-zinc-100 text-zinc-800 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Slider Navigation */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="text-xs font-mono font-bold tracking-widest text-zinc-400">
          0{activeChapterIndex + 1} / 0{REVEAL_CHAPTERS.length}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={prevChapter}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
            aria-label="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextChapter}
            className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-md"
            aria-label="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
