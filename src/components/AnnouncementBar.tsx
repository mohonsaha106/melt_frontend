import React from 'react';
import { Sparkles, ShieldCheck, Clock, Truck, Gift } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    { text: 'Keeping memories alive! ✨', icon: Sparkles },
    { text: '100% Handcrafted Resin & Flower Preservation', icon: ShieldCheck },
    { text: 'BUY 4 GET 1 FREE (Auto-applied in cart)', icon: Gift },
    { text: '24K Gold Leaf Monograms & Custom Keepsakes', icon: Sparkles },
    { text: 'BUY 7 GET 2 FREE', icon: Gift },
    { text: '৳50 Advance to Confirm Order across Bangladesh', icon: Truck },
    { text: 'Fast 2-4 Days Delivery BD Wide', icon: Clock },
    { text: 'BUY 10 GET 3 FREE', icon: Gift },
    { text: 'Minimum Order ৳250', icon: Sparkles },
  ];

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
