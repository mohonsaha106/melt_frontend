import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminCategories } from '../components/admin/AdminCategories';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminReviews } from '../components/admin/AdminReviews';
import { AdminSettings } from '../components/admin/AdminSettings';
import { AdminTab } from '../types/admin';

export const AdminPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as AdminTab) || 'overview';
  const [currentTab, setCurrentTab] = useState<AdminTab>(initialTab);

  useEffect(() => {
    document.title = 'Melt Sparkle Atelier — Admin Control Hub';
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlGutter = document.documentElement.style.scrollbarGutter;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'auto';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.scrollbarGutter = originalHtmlGutter;
    };
  }, []);

  const handleTabChange = (tab: AdminTab) => {
    setCurrentTab(tab);
    setSearchParams(tab === 'overview' ? {} : { tab });
  };

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={handleTabChange}>
      {currentTab === 'overview' && <AdminOverview onNavigateTab={handleTabChange} />}
      {currentTab === 'categories' && <AdminCategories />}
      {currentTab === 'products' && <AdminProducts />}
      {currentTab === 'reviews' && <AdminReviews />}
      {currentTab === 'settings' && <AdminSettings />}
    </AdminLayout>
  );
};
