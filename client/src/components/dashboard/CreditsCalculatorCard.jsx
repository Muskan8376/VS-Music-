import React, { useState, useEffect } from 'react';
import { CheckCircle2, Plus, Minus, Sparkles, Check } from 'lucide-react';

export const CreditsCalculatorCard = ({ user, onCreditsPurchased, onInitiateCheckout }) => {
  const [credits, setCredits] = useState(1);
  const [loading, setLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [calculation, setCalculation] = useState({
    credits: 1,
    basePricePerSong: 599,
    discountPercent: 0,
    savings: 0,
    effectivePricePerSong: 599,
    subtotal: 599,
    gstRate: '18%',
    gstAmount: 107.82,
    totalPayable: 706.82
  });

  // Calculate live price locally or via backend API
  useEffect(() => {
    const count = Math.max(1, Number(credits) || 1);
    const basePrice = 599;

    let discount = 0;
    if (count >= 10) discount = 20;
    else if (count >= 5) discount = 10;

    const rawSub = count * basePrice;
    const savingsAmount = Math.round((rawSub * discount) / 100);
    const effSub = rawSub - savingsAmount;
    const effPerSong = Math.round(effSub / count);
    const gst = Number((effSub * 0.18).toFixed(2));
    const total = Number((effSub + gst).toFixed(2));

    setCalculation({
      credits: count,
      basePricePerSong: basePrice,
      discountPercent: discount,
      savings: savingsAmount,
      effectivePricePerSong: effPerSong,
      subtotal: effSub,
      gstRate: '18%',
      gstAmount: gst,
      totalPayable: total
    });
  }, [credits]);

  const handleDecrement = () => {
    if (credits > 1) setCredits((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setCredits((prev) => prev + 1);
  };

  const handlePurchase = async () => {
    if (onInitiateCheckout) {
      onInitiateCheckout({
        amount: calculation.totalPayable,
        credits,
        calculation,
        planName: 'Pay Per Release (PPR)'
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/pricing/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email || 'artist@vusic.com',
          quantity: credits
        })
      });
      const data = await res.json();
      if (data.success) {
        onCreditsPurchased?.(data.credits);
        setPurchaseSuccess(true);
        setTimeout(() => setPurchaseSuccess(false), 3000);
      }
    } catch (err) {
      const newTotal = (user?.credits || 0) + credits;
      onCreditsPurchased?.(newTotal);
      setPurchaseSuccess(true);
      setTimeout(() => setPurchaseSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-14">
      {/* Section Header & Description Row matching Screenshot 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
        {/* Left: Heading & Bullets */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2025] tracking-tight mb-4">
            Pay Per Release (PPR)
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-700 font-medium pl-0 list-none m-0">
            <li className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>For Individual artists who do not need any custom label</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>No monthly or Annual Fee</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Unlimited artists</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>No Custom Label</span>
            </li>
          </ul>
        </div>

        {/* Right: Quote */}
        <div className="lg:pt-4">
          <blockquote className="text-sm sm:text-base italic text-gray-500 font-normal leading-relaxed m-0 border-l-2 border-transparent pl-0">
            &ldquo;If you simply want your song on all Global Platforms and earn revenue this option is for you, you don't have to pay any annual or monthly fee and you will get complete stats and analytics with quarterly payment&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Centered BUY CREDITS Card (Screenshot 5) */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-7 sm:p-9 relative">
        {/* Card Title */}
        <div className="text-center mb-5">
          <h3 className="text-base sm:text-lg font-extrabold text-[#1e2025] tracking-widest uppercase m-0">
            BUY CREDITS
          </h3>
        </div>

        {/* Feature Checkmark Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-700 mb-6">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-red-500 fill-red-100 shrink-0" strokeWidth={2.5} />
            <span>Life time validity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-red-500 fill-red-100 shrink-0" strokeWidth={2.5} />
            <span>1 credit = 1 song upload</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-red-500 fill-red-100 shrink-0" strokeWidth={2.5} />
            <span>Discount on quantity</span>
          </div>
        </div>

        {/* Big Price Display */}
        <div className="text-center mb-6">
          <div className="text-4xl sm:text-5xl font-black text-gray-700 tracking-tight">
            Rs 599 /-
          </div>
          <div className="text-xs text-gray-400 font-bold mt-1">
            per song
          </div>
        </div>

        {/* Pink / Blush Interactive Calculator Panel (Exact match to screenshot 5) */}
        <div className="bg-[#fff1f2] rounded-2xl p-5 sm:p-6 border border-pink-100 space-y-3.5 mb-6 text-sm text-gray-800">
          {/* Stepper Row: No of credits */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">No of credits</span>
            <div className="flex items-center gap-2 bg-white rounded-xl border border-pink-200 px-2 py-1 shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={credits <= 1}
                className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 border-none cursor-pointer font-bold transition-all"
                aria-label="Decrease credits"
              >
                <Minus size={12} strokeWidth={3} />
              </button>

              <span className="w-8 text-center font-extrabold text-sm text-[#1e2025]">
                {credits}
              </span>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 border-none cursor-pointer font-bold transition-all"
                aria-label="Increase credits"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Discount Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Discount</span>
            <span className="font-bold text-gray-800">{calculation.discountPercent}%</span>
          </div>

          {/* Savings Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Savings</span>
            <span className="font-bold text-emerald-600">
              Rs {calculation.savings > 0 ? calculation.savings : '00'}
            </span>
          </div>

          {/* Effective price per song */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Effective price per song</span>
            <span className="font-bold text-gray-800">Rs {calculation.effectivePricePerSong}</span>
          </div>

          {/* GST @ 18% */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">GST @ 18%</span>
            <span className="font-bold text-gray-800">Rs {calculation.gstAmount}</span>
          </div>
        </div>

        {/* Centered Total Amount matching Screenshot 1 */}
        <div className="text-center my-5">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#1e2025] tracking-tight">
            Rs {calculation.totalPayable}/-
          </div>
        </div>

        {/* Action Button: BUY NOW (Matches red button in Screenshot 1) */}
        <button
          type="button"
          onClick={handlePurchase}
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl text-white font-extrabold text-sm sm:text-base tracking-wider uppercase bg-[#ff4d4f] hover:bg-[#ff3335] active:scale-[0.99] transition-all shadow-md shadow-red-500/20 border-none cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : purchaseSuccess ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span>{credits} Credit(s) Purchased!</span>
            </>
          ) : (
            <span>BUY NOW</span>
          )}
        </button>

        {purchaseSuccess && (
          <div className="mt-3 text-center text-xs font-bold text-emerald-600 animate-in fade-in">
            ✓ Credits updated! Your current balance is now reflected in the header.
          </div>
        )}
      </div>
    </section>
  );
};

export default CreditsCalculatorCard;
