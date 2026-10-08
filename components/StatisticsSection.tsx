import React from "react";
import { Award, Users, FileCheck2, Building2, Calendar } from "lucide-react";
import { firmData } from "@/data/firmData";

export const StatisticsSection: React.FC = () => {
  const stats = [
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
      icon: FileCheck2,
    },
    {
      value: "250+",
      label: "GST Clients",
      sublabel: "Active monthly & quarterly compliance",
      icon: Award,
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

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-premium border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  idx !== 0 ? "pt-6 lg:pt-0 lg:pl-6" : ""
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
