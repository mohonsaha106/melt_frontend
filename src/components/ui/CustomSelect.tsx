import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
  badge?: string;
  badgeClass?: string;
  description?: string;
  icon?: React.ReactNode;
}

export type CustomSelectTheme = 'light' | 'dark' | 'cream';

export interface CustomSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  theme?: CustomSelectTheme;
  searchable?: boolean;
  align?: 'left' | 'right';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value = '',
  onChange,
  options,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  label,
  required = false,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  disabled = false,
  theme = 'light',
  searchable,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-enable search for long lists unless explicitly configured
  const isSearchActive = searchable !== undefined ? searchable : options.length > 7;

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.badge && opt.badge.toLowerCase().includes(query)) ||
        (opt.description && opt.description.toLowerCase().includes(query))
    );
  }, [options, searchQuery]);

  // Reset search query and focus when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      const selectedIdx = filteredOptions.findIndex((o) => o.value === value);
      setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0);
      if (isSearchActive) {
        setTimeout(() => searchInputRef.current?.focus(), 60);
      }
    } else {
      setHighlightedIndex(-1);
      setSearchQuery('');
    }
  }, [isOpen, value, isSearchActive]);

  // Keyboard navigation & outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          onChange(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredOptions, onChange]);

  // Auto-scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      const item = items[highlightedIndex] as HTMLElement | undefined;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const selectedOption = options.find((o) => o.value === value);

  // Theme style mapping
  const styles = {
    light: {
      label: 'text-slate-700',
      button:
        'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300',
      buttonOpen:
        'bg-white border-[#0a5c36] ring-2 ring-[#0a5c36]/15 text-slate-900',
      card:
        'bg-white border-slate-200 shadow-xl shadow-slate-900/10 text-slate-800',
      searchHeader: 'bg-slate-50/80 border-b border-slate-100',
      searchInput:
        'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0a5c36] focus:ring-2 focus:ring-[#0a5c36]/15',
      item: 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
      itemHighlighted: 'bg-slate-50 text-slate-900',
      itemSelected: 'bg-emerald-50 text-[#0a5c36] font-medium',
      checkColor: 'text-[#0a5c36]',
      chevronOpen: 'text-[#0a5c36]',
      badge: 'bg-slate-100 text-slate-700',
    },
    dark: {
      label: 'text-zinc-400',
      button:
        'bg-zinc-900 border-zinc-700/80 text-zinc-100 hover:border-zinc-500',
      buttonOpen:
        'bg-zinc-900 border-amber-400 ring-2 ring-amber-400/20 text-white',
      card: 'bg-zinc-900 border-zinc-700 shadow-2xl text-zinc-100',
      searchHeader: 'bg-zinc-950/80 border-b border-zinc-800',
      searchInput:
        'bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20',
      item: 'text-zinc-300 hover:bg-zinc-800 hover:text-white',
      itemHighlighted: 'bg-zinc-800 text-white',
      itemSelected: 'bg-zinc-800 text-amber-400 font-medium',
      checkColor: 'text-amber-400',
      chevronOpen: 'text-amber-400',
      badge: 'bg-zinc-800 text-zinc-300',
    },
    cream: {
      label: 'text-zinc-700',
      button:
        'bg-[#F2EDE2] border-black/15 text-[#111111] hover:border-black/30',
      buttonOpen:
        'bg-[#FAF7F2] border-black ring-2 ring-black/10 text-black',
      card: 'bg-[#FAF7F2] border-black/15 shadow-xl text-zinc-900',
      searchHeader: 'bg-[#F2EDE2]/80 border-b border-black/10',
      searchInput:
        'bg-white border-black/15 text-zinc-900 placeholder:text-zinc-500 focus:border-black focus:ring-2 focus:ring-black/10',
      item: 'text-zinc-800 hover:bg-[#EFEAE0] hover:text-black',
      itemHighlighted: 'bg-[#EFEAE0] text-black',
      itemSelected: 'bg-[#E5DEC9] text-[#0a5c36] font-medium',
      checkColor: 'text-[#0a5c36]',
      chevronOpen: 'text-[#0a5c36]',
      badge: 'bg-[#E5DEC9] text-black',
    },
  }[theme];

  return (
    <div
      className={`relative ${isOpen ? 'z-50' : 'z-10'} ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className={`block text-xs font-bold mb-1 ${styles.label}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full min-h-[38px] border rounded-xl py-2 px-3 text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer shadow-2xs select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isOpen ? styles.buttonOpen : styles.button} ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate flex items-center gap-2 min-w-0">
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className="shrink-0">{selectedOption.icon}</span>
              )}
              <span className="font-medium truncate">
                {selectedOption.label}
              </span>
              {selectedOption.badge && selectedOption.badge !== selectedOption.label && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    selectedOption.badgeClass || styles.badge
                  }`}
                >
                  {selectedOption.badge}
                </span>
              )}
            </>
          ) : (
            <span className="text-slate-400 font-normal">{placeholder}</span>
          )}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? `rotate-180 ${styles.chevronOpen}` : ''
          }`}
        />
      </button>

      {/* Dropdown Options Popover Card */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } top-full mt-1.5 min-w-full w-max min-w-[220px] max-w-[min(calc(100vw-32px),320px)] border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in duration-100 ${
            styles.card
          } ${menuClassName}`}
        >
          {/* Fixed Search Header */}
          {isSearchActive && (
            <div className={`p-2 shrink-0 ${styles.searchHeader}`}>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={`w-full text-xs rounded-lg py-1.5 pl-8 pr-7 border focus:outline-none transition-all ${styles.searchInput}`}
                  onClick={(e) => e.stopPropagation()}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scrollable Options List */}
          <div
            className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 custom-select-scrollbar"
            ref={listRef}
          >
            {filteredOptions.length === 0 ? (
              <div className="py-6 px-4 text-xs text-slate-400 text-center">
                No matching options
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;

                let rowStyle = styles.item;
                if (isSelected) {
                  rowStyle = styles.itemSelected;
                } else if (isHighlighted) {
                  rowStyle = styles.itemHighlighted;
                }

                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer group ${rowStyle}`}
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center space-x-2 truncate">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <span className="truncate">{opt.label}</span>
                        {opt.badge && opt.badge !== opt.label && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                              opt.badgeClass || styles.badge
                            }`}
                          >
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      {opt.description && (
                        <span className="text-[10px] opacity-70 font-normal mt-0.5 leading-tight">
                          {opt.description}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ml-1.5 ${styles.checkColor}`}
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
