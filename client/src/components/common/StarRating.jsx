import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ totalStars = 5, score = '4.6/5' }) {
  return (
    <div className="inline-flex items-center gap-2 align-middle">
      <div className="inline-flex items-center gap-0.5">
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]"
            fill="#f59e0b"
            color="#f59e0b"
          />
        ))}
      </div>
      {score && <span className="font-bold text-base text-[#1e2025]">({score})</span>}
    </div>
  );
}
