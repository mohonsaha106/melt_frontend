import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminTab } from '../../types/admin';
import { 
  LayoutGrid, 
  Layers, 
  Package, 
  SlidersHorizontal, 
  ExternalLink, 
  PanelLeft, 
  Sparkles, 
  Bell, 
  Search,
  ChevronsUpDown,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  setCurrentTab,
  children
}) => {
  const { metrics } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const navSections: {
    title: string;
    items: {
      id: AdminTab;
      label: string;
      icon: React.ElementType;
      badge?: number;
    }[];
  }[] = [
    {
      title: 'Overview',
      items: [
        { 
          id: 'overview', 
          label: 'Dashboard', 
          icon: LayoutGrid 
        }
      ]
    },
    {
      title: 'Catalog & Content',
      items: [
        { 
          id: 'categories', 
          label: 'Categories', 
          icon: Layers,
          badge: metrics.totalCategories
        },
        { 
          id: 'products', 
          label: 'Products', 
          icon: Package,
          badge: metrics.totalProducts
        }
      ]
    },
    {
      title: 'Storefront Controls',
      items: [
        { 
          id: 'settings', 
          label: 'Website Settings', 
          icon: SlidersHorizontal 
        }
      ]
    }
  ];

  const getTabTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Dashboard';
      case 'categories':
        return 'Categories';
      case 'products':
        return 'Products';
      case 'settings':
        return 'Website Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800 flex antialiased font-sans selection:bg-[#e6f4ea] selection:text-[#0a5c36]">
      
      {/* Left Sidebar - Full height 100% of parent */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out h-full shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header at top */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/admin" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-slate-900 leading-tight">
                Melt Sparkle
              </div>
              <div className="text-[11px] text-slate-400 font-normal leading-tight">
                Admin panel
              </div>
            </div>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-2.5 text-[11px] font-semibold text-slate-400">
                {sec.title}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer
                        ${isActive 
                          ? 'bg-[#e6f4ea] text-[#0a5c36] font-semibold' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#0a5c36]' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isActive 
                            ? 'bg-white text-[#0a5c36] shadow-2xs' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Bottom Profile Widget */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center font-bold text-xs shrink-0">
                +8
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight">
                  +8801609185463
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  Add your name in My profile
                </div>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>

      </aside>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden backdrop-blur-2xs"
        />
      )}

      {/* Right Column: Top Header + Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full min-h-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
          
          {/* Left: Sidebar toggle & Current Page title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Sidebar"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            <span className="text-sm font-semibold text-slate-900">
              {getTabTitle()}
            </span>
          </div>

          {/* Right: Search shortcut, Notification Bell, Live Store Link */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Jump to Ctrl K pill */}
            <button
              onClick={() => {
                const query = prompt('Jump to tab or section (overview, categories, products, settings):');
                if (query) {
                  const q = query.toLowerCase();
                  if (q.includes('cat')) setCurrentTab('categories');
                  else if (q.includes('prod')) setCurrentTab('products');
                  else if (q.includes('set') || q.includes('web')) setCurrentTab('settings');
                  else setCurrentTab('overview');
                }
              }}
              className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs transition-colors cursor-pointer"
              title="Search or jump to section (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Jump to</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400 shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationToast(!showNotificationToast)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </button>

              {showNotificationToast && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-50 text-xs">
                  <div className="font-semibold text-slate-900 mb-1 flex items-center justify-between">
                    <span>System Activity</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">Online</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    All systems operational. Active category synchronization & frontend section controls ready.
                  </p>
                </div>
              )}
            </div>

            {/* External Link to Live Storefront */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Open Live Storefront in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

        </header>

        {/* Main Workspace Content Area */}
        <main className="flex-1 min-h-0 overflow-y-auto bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

