import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminTab } from '../../types/admin';
import { 
  Package, 
  Layers, 
  SlidersHorizontal, 
  Megaphone, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag,
  Gift,
  CheckCircle2,
  Clock,
  TrendingUp,
  Tag,
  Droplets,
  Activity
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ 
  onNavigateTab 
}) => {
  const { products, categories } = useAdmin();

  const recentProducts = products.slice(0, 5);
  const showcaseCategories = categories.slice(0, 6);

  return (
    <div className="space-y-7">
      
      {/* Top Header: Title, Subtitle, Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Platform health at a glance. Every figure links to the list behind it.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
            <span>Reports</span>
          </a>

          <button
            onClick={() => onNavigateTab('products')}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-medium shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live operations</span>
          </button>
        </div>
      </div>

      {/* Section 1: Needs attention (5 Cards in row) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 font-sans">
          Needs attention
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* Card 1: Active categories */}
          <div 
            onClick={() => onNavigateTab('categories')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Pending driver verification
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Drivers waiting on document review
              </p>
            </div>
          </div>

          {/* Card 2: Pending vehicle verification */}
          <div 
            onClick={() => onNavigateTab('products')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Pending vehicle verification
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <Package className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Vehicles that cannot be booked yet
              </p>
            </div>
          </div>

          {/* Card 3: Settlements to verify */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Settlements to verify
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Verifying restores ride eligibility
              </p>
            </div>
          </div>

          {/* Card 4: Blocked drivers */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Blocked drivers
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <Gift className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Over the 3-transaction commission limit
              </p>
            </div>
          </div>

          {/* Card 5: Open disputes */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Open disputes
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Awaiting an admin decision
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: Live now (4 Cards in row) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 font-sans">
          Live now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          
          {/* Card 1: Active trips */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#0a5c36]/40 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Active trips
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <Megaphone className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                On the road now
              </p>
            </div>
          </div>

          {/* Card 2: Bookings today */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Bookings today
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <div className="mt-1 flex items-center space-x-1.5">
                <span className="inline-flex items-center text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                  ↘ 100.0%
                </span>
                <span className="text-[11px] text-slate-500">
                  vs last period
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Open ride requests */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Open ride requests
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Passenger demand still unanswered
              </p>
            </div>
          </div>

          {/* Card 4: Open support tickets */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Open support tickets
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Not yet resolved or closed
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Section 3: Money */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 font-sans">
          Money
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          
          {/* Card 1: Platform commission earned */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Platform commission earned
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shrink-0">
                <Tag className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                ৳140
              </div>
            </div>
          </div>

          {/* Card 2: Gross booking value */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Gross booking value
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                ৳1.4K
              </div>
            </div>
          </div>

          {/* Card 3: Outstanding commission */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Outstanding commission
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                ৳140
              </div>
            </div>
          </div>

          {/* Card 4: Payments awaiting confirmation */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-slate-500 leading-tight">
                Payments awaiting confirmation
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Droplets className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                0
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Trip finished, cash not recorded
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Layout: Quick Category & Product Management Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
        
        {/* Left Column: Categories List (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#0a5c36]" />
              <h3 className="text-sm font-bold text-slate-900">
                Keepsake Categories ({categories.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('categories')}
              className="text-xs font-semibold text-[#0a5c36] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {showcaseCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigateTab('categories')}
                className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center space-x-3 hover:bg-slate-100/80 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-1 ring-slate-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {cat.priceText || 'Artisan keepsake'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('categories')}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#0a5c36]" />
            <span>Create New Category</span>
          </button>
        </div>

        {/* Right Column: Catalog Products (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-[#0a5c36]" />
              <h3 className="text-sm font-bold text-slate-900">
                Recent Keepsakes ({products.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-[#0a5c36] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigateTab('products')}
                className="p-2 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between hover:bg-slate-100/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate max-w-[200px]">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {p.sku} • {p.category}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <div className="text-xs font-bold font-mono text-slate-900">
                    ৳{p.price}
                  </div>
                  {p.originalPrice && (
                    <div className="text-[10px] text-slate-400 line-through font-mono">
                      ৳{p.originalPrice}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('products')}
            className="w-full py-2 bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product to Catalog</span>
          </button>
        </div>

      </div>

    </div>
  );
};

