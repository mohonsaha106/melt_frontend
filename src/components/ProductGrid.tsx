import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SearchFilterBar, CategoryFilterItem } from './SearchFilterBar';
import { FilterDrawerModal } from './FilterDrawerModal';
import { AnimatePresence, motion } from 'framer-motion';

// Rich categories and theme tags matching designs
const CATALOG_CATEGORIES: CategoryFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'preservation', label: 'Preservation' },
  { id: 'keychains', label: 'Keychains' },
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'clocks', label: 'Geode Clocks' },
  { id: 'coasters', label: 'Coasters' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'custom', label: 'Custom Studio' },
  { id: 'aesthetic', label: 'Aesthetic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'floral', label: 'Floral' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'baby', label: 'Baby Keepsakes' },
  { id: 'nightlamps', label: 'Nightlamps' },
  { id: 'gold-foil', label: '24K Gold Foil' },
  { id: 'arabic', label: 'Arabic Art' },
];

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

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [minRating, setMinRating] = useState<number>(0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category / Tag filter
      const cat = selectedCategory as string;
      if (cat !== 'all') {
        if (cat === 'custom') {
          // Handled by custom studio
        } else if (cat === 'aesthetic' || cat === 'minimal') {
          // Tag / style matching
        } else if (cat === 'floral') {
          if (!product.placements.includes('Flower Preservation') && !product.placements.includes('Floral Bookmarks')) return false;
        } else if (cat === 'wedding') {
          if (!product.placements.includes('Wedding Keepsakes')) return false;
        } else if (cat === 'baby') {
          if (!product.placements.includes('Baby Keepsakes')) return false;
        } else if (cat === 'nightlamps') {
          if (!product.placements.includes('Letter Nightlamps')) return false;
        } else if (cat === 'gold-foil') {
          if (!product.description.toLowerCase().includes('gold')) return false;
        } else if (cat === 'arabic') {
          if (!product.sku.includes('111') && !product.name.toLowerCase().includes('arabic') && !product.name.toLowerCase().includes('calligraphy')) return false;
        } else if (product.category !== cat) {
          return false;
        }
      }

      // Placement filter
      if (selectedPlacement && !product.placements.includes(selectedPlacement)) {
        return false;
      }

      // Price Range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Min Rating filter
      if (minRating > 0 && product.rating < minRating) {
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
  }, [selectedCategory, selectedPlacement, searchQuery, sortBy, priceRange, minRating]);

  const handleResetFilters = () => {
    setPriceRange([0, 8000]);
    setSelectedPlacement(null);
    setMinRating(0);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const handleSelectCategory = (catId: string) => {
    if (catId === 'custom') {
      setIsCustomStudioOpen(true);
    } else {
      setSelectedCategory(catId as any);
    }
  };

  return (
    <section id="product-catalog" className="py-12 sm:py-16 bg-[#E8E2D3] min-h-[600px] border-b border-[#D3CBBA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reusable Search & Filter Bar Component */}
        <SearchFilterBar
          title="Shop All Designs"
          itemCount={filteredProducts.length}
          itemCountLabel="designs available"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search by name or design code..."
          categories={CATALOG_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          initialVisibleCount={8}
          sortValue={sortBy}
          onSortChange={(val) => setSortBy(val as any)}
          sortOptions={[
            { id: 'featured', label: 'Default' },
            { id: 'price-low', label: 'Price: Low to High' },
            { id: 'price-high', label: 'Price: High to Low' },
            { id: 'rating', label: 'Highest Rated' },
          ]}
        />

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center bg-[#F2EDE2] rounded-3xl mt-8 border border-[#D3CBBA] p-8">
            <h3 className="text-lg font-bold text-zinc-900">No designs found</h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
              We couldn't find any keepsakes matching your search or filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2.5 bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Advanced Filter Drawer Modal */}
      <FilterDrawerModal
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedPriceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        selectedPlacement={selectedPlacement}
        onSelectPlacement={setSelectedPlacement}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredProducts.length}
      />
    </section>
  );
};
