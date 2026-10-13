import React from 'react';

export default function VusicLogo({ variant = 'light', size = 'normal', onClick }) {
  const isDark = variant === 'dark';
  const isLg = size === 'large';

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none transition-transform duration-200 hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center shrink-0 ${isLg ? 'w-12 h-12' : 'w-10 h-10'}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_6px_rgba(234,56,56,0.4)]" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,12 48,88 38,88 6,24" fill="#ea3838" />
          <polygon points="34,12 68,88 58,88 28,24" fill="#ea3838" opacity="0.9" />
          <polygon points="56,12 88,88 78,88 50,24" fill="#ea3838" opacity="0.75" />
          <path d="M72 16 L92 16 L76 56 Z" fill="#ea3838" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight leading-tight ${isLg ? 'text-2xl' : 'text-lg'} ${isDark ? 'text-[#1e2025]' : 'text-white'}`}>
          Vusic Records
        </div>
        <div className={`font-semibold tracking-widest uppercase mt-0.5 ${isLg ? 'text-xs' : 'text-[10px]'} ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          FOR ARTISTS, BY ARTISTS
        </div>
      </div>
    </div>
  );
}
