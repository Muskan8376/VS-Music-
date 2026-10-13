import React from 'react';

export const ComparisonSheetTable = ({ comparisonData }) => {
  const columns = comparisonData?.columns || [
    'FEATURES',
    'PAY PER RELEASE',
    'ARTIST UNLIMITED',
    'PRO LABEL',
    'LIMITLESS LABEL'
  ];

  const features = comparisonData?.features || [
    {
      feature: 'Songs',
      subtext: '',
      payPerRelease: 'Pay per upload',
      artistUnlimited: 'unlimited',
      proLabel: 'pay per upload',
      limitlessLabel: 'unlimited'
    },
    {
      feature: 'Artists',
      subtext: '',
      payPerRelease: 'No limit',
      artistUnlimited: 'One',
      proLabel: 'no limit',
      limitlessLabel: 'no limit'
    },
    {
      feature: 'Custom label name',
      subtext: '',
      payPerRelease: 'No',
      artistUnlimited: 'No',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Annual charges',
      subtext: '',
      payPerRelease: 'No',
      artistUnlimited: 'Yes',
      proLabel: 'No',
      limitlessLabel: 'No'
    },
    {
      feature: 'YouTube Services',
      subtext: 'Content ID, YouTube Music, Copyright Protection',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Social Platforms',
      subtext: 'Instagram, Facebook, TikTok, Moj, SnapChat',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Mobile Caller-Tunes',
      subtext: 'Jio, Airtel, Vi, BSNL',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'International stores',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Email support',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Call Support',
      subtext: '',
      payPerRelease: 'No',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Account manager',
      subtext: '',
      payPerRelease: 'No',
      artistUnlimited: 'No',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Streaming Revenue share',
      subtext: '',
      payPerRelease: '85%',
      artistUnlimited: '80%',
      proLabel: '90%',
      limitlessLabel: '80%'
    },
    {
      feature: 'Streaming Revenue share YouTube Content ID',
      subtext: '',
      payPerRelease: '80%',
      artistUnlimited: '85%',
      proLabel: '85%',
      limitlessLabel: '80%'
    },
    {
      feature: 'Set custom release date',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Song takedown if plan not renewed',
      subtext: '',
      payPerRelease: 'No',
      artistUnlimited: 'No',
      proLabel: 'No',
      limitlessLabel: 'No'
    },
    {
      feature: 'Monthly payout',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Minimum payout',
      subtext: '',
      payPerRelease: 'Rs 10',
      artistUnlimited: 'Rs 10',
      proLabel: 'Rs 10',
      limitlessLabel: 'Rs 10'
    },
    {
      feature: 'Discount on quantity',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Analytics',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Data, Analytics and Reports',
      subtext: 'On personal dashboard, no boring "excel sheet" mails',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Live links',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Additional Revenue Collection',
      subtext: '',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Titles in regional language on Artwork',
      subtext: 'We allow regional language title on artwork including your logo, credits etc',
      payPerRelease: 'Yes',
      artistUnlimited: 'Yes',
      proLabel: 'Yes',
      limitlessLabel: 'Yes'
    },
    {
      feature: 'Price',
      subtext: '',
      payPerRelease: '₹599 + GST',
      artistUnlimited: '₹3999 + GST',
      proLabel: '₹5499 + GST',
      limitlessLabel: '₹9999 + GST'
    },
    {
      feature: 'Gst',
      subtext: '',
      payPerRelease: '18%',
      artistUnlimited: '18%',
      proLabel: '18%',
      limitlessLabel: '18%'
    }
  ];

  return (
    <section className="bg-[#e6f7f8] rounded-3xl p-6 sm:p-10 lg:p-12 mb-14 shadow-xs">
      {/* Section Heading matching screenshot */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e2025] tracking-tight">
          Comparision Sheet
        </h2>
      </div>

      {/* Dark Slate Comparison Table matching Screenshots 2, 3, 4 */}
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-800 bg-[#222428]">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-700/80 bg-[#1c1e22]">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-4 px-5 text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase ${
                    index === 0 ? 'w-2/6' : 'w-1/6 text-center'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Rows */}
          <tbody className="divide-y divide-gray-800/80 text-xs sm:text-sm text-gray-200">
            {features.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-white/[0.03] transition-colors"
              >
                {/* Feature Name & Description */}
                <td className="py-3.5 px-5 text-gray-100 font-medium">
                  <div className="font-semibold text-white/95">{item.feature}</div>
                  {item.subtext && (
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5 leading-tight">
                      {item.subtext}
                    </div>
                  )}
                </td>

                {/* Column 2: Pay Per Release */}
                <td className="py-3.5 px-4 text-center font-medium text-gray-300">
                  {item.payPerRelease}
                </td>

                {/* Column 3: Artist Unlimited */}
                <td className="py-3.5 px-4 text-center font-medium text-gray-300">
                  {item.artistUnlimited}
                </td>

                {/* Column 4: Pro Label */}
                <td className="py-3.5 px-4 text-center font-medium text-gray-300">
                  {item.proLabel}
                </td>

                {/* Column 5: Limitless Label */}
                <td className="py-3.5 px-4 text-center font-medium text-gray-300">
                  {item.limitlessLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparisonSheetTable;
