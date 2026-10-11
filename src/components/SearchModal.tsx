import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    setQuickViewProduct
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isSearchModalOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchModalOpen]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K or Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        e.preventDefault();
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  // Real-time filtering matching SKU, name, category, placements, and description
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(query);
      const matchSku = product.sku.toLowerCase().includes(query);
      const matchCategory = product.category.toLowerCase().includes(query);
      const matchDescription = product.description.toLowerCase().includes(query);
      const matchPlacements = product.placements.some((p) => p.toLowerCase().includes(query));
      const matchTag = product.tag ? product.tag.toLowerCase().includes(query) : false;

      return matchName || matchSku || matchCategory || matchDescription || matchPlacements || matchTag;
    });
  }, [searchQuery]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Handle arrow key navigation and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredProducts[selectedIndex]) {
        handleSelectProduct(filteredProducts[selectedIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelectProduct = (product: Product) => {
    setIsSearchModalOpen(false);
    setQuickViewProduct(product);
  };

  const handleClose = () => {
    setIsSearchModalOpen(false);
  };

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <AnimatePresence>
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Dimming the whole screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Top Search Bar & Modal Dropdown starting flush from the very top */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-white shadow-2xl z-10 border-b border-zinc-200"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              {/* Top Search Input Row */}
              <div className="flex items-center h-20 sm:h-24 w-full">
                <Search className="w-5 h-5 text-zinc-400 flex-shrink-0 stroke-[1.75]" />
                
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search designs..."
                  className="flex-1 bg-transparent px-4 text-base sm:text-lg text-zinc-900 placeholder:text-zinc-400 outline-none border-none font-normal"
                  autoComplete="off"
                  spellCheck="false"
                />

                <button
                  onClick={handleClose}
                  className="p-2 text-zinc-400 hover:text-black transition-colors rounded-full focus:outline-none"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 stroke-[1.75]" />
                </button>
              </div>

              {/* Search Results List (Drops down when query is entered) */}
              {hasQuery && (
                <>
                  <div className="border-t border-zinc-200" />
                  
                  <div
                    ref={listRef}
                    className="max-h-[60vh] sm:max-h-[460px] overflow-y-auto search-modal-scrollbar py-3 bg-white"
                  >
                    {filteredProducts.length > 0 ? (
                      <div className="divide-y divide-zinc-100/80">
                        {filteredProducts.map((product, index) => {
                          const isSelected = index === selectedIndex;
                          return (
                            <div
                              key={product.id}
                              data-index={index}
                              onClick={() => handleSelectProduct(product)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`flex items-center gap-4 px-3 sm:px-4 py-3 sm:py-3.5 cursor-pointer transition-colors rounded-lg group ${
                                isSelected ? 'bg-zinc-100/90' : 'hover:bg-zinc-50'
                              }`}
                            >
                              {/* Design Thumbnail */}
                              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-white border border-zinc-100 flex items-center justify-center p-1 overflow-hidden flex-shrink-0 shadow-2xs">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                                  loading="lazy"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80';
                                  }}
                                />
                              </div>

                              {/* SKU Code & Design Title */}
                              <div className="flex-1 min-w-0">
                                <div className="text-xs text-zinc-400 font-medium tracking-wide uppercase">
                                  {product.sku}
                                </div>
                                <div className="text-sm sm:text-[15px] font-normal text-zinc-800 truncate group-hover:text-black">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 px-6 text-center">
                        <p className="text-sm text-zinc-600 font-medium">
                          No designs found for &ldquo;<span className="text-zinc-900 font-semibold">{searchQuery}</span>&rdquo;
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Try searching for another keyword, SKU code, or category
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
