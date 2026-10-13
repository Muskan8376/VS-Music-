import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Printer,
  ChevronRight,
  Sparkles
} from 'lucide-react';

/**
 * CashfreeReceiptView
 * Renders the complete, printable transaction receipt upon successful payment
 */
export const CashfreeReceiptView = ({ receiptData, onContinue }) => {
  const [copiedTxn, setCopiedTxn] = useState(false);

  if (!receiptData) return null;

  const handleCopyTxn = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  return (
    <div className="py-2 animate-in zoom-in-95 duration-200 space-y-5">
      {/* Success Banner */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md ring-8 ring-emerald-50">
          <Check size={36} strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-extrabold text-[#1e2025] m-0">Payment Successful!</h3>
        <p className="text-xs text-gray-500 mt-1">
          Your transaction has been authorized and verified by Cashfree Payments
        </p>
      </div>

      {/* Detailed Receipt Card */}
      <div className="border border-emerald-200 bg-gradient-to-b from-white to-emerald-50/20 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount Paid</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">₹{receiptData.amountPaid}</div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              <CheckCircle2 size={13} /> {receiptData.status || 'PAID'}
            </span>
            <div className="text-[11px] text-gray-400 font-medium mt-1">{receiptData.date}</div>
          </div>
        </div>

        {/* Transaction Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Transaction ID</div>
            <div className="flex items-center justify-between font-mono font-bold text-gray-800 mt-0.5">
              <span className="truncate max-w-[150px]">{receiptData.transactionId}</span>
              <button
                type="button"
                onClick={() => handleCopyTxn(receiptData.transactionId)}
                className="text-[#1ea1f2] hover:text-[#0c85d0] bg-transparent border-none cursor-pointer p-0 ml-1"
                title="Copy Transaction ID"
              >
                <Copy size={13} />
              </button>
            </div>
            {copiedTxn && <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Copied!</div>}
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Order Reference</div>
            <div className="font-mono font-bold text-gray-800 mt-0.5 truncate">
              {receiptData.orderId}
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Payment Method Used</div>
            <div className="font-bold text-gray-800 mt-0.5 truncate">
              {receiptData.paymentMethod}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <div className="text-[10px] text-emerald-700 font-bold uppercase">Plan &amp; Activation</div>
            <div className="font-extrabold text-emerald-800 mt-0.5 flex items-center gap-1 text-xs truncate">
              <Sparkles size={13} className="shrink-0" />
              <span>
                {receiptData.planName?.includes('Artist Unlimited')
                  ? `+${receiptData.credits} Artist Unlimited Active`
                  : `+${receiptData.credits} Song Upload Credit`}
              </span>
            </div>
          </div>

          {receiptData.gstDetails?.gstNumber && (
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 sm:col-span-2">
              <div className="text-[10px] text-blue-700 font-bold uppercase">Tax / GST Information</div>
              <div className="font-bold text-gray-900 mt-0.5 text-xs">
                {receiptData.gstDetails.tradeName || 'Registered Entity'} —{' '}
                <span className="font-mono text-[#1ea1f2]">{receiptData.gstDetails.gstNumber}</span>
              </div>
              {receiptData.gstDetails.address && (
                <div className="text-[11px] text-gray-500 mt-0.5">{receiptData.gstDetails.address}</div>
              )}
            </div>
          )}

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Paid To Merchant</div>
            <div className="font-bold text-gray-800 mt-0.5">
              {receiptData.merchant}
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">
              Customer: {receiptData.customerEmail} • {receiptData.customerPhone}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md border-none cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue to Dashboard</span>
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="py-3 px-5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
        >
          <Printer size={15} />
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
};

export default CashfreeReceiptView;
