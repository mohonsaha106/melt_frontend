import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { X, Sparkles, ShoppingBag, Eye, Check, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FONTS = [
  { id: 'playfair', name: 'Elegant Script Calligraphy', class: 'font-serif italic font-bold tracking-wide' },
  { id: 'cinzel', name: 'Royal Gold Monogram', class: 'font-serif font-black tracking-widest uppercase' },
  { id: 'sans', name: 'Modern Minimal Sans', class: 'font-sans font-light tracking-[0.2em] uppercase' },
  { id: 'mono', name: 'Vintage Typewriter Script', class: 'font-mono font-bold tracking-wider' }
];

const FLOWER_THEMES = [
  { id: 'gold-rose', name: '24K Gold Leaf & Red Rose', color: 'from-amber-400 via-rose-500 to-amber-600' },
  { id: 'champagne-lavender', name: 'Champagne & Lavender', color: 'from-purple-300 via-amber-200 to-indigo-300' },
  { id: 'rose-gold-daisy', name: 'Rose Gold & White Daisy', color: 'from-pink-300 via-amber-100 to-pink-400' },
  { id: 'ocean-gypsophila', name: 'Ocean Turquoise & Baby’s Breath', color: 'from-cyan-300 via-teal-200 to-blue-400' }
];

const ITEM_TYPES = [
  { id: 'keychain', name: 'Initial Keychain', price: 350, dimensions: 'Single Initial + Clasp', defText: 'M' },
  { id: 'bookmark', name: 'Floral Bookmark', price: 320, dimensions: '14 x 2.5 cm with Silk Tassel', defText: 'Aura' },
  { id: 'ringdish', name: 'Trinket Ring Dish', price: 650, dimensions: '4 inch Scalloped Tray', defText: 'S & R' },
  { id: 'nightlamp', name: 'Monogram Lamp', price: 1450, dimensions: 'LED Solid Wood Base', defText: 'M' }
];

export const CustomTattooStudio: React.FC = () => {
  const { isCustomStudioOpen, setIsCustomStudioOpen, addToCart } = useStore();
  const [selectedItem, setSelectedItem] = useState(ITEM_TYPES[0]);
  const [text, setText] = useState('M');
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedTheme, setSelectedTheme] = useState(FLOWER_THEMES[0]);
  const [isAdded, setIsAdded] = useState(false);

  if (!isCustomStudioOpen) return null;

  const handleAddToCart = () => {
    const customProduct: Product = {
      id: `custom-resin-${Date.now()}`,
      sku: 'MS-CUSTOM',
      name: `Custom ${selectedItem.name}: "${text || 'Custom'}"`,
      category: 'custom',
      price: selectedItem.price,
      rating: 5.0,
      reviewCount: 52,
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      description: `Custom handcrafted resin ${selectedItem.name} featuring "${text}" in ${selectedFont.name} with ${selectedTheme.name}.`,
      placements: ['Monogram Keychains', 'Flower Preservation', 'Desk Signs'],
      durability: 'Handcrafted UV Archival Resin',
      sizes: [
        { size: 'S', dimensions: selectedItem.dimensions, price: selectedItem.price, isRecommended: true }
      ]
    };

    addToCart(customProduct, 'S', {
      text: `${text} (${selectedTheme.name})`,
      font: selectedFont.name
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCustomStudioOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCustomStudioOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-[#D3CBBA]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D3CBBA] bg-[#DFD8C7]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-lg font-bold text-zinc-900 font-serif">Custom Keepsake Studio</h2>
              <p className="text-xs text-zinc-600">Handcrafted with real botanicals, 24K gold leaf & crystal epoxy</p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomStudioOpen(false)}
            className="p-2 text-zinc-600 hover:text-black hover:bg-[#D5CDBE] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Left: Live Resin Keepsake Preview Box */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-3xl bg-[#0A0A0A] flex flex-col items-center justify-center p-8 overflow-hidden shadow-2xl border border-zinc-800">
              {/* Luxury gold & botanical ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-zinc-900 to-black opacity-90" />
              
              {/* Resin Glass Overlay Effect */}
              <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

              <span className="absolute top-3.5 left-3.5 text-[10px] uppercase font-mono tracking-widest text-[#E8E2D3]/80 z-10 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-zinc-700">
                <Eye className="w-3 h-3 text-amber-400" />
                Live Resin Preview
              </span>

              <span className="absolute top-3.5 right-3.5 text-[10px] font-mono tracking-wider text-amber-400 z-10 bg-black/40 px-2.5 py-1 rounded-full border border-zinc-700">
                {selectedItem.name}
              </span>

              {/* Keepsake Display */}
              <div className="relative z-10 text-center max-w-full px-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#E8E2D3]/20 to-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <Flower2 className="w-16 h-16 text-amber-300 animate-spin" style={{ animationDuration: '30s' }} />
                  </div>
                  <p className={`text-[#E8E2D3] text-4xl sm:text-5xl drop-shadow-md select-none ${selectedFont.class}`}>
                    {text || 'A'}
                  </p>
                </div>

                <p className="text-sm font-serif italic text-amber-200 tracking-wide">
                  "{text || 'Your Custom Keepsake'}"
                </p>

                <div className="mt-3 flex items-center justify-center space-x-2">
                  <span className="h-0.5 w-6 bg-amber-500/60" />
                  <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider">
                    {selectedTheme.name}
                  </span>
                  <span className="h-0.5 w-6 bg-amber-500/60" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-600 mt-3 text-center">
              Poured with UV-resistant non-yellowing crystal epoxy & hand-polished finish.
            </p>
          </div>

          {/* Right: Controls & Options */}
          <div className="flex flex-col space-y-4">
            {/* 1. Item Type Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                1. Select Keepsake Product
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ITEM_TYPES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      if (!text) setText(item.defText);
                    }}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      selectedItem.id === item.id
                        ? 'border-black bg-black text-[#E8E2D3] font-bold shadow-sm'
                        : 'border-[#D3CBBA] bg-[#DFD8C7] text-zinc-800 hover:border-black/40'
                    }`}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[11px] opacity-80 mt-0.5 font-mono">৳{item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Text Input */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                2. Enter Name, Initials or Date
              </label>
              <input
                type="text"
                value={text}
                maxLength={selectedItem.id === 'keychain' ? 3 : 20}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. S & R, Aura, 24.12.26"
                className="w-full px-4 py-2.5 bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>

            {/* 3. Inlay & Flower Theme */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                3. Botanical & Gold Leaf Accent
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FLOWER_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all ${
                      selectedTheme.id === theme.id
                        ? 'border-black bg-black text-[#E8E2D3] font-bold'
                        : 'border-[#D3CBBA] bg-[#DFD8C7] text-zinc-800 hover:border-black/40'
                    }`}
                  >
                    <div className="text-[11px] font-medium leading-tight">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Font Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1.5">
                4. Lettering Typography Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all ${
                      selectedFont.id === font.id
                        ? 'border-black bg-black text-[#E8E2D3] font-semibold'
                        : 'border-[#D3CBBA] bg-[#DFD8C7] text-zinc-800 hover:border-black/40'
                    }`}
                  >
                    <div className="text-[11px]">{font.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total & Action Button */}
            <div className="pt-3 border-t border-[#D3CBBA] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-600 block">Total Price:</span>
                <span className="text-2xl font-bold text-zinc-900 font-serif">৳{selectedItem.price}</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!text.trim()}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black hover:bg-zinc-800 text-[#E8E2D3] active:scale-95 shadow-md disabled:bg-zinc-400'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Custom Keepsake</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
