import React from 'react';
import { Sparkles, ShieldCheck, Clock, Truck, Gift } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    { text: 'স্মৃতি থাকুক চিরসবুজ! ✨', icon: Sparkles },
    { text: '১০০% হস্তনির্মিত ক্রিস্টাল রেজিন ও ফুল সংরক্ষণ', icon: ShieldCheck },
    { text: '৪টি কিনলে ১টি ফ্রি! (কার্ট ড্রয়ারে অফার)', icon: Gift },
    { text: '২৪ ক্যারেট গোল্ড লিফ মনোগ্রাম ও কাস্টম কিপসেক', icon: Sparkles },
    { text: '৭টি কিনলে ২টি উপহার ফ্রি!', icon: Gift },
    { text: 'অর্ডার নিশ্চিত করতে মাত্র ৫০ টাকা অগ্রিম (সারা বাংলাদেশে)', icon: Truck },
    { text: 'সারা দেশে ২-৪ দিনে দ্রুত হোম ডেলিভারি', icon: Clock },
    { text: '১০টি কিনলে ৩টি উপহার ফ্রি!', icon: Gift },
    { text: 'সর্বনিম্ন অর্ডার ২৫০ টাকা', icon: Sparkles },
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#E5E5E5] text-xs font-medium tracking-wide py-2.5 overflow-hidden border-b border-zinc-800/80 select-none z-50 relative font-bengali">
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
