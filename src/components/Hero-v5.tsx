import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, Pause } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface VideoCampaignSlide {
  id: string;
  collectionLabel: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  categoryFilter?: 'all' | 'preservation' | 'jewelry' | 'keychains' | 'bookmarks' | 'coasters' | 'clocks' | 'custom';
  isCustomStudio?: boolean;
  videoSrc: string;
  posterImage: string;
  editionBadge: string;
}

const VIDEO_CAMPAIGNS: VideoCampaignSlide[] = [
  {
    id: 'video-everyday-elegance',
    collectionLabel: 'NEW COLLECTION • 2026',
    headline: 'The Art of Everyday Elegance',
    subheadline: 'Hand-poured crystal cabochons encasing eternal botanicals and genuine 24K gold leaf on anti-tarnish 18K gold chains.',
    ctaText: 'EXPLORE COLLECTION',
    categoryFilter: 'jewelry',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-golden-earrings-41617-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'FINE BOTANICAL JEWELRY'
  },
  {
    id: 'video-golden-hour',
    collectionLabel: 'GOLDEN HOUR SERIES',
    headline: 'Jewelry Inspired by Living Flora',
    subheadline: 'Real pressed forget-me-nots and delicate miniature rosebuds captured in everlasting museum clarity.',
    ctaText: 'DISCOVER GOLD GEMS',
    categoryFilter: 'jewelry',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-putting-on-a-gold-ring-41615-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1920&q=85',
    editionBadge: '24K GOLD LEAF'
  },
  {
    id: 'video-monograms',
    collectionLabel: 'HEIRLOOM MONOGRAMS',
    headline: 'Personalized Initials Cast in Gold',
    subheadline: 'Artisanal alphabet charms infused with genuine gold foil flakes and pressed white baby’s breath florals.',
    ctaText: 'SHOP MONOGRAMS (৳350)',
    categoryFilter: 'keychains',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-putting-on-a-golden-necklace-41616-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'BESPOKE GIFTS'
  },
  {
    id: 'video-bridal-keepsakes',
    collectionLabel: 'CEREMONIAL BRIDAL SERIES',
    headline: 'For Moments Worth Remembering',
    subheadline: 'Immortalize your wedding reception bouquet and bridal mala in UV archival resin with custom name calligraphy.',
    ctaText: 'BRIDAL PRESERVATION',
    isCustomStudio: true,
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-wearing-golden-earrings-41617-large.mp4',
    posterImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1920&q=85',
    editionBadge: 'CUSTOM COMMISSIONS'
  }
];

export const HeroV5: React.FC = () => {
  const { setSelectedCategory, setSelectedPlacement, setIsCustomStudioOpen } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % VIDEO_CAMPAIGNS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + VIDEO_CAMPAIGNS.length) % VIDEO_CAMPAIGNS.length);
  }, []);

  // Autoplay slide timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
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

  const slide = VIDEO_CAMPAIGNS[currentSlide];

  const handleCtaClick = (campaign: VideoCampaignSlide) => {
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-black text-white w-full h-[560px] sm:h-[640px] lg:h-[720px] select-none border-b border-[#D3CBBA]"
      aria-label="Cinematic Video Jewelry Campaign"
    >
      {/* Full-Bleed Video Background with Smooth Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <video
            ref={videoRef}
            src={slide.videoSrc}
            poster={slide.posterImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Fallback Image Poster if Video is unsupported */}
          <img
            src={slide.posterImage}
            alt={slide.headline}
            className="w-full h-full object-cover object-center absolute inset-0 -z-10"
          />

          {/* Restrained Luxury Gradient Scrim for Perfect Typography Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Typography & Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge & Label */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-black text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
                  {slide.editionBadge}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300">
                  {slide.collectionLabel}
                </span>
              </div>

              {/* Large Cinematic Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] text-balance">
                {slide.headline}
              </h1>

              {/* Supporting Description */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-zinc-200 font-normal leading-relaxed max-w-xl">
                {slide.subheadline}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleCtaClick(slide)}
                  className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 active:scale-95 shadow-2xl group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsCustomStudioOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-4 rounded-full border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-bold tracking-[0.18em] uppercase transition-all backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>CUSTOM STUDIO</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
        {/* Numbered Indicators + Slender Progress Lines */}
        <div className="flex items-center space-x-2 sm:space-x-3 pointer-events-auto bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15">
          {VIDEO_CAMPAIGNS.map((c, idx) => {
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
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Video Play/Pause Toggle */}
          <button
            onClick={togglePlay}
            className="p-1 text-zinc-400 hover:text-white transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Minimal Previous / Next Arrows */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={prevSlide}
            className="p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all active:scale-95"
            aria-label="Previous Campaign"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
            aria-label="Next Campaign"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
