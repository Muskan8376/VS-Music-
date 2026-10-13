import React from 'react';
import StarRating from '../common/StarRating';

export default function SocialProofBar() {
  return (
    <div className="bg-[#feecee] py-4 px-5 w-full border-b border-[#ea3838]/10" role="region" aria-label="Artist Testimonial & Rating">
      <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-4 flex-wrap text-center">
        <span className="text-sm sm:text-base font-medium text-[#2c2f35] tracking-tight">
          &ldquo;Finally, A world-class Indian Music distribution company for Indians as well as global Artists&rdquo;
        </span>
        <StarRating totalStars={5} score="4.6/5" />
      </div>
    </div>
  );
}
