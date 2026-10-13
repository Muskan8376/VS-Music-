import React from 'react';

export default function ArtistCard({ artist, isPlaying, onTogglePlay }) {
  return (
    <div 
      className="bg-white rounded-2xl p-5 flex flex-col items-center shadow-[0_10px_28px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer select-none group"
      onClick={() => onTogglePlay(artist)}
      role="article"
      aria-label={`Artist ${artist.name}`}
    >
      {/* Circular Avatar Container - Clean photo, ZERO red overlay */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-4">
        {/* Soft subtle watercolor ring frame */}
        <div 
          className="absolute -inset-1 rounded-full pointer-events-none opacity-70 group-hover:scale-105 transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, ${artist.color1 || '#3b82f6'}20 30%, ${artist.color2 || '#8b5cf6'}30 70%, transparent 80%)`
          }}
        />

        {/* Clean, crystal-clear artist portrait - No tints, No filters, No red overlays */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 z-10">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Playing Sound Wave Indicator placed neatly at corner, NEVER over the face */}
        {isPlaying && (
          <div className="absolute bottom-0 right-1 bg-[#1e2025] border-2 border-white rounded-full px-2 py-0.5 flex items-end gap-0.5 h-5 z-20 shadow-md" aria-label="Now playing">
            <span className="w-0.5 bg-green-500 rounded-xs h-1.5 animate-pulse"></span>
            <span className="w-0.5 bg-green-500 rounded-xs h-3 animate-pulse delay-75"></span>
            <span className="w-0.5 bg-green-500 rounded-xs h-2 animate-pulse delay-150"></span>
          </div>
        )}
      </div>

      {/* Artist Name in bold uppercase matching screenshot */}
      <div className="flex flex-col items-center text-center">
        <h3 className="font-bold text-sm tracking-wider text-[#1e2025] uppercase m-0 group-hover:text-black transition-colors">
          {artist.name}
        </h3>
      </div>
    </div>
  );
}
