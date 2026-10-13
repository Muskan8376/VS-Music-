import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  CreditCard,
  Wallet,
  Landmark,
  Clock,
  Lock,
  AlertCircle
} from 'lucide-react';

/**
 * CashfreePaymentViews
 * Manages the payment method selection and each method's dedicated interactive sub-views
 */
export const CashfreePaymentViews = ({
  selectedMethod,
  setSelectedMethod,
  currentAmount,
  phoneNumber,
  onCompletePayment
}) => {
  // Timer for UPI QR Code
  const [qrTimer, setQrTimer] = useState(599);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form states for Card payment
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('Muskan Dhaniya');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [cardError, setCardError] = useState('');

  // States for Wallet payment
  const [selectedWallet, setSelectedWallet] = useState('paytm');

  // States for Net Banking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [otherBank, setOtherBank] = useState('');

  // States for Paylater
  const [selectedPaylater, setSelectedPaylater] = useState('simpl');

  // States for Cashfree Pay UPI ID
  const [upiIdInput, setUpiIdInput] = useState('muskan@okhdfcbank');
  const [upiError, setUpiError] = useState('');

  // Countdown timer for QR code
  useEffect(() => {
    let interval = null;
    if (selectedMethod === 'UPI_QR' && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedMethod, qrTimer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('vusicrecords@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    if (cardError) setCardError('');
  };

  const handleCardExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const detectCardType = (num) => {
    const raw = num.replace(/\s/g, '');
    if (raw.startsWith('4')) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(raw)) return 'Mastercard';
    if (/^(60|65|81|82)/.test(raw)) return 'RuPay';
    if (/^(34|37)/.test(raw)) return 'Amex';
    return 'Credit / Debit Card';
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const cleanNum = cardNumber.replace(/\s/g, '');
    if (cleanNum.length < 12) {
      setCardError('Please enter a valid 16-digit card number');
      return;
    }
    if (!cardExpiry || cardExpiry.length < 4) {
      setCardError('Please enter valid expiry date (MM/YY)');
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      setCardError('Please enter a valid CVV (3 or 4 digits)');
      return;
    }

    const type = detectCardType(cardNumber);
    const last4 = cleanNum.slice(-4);
    onCompletePayment('CARD', {
      method: `${type} (•••• ${last4})`,
      cardHolder,
      type
    });
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!upiIdInput || !upiIdInput.includes('@')) {
      setUpiError('Please enter a valid UPI ID (e.g. yourname@okhdfcbank)');
      return;
    }
    onCompletePayment('CASHFREE_PAY', {
      method: `Cashfree Pay UPI (${upiIdInput})`,
      vpa: upiIdInput
    });
  };

  const walletsList = [
    { id: 'paytm', name: 'Paytm Wallet', balance: '₹1,450.00', color: '#002e6e', badge: 'Available' },
    { id: 'phonepe', name: 'PhonePe Wallet', balance: '₹950.00', color: '#5f259f', badge: 'Linked' },
    { id: 'amazonpay', name: 'Amazon Pay Balance', balance: '₹2,100.00', color: '#232f3e', badge: 'Fast Pay' },
    { id: 'mobikwik', name: 'MobiKwik', balance: '₹500.00', color: '#0083ca', badge: 'Active' },
    { id: 'airtel', name: 'Airtel Money', balance: '₹800.00', color: '#e60000', badge: 'Linked' }
  ];

  const popularBanks = [
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC', badge: 'Instant' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICIC', badge: 'Instant' },
    { id: 'sbi', name: 'State Bank of India', code: 'SBI', badge: 'Popular' },
    { id: 'axis', name: 'Axis Bank', code: 'UTIB', badge: 'Instant' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KKBK', badge: 'Fast' },
    { id: 'pnb', name: 'Punjab National Bank', code: 'PUNB', badge: 'Popular' }
  ];

  const otherBanksList = [
    'Bank of Baroda',
    'Canara Bank',
    'IDFC FIRST Bank',
    'IndusInd Bank',
    'Union Bank of India',
    'Yes Bank',
    'Federal Bank',
    'Indian Bank',
    'Central Bank of India',
    'Bank of India',
    'RBL Bank',
    'South Indian Bank'
  ];

  const paylaterList = [
    {
      id: 'simpl',
      name: 'Simpl PayLater',
      limit: '₹5,000.00',
      description: '1-tap checkout. Pay bill on 1st & 16th of every month with 0% interest.',
      badge: 'Pre-Approved'
    },
    {
      id: 'lazypay',
      name: 'LazyPay',
      limit: '₹3,500.00',
      description: 'Pay next month. Zero paperwork & instant authorization.',
      badge: 'Approved'
    },
    {
      id: 'icici_paylater',
      name: 'ICICI Bank PayLater',
      limit: '₹10,000.00',
      description: 'Up to 45 days interest-free credit for ICICI bank customers.',
      badge: 'Bank Verified'
    },
    {
      id: 'flipkart',
      name: 'Flipkart Pay Later',
      limit: '₹2,500.00',
      description: 'Convenient monthly billing cycle with auto-debit support.',
      badge: 'Active'
    }
  ];

  /* ================= 1. UPI QR DETAIL VIEW ================= */
  if (selectedMethod === 'UPI_QR') {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Pay via UPI QR</span>
        </div>

        <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center">
          <div className="text-xs font-bold text-gray-800 mb-1">
            Scan with any UPI App to Pay <strong className="text-[#1ea1f2]">₹{currentAmount}</strong>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full font-bold mb-3 border border-amber-200">
            <Clock size={12} /> QR expires in: {formatTimer(qrTimer)}
          </div>

          <div className="relative w-48 h-48 bg-white p-3 rounded-2xl shadow-md border-2 border-gray-200 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <rect width="160" height="160" fill="white" />
              <rect x="10" y="10" width="40" height="40" fill="#0f172a" rx="4" />
              <rect x="18" y="18" width="24" height="24" fill="white" rx="2" />
              <rect x="24" y="24" width="12" height="12" fill="#0f172a" rx="1" />
              <rect x="110" y="10" width="40" height="40" fill="#0f172a" rx="4" />
              <rect x="118" y="18" width="24" height="24" fill="white" rx="2" />
              <rect x="124" y="24" width="12" height="12" fill="#0f172a" rx="1" />
              <rect x="10" y="110" width="40" height="40" fill="#0f172a" rx="4" />
              <rect x="18" y="118" width="24" height="24" fill="white" rx="2" />
              <rect x="24" y="124" width="12" height="12" fill="#0f172a" rx="1" />
              <path
                d="M60 15h10v10h-10zM80 15h10v10h-10zM60 35h20v10h-20zM90 35h10v10h-10zM15 60h15v10h-15zM40 60h10v10h-10zM60 60h10v20h-10zM80 60h30v10h-30zM120 60h30v10h-30zM15 80h20v10h-20zM45 80h10v20h-10zM70 80h20v20h-20zM100 80h10v10h-10zM120 80h20v10h-20zM15 100h10v10h-10zM65 110h10v10h-10zM85 110h20v10h-20zM115 110h15v10h-15zM60 130h20v20h-20zM90 130h10v10h-10zM110 130h20v20h-20zM140 130h10v20h-10zM90 145h20v10h-20z"
                fill="#0f172a"
              />
            </svg>
            <div className="absolute w-9 h-9 rounded-lg bg-[#e11d48] border-2 border-white shadow-md flex items-center justify-center text-white">
              <span className="text-[8px] font-black tracking-tighter">VUSIC</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
            <span className="text-gray-500 font-medium">UPI ID:</span>
            <strong className="font-mono text-gray-800">vusicrecords@icici</strong>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="text-[#1ea1f2] hover:text-[#0c85d0] bg-transparent border-none cursor-pointer p-0 font-bold ml-1"
            >
              {copiedUpi ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-semibold">Supported:</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-blue-600">GPay</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#5f259f] text-white">PhonePe</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#002e6e] text-white">Paytm</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-700 text-white">BHIM</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black text-white">CRED</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() =>
              onCompletePayment('UPI_QR', {
                method: 'UPI QR (GPay / PhonePe)',
                upiId: 'vusicrecords@icici'
              })
            }
            className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-black text-sm transition-all shadow-md border-none cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Simulate UPI App Scan &amp; Pay ₹{currentAmount}</span>
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
          >
            Choose Another Payment Method
          </button>
        </div>
      </div>
    );
  }

  /* ================= 2. APPLE PAY DETAIL VIEW ================= */
  if (selectedMethod === 'APPLE_PAY') {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Apple Pay</span>
        </div>

        <div className="bg-black text-white rounded-2xl p-5 shadow-lg border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold tracking-tight">Pay</span>
            <span className="text-xs text-gray-400 font-medium">Ready for Face ID / Touch ID</span>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Default Card</div>
              <div className="text-sm font-bold text-white mt-0.5">Apple Card •••• 4092</div>
              <div className="text-[11px] text-gray-400">Muskan Dhaniya</div>
            </div>
            <div className="w-10 h-7 rounded bg-amber-400/20 border border-amber-300/40 flex items-center justify-center font-bold text-[9px] text-amber-300">
              TITANIUM
            </div>
          </div>

          <div className="text-xs text-gray-300 space-y-1.5 pt-2 border-t border-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-400">Merchant</span>
              <span className="font-semibold text-white">Vusic Records Private Limited</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Contact</span>
              <span className="font-semibold text-white">{phoneNumber}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-gray-800">
              <span>Total Amount</span>
              <span className="text-emerald-400">₹{currentAmount}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onCompletePayment('APPLE_PAY', {
              method: 'Apple Pay (Apple Card •••• 4092)',
              cardHolder: 'Muskan Dhaniya'
            })
          }
          className="w-full py-4 px-6 rounded-2xl bg-black hover:bg-gray-900 text-white font-extrabold text-sm transition-all shadow-md border border-gray-700 cursor-pointer flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          <span>Confirm &amp; Pay ₹{currentAmount} with Pay</span>
        </button>
      </div>
    );
  }

  /* ================= 3. CARD DETAIL VIEW ================= */
  if (selectedMethod === 'CARD') {
    return (
      <form onSubmit={handleCardSubmit} className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Credit / Debit Card</span>
        </div>

        {/* Visual Card Preview */}
        <div className="bg-gradient-to-r from-[#1e2025] to-[#2d3748] text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-gray-400">
              {detectCardType(cardNumber)}
            </span>
            <CreditCard size={20} className="text-white/80" />
          </div>
          <div className="font-mono text-base sm:text-lg tracking-widest font-bold text-white mb-3">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="flex justify-between items-end text-xs">
            <div>
              <div className="text-[9px] text-gray-400 font-bold uppercase">Cardholder</div>
              <div className="font-semibold text-white tracking-wide truncate max-w-[160px]">
                {cardHolder || 'NAME ON CARD'}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-gray-400 font-bold uppercase">Expires</div>
              <div className="font-mono font-semibold text-white">{cardExpiry || 'MM/YY'}</div>
            </div>
          </div>
        </div>

        {cardError && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{cardError}</span>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2] font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="Muskan Dhaniya"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                value={cardExpiry}
                onChange={handleCardExpiryChange}
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2] font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                CVV
              </label>
              <input
                type="password"
                maxLength={4}
                placeholder="•••"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2] font-mono text-center"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="save-card-input"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-4 h-4 text-[#1ea1f2] rounded border-gray-300 cursor-pointer"
            />
            <label htmlFor="save-card-input" className="text-xs text-gray-600 cursor-pointer">
              Save card securely as per RBI guidelines
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setCardNumber('4532 8920 1823 4242');
            setCardExpiry('12/28');
            setCardCvv('892');
            setCardHolder('Muskan Dhaniya');
            setCardError('');
          }}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold border-none cursor-pointer transition-colors"
        >
          ⚡ Auto-fill Test Card Details
        </button>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-extrabold text-sm transition-all shadow-md border-none cursor-pointer mt-2"
        >
          Pay ₹{currentAmount}
        </button>
      </form>
    );
  }

  /* ================= 4. WALLET DETAIL VIEW ================= */
  if (selectedMethod === 'WALLET') {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Select Wallet</span>
        </div>

        <div className="text-xs text-gray-600">
          Linked phone number: <strong className="text-black">{phoneNumber}</strong>
        </div>

        <div className="space-y-2.5">
          {walletsList.map((w) => {
            const isSelected = selectedWallet === w.id;
            return (
              <div
                key={w.id}
                onClick={() => setSelectedWallet(w.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#1ea1f2] bg-blue-50/40 shadow-xs ring-1 ring-[#1ea1f2]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-black text-[9px] shadow-xs"
                    style={{ backgroundColor: w.color }}
                  >
                    {w.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">{w.name}</div>
                    <div className="text-[11px] text-gray-500">Available: {w.balance}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                    {w.badge}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#1ea1f2] bg-[#1ea1f2]' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            const chosen = walletsList.find((w) => w.id === selectedWallet);
            onCompletePayment('WALLET', {
              method: chosen ? chosen.name : 'Paytm Wallet',
              walletId: selectedWallet,
              phone: phoneNumber
            });
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-black text-sm transition-all shadow-md border-none cursor-pointer mt-2"
        >
          Pay ₹{currentAmount} via {walletsList.find((w) => w.id === selectedWallet)?.name || 'Wallet'}
        </button>
      </div>
    );
  }

  /* ================= 5. NET BANKING DETAIL VIEW ================= */
  if (selectedMethod === 'NET_BANKING') {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Net Banking</span>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            Popular Banks
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {popularBanks.map((bank) => {
              const isSelected = selectedBank === bank.name;
              return (
                <button
                  key={bank.id}
                  type="button"
                  onClick={() => {
                    setSelectedBank(bank.name);
                    setOtherBank('');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    isSelected
                      ? 'border-[#1ea1f2] bg-blue-50/50 ring-1 ring-[#1ea1f2]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="w-6 h-6 rounded bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-[9px]">
                      {bank.code.slice(0, 3)}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {bank.badge}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 line-clamp-1">{bank.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1.5">
            Or select other banks (50+ banks supported)
          </label>
          <select
            value={otherBank}
            onChange={(e) => {
              setOtherBank(e.target.value);
              if (e.target.value) setSelectedBank(e.target.value);
            }}
            className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2] bg-white text-gray-800"
          >
            <option value="">-- Choose from all other Indian banks --</option>
            {otherBanksList.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500 flex items-center gap-2">
          <Shield size={14} className="text-gray-400 shrink-0" />
          <span>You will be securely routed to {selectedBank || 'your bank'} netbanking portal to authenticate.</span>
        </div>

        <button
          type="button"
          onClick={() =>
            onCompletePayment('NET_BANKING', {
              method: `Net Banking (${selectedBank})`,
              bankName: selectedBank
            })
          }
          className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-black text-sm transition-all shadow-md border-none cursor-pointer mt-2"
        >
          Proceed to Pay ₹{currentAmount} via {selectedBank}
        </button>
      </div>
    );
  }

  /* ================= 6. PAYLATER DETAIL VIEW ================= */
  if (selectedMethod === 'PAYLATER') {
    return (
      <div className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Pay Later</span>
        </div>

        <div className="text-xs text-gray-600">
          Pre-approved credit limits for <strong className="text-black">{phoneNumber}</strong>
        </div>

        <div className="space-y-2.5">
          {paylaterList.map((item) => {
            const isSelected = selectedPaylater === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPaylater(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#1ea1f2] bg-blue-50/40 shadow-xs ring-1 ring-[#1ea1f2]'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{item.name}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 max-w-xs">{item.description}</div>
                  <div className="text-xs font-black text-[#1ea1f2] mt-1">Limit: {item.limit}</div>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-[#1ea1f2] bg-[#1ea1f2]' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            const chosen = paylaterList.find((p) => p.id === selectedPaylater);
            onCompletePayment('PAYLATER', {
              method: chosen ? chosen.name : 'Simpl PayLater',
              provider: selectedPaylater
            });
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-black text-sm transition-all shadow-md border-none cursor-pointer mt-2"
        >
          Pay ₹{currentAmount} with {paylaterList.find((p) => p.id === selectedPaylater)?.name || 'PayLater'}
        </button>
      </div>
    );
  }

  /* ================= 7. CASHFREE PAY (FAST UPI) DETAIL VIEW ================= */
  if (selectedMethod === 'CASHFREE_PAY') {
    return (
      <form onSubmit={handleUpiSubmit} className="space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#1ea1f2] hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            <ChevronLeft size={16} /> All Payment Options
          </button>
          <span className="text-xs font-bold text-gray-500">Cashfree Pay</span>
        </div>

        <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span className="text-xs font-bold text-emerald-900">Instant UPI Collect Request</span>
          </div>
          <p className="text-[11px] text-emerald-700 m-0">
            Enter your Virtual Payment Address (VPA). A payment approval notification will be sent to your UPI app.
          </p>
        </div>

        {upiError && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{upiError}</span>
          </div>
        )}

        <div>
          <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
            Enter UPI ID / VPA
          </label>
          <input
            type="text"
            placeholder="e.g. mobile@paytm or user@okhdfcbank"
            value={upiIdInput}
            onChange={(e) => {
              setUpiIdInput(e.target.value);
              if (upiError) setUpiError('');
            }}
            className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1ea1f2] font-mono"
          />
        </div>

        <div>
          <div className="text-[11px] text-gray-400 font-bold uppercase mb-1.5">Quick Handles</div>
          <div className="flex flex-wrap gap-2">
            {['@okhdfcbank', '@okicici', '@paytm', '@ybl', '@axisbank'].map((handle) => (
              <button
                key={handle}
                type="button"
                onClick={() => {
                  const base = upiIdInput.split('@')[0] || 'muskan';
                  setUpiIdInput(`${base}${handle}`);
                  setUpiError('');
                }}
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 border-none cursor-pointer transition-colors"
              >
                {handle}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-extrabold text-sm transition-all shadow-md border-none cursor-pointer mt-2"
        >
          Verify &amp; Pay ₹{currentAmount}
        </button>
      </form>
    );
  }

  /* ================= 8. DEFAULT MAIN PAYMENT OPTIONS MENU ================= */
  return (
    <div>
      {/* 1. Suggested For You */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Suggested For You
        </h4>

        {/* Apple Pay Button */}
        <button
          type="button"
          onClick={() => setSelectedMethod('APPLE_PAY')}
          className="w-full py-3.5 px-6 rounded-2xl bg-black hover:bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-xs mb-4"
        >
          <span>Pay</span>
        </button>

        {/* QR Code Scan Box */}
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between gap-4 bg-white">
          <div className="relative w-28 h-28 bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-35">
              <rect width="100" height="100" fill="#f8fafc" />
              <path
                d="M10 10h30v30h-30zM60 10h30v30h-30zM10 60h30v30h-30zM20 20h10v10h-10zM70 20h10v10h-10zM20 70h10v10h-10zM45 10h10v20h-10zM10 45h20v10h-20zM45 45h10v10h-10zM65 45h25v10h-25zM45 65h10v25h-10zM65 65h10v10h-10zM80 80h10v10h-10z"
                fill="#334155"
              />
            </svg>

            <button
              type="button"
              onClick={() => setSelectedMethod('UPI_QR')}
              className="absolute inset-x-2 py-1.5 rounded-full bg-[#1ea1f2] hover:bg-[#188bd4] text-white text-[10px] font-bold shadow-md flex items-center justify-center border-none cursor-pointer transition-all"
            >
              Click to see QR
            </button>
          </div>

          <div className="flex-1">
            <div className="text-xs font-semibold text-gray-700 mb-2">Scan and pay with</div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center font-bold text-[8px] text-blue-600 shadow-2xs">
                GPay
              </div>
              <div className="w-6 h-6 rounded-md bg-[#5f259f] text-white flex items-center justify-center font-black text-[9px] shadow-2xs">
                पे
              </div>
              <div className="w-6 h-6 rounded-md bg-[#002e6e] text-white flex items-center justify-center font-black text-[8px] shadow-2xs">
                Paytm
              </div>
            </div>
            <div className="text-[11px] text-gray-400">or other UPI apps</div>
          </div>
        </div>
      </div>

      {/* 2. Other Payment Options */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Other Payment Options
        </h4>

        <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white">
          {/* Cashfree Pay */}
          <button
            type="button"
            onClick={() => setSelectedMethod('CASHFREE_PAY')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#00875a]/10 text-[#00875a] flex items-center justify-center font-black text-xs">
                CF
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-800">Cashfree Pay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#1ea1f2] bg-[#1ea1f2]/10 px-2 py-0.5 rounded-md">
                Safe, Simple &amp; Fast
              </span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </button>

          {/* Card Option */}
          <button
            type="button"
            onClick={() => setSelectedMethod('CARD')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-[#1ea1f2]" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Card</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">VISA • MC • RUPAY</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </button>

          {/* Wallets */}
          <button
            type="button"
            onClick={() => setSelectedMethod('WALLET')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Wallet size={18} className="text-[#1ea1f2]" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Wallets</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          {/* Net Banking */}
          <button
            type="button"
            onClick={() => setSelectedMethod('NET_BANKING')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Landmark size={18} className="text-[#1ea1f2]" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Net Banking</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          {/* Paylater */}
          <button
            type="button"
            onClick={() => setSelectedMethod('PAYLATER')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-[#1ea1f2]" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">Paylater</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashfreePaymentViews;
