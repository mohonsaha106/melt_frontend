import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Translations } from '../types/language';
import {
  translations,
  toBengaliNumber,
  formatPriceLocalized,
  PRODUCT_TRANSLATIONS,
  PLACEMENT_TRANSLATIONS,
  CATEGORY_TRANSLATIONS,
} from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  formatPrice: (amount: number, useBengaliDigits?: boolean) => string;
  tNumber: (num: number | string) => string;
  getProductName: (product: { id: string; name: string } | string, fallbackName?: string) => string;
  getProductDesc: (product: { id: string; description: string } | string, fallbackDesc?: string) => string;
  getProductDurability: (product: { id: string; durability: string } | string, fallbackDurability?: string) => string;
  getPlacementName: (placementName: string) => string;
  getPlacementSubtitle: (placementName: string) => string;
  getPlacementPriceText: (placementName: string, defaultText?: string) => string;
  getCategoryLabel: (categoryId: string, fallback?: string) => string;
}

const LANGUAGE_STORAGE_KEY = 'melt_sparkle_lang';
const DEFAULT_LANGUAGE: Language = 'bn'; // Default language is Bangla

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage; ALWAYS default to 'bn' (Bangla)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') {
        return saved;
      }
    } catch {}
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang: Language = prev === 'bn' ? 'en' : 'bn';
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
      } catch {}
      return nextLang;
    });
  }, []);

  // Sync html lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.body.classList.add('font-bengali');
    } else {
      document.body.classList.remove('font-bengali');
    }
  }, [language]);

  const currentTranslations = useMemo(() => {
    return translations[language];
  }, [language]);

  const formatPrice = useCallback(
    (amount: number, useBengaliDigits: boolean = true) => {
      return formatPriceLocalized(amount, language, useBengaliDigits);
    },
    [language]
  );

  const tNumber = useCallback(
    (num: number | string) => {
      if (language === 'bn') {
        return toBengaliNumber(num);
      }
      return String(num);
    },
    [language]
  );

  const getProductName = useCallback(
    (productOrId: { id: string; name: string } | string, fallbackName?: string) => {
      const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
      const defaultName = typeof productOrId === 'string' ? (fallbackName || '') : productOrId.name;
      const localized = PRODUCT_TRANSLATIONS[id];
      if (localized && localized.name[language]) {
        return localized.name[language];
      }
      return defaultName;
    },
    [language]
  );

  const getProductDesc = useCallback(
    (productOrId: { id: string; description: string } | string, fallbackDesc?: string) => {
      const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
      const defaultDesc = typeof productOrId === 'string' ? (fallbackDesc || '') : productOrId.description;
      const localized = PRODUCT_TRANSLATIONS[id];
      if (localized && localized.description[language]) {
        return localized.description[language];
      }
      return defaultDesc;
    },
    [language]
  );

  const getProductDurability = useCallback(
    (productOrId: { id: string; durability: string } | string, fallbackDurability?: string) => {
      const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
      const defaultDurability = typeof productOrId === 'string' ? (fallbackDurability || '') : productOrId.durability;
      const localized = PRODUCT_TRANSLATIONS[id];
      if (localized && localized.durability[language]) {
        return localized.durability[language];
      }
      return defaultDurability;
    },
    [language]
  );

  const getPlacementName = useCallback(
    (placementName: string) => {
      const localized = PLACEMENT_TRANSLATIONS[placementName];
      if (localized && localized.name[language]) {
        return localized.name[language];
      }
      return placementName;
    },
    [language]
  );

  const getPlacementSubtitle = useCallback(
    (placementName: string) => {
      const localized = PLACEMENT_TRANSLATIONS[placementName];
      if (localized && localized.subtitle[language]) {
        return localized.subtitle[language];
      }
      return '';
    },
    [language]
  );

  const getPlacementPriceText = useCallback(
    (placementName: string, defaultText?: string) => {
      const localized = PLACEMENT_TRANSLATIONS[placementName];
      if (localized && localized.priceText[language]) {
        return localized.priceText[language];
      }
      if (defaultText && language === 'bn') {
        return defaultText.replace(/From/i, 'শুরু').replace(/[0-9]/g, (d) => toBengaliNumber(d));
      }
      return defaultText || '';
    },
    [language]
  );

  const getCategoryLabel = useCallback(
    (categoryId: string, fallback?: string) => {
      const localized = CATEGORY_TRANSLATIONS[categoryId];
      if (localized && localized[language]) {
        return localized[language];
      }
      return fallback || categoryId;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: currentTranslations,
      formatPrice,
      tNumber,
      getProductName,
      getProductDesc,
      getProductDurability,
      getPlacementName,
      getPlacementSubtitle,
      getPlacementPriceText,
      getCategoryLabel,
    }),
    [
      language,
      setLanguage,
      toggleLanguage,
      currentTranslations,
      formatPrice,
      tNumber,
      getProductName,
      getProductDesc,
      getProductDurability,
      getPlacementName,
      getPlacementSubtitle,
      getPlacementPriceText,
      getCategoryLabel,
    ]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
