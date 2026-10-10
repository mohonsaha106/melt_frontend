import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { OrderDetails } from '../types';
import { X, CheckCircle, ShieldCheck, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const BD_DISTRICTS = [
  'Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh',
  'Gazipur', 'Narayanganj', 'Cumilla', 'Bogura', 'Brahmanbaria', 'Cox\'s Bazar', 'Dinajpur',
  'Faridpur', 'Feni', 'Habiganj', 'Jamalpur', 'Jashore', 'Kushtia', 'Lakshmipur', 'Moulvibazar',
  'Naogaon', 'Narsingdi', 'Natore', 'Nawabganj', 'Netrokona', 'Noakhali', 'Pabna', 'Patuakhali',
  'Sirajganj', 'Tangail'
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    isFreeShippingUnlocked,
    clearCart,
    setLastOrder
  } = useStore();

  const { t, formatPrice, tNumber, language } = useLanguage();

  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [paymentType, setPaymentType] = useState<'cod_advance' | 'full'>('cod_advance');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = isFreeShippingUnlocked ? 0 : (deliveryArea === 'dhaka' ? 60 : 110);
  const totalAmount = cartSubtotal + deliveryFee;
  const advanceAmount = paymentType === 'cod_advance' ? 50 : totalAmount;
  const dueOnDelivery = totalAmount - advanceAmount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg(t.checkout.errName);
      return;
    }
    if (!phone.trim() || !/^01[3-9]\d{8}$/.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg(t.checkout.errPhone);
      return;
    }
    if (!address.trim()) {
      setErrorMsg(t.checkout.errAddress);
      return;
    }


    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `MS-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId: orderNumber,
        customerName: fullName,
        phone,
        district,
        thana: thana || district,
        address,
        deliveryMethod: deliveryArea,
        paymentType,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryFee,
        discount: 0,
        total: totalAmount,
        advanceAmount,
        dueAmount: dueOnDelivery,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Order Placed'
      };

      setCompletedOrder(order);
      setLastOrder(order);
      clearCart();
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 1000);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Main Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#E8E2D3] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden z-10 border border-black/10 text-[#111111]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-black/10 bg-[#DFD8C7]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-[#111111]">
              {completedOrder 
                ? (language === 'bn' ? 'অর্ডার কনফার্মেশন' : 'Order Confirmation') 
                : t.checkout.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-zinc-600 hover:text-black hover:bg-[#D4CCB8] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {completedOrder ? (
          /* Order Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-600/15 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-mono">
                {t.checkout.successBadge}
              </span>
              <h3 className="text-2xl font-bold text-[#111111] mt-1 font-serif">
                {t.checkout.thankYou}, {completedOrder.customerName}!
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                {t.checkout.orderIdLabel}: <strong className="font-mono text-[#111111]">{completedOrder.orderId}</strong>
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#F2EDE2] border border-black/10 rounded-2xl p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-zinc-700">
                <span>{t.checkout.deliveryAddressLabel}:</span>
                <span className="font-medium text-[#111111] text-right max-w-[240px] truncate">
                  {completedOrder.address}, {completedOrder.district}
                </span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>{t.checkout.mobileLabel}:</span>
                <span className="font-mono text-[#111111]">{completedOrder.phone}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>{t.checkout.itemsCountLabel} ({tNumber(completedOrder.items.length)}):</span>
                <span className="font-bold text-[#111111]">{formatPrice(completedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>{t.checkout.deliveryChargeLabel}:</span>
                <span>{completedOrder.deliveryFee === 0 ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatPrice(completedOrder.deliveryFee)}</span>
              </div>
              <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-bold text-[#111111]">
                <span>{t.checkout.totalAmountLabel}:</span>
                <span>{formatPrice(completedOrder.total)}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>{t.checkout.advanceLabel}:</span>
                <span>{formatPrice(completedOrder.advanceAmount)}</span>
              </div>
              {completedOrder.dueAmount > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>{t.checkout.dueOnDeliveryLabel}:</span>
                  <span>{formatPrice(completedOrder.dueAmount)}</span>
                </div>
              )}
            </div>

            {/* Next Steps Notice */}
            <div className="p-4 bg-[#DFD8C7] rounded-2xl border border-black/10 text-left text-xs text-[#111111] space-y-1">
              <p className="font-bold">{t.checkout.nextStepTitle}</p>
              <p className="text-[11px] leading-relaxed text-zinc-700">
                {language === 'bn' ? (
                  <>অনুগ্রহ করে <strong>{formatPrice(completedOrder.advanceAmount)}</strong> আমাদের বিকাশ/নগদ মার্চেন্ট নম্বর: <strong>01712-345678</strong> (Send Money / Payment) পাঠিয়ে অর্ডার আইডি <strong>{completedOrder.orderId}</strong> রেফারেন্স হিসেবে দিন।</>
                ) : (
                  <>Please send <strong>{formatPrice(completedOrder.advanceAmount)}</strong> advance to our official bKash/Nagad Merchant number: <strong>01712-345678</strong> (Send Money / Payment) using your Order ID <strong>{completedOrder.orderId}</strong> as the reference.</>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/8801712345678?text=Hello%20Meltsparkle!%20I%20placed%20order%20${completedOrder.orderId}%20for%20BDT%20${completedOrder.total}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.checkout.confirmOnWhatsApp}</span>
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                {t.checkout.backToStore}
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar">
            {errorMsg && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-700 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Delivery Location Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-2">
                {t.checkout.deliveryLocationStep}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => {
                    setDeliveryArea('dhaka');
                    setDistrict('Dhaka');
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryArea === 'dhaka'
                      ? 'border-black bg-black text-[#E8E2D3] shadow-sm'
                      : 'border-black/15 bg-[#F2EDE2] text-[#111111] hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{t.checkout.insideDhaka}</span>
                    <span className="text-xs font-bold">
                      {isFreeShippingUnlocked ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatPrice(60)}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${deliveryArea === 'dhaka' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {t.checkout.insideDhakaDesc}
                  </p>
                </div>

                <div
                  onClick={() => setDeliveryArea('outside')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    deliveryArea === 'outside'
                      ? 'border-black bg-black text-[#E8E2D3] shadow-sm'
                      : 'border-black/15 bg-[#F2EDE2] text-[#111111] hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{t.checkout.outsideDhaka}</span>
                    <span className="text-xs font-bold">
                      {isFreeShippingUnlocked ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatPrice(110)}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${deliveryArea === 'outside' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {t.checkout.outsideDhakaDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                {t.checkout.shippingInfoStep}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">{t.checkout.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.checkout.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">{t.checkout.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.checkout.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">{t.checkout.districtLabel}</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">{t.checkout.thanaLabel}</label>
                  <input
                    type="text"
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    placeholder={t.checkout.thanaPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 mb-1">{t.checkout.addressLabel}</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                {t.checkout.paymentPreferenceStep}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentType('cod_advance')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentType === 'cod_advance'
                      ? 'border-black bg-black text-[#E8E2D3] shadow-sm'
                      : 'border-black/15 bg-[#F2EDE2] text-[#111111] hover:border-black/30'
                  }`}
                >
                  <div className="text-xs font-bold">{t.checkout.codOptionTitle}</div>
                  <p className={`text-[11px] mt-1 ${paymentType === 'cod_advance' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {t.checkout.codOptionDesc}
                  </p>
                </div>

                <div
                  onClick={() => setPaymentType('full')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentType === 'full'
                      ? 'border-black bg-black text-[#E8E2D3] shadow-sm'
                      : 'border-black/15 bg-[#F2EDE2] text-[#111111] hover:border-black/30'
                  }`}
                >
                  <div className="text-xs font-bold">{t.checkout.fullAdvanceTitle}</div>
                  <p className={`text-[11px] mt-1 ${paymentType === 'full' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {t.checkout.fullAdvanceDesc}
                  </p>
                </div>
              </div>

              {/* Payment details */}
              <div className="p-3.5 bg-[#DFD8C7] border border-black/10 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-800">{t.checkout.sendAdvanceVia}</span>
                  <div className="flex space-x-2">
                    {['bkash', 'nagad', 'rocket'].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method as any)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors ${
                          paymentMethod === method
                            ? 'bg-black text-[#E8E2D3]'
                            : 'bg-[#F2EDE2] border border-black/10 text-zinc-700'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-700">
                  {t.checkout.merchantNumber} <strong>01712-345678</strong> (bKash / Nagad)
                </p>
              </div>
            </div>

            {/* Order Price Summary */}
            <div className="p-4 rounded-2xl bg-[#F2EDE2] border border-black/10 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-700">
                <span>{t.cart.subtotal} ({tNumber(cart.length)} {t.cart.itemCount}):</span>
                <span className="font-medium text-[#111111]">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>{t.checkout.deliveryChargeLabel}:</span>
                <span>{deliveryFee === 0 ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatPrice(deliveryFee)}</span>
              </div>
              <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-bold text-[#111111]">
                <span>{t.checkout.totalAmountLabel}:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>{t.checkout.payableNow}</span>
                <span>{formatPrice(advanceAmount)}</span>
              </div>
              {dueOnDelivery > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>{t.checkout.payableAtDoorstep}</span>
                  <span>{formatPrice(dueOnDelivery)}</span>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-black hover:bg-zinc-900 disabled:bg-[#C8C0AD] disabled:text-zinc-600 text-[#E8E2D3] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-md hover:shadow-lg"
            >
              {isSubmitting ? (
                <span>{t.checkout.processingBtn}</span>
              ) : (
                <>
                  <span>{t.checkout.confirmOrderBtn} ({formatPrice(advanceAmount)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
