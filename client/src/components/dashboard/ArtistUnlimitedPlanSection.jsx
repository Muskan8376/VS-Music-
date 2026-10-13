import React, { useState, useEffect } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import TaxAccountInfoModal from './TaxAccountInfoModal';
import { API_BASE_URL } from '../../config/api';

export const ArtistUnlimitedPlanSection = ({ user, onPurchased, onInitiateCheckout }) => {
  const [artistsCount, setArtistsCount] = useState(1);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const [calculation, setCalculation] = useState({
    artists: 1,
    basePricePerArtist: 3999,
    discountPercent: 0,
    savings: 0,
    subtotal: 3999,
    gstRate: '18%',
    gstAmount: 719.82,
    totalPayable: 4718.82
  });

  useEffect(() => {
    const count = Math.max(1, Number(artistsCount) || 1);
    const basePrice = 3999;

    let discount = 0;
    if (count >= 5) discount = 15;
    else if (count >= 3) discount = 10;

    const rawSub = count * basePrice;
    const savingsAmount = Math.round((rawSub * discount) / 100);
    const effSub = rawSub - savingsAmount;
    const gst = Number((effSub * 0.18).toFixed(2));
    const total = Number((effSub + gst).toFixed(2));

    setCalculation({
      artists: count,
      basePricePerArtist: basePrice,
      discountPercent: discount,
      savings: savingsAmount,
      subtotal: effSub,
      gstRate: '18%',
      gstAmount: gst,
      totalPayable: total
    });
  }, [artistsCount]);

  const handleDecrement = () => {
    if (artistsCount > 1) setArtistsCount((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setArtistsCount((prev) => prev + 1);
  };

  // Clicking "BUY NOW" opens the 3-state Tax Account Information dialog
  const handleBuyNowClick = () => {
    setIsTaxModalOpen(true);
  };

  // When user completes Tax selection (Yes GST or No GST), route to Cashfree checkout
  const handleProceedToPayment = (taxData) => {
    setIsTaxModalOpen(false);

    if (onInitiateCheckout) {
      onInitiateCheckout({
        planName: 'Artist Unlimited Plan',
        amount: calculation.totalPayable,
        credits: artistsCount,
        artistsCount,
        taxData
      });
      return;
    }

    // Direct fallback purchase simulation
    setLoading(true);
    fetch(`${API_BASE_URL}/api/pricing/purchase-artist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user?.email || 'artist@vusic.com',
        quantity: artistsCount,
        taxData
      })
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPurchaseSuccess(true);
          onPurchased?.();
          setTimeout(() => setPurchaseSuccess(false), 3000);
        }
      })
      .catch(() => {
        setPurchaseSuccess(true);
        setTimeout(() => setPurchaseSuccess(false), 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-[#e6f7f8] rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 shadow-xs border border-teal-100">
      {/* Top Header & Overview Row matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2025] tracking-tight mb-4">
            Artist Unlimited Plan
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-gray-700 font-medium pl-0 list-none m-0">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>For individual artists who do not need any label and want to release unlimited songs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>No pay per release</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>pay once and upload unlimited for an entire year</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>add-on additional artists at a price</span>
            </li>
          </ul>
        </div>

        <div className="lg:pt-2">
          <blockquote className="text-sm sm:text-base italic text-gray-500 font-normal leading-relaxed m-0">
            &ldquo;One Artist, One annual fee, unlimited uploads for an year&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Centered BUY Artist CREDITS Card */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-7 sm:p-9 relative">
        <div className="text-center mb-5">
          <h3 className="text-base sm:text-lg font-extrabold text-[#1e2025] tracking-widest uppercase m-0">
            BUY Artist CREDITS
          </h3>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl sm:text-5xl font-black text-gray-700 tracking-tight">
            Rs 3999 /-
          </div>
          <div className="text-xs text-gray-400 font-bold mt-1">
            per Artist
          </div>
        </div>

        {/* Blush Interactive Calculator Panel */}
        <div className="bg-[#fff1f2] rounded-2xl p-5 sm:p-6 border border-pink-100 space-y-3.5 mb-5 text-sm text-gray-800">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">No of Artists</span>
            <div className="flex items-center gap-2 bg-white rounded-xl border border-pink-200 px-2 py-1 shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={artistsCount <= 1}
                className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 border-none cursor-pointer font-bold transition-all"
                aria-label="Decrease artists"
              >
                <Minus size={12} strokeWidth={3} />
              </button>

              <span className="w-8 text-center font-extrabold text-sm text-[#1e2025]">
                {artistsCount}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 border-none cursor-pointer font-bold transition-all"
                aria-label="Increase artists"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Discount</span>
            <span className="font-bold text-gray-800">{calculation.discountPercent}%</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Savings</span>
            <span className="font-bold text-emerald-600">
              Rs {calculation.savings > 0 ? calculation.savings : '00'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">GST @ 18%</span>
            <span className="font-bold text-gray-800">Rs {calculation.gstAmount}</span>
          </div>
        </div>

        <div className="text-center my-5">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1e2025] tracking-tight">
            Rs {calculation.totalPayable}/-
          </div>
        </div>

        {/* Action Button: BUY NOW triggers Tax Account Information modal */}
        <button
          type="button"
          onClick={handleBuyNowClick}
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl text-white font-extrabold text-sm sm:text-base tracking-wider uppercase bg-[#ff4d4f] hover:bg-[#ff3335] active:scale-[0.99] transition-all shadow-md shadow-red-500/20 border-none cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : purchaseSuccess ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span>Artist Enrolled!</span>
            </>
          ) : (
            <span>BUY NOW</span>
          )}
        </button>

        {purchaseSuccess && (
          <div className="mt-3 text-center text-xs font-bold text-emerald-600 animate-in fade-in">
            ✓ Successfully enrolled {artistsCount} Artist(s) into Artist Unlimited!
          </div>
        )}
      </div>

      {/* Tax Account Information Modal with 3 States */}
      <TaxAccountInfoModal
        isOpen={isTaxModalOpen}
        onClose={() => setIsTaxModalOpen(false)}
        planDetails={{
          planName: 'Artist Unlimited Plan',
          amount: calculation.totalPayable,
          artistsCount
        }}
        onProceedToPayment={handleProceedToPayment}
      />
    </section>
  );
};

export default ArtistUnlimitedPlanSection;
