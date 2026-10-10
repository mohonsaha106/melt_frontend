import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SearchFilterBar, CategoryFilterItem } from '../components/SearchFilterBar';
import { FilterDrawerModal } from '../components/FilterDrawerModal';
import { Placement } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  ArrowLeft,
  ShoppingBag,
  RefreshCw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const shopCategories: CategoryFilterItem[] = useMemo(() => [
    { id: 'all', label: language === 'bn' ? 'সকল ডিজাইন' : 'All Designs' },
    { id: 'preservation', label: language === 'bn' ? 'ফুল সংরক্ষণ' : 'Preservation' },
    { id: 'keychains', label: language === 'bn' ? 'কিচেন' : 'Keychains' },
    { id: 'bookmarks', label: language === 'bn' ? 'বুকমার্ক' : 'Bookmarks' },
    { id: 'clocks', label: language === 'bn' ? 'জিওড ঘড়ি' : 'Geode Clocks' },
    { id: 'coasters', label: language === 'bn' ? 'কোস্টার' : 'Coasters' },
    { id: 'jewelry', label: language === 'bn' ? 'গহনা' : 'Jewelry' },
    { id: 'aesthetic', label: language === 'bn' ? 'এসথেটিক' : 'Aesthetic' },
    { id: 'minimal', label: language === 'bn' ? 'মিনিমাল' : 'Minimal' },
    { id: 'floral', label: language === 'bn' ? 'আসল ফুলের কাজ' : 'Floral & Botanicals' },
    { id: 'wedding', label: language === 'bn' ? 'বিয়ের স্মারক' : 'Wedding Keepsakes' },
    { id: 'baby', label: language === 'bn' ? 'শিশুর স্মারক' : 'Baby Keepsakes' },
    { id: 'nightlamps', label: language === 'bn' ? 'লেটার নাইট ল্যাম্প' : 'Letter Nightlamps' },
    { id: 'gold-foil', label: language === 'bn' ? '২৪ ক্যারেট গোল্ড ফয়েল' : '24K Gold Foil' },
    { id: 'arabic', label: language === 'bn' ? 'আরবি ক্যালিগ্রাফি' : 'Arabic Calligraphy' },
    { id: 'under-500', label: language === 'bn' ? '৳৫০০ এর নিচে' : 'Under ৳500' },
    { id: 'under-1500', label: language === 'bn' ? '৳১৫০০ এর নিচে' : 'Under ৳1500' },
  ], [language]);

  // Read URL query parameters on initialization
  const initialCat = searchParams.get('category') || searchParams.get('cat') || 'all';
  const initialPlacement = searchParams.get('placement') as Placement | null;
  const initialSearch = searchParams.get('q') || searchParams.get('search') || '';

  const [selectedCat, setSelectedCat] = useState<string>(initialCat);
  const [sortOption, setSortOption] = useState('default');
  const [shopSearch, setShopSearch] = useState(initialSearch);
  
  // Advanced Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 8000]);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(initialPlacement);
  const [minRating, setMinRating] = useState<number>(0);

  // Sync state when URL params change
  useEffect(() => {
    const urlCat = searchParams.get('category') || searchParams.get('cat');
    if (urlCat) {
      setSelectedCat(urlCat);
    }
    const urlPlacement = searchParams.get('placement') as Placement | null;
    if (urlPlacement) {
      setSelectedPlacement(urlPlacement);
    }
    const urlSearch = searchParams.get('q') || searchParams.get('search');
    if (urlSearch) {
      setShopSearch(urlSearch);
    }
  }, [searchParams]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = language === 'bn' 
      ? 'সকল হস্তশিল্প কিপসেক ও রেজিন আর্ট কালেকশন | মেল্ট স্পার্কল' 
      : 'Shop All Handcrafted Keepsakes & Resin Art | Melt Sparkle';
  }, [language]);



  // Filter and sort all products dynamically based on search, category, and advanced filters
  const processedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Tag Filter
      if (selectedCat !== 'all') {
        if (selectedCat === 'under-500') {
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
    setSelectedCat(catId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (catId === 'all') {
        next.delete('category');
        next.delete('cat');
      } else {
        next.set('category', catId);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setPriceRange([0, 8000]);
    setSelectedPlacement(null);
    setMinRating(0);
    setSelectedCat('all');
    setShopSearch('');
    setSortOption('default');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Quick Route Navigation */}
        <div className="flex items-center justify-between py-3 mb-6 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোম' : 'Home'}</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              {language === 'bn' ? 'শপ অ্যাটেলিয়ার' : 'Shop Atelier'}
            </span>
          </nav>

          <div className="flex items-center space-x-2">
            <Link
              to="/sepcial-offer"
              className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-rose-500/10 border border-rose-600/20 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>{t.offers.title}</span>
            </Link>
          </div>
        </div>

        {/* Reusable Search & Filter Component */}
        <div className="mb-8">
          <SearchFilterBar
            title={language === 'bn' ? 'আমাদের সম্পূর্ণ কিপসেক সংগ্রহ' : 'The Complete Keepsake Collection'}
            itemCount={processedProducts.length}
            itemCountLabel={language === 'bn' ? 'টি হস্তশিল্প পণ্য উপলব্ধ' : 'handcrafted pieces available'}
            searchValue={shopSearch}
            onSearchChange={setShopSearch}
            searchPlaceholder={t.productCatalog.searchPlaceholder}
            categories={shopCategories}
            selectedCategory={selectedCat}
            onSelectCategory={handleSelectCategory}
            initialVisibleCount={8}
            sortValue={sortOption}
            onSortChange={setSortOption}
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
            <h3 className="text-lg font-bold text-zinc-900 font-serif">
              {t.productCatalog.noProductsFound}
            </h3>
            <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
              {language === 'bn'
                ? 'আপনার সার্চ বা ফিল্টারের সাথে কোনো কিপসেক মিলেনি। অন্য কি-ওয়ার্ড দিয়ে চেষ্টা করুন।'
                : "We couldn't find any pieces matching your search query or selected filters. Try broadening your criteria."}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center space-x-2 px-6 py-2.5 bg-black text-[#E8E2D3] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}

        {/* Custom Keepsake Atelier Banner */}
        <div className="mt-16 bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? 'কাস্টম হস্তশিল্প অর্ডার' : 'Bespoke Handcrafted Orders'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-serif">
              {language === 'bn' ? 'পছন্দের ডিজাইন খুঁজে পাচ্ছেন না?' : "Can't Find Your Exact Vision?"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 mt-2 leading-relaxed">
              {language === 'bn'
                ? 'আমরা আপনার নিজস্ব পছন্দ অনুযায়ী রেজিনের রঙ, ২৪ ক্যারেট গোল্ড ফয়েল, বিয়ের মালা সংরক্ষণ বা শিশুর নামের আদ্যক্ষর দিয়ে কাস্টম কিপসেক তৈরি করি।'
                : 'We create bespoke keepsakes with custom resin colors, 24K gold foil, wedding garland preservation, baby initials, and wood base LED lights.'}
            </p>
          </div>

          <Link
            to="/how-to-order"
            className="px-7 py-3.5 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-widest rounded-full transition-transform active:scale-95 shadow-md shrink-0"
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
        totalResultsCount={processedProducts.length}
      />
    </div>
  );
};
