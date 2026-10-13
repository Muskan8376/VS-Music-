import React from 'react';
import DistributionCard from './DistributionCard';
import PartnersLogoBar from './PartnersLogoBar';
import { distributionData } from '../../data/distributionData';

export default function AudioDistributionSection() {
  return (
    <section className="pt-20 pb-0 bg-[#fafbfd]" id="distribution" aria-label="Audio Distribution">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start mb-14">
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-[#ea3838] mb-2.5 tracking-tight">widest coverage</span>
            <h2 className="font-bold text-3xl sm:text-4xl text-[#1e2025] leading-tight tracking-tight m-0">
              Audio Distribution
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 text-sm sm:text-base leading-relaxed text-gray-600">
            <p className="font-semibold text-gray-800 m-0">
              Audio Distribution Trust, transparency and eagerness to help you grow
            </p>
            <p className="m-0">
              We get your music where your audience is, with transparency and trust, so you can earn more money and more fans
            </p>
          </div>
        </div>

        {/* 5 Distribution Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14 items-start">
          {distributionData.map((channel) => (
            <DistributionCard
              key={channel.id}
              step={channel.step}
              title={channel.title}
              icon={channel.icon}
              itemsText={channel.itemsText}
              featured={channel.featured}
            />
          ))}
        </div>
      </div>

      {/* Streaming Partners Logos Row - directly after Audio Distribution cards */}
      <PartnersLogoBar />
    </section>
  );
}
