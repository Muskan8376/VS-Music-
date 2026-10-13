import React from 'react';

export const PricingPlansCards = ({
  user,
  plans = [],
  onSelectPlan
}) => {
  const displayName = user?.username || user?.email?.split('@')[0] || 'Muskan';

  const defaultPlans = [
    {
      id: 'pay-per-release',
      title: 'Pay Per Release',
      bgColor: 'bg-[#7c69af]',
      btnBg: 'bg-[#574785] hover:bg-[#4a3c72]',
      desc: 'For those who simply want their song on all global platforms and earn revenue',
      highlights: 'NO MONTHLY FEE, NO ANNUAL FEE, NO LIMIT ON ARTIST'
    },
    {
      id: 'artist-unlimited',
      title: 'Artist Unlimited',
      bgColor: 'bg-[#4db686]',
      btnBg: 'bg-[#31855e] hover:bg-[#276e4c]',
      desc: 'For single artist who wants unlimited song release under his artist name with a negligible annual fee',
      highlights: 'ONE ARTIST, ONE ANNUAL FEE, UNLIMITED UPLOADS FOR AN YEAR'
    },
    {
      id: 'label-plan',
      title: 'Label Plan',
      bgColor: 'bg-[#1e88e5]',
      btnBg: 'bg-[#1565c0] hover:bg-[#0d47a1]',
      desc: 'Release your song under your label name and create a Brand. This is the perfect plan to start your own music company and record label business',
      highlights: ''
    }
  ];

  const activePlans = plans.length > 0 ? plans.map((p, i) => ({
    ...p,
    bgColor: defaultPlans[i]?.bgColor || 'bg-[#7c69af]',
    btnBg: defaultPlans[i]?.btnBg || 'bg-[#574785]'
  })) : defaultPlans;

  return (
    <section className="mb-14">
      {/* Top Greeting and Credits Pill (Exact match to Screenshot 1) */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e2025] tracking-tight mb-2">
          Welcome back, <span className="text-[#6366f1]">{displayName}</span>
        </h2>

        {/* Credits Badge Button (Cyan Pill) */}
        <div className="inline-flex items-center">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-bold text-xs tracking-wide shadow-xs border-none cursor-pointer transition-all"
          >
            Credits: {user?.credits || 0}
          </button>
        </div>
      </div>

      {/* Main Center Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1e2025] tracking-tight">
          Pricing Plan
        </h1>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {activePlans.map((plan) => (
          <div
            key={plan.id}
            className={`${plan.bgColor} rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[380px] sm:min-h-[420px]`}
          >
            {/* Card Content */}
            <div className="space-y-6 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white m-0">
                {plan.title}
              </h3>

              <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto">
                {plan.desc || plan.description}
              </p>

              {(plan.highlights || plan.badge) && (
                <p className="text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase leading-snug max-w-xs mx-auto pt-2">
                  {plan.highlights || plan.badge}
                </p>
              )}
            </div>

            {/* Bottom Button */}
            <div className="pt-8 text-center">
              <button
                type="button"
                onClick={() => onSelectPlan?.(plan)}
                className={`${plan.btnBg} text-white font-bold text-xs sm:text-sm py-2.5 px-8 rounded-xl transition-all duration-200 border-none cursor-pointer shadow-md active:scale-95`}
              >
                Check Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlansCards;
