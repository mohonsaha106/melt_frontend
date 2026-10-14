import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { WebsiteSectionsSettings } from '../../types/admin';
import { INITIAL_WEBSITE_SECTIONS } from '../../data/adminMockData';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
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
  SlidersHorizontal,
  Eye,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Lock,
  RefreshCw,
  Sliders,
  Check,
  PanelLeft,
  HelpCircle,
  MessageSquare,
  Info
} from 'lucide-react';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type DeviceOrientation = 'portrait' | 'landscape';
type SectionCategory = 'all' | 'homepage' | 'shop' | 'pages' | 'global';

interface SectionConfig {
  id: keyof WebsiteSectionsSettings;
  label: string;
  category: 'homepage' | 'shop' | 'pages' | 'global';
  icon: React.ElementType;
  desc: string;
  targetAnchor?: string;
  defaultRoute: string;
}

const SECTIONS_CONFIG: SectionConfig[] = [
  {
    id: 'announcement',
    label: 'Top Announcement Bar',
    category: 'global',
    icon: Megaphone,
    desc: 'Marquee animated announcement banner across the entire website',
    targetAnchor: 'announcement-bar',
    defaultRoute: '/'
  },
  {
    id: 'offers',
    label: 'Special Promotional Offers',
    category: 'homepage',
    icon: Tag,
    desc: 'Promotional deals section on the homepage with discount badges',
    targetAnchor: 'special-offers',
    defaultRoute: '/'
  },
  {
    id: 'categories',
    label: 'Category Showcase Carousel',
    category: 'homepage',
    icon: Layers,
    desc: 'Circular visual keepsake category portal carousel',
    targetAnchor: 'explore-categories',
    defaultRoute: '/'
  },
  {
    id: 'highlightStrip',
    label: 'Highlight Features & Guarantees',
    category: 'homepage',
    icon: SlidersHorizontal,
    desc: 'High-contrast 3-point craftmanship & lifetime guarantee badges',
    targetAnchor: 'highlight-banner',
    defaultRoute: '/'
  },
  {
    id: 'customUniverse',
    label: 'Two Ways To Order (Custom Universe)',
    category: 'homepage',
    icon: Sparkles,
    desc: 'Bengali section for custom initials/monogram & wedding flower preservation',
    targetAnchor: 'custom-universe',
    defaultRoute: '/'
  },
  {
    id: 'productCatalog',
    label: 'Main Product Catalog Grid',
    category: 'homepage',
    icon: Package,
    desc: 'Main "Shop All Designs" grid header and CTA on homepage',
    targetAnchor: 'product-catalog',
    defaultRoute: '/'
  },
  {
    id: 'reviews',
    label: 'Customer Reviews & Social Lookbook',
    category: 'homepage',
    icon: Heart,
    desc: 'Loved by 15,000+ customers social proof and unboxing lookbook',
    targetAnchor: 'community-gallery',
    defaultRoute: '/'
  },
  {
    id: 'shopPage',
    label: 'Shop / Catalog Page Banner',
    category: 'shop',
    icon: ShoppingBag,
    desc: 'Banner title, subtitle, and search header on /shop catalog page',
    targetAnchor: 'shop-catalog',
    defaultRoute: '/shop'
  },
  {
    id: 'howToOrder',
    label: 'How To Order Page Guide',
    category: 'pages',
    icon: HelpCircle,
    desc: '4-step ordering guide, token advance details, and customer instructions',
    targetAnchor: 'how-to-order-hero',
    defaultRoute: '/how-to-order'
  },
  {
    id: 'faqPage',
    label: 'FAQ & Support Page',
    category: 'pages',
    icon: MessageSquare,
    desc: 'FAQ page header, search placeholder, and direct artisan support banner',
    targetAnchor: 'faq-hero',
    defaultRoute: '/faq'
  },
  {
    id: 'aboutPage',
    label: 'About Atelier & Contact Page',
    category: 'pages',
    icon: Info,
    desc: 'Brand story headline, 4 key milestone metrics, email, workshop and hours',
    targetAnchor: 'about-hero',
    defaultRoute: '/about'
  }
];

const PREVIEW_ROUTES = [
  { label: 'Home Page', path: '/' },
  { label: 'Shop Catalog', path: '/shop' },
  { label: 'Special Offers', path: '/sepcial-offer' },
  { label: 'Customer Reviews', path: '/reviews' },
  { label: 'How To Order', path: '/how-to-order' },
  { label: 'FAQs', path: '/faq' },
  { label: 'About Atelier', path: '/about' }
];

