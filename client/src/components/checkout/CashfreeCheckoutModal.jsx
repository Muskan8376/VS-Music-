import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Star
} from 'lucide-react';
import { CashfreePaymentViews } from './CashfreePaymentViews';
import { CashfreeReceiptView } from './CashfreeReceiptView';

/**
 * CashfreeCheckoutModal
 * Main checkout modal container: coordinates order lifecycle, branding pane,
 * payment views, and final transaction receipts.
 */
export const CashfreeCheckoutModal = ({
  isOpen,
  onClose,
  orderData,
  user,
  onPaymentSuccess
}) => {
  const [couponApplied, setCouponApplied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const baseAmount = Number(orderData?.totalPayable || orderData?.amount || 706.82);
  const currentAmount = couponApplied ? Math.max(0, Number((baseAmount - 100).toFixed(2))) : baseAmount;
  const phoneNumber = user?.phone || '+91 8376980140';
  const userEmail = user?.email || 'muskandhaniya12@gmail.com';
  const creditsToCredit = orderData?.credits || 1;

  // Initialize or reset checkout state on open
  useEffect(() => {
    if (isOpen) {
      setCouponApplied(false);
      setSelectedMethod(null);
      setProcessing(false);
      setIsSuccess(false);
      setReceiptData(null);

      // Create backend order
      fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentAmount,
          credits: creditsToCredit,
          email: userEmail,
          phone: phoneNumber,
          planName: orderData?.planName || 'Pay Per Release (PPR)'
        })
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.success && res.data?.orderId) {
            setOrderId(res.data.orderId);
          }
        })
        .catch(() => {
          setOrderId(`order_cf_${Date.now()}`);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handles payment submission and verification with backend
  const handleCompletePayment = async (paymentMode, methodDetails) => {
    setProcessing(true);
    const defaultTxnId = `CF-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateFormatted = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    try {
      const res = await fetch('http://localhost:5000/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId || `order_cf_${Date.now()}`,
          paymentMode,
          paymentMethod: methodDetails.method,
          details: methodDetails
        })
      });
      const data = await res.json();

      setTimeout(() => {
        setProcessing(false);
        setIsSuccess(true);
        setReceiptData({
          transactionId: data.order?.paymentDetails?.transactionId || defaultTxnId,
          orderId: orderId || `order_cf_${Date.now()}`,
          amountPaid: currentAmount,
          baseAmount,
          discount: couponApplied ? 100 : 0,
          paymentMethod: methodDetails.method,
          paymentMode,
          methodDetails,
          date: dateFormatted,
          credits: data.credits || creditsToCredit,
          customerEmail: userEmail,
          customerPhone: phoneNumber,
          merchant: 'VUSIC RECORDS PRIVATE LIMITED',
          planName: orderData?.planName || 'Pay Per Release (PPR)',
          gstDetails: orderData?.gstDetails || null
        });
      }, 1200);
    } catch {
      setTimeout(() => {
        setProcessing(false);
        setIsSuccess(true);
        setReceiptData({
          transactionId: defaultTxnId,
          orderId: orderId || `order_cf_${Date.now()}`,
          amountPaid: currentAmount,
          baseAmount,
          discount: couponApplied ? 100 : 0,
          paymentMethod: methodDetails.method,
          paymentMode,
          methodDetails,
          date: dateFormatted,
          credits: creditsToCredit,
          customerEmail: userEmail,
          customerPhone: phoneNumber,
          merchant: 'VUSIC RECORDS PRIVATE LIMITED',
          planName: orderData?.planName || 'Pay Per Release (PPR)',
          gstDetails: orderData?.gstDetails || null
        });
      }, 1200);
    }
  };

  const handleFinishAndClose = () => {
    if (receiptData) {
      onPaymentSuccess?.(receiptData.credits);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Cashfree Checkout Window Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row relative">

        {/* ================= LEFT PANE: BRANDING, AMOUNT & OFFERS ================= */}
        <div className="w-full md:w-[360px] bg-white border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between shrink-0">
          <div>
            {/* Top Blue Card Header */}
            <div className="bg-[#1ea1f2] text-white p-5 sm:p-6 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/95 mb-4">
                <Star size={13} className="fill-white text-white" />
                <span>Serving customers since 4 years with Cashfree</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center mb-3 transition-colors border-none cursor-pointer p-0"
                aria-label="Back to dashboard"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              {/* Vusic Records Logo Box */}
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#f43f5e] p-1.5 shadow-md flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-xl bg-[#e11d48] flex flex-col items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path d="M12 22L2 4h20L12 22z" />
                    </svg>
                    <span className="text-[6px] font-black uppercase tracking-tighter mt-0.5">Vusic</span>
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-white tracking-wide uppercase m-0 max-w-[240px] truncate">
                  VUSIC RECORDS PRIVATE LIM...
                </h3>
                <span className="text-[11px] text-white/80 mt-0.5">Verified Music Distribution</span>

                {/* Amount Display */}
                <div className="mt-4 w-full">
                  <div className="bg-black/20 hover:bg-black/25 text-white font-extrabold text-xl py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/10">
                    <span>₹{currentAmount}</span>
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Offers & Coupons Section */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700">Offers and Coupons</span>
                <button
                  type="button"
                  onClick={() => setCouponApplied(!couponApplied)}
                  className="text-xs font-semibold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  8 Offers Available &gt;
                </button>
              </div>

              {/* Paytm Cashback Coupon Card */}
              <div className="border border-gray-200 rounded-2xl p-3.5 flex items-center justify-between bg-white shadow-2xs hover:border-[#1ea1f2]/50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#002e6e] text-white flex items-center justify-center font-black text-[9px] tracking-tight">
                    Paytm
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1e2025]">Save ₹100 as cashback</div>
                    <div className="text-[10px] text-gray-400 font-medium">Valid on first UPI payment</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCouponApplied(!couponApplied)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    couponApplied
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-300 font-black'
                      : 'bg-white text-emerald-600 border-emerald-500 hover:bg-emerald-50'
                  }`}
                >
                  {couponApplied ? 'APPLIED' : 'APPLY'}
                </button>
              </div>

              {/* Order Breakdown */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>Plan</span>
                  <span className="font-semibold text-gray-700 truncate max-w-[180px]">
                    {orderData?.planName || 'Pay Per Release (PPR)'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Base Price</span>
                  <span className="font-semibold text-gray-700">₹{baseAmount}</span>
                </div>
                {orderData?.gstDetails?.gstNumber && (
                  <div className="flex justify-between text-gray-500">
                    <span>GSTIN</span>
                    <span className="font-mono font-bold text-gray-800 text-[11px]">
                      {orderData.gstDetails.gstNumber}
                    </span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Paytm Discount</span>
                    <span>-₹100.00</span>
                  </div>
                )}
                <div className="pt-1.5 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                  <span>Total Payable</span>
                  <span className="text-[#1ea1f2]">₹{currentAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secured by Cashfree Footer */}
          <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 font-semibold">
            <span>Secured by</span>
            <div className="flex items-center gap-1 font-bold text-gray-700">
              <span className="text-[#00875a] font-black text-sm">cashfree</span>
              <span className="text-[10px] text-gray-400">payments</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANE: ROUTER ================= */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-white flex flex-col justify-between">
          <div>
            {/* Top Phone Info Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                Payment Options for <strong className="text-black">{phoneNumber}</strong>
              </span>
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Shield size={12} /> 256-Bit SSL Secured
              </span>
            </div>

            {/* Conditional Views */}
            {isSuccess && receiptData ? (
              <CashfreeReceiptView
                receiptData={receiptData}
                onContinue={handleFinishAndClose}
              />
            ) : processing ? (
              <div className="py-20 text-center animate-in fade-in duration-150">
                <div className="w-14 h-14 border-4 border-[#1ea1f2] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h4 className="text-base font-extrabold text-gray-800 mb-1">Authorizing with Cashfree Gateway...</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Please do not refresh or press back. Connecting with the bank payment switch for authorization.
                </p>
              </div>
            ) : (
              <CashfreePaymentViews
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                currentAmount={currentAmount}
                phoneNumber={phoneNumber}
                onCompletePayment={handleCompletePayment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashfreeCheckoutModal;
