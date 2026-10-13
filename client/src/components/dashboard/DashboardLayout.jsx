import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import PricingPlansCards from './PricingPlansCards';
import ComparisonSheetTable from './ComparisonSheetTable';
import CreditsCalculatorCard from './CreditsCalculatorCard';
import CustomLabelPlanSection from './CustomLabelPlanSection';
import ArtistUnlimitedPlanSection from './ArtistUnlimitedPlanSection';
import CashfreeCheckoutModal from '../checkout/CashfreeCheckoutModal';
import { API_BASE_URL } from '../../config/api';

export const DashboardLayout = ({
  user,
  onSignOut,
  onReturnHome,
  onUpdateUser
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [plans, setPlans] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);

  const topPricingRef = useRef(null);
  const comparisonRef = useRef(null);
  const pprCalculatorRef = useRef(null);
  const artistUnlimitedRef = useRef(null);
  const customLabelRef = useRef(null);

  // Sync active tab with URL path (/dashboard vs /dashboard/pricing)
  const isPricingPath = location.pathname.includes('/pricing');
  const activeTab = isPricingPath ? 'pricing' : 'home';

  // Sync checkout modal with URL path (/checkout or /dashboard/checkout)
  const isCheckoutPath = location.pathname.endsWith('/checkout') || location.pathname === '/checkout';

  // Read amount & credits from query params if available
  const queryAmount = Number(searchParams.get('amount')) || 706.82;
  const queryCredits = Number(searchParams.get('credits')) || 1;
  const isArtistPlan = searchParams.get('plan') === 'artist-unlimited';
  const queryPlan = isArtistPlan
    ? 'Artist Unlimited Plan'
    : searchParams.get('plan') || 'Pay Per Release (PPR)';
  const queryGst = searchParams.get('gst');
  const queryTrade = searchParams.get('trade');
  const queryAddress = searchParams.get('address');

  // Fetch backend pricing and comparison sheet on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, compRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/pricing/plans`).then((r) => r.json()),
          fetch(`${API_BASE_URL}/api/pricing/comparison`).then((r) => r.json())
        ]);
        if (plansRes.success) setPlans(plansRes.data);
        if (compRes.success) setComparisonData(compRes.data);
      } catch {
        // Fallbacks handled in children
      }
    };
    fetchData();
  }, []);

  // Scroll to section when tab changes or URL updates
  useEffect(() => {
    if (isPricingPath) {
      comparisonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isPricingPath]);

  // When clicking on Pay Per Release (PPR), navigate URL to /dashboard/checkout!
  const handleSelectPlan = (plan) => {
    if (plan.id === 'pay-per-release') {
      navigate('/dashboard/checkout?plan=ppr&amount=706.82&credits=1');
    } else if (plan.id === 'artist-unlimited') {
      artistUnlimitedRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (plan.id === 'label-plan') {
      customLabelRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/dashboard/pricing');
    }
  };

  const handleOpenPprCheckout = (customOrderData) => {
    const amt = customOrderData?.amount || 706.82;
    const creds = customOrderData?.credits || 1;
    navigate(`/dashboard/checkout?plan=ppr&amount=${amt}&credits=${creds}`);
  };

  const handleOpenArtistCheckout = (orderInfo) => {
    const amt = orderInfo.amount || 4718.82;
    const creds = orderInfo.credits || orderInfo.artistsCount || 1;
    let url = `/dashboard/checkout?plan=artist-unlimited&amount=${amt}&credits=${creds}&artists=${orderInfo.artistsCount || 1}`;
    if (orderInfo.taxData?.hasGst && orderInfo.taxData?.gstNumber) {
      url += `&gst=${encodeURIComponent(orderInfo.taxData.gstNumber)}&trade=${encodeURIComponent(orderInfo.taxData.tradeName || '')}&address=${encodeURIComponent(orderInfo.taxData.address || '')}`;
    }
    navigate(url);
  };

  const handleTabSelect = (tab) => {
    if (tab === 'home') {
      navigate('/dashboard');
      topPricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'pricing') {
      navigate('/dashboard/pricing');
    }
  };

  const handleCloseCheckout = () => {
    navigate('/dashboard');
  };

  const handlePaymentSuccess = (addedCredits) => {
    const newTotal = (user?.credits || 0) + (Number(addedCredits) || 1);
    onUpdateUser?.({
      ...user,
      credits: newTotal
    });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col antialiased text-[#1e2025]">
      {/* 1. Dashboard Top Header */}
      <DashboardHeader
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignOut={onSignOut}
        onReturnHome={onReturnHome}
      />

      {/* 2. Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Navigation Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          collapsed={sidebarCollapsed}
          onSignOut={onSignOut}
          onReturnHome={onReturnHome}
        />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {/* Section 1: Welcome Greeting, Credits Pill, & 3 Colored Plan Cards (Screenshot 1) */}
          <div ref={topPricingRef}>
            <PricingPlansCards
              user={user}
              plans={plans}
              onSelectPlan={handleSelectPlan}
            />
          </div>

          {/* Section 2: Comparison Sheet Table (Screenshots 2, 3, 4) */}
          <div ref={comparisonRef}>
            <ComparisonSheetTable comparisonData={comparisonData} />
          </div>

          {/* Section 3: Pay Per Release (PPR) & BUY CREDITS Calculator */}
          <div ref={pprCalculatorRef}>
            <CreditsCalculatorCard
              user={user}
              onCreditsPurchased={handlePaymentSuccess}
              onInitiateCheckout={handleOpenPprCheckout}
            />
          </div>

          {/* Section 4: Custom Label Plan (PRO LABEL and ANNUAL LIMITLESS LABEL) */}
          <div ref={customLabelRef}>
            <CustomLabelPlanSection user={user} />
          </div>

          {/* Section 5: Artist Unlimited Plan (BUY Artist CREDITS Rs 3999) */}
          <div ref={artistUnlimitedRef}>
            <ArtistUnlimitedPlanSection
              user={user}
              onPurchased={() => {}}
              onInitiateCheckout={handleOpenArtistCheckout}
            />
          </div>
        </main>
      </div>

      {/* Cashfree Payment Gateway Checkout Modal (api.cashfree.com/checkout/) */}
      <CashfreeCheckoutModal
        isOpen={isCheckoutPath}
        onClose={handleCloseCheckout}
        orderData={{
          amount: queryAmount,
          credits: queryCredits,
          planName: queryPlan,
          gstDetails: queryGst
            ? {
                gstNumber: queryGst,
                tradeName: queryTrade,
                address: queryAddress
              }
            : null
        }}
        user={user}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default DashboardLayout;
