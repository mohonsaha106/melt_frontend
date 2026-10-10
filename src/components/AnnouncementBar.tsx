import React from 'react';
import { Sparkles, ShieldCheck, Clock, Truck, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    Sparkles,
    ShieldCheck,
    Gift,
    Sparkles,
    Gift,
    Truck,
    Clock,
    Gift,
    Sparkles,
  ];

  const announcements = t.announcement.items.map((text, idx) => ({
    text,
    icon: icons[idx % icons.length],
  }));

  return (
    <div className="bg-[#0A0A0A] text-[#E5E5E5] text-xs font-medium tracking-wide py-2.5 overflow-hidden border-b border-zinc-800/80 select-none z-50 relative">
      <div className="animate-marquee-smooth flex items-center space-x-8 whitespace-nowrap">
        {announcements.concat(announcements).map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors">
              <Icon className="w-3.5 h-3.5 text-zinc-400" />
              <span>{item.text}</span>
              <span className="text-zinc-600 px-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
