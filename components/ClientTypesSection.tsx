import React from "react";
import { Building2, Briefcase, Users, TrendingUp, GraduationCap, Building, UserCheck, CheckCircle } from "lucide-react";
import { firmData } from "@/data/firmData";
import { DynamicIcon } from "./DynamicIcon";

export const ClientTypesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>Entities We Serve</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
            Supporting Businesses Across Diverse Needs
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our firm delivers specialized statutory auditing, taxation, compliance, and financial consulting across varied legal constitutions and business scales.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {firmData.clientTypes.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-premium hover:border-[#0A5084]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0A5084]/10 text-[#0A5084] border border-[#0A5084]/15 group-hover:bg-[#0A5084] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-4">
                  <DynamicIcon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-bold text-navy-950 group-hover:text-[#0A5084] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <CheckCircle className="w-3.5 h-3.5 text-[#0A5084]" />
                <span>Partner-Supervised Support</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
