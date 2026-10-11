import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  MessageSquare, 
  CheckCircle2, 
  Send,
  Gem
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'বিয়ের ফুল ও মালা সংরক্ষণ',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'আমাদের কথা ও যোগাযোগ | Melt Sparkle';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3] font-bengali">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">আমাদের কথা ও যোগাযোগ</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>কালেকশন দেখুন</span>
          </Link>
        </div>

        {/* 1. Hero Brand Narrative */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>আমাদের গল্প ও লক্ষ্য</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.2]">
            স্মৃতিকে চিরজীবন্ত রাখতে হস্তনির্মিত রেজিন শিল্প
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            Meltsparkle-এর যাত্রা শুরু একটি আন্তরিক অঙ্গীকার নিয়ে: <strong className="text-zinc-900 font-bold">স্মৃতি থাকুক চিরসবুজ!</strong> বিয়ের মালা, প্রিয়জনের তোড়া থেকে শুরু করে কাস্টম মনোগ্রাম কিচেন, জিওড রেজিন ক্লক ও জুয়েলারি — প্রতিটি স্মৃতিচিহ্ন আমরা উন্নত ক্রিস্টাল রেজিন, আসল ফুল ও নিপুণ হাতের কারুকাজে বাংলাদেশে তৈরি করি।
          </p>
        </div>

        {/* 2. Key Metrics Strip */}
        <div className="bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] shadow-sm mb-16 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#D3CBBA]">
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900">১০০%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">হাতে তৈরি শিল্প</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-900">১৫,০০০+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">সংরক্ষিত স্মৃতি</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900">৬৪</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">জেলায় ডেলিভারি</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900">৪.৯ / ৫.০</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">গ্রাহক সন্তুষ্টি</div>
            </div>
          </div>
        </div>

        {/* 3. Craftsmanship Pillars */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900">
              আমাদের মান ও কারিগরি উৎকর্ষ
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              যেভাবে আমরা নিশ্চিত করি আপনার ফুল, গোল্ড লিফ ও কিপসেক সারা জীবন কাঁচের মতো উজ্জ্বল থাকবে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  ইউভি ক্রিস্টাল রেজিন ফর্মুলা
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  আমরা ব্যবহার করি প্রিমিয়াম বাবল-ফ্রি, নন-ইয়েলোয়িং ক্রিস্টাল রেজিন যা ফুলের প্রাকৃতিক রং ও উজ্জ্বলতা আজীবন অবিকল ধরে রাখে।
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  ২৪ ক্যারেট গোল্ড লিফ ও অর্গানিক ফুল
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  বাছাই করা প্রাকৃতিক শুকনা ফুল, ২৪ ক্যারেট খাঁটি মেটালিক গোল্ড ফ্লেক এবং হাই-ক্ল্যারিটি ক্রিস্টাল পিগমেন্ট দিয়ে প্রতিটি লেয়ার সাজানো হয়।
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  বিশেষ ফুল শুকানোর স্টুডিও
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  বিয়ের তোড়া ও হলুদের বরণমালার পাপড়ির রং প্রাণবন্ত রাখতে বিশেষ সিলিকা ডিহাইড্রেশন প্রযুক্তি ব্যবহার করা হয় যাতে ফুলের উজ্জ্বলতা নষ্ট না হয়।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Contact Information & Interactive Message Studio */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#D3CBBA]/80">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/20 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>যোগাযোগ করুন</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Meltsparkle স্টুডিওর সাথে যোগাযোগ
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              বিয়ের ফুল পাঠানো, কাস্টম গিফট প্যাকেজ বা বিশেষ ডিজাইনের যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* WhatsApp Direct Card */}
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">হোয়াটসঅ্যাপ চ্যাট</h4>
                    <p className="text-xs text-zinc-600">+৮৮০ ১৭১২-৩৪৫৬৭৮ (সবচেয়ে দ্রুত উত্তর)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider group-hover:underline">
                  মেসেজ দিন →
                </span>
              </a>

              {/* Facebook Direct Card */}
              <a
                href="https://www.facebook.com/Meltsparkle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#DFD8C7] hover:bg-[#D5CDBE] border border-[#D3CBBA] flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-black text-[#E8E2D3] flex items-center justify-center shadow-sm">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">ফেসবুক পেইজ</h4>
                    <p className="text-xs text-zinc-600">facebook.com/Meltsparkle</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider group-hover:underline">
                  ভিজিট করুন →
                </span>
              </a>

              {/* Email & Phone Card */}
              <div className="p-5 rounded-2xl bg-[#F2EDE2] border border-[#D3CBBA] space-y-3.5 shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">ইমেইল ঠিকানা</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">contact@meltsparkle.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <MapPin className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">স্টুডিও ও ওয়ার্কশপ</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">ঢাকা, বাংলাদেশ (সারা দেশে কুরিয়ার ডেলিভারি)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <Clock className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">কাস্টমার সার্ভিস সময়</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">শনিবার – বৃহস্পতিবার: সকাল ১০:০০ – রাত ৯:০০</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#F2EDE2] rounded-3xl p-6 sm:p-8 border border-[#D3CBBA] shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-1">
                মেসেজ পাঠান বা কাস্টম রিকোয়েস্ট করুন
              </h3>
              <p className="text-xs text-zinc-600 mb-6">
                নিচের ফর্মটি পূরণ করুন, আমাদের আর্টিসান টিম খুব দ্রুত আপনার সাথে হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করবে।
              </p>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900">ইনকোয়ারি সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                    ধন্যবাদ {formData.name}। আমাদের আর্টিসান টিম শীঘ্রই আপনার ফোন নম্বরে ({formData.phone}) ডিজাইনের বিস্তারিত ও ফুল পাঠানোর নিয়মসহ যোগাযোগ করবে।
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', topic: 'বিয়ের ফুল ও মালা সংরক্ষণ', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-full bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    আরেকটি মেসেজ পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        আপনার পুরো নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="যেমন: সারা রহমান"
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        ফোন / হোয়াটসঅ্যাপ নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="০১XXXXXXXXX"
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        ইমেইল ঠিকানা (ঐচ্ছিক)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        ইনকোয়ারির বিষয়
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
                      >
                        <option>বিয়ের ফুল ও মালা সংরক্ষণ</option>
                        <option>কাস্টম মনোগ্রাম কিপসেক</option>
                        <option>জিওড রেজিন ওয়াল ক্লক</option>
                        <option>বেবি মাইলস্টোন কিপসেক</option>
                        <option>কর্পোরেট ও বাল্ক উপহার</option>
                        <option>সাধারণ জিজ্ঞাসা ও ডেলিভারি</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      আপনার মেসেজ বা বিশেষ চাহিদা
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="আপনার পছন্দের কিপসেক, বিয়ের তারিখ বা বিশেষ কোনো লেখার বিষয়ে বিস্তারিত জানান..."
                      className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ইনকোয়ারি জমা দিন</span>
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
