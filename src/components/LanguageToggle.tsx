import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  variant?: 'header' | 'mobile-header' | 'drawer' | 'footer';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'drawer') {
    return (
      <div className={`p-3 bg-[#DFD8C7] rounded-2xl border border-black/10 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900">
            <Globe className="w-4 h-4 text-zinc-700" />
            <span>ভাষা / Language</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase">
            {language === 'bn' ? 'ডিফল্ট: বাংলা' : 'Active: English'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              language === 'bn'
                ? 'bg-black text-[#E8E2D3] shadow-sm'
                : 'bg-[#F2EDE2] text-zinc-800 hover:bg-[#E8E2D3] border border-black/10'
            }`}
          >
            <span>🇧🇩 বাংলা</span>
            {language === 'bn' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              language === 'en'
                ? 'bg-black text-[#E8E2D3] shadow-sm'
                : 'bg-[#F2EDE2] text-zinc-800 hover:bg-[#E8E2D3] border border-black/10'
            }`}
          >
            <span>🇬🇧 English</span>
            {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
          <Globe className="w-3.5 h-3.5 text-zinc-500" />
          <span>Language:</span>
        </span>
        <div className="relative inline-flex p-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`px-3 py-1 rounded-full transition-all relative z-10 ${
              language === 'bn' ? 'text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            বাংলা
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full transition-all relative z-10 ${
              language === 'en' ? 'text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            English
          </button>
          <motion.div
            layout
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-zinc-800 ${
              language === 'bn' ? 'left-0.5' : 'left-[calc(50%+1px)]'
            }`}
          />
        </div>
      </div>
    );
  }

  // Header and Mobile Header pill toggle
  const isMobile = variant === 'mobile-header';

  return (
    <div
      className={`relative inline-flex items-center p-0.5 rounded-full bg-[#D4CCB8]/80 hover:bg-[#D4CCB8] border border-black/10 transition-colors select-none ${
        isMobile ? 'text-[11px]' : 'text-xs'
      } ${className}`}
      title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
    >
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`relative z-10 px-2 sm:px-2.5 py-1 rounded-full font-bold transition-colors ${
          language === 'bn' ? 'text-black' : 'text-zinc-600 hover:text-zinc-900'
        }`}
        aria-label="Bangla language"
      >
        বাং
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-2 sm:px-2.5 py-1 rounded-full font-bold transition-colors ${
          language === 'en' ? 'text-black' : 'text-zinc-600 hover:text-zinc-900'
        }`}
        aria-label="English language"
      >
        EN
      </button>

      {/* Sliding Active Pill Background */}
      <motion.div
        layout
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[#E8E2D3] shadow-xs border border-black/10 pointer-events-none ${
          language === 'bn' ? 'left-0.5' : 'left-[calc(50%+1px)]'
        }`}
      />
    </div>
  );
};
