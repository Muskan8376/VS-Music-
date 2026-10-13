import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import SocialProofBar from './components/home/SocialProofBar';
import ArtistsFirstSection from './components/home/ArtistsFirstSection';
import ArtistsSection from './components/home/ArtistsSection';
import AudioDistributionSection from './components/home/AudioDistributionSection';
import Footer from './components/layout/Footer';
import AuthModal from './components/common/AuthModal';
import DashboardLayout from './components/dashboard/DashboardLayout';

/**
 * LandingPage
 * Renders the main landing page with interactive modals driven by the URL pathname
 */
function LandingPage({ currentUser, onAuthSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal mode derived directly from the URL
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register' || location.pathname === '/signup';
  const isStart = location.pathname === '/start';
  const isAuthOpen = isLogin || isRegister || isStart;
  const authMode = isLogin ? 'login' : isStart ? 'start' : 'register';

  const handleOpenAuth = (mode = 'register') => {
    if (mode === 'login') navigate('/login');
    else if (mode === 'start') navigate('/start');
    else navigate('/register');
  };

  const handleCloseAuth = () => {
    navigate('/');
  };

  const handleSwitchMode = (newMode) => {
    if (newMode === 'login') navigate('/login');
    else if (newMode === 'start') navigate('/start');
    else navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2329] antialiased">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onGoToDashboard={() => navigate('/dashboard')}
      />

      {/* Main Landing Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection onStartNow={() => navigate('/start')} />
        <SocialProofBar />
        <ArtistsFirstSection />
        <ArtistsSection />
        <AudioDistributionSection />
      </main>

      {/* Global Footer */}
      <Footer onOpenAuth={handleOpenAuth} />

      {/* Auth Modal synced to /login, /register, and /start URLs */}
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={handleCloseAuth}
        onSwitchMode={handleSwitchMode}
        onAuthSuccess={onAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  // Load saved user session or default demo session if available
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('vusic_current_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Called when login (after OTP) or register succeeds -> Redirects to /dashboard!
  const handleAuthSuccess = (user) => {
    let displayUsername = user?.username;
    if (!displayUsername || displayUsername === user?.email) {
      displayUsername = 'Muskan';
    } else {
      displayUsername = displayUsername.charAt(0).toUpperCase() + displayUsername.slice(1);
    }

    const updatedUser = {
      ...user,
      username: displayUsername,
      credits: user?.credits || 0
    };

    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('vusic_current_user', JSON.stringify(updatedUser));
    } catch {}

    // Navigate to /dashboard URL
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vusic_current_user');
    } catch {}
    navigate('/login');
  };

  const handleUpdateUser = (updated) => {
    setCurrentUser(updated);
    try {
      localStorage.setItem('vusic_current_user', JSON.stringify(updated));
    } catch {}
  };

  // Safe user fallback for direct URL access to /dashboard or /checkout
  const effectiveUser = currentUser || {
    id: 'user_demo_1',
    username: 'Muskan',
    email: 'dhaniyamuskan7@gmail.com',
    phone: '+91 8376980140',
    credits: 0
  };

  return (
    <Routes>
      {/* 1. Landing and Auth URLs */}
      <Route
        path="/"
        element={
          <LandingPage
            currentUser={currentUser}
            onAuthSuccess={handleAuthSuccess}
          />
        }
      />
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LandingPage
              currentUser={currentUser}
              onAuthSuccess={handleAuthSuccess}
            />
          )
        }
      />
      <Route
        path="/register"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LandingPage
              currentUser={currentUser}
              onAuthSuccess={handleAuthSuccess}
            />
          )
        }
      />
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      <Route
        path="/start"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LandingPage
              currentUser={currentUser}
              onAuthSuccess={handleAuthSuccess}
            />
          )
        }
      />

      {/* 2. Standalone / Global Pricing URL */}
      <Route
        path="/pricing"
        element={<Navigate to="/dashboard/pricing" replace />}
      />

      {/* 3. Dashboard URLs */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout
            user={effectiveUser}
            onSignOut={handleSignOut}
            onReturnHome={() => navigate('/')}
            onUpdateUser={handleUpdateUser}
          />
        }
      />
      <Route
        path="/dashboard/pricing"
        element={
          <DashboardLayout
            user={effectiveUser}
            onSignOut={handleSignOut}
            onReturnHome={() => navigate('/')}
            onUpdateUser={handleUpdateUser}
          />
        }
      />

      {/* 4. Cashfree Checkout URLs */}
      <Route
        path="/dashboard/checkout"
        element={
          <DashboardLayout
            user={effectiveUser}
            onSignOut={handleSignOut}
            onReturnHome={() => navigate('/')}
            onUpdateUser={handleUpdateUser}
          />
        }
      />
      <Route
        path="/checkout"
        element={
          <DashboardLayout
            user={effectiveUser}
            onSignOut={handleSignOut}
            onReturnHome={() => navigate('/')}
            onUpdateUser={handleUpdateUser}
          />
        }
      />

      {/* 5. Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
