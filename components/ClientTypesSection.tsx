import React from "react";
import { Briefcase } from "lucide-react";
import { firmData } from "@/data/firmData";
import { DynamicIcon } from "./DynamicIcon";

interface ClientTypesSectionProps {
  isHomePage?: boolean;
}

export const ClientTypesSection: React.FC<ClientTypesSectionProps> = ({ isHomePage = false }) => {
  // If isHomePage, display a concise selection of key entity types and remove repetitive partner-supervised badge
  const clientTypes = isHomePage ? firmData.clientTypes.slice(0, 4) : firmData.clientTypes;

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>Entities We Serve</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-3">
            Supporting Businesses Across Diverse Needs
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Delivering statutory audit, taxation, compliance, and financial consulting across varied business constitutions.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isHomePage ? "lg:grid-cols-4" : "lg:grid-cols-3 xl:grid-cols-4"} gap-6`}>
          {clientTypes.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-premium hover:border-[#0A5084]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0A5084]/10 text-[#0A5084] border border-[#0A5084]/15 group-hover:bg-[#0A5084] group-hover:text-white transition-all duration-300 flex items-center justify-center mb-4">
                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-heading font-bold text-navy-950 group-hover:text-[#0A5084] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {!isHomePage && (
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                  <span>Professional Guidance</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
