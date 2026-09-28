import React, { useRef } from 'react';
import { PLACEMENTS } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { Placement } from '../types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const PlacementSelector: React.FC = () => {
  const { selectedPlacement, setSelectedPlacement, setSelectedCategory } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePlacementSelect = (placement: Placement) => {
    if (selectedPlacement === placement) {
      setSelectedPlacement(null);
    } else {
      setSelectedPlacement(placement);
      setSelectedCategory('all');
      const el = document.getElementById('product-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-[#E8E2D3] border-b border-[#D3CBBA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
            Browse by Keepsake Collection
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Explore our most-loved handcrafted resin categories and preservation creations
          </p>
          {selectedPlacement && (
            <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 bg-black text-[#E8E2D3] text-xs rounded-full">
              <span>Filtering by: <strong>{selectedPlacement}</strong></span>
              <button
                onClick={() => setSelectedPlacement(null)}
                className="p-0.5 hover:bg-zinc-800 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Container with Navigation Buttons */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#DFD8C7] border border-[#D3CBBA] shadow-md flex items-center justify-center text-zinc-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Placements Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto py-4 px-2 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PLACEMENTS.map((item, idx) => {
              const isSelected = selectedPlacement === item.name;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handlePlacementSelect(item.name)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex-shrink-0 flex flex-col items-center group/item text-center focus:outline-none"
                >
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-black ring-offset-2 scale-105 shadow-md'
                        : 'hover:ring-2 hover:ring-zinc-300 hover:ring-offset-1'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100 relative shadow-inner">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <span
                    className={`mt-2.5 text-xs sm:text-sm font-medium transition-colors ${
                      isSelected ? 'font-bold text-black' : 'text-zinc-700 group-hover/item:text-black'
                    }`}
                  >
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#DFD8C7] border border-[#D3CBBA] shadow-md flex items-center justify-center text-zinc-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
