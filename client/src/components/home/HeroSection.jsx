import React from 'react';
import Button from '../common/Button';

export default function HeroSection({ onStartNow }) {
  return (
    <section className="bg-gradient-to-br from-[#a4b4f5] via-[#c2b6f1] to-[#faaab9] py-14 sm:py-20 relative overflow-hidden" aria-label="Hero Overview">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* Left Column: Headline and Call-to-Action */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <span className="text-lg sm:text-xl font-medium text-[#3f4459] mb-4 tracking-tight">
            Earn Money, Fans and Fame
          </span>

          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.04] tracking-tight mb-6 drop-shadow-sm flex flex-col">
            <span>Create</span>
            <span>Upload</span>
            <span>Monetize</span>
            <span>Repeat.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/95 max-w-xl leading-relaxed mb-8 drop-shadow-sm font-normal">
            Vusic Records helps You (Artists) to make additional money by generating Revenue from Your Music worldwide from Streaming apps, UGC Platforms, Social Platforms and all other platforms that use your creation.
          </p>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onStartNow}
              className="bg-[#ea3838] hover:bg-[#d32828] text-white text-lg font-semibold px-9 py-3.5 rounded-lg shadow-[0_6px_20px_rgba(234,56,56,0.4)]"
            >
              Start Now
            </Button>
          </div>
        </div>

        {/* Right Column: Epigamia Viral Campaign Banner */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="bg-[#f5b700] rounded-xl p-6 w-full max-w-[460px] aspect-square shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
            {/* Top Bar of the Promo Card */}
            <div className="flex justify-between items-start mb-2">
              <div className="font-black text-3xl sm:text-4xl text-white leading-[0.95] tracking-tighter uppercase">
                DIG<br />SWIRL<br />SPREAD
              </div>
              <div className="font-semibold text-[10px] tracking-wider text-white/95 uppercase text-right leading-snug">
                DEEPIKA PADUKONE • epigamia
              </div>
            </div>

            {/* Main Visual Image - Clean photo, no red tint */}
            <div className="relative flex-1 flex items-center justify-center rounded-lg overflow-hidden my-2">
              <img
                src="/assets/images/epigamia-promo.jpg"
                alt="Epigamia viral campaign featuring Deepika Padukone"
                className="w-full h-full object-cover object-[center_20%] rounded-md"
                loading="eager"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md flex flex-col items-center border border-white/20">
                <span className="text-xs font-bold text-[#f5b700]">epigamia</span>
                <span className="text-[9px] font-semibold tracking-wider text-white/80">SPREADS</span>
              </div>
            </div>
          </div>

          {/* Caption underneath the card */}
          <p className="text-xs sm:text-sm leading-relaxed text-white max-w-[460px] mt-3.5 text-left drop-shadow-sm">
            <strong className="font-bold">Vusic Records</strong> helped Epigamia take their sound on Instagram for this viral campaign featuring Deepika Padukone in record time of 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
