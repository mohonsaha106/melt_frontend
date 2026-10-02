import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Pause, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface JewelryCampaignSlide {
  id: string;
  collectionLabel: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  categoryFilter?: 'all' | 'preservation' | 'jewelry' | 'keychains' | 'bookmarks' | 'coasters' | 'clocks' | 'custom';
  isCustomStudio?: boolean;
  imageUrl: string;
  editionBadge: string;
  textPosition: 'left' | 'center-left';
}

const JEWELRY_CAMPAIGNS: JewelryCampaignSlide[] = [
  {
    id: 'campaign-signature',
    collectionLabel: 'THE SIGNATURE COLLECTION',
    headline: 'Pieces That Become Part of Your Story.',
    subheadline: 'Hand-poured crystal cabochons encasing eternal dried botanicals and 24K gold foil flakes on anti-tarnish 18K gold chains.',
    ctaText: 'EXPLORE COLLECTION',
    categoryFilter: 'jewelry',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'FINE BOTANICAL JEWELRY',
    textPosition: 'left'
  },
  {
    id: 'campaign-golden-hour',
    collectionLabel: 'GOLDEN HOUR',
    headline: 'Jewelry Inspired by Light & Living Flora.',
    subheadline: 'Real pressed forget-me-nots, baby’s breath petals, and delicate miniature rosebuds captured in everlasting clarity.',
    ctaText: 'DISCOVER GOLD GEMS',
    categoryFilter: 'jewelry',
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'HAND-CRAFTED ATELIER',
    textPosition: 'center-left'
  },
  {
    id: 'campaign-everyday-icons',
    collectionLabel: 'EVERYDAY ICONS',
    headline: 'Minimal Pieces. Maximum Character.',
    subheadline: 'Artisanal alphabet initials, locket charms, and botanical barrettes designed for everyday effortless elegance.',
    ctaText: 'SHOP EVERYDAY ICONS',
    categoryFilter: 'keychains',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'PERSONALIZED INITIALS (৳350)',
    textPosition: 'left'
  },
  {
    id: 'campaign-celebrate',
    collectionLabel: 'MADE TO CELEBRATE',
    headline: 'For Moments Worth Remembering.',
    subheadline: 'Bespoke bridal ring dishes, heirloom keepsake cubes, and custom anniversary treasures handcrafted uniquely for you.',
    ctaText: 'EXPLORE CELEBRATION',
    isCustomStudio: true,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'CUSTOM MADE TO ORDER',
    textPosition: 'center-left'
  }
];

export const HeroV3: React.FC = () => {
  const { setSelectedCategory, setSelectedPlacement, setIsCustomStudioOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % JEWELRY_CAMPAIGNS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + JEWELRY_CAMPAIGNS.length) % JEWELRY_CAMPAIGNS.length);
  }, []);

  // Autoplay Timer (6s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleCtaClick = (campaign: JewelryCampaignSlide) => {
    if (campaign.isCustomStudio) {
      setIsCustomStudioOpen(true);
      return;
    }

    if (campaign.categoryFilter) {
      setSelectedCategory(campaign.categoryFilter);
      setSelectedPlacement(null);
    }

    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = JEWELRY_CAMPAIGNS[currentSlide];

  return (
    <section
      className="relative overflow-hidden bg-black text-white w-full h-[540px] sm:h-[620px] lg:h-[700px] select-none border-b border-[#D3CBBA]"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Cinematic Jewelry Campaign Carousel"
    >
      {/* Background Images with Slow Ken Burns Scale & Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.imageUrl}
            alt={slide.headline}
            className="w-full h-full object-cover object-center"
          />
          {/* Dual Gradient Scrim for Perfect Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className={`max-w-2xl text-left ${slide.textPosition === 'center-left' ? 'sm:pl-6' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              {/* Collection Eyebrow & Tag */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-black text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
                  {slide.editionBadge}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300">
                  {slide.collectionLabel}
                </span>
              </div>

              {/* Campaign Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] text-balance">
                {slide.headline}
              </h1>

              {/* Subheadline Copy */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-zinc-200 font-normal leading-relaxed max-w-xl">
                {slide.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleCtaClick(slide)}
                  className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 active:scale-95 shadow-xl group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsCustomStudioOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-bold tracking-[0.18em] uppercase transition-all backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>CUSTOM STUDIO</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Carousel Bar: Counter, Progress Bar, Prev/Next Controls */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
        {/* Numbered Indicators with Progress Bars */}
        <div className="flex items-center space-x-2 sm:space-x-3 pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
          {JEWELRY_CAMPAIGNS.map((c, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={c.id}
                onClick={() => setCurrentSlide(idx)}
                className={`group flex items-center space-x-1.5 focus:outline-none transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className="text-[11px] font-bold font-mono">0{idx + 1}</span>
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Autoplay Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            title={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>

        {/* Minimalist Prev/Next Arrows */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
