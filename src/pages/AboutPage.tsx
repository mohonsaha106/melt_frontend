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
    topic: 'Wedding Flower Preservation',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Us & Contact Atelier | Melt Sparkle';
  }, []);

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
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">About & Contact</span>
          </nav>

          <Link
            to="/shop"
            className="text-xs font-semibold text-zinc-800 hover:text-black flex items-center space-x-1.5 py-1 px-3.5 rounded-full bg-[#DFD8C7] hover:bg-[#D3CBBA] border border-[#D3CBBA] transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Shop Atelier</span>
          </Link>
        </div>

        {/* 1. Hero Brand Narrative */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-900 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>OUR STORY & MISSION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
            Handcrafted resin creations made for keeping memories alive.
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            Meltsparkle was founded on a simple, heartfelt promise: <strong className="text-zinc-900 font-semibold">Keeping memories alive!</strong> From sacred wedding garlands and bride-groom blossoms to personalized monogram initials, geode quartz clocks, and botanical jewelry — every piece is poured by hand with museum-grade archival epoxy, real botanicals, and artisanal love in Bangladesh.
          </p>
        </div>

        {/* 2. Key Metrics Strip */}
        <div className="bg-[#DFD8C7] rounded-3xl p-6 sm:p-10 border border-[#D3CBBA] shadow-sm mb-16 sm:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#D3CBBA]">
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">Hand-Poured Craft</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-amber-900">15,000+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">Memories Preserved</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900">64</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">Districts in Bangladesh</div>
            </div>
            <div className="pt-3 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-900">4.9 / 5.0</div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-1">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* 3. Craftsmanship Pillars */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900">
              Artisanal Quality & Standards
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              How we ensure your flowers, gold leaf, and keepsakes stay vibrant for a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  UV Archival Resin Formula
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  We use premium non-yellowing, bubble-free crystal epoxy designed specifically for long-term floral and color retention.
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Gem className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  Real 24K Gold Leaf & Flora
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  Natural organic pressed flowers, authentic metallic gold flakes, and high-clarity crystal pigments embedded with precision.
                </p>
              </div>
            </div>

            <div className="bg-[#F2EDE2] border border-[#D3CBBA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-black/30 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#DFD8C7] flex items-center justify-center text-amber-800 mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                  Sacred Flower Care Studio
                </h3>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  Specialized silica-dehydration techniques for wedding bouquets and holud garlands to prevent petal bruising and oxidation.
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
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Contact Meltsparkle Atelier
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-lg mx-auto">
              Have questions about sending your wedding flowers, bulk gifting orders, or bespoke custom keepsakes? Reach out anytime!
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
                    <h4 className="text-sm font-bold text-zinc-900">WhatsApp Chat</h4>
                    <p className="text-xs text-zinc-600">+880 1712-345678 (Fastest Response)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider group-hover:underline">
                  Chat Now →
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
                    <h4 className="text-sm font-bold text-zinc-900">Facebook Page</h4>
                    <p className="text-xs text-zinc-600">facebook.com/Meltsparkle</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider group-hover:underline">
                  Follow →
                </span>
              </a>

              {/* Email & Phone Card */}
              <div className="p-5 rounded-2xl bg-[#F2EDE2] border border-[#D3CBBA] space-y-3.5 shadow-2xs">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Email Inquiries</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">contact@meltsparkle.com</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <MapPin className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Studio & Workshop</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">Dhaka, Bangladesh (Nationwide Delivery)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 pt-2 border-t border-[#D3CBBA]/60">
                  <Clock className="w-4 h-4 text-amber-800 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Customer Service Hours</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900">Sat – Thu: 10:00 AM – 9:00 PM (GMT+6)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#F2EDE2] rounded-3xl p-6 sm:p-8 border border-[#D3CBBA] shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mb-1">
                Send an Inquiry or Custom Request
              </h3>
              <p className="text-xs text-zinc-600 mb-6">
                Fill out the form below and our atelier team will connect with you on WhatsApp or call.
              </p>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 font-serif">Inquiry Received!</h4>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                    Thank you {formData.name}. Our master artisan will reach out to your phone ({formData.phone}) with design details and flower intake guidelines shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', topic: 'Wedding Flower Preservation', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-full bg-black text-[#E8E2D3] text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Sarah Rahman"
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                        Phone / WhatsApp *
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
                        Email Address (Optional)
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
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer"
                      >
                        <option>Wedding Flower Preservation</option>
                        <option>Custom Monogram Keepsake</option>
                        <option>Geode Wall Clock Order</option>
                        <option>Baby Milestone Keepsake</option>
                        <option>Corporate & Bulk Gifting</option>
                        <option>General Support & Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                      Your Message or Custom Vision
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the keepsake, wedding date, or special inscription you'd like..."
                      className="w-full bg-[#DFD8C7] hover:bg-[#DCD4C2] focus:bg-[#DFD8C7] border border-[#D3CBBA] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black hover:bg-zinc-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-widest rounded-full transition-transform active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
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
