import React from 'react';
import { 
  Radio, 
  Megaphone, 
  Banknote, 
  TrendingUp, 
  Network, 
  ListMusic, 
  ThumbsDown 
} from 'lucide-react';

const ICON_MAP = {
  Radio: Radio,
  Megaphone: Megaphone,
  Banknote: Banknote,
  TrendingUp: TrendingUp,
  Network: Network,
  ListMusic: ListMusic,
  ThumbsDown: ThumbsDown
};

export default function FeatureCard({ icon, title, description }) {
  const IconComponent = ICON_MAP[icon] || Radio;

  return (
    <div className="bg-white rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-black/5 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:border-[#ea3838]/20 transition-all duration-300">
      <div className="w-16 h-16 flex items-center justify-center mb-5 text-[#ea3838] transition-transform duration-300 hover:scale-110" aria-hidden="true">
        <IconComponent size={38} strokeWidth={2.2} />
      </div>
      <h3 className="font-bold text-sm tracking-wider text-[#ea3838] uppercase mb-3.5 leading-snug">
        {title}
      </h3>
      <p className="font-normal text-xs sm:text-sm leading-relaxed text-gray-600 m-0 max-w-[260px]">
        {description}
      </p>
    </div>
  );
}
