import React from "react";
import { Search, ClipboardCheck, Lightbulb, HeartHandshake } from "lucide-react";

interface ProcessSectionProps {
  isHomePage?: boolean;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ isHomePage = false }) => {
  const steps = [
    {
      number: "01",
      title: "Understand",
      desc: isHomePage
        ? "Examine entity constitution, operations, and statutory compliance objectives."
        : "We examine your entity constitution, operational model, historical compliance, and specific financial or tax objectives.",
      icon: Search,
    },
    {
      number: "02",
      title: "Assess",
      desc: isHomePage
        ? "Review books, identify obligations, and evaluate statutory risk areas."
        : "Our team audits records, identifies statutory obligations, pinpoints tax optimization avenues, and flags regulatory risks.",
      icon: ClipboardCheck,
    },
    {
      number: "03",
      title: "Advise",
      desc: isHomePage
        ? "Formulate practical, legally sound action plans and filing schedules."
        : "We formulate practical, legally sound action plans—whether structured tax planning, audit execution, filing schemes, or bank proposals.",
      icon: Lightbulb,
    },
    {
      number: "04",
      title: "Support",
      desc: isHomePage
        ? "Continuous filing submissions, departmental coordination, and representation."
        : "We ensure continuous support through filing submissions, department liaison, scrutiny defense, and ongoing advisory as rules evolve.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Engagement Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-3">
            A Disciplined Four-Step Process
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            A structured workflow designed to deliver clarity, statutory compliance, and reliable execution.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/70 p-6 sm:p-7 rounded-2xl border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-premium hover:border-[#0A5084]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading font-black text-3xl text-gold-500/80 group-hover:text-[#0A5084] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white text-[#0A5084] border border-[#0A5084]/25 shadow-sm flex items-center justify-center group-hover:bg-[#0A5084] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-navy-950 mb-2 group-hover:text-[#0A5084] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/60 text-xs font-semibold text-[#0A5084]">
                  Phase {step.number} of 04
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
