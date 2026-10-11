import React from 'react';
import { X, RotateCcw, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLACEMENTS } from '../data/categories';
import { Placement } from '../types';

export interface FilterDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Price Range
  minPrice?: number;
  maxPrice?: number;
  selectedPriceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  // Placements / Tags
  selectedPlacement: Placement | null;
  onSelectPlacement: (placement: Placement | null) => void;
  // Minimum rating
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  // Reset all
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export const FilterDrawerModal: React.FC<FilterDrawerModalProps> = ({
  isOpen,
  onClose,
  minPrice = 0,
  maxPrice = 8000,
  selectedPriceRange,
  onPriceRangeChange,
  selectedPlacement,
  onSelectPlacement,
  minRating,
  onMinRatingChange,
  onResetFilters,
  totalResultsCount,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Slide-out Drawer from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 240 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#E8E2D3] border-l border-[#D3CBBA] shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#D3CBBA] flex items-center justify-between bg-[#F2EDE2]">
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900">
                  Filter Products
                </h3>
                {totalResultsCount !== undefined && (
                  <span className="text-xs bg-[#DFD8C7] text-zinc-700 px-2 py-0.5 rounded-full font-medium border border-[#D3CBBA]">
                    {totalResultsCount} results
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-black hover:bg-[#DFD8C7] rounded-full transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {/* 1. Price Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2">
                  Price Range (BDT)
                </label>
                <div className="flex items-center justify-between text-xs text-zinc-600 mb-2">
                  <span>৳{selectedPriceRange[0]}</span>
                  <span className="font-bold text-zinc-900">
                    Up to ৳{selectedPriceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step={100}
                  value={selectedPriceRange[1]}
                  onChange={(e) =>
                    onPriceRangeChange([
                      selectedPriceRange[0],
                      Number(e.target.value),
                    ])
                  }
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              {/* 2. Keepsake Placement / Type */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Placement & Keepsake Type
                  </label>
                  {selectedPlacement && (
                    <button
                      type="button"
                      onClick={() => onSelectPlacement(null)}
                      className="text-[11px] text-zinc-500 hover:text-black underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PLACEMENTS.map((item) => {
                    const isSelected = selectedPlacement === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() =>
                          onSelectPlacement(isSelected ? null : item.name)
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-black text-white border border-black font-semibold'
                            : 'bg-[#F2EDE2] hover:bg-[#DFD8C7] text-zinc-800 border border-[#D3CBBA]'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Minimum Customer Rating */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-800 block mb-2">
                  Customer Rating
                </label>
                <div className="flex gap-2">
                  {[0, 4.0, 4.5, 4.8, 5.0].map((rating) => {
                    const isSelected = minRating === rating;
                    return (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => onMinRatingChange(rating)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium flex items-center justify-center space-x-1 border transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black font-bold'
                            : 'bg-[#F2EDE2] hover:bg-[#DFD8C7] text-zinc-700 border-[#D3CBBA]'
                        }`}
                      >
                        {rating === 0 ? (
                          <span>All</span>
                        ) : (
                          <>
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{rating}+</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-[#D3CBBA] bg-[#F2EDE2] flex items-center gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex-1 py-3 px-4 bg-[#DFD8C7] hover:bg-[#D3CBBA] text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Apply</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
