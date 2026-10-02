import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SearchFilterBar, CategoryFilterItem } from '../components/SearchFilterBar';
import { FilterDrawerModal } from '../components/FilterDrawerModal';
import { useStore } from '../context/StoreContext';
import { Placement } from '../types';
import { 
  Sparkles, 
  ArrowLeft,
  ShoppingBag,
  RefreshCw
} from 'lucide-react';

const SHOP_CATEGORIES: CategoryFilterItem[] = [
  { id: 'all', label: 'All Designs' },
  { id: 'preservation', label: 'Preservation' },
  { id: 'keychains', label: 'Keychains' },
  { id: 'bookmarks', label: 'Bookmarks' },
  { id: 'clocks', label: 'Geode Clocks' },
  { id: 'coasters', label: 'Coasters' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'custom', label: 'Custom Studio' },
  { id: 'aesthetic', label: 'Aesthetic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'floral', label: 'Floral & Botanicals' },
  { id: 'wedding', label: 'Wedding Keepsakes' },
  { id: 'baby', label: 'Baby Keepsakes' },
  { id: 'nightlamps', label: 'Letter Nightlamps' },
  { id: 'gold-foil', label: '24K Gold Foil' },
  { id: 'arabic', label: 'Arabic Calligraphy' },
  { id: 'under-500', label: 'Under ৳500' },
  { id: 'under-1500', label: 'Under ৳1500' },
];

export const ShopPage: React.FC = () => {
  const { setIsCustomStudioOpen } = useStore();
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [shopSearch, setShopSearch] = useState('');
  
  // Advanced Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [minRating, setMinRating] = useState<number>(0);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Shop All Handcrafted Keepsakes & Resin Art | Melt Sparkle';
  }, []);

  // Filter and sort all products dynamically based on search, category, and advanced filters
  const processedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Tag Filter
      if (selectedCat !== 'all') {
        if (selectedCat === 'custom') {
          // Triggers custom studio
        } else if (selectedCat === 'under-500') {
          if (product.price > 500) return false;
        } else if (selectedCat === 'under-1500') {
          if (product.price > 1500) return false;
        } else if (selectedCat === 'floral') {
          if (!product.placements.includes('Flower Preservation') && !product.placements.includes('Floral Bookmarks')) return false;
        } else if (selectedCat === 'wedding') {
          if (!product.placements.includes('Wedding Keepsakes')) return false;
        } else if (selectedCat === 'baby') {
          if (!product.placements.includes('Baby Keepsakes')) return false;
        } else if (selectedCat === 'nightlamps') {
          if (!product.placements.includes('Letter Nightlamps')) return false;
        } else if (selectedCat === 'gold-foil') {
          if (!product.description.toLowerCase().includes('gold')) return false;
        } else if (selectedCat === 'arabic') {
          if (!product.sku.includes('111') && !product.name.toLowerCase().includes('arabic') && !product.name.toLowerCase().includes('calligraphy')) return false;
        } else if (product.category !== selectedCat) {
          return false;
        }
      }

      // 2. Advanced Filters: Placement
      if (selectedPlacement && !product.placements.includes(selectedPlacement)) {
        return false;
      }

      // 3. Advanced Filters: Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // 4. Advanced Filters: Minimum Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 5. Keyword Search Query
      if (shopSearch.trim() !== '') {
        const q = shopSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'discount-high') {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      }
      return 0; // Default / Featured
    });
  }, [selectedCat, selectedPlacement, priceRange, minRating, shopSearch, sortOption]);

  const handleSelectCategory = (catId: string) => {
    if (catId === 'custom') {
      setIsCustomStudioOpen(true);
    } else {
      setSelectedCat(catId);
    }
  };

  const handleResetFilters = () => {
    setPriceRange([0, 8000]);
    setSelectedPlacement(null);
    setMinRating(0);
    setSelectedCat('all');
    setShopSearch('');
    setSortOption('default');
  };

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Quick Route Navigation */}
        <div className="flex items-center justify-between py-3 mb-6 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">Shop Atelier</span>
          </nav>

          <div className="flex items-center space-x-2">
            <Link
              to="/sepcial-offer"
              className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-rose-500/10 border border-rose-600/20 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>Special Offers</span>
            </Link>
          </div>
        </div>

        {/* Reusable Search & Filter Component */}
        <div className="mb-8">
          <SearchFilterBar
            title="The Complete Keepsake Collection"
            itemCount={processedProducts.length}
            itemCountLabel="handcrafted pieces available"
            searchValue={shopSearch}
            onSearchChange={setShopSearch}
            searchPlaceholder="Search products by name, SKU, or style..."
            categories={SHOP_CATEGORIES}
            selectedCategory={selectedCat}
            onSelectCategory={handleSelectCategory}
            initialVisibleCount={8}
            sortValue={sortOption}
            onSortChange={setSortOption}
            sortOptions={[
              { id: 'default', label: 'Default' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
              { id: 'rating', label: 'Customer Rating' },
              { id: 'discount-high', label: 'Highest Discount' },
            ]}
          />
        </div>

        {/* Product Cards Grid: Mobile-first 2 columns, tablet 3, desktop 4 */}
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {processedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showDiscountBadge={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#F2EDE2] rounded-3xl border border-[#D3CBBA] p-8 max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-900 font-serif">No keepsakes found</h3>
            <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
              We couldn't find any pieces matching your search query or selected filters. Try broadening your criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center space-x-2 px-6 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Custom Keepsake Atelier Banner */}
        <div className="mt-16 bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Bespoke Handcrafted Orders</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif">
              Can't Find Your Exact Vision?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-2 leading-relaxed">
              Use our live interactive Custom Keepsake Studio to personalize resin colors, 24K gold foil, wedding garland preservation, baby initials, and wood base LED lights.
            </p>
          </div>

          <button
            onClick={() => setIsCustomStudioOpen(true)}
            className="px-7 py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-widest rounded-full transition-transform active:scale-95 shadow-md shrink-0"
          >
            Launch Custom Studio
          </button>
        </div>

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
        totalResultsCount={processedProducts.length}
      />
    </div>
  );
};
