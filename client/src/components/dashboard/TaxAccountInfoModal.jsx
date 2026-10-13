import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

/**
 * TaxAccountInfoModal
 * Renders the 3-state Tax Account Information dialog for the Artist Unlimited Plan:
 * 1. "Do you have a GST?" question with "Yes, I have" and "No, Continue Without GST"
 * 2. Form view for entering Trade Name, GST number, and Address
 * 3. Information view for proceeding without GST
 */
export const TaxAccountInfoModal = ({
  isOpen,
  onClose,
  planDetails,
  onProceedToPayment
}) => {
  // 'ASK_GST' | 'YES_GST' | 'NO_GST'
  const [view, setView] = useState('ASK_GST');

  // Form states
  const [tradeName, setTradeName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Reset states when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setView('ASK_GST');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceedWithGst = (e) => {
    e.preventDefault();
    if (!tradeName.trim()) {
      setError('Please enter your Trade Name');
      return;
    }
    if (!gstNumber.trim()) {
      setError('Please enter your GST number');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your Address');
      return;
    }

    onProceedToPayment?.({
      hasGst: true,
      tradeName: tradeName.trim(),
      gstNumber: gstNumber.trim().toUpperCase(),
      address: address.trim(),
      ...planDetails
    });
  };

  const handleProceedWithoutGst = () => {
    onProceedToPayment?.({
      hasGst: false,
      tradeName: '',
      gstNumber: '',
      address: '',
      ...planDetails
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Modal Container matching Screenshots */}
      <div className="bg-[#2e3846] rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 w-full max-w-md overflow-hidden relative text-white animate-in zoom-in-95 duration-150">
        
        {/* Top Header Row matching Screenshots */}
        <div className="px-6 pt-5 pb-3.5 border-b border-gray-600/70 flex items-center justify-between relative">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide m-0 text-center flex-1">
            Your Tax Account Information
          </h3>

          {/* Red Close "X" Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-[#ff2d3b] hover:text-[#ff4d5a] p-1 bg-transparent border-none cursor-pointer transition-colors absolute right-4 top-4"
            aria-label="Close dialog"
          >
            <X size={20} strokeWidth={2.8} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* ================= VIEW 1: DO YOU HAVE A GST? ================= */}
          {view === 'ASK_GST' && (
            <div className="text-center py-3">
              <p className="text-[#9aa7b7] text-sm sm:text-base font-medium mb-7 m-0">
                Do you have a GST?
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                {/* Red "Yes, I have" Pill Button */}
                <button
                  type="button"
                  onClick={() => setView('YES_GST')}
                  className="bg-[#ff2d3b] hover:bg-[#e6202e] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer border-none"
                >
                  Yes, I have
                </button>

                {/* White "No, Continue Without GST" Pill Button with Red Text */}
                <button
                  type="button"
                  onClick={() => setView('NO_GST')}
                  className="bg-white hover:bg-gray-100 text-[#ff2d3b] font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full border-2 border-[#ff2d3b] transition-all cursor-pointer"
                >
                  No, Continue Without GST
                </button>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: YES, I HAVE GST (FORM) ================= */}
          {view === 'YES_GST' && (
            <div>
              {/* Red Back Arrow */}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setView('ASK_GST');
                }}
                className="text-[#ff2d3b] hover:text-[#ff4d5a] p-0 mb-4 bg-transparent border-none cursor-pointer flex items-center transition-colors"
                aria-label="Back to previous question"
              >
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>

              {error && (
                <div className="mb-3 p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleProceedWithGst} className="space-y-3.5">
                {/* Trade Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Trade Name"
                    value={tradeName}
                    onChange={(e) => {
                      setTradeName(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full text-sm px-4 py-3 rounded-xl bg-[#3c4858] text-white placeholder-[#8e9cae] border border-gray-600/40 focus:outline-none focus:border-[#ff2d3b] transition-colors"
                  />
                </div>

                {/* GST Input */}
                <div>
                  <input
                    type="text"
                    placeholder="GST"
                    value={gstNumber}
                    onChange={(e) => {
                      setGstNumber(e.target.value.toUpperCase());
                      if (error) setError('');
                    }}
                    className="w-full text-sm px-4 py-3 rounded-xl bg-[#3c4858] text-white placeholder-[#8e9cae] border border-gray-600/40 focus:outline-none focus:border-[#ff2d3b] transition-colors uppercase font-mono"
                  />
                  {/* GST Code Format Hint matching Screenshot 2 */}
                  <div className="text-[11px] text-[#9aa7b7] font-normal mt-1.5 pl-1 text-left">
                    GST code format: 22AAAAA0000A1Z5
                  </div>
                </div>

                {/* Address Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full text-sm px-4 py-3 rounded-xl bg-[#3c4858] text-white placeholder-[#8e9cae] border border-gray-600/40 focus:outline-none focus:border-[#ff2d3b] transition-colors"
                  />
                </div>

                {/* Full-width Red "Proceed to Payment" Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#ff2d3b] hover:bg-[#e6202e] text-white font-bold text-sm sm:text-base shadow-lg transition-all border-none cursor-pointer mt-5"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          )}

          {/* ================= VIEW 3: NO GST? NO PROBLEM! ================= */}
          {view === 'NO_GST' && (
            <div>
              {/* Red Back Arrow */}
              <button
                type="button"
                onClick={() => setView('ASK_GST')}
                className="text-[#ff2d3b] hover:text-[#ff4d5a] p-0 mb-4 bg-transparent border-none cursor-pointer flex items-center transition-colors"
                aria-label="Back to previous question"
              >
                <ArrowLeft size={22} strokeWidth={2.5} />
              </button>

              {/* White Card matching Screenshot 3 */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm text-left mb-6 text-gray-900">
                <h4 className="text-base font-extrabold text-gray-900 m-0 mb-1">
                  No GST? No problem!
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium m-0 leading-relaxed">
                  You can still proceed to payment without providing GST details.
                </p>
              </div>

              {/* Full-width Red "Proceed to Payment" Button */}
              <button
                type="button"
                onClick={handleProceedWithoutGst}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#ff2d3b] hover:bg-[#e6202e] text-white font-bold text-sm sm:text-base shadow-lg transition-all border-none cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxAccountInfoModal;
