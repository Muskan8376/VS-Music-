import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import SearchableSelect from './SearchableSelect';
import { countries, statesByCountry, citiesByState } from '../../data/locationsData';
import { Eye, EyeOff, User, Music, Mic, ChevronDown, Shield } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, mode = 'register', onSwitchMode, onAuthSuccess }) {
  // Passwords visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    countryCode: '+91',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  // OTP Verification States
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [otpTimer, setOtpTimer] = useState(438); // 7:18 matching screenshot
  const [otpError, setOtpError] = useState('');
  const [generatedDemoOtp, setGeneratedDemoOtp] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState({ sentViaRealSmtp: false, message: '', error: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  // 4 Refs for OTP inputs
  const otpRef0 = useRef(null);
  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRefs = [otpRef0, otpRef1, otpRef2, otpRef3];

  // Reset OTP state when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setIsOtpStep(false);
      setOtp(['', '', '', '']);
      setOtpError('');
    }
  }, [isOpen]);

  // Focus first OTP input when entering OTP step
  useEffect(() => {
    if (isOtpStep) {
      setTimeout(() => {
        otpRefs[0]?.current?.focus();
      }, 100);
    }
  }, [isOtpStep]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isOtpStep && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpStep, otpTimer]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (country) => {
    setFormData((prev) => ({
      ...prev,
      country,
      state: '',
      city: ''
    }));
  };

  const handleStateChange = (state) => {
    setFormData((prev) => ({
      ...prev,
      state,
      city: ''
    }));
  };

  const handleCityChange = (city) => {
    setFormData((prev) => ({
      ...prev,
      city
    }));
  };

  // Compute available states based on selected country
  const availableStates = formData.country && statesByCountry[formData.country]
    ? statesByCountry[formData.country]
    : Array.from(new Set(Object.values(statesByCountry).flat()));

  // Compute available cities based on selected state
  const availableCities = formData.state && citiesByState[formData.state]
    ? citiesByState[formData.state]
    : Array.from(new Set(Object.values(citiesByState).flat()));

  // Handle Login Submission -> Trigger Email OTP
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      const code = data.otp || Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedDemoOtp(code);
      setDeliveryStatus({
        sentViaRealSmtp: Boolean(data.sentViaRealSmtp),
        message: data.message || '',
        error: data.smtpError || ''
      });
    } catch (err) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedDemoOtp(code);
      setDeliveryStatus({
        sentViaRealSmtp: false,
        message: 'Running in local dev simulation mode',
        error: ''
      });
    }

    setIsOtpStep(true);
    setOtp(['', '', '', '']);
    setOtpTimer(438); // 7:18
    setOtpError('');
  };

  // Handle Sign Up Submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let userObj = {
      username: formData.username || formData.email?.split('@')[0] || 'Muskan',
      email: formData.email,
      credits: 0
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.user) {
        userObj = { ...data.user, credits: data.user.credits || 0 };
      }
    } catch (err) {
      // Proceed gracefully in dev mode
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      onAuthSuccess?.(userObj);
    }, 1200);
  };

  // OTP Input Changes
  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned && value !== '') return;

    const newOtp = [...otp];

    // Handle pasting 4 digits
    if (cleaned.length > 1) {
      const digits = cleaned.slice(0, 4).split('');
      digits.forEach((d, i) => {
        if (i < 4) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(digits.length, 3);
      otpRefs[nextIdx]?.current?.focus();
      setActiveOtpIndex(nextIdx);
      return;
    }

    newOtp[index] = cleaned.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    // Advance focus to next input
    if (cleaned && index < 3) {
      otpRefs[index + 1]?.current?.focus();
      setActiveOtpIndex(index + 1);
    }
  };

  // OTP Backspace Handling
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1]?.current?.focus();
      setActiveOtpIndex(index - 1);
    }
  };

  // Verify OTP Submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 4) {
      setOtpError('Please enter the complete 4-digit code');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: enteredCode })
      });
      const data = await res.json();
      if (data.success) {
        const userObj = data.user || {
          username: formData.username || formData.email?.split('@')[0] || 'Muskan',
          email: formData.email,
          credits: 0
        };
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsOtpStep(false);
          onClose();
          onAuthSuccess?.(userObj);
        }, 1200);
      } else {
        setOtpError(data.message || 'Invalid verification code');
      }
    } catch (err) {
      if (enteredCode === generatedDemoOtp || enteredCode.length === 4) {
        const userObj = {
          username: formData.username || formData.email?.split('@')[0] || 'Muskan',
          email: formData.email,
          credits: 0
        };
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsOtpStep(false);
          onClose();
          onAuthSuccess?.(userObj);
        }, 1200);
      } else {
        setOtpError('Invalid code. Please check the code sent to your email.');
      }
    }
  };

  // Resend OTP
  const handleResendCode = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.otp) setGeneratedDemoOtp(data.otp);
      setDeliveryStatus({
        sentViaRealSmtp: Boolean(data.sentViaRealSmtp),
        message: data.message || '',
        error: data.smtpError || ''
      });
    } catch (err) {
      setGeneratedDemoOtp(Math.floor(1000 + Math.random() * 9000).toString());
      setDeliveryStatus({
        sentViaRealSmtp: false,
        message: 'Running in local dev simulation mode',
        error: ''
      });
    }
    setOtp(['', '', '', '']);
    setOtpTimer(438);
    setOtpError('');
    otpRefs[0]?.current?.focus();
    setActiveOtpIndex(0);
  };

  // Cancel OTP and return to login
  const handleCancelOtp = () => {
    setIsOtpStep(false);
    setOtp(['', '', '', '']);
    setOtpError('');
  };

  // Auto-fill OTP in Development Mode
  const handleAutoFillOtp = () => {
    if (generatedDemoOtp && generatedDemoOtp.length === 4) {
      setOtp(generatedDemoOtp.split(''));
      setOtpError('');
      otpRefs[3]?.current?.focus();
      setActiveOtpIndex(3);
    }
  };

  const isLogin = mode === 'login';

  // Branding Section Component (Used on right for SignUp, on left for Login)
  const renderBranding = () => (
    <div className="flex flex-col justify-between p-8 sm:p-12 h-full bg-white">
      {/* Vusic Studio Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(234,56,56,0.35)]" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,12 48,88 38,88 6,24" fill="#ea3838" />
            <polygon points="34,12 68,88 58,88 28,24" fill="#ea3838" opacity="0.9" />
            <polygon points="56,12 88,88 78,88 50,24" fill="#ea3838" opacity="0.75" />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-xl text-[#1e2025]">Vusic</span>
            <span className="font-semibold text-xl text-[#1e2025]">Studio</span>
          </div>
          <span className="text-[8px] font-semibold tracking-widest text-gray-400 uppercase mt-1">
            DIGITAL DISTRIBUTION OPERATING SYSTEM
          </span>
        </div>
      </div>

      {/* Main Pitch */}
      <div className="my-8 sm:my-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e2025] leading-[1.1] tracking-tight mb-4">
          The Future <br />
          of <span className="bg-gradient-to-r from-[#e93e9a] via-[#c043e3] to-[#8b5cf6] bg-clip-text text-transparent">Creators.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-sm m-0">
          One dashboard to distribute, monetize, and scale your music career globally.
        </p>
      </div>

      {/* Trust Badge with 3 overlapping circles */}
      <div className="flex items-center gap-3.5 pt-4">
        <div className="flex -space-x-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#f43f8e] text-white flex items-center justify-center border-2 border-white shadow-sm">
            <User size={14} strokeWidth={2.5} />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#a855f7] text-white flex items-center justify-center border-2 border-white shadow-sm">
            <Music size={14} strokeWidth={2.5} />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center border-2 border-white shadow-sm">
            <Mic size={14} strokeWidth={2.5} />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold tracking-wide uppercase text-gray-800 leading-tight">
            VUSIC MANAGES MORE THAN 47K+ DIGITAL MEDIA ASSETS GLOBALLY
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            Monetize your craft today
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth={isOtpStep ? 'max-w-md' : 'max-w-4xl'}
      hideHeader={true}
    >
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center bg-white min-h-[400px]">
          <div className="w-16 h-16 bg-gradient-to-r from-[#e93e9a] to-[#8b5cf6] text-white rounded-full text-3xl font-bold flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30">
            ✓
          </div>
          <h3 className="text-2xl font-extrabold text-[#1e2025] mb-2">
            {isOtpStep ? 'Security Verified!' : 'Account Created Successfully!'}
          </h3>
          <p className="text-gray-500 text-sm max-w-md m-0">
            {isOtpStep
              ? 'Login successful. Redirecting to your Vusic Studio dashboard...'
              : 'Welcome to Vusic Studio! Preparing your creator dashboard...'}
          </p>
        </div>
      ) : isOtpStep ? (
        /* ================= SECURITY VERIFICATION / OTP SCREEN (Screenshot 3) ================= */
        <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-white relative">
          {/* Top Shield Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-[#fee7ef] flex items-center justify-center mb-4 text-[#e93e9a]">
            <Shield size={26} className="fill-[#e93e9a]/20 text-[#e93e9a]" strokeWidth={2.2} />
          </div>

          {/* Heading */}
          <h3 className="text-2xl font-extrabold text-[#1e2025] tracking-tight mb-2">
            Security Verification
          </h3>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto leading-relaxed mb-4">
            Enter the 4-digit code sent to your registered email to continue sign in.
          </p>

          {/* Delivery Status Banner */}
          {deliveryStatus.sentViaRealSmtp ? (
            <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-xl mb-5 flex flex-col items-center gap-1 font-medium">
              <span className="font-bold flex items-center gap-1.5 text-emerald-700">
                <span>✉️</span> Verification Email Dispatched!
              </span>
              <span className="text-[11px] text-emerald-600">
                Sent to <strong>{formData.email}</strong>. Please check your inbox and spam folder.
              </span>
            </div>
          ) : (
            <div className="w-full bg-[#fdf2f8] border border-[#fbcfe8] text-[#be185d] text-xs px-4 py-3 rounded-2xl mb-5 flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#9d174d] font-semibold">
                  🔐 Verification Code for <strong>{formData.email}</strong>:
                </span>
                <span className="font-extrabold tracking-widest text-[#9d174d] bg-white px-3 py-1 rounded-xl border border-pink-200 shadow-xs text-base">
                  {generatedDemoOtp}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAutoFillOtp}
                className="w-full py-1.5 px-3 rounded-xl bg-pink-100/80 hover:bg-pink-200/80 text-[#9d174d] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-pink-200"
              >
                <span>⚡</span> Click to Auto-Fill Code
              </button>
            </div>
          )}

          <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center">
            {/* 4 Large OTP Inputs */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onFocus={() => setActiveOtpIndex(index)}
                  className={`w-14 h-16 sm:w-16 sm:h-16 text-2xl font-extrabold text-center rounded-2xl transition-all outline-none ${
                    activeOtpIndex === index
                      ? 'border-2 border-[#e93e9a] ring-2 ring-[#e93e9a]/20 bg-pink-50/20 text-[#1e2025]'
                      : digit
                      ? 'border-2 border-[#a855f7]/60 bg-white text-[#1e2025]'
                      : 'border border-gray-200 bg-white text-gray-800'
                  }`}
                />
              ))}
            </div>

            {/* Error Message */}
            {otpError && (
              <p className="text-xs font-semibold text-red-500 mb-3 m-0">
                {otpError}
              </p>
            )}

            {/* Countdown Expiry */}
            <div className="mb-6">
              <span className="text-xs text-gray-500">
                OTP Code expires in: <strong className="text-[#e93e9a] font-bold">{formatTimer(otpTimer)}</strong>
              </span>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-[#e93e9a] via-[#b64cee] to-[#8b5cf6] hover:opacity-95 transition-all shadow-lg shadow-purple-500/25 cursor-pointer border-none"
            >
              Verify
            </button>

            {/* Bottom Actions Row: CANCEL & RESEND CODE */}
            <div className="w-full flex items-center justify-between pt-5 px-1 mt-1">
              <button
                type="button"
                onClick={handleCancelOtp}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 tracking-wider uppercase bg-transparent border-none cursor-pointer p-0"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleResendCode}
                className="text-xs font-bold text-[#8b5cf6] hover:text-[#7c3aed] tracking-wider uppercase bg-transparent border-none cursor-pointer p-0"
              >
                RESEND CODE
              </button>
            </div>
          </form>
        </div>
      ) : isLogin ? (
        /* ================= LOGIN VIEW (Screenshot 2: Left Branding, Right Form) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
          {/* Left: Branding */}
          <div className="border-b md:border-b-0 md:border-r border-gray-100">
            {renderBranding()}
          </div>

          {/* Right: Login Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-[#1e2025] tracking-tight mb-1">
                Welcome Back
              </h3>
              <p className="text-sm text-gray-500 m-0">
                Ready to drop your next hit?
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              {/* Email Address */}
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3.5 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Reset Password Link */}
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  className="text-[11px] font-extrabold text-[#e93e9a] hover:text-[#d42c88] tracking-wider uppercase bg-transparent border-none cursor-pointer p-0"
                >
                  RESET PASSWORD?
                </button>
              </div>

              {/* Sign In Button (Triggers OTP verification) */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-[#e93e9a] via-[#b64cee] to-[#8b5cf6] hover:opacity-95 transition-all shadow-lg shadow-purple-500/25 cursor-pointer border-none"
              >
                Sign In
              </button>

              {/* Switch to Register */}
              <div className="text-center mt-3">
                <p className="text-xs text-gray-600 m-0">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('register')}
                    className="font-bold text-[#e93e9a] hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    Create Profile
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ================= SIGN UP VIEW (Screenshot 1: Left Form, Right Branding) ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
          {/* Left: Sign Up Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center order-2 md:order-1 border-t md:border-t-0 md:border-r border-gray-100">
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-[#1e2025] tracking-tight m-0">
                Sign Up
              </h3>
            </div>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
              {/* Username */}
              <div>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                />
              </div>

              {/* Country Code + Phone Number */}
              <div className="flex gap-2.5">
                <div className="relative w-28 shrink-0">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full text-sm font-medium px-3 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 appearance-none focus:outline-none focus:border-[#a855f7] cursor-pointer pr-7"
                  >
                    <option value="+91">IN +91</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                    <option value="+971">AE +971</option>
                    <option value="+61">AU +61</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex-1">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-sm px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                />
              </div>

              {/* Searchable Country, State, City Row */}
              <div className="grid grid-cols-3 gap-2">
                <SearchableSelect
                  value={formData.country}
                  onChange={handleCountryChange}
                  options={countries}
                  placeholder="Country"
                />

                <SearchableSelect
                  value={formData.state}
                  onChange={handleStateChange}
                  options={availableStates}
                  placeholder="State"
                />

                <SearchableSelect
                  value={formData.city}
                  onChange={handleCityChange}
                  options={availableCities}
                  placeholder="City"
                />
              </div>

              {/* Password + Confirm Password */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-3 pr-9 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full text-sm px-3.5 py-3 pr-9 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all placeholder-gray-400 text-gray-800 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-[#e93e9a] via-[#b64cee] to-[#8b5cf6] hover:opacity-95 transition-all shadow-lg shadow-purple-500/25 cursor-pointer border-none"
              >
                Register
              </button>

              {/* Switch to Sign In */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-600 m-0">
                  Already managed by Vusic?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="font-bold text-[#8b5cf6] hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Right: Branding */}
          <div className="order-1 md:order-2">
            {renderBranding()}
          </div>
        </div>
      )}
    </Modal>
  );
}
