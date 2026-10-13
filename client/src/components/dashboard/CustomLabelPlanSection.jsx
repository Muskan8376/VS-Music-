import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const CustomLabelPlanSection = ({ user }) => {
  const [purchasedPlan, setPurchasedPlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleBuy = async (planId, planName) => {
    setLoadingPlan(planId);
    try {
      const res = await fetch('http://localhost:5000/api/pricing/purchase-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email || 'artist@vusic.com',
          planId
        })
      });
      const data = await res.json();
      if (data.success) {
        setPurchasedPlan(planId);
        setTimeout(() => setPurchasedPlan(null), 3500);
      }
    } catch {
      setPurchasedPlan(planId);
      setTimeout(() => setPurchasedPlan(null), 3500);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="bg-[#fff1f2] rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 shadow-xs border border-pink-100">
      {/* Top Header & Overview Row matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        {/* Left: Heading & Bullet Points */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e2025] tracking-tight mb-4">
            Custom Label Plan
          </h2>
          <ul className="space-y-2.5 text-sm sm:text-base text-gray-700 font-medium pl-0 list-none m-0">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Official Label Name registration on all platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Unlimited artists</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Complete rights management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Illegal Takedown service</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Advanced data, analytics, and business management software</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Exclusive partnership opportunities</span>
            </li>
          </ul>
        </div>

        {/* Right: Industry Quote matching Screenshot 1 */}
        <div className="lg:pt-2">
          <blockquote className="text-xs sm:text-sm lg:text-base italic text-gray-500 font-normal leading-relaxed m-0">
            &ldquo;For Labels, production houses, Independent Artists, YouTube channels having multiple artists, Studios, Rights Holders, Music Companies, Film Companies, and Film production houses, Religious Groups etc who own multiple songs of different artists and want to register their BRAND NAME on all platforms and monetize and generate revenue from their content&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Two Plan Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {/* Card 1: PRO LABEL (Orange Card) */}
        <div className="bg-[#f97316] rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div>
            {/* Title & Price */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide uppercase m-0">
                PRO LABEL
              </h3>
              <div className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                Rs 5,499/-
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">
                (Per Custom Label, One-Time Fee)
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-3 text-xs sm:text-sm text-white/95 font-medium pl-0 list-none mb-8">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>One-Time Label Registration – no recurring annual charges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Pay Per Release – release music as per your schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Unlimited Artists – add and manage as many artists as you want under your label</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Wide Platform Coverage – distribution on all Indian & international platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>YouTube Content ID + Caller Tunes included</span>
              </li>
            </ul>

            {/* High Revenue Share Highlight Box */}
            <div className="bg-black/10 rounded-2xl p-4 text-center mb-6 border border-white/10">
              <div className="font-extrabold text-sm sm:text-base text-white mb-1.5">
                High Revenue Share
              </div>
              <div className="text-xs text-white/90 space-y-0.5">
                <div>• 90% on music streaming platforms</div>
                <div>• 85% on YouTube Content ID</div>
              </div>
            </div>

            {/* Sub-Highlights */}
            <div className="text-center text-xs font-bold text-white/90 space-y-1 mb-6">
              <div>No Annual Fee</div>
              <div>No Limit on Artists</div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              type="button"
              onClick={() => handleBuy('pro-label', 'PRO LABEL')}
              disabled={loadingPlan === 'pro-label'}
              className="w-full py-3.5 px-6 rounded-xl bg-white text-[#f97316] hover:bg-orange-50 font-extrabold text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              {loadingPlan === 'pro-label' ? (
                <span>Activating...</span>
              ) : purchasedPlan === 'pro-label' ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  <span>PRO LABEL Activated!</span>
                </>
              ) : (
                <span>BUY NOW</span>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: ANNUAL LIMITLESS LABEL (Ocean Blue Card) */}
        <div className="bg-[#0284c7] rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div>
            {/* Title & Price */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide uppercase m-0">
                ANNUAL LIMITLESS LABEL
              </h3>
              <div className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
                Rs 9,999/-
              </div>
              <div className="text-xs text-white/90 font-medium mt-1">
                (Per Year, Per Label)
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-3 text-xs sm:text-sm text-white/95 font-medium pl-0 list-none mb-8">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Unlimited Artists – no restrictions on the number of artists under your label</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Free Unlimited Song Releases – release as many tracks as you want</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Label Registration on All Platforms – Indian & International platforms covered</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>YouTube Content ID + Caller Tunes included</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">•</span>
                <span>Lifetime Streaming Guarantee</span>
              </li>
            </ul>

            {/* Revenue Share Highlight Box */}
            <div className="bg-black/10 rounded-2xl p-4 text-center mb-6 border border-white/10">
              <div className="font-extrabold text-sm sm:text-base text-white mb-1.5">
                Revenue Share
              </div>
              <div className="text-xs text-white/90 space-y-0.5">
                <div>• 80% on music streaming platforms</div>
                <div>• 80% on YouTube Content ID</div>
              </div>
            </div>

            {/* Sub-Highlights */}
            <div className="text-center text-xs font-bold text-white/90 space-y-1 mb-6">
              <div>Annual Plan</div>
              <div>Unlimited Uploads</div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              type="button"
              onClick={() => handleBuy('annual-limitless-label', 'ANNUAL LIMITLESS LABEL')}
              disabled={loadingPlan === 'annual-limitless-label'}
              className="w-full py-3.5 px-6 rounded-xl bg-white text-[#0284c7] hover:bg-sky-50 font-extrabold text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              {loadingPlan === 'annual-limitless-label' ? (
                <span>Activating...</span>
              ) : purchasedPlan === 'annual-limitless-label' ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  <span>LIMITLESS Activated!</span>
                </>
              ) : (
                <span>BUY NOW</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomLabelPlanSection;
