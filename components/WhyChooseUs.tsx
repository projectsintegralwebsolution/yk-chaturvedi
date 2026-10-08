import React from "react";
import {
  Users,
  ShieldCheck,
  Building2,
  Scale,
  Workflow,
  Laptop,
} from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: "Established Client Base",
      desc: "More than 250 GST clients and 800+ Income-tax clients served consistently across trade, manufacturing, and services sectors.",
      icon: Users,
      badge: "800+ Clients",
    },
    {
      title: "Partner-Led Engagement",
      desc: "Every assignment is supervised directly by a partner, ensuring senior-level strategic discernment, technical precision, and accountability.",
      icon: ShieldCheck,
      badge: "Direct Oversight",
    },
    {
      title: "Two-Office Presence",
      desc: "Strategically located offices in Vasai (West) and Vasai (East) provide seamless accessibility across Palghar district and the Mumbai Metropolitan Region.",
      icon: Building2,
      badge: "West & East",
    },
    {
      title: "Litigation & Refund Capability",
      desc: "Robust in-house capability for handling GST and Income-tax notices, scrutiny, departmental audits, appeals, and fast-track GST refund claims.",
      icon: Scale,
      badge: "In-House Defense",
    },
    {
      title: "End-to-End Support",
      desc: "Comprehensive lifecycle guidance: from initial entity set-up and regulatory licences to monthly accounting, audits, taxation, and project financing.",
      icon: Workflow,
      badge: "Full Lifecycle",
    },
    {
      title: "Technology-Enabled",
      desc: "Active utilization of modern government portals, cloud accounting ecosystems, and automated ITC reconciliation tools for timely and accurate compliance.",
      icon: Laptop,
      badge: "Digital Precision",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A5084]/10 border border-[#0A5084]/20 text-[#0A5084] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A5084]" />
            <span>The Y K Chaturvedi Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight mb-4">
            Why Choose Y K Chaturvedi & Co.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Combining deep statutory rigor, direct partner supervision, and modern digital compliance tools to deliver reliable financial and advisory solutions.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-7 rounded-2xl border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:border-[#0A5084]/40 flex flex-col justify-between"
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

                  <h3 className="text-lg font-heading font-bold text-navy-950 mb-3 group-hover:text-[#0A5084] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
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
