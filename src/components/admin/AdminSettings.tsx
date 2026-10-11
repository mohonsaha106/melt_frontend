import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { WebsiteSectionsSettings } from '../../types/admin';
import { 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Layers, 
  Package, 
  Heart, 
  Megaphone, 
  ShoppingBag, 
  Eye, 
  SlidersHorizontal 
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { websiteSettings, updateWebsiteSettings, resetToDefaults } = useAdmin();

  // Local state for the full website settings form
  const [formData, setFormData] = useState<WebsiteSectionsSettings>({ ...websiteSettings });
  const [activeSectionTab, setActiveSectionTab] = useState<keyof WebsiteSectionsSettings>('offers');
  const [savedToast, setSavedToast] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteSettings(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setResetConfirmOpen(false);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      window.location.reload();
    }, 1200);
  };

  const sectionsList: { id: keyof WebsiteSectionsSettings; label: string; icon: React.ElementType; desc: string }[] = [
    { 
      id: 'offers', 
      label: 'Special Offers Section', 
      icon: Tag,
      desc: 'Controls header of the promotional items section on the homepage'
    },
    { 
      id: 'categories', 
      label: 'Category Showcase', 
      icon: Layers,
      desc: 'Controls header of the circular category carousel'
    },
    { 
      id: 'productCatalog', 
      label: 'Main Product Catalog', 
      icon: Package,
      desc: 'Controls header and CTA of the "Shop All Designs" grid'
    },
    { 
      id: 'customUniverse', 
      label: 'Two Ways To Order', 
      icon: Sparkles,
      desc: 'Controls Bengali titles and cards for custom monogram & flower preservation'
    },
    { 
      id: 'reviews', 
      label: 'Customer Reviews', 
      icon: Heart,
      desc: 'Controls header of the 15,000+ happy customers masonry lookbook'
    },
    { 
      id: 'highlightStrip', 
      label: 'Highlight Features Strip', 
      icon: SlidersHorizontal,
      desc: 'Controls the 3 high-contrast guarantee badges below categories'
    },
    { 
      id: 'announcement', 
      label: 'Top Announcement Bar', 
      icon: Megaphone,
      desc: 'Controls the marquee announcement banner across the entire site'
    },
    { 
      id: 'shopPage', 
      label: 'Shop Page Header', 
      icon: ShoppingBag,
      desc: 'Controls the banner title and subtitle on /shop'
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <span>Website Settings</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#0a5c36]">
              Live Control
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize all the titles, subtitles, and badges shown across the customer storefront in real time.
          </p>
        </div>

        {/* Global Save and Reset Actions */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Restore original text defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {savedToast && (
        <div className="p-3 bg-[#e6f4ea] border border-[#0a5c36]/20 rounded-xl flex items-center space-x-2.5 text-xs text-[#0a5c36] animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">
            Website settings saved successfully! All section titles and subtitles are now live on the storefront.
          </span>
        </div>
      )}

      {/* Main Workspace: Left Sidebar Section Picker + Right Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Sections Navigation Menu (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-2.5 space-y-1 shadow-xs">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Frontend Sections
          </div>

          {sectionsList.map((item) => {
            const Icon = item.icon;
            const isActive = activeSectionTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSectionTab(item.id)}
                className={`
                  w-full text-left p-2.5 rounded-xl flex items-start space-x-3 transition-colors cursor-pointer
                  ${isActive 
                    ? 'bg-[#e6f4ea] text-[#0a5c36] font-semibold border border-[#0a5c36]/20 shadow-2xs' 
                    : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-transparent'
                  }
                `}
              >
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-[#0a5c36] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs ${isActive ? 'text-[#0a5c36] font-bold' : 'text-slate-900 font-semibold'}`}>
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Section Editor & Live Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <form onSubmit={handleSave} className="bg-white border border-slate-200/90 rounded-2xl p-6 text-slate-900 space-y-6 shadow-xs">
            
            {/* 1. Offers Section */}
            {activeSectionTab === 'offers' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Tag className="w-4 h-4" />
                  <span>Special Promotional Offers Section</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Pill Text
                  </label>
                  <input
                    type="text"
                    value={formData.offers.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      offers: { ...formData.offers, badge: e.target.value }
                    })}
                    placeholder="e.g. LIMITED TIME DEALS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.offers.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      offers: { ...formData.offers, title: e.target.value }
                    })}
                    placeholder="e.g. Products on Offer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.offers.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      offers: { ...formData.offers, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Enjoy exclusive savings on our bestselling handcrafted resin keepsakes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>
              </div>
            )}

            {/* 2. Categories Section */}
            {activeSectionTab === 'categories' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Layers className="w-4 h-4" />
                  <span>Category Showcase Carousel Section</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Pill Text
                  </label>
                  <input
                    type="text"
                    value={formData.categories.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      categories: { ...formData.categories, badge: e.target.value }
                    })}
                    placeholder="e.g. SHOP BY CATEGORY"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.categories.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      categories: { ...formData.categories, title: e.target.value }
                    })}
                    placeholder="e.g. Explore Keepsake Categories"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.categories.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      categories: { ...formData.categories, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Click any category below to browse our complete collection..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>
              </div>
            )}

            {/* 3. Main Product Catalog Section */}
            {activeSectionTab === 'productCatalog' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Package className="w-4 h-4" />
                  <span>Main Product Catalog Grid Section</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Pill Text
                  </label>
                  <input
                    type="text"
                    value={formData.productCatalog.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      productCatalog: { ...formData.productCatalog, badge: e.target.value }
                    })}
                    placeholder="e.g. HANDCRAFTED ATELIER"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productCatalog.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      productCatalog: { ...formData.productCatalog, title: e.target.value }
                    })}
                    placeholder="e.g. Shop All Designs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.productCatalog.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      productCatalog: { ...formData.productCatalog, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Discover our complete collection of handcrafted resin keepsakes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bottom Button CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.productCatalog.buttonText}
                    onChange={(e) => setFormData({
                      ...formData,
                      productCatalog: { ...formData.productCatalog, buttonText: e.target.value }
                    })}
                    placeholder="e.g. See More"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>
              </div>
            )}

            {/* 4. Custom Universe Section */}
            {activeSectionTab === 'customUniverse' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Two Ways To Order Keepsakes (Bengali Section)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={formData.customUniverse.badge}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, badge: e.target.value }
                      })}
                      placeholder="স্মৃতি সংরক্ষণের দুটি উপায়"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={formData.customUniverse.title}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, title: e.target.value }
                      })}
                      placeholder="স্মৃতি থাকুক চিরসবুজ ও অম্লান"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 font-serif"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.customUniverse.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      customUniverse: { ...formData.customUniverse, subtitle: e.target.value }
                    })}
                    placeholder="আপনার পছন্দের রেজিন কিপসেক তৈরির দুটি দারুণ সুযোগ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 resize-none"
                  />
                </div>

                {/* Cards 1 and 2 details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-mono text-[#0a5c36] font-bold block">Card 01 (Monograms)</span>
                    <input
                      type="text"
                      value={formData.customUniverse.card1Title}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, card1Title: e.target.value }
                      })}
                      placeholder="কাস্টম নাম ও মনোগ্রাম"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                    <textarea
                      rows={2}
                      value={formData.customUniverse.card1Description}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, card1Description: e.target.value }
                      })}
                      placeholder="কার্ড ১ বিবরণ..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 resize-none"
                    />
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-mono text-[#0a5c36] font-bold block">Card 02 (Flower Preservation)</span>
                    <input
                      type="text"
                      value={formData.customUniverse.card2Title}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, card2Title: e.target.value }
                      })}
                      placeholder="জীবনের শ্রেষ্ঠ স্মৃতি সংরক্ষণ"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                    />
                    <textarea
                      rows={2}
                      value={formData.customUniverse.card2Description}
                      onChange={(e) => setFormData({
                        ...formData,
                        customUniverse: { ...formData.customUniverse, card2Description: e.target.value }
                      })}
                      placeholder="কার্ড ২ বিবরণ..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. Customer Reviews Section */}
            {activeSectionTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Heart className="w-4 h-4" />
                  <span>Customer Reviews & Lookbook Section</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Pill Text
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.badge}
                    onChange={(e) => setFormData({
                      ...formData,
                      reviews: { ...formData.reviews, badge: e.target.value }
                    })}
                    placeholder="e.g. REAL CUSTOMER REVIEWS"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reviews.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      reviews: { ...formData.reviews, title: e.target.value }
                    })}
                    placeholder="e.g. Loved by 15,000+ Customers"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Section Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.reviews.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      reviews: { ...formData.reviews, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Real customer chats, unboxing photos, and keepsakes shared across Bangladesh."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bottom Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.reviews.buttonText || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      reviews: { ...formData.reviews, buttonText: e.target.value }
                    })}
                    placeholder="e.g. Explore All 18+ Customer Reviews"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>
              </div>
            )}

            {/* 6. Highlight Strip (3 statements) */}
            {activeSectionTab === 'highlightStrip' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Highlight Features Strip (Guarantee Statements)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Item 1 Text
                  </label>
                  <input
                    type="text"
                    value={formData.highlightStrip.item1}
                    onChange={(e) => setFormData({
                      ...formData,
                      highlightStrip: { ...formData.highlightStrip, item1: e.target.value }
                    })}
                    placeholder="100% Handcrafted Resin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Item 2 Text
                  </label>
                  <input
                    type="text"
                    value={formData.highlightStrip.item2}
                    onChange={(e) => setFormData({
                      ...formData,
                      highlightStrip: { ...formData.highlightStrip, item2: e.target.value }
                    })}
                    placeholder="Real Bridal Flower Preservation"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Item 3 Text
                  </label>
                  <input
                    type="text"
                    value={formData.highlightStrip.item3}
                    onChange={(e) => setFormData({
                      ...formData,
                      highlightStrip: { ...formData.highlightStrip, item3: e.target.value }
                    })}
                    placeholder="UV Non-Yellowing Lifetime Keepsake"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>
              </div>
            )}

            {/* 7. Announcement Marquee */}
            {activeSectionTab === 'announcement' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <Megaphone className="w-4 h-4" />
                  <span>Top Announcement Marquee Ticker</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Display Announcement Banner</span>
                    <span className="text-[11px] text-slate-500">Show scrolling custom ticker at the top of every page</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.announcement.isActive}
                      onChange={(e) => setFormData({
                        ...formData,
                        announcement: { ...formData.announcement, isActive: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a5c36]"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Announcement Banner Text
                  </label>
                  <textarea
                    rows={2}
                    value={formData.announcement.text}
                    onChange={(e) => setFormData({
                      ...formData,
                      announcement: { ...formData.announcement, text: e.target.value }
                    })}
                    placeholder="e.g. ✨ ৪টি প্রোডাক্টে ১টি ফ্রি উপহার! সারা দেশে মাত্র ৫০ টাকা অগ্রিমে ক্যাশ অন ডেলিভারি সুবিধা।"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>
              </div>
            )}

            {/* 8. Shop Page Header */}
            {activeSectionTab === 'shopPage' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0a5c36] font-bold text-sm border-b border-slate-100 pb-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Page (/shop) Header</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shop Page Header Title
                  </label>
                  <input
                    type="text"
                    value={formData.shopPage.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      shopPage: { ...formData.shopPage, title: e.target.value }
                    })}
                    placeholder="e.g. The Complete Keepsake Collection"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shop Page Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.shopPage.subtitle}
                    onChange={(e) => setFormData({
                      ...formData,
                      shopPage: { ...formData.shopPage, subtitle: e.target.value }
                    })}
                    placeholder="e.g. Explore authentic handcrafted resin treasures..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                  />
                </div>
              </div>
            )}

            {/* Save Button for Current Form */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Section Changes</span>
              </button>
            </div>

          </form>

          {/* Real-time Frontend Preview Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-slate-900 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-500 border-b border-slate-100 pb-2">
              <span className="flex items-center space-x-1.5 text-[#0a5c36] font-bold">
                <Eye className="w-3.5 h-3.5" />
                <span>Live Frontend Visual Preview</span>
              </span>
              <span className="text-[10px] text-slate-400">Store Theme</span>
            </div>

            {/* Preview Box Styled Exactly like Frontend */}
            <div className="bg-[#E8E2D3] text-[#111111] p-6 sm:p-8 rounded-xl text-center space-y-2 border border-[#D3CBBA] shadow-inner font-bengali">
              {/* Badge Preview */}
              {activeSectionTab === 'offers' && formData.offers.badge && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-600/20 text-rose-700 text-[10px] font-bold uppercase tracking-wider mx-auto">
                  <span>{formData.offers.badge}</span>
                </div>
              )}
              {activeSectionTab === 'categories' && formData.categories.badge && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-[10px] font-bold uppercase tracking-wider mx-auto">
                  <span>{formData.categories.badge}</span>
                </div>
              )}
              {activeSectionTab === 'productCatalog' && formData.productCatalog.badge && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900/10 border border-zinc-900/20 text-zinc-900 text-[10px] font-bold uppercase tracking-wider mx-auto">
                  <span>{formData.productCatalog.badge}</span>
                </div>
              )}
              {activeSectionTab === 'reviews' && formData.reviews.badge && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-900 text-[10px] font-bold uppercase tracking-wider mx-auto">
                  <span>{formData.reviews.badge}</span>
                </div>
              )}
              {activeSectionTab === 'customUniverse' && formData.customUniverse.badge && (
                <div className="text-xs font-bold tracking-wider uppercase text-zinc-600">
                  {formData.customUniverse.badge}
                </div>
              )}

              {/* Title Preview */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 tracking-tight">
                {activeSectionTab === 'offers' && formData.offers.title}
                {activeSectionTab === 'categories' && formData.categories.title}
                {activeSectionTab === 'productCatalog' && formData.productCatalog.title}
                {activeSectionTab === 'customUniverse' && formData.customUniverse.title}
                {activeSectionTab === 'reviews' && formData.reviews.title}
                {activeSectionTab === 'shopPage' && formData.shopPage.title}
                {activeSectionTab === 'announcement' && (formData.announcement.text || 'No announcement set')}
                {activeSectionTab === 'highlightStrip' && 'Highlight Guarantee Strip'}
              </h3>

              {/* Subtitle Preview */}
              <p className="text-xs sm:text-sm text-zinc-700 max-w-lg mx-auto leading-relaxed">
                {activeSectionTab === 'offers' && formData.offers.subtitle}
                {activeSectionTab === 'categories' && formData.categories.subtitle}
                {activeSectionTab === 'productCatalog' && formData.productCatalog.subtitle}
                {activeSectionTab === 'customUniverse' && formData.customUniverse.subtitle}
                {activeSectionTab === 'reviews' && formData.reviews.subtitle}
                {activeSectionTab === 'shopPage' && formData.shopPage.subtitle}
                {activeSectionTab === 'highlightStrip' && `${formData.highlightStrip.item1} • ${formData.highlightStrip.item2} • ${formData.highlightStrip.item3}`}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Reset Website Section Texts?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will restore all section titles, subtitles, and badges to their original default values. Are you sure you want to proceed?
            </p>
            <div className="flex items-center justify-end space-x-2.5 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
