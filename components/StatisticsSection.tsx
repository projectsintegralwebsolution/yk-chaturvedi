import React from "react";
import { Users, Building2, Calendar } from "lucide-react";

interface StatisticsSectionProps {
  isHomePage?: boolean;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ isHomePage = false }) => {
  // If isHomePage, show strictly the 3 approved details: Year of Establishment (2017), Offices (2), Team Members (15)
  // On other pages (like About), keep existing stats
  const homeStats = [
    {
      value: "2017",
      label: "Year of Establishment",
      sublabel: "Registered with ICAI (FRN: 145633W)",
      icon: Calendar,
    },
    {
      value: "2",
      label: "Offices in Vasai",
      sublabel: "Vasai West (HO) & Vasai East (BO)",
      icon: Building2,
    },
    {
      value: "15",
      label: "Team Members",
      sublabel: "Integrated professional strength",
      icon: Users,
    },
  ];

  const fullStats = [
    {
      value: "9+",
      label: "Years in Practice",
      sublabel: "Continuous practice since 2017",
      icon: Calendar,
    },
    {
      value: "800+",
      label: "Income-Tax Clients",
      sublabel: "Corporate, LLP & Individual files",
      icon: Calendar,
    },
    {
      value: "250+",
      label: "GST Clients",
      sublabel: "Active monthly & quarterly compliance",
      icon: Calendar,
    },
    {
      value: "15",
      label: "Team Members",
      sublabel: "Integrated professional strength",
      icon: Users,
    },
    {
      value: "2",
      label: "Vasai Offices",
      sublabel: "Vasai West HO & Vasai East BO",
      icon: Building2,
    },
  ];

  const stats = isHomePage ? homeStats : fullStats;
  const gridCols = isHomePage
    ? "grid-cols-1 md:grid-cols-3"
    : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-premium border border-slate-100 p-6 sm:p-8">
        <div className={`grid ${gridCols} gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100`}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  idx !== 0 ? "pt-6 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A5084]/10 text-[#0A5084] flex items-center justify-center mb-3 border border-[#0A5084]/15">
                  <Icon className="w-6 h-6 text-[#0A5084]" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-navy-900 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
