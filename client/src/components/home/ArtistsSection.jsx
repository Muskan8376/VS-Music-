import React, { useState } from 'react';
import ArtistCard from './ArtistCard';
import { artistsData } from '../../data/artistsData';

export default function ArtistsSection() {
  const [activeArtist, setActiveArtist] = useState(null);

  const handleTogglePlay = (artist) => {
    if (activeArtist?.id === artist.id) {
      setActiveArtist(null);
    } else {
      setActiveArtist(artist);
    }
  };

  return (
    <section className="bg-[#43587b] text-white py-20 relative" id="artists" aria-label="Artists on Vusic">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center mb-12">
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl sm:text-4xl text-white tracking-tight m-0">
              Artists on Vusic
            </h2>
          </div>

          <div className="flex flex-col text-sm sm:text-base leading-relaxed text-white/90">
            <p className="m-0">
              From Bollywood, Punjabi to South Indian as well as the International Music industry, we are proud to release and distribute the world's biggest major and independent music stars.
            </p>
          </div>
        </div>

        {/* 6 Artists Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {artistsData.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              isPlaying={activeArtist?.id === artist.id}
              onTogglePlay={handleTogglePlay}
            />
          ))}
        </div>

        {/* Floating Now Playing Toast */}
        {activeArtist && (
          <div className="fixed bottom-6 right-6 bg-[#1e2025] border border-white/20 shadow-2xl px-4 py-2.5 rounded-full flex items-center gap-3 z-50 animate-bounce-subtle">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
              <img src={activeArtist.image} alt={activeArtist.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400">Previewing Sound of</span>
              <strong className="text-xs text-white">{activeArtist.name}</strong>
            </div>
            <button
              type="button"
              className="bg-transparent border-none text-gray-400 hover:text-white text-lg cursor-pointer px-1 leading-none"
              onClick={() => setActiveArtist(null)}
              aria-label="Close audio preview"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
