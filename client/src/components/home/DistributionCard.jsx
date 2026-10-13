import React from 'react';

function InstagramIcon({ size = 42, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#ea3838" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

function SmartphoneIcon({ size = 42, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#ea3838" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  );
}

function DiscIcon({ size = 42, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="#ea3838" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" fill="#ffffff" />
      <path d="M7 12a5 5 0 0 1 5-5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M5.5 12a6.5 6.5 0 0 1 6.5-6.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function GlobeIcon({ size = 42, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#ea3838" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function YoutubeIcon({ size = 42, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="#ea3838" 
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="#ffffff" />
    </svg>
  );
}

export default function DistributionCard({ 
  step, 
  title, 
  icon, 
  itemsText, 
  featured = false 
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'Instagram':
        return <InstagramIcon size={42} />;
      case 'Smartphone':
        return <SmartphoneIcon size={42} />;
      case 'Disc3':
        return <DiscIcon size={44} />;
      case 'Globe2':
        return <GlobeIcon size={42} />;
      case 'Youtube':
        return <YoutubeIcon size={44} />;
      default:
        return <DiscIcon size={42} />;
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-7 sm:p-9 flex flex-col items-center text-center border border-black/5 transition-all duration-300 min-h-[380px] ${
        featured
          ? 'lg:-translate-y-3.5 shadow-[0_18px_45px_rgba(0,0,0,0.1)] border-[#ea3838]/15 hover:lg:-translate-y-5 hover:shadow-[0_26px_54px_rgba(0,0,0,0.16)] z-10'
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_42px_rgba(0,0,0,0.12)]'
      }`}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-5 text-[#ea3838] transition-transform duration-300 hover:scale-110" aria-hidden="true">
        {renderIcon()}
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-sm sm:text-base tracking-wider text-[#ea3838] uppercase m-0 leading-snug">
          <span className="font-extrabold mr-0.5">{step}</span> {title}
        </h3>
      </div>

      <p className="font-normal text-xs sm:text-sm leading-relaxed text-gray-600 m-0 max-w-[220px]">
        {itemsText}
      </p>
    </div>
  );
}
