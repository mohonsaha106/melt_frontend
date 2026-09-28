import React, { useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ProductGrid: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedPlacement,
    setSelectedPlacement,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    setIsCustomStudioOpen
  } = useStore();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom') {
          // Handled by custom studio card or category
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Placement filter
      if (selectedPlacement && !product.placements.includes(selectedPlacement)) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedPlacement, searchQuery, sortBy]);

  return (
    <section id="product-catalog" className="py-12 sm:py-16 bg-[#E8E2D3] min-h-[600px] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 font-serif">
            Artisan Keepsakes & Resin Creations
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Handcrafted with real botanicals, 24K gold flakes, and UV non-yellowing crystal epoxy.
          </p>
        </div>

        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'custom') {
                    setIsCustomStudioOpen(true);
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-[#E8E2D3] shadow-sm'
                    : 'bg-[#DFD8C7] hover:bg-[#D5CDBE] text-zinc-800 border border-[#D3CBBA]/60'
                }`}
              >
                {cat.id === 'custom' && <Sparkles className="w-3 h-3 inline-block mr-1 text-amber-500" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Controls Toolbar: Results Count & Sort Dropdown */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#D3CBBA]">
          <div className="flex items-center space-x-2 text-xs text-zinc-600">
            <span className="font-semibold text-zinc-900">{filteredProducts.length}</span>
            <span>keepsakes found</span>
            {selectedPlacement && (
              <span className="bg-[#DFD8C7] text-zinc-900 px-2 py-0.5 rounded-md font-medium border border-[#D3CBBA]">
                in {selectedPlacement}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div className="flex items-center space-x-1.5 text-xs text-zinc-700">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#DFD8C7] border border-[#D3CBBA] rounded-lg px-3 py-1.5 font-medium text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
            >
              <option value="featured">Featured & Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search Results State */
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#DFD8C7] flex items-center justify-center mx-auto text-zinc-500 mb-4 border border-[#D3CBBA]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">No matching keepsakes found</h3>
            <p className="text-xs text-zinc-600 mt-1">
              Try searching with different keywords or clearing your active filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPlacement(null);
              }}
              className="mt-5 px-5 py-2 rounded-full bg-black text-[#E8E2D3] text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
