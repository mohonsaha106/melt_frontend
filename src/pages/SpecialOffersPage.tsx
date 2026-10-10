import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SearchFilterBar, CategoryFilterItem } from '../components/SearchFilterBar';
import { FilterDrawerModal } from '../components/FilterDrawerModal';
import { Placement } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Tag, 
  Sparkles, 
  ArrowLeft
} from 'lucide-react';

export const SpecialOffersPage: React.FC = () => {
  const { t, language } = useLanguage();

  const offerCategories: CategoryFilterItem[] = useMemo(() => [
    { id: 'all', label: language === 'bn' ? 'সকল' : 'All' },
    { id: 'preservation', label: language === 'bn' ? 'ফুল সংরক্ষণ' : 'Preservation' },
    { id: 'keychains', label: language === 'bn' ? 'কিচেন' : 'Keychains' },
    { id: 'bookmarks', label: language === 'bn' ? 'বুকমার্ক' : 'Bookmarks' },
    { id: 'clocks', label: language === 'bn' ? 'জিওড ঘড়ি' : 'Geode Clocks' },
    { id: 'coasters', label: language === 'bn' ? 'কোস্টার' : 'Coasters' },
    { id: 'jewelry', label: language === 'bn' ? 'গহনা' : 'Jewelry' },
    { id: 'custom', label: language === 'bn' ? 'কাস্টম' : 'Custom' },
    { id: 'under-500', label: language === 'bn' ? '৳৫০০ এর নিচে' : 'Under ৳500' },
    { id: 'under-1500', label: language === 'bn' ? '৳১৫০০ এর নিচে' : 'Under ৳1500' },
    { id: 'high-discount', label: language === 'bn' ? '২০%+ ছাড়' : '20%+ OFF' },
    { id: 'bridal', label: language === 'bn' ? 'বিয়ের স্মারক' : 'Wedding' },
    { id: 'botanical', label: language === 'bn' ? 'ফুল ও পাতা' : 'Floral & Botanical' },
  ], [language]);

  const [selectedCat, setSelectedCat] = useState('all');
  const [sortOption, setSortOption] = useState('discount-high');
  const [offerSearch, setOfferSearch] = useState('');
  
  // Advanced Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [minRating, setMinRating] = useState<number>(0);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = language === 'bn'
      ? 'স্পেশাল অফার ও ডিসকাউন্ট কিপসেক | মেল্ট স্পার্কল'
      : 'Special Offers & Deals | Melt Sparkle';
  }, [language]);

  // Filter products that have promotional pricing (originalPrice > price)
  const baseOffers = useMemo(() => {
    return PRODUCTS.filter((p) => p.originalPrice && p.originalPrice > p.price);
  }, []);

  // Filter and sort offer products dynamically based on search, category, and advanced filters
  const processedOffers = useMemo(() => {
    return baseOffers.filter((product) => {
      // 1. Category Tag Filter
      if (selectedCat !== 'all') {
        if (selectedCat === 'under-500') {
          if (product.price > 500) return false;
        } else if (selectedCat === 'under-1500') {
          if (product.price > 1500) return false;
        } else if (selectedCat === 'high-discount') {
          const disc = product.originalPrice ? ((product.originalPrice - product.price) / product.originalPrice) * 100 : 0;
          if (disc < 20) return false;
        } else if (selectedCat === 'bridal') {
          if (!product.placements.includes('Wedding Keepsakes')) return false;
        } else if (selectedCat === 'botanical') {
          if (!product.placements.includes('Flower Preservation') && !product.placements.includes('Floral Bookmarks')) return false;
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
      if (offerSearch.trim() !== '') {
        const q = offerSearch.toLowerCase();
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
      const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
      const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;

      if (sortOption === 'discount-high') return discountB - discountA;
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [baseOffers, selectedCat, selectedPlacement, priceRange, minRating, offerSearch, sortOption]);

  const handleResetFilters = () => {
    setPriceRange([0, 8000]);
    setSelectedPlacement(null);
    setMinRating(0);
    setSelectedCat('all');
    setOfferSearch('');
  };

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between py-3 mb-6 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোম' : 'Home'}</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              {t.offers.title}
            </span>
          </nav>

          <Link
            to="/"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1 py-1 px-3 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] transition-colors"
          >
            <span>{t.footer.allKeepsakes}</span>
          </Link>
        </div>

        {/* Reusable Search & Filter Component */}
        <div className="mb-8">
          <SearchFilterBar
            title={language === 'bn' ? 'ডিসকাউন্ট ও বিশেষ অফারের কিপসেক' : 'Shop All Designs on Offer'}
            itemCount={processedOffers.length}
            itemCountLabel={language === 'bn' ? 'টি অফার ডিজাইন' : 'designs available'}
            searchValue={offerSearch}
            onSearchChange={setOfferSearch}
            searchPlaceholder={t.productCatalog.searchPlaceholder}
            categories={offerCategories}
            selectedCategory={selectedCat}
            onSelectCategory={setSelectedCat}
            initialVisibleCount={8}
            sortValue={sortOption}
            onSortChange={setSortOption}
          />
        </div>

        {/* Product Cards Grid: Mobile-first 2 columns, tablet 3, desktop 4 */}
        {processedOffers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {processedOffers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showDiscountBadge={true}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#F2EDE2] rounded-3xl border border-[#D3CBBA] p-8">
            <Tag className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900">
              {language === 'bn' ? 'কোনো অফার পণ্য পাওয়া যায়নি' : 'No offer items found'}
            </h3>
            <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
              {language === 'bn'
                ? 'সার্চ ফিল্টার রিসেট করে সকল বিশেষ অফার দেখুন।'
                : 'Try adjusting your search query or clear filters to view all promotional keepsakes.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider active:scale-95 shadow-sm"
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* Custom Keepsake Banner */}
        <div className="mt-16 bg-[#DFD8C7] rounded-2xl p-6 sm:p-8 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? 'কাস্টম পার্সোনালাইজেশন খুঁজছেন?' : 'Looking for bespoke personalization?'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 font-serif">
              {language === 'bn' ? 'আপনার নিজস্ব পছন্দের কিপসেক তৈরি করুন' : 'Design Your Custom Keepsake Piece'}
            </h3>
            <p className="text-xs text-sm text-zinc-700 mt-1">
              {language === 'bn'
                ? 'বিয়ের মালা, শিশুর স্মৃতি বা মনোগ্রাম অক্ষরের সাথে কাস্টম গোল্ড ফয়েল ও কাঠের আলোযুক্ত ফ্রেম সাজিয়ে নিন।'
                : 'Preserve wedding bouquets, baby footprints, or monogram initials with custom gold foils, colors & fonts.'}
            </p>
          </div>

          <Link
            to="/how-to-order"
            className="px-6 py-3 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md shrink-0"
          >
            {language === 'bn' ? 'অর্ডার করার নিয়ম' : 'How To Order'}
          </Link>
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
        totalResultsCount={processedOffers.length}
      />
    </div>
  );
};
