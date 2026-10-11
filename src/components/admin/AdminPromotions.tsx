import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Bell, 
  X 
} from 'lucide-react';

export const AdminPromotions: React.FC = () => {
  const { promoCodes, addPromoCode, togglePromoCode, deletePromoCode, settings, updateSettings } = useAdmin();

  // Announcement Bar editor state
  const [announcementInput, setAnnouncementInput] = useState(settings.announcementText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementActive);
  const [tickerSavedToast, setTickerSavedToast] = useState(false);

  // New Promo Code Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromo, setNewPromo] = useState<{
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minSpend: number;
    isActive: boolean;
    expiryDate: string;
  }>({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 1000,
    isActive: true,
    expiryDate: '31 Dec 2026'
  });

  const handleSaveAnnouncement = () => {
    updateSettings({
      announcementText: announcementInput,
      announcementActive: announcementEnabled
    });
    setTickerSavedToast(true);
    setTimeout(() => setTickerSavedToast(false), 2500);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.code.trim()) return;

    addPromoCode({
      code: newPromo.code.toUpperCase().trim(),
      discountType: newPromo.discountType,
      discountValue: newPromo.discountValue,
      minSpend: newPromo.minSpend,
      isActive: newPromo.isActive,
      expiryDate: newPromo.expiryDate
    });

    setNewPromo({
      code: '',
      discountType: 'percentage',
      discountValue: 10,
      minSpend: 1000,
      isActive: true,
      expiryDate: '31 Dec 2026'
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-tight">
            Promotions, Coupons & Live Announcement Ticker
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create coupon voucher codes, configure discounts, and customize the live top banner ticker.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Section 1: Live Announcement Ticker Editor */}
      <div className="bg-[#161616] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Live Storefront Ticker Banner</h2>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer text-xs">
            <span className="text-zinc-400 font-semibold">Enable Banner:</span>
            <input
              type="checkbox"
              checked={announcementEnabled}
              onChange={(e) => setAnnouncementEnabled(e.target.checked)}
              className="rounded bg-zinc-800 border-zinc-700 text-amber-400 focus:ring-amber-400"
            />
          </label>
        </div>

        {/* Live Preview Box */}
        <div className="p-3 rounded-xl bg-black border border-zinc-800 text-center">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Storefront Live Preview</span>
          <div className="text-xs font-medium text-[#E8E2D3] tracking-wide truncate">
            {announcementEnabled ? announcementInput : '(Banner is currently disabled)'}
          </div>
        </div>

        {/* Edit Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={announcementInput}
            onChange={(e) => setAnnouncementInput(e.target.value)}
            placeholder="Enter announcement text..."
            className="flex-1 bg-zinc-900 border border-zinc-750 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          />

          <button
            onClick={handleSaveAnnouncement}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {tickerSavedToast ? 'Saved!' : 'Publish Ticker'}
          </button>
        </div>
      </div>

      {/* Section 2: Promo Codes & Coupons Grid */}
      <div className="bg-[#161616] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-white">Active Promo Codes & Vouchers</h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {promoCodes.filter(p => p.isActive).length} Active Coupons
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoCodes.map(promo => (
            <div 
              key={promo.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                promo.isActive
                  ? 'bg-zinc-900/90 border-zinc-700/80 shadow-xs'
                  : 'bg-zinc-900/40 border-zinc-800/60 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-black text-base tracking-wider text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {promo.code}
                  </span>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.isActive}
                      onChange={() => togglePromoCode(promo.id)}
                      className="rounded bg-zinc-800 border-zinc-700 text-rose-500 focus:ring-rose-500"
                    />
                  </label>
                </div>

                <div className="text-lg font-bold text-white font-mono mt-2">
                  {promo.discountType === 'percentage' ? `${promo.discountValue}% OFF` : `৳${promo.discountValue} OFF`}
                </div>

                <p className="text-xs text-zinc-400 mt-1">
                  Min spend: <strong className="text-zinc-200">৳{promo.minSpend}</strong>
                </p>

                {promo.expiryDate && (
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Valid until: {promo.expiryDate}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px]">
                  Used {promo.usageCount} times
                </span>

                <button
                  onClick={() => deletePromoCode(promo.id)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Promo Code */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl max-w-md w-full p-6 text-zinc-200 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-sm">Create New Promo Code</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={newPromo.code}
                  onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. WEDDING20"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400 font-mono tracking-wider font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Discount Type</label>
                  <select
                    value={newPromo.discountType}
                    onChange={(e) => setNewPromo({ ...newPromo, discountType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed BDT (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Discount Value *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPromo.discountValue}
                    onChange={(e) => setNewPromo({ ...newPromo, discountValue: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Minimum Spend (৳)</label>
                  <input
                    type="number"
                    min={0}
                    value={newPromo.minSpend}
                    onChange={(e) => setNewPromo({ ...newPromo, minSpend: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Expiry Date</label>
                  <input
                    type="text"
                    value={newPromo.expiryDate}
                    onChange={(e) => setNewPromo({ ...newPromo, expiryDate: e.target.value })}
                    placeholder="31 Dec 2026"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold cursor-pointer"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
