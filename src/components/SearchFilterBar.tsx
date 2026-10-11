import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CategoryFilterItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface SortOptionItem {
  id: string;
  label: string;
}

export interface SearchFilterBarProps {
  // Title & Header Information
  title?: string;
  itemCount?: number;
  itemCountLabel?: string;
  subtitle?: React.ReactNode;

  // Search input controls
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
  searchPlaceholder?: string;
  showSearch?: boolean;

  // Category & Tag Filter Pills
  categories?: (CategoryFilterItem | string)[];
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  initialVisibleCount?: number;

  // Sort Dropdown controls
  sortValue?: string;
  onSortChange?: (sortId: string) => void;
  sortOptions?: SortOptionItem[];
  showSort?: boolean;

  // Customization & styling
  className?: string;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  title,
  itemCount,
  itemCountLabel = 'designs available',
  subtitle,

  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = 'Search by name or design code...',
  showSearch = true,

  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  initialVisibleCount = 8,

  sortValue = 'default',
  onSortChange,
  sortOptions = [
    { id: 'default', label: 'Default' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'discount-high', label: 'Highest Discount' },
  ],
  showSort = true,

  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalize categories into CategoryFilterItem format
  const normalizedCategories: CategoryFilterItem[] = useMemo(() => {
    return categories.map((cat) => {
      if (typeof cat === 'string') {
        return {
          id: cat.toLowerCase(),
          label: cat,
        };
      }
      return cat;
    });
  }, [categories]);

  // Determine which categories to display based on expanded state
  const hasMoreCategories = normalizedCategories.length > initialVisibleCount;
  const visibleCategories = isExpanded
    ? normalizedCategories
    : normalizedCategories.slice(0, initialVisibleCount);

  // Current selected sort label
  const currentSortLabel = useMemo(() => {
    const found = sortOptions.find((opt) => opt.id === sortValue);
    return found ? found.label : 'Default';
  }, [sortOptions, sortValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <div className={`w-full flex flex-col space-y-4 ${className}`}>
      {/* 1. Header: Title & Item Count */}
      {(title || itemCount !== undefined || subtitle) && (
        <div className="flex flex-col space-y-0.5">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 font-serif">
              {title}
            </h2>
          )}
          {itemCount !== undefined ? (
            <p className="text-xs sm:text-sm text-zinc-500 font-normal">
              {itemCount} {itemCountLabel}
            </p>
          ) : (
            subtitle && (
              <div className="text-xs sm:text-sm text-zinc-500 font-normal">
                {subtitle}
              </div>
            )
          )}
        </div>
      )}

      {/* 2. Top Bar: Search Input & Sort Dropdown Button beside it */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full">
        {/* Search Input Container */}
        {showSearch && (
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-full py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500/80 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-2xs"
            />
            {searchValue && onSearchChange && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-900 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Sort Dropdown Button - Placed in the top row beside the search bar */}
        {showSort && (
          <div
            ref={sortDropdownRef}
            className="relative shrink-0 z-20"
          >
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] text-zinc-800 hover:text-black text-xs sm:text-sm font-medium rounded-full py-2.5 sm:py-3 px-4 sm:px-5 flex items-center justify-between gap-2 sm:gap-3 shadow-2xs min-w-[110px] sm:min-w-[140px] transition-colors focus:outline-none cursor-pointer active:scale-95"
            >
              <span className="truncate">{currentSortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-600 transition-transform duration-200 shrink-0 ${
                  isSortDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isSortDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1.5 w-48 sm:w-52 bg-[#E8E2D3] border border-[#D3CBBA] rounded-2xl shadow-xl py-1.5 z-30 overflow-hidden"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 border-b border-[#D3CBBA]/60 mb-1">
                    Sort Products
                  </div>
                  {sortOptions.map((opt) => {
                    const isSelected = sortValue === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          onSortChange && onSortChange(opt.id);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-black text-[#E8E2D3] font-semibold'
                            : 'text-zinc-800 hover:bg-[#DFD8C7] hover:text-black'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-2" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. Bottom Bar: Category / Tag Filter Pills (Flex-wrap across full width) */}
      {normalizedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full pt-1">
          {visibleCategories.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium tracking-normal transition-all duration-200 focus:outline-none active:scale-95 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-black text-[#E8E2D3] border border-black shadow-xs font-semibold'
                    : 'bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] text-zinc-800 hover:text-black hover:border-zinc-500 shadow-2xs'
                }`}
              >
                {cat.icon && <span className="mr-1.5 inline-block">{cat.icon}</span>}
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span
                    className={`ml-1.5 text-[10px] ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    ({cat.count})
                  </span>
                )}
              </button>
            );
          })}

          {/* + More / Show Less Toggle Pill */}
          {hasMoreCategories && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] text-zinc-800 hover:text-black transition-all duration-200 focus:outline-none active:scale-95 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              {isExpanded ? 'Show Less' : '+ More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