export const AdminSettings: React.FC = () => {
  const { websiteSettings, updateWebsiteSettings, resetToDefaults } = useAdmin();

  // Local state for the full website settings form
  const [formData, setFormData] = useState<WebsiteSectionsSettings>(() => ({
    ...websiteSettings,
    offers: { ...websiteSettings.offers },
    categories: { ...websiteSettings.categories },
    highlightStrip: { ...websiteSettings.highlightStrip },
    productCatalog: { ...websiteSettings.productCatalog },
    customUniverse: { ...websiteSettings.customUniverse },
    reviews: { ...websiteSettings.reviews },
    announcement: { ...websiteSettings.announcement },
    shopPage: { ...websiteSettings.shopPage },
    howToOrder: { ...(websiteSettings.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!) },
    faqPage: { ...(websiteSettings.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!) },
    aboutPage: { ...(websiteSettings.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!) }
  }));

  // Initial snapshot to count dirty / unsaved changes
  const [savedSnapshot, setSavedSnapshot] = useState<string>(() => JSON.stringify(websiteSettings));

  // Navigation & Filtering State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<SectionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    announcement: true,
    offers: true,
    categories: false,
    highlightStrip: false,
    customUniverse: false,
    productCatalog: false,
    reviews: false,
    shopPage: false,
    howToOrder: false,
    faqPage: false,
    aboutPage: false
  });

  // Device Preview State
  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [orientation, setOrientation] = useState<DeviceOrientation>('portrait');
  const [previewScaleMode, setPreviewScaleMode] = useState<'fit' | '100' | '85' | '75' | '60'>('fit');
  const [manualScale, setManualScale] = useState<number>(1);
  const [previewRoute, setPreviewRoute] = useState<string>('/');
  const [previewIframeKey, setPreviewIframeKey] = useState<number>(0);

  // Responsive mode on mobile admin screens (< lg)
  const [mobileTabMode, setMobileTabMode] = useState<'editor' | 'preview'>('editor');

  // Toasts & Modal States
  const [savedToast, setSavedToast] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [focusedSectionId, setFocusedSectionId] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Determine unsaved changes count
  const isDirty = useMemo(() => {
    return JSON.stringify(formData) !== savedSnapshot;
  }, [formData, savedSnapshot]);

  // Real-time synchronization to preview iframe via postMessage & localStorage preview draft
  useEffect(() => {
    try {
      localStorage.setItem('melt_admin_website_settings_preview', JSON.stringify(formData));
    } catch {
      // ignore
    }

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MELT_PREVIEW_SETTINGS_UPDATE',
          settings: formData
        },
        '*'
      );
    }
  }, [formData]);

  // Auto-focus and coordinate section selection when route changes
  const handleRouteChange = useCallback((newRoute: string) => {
    setPreviewRoute(newRoute);

    if (newRoute === '/how-to-order') {
      setActiveCategoryFilter((prev) => (prev === 'homepage' || prev === 'shop' || prev === 'global' ? 'pages' : prev));
      setExpandedSections((prev) => ({ ...prev, howToOrder: true }));
      setFocusedSectionId('howToOrder');
      setTimeout(() => {
        document.getElementById('admin-section-howToOrder')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else if (newRoute === '/faq') {
      setActiveCategoryFilter((prev) => (prev === 'homepage' || prev === 'shop' || prev === 'global' ? 'pages' : prev));
      setExpandedSections((prev) => ({ ...prev, faqPage: true }));
      setFocusedSectionId('faqPage');
      setTimeout(() => {
        document.getElementById('admin-section-faqPage')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else if (newRoute === '/about') {
      setActiveCategoryFilter((prev) => (prev === 'homepage' || prev === 'shop' || prev === 'global' ? 'pages' : prev));
      setExpandedSections((prev) => ({ ...prev, aboutPage: true }));
      setFocusedSectionId('aboutPage');
      setTimeout(() => {
        document.getElementById('admin-section-aboutPage')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else if (newRoute === '/shop') {
      setActiveCategoryFilter((prev) => (prev === 'pages' || prev === 'global' ? 'shop' : prev));
      setExpandedSections((prev) => ({ ...prev, shopPage: true }));
      setFocusedSectionId('shopPage');
      setTimeout(() => {
        document.getElementById('admin-section-shopPage')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, []);

  // Listen for route navigation notifications from inside preview iframe
  useEffect(() => {
    const handleWindowMessage = (e: MessageEvent) => {
      if (e.data?.type === 'MELT_PREVIEW_ROUTE_CHANGE' && typeof e.data.pathname === 'string') {
        const cleanPath = e.data.pathname.split('?')[0];
        handleRouteChange(cleanPath);
      }
    };
    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [handleRouteChange]);

  // Compute Auto-Fit Scale for the device preview based on viewport container size
  useEffect(() => {
    const calculateFitScale = () => {
      if (!previewContainerRef.current) return;
      const containerWidth = previewContainerRef.current.clientWidth - 48; // padding
      const containerHeight = previewContainerRef.current.clientHeight - 48;

      let targetWidth = 1200;
      let targetHeight = 800;

      if (activeDevice === 'mobile') {
        targetWidth = orientation === 'portrait' ? 390 : 844;
        targetHeight = orientation === 'portrait' ? 844 : 390;
      } else if (activeDevice === 'tablet') {
        targetWidth = orientation === 'portrait' ? 768 : 1024;
        targetHeight = orientation === 'portrait' ? 1024 : 768;
      } else {
        targetWidth = 1200;
        targetHeight = 780;
      }

      if (previewScaleMode === 'fit') {
        const scaleX = containerWidth / targetWidth;
        const scaleY = containerHeight / targetHeight;
        let scale = Math.min(scaleX, scaleY, 1);
        if (activeDevice === 'desktop') {
          scale = Math.min(scaleX, 1);
        }
        setManualScale(Math.max(0.45, Math.min(scale, 1)));
      } else {
        setManualScale(parseInt(previewScaleMode, 10) / 100);
      }
    };

    calculateFitScale();
    window.addEventListener('resize', calculateFitScale);
    return () => window.removeEventListener('resize', calculateFitScale);
  }, [activeDevice, orientation, previewScaleMode]);

  // Focus and scroll to a section in the preview
  const handleFocusSection = (section: SectionConfig) => {
    setFocusedSectionId(section.id);
    setExpandedSections((prev) => ({ ...prev, [section.id]: true }));

    // If currently on different route, change preview route first
    if (section.defaultRoute !== previewRoute) {
      setPreviewRoute(section.defaultRoute);
    }

    // Scroll iframe smoothly to target anchor
    if (section.targetAnchor) {
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(
          {
            type: 'MELT_PREVIEW_SCROLL_TO',
            sectionId: section.targetAnchor
          },
          '*'
        );
      }, 150);
    }

    // On mobile view, switch to preview tab so user sees it
    if (window.innerWidth < 1024) {
      setMobileTabMode('preview');
    }
  };

  // Expand / Collapse all sections
  const toggleAllSections = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    SECTIONS_CONFIG.forEach((s) => {
      updated[s.id] = expand;
    });
    setExpandedSections(updated);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateWebsiteSettings(formData);
    setSavedSnapshot(JSON.stringify(formData));
    try {
      localStorage.removeItem('melt_admin_website_settings_preview');
    } catch {
      // ignore
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    setFormData({ ...INITIAL_WEBSITE_SECTIONS });
    setSavedSnapshot(JSON.stringify(INITIAL_WEBSITE_SECTIONS));
    try {
      localStorage.removeItem('melt_admin_website_settings_preview');
    } catch {
      // ignore
    }
    setResetConfirmOpen(false);
    setSavedToast(true);
    setPreviewIframeKey((k) => k + 1);
    setTimeout(() => setSavedToast(false), 2500);
  };

  // Filter sections list
  const filteredSections = useMemo(() => {
    return SECTIONS_CONFIG.filter((section) => {
      const matchesCategory =
        activeCategoryFilter === 'all' || section.category === activeCategoryFilter;
      const matchesQuery =
        !searchQuery.trim() ||
        section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategoryFilter, searchQuery]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-slate-100 text-slate-800 antialiased">
      {/* =========================================================================
          TOP ACTION BAR: Header Title + Mobile Switcher + Live Save & Reset Actions
         ========================================================================= */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Studio Title & Live Indicator */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-admin-sidebar'))}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#0a5c36]" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Website Design Studio
            </h1>
          </div>

          <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sync Active</span>
          </div>

          {isDirty && (
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium">
              Unsaved changes
            </span>
          )}
        </div>

        {/* Center: Mobile / Tablet Screen Mode Switcher (< lg) */}
        <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setMobileTabMode('editor')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mobileTabMode === 'editor'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Design Editor
          </button>
          <button
            onClick={() => setMobileTabMode('preview')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
              mobileTabMode === 'preview'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Device Preview</span>
          </button>
        </div>

        {/* Right: Reset Defaults & Save Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Restore original text defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={() => handleSave()}
            className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
              isDirty
                ? 'bg-[#0a5c36] hover:bg-[#074728] ring-2 ring-[#0a5c36]/20'
                : 'bg-[#0a5c36]/90 hover:bg-[#0a5c36]'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {savedToast && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md z-30 transition-all">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Website settings saved successfully! All section placeholders and texts are now live on storefront.</span>
          </div>
          <button onClick={() => setSavedToast(false)} className="text-emerald-100 hover:text-white ml-2">
            ✕
          </button>
        </div>
      )}

      {/* =========================================================================
          MAIN SPLIT VIEW: Left Side Design Editor | Right Side Device Preview
         ========================================================================= */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">

        {/* ---------------------------------------------------------------------
            LEFT SIDE: Website Design With Placeholders (Editable Accordion)
           --------------------------------------------------------------------- */}
        <div
          className={`
            lg:w-[460px] xl:w-[500px] 2xl:w-[540px] shrink-0 h-full flex flex-col bg-white border-r border-slate-200 z-10
            ${mobileTabMode === 'editor' ? 'flex' : 'hidden lg:flex'}
          `}
        >
          {/* Subheader: Category Filter Pills + Search & Expand Tools */}
          <div className="p-3 border-b border-slate-200 bg-slate-50/80 space-y-2.5 shrink-0">
            {/* Filter Pills */}
            <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'all', label: 'All Sections' },
                  { id: 'homepage', label: 'Home Flow' },
                  { id: 'shop', label: 'Shop Page' },
                  { id: 'pages', label: 'Pages & FAQs' },
                  { id: 'global', label: 'Global / Header' }
                ] as { id: SectionCategory; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategoryFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Collapse/Expand All */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter sections by keyword..."
                  className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                />
              </div>

              <button
                type="button"
                onClick={() => toggleAllSections(true)}
                className="px-2 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
                title="Expand all sections"
              >
                Expand
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => toggleAllSections(false)}
                className="px-2 py-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors cursor-pointer"
                title="Collapse all sections"
              >
                Collapse
              </button>
            </div>
          </div>

          {/* Scrollable List of Sections with Placeholders */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
            {filteredSections.map((section, idx) => {
              const Icon = section.icon;
              const isExpanded = !!expandedSections[section.id];
              const isFocused = focusedSectionId === section.id;

              return (
                <div
                  key={section.id}
                  id={`admin-section-${section.id}`}
                  className={`
                    border rounded-xl transition-all duration-200 bg-white
                    ${isFocused ? 'ring-2 ring-[#0a5c36] border-[#0a5c36]/40 shadow-xs' : 'border-slate-200 hover:border-slate-300'}
                  `}
                >
                  {/* Section Accordion Header */}
                  <div className="p-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          [section.id]: !prev[section.id]
                        }))
                      }
                      className="flex items-center space-x-2.5 text-left flex-1 min-w-0 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#e6f4ea] text-slate-600 group-hover:text-[#0a5c36] flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-slate-400 font-bold">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#0a5c36] truncate transition-colors">
                            {section.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {section.desc}
                        </p>
                      </div>
                    </button>

                    {/* Action: Focus In Preview + Expand Chevron */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleFocusSection(section)}
                        className="p-1.5 text-slate-400 hover:text-[#0a5c36] hover:bg-[#e6f4ea] rounded-lg transition-colors cursor-pointer"
                        title="Scroll to this section in preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSections((prev) => ({
                            ...prev,
                            [section.id]: !prev[section.id]
                          }))
                        }
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label="Toggle section"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Section Content: Inputs with Placeholders */}
                  {isExpanded && (
                    <div className="px-3 pb-4 pt-1 border-t border-slate-100 space-y-3.5 text-slate-900">
                      
                      {/* SECTION 1: TOP ANNOUNCEMENT BAR */}
                      {section.id === 'announcement' && (
                        <>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                            <span className="text-xs font-semibold text-slate-700">
                              Active Marquee Bar
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.announcement.isActive}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    announcement: {
                                      ...formData.announcement,
                                      isActive: e.target.checked
                                    }
                                  })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0a5c36]"></div>
                            </label>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Announcement Marquee Text
                            </label>
                            <textarea
                              rows={2}
                              value={formData.announcement.text}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  announcement: {
                                    ...formData.announcement,
                                    text: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. ✨ ৪টি প্রোডাক্টে ১টি ফ্রি উপহার! সারা দেশে মাত্র ৫০ টাকা অগ্রিমে ক্যাশ অন ডেলিভারি সুবিধা।"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Ticker scrolls across top of storefront alongside shipping guarantees.
                            </span>
                          </div>
                        </>
                      )}

                      {/* SECTION 2: SPECIAL OFFERS */}
                      {section.id === 'offers' && (
                        <>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Badge Pill
                            </label>
                            <input
                              type="text"
                              value={formData.offers.badge}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  offers: { ...formData.offers, badge: e.target.value }
                                })
                              }
                              placeholder="e.g. LIMITED TIME DEALS"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.offers.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  offers: { ...formData.offers, title: e.target.value }
                                })
                              }
                              placeholder="e.g. Products on Offer"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.offers.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  offers: { ...formData.offers, subtitle: e.target.value }
                                })
                              }
                              placeholder="e.g. Enjoy exclusive savings on our bestselling handcrafted resin keepsakes and memory art pieces."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>
                        </>
                      )}

                      {/* SECTION 3: CATEGORIES CAROUSEL */}
                      {section.id === 'categories' && (
                        <>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Badge Pill
                            </label>
                            <input
                              type="text"
                              value={formData.categories.badge}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  categories: { ...formData.categories, badge: e.target.value }
                                })
                              }
                              placeholder="e.g. SHOP BY CATEGORY"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.categories.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  categories: { ...formData.categories, title: e.target.value }
                                })
                              }
                              placeholder="e.g. Explore Keepsake Categories"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.categories.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  categories: { ...formData.categories, subtitle: e.target.value }
                                })
                              }
                              placeholder="e.g. Click any category below to browse our complete collection of handcrafted resin keepsakes, bridal preservation, and custom gifts."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>
                        </>
                      )}

                      {/* SECTION 4: HIGHLIGHT STRIP */}
                      {section.id === 'highlightStrip' && (
                        <div className="space-y-2.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Guarantee Point 1 (Left)
                            </label>
                            <input
                              type="text"
                              value={formData.highlightStrip.item1}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  highlightStrip: {
                                    ...formData.highlightStrip,
                                    item1: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. 100% Handcrafted Resin"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Guarantee Point 2 (Center)
                            </label>
                            <input
                              type="text"
                              value={formData.highlightStrip.item2}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  highlightStrip: {
                                    ...formData.highlightStrip,
                                    item2: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Real Bridal Flower Preservation"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Guarantee Point 3 (Right)
                            </label>
                            <input
                              type="text"
                              value={formData.highlightStrip.item3}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  highlightStrip: {
                                    ...formData.highlightStrip,
                                    item3: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. UV Non-Yellowing Lifetime Keepsake"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 5: CUSTOM UNIVERSE (BENGALI SECTION) */}
                      {section.id === 'customUniverse' && (
                        <div className="space-y-3 font-bengali">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Badge Pill
                              </label>
                              <input
                                type="text"
                                value={formData.customUniverse.badge}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      badge: e.target.value
                                    }
                                  })
                                }
                                placeholder="স্মৃতি সংরক্ষণের দুটি উপায়"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Main Title
                              </label>
                              <input
                                type="text"
                                value={formData.customUniverse.title}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      title: e.target.value
                                    }
                                  })
                                }
                                placeholder="স্মৃতি থাকুক চিরসবুজ ও অম্লান"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.customUniverse.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customUniverse: {
                                    ...formData.customUniverse,
                                    subtitle: e.target.value
                                  }
                                })
                              }
                              placeholder="আপনার পছন্দের রেজিন কিপসেক তৈরির দুটি দারুণ সুযোগ..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>

                          {/* Card 01 Service */}
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a5c36]">
                              Card 01: Monogram Service
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={formData.customUniverse.card1Subtitle}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      card1Subtitle: e.target.value
                                    }
                                  })
                                }
                                placeholder="সার্ভিস ০১"
                                className="bg-white border border-slate-200 rounded py-1 px-2 text-xs text-slate-900"
                              />
                              <input
                                type="text"
                                value={formData.customUniverse.card1Title}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      card1Title: e.target.value
                                    }
                                  })
                                }
                                placeholder="কাস্টম নাম ও মনোগ্রাম"
                                className="bg-white border border-slate-200 rounded py-1 px-2 text-xs text-slate-900 font-semibold"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={formData.customUniverse.card1Description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customUniverse: {
                                    ...formData.customUniverse,
                                    card1Description: e.target.value
                                  }
                                })
                              }
                              placeholder="আপনার নাম, নিজস্ব বা কাপল ইনিশিয়াল কাস্ট করা হবে..."
                              className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900 resize-none"
                            />
                          </div>

                          {/* Card 02 Service */}
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                              Card 02: Bridal Flower Preservation
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={formData.customUniverse.card2Subtitle}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      card2Subtitle: e.target.value
                                    }
                                  })
                                }
                                placeholder="সার্ভিস ০২"
                                className="bg-white border border-slate-200 rounded py-1 px-2 text-xs text-slate-900"
                              />
                              <input
                                type="text"
                                value={formData.customUniverse.card2Title}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    customUniverse: {
                                      ...formData.customUniverse,
                                      card2Title: e.target.value
                                    }
                                  })
                                }
                                placeholder="জীবনের শ্রেষ্ঠ স্মৃতি সংরক্ষণ"
                                className="bg-white border border-slate-200 rounded py-1 px-2 text-xs text-slate-900 font-semibold"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={formData.customUniverse.card2Description}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customUniverse: {
                                    ...formData.customUniverse,
                                    card2Description: e.target.value
                                  }
                                })
                              }
                              placeholder="বিয়ের মালা, প্রিমিয়াম লাল গোলাপ, বেবি হসপিটাল ট্যাগ..."
                              className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900 resize-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* SECTION 6: PRODUCT CATALOG */}
                      {section.id === 'productCatalog' && (
                        <>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Badge Pill
                            </label>
                            <input
                              type="text"
                              value={formData.productCatalog.badge}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  productCatalog: {
                                    ...formData.productCatalog,
                                    badge: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. HANDCRAFTED ATELIER"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.productCatalog.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  productCatalog: {
                                    ...formData.productCatalog,
                                    title: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Shop All Designs"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.productCatalog.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  productCatalog: {
                                    ...formData.productCatalog,
                                    subtitle: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Discover our complete collection of handcrafted resin keepsakes, bridal preservation, and personalized memory art pieces."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Bottom Button CTA Text
                            </label>
                            <input
                              type="text"
                              value={formData.productCatalog.buttonText}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  productCatalog: {
                                    ...formData.productCatalog,
                                    buttonText: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. See More"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>
                        </>
                      )}

                      {/* SECTION 7: REVIEWS */}
                      {section.id === 'reviews' && (
                        <>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Badge Pill
                            </label>
                            <input
                              type="text"
                              value={formData.reviews.badge}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: { ...formData.reviews, badge: e.target.value }
                                })
                              }
                              placeholder="e.g. REAL CUSTOMER REVIEWS"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.reviews.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: { ...formData.reviews, title: e.target.value }
                                })
                              }
                              placeholder="e.g. Loved by 15,000+ Customers"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Section Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.reviews.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: { ...formData.reviews, subtitle: e.target.value }
                                })
                              }
                              placeholder="e.g. Real customer chats, unboxing photos, and keepsakes shared across Bangladesh."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Explore Reviews Button Text
                            </label>
                            <input
                              type="text"
                              value={formData.reviews.buttonText || ''}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: {
                                    ...formData.reviews,
                                    buttonText: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Explore All 18+ Customer Reviews"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>
                        </>
                      )}

                      {/* SECTION 8: SHOP PAGE */}
                      {section.id === 'shopPage' && (
                        <>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Shop Page Banner Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.shopPage.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  shopPage: { ...formData.shopPage, title: e.target.value }
                                })
                              }
                              placeholder="e.g. The Complete Keepsake Collection"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Shop Page Subtitle
                            </label>
                            <textarea
                              rows={2}
                              value={formData.shopPage.subtitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  shopPage: {
                                    ...formData.shopPage,
                                    subtitle: e.target.value
                                  }
                                })
                              }
                              placeholder="e.g. Explore authentic handcrafted resin treasures, botanicals, and bespoke memory art."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                            />
                          </div>
                        </>
                      )}

                      {/* =======================================================
                          9. How To Order Page Guide Form
                         ======================================================= */}
                      {section.id === 'howToOrder' && (
                        <>
                          <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-2.5 text-[11px] text-amber-900 leading-relaxed">
                            💡 Changes here update the <strong>/how-to-order</strong> 4-step customer ordering guide, advance token details, and instructions in real time.
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Top Badge / Delivery Notice
                              </label>
                              <input
                                type="text"
                                value={formData.howToOrder?.badge ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    howToOrder: {
                                      ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                      badge: e.target.value
                                    }
                                  })
                                }
                                placeholder="সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Main Page Title
                              </label>
                              <input
                                type="text"
                                value={formData.howToOrder?.title ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    howToOrder: {
                                      ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                      title: e.target.value
                                    }
                                  })
                                }
                                placeholder="সহজ ৪ ধাপে অর্ডার করার নিয়ম"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Subtitle & Advance Token Policy
                              </label>
                              <textarea
                                rows={2}
                                value={formData.howToOrder?.subtitle ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    howToOrder: {
                                      ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                      subtitle: e.target.value
                                    }
                                  })
                                }
                                placeholder="হস্তনির্মিত ক্রিস্টাল রেজিন ও সংরক্ষিত ফুলের কিপসেক সারা বাংলাদেশে আপনার ঠিকানায় পৌঁছে দিতে মাত্র ৫০ টাকা অগ্রিম টোকেনে সহজ ও নির্ভরযোগ্য অর্ডার প্রসেস।"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                              />
                            </div>

                            {/* 4 Steps Configuration */}
                            <div className="pt-2 border-t border-slate-200 space-y-3">
                              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                4 Ordering Steps
                              </span>

                              {/* Step 1 */}
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
                                  <span>Step 1: Selection</span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.howToOrder?.step1Title ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step1Title: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="কিপসেক বা ডিজাইন নির্বাচন"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36]"
                                />
                                <textarea
                                  rows={2}
                                  value={formData.howToOrder?.step1Desc ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step1Desc: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="আমাদের রেজিন ক্যাটালগ ঘুরে দেখুন অথবা আপনার পছন্দের মনোগ্রাম ইনিশিয়াল, বিয়ের ফুলের ফ্রেম ও কাস্টম ডিজাইন পছন্দ করুন।"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] resize-none"
                                />
                              </div>

                              {/* Step 2 */}
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">2</span>
                                  <span>Step 2: Advance Token</span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.howToOrder?.step2Title ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step2Title: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="৫০ টাকা অগ্রিম টোকেন প্রদান"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36]"
                                />
                                <textarea
                                  rows={2}
                                  value={formData.howToOrder?.step2Desc ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step2Desc: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="হস্তনির্মিত রেজিন কাস্টিং ও কুরিয়ার পার্সেল বুকিং নিশ্চিত করতে বিকাশ বা নগদের মাধ্যমে মাত্র ৫০ টাকা অগ্রিম পরিশোধ করুন। বাকি টাকা ডেলিভারির সময়।"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] resize-none"
                                />
                              </div>

                              {/* Step 3 */}
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">3</span>
                                  <span>Step 3: Artisan Curing</span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.howToOrder?.step3Title ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step3Title: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="আর্টিসান কাস্টিং ও ৭২ ঘণ্টা কিউরিং"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36]"
                                />
                                <textarea
                                  rows={2}
                                  value={formData.howToOrder?.step3Desc ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step3Desc: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="আমাদের দক্ষ রেজিন আর্টিসানরা ফুল সাজিয়ে বাবল-ফ্রি ইউভি ক্রিস্টাল ইপোক্সি ঢালেন, ৭২ ঘণ্টা সময় নিয়ে নিখুঁতভাবে কিউরিং ও ডায়মন্ড হ্যান্ড-পলিশ করেন।"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] resize-none"
                                />
                              </div>

                              {/* Step 4 */}
                              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">4</span>
                                  <span>Step 4: Delivery & COD</span>
                                </div>
                                <input
                                  type="text"
                                  value={formData.howToOrder?.step4Title ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step4Title: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36]"
                                />
                                <textarea
                                  rows={2}
                                  value={formData.howToOrder?.step4Desc ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      howToOrder: {
                                        ...(formData.howToOrder || INITIAL_WEBSITE_SECTIONS.howToOrder!),
                                        step4Desc: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="বাবল র‍্যাপ ও আকর্ষণীয় গিফট বক্সে নিরাপদে প্যাক করে সারা বাংলাদেশের যেকোনো প্রান্তে আপনার ঠিকানায় হোম ডেলিভারি করা হয়। বাকি টাকা কুরিয়ারকে পরিশোধ করুন।"
                                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a5c36] resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =======================================================
                          10. FAQ Page Header & Support Banner Form
                         ======================================================= */}
                      {section.id === 'faqPage' && (
                        <>
                          <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-2.5 text-[11px] text-amber-900 leading-relaxed">
                            💡 Changes here update the <strong>/faq</strong> page hero title, search placeholder, and direct artisan support footer banner.
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Hero Badge
                              </label>
                              <input
                                type="text"
                                value={formData.faqPage?.badge ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    faqPage: {
                                      ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                      badge: e.target.value
                                    }
                                  })
                                }
                                placeholder="কাস্টমার সাপোর্ট ও গাইডলাইন"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Main FAQ Heading
                              </label>
                              <input
                                type="text"
                                value={formData.faqPage?.title ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    faqPage: {
                                      ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                      title: e.target.value
                                    }
                                  })
                                }
                                placeholder="সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ)"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                FAQ Subtitle
                              </label>
                              <textarea
                                rows={2}
                                value={formData.faqPage?.subtitle ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    faqPage: {
                                      ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                      subtitle: e.target.value
                                    }
                                  })
                                }
                                placeholder="Meltsparkle হস্তনির্মিত রেজিন প্রোডাক্ট, বিয়ের ফুল সংরক্ষণ, কুরিয়ার ডেলিভারি ও রেজিনের যত্ন সম্পর্কিত প্রয়োজনীয় সব তথ্যের উত্তর এখানে পেয়ে যাবেন।"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Live Search Box Placeholder
                              </label>
                              <input
                                type="text"
                                value={formData.faqPage?.searchPlaceholder ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    faqPage: {
                                      ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                      searchPlaceholder: e.target.value
                                    }
                                  })
                                }
                                placeholder="Search questions or keywords (e.g. flower preservation, delivery, gold leaf)..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            {/* Direct Support Banner Card */}
                            <div className="pt-2 border-t border-slate-200 space-y-2.5">
                              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                Bottom Support & Assistance Banner
                              </span>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Support Banner Title
                                </label>
                                <input
                                  type="text"
                                  value={formData.faqPage?.supportTitle ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      faqPage: {
                                        ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                        supportTitle: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="বিশেষ কোনো প্রশ্ন আছে কি?"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Support Banner Subtitle
                                </label>
                                <textarea
                                  rows={2}
                                  value={formData.faqPage?.supportSubtitle ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      faqPage: {
                                        ...(formData.faqPage || INITIAL_WEBSITE_SECTIONS.faqPage!),
                                        supportSubtitle: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="বিয়ের মালা পাঠানোর নিয়ম, কাস্টম ফ্রেম সাইজ বা জরুরি ডেলিভারি সংক্রান্ত যেকোনো তথ্যে আমাদের টিম হোয়াটসঅ্যাপ ও ফেসবুকে সহায়তার জন্য প্রস্তুত।"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =======================================================
                          11. About Atelier & Contact Form
                         ======================================================= */}
                      {section.id === 'aboutPage' && (
                        <>
                          <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-2.5 text-[11px] text-amber-900 leading-relaxed">
                            💡 Changes here update the <strong>/about</strong> brand story headline, narrative, 4 milestone statistics, and studio contact information.
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Hero Badge
                              </label>
                              <input
                                type="text"
                                value={formData.aboutPage?.badge ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    aboutPage: {
                                      ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                      badge: e.target.value
                                    }
                                  })
                                }
                                placeholder="আমাদের গল্প ও লক্ষ্য"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Main Story Headline
                              </label>
                              <input
                                type="text"
                                value={formData.aboutPage?.title ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    aboutPage: {
                                      ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                      title: e.target.value
                                    }
                                  })
                                }
                                placeholder="স্মৃতিকে চিরজীবন্ত রাখতে হস্তনির্মিত রেজিন শিল্প"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                Brand Narrative / Story Subtitle
                              </label>
                              <textarea
                                rows={3}
                                value={formData.aboutPage?.subtitle ?? ''}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    aboutPage: {
                                      ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                      subtitle: e.target.value
                                    }
                                  })
                                }
                                placeholder="Meltsparkle-এর যাত্রা শুরু একটি আন্তরিক অঙ্গীকার নিয়ে: স্মৃতি থাকুক চিরসবুজ!..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36] resize-none"
                              />
                            </div>

                            {/* 4 Milestone Metrics */}
                            <div className="pt-2 border-t border-slate-200 space-y-2.5">
                              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                4 Atelier Milestone Metrics
                              </span>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Metric 1</label>
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat1Value ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat1Value: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="১০০%"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-bold text-slate-900"
                                  />
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat1Label ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat1Label: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="হাতে তৈরি শিল্প"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-[11px] text-slate-700"
                                  />
                                </div>

                                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Metric 2</label>
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat2Value ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat2Value: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="১৫,০০০+"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-bold text-slate-900"
                                  />
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat2Label ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat2Label: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="সংরক্ষিত স্মৃতি"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-[11px] text-slate-700"
                                  />
                                </div>

                                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Metric 3</label>
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat3Value ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat3Value: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="৬৪"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-bold text-slate-900"
                                  />
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat3Label ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat3Label: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="জেলায় ডেলিভারি"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-[11px] text-slate-700"
                                  />
                                </div>

                                <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Metric 4</label>
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat4Value ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat4Value: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="৪.৯ / ৫.০"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs font-bold text-slate-900"
                                  />
                                  <input
                                    type="text"
                                    value={formData.aboutPage?.stat4Label ?? ''}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        aboutPage: {
                                          ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                          stat4Label: e.target.value
                                        }
                                      })
                                    }
                                    placeholder="গ্রাহক সন্তুষ্টি"
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 text-[11px] text-slate-700"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Workshop & Contact Details */}
                            <div className="pt-2 border-t border-slate-200 space-y-2.5">
                              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                Studio Workshop & Contact Info
                              </span>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Contact Email
                                </label>
                                <input
                                  type="email"
                                  value={formData.aboutPage?.contactEmail ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      aboutPage: {
                                        ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                        contactEmail: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="contact@meltsparkle.com"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Studio Location / Address
                                </label>
                                <input
                                  type="text"
                                  value={formData.aboutPage?.contactLocation ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      aboutPage: {
                                        ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                        contactLocation: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="ঢাকা, বাংলাদেশ (সারা দেশে কুরিয়ার ডেলিভারি)"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                                  Customer Service Hours
                                </label>
                                <input
                                  type="text"
                                  value={formData.aboutPage?.workingHours ?? ''}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      aboutPage: {
                                        ...(formData.aboutPage || INITIAL_WEBSITE_SECTIONS.aboutPage!),
                                        workingHours: e.target.value
                                      }
                                    })
                                  }
                                  placeholder="শনিবার – বৃহস্পতিবার: সকাল ১০:০০ – রাত ৯:০০"
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0a5c36] focus:ring-1 focus:ring-[#0a5c36]"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Bottom Summary Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between text-xs shrink-0">
            <span className="text-[11px] text-slate-500">
              {isDirty ? '● Unsaved edits in draft' : '✓ All changes saved'}
            </span>
            <button
              onClick={() => handleSave()}
              className="px-3.5 py-1.5 rounded-lg bg-[#0a5c36] hover:bg-[#074728] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Website</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            RIGHT SIDE: Multi-Device Responsive Preview Studio
           --------------------------------------------------------------------- */}
        <div
          ref={previewContainerRef}
          className={`
            flex-1 min-h-0 h-full flex flex-col bg-slate-900 overflow-hidden relative select-none
            ${mobileTabMode === 'preview' ? 'flex' : 'hidden lg:flex'}
          `}
        >
          {/* Studio Top Control Dock */}
          <div className="h-13 bg-slate-950 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between gap-3 shrink-0 z-20">
            
            {/* Device Switcher (Desktop, Tablet, Mobile) */}
            <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveDevice('desktop')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDevice === 'desktop'
                    ? 'bg-slate-800 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Desktop View (1200px+)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDevice('tablet')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDevice === 'tablet'
                    ? 'bg-slate-800 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tablet View (768px iPad)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDevice('mobile')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeDevice === 'mobile'
                    ? 'bg-slate-800 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Mobile View (390px iPhone)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Middle: Simulated Browser Address Bar & Route Navigator */}
            <div className="flex-1 max-w-md hidden md:flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-slate-300">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-[11px] text-slate-500 font-mono">meltsparkle.com</span>
              <select
                value={previewRoute}
                onChange={(e) => handleRouteChange(e.target.value)}
                className="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer flex-1"
              >
                {PREVIEW_ROUTES.map((route) => (
                  <option key={route.path} value={route.path} className="bg-slate-900 text-white">
                    {route.path} ({route.label})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setPreviewIframeKey((k) => k + 1)}
                className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                title="Reload preview page"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Right: Orientation, Scale, External Tab Link */}
            <div className="flex items-center space-x-2">
              {/* Orientation toggle (for mobile / tablet) */}
              {activeDevice !== 'desktop' && (
                <button
                  type="button"
                  onClick={() =>
                    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'))
                  }
                  className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition-colors cursor-pointer ${
                    orientation === 'landscape'
                      ? 'bg-slate-800 border-slate-700 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={`Toggle orientation (${orientation})`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline text-[10px] font-mono capitalize">
                    {orientation}
                  </span>
                </button>
              )}

              {/* Scale / Zoom Preset Selector */}
              <select
                value={previewScaleMode}
                onChange={(e) =>
                  setPreviewScaleMode(e.target.value as 'fit' | '100' | '85' | '75' | '60')
                }
                className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                title="Preview Viewport Scaling"
              >
                <option value="fit">Auto Fit</option>
                <option value="100">100%</option>
                <option value="85">85%</option>
                <option value="75">75%</option>
                <option value="60">60%</option>
              </select>

              {/* Open in real customer storefront in new tab */}
              <a
                href={previewRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Open live storefront page in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Viewport Canvas with Studio Dot Matrix Background */}
          <div
            className="flex-1 min-h-0 w-full overflow-auto flex items-center justify-center p-4 relative"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Viewport Dimensions Pill at top */}
            <div className="absolute top-3 left-4 z-10 hidden sm:inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                {activeDevice === 'mobile'
                  ? orientation === 'portrait'
                    ? '390 × 844 px (iPhone)'
                    : '844 × 390 px (iPhone)'
                  : activeDevice === 'tablet'
                  ? orientation === 'portrait'
                    ? '768 × 1024 px (iPad)'
                    : '1024 × 768 px (iPad)'
                  : 'Desktop Preview (Fluid 1200px)'}
              </span>
              <span>•</span>
              <span>{Math.round(manualScale * 100)}%</span>
            </div>

            {/* =========================================================
                DEVICE FRAME SHELL (Desktop / Tablet / Mobile)
               ========================================================= */}
            <div
              style={{
                transform: `scale(${manualScale})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
              }}
              className="shrink-0 flex items-center justify-center"
            >
              {/* 1. DESKTOP BROWSER FRAME */}
              {activeDevice === 'desktop' && (
                <div className="w-[1200px] h-[780px] bg-slate-950 rounded-2xl border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                  {/* macOS Style Window Chrome Header */}
                  <div className="h-9 bg-slate-900 border-b border-slate-800 px-3.5 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-md text-[11px] text-slate-400 border border-slate-800">
                      <Lock className="w-2.5 h-2.5 text-emerald-400" />
                      <span className="font-mono">https://meltsparkle.com{previewRoute}</span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      Desktop Chrome
                    </div>
                  </div>

                  {/* Desktop Iframe Content */}
                  <div className="flex-1 w-full bg-[#E8E2D3] relative overflow-hidden">
                    <iframe
                      key={`desktop-${previewIframeKey}-${previewRoute}`}
                      ref={iframeRef}
                      src={`${previewRoute}${previewRoute.includes('?') ? '&' : '?'}preview=admin`}
                      title="Desktop Live Preview"
                      className="w-full h-full border-0 select-auto"
                    />
                  </div>
                </div>
              )}

              {/* 2. TABLET IPAD FRAME */}
              {activeDevice === 'tablet' && (
                <div
                  style={{
                    width: orientation === 'portrait' ? '768px' : '1024px',
                    height: orientation === 'portrait' ? '1024px' : '768px'
                  }}
                  className="bg-slate-950 rounded-[32px] border-[12px] border-slate-800 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative transition-all duration-300"
                >
                  {/* Camera lens dot */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-700 rounded-full z-20" />

                  {/* Iframe Content */}
                  <div className="flex-1 w-full bg-[#E8E2D3] relative overflow-hidden">
                    <iframe
                      key={`tablet-${previewIframeKey}-${previewRoute}-${orientation}`}
                      ref={iframeRef}
                      src={`${previewRoute}${previewRoute.includes('?') ? '&' : '?'}preview=admin`}
                      title="Tablet Live Preview"
                      className="w-full h-full border-0 select-auto"
                    />
                  </div>
                </div>
              )}

              {/* 3. MOBILE SMARTPHONE FRAME (iPhone with Dynamic Island) */}
              {activeDevice === 'mobile' && (
                <div
                  style={{
                    width: orientation === 'portrait' ? '390px' : '844px',
                    height: orientation === 'portrait' ? '844px' : '390px'
                  }}
                  className="bg-slate-950 rounded-[46px] border-[10px] border-slate-800 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col relative transition-all duration-300"
                >
                  {/* Top Dynamic Island Notch */}
                  {orientation === 'portrait' && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-full z-30 flex items-center justify-end pr-2.5 shadow-md">
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-700" />
                    </div>
                  )}

                  {/* Iframe Content */}
                  <div className="flex-1 w-full bg-[#E8E2D3] relative overflow-hidden">
                    <iframe
                      key={`mobile-${previewIframeKey}-${previewRoute}-${orientation}`}
                      ref={iframeRef}
                      src={`${previewRoute}${previewRoute.includes('?') ? '&' : '?'}preview=admin`}
                      title="Mobile Live Preview"
                      className="w-full h-full border-0 select-auto"
                    />
                  </div>

                  {/* Bottom iOS Home Swipe Bar */}
                  <div className="h-4 bg-transparent flex items-center justify-center shrink-0 absolute bottom-1 inset-x-0 z-30 pointer-events-none">
                    <div className="w-32 h-1 bg-black/35 rounded-full" />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Floating Interactive Tip */}
          <div className="hidden xl:flex items-center justify-between px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-[#0a5c36]" />
              <span>
                Tip: Click the <Eye className="w-3 h-3 inline text-slate-300 mx-0.5" /> eye icon on any section in the left panel to scroll the preview right to that section.
              </span>
            </span>
            <span className="text-slate-500 font-mono">
              Live CSS Media Queries active inside frame
            </span>
          </div>

        </div>

      </div>

      {/* =========================================================================
          RESET CONFIRMATION MODAL
         ========================================================================= */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Reset All Website Placeholders & Texts?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This will restore all section titles, subtitles, badges, and announcement copies back to the original studio defaults.
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
                onClick={handleResetToDefaults}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Yes, Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
