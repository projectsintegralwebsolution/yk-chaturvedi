import React from "react";
import {
  ShieldCheck,
  Building2,
  Scale,
  Workflow,
  Laptop,
} from "lucide-react";

interface WhyChooseUsProps {
  isHomePage?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ isHomePage = false }) => {
  // Pillars: Concise, no client-count claims (800+/250+ removed),
  // "GST refund claims" used instead of "fast-track GST refund claims",
  // direct partner supervision reduced to avoid repetitive claims.
  const pillars = [
    {
      title: "Statutory Rigor",
      desc: "Delivering disciplined compliance across trade, manufacturing, and services sectors with thorough regulatory precision.",
      icon: ShieldCheck,
      badge: "Compliance Rigor",
    },
    {
      title: "Two-Office Presence",
      desc: "Offices in Vasai (West) and Vasai (East) provide accessible consultation across Palghar district and Mumbai MMR.",
      icon: Building2,
      badge: "West & East",
    },
    {
      title: "Litigation & Refund Capability",
      desc: "Handling GST and Income-tax notices, scrutiny, departmental audits, appeals, and GST refund claims.",
      icon: Scale,
      badge: "In-House Defense",
    },
    {
      title: "End-to-End Support",
      desc: "Comprehensive lifecycle guidance: entity setup, licensing, accounting, audits, taxation, and project financing.",
      icon: Workflow,
      badge: "Full Lifecycle",
    },
    {
      title: "Technology-Enabled",
      desc: "Modern government tax portals, cloud accounting infrastructure, and automated reconciliation for timely filings.",
      icon: Laptop,
      badge: "Digital Precision",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>Methodology &amp; Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
            How We Work
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Combining statutory rigor, technical precision, and modern digital compliance tools to deliver reliable financial and advisory solutions.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:border-[#0A5084]/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0A5084] border border-slate-200/60 group-hover:bg-[#0A5084] group-hover:text-white group-hover:border-[#0A5084] flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-700 group-hover:bg-[#0A5084]/10 group-hover:text-[#0A5084] transition">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-navy-950 mb-2.5 group-hover:text-[#0A5084] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0A5084]">
                  <span>Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
