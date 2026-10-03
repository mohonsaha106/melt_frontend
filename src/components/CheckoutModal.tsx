import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
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
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || !/^01[3-9]\d{8}$/.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX)');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your full street address and house/road number');
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
              {completedOrder ? 'Order Confirmation' : 'Complete Your Keepsake Order'}
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
                ORDER PLACED SUCCESSFULLY
              </span>
              <h3 className="text-2xl font-bold text-[#111111] mt-1 font-serif">
                Thank You, {completedOrder.customerName}!
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Order ID: <strong className="font-mono text-[#111111]">{completedOrder.orderId}</strong>
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#F2EDE2] border border-black/10 rounded-2xl p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-zinc-700">
                <span>Delivery Address:</span>
                <span className="font-medium text-[#111111] text-right max-w-[240px] truncate">
                  {completedOrder.address}, {completedOrder.district}
                </span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Mobile Number:</span>
                <span className="font-mono text-[#111111]">{completedOrder.phone}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Items ({completedOrder.items.length}):</span>
                <span className="font-bold text-[#111111]">৳{completedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Delivery Charge:</span>
                <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `৳${completedOrder.deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-bold text-[#111111]">
                <span>Total Amount:</span>
                <span>৳{completedOrder.total}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Advance to Confirm (bKash/Nagad):</span>
                <span>৳{completedOrder.advanceAmount}</span>
              </div>
              {completedOrder.dueAmount > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Due on Delivery (COD):</span>
                  <span>৳{completedOrder.dueAmount}</span>
                </div>
              )}
            </div>

            {/* Next Steps Notice */}
            <div className="p-4 bg-[#DFD8C7] rounded-2xl border border-black/10 text-left text-xs text-[#111111] space-y-1">
              <p className="font-bold">Next Step: Token Advance Confirmation</p>
              <p className="text-[11px] leading-relaxed text-zinc-700">
                Please send ৳{completedOrder.advanceAmount} advance to our official bKash/Nagad Merchant number: <strong>01712-345678</strong> (Send Money / Payment) using your Order ID <strong>{completedOrder.orderId}</strong> as the reference.
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
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 bg-black hover:bg-zinc-900 text-[#E8E2D3] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Back To Store
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
                1. Delivery Location
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
                    <span className="text-xs font-bold">Inside Dhaka</span>
                    <span className="text-xs font-bold">
                      {isFreeShippingUnlocked ? 'FREE' : '৳60'}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${deliveryArea === 'dhaka' ? 'text-zinc-300' : 'text-zinc-600'}`}>1–2 Days Fast Delivery</p>
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
                    <span className="text-xs font-bold">Outside Dhaka</span>
                    <span className="text-xs font-bold">
                      {isFreeShippingUnlocked ? 'FREE' : '৳110'}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${deliveryArea === 'outside' ? 'text-zinc-300' : 'text-zinc-600'}`}>2–4 Days across Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                2. Shipping Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anika Tabassum"
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">Phone Number (11-Digits) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-mono text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">District *</label>
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
                  <label className="block text-[11px] font-medium text-zinc-700 mb-1">Thana / Area</label>
                  <input
                    type="text"
                    value={thana}
                    onChange={(e) => setThana(e.target.value)}
                    placeholder="e.g. Dhanmondi / Agrabad"
                    className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-700 mb-1">Complete Street Address *</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House, Road, Block/Sector, Landmark..."
                  className="w-full px-3.5 py-2.5 bg-[#F2EDE2] border border-black/15 rounded-xl text-xs font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                3. Payment Preference
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
                  <div className="text-xs font-bold">Cash on Delivery (৳50 Advance)</div>
                  <p className={`text-[11px] mt-1 ${paymentType === 'cod_advance' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Pay ৳50 token to confirm artisan dispatch, rest on delivery.
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
                  <div className="text-xs font-bold">Full Advance (100%)</div>
                  <p className={`text-[11px] mt-1 ${paymentType === 'full' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Direct bKash / Nagad payment. No cash hassle at delivery.
                  </p>
                </div>
              </div>

              {/* Payment details */}
              <div className="p-3.5 bg-[#DFD8C7] border border-black/10 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-800">Send Advance via:</span>
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
                  Merchant/Personal: <strong>01712-345678</strong> (bKash / Nagad)
                </p>
              </div>
            </div>

            {/* Order Price Summary */}
            <div className="p-4 rounded-2xl bg-[#F2EDE2] border border-black/10 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-700">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-medium text-[#111111]">৳{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Delivery Charge:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-black/10 flex justify-between text-sm font-bold text-[#111111]">
                <span>Total Payable:</span>
                <span>৳{totalAmount}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Payable Now (Advance):</span>
                <span>৳{advanceAmount}</span>
              </div>
              {dueOnDelivery > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Payable at Doorstep:</span>
                  <span>৳{dueOnDelivery}</span>
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
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>CONFIRM ORDER (৳{advanceAmount} ADVANCE)</span>
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
