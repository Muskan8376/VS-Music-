import React from 'react';

export default function PartnersLogoBar() {
  return (
    <div className="bg-white py-10 sm:py-14 border-t border-black/5 w-full" role="region" aria-label="Streaming Partners">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8 flex items-center justify-center lg:justify-between gap-6 sm:gap-8 flex-wrap">
        {/* 1. Gaana */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Gaana">
          <div className="inline-flex items-center gap-1.5">
            <span className="bg-[#e72c30] text-white font-black text-lg w-7 h-7 rounded-md flex items-center justify-center leading-none">
              g
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#e72c30] tracking-tighter">
              gaana
            </span>
          </div>
        </div>

        {/* 2. Instagram */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Instagram">
          <div className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <defs>
                <linearGradient id="igGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="25%" stopColor="#e6683c" />
                  <stop offset="50%" stopColor="#dc2743" />
                  <stop offset="75%" stopColor="#cc2366" />
                  <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#igGrad2)" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#ffffff" strokeWidth="1.8" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <span className="text-lg sm:text-xl font-semibold text-[#c13584] tracking-tight">
              Instagram
            </span>
          </div>
        </div>

        {/* 3. Wynk Music */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Wynk Music">
          <div className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#ed1c24">
              <path d="M12 3a9 9 0 0 0-9 9c0 3.9 2.5 7.2 6 8.4V14.5a3 3 0 0 1-1.5-2.6 3 3 0 0 1 3-3 3 3 0 0 1 3 3c0 1.2-.7 2.2-1.7 2.7v5.8c3.5-1.2 6-4.5 6-8.4a9 9 0 0 0-8.8-9z" />
            </svg>
            <span className="text-lg sm:text-xl font-bold text-[#ed1c24] tracking-tight">
              Wynk Music
            </span>
          </div>
        </div>

        {/* 4. Hungama */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Hungama">
          <div className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <polygon points="5,3 19,12 5,21" fill="#00adef" />
              <polygon points="5,3 12,12 5,12" fill="#ff7f00" />
            </svg>
            <span className="text-lg sm:text-xl font-bold text-[#00adef] tracking-tight">
              hungama
            </span>
          </div>
        </div>

        {/* 5. Resso */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Resso">
          <div className="inline-flex items-center gap-1.5">
            <div className="bg-black rounded-md px-1.5 py-0.5 flex items-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#ff0050">
                <circle cx="8" cy="12" r="4" />
                <circle cx="16" cy="12" r="4" fill="#00f2fe" opacity="0.8" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-black tracking-tighter">
              resso
            </span>
          </div>
        </div>

        {/* 6. Spotify */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="Spotify">
          <div className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1ed760">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.208-2.35-1.435-5.308-1.76-8.792-.963-.334.077-.67-.13-.746-.465-.077-.334.13-.67.464-.746 3.811-.871 7.08-.504 9.723 1.11.294.18.386.562.208.856zm1.224-2.724c-.226.368-.707.483-1.076.257-2.69-1.654-6.79-2.133-9.972-1.168-.413.125-.85-.11-.976-.523-.124-.413.11-.85.524-.976 3.633-1.103 8.163-.568 11.267 1.334.37.227.484.708.257 1.076zm.105-2.835C14.692 8.92 9.38 8.745 6.302 9.68c-.495.15-1.02-.132-1.17-.626-.15-.494.132-1.02.626-1.17 3.535-1.073 9.404-.87 13.13 1.343.445.265.592.842.327 1.287-.265.446-.842.593-1.287.328z"/>
            </svg>
            <span className="text-xl sm:text-2xl font-bold text-[#1ed760] tracking-tight">
              Spotify
            </span>
          </div>
        </div>

        {/* 7. JioSaavn */}
        <div className="flex items-center justify-center p-2 opacity-90 hover:opacity-100 hover:-translate-y-0.5 transition-all select-none cursor-pointer" title="JioSaavn">
          <div className="inline-flex items-center gap-1">
            <span className="bg-[#2bc5b4] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
              Jio
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#2bc5b4] tracking-tight">
              Saavn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
