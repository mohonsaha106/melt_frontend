import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CategoryItem } from '../../types/admin';
import { 
  Search, 
  Edit3, 
  Trash2, 
  FolderPlus, 
  Sparkles, 
  X
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Wedding Floral', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Flower Cube', url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gold Initial', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Geode Quartz', url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ocean Waves', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rose Bookmark', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Resin Pendant', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Ring Tray', url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80' },
];

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categorySlug: '',
    subtitle: '',
    image: '',
    badge: '',
    priceText: '',
    theme: 'bridal' as 'bridal' | 'gifts' | 'home' | 'wearables'
  });

  // Calculate live product count for each category
  const categoriesWithCounts = useMemo(() => {
    return categories.map(cat => {
      const matchCount = products.filter(
        p => p.category === cat.categorySlug || p.category === cat.id
      ).length;
      return {
        ...cat,
        computedCount: matchCount > 0 ? matchCount : (cat.count || 0)
      };
    });
  }, [categories, products]);

  // Filtered categories
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoriesWithCounts;
    return categoriesWithCounts.filter(cat => 
      cat.name.toLowerCase().includes(q) ||
      cat.categorySlug.toLowerCase().includes(q) ||
      (cat.subtitle && cat.subtitle.toLowerCase().includes(q)) ||
      (cat.badge && cat.badge.toLowerCase().includes(q))
    );
  }, [categoriesWithCounts, searchQuery]);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      categorySlug: '',
      subtitle: '',
      image: PRESET_IMAGES[0].url,
      badge: '',
      priceText: 'From ৳500',
      theme: 'bridal'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      categorySlug: cat.categorySlug,
      subtitle: cat.subtitle || '',
      image: cat.image,
      badge: cat.badge || '',
      priceText: cat.priceText || 'From ৳500',
      theme: cat.theme || 'bridal'
    });
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name,
      categorySlug: (!editingCategory || prev.categorySlug === editingCategory.categorySlug) ? autoSlug : prev.categorySlug
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = formData.categorySlug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const image = formData.image.trim() || PRESET_IMAGES[0].url;

    if (editingCategory) {
      updateCategory({
        ...editingCategory,
        name: formData.name.trim(),
        categorySlug: slug,
        subtitle: formData.subtitle.trim(),
        image,
        badge: formData.badge.trim() || undefined,
        priceText: formData.priceText.trim() || undefined,
        theme: formData.theme
      });
    } else {
      addCategory({
        name: formData.name.trim(),
        categorySlug: slug,
        subtitle: formData.subtitle.trim(),
        image,
        badge: formData.badge.trim() || undefined,
        priceText: formData.priceText.trim() || undefined,
        theme: formData.theme,
        count: 0
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <span>Keepsake Categories</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#e6f4ea] text-[#0a5c36]">
              {categories.length} Total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, and organize resin art categories. These display on the homepage carousel and shop filters.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>+ Create Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name, slug, or badge..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] shadow-2xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-[#0a5c36]/40 hover:shadow-xs transition-all group relative overflow-hidden"
          >
            {/* Top Visual Preview & Badge */}
            <div className="flex items-start space-x-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 ring-2 ring-slate-200 shrink-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {cat.name}
                  </h3>
                  {cat.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#0a5c36]">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.subtitle || 'Handcrafted bespoke keepsake collection'}
                </p>

                <div className="flex items-center space-x-2 mt-2 font-mono text-[10px] text-slate-500">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    /{cat.categorySlug}
                  </span>
                  <span>•</span>
                  <span className="text-[#0a5c36] font-semibold">
                    {cat.computedCount} items
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-600">
                {cat.priceText || 'Custom Pricing'}
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(cat.id)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Delete Confirmation Overlay */}
            {deleteConfirmId === cat.id && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-2xs flex flex-col items-center justify-center p-4 text-center z-10 animate-fade-in border border-rose-200 rounded-2xl">
                <p className="text-xs font-bold text-slate-900 mb-1">Delete "{cat.name}"?</p>
                <p className="text-[10px] text-slate-500 mb-3">
                  This will remove it from the homepage and filter lists.
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FolderPlus className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No categories found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or create a new keepsake category.
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 rounded-lg bg-[#0a5c36] text-white text-xs font-semibold cursor-pointer"
          >
            Create Category
          </button>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 text-slate-900 shadow-xl relative my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingCategory ? 'Edit Keepsake Category' : 'Create New Keepsake Category'}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Configure category name, visual image, and storefront display.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-5">
              
              {/* Category Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Wedding Keepsakes"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.categorySlug}
                    onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                    placeholder="e.g. wedding-keepsakes"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-mono text-[#0a5c36] focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Description Line
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Garland & bridal flower preservation frames"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                />
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category Halo Image URL
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                    <img
                      src={formData.image || PRESET_IMAGES[0].url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                      }}
                    />
                  </div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Paste image URL (https://...)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                {/* Preset image shortcuts */}
                <div className="mt-2 flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono shrink-0">Presets:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 border border-slate-200 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge & Starting Price text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Most Loved, New, Bridal"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Starting Price Guide
                  </label>
                  <input
                    type="text"
                    value={formData.priceText}
                    onChange={(e) => setFormData({ ...formData, priceText: e.target.value })}
                    placeholder="e.g. From ৳1,800"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                  />
                </div>
              </div>

              {/* Theme selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Collection Style / Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['bridal', 'gifts', 'home', 'wearables'] as const).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme })}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                        formData.theme === theme
                          ? 'bg-[#e6f4ea] border-[#0a5c36] text-[#0a5c36]'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

