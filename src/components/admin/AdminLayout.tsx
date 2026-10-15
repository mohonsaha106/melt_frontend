import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminTab } from '../../types/admin';
import { 
  LayoutGrid, 
  Layers, 
  Package, 
  SlidersHorizontal, 
  PanelLeft, 
  Sparkles, 
  ChevronsUpDown, 
  X, 
  Star,
  Home
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('melt_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('melt_admin_sidebar_collapsed', String(next));
        } catch {
          // ignore
        }
        return next;
      });
      // Trigger canvas resize so preview studios adapt cleanly to the new space
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 310);
    }
  }, []);

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
        },
        { 
          id: 'reviews', 
          label: 'Reviews', 
          icon: Star,
          badge: metrics.totalReviews
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
      case 'reviews':
        return 'Customer Reviews';
      case 'settings':
        return 'Website Settings';
      default:
        return 'Dashboard';
    }
  };

  // Listen for sidebar toggle event from specialized studio views
  useEffect(() => {
    const handleToggle = () => toggleSidebar();
    window.addEventListener('toggle-admin-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-admin-sidebar', handleToggle);
  }, [toggleSidebar]);

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-800 flex antialiased font-sans selection:bg-[#e6f4ea] selection:text-[#0a5c36]">
      
      {/* Left Sidebar - Full height 100% of parent */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out h-full shrink-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-16' : 'md:w-64'}
          w-64
        `}
      >
        {/* Brand Header at top */}
        <div
          className={`py-3.5 border-b border-slate-100 flex items-center transition-all ${
            isCollapsed ? 'px-2 justify-center' : 'px-5 justify-between'
          }`}
        >
          <Link
            to="/admin"
            className={`flex items-center group min-w-0 ${isCollapsed ? 'justify-center' : 'space-x-2.5'}`}
            title="Melt Sparkle Admin"
          >
            <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="font-bold text-sm tracking-tight text-slate-900 leading-tight truncate">
                  Melt Sparkle
                </div>
                <div className="text-[11px] text-slate-400 font-normal leading-tight">
                  Admin panel
                </div>
              </div>
            )}
          </Link>

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className={`flex-1 overflow-y-auto no-scrollbar py-3.5 space-y-5 transition-all ${isCollapsed ? 'px-2' : 'px-3.5'}`}>
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-2.5 text-[11px] font-semibold text-slate-400 truncate">
                  {sec.title}
                </div>
              ) : (
                idx > 0 && <div className="h-px bg-slate-100 my-2 mx-1" />
              )}
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        if (window.innerWidth < 768) {
                          setIsMobileOpen(false);
                        }
                      }}
                      title={isCollapsed ? item.label : undefined}
                      className={`
                        w-full flex items-center rounded-xl text-xs font-medium transition-all cursor-pointer relative group
                        ${isCollapsed 
                          ? 'justify-center p-2.5' 
                          : 'justify-between px-3 py-2'
                        }
                        ${isActive 
                          ? 'bg-[#e6f4ea] text-[#0a5c36] font-semibold shadow-2xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                        }
                      `}
                    >
                      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2.5'}`}>
                        <div className="relative flex items-center justify-center">
                          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#0a5c36]' : 'text-slate-500 group-hover:text-slate-800'}`} />
                          {isCollapsed && item.badge !== undefined && (
                            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#0a5c36] ring-2 ring-white" />
                          )}
                        </div>
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && item.badge !== undefined && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isActive 
                            ? 'bg-white text-[#0a5c36] shadow-2xs' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {/* Tooltip on hover when collapsed */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-[11px] rounded-md font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
                          {item.label}
                          {item.badge !== undefined && (
                            <span className="ml-1.5 text-[10px] text-slate-300 font-mono">({item.badge})</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Bottom Profile Widget */}
        <div className={`border-t border-slate-100 bg-white transition-all ${isCollapsed ? 'p-2' : 'p-3'}`}>
          <div
            className={`flex items-center hover:bg-slate-50 rounded-xl transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center p-1.5' : 'justify-between px-2 py-1.5'
            }`}
            title="+8801609185463 (Admin profile)"
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2.5 min-w-0'}`}>
              <div className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#0a5c36] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                +8
              </div>
              {!isCollapsed && (
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-slate-900 leading-tight truncate">
                    +8801609185463
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight truncate">
                    Add your name in My profile
                  </div>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            )}
          </div>
        </div>

      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-2xs transition-opacity"
        />
      )}

      {/* Right Column: Top Header + Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full min-h-0 overflow-hidden">
        
        {/* Top Header Bar (Shown for overview, categories, products; hidden on settings for dedicated studio chrome) */}
        {currentTab !== 'settings' && (
          <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
            
            {/* Left: Sidebar toggle & Current Page title */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle Sidebar"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <PanelLeft className="w-4 h-4" />
              </button>

              <span className="text-sm font-semibold text-slate-900">
                {getTabTitle()}
              </span>
            </div>

            {/* Right: Home Button */}
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-2xs hover:border-slate-300 active:scale-98"
                title="Back to Home Storefront"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Home</span>
              </Link>
            </div>

          </header>
        )}

        {/* Main Workspace Content Area */}
        <main className={`flex-1 min-h-0 bg-[#f8fafc] ${currentTab === 'settings' ? 'overflow-hidden p-0' : 'overflow-y-auto p-4 sm:p-6 lg:p-8'}`}>
          {currentTab === 'settings' ? (
            children
          ) : (
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};

