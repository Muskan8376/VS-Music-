import React from 'react';
import FeatureCard from './FeatureCard';
import { featuresData } from '../../data/featuresData';

export default function ArtistsFirstSection() {
  const topRowCards = featuresData.slice(0, 4);
  const bottomRowCards = featuresData.slice(4);

  return (
    <section className="py-20 bg-[#fcfcfd]" id="features" aria-label="Artists First Features">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start mb-14">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#ea3838] mb-2.5 tracking-tight">Artists First</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-[#1e2025] leading-tight tracking-tight m-0">
              How Vusic Records Help Artists, Labels, and Right Holders
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 text-sm sm:text-base leading-relaxed text-gray-600">
            <p className="m-0">
              Entertainment is a very serious business, and we mean it. All our artists, labels, and rights holders get 21st-century technology and access to the world's most powerful music, data, and analytics system.
            </p>
            <p className="m-0 font-medium text-gray-700">
              We take your musical career extremely seriously.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex flex-col gap-6">
          {/* Top Row: 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRowCards.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Bottom Row: 3 Cards Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            {bottomRowCards.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
