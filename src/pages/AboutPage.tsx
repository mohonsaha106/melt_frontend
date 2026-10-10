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
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Wedding Flower Preservation',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = language === 'bn' 
      ? 'আমাদের গল্প ও যোগাযোগ | মেল্ট স্পার্কল বাংলাদেশ' 
      : 'About Us & Contact Atelier | Melt Sparkle';
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E8E2D3] pt-4 pb-20 selection:bg-black selection:text-[#E8E2D3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#D3CBBA]/60">
          <nav className="flex items-center space-x-2 text-xs text-zinc-600">
            <Link to="/" className="hover:text-black transition-colors font-medium flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">{t.aboutPage.breadcrumb}</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>{t.howToOrderPage.browseCatalog}</span>
          </Link>
        </div>

        {/* 1. Hero Brand Narrative */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.aboutPage.heroBadge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
            {t.aboutPage.heroTitle}
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            {t.aboutPage.heroDesc}
          </p>
        </div>

        {/* 2. Key Metrics Strip */}
        <div className="bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] shadow-sm mb-16 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#D3CBBA]">
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900">
                {language === 'bn' ? '১০০%' : '100%'}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">
                {language === 'bn' ? 'হস্তনির্মিত কারুকাজ' : 'Hand-Poured Craft'}
              </div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-900">
                {language === 'bn' ? '১৫,০০০+' : '15,000+'}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">
                {language === 'bn' ? 'স্মৃতি সংরক্ষিত' : 'Memories Preserved'}
              </div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900">
                {language === 'bn' ? '৬৪' : '64'}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">
                {t.aboutPage.statsDistricts}
              </div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-900">
                {language === 'bn' ? '৪.৯ / ৫.০' : '4.9 / 5.0'}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">
                {t.aboutPage.statsAverageRating}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Craftsmanship Pillars */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900">
              {t.aboutPage.whyChooseTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              {language === 'bn' 
                ? 'আপনার স্মৃতি, গোল্ড ফয়েল ও রেজিনের চিরস্থায়ী উজ্জ্বলতা ধরে রাখার শিল্পসম্মত প্রতিশ্রুতি।'
                : 'How we ensure your flowers, gold leaf, and keepsakes stay vibrant for a lifetime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  {t.aboutPage.why1Title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {t.aboutPage.why1Desc}
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  {t.aboutPage.why2Title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {t.aboutPage.why2Desc}
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  {t.aboutPage.why3Title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {t.aboutPage.why3Desc}
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
              <span>{language === 'bn' ? 'যোগাযোগ করুন' : 'GET IN TOUCH'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {t.aboutPage.contactTitle}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              {t.aboutPage.contactSubtitle}
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
                    <h4 className="text-sm font-bold text-zinc-900">
                      {language === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Chat'}
                    </h4>
                    <p className="text-xs text-zinc-600">
                      {language === 'bn' ? '+৮৮০ ১৭১২-৩৪৫৬৭৮ (সবচেয়ে দ্রুত উত্তর)' : '+880 1712-345678 (Fastest Response)'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider group-hover:underline">
                  {language === 'bn' ? 'চ্যাট শুরু করুন →' : 'Chat Now →'}
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
                    <h4 className="text-sm font-bold text-zinc-900">
                      {language === 'bn' ? 'ফেসবুক পেজ' : 'Facebook Page'}
                    </h4>
                    <p className="text-xs text-zinc-600">facebook.com/Meltsparkle</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider group-hover:underline">
                  {language === 'bn' ? 'পেজে যুক্ত হন →' : 'Follow →'}
                </span>
              </a>

              {/* Email & Phone Card */}
              <div className="p-5 rounded-2xl bg-[#F2EDE2] border border-[#D3CBBA] space-y-3.5 shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                      {language === 'bn' ? 'ইমেইল জিজ্ঞাসা' : 'Email Inquiries'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">contact@meltsparkle.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <MapPin className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                      {language === 'bn' ? 'স্টুডিও ও ওয়ার্কশপ' : 'Studio & Workshop'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                      {language === 'bn' ? 'ঢাকা, বাংলাদেশ (সারাদেশে হোম ডেলিভারি)' : 'Dhaka, Bangladesh (Nationwide Delivery)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <Clock className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                      {language === 'bn' ? 'কাস্টমার সার্ভিস সময়' : 'Customer Service Hours'}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                      {language === 'bn' ? 'শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ৯টা' : 'Sat – Thu: 10:00 AM – 9:00 PM (GMT+6)'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#F2EDE2] rounded-3xl p-6 sm:p-8 border border-[#D3CBBA] shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-1">
                {language === 'bn' ? 'বার্তা পাঠান বা কাস্টম রিকোয়েস্ট দিন' : 'Send an Inquiry or Custom Request'}
              </h3>
              <p className="text-xs text-zinc-600 mb-6">
                {language === 'bn' 
                  ? 'নিচের ফর্মটি পূরণ করুন, আমাদের কারিগর টিম দ্রুত আপনার সাথে যোগাযোগ করবে।' 
                  : 'Fill out the form below and our atelier team will connect with you on WhatsApp or call.'}
              </p>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 font-serif">
                    {language === 'bn' ? 'বার্তা গ্রহণ করা হয়েছে!' : 'Inquiry Received!'}
                  </h4>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                    {language === 'bn' 
                      ? `ধন্যবাদ ${formData.name}। আমাদের মাস্টার কারিগর শীঘ্রই আপনার নম্বরে (${formData.phone}) ডিজাইন ও ফুল প্রেরণের বিস্তারিত নিয়ে যোগাযোগ করবেন।`
                      : `Thank you ${formData.name}. Our master artisan will reach out to your phone (${formData.phone}) with design details and flower intake guidelines shortly.`}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', topic: 'Wedding Flower Preservation', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-full bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider"
                  >
                    {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: সারাহ রহমান' : 'e.g., Sarah Rahman'}
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        {language === 'bn' ? 'ফোন / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        {language === 'bn' ? 'ইমেইল এড্রেস (ঐচ্ছিক)' : 'Email Address (Optional)'}
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
                        {language === 'bn' ? 'জিজ্ঞাসার বিষয়' : 'Inquiry Topic'}
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
                      >
                        <option value="Wedding Flower Preservation">
                          {language === 'bn' ? 'বিয়ের ফুল সংরক্ষণ' : 'Wedding Flower Preservation'}
                        </option>
                        <option value="Custom Monogram Keepsake">
                          {language === 'bn' ? 'কাস্টম মনোগ্রাম কিপসেক' : 'Custom Monogram Keepsake'}
                        </option>
                        <option value="Geode Wall Clock Order">
                          {language === 'bn' ? 'জিওড ওয়াল ক্লক অর্ডার' : 'Geode Wall Clock Order'}
                        </option>
                        <option value="Baby Milestone Keepsake">
                          {language === 'bn' ? 'বেবি মেমোরি কিপসেক' : 'Baby Milestone Keepsake'}
                        </option>
                        <option value="Corporate & Bulk Gifting">
                          {language === 'bn' ? 'কর্পোরেট ও বাল্ক উপহার' : 'Corporate & Bulk Gifting'}
                        </option>
                        <option value="General Support & Delivery">
                          {language === 'bn' ? 'সাধারণ সহায়তা ও ডেলিভারি' : 'General Support & Delivery'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      {language === 'bn' ? 'আপনার বার্তা বা কাস্টম ডিজাইন সম্পর্কে লিখুন' : 'Your Message or Custom Vision'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'bn' 
                        ? 'আপনার কাঙ্ক্ষিত কিপসেক, বিয়ের তারিখ বা খোদাই করতে চাওয়া নাম সম্পর্কে লিখুন...' 
                        : "Tell us about the keepsake, wedding date, or special inscription you'd like..."}
                      className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-widest rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.aboutPage.formSubmit}</span>
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
